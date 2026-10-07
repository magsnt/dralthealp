'use client';

import { useEffect, useState } from 'react';

type Purchase = { id: string; product: string; image: string; minutesAgo: number };

const PREVIEW: Purchase = {
  id: 'preview',
  product: '345 Relief Cream',
  image: '/images/campaign-3.png',
  minutesAgo: 2,
};

export function RecentPurchaseNotice() {
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const isPreview = new URLSearchParams(window.location.search).has('previewCompra');
    setPreview(isPreview);
    let stopped = false;
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let pollTimer: ReturnType<typeof setInterval> | undefined;
    const seen = new Set<string>();

    const hide = () => {
      if (stopped) return;
      setPurchase(null);
    };

    const show = (item: Purchase) => {
      if (stopped || document.hidden) return;
      setPurchase(item);
      hideTimer = setTimeout(hide, 5500);
    };

    if (isPreview) {
      showTimer = setTimeout(() => show(PREVIEW), 2500);
      pollTimer = setInterval(() => {
        if (document.hidden) return;
        if (hideTimer) clearTimeout(hideTimer);
        show(PREVIEW);
      }, 22000);
    } else {
      const load = async () => {
        if (document.hidden || stopped) return;
        try {
          const response = await fetch('/api/recent-purchases', { cache: 'no-store' });
          if (!response.ok) return;
          const data: { purchases?: Purchase[] } = await response.json();
          const next = data.purchases?.find(item => !seen.has(item.id));
          if (!next || stopped) return;
          seen.add(next.id);
          showTimer = setTimeout(() => show(next), 3500);
        } catch {
          // Sem pedidos confirmados ou API indisponível: não mostrar aviso.
        }
      };
      void load();
      pollTimer = setInterval(() => void load(), 30000);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        setPurchase(null);
        if (hideTimer) clearTimeout(hideTimer);
        if (showTimer) clearTimeout(showTimer);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stopped = true;
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (pollTimer) clearInterval(pollTimer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  if (!purchase) return null;

  return (
    <aside className="purchase-notice" aria-live="polite" aria-label={preview ? 'Prévia de aviso de compra' : 'Compra recente'}>
      <img src={purchase.image} alt="" width="58" height="68" />
      <div className="purchase-notice-copy">
        {preview && <span className="purchase-notice-preview">Prévia demonstrativa</span>}
        <span className="purchase-notice-kicker">Uma pessoa comprou</span>
        <strong>{purchase.product}</strong>
        <small>{preview ? 'Exemplo visual' : `Há ${purchase.minutesAgo} ${purchase.minutesAgo === 1 ? 'minuto' : 'minutos'}`}</small>
      </div>
    </aside>
  );
}
