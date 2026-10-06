declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade?: number;
};

export function fbEvento(nome: string, dados?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    window.fbq('track', nome, dados ?? {});
  } catch {
    // Falhas de rastreamento não devem interromper a compra.
  }
}

export function dadosProduto(p: Produto) {
  const qtd = p.quantidade ?? 1;
  return {
    content_type: 'product',
    content_ids: [p.id],
    content_name: p.nome,
    contents: [{ id: p.id, quantity: qtd, item_price: p.preco }],
    value: Math.round(p.preco * qtd * 100) / 100,
    currency: 'BRL',
    num_items: qtd,
  };
}
