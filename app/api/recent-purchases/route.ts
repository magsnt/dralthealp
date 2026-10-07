import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type YampiItem = { product_id?: number; bundle_id?: number; gift?: boolean };
type YampiDate = { date?: string; timezone?: string };
type YampiOrder = {
  id?: number;
  number?: number;
  authorized?: boolean;
  value_total?: number;
  created_at?: YampiDate;
  status?: { data?: { alias?: string } };
  transactions?: { data?: { captured?: boolean; authorized_at?: YampiDate; captured_at?: YampiDate } };
  items?: { data?: YampiItem[] } | YampiItem[];
};

const numberSet = (value: string | undefined, defaults: number[]) =>
  new Set([...defaults, ...(value ?? '').split(',').map(Number).filter(id => Number.isFinite(id) && id > 0)]);

const catalog = [
  { ids: numberSet(process.env.YAMPI_345_PRODUCT_IDS, [46101360]), name: '345 Relief Cream', image: '/images/campaign-3.png' },
  { ids: numberSet(process.env.YAMPI_147_PRODUCT_IDS, [46101361]), name: '147 Barrier Cream', image: '/images/147-2.webp' },
];

function timestamp(value: YampiDate | undefined) {
  if (!value?.date) return NaN;
  const normalized = value.date.replace(' ', 'T');
  if (/(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized)) return Date.parse(normalized);
  // A API normalmente informa America/Sao_Paulo sem offset na string de data.
  const offset = value.timezone === 'America/Cuiaba' ? '-04:00' : '-03:00';
  return Date.parse(`${normalized}${offset}`);
}

function purchaseFromOrder(order: YampiOrder, secret: string, now: number) {
  if (!order.authorized || !order.value_total || order.value_total <= 0) return null;
  const status = order.status?.data?.alias?.toLowerCase() ?? '';
  if (/cancel|refund|chargeback|fail|pending|unpaid/.test(status)) return null;

  const date = order.transactions?.data?.captured_at
    ?? order.transactions?.data?.authorized_at
    ?? order.created_at;
  const time = timestamp(date);
  const age = now - time;
  if (!Number.isFinite(age) || age < 0 || age > 90 * 60_000) return null;

  const items = Array.isArray(order.items) ? order.items : order.items?.data ?? [];
  const product = items.filter(item => !item.gift).map(item =>
    catalog.find(entry => entry.ids.has(Number(item.product_id)) || entry.ids.has(Number(item.bundle_id)))
  ).find(Boolean);
  if (!product) return null;

  const orderId = order.id ?? order.number;
  if (!orderId) return null;
  return {
    id: createHmac('sha256', secret).update(String(orderId)).digest('hex').slice(0, 20),
    product: product.name,
    image: product.image,
    minutesAgo: Math.max(1, Math.floor(age / 60_000)),
    time,
  };
}

export async function GET() {
  const alias = process.env.YAMPI_ALIAS;
  const token = process.env.YAMPI_USER_TOKEN;
  const secret = process.env.YAMPI_SECRET_KEY;
  if (!alias || !token || !secret || !/^[a-z0-9_-]+$/i.test(alias)) {
    return NextResponse.json({ purchases: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const url = new URL(`https://api.dooki.com.br/v2/${alias}/orders`);
    url.searchParams.set('include', 'items,status,transactions');
    url.searchParams.set('limit', '30');
    const response = await fetch(url, {
      headers: { 'User-Token': token, 'User-Secret-Key': secret },
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Yampi respondeu ${response.status}`);
    const payload: { data?: YampiOrder[] } = await response.json();
    const now = Date.now();
    const purchases = (payload.data ?? [])
      .map(order => purchaseFromOrder(order, secret, now))
      .filter((purchase): purchase is NonNullable<typeof purchase> => purchase !== null)
      .sort((a, b) => b.time - a.time)
      .slice(0, 8)
      .map(({ time: _time, ...purchase }) => purchase);
    return NextResponse.json({ purchases }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=30' } });
  } catch {
    return NextResponse.json({ purchases: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
