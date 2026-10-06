'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { dadosProduto, fbEvento } from '@/lib/fbpixel';

export function useViewContent(
  ref: RefObject<HTMLElement | null>,
  produto: { id: string; nome: string; preco: number }
) {
  const jaDisparou = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entradas => {
        if (jaDisparou.current || !entradas.some(entrada => entrada.isIntersecting && entrada.intersectionRatio >= 0.25)) return;
        jaDisparou.current = true;
        fbEvento('ViewContent', dadosProduto(produto));
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, produto.id, produto.nome, produto.preco]);
}
