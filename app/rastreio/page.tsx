'use client';

import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, PackageSearch, LoaderCircle } from 'lucide-react';

type TrackingWidget = { trackSingle: (options: { YQ_ContainerId: string; YQ_Height: number; YQ_Fc: string; YQ_Lang: string; YQ_Num: string; YQ_RmHeader: boolean; YQ_RmAD: boolean }) => void };
const CARRIER_3CQ = '191809';
declare global { interface Window { YQV5?: TrackingWidget } }
let widgetLoad: Promise<TrackingWidget> | null = null;

function loadTrackingWidget(): Promise<TrackingWidget> {
  if (window.YQV5) return Promise.resolve(window.YQV5);
  if (widgetLoad) return widgetLoad;
  widgetLoad = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => fail(), 15000);
    const fail = () => {
      window.clearTimeout(timeout);
      script.remove();
      widgetLoad = null;
      reject(new Error('Não foi possível carregar a consulta.'));
    };
    script.src = 'https://www.17track.net/externalcall.js';
    script.async = true;
    script.onerror = fail;
    script.onload = () => {
      window.clearTimeout(timeout);
      if (window.YQV5) resolve(window.YQV5);
      else fail();
    };
    document.head.appendChild(script);
  });
  return widgetLoad;
}

export default function TrackingPage() {
  const [number, setNumber] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function track(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const code = number.replace(/\s/g, '').toUpperCase();
    setError('');
    if (!/^[A-Z0-9-]{6,50}$/.test(code)) {
      setError('Confira o código de rastreio: use entre 6 e 50 letras ou números, sem caracteres especiais.');
      return;
    }
    setNumber(code);
    setLoading(true);
    try {
      const widget = await loadTrackingWidget();
      setSubmitted(code);
      await new Promise<void>(resolve=>window.requestAnimationFrame(()=>resolve()));
      widget.trackSingle({ YQ_ContainerId: 'tracking-result', YQ_Height: 640, YQ_Fc: CARRIER_3CQ, YQ_Lang: 'pt', YQ_Num: code, YQ_RmHeader: true, YQ_RmAD: true });
    } catch {
      setError('A consulta está indisponível no momento. Tente novamente mais tarde ou entre em contato com nosso atendimento.');
    } finally {
      setLoading(false);
    }
  }

  return <>
    <div className="announcement">Cuidado coreano. Um momento só seu.</div>
    <header className="tracking-header">
      <a href="/" className="tracking-back"><ArrowLeft size={16}/> <span>Voltar à loja</span></a>
      <a className="brand" href="/" aria-label="Dr. Althea — início"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a>
      <a href="/#perguntas" className="tracking-help">Precisa de ajuda?</a>
    </header>
    <main className="tracking-page">
      <section className="tracking-intro">
        <span className="eyebrow">ACOMPANHE SEU CUIDADO</span>
        <h1>Seu ritual está a caminho.</h1>
        <p>Consulte as atualizações da entrega com o código de rastreio recebido após o envio.</p>
      </section>
      <section className="tracking-panel" aria-label="Consultar entrega">
        <form onSubmit={track}>
          <label htmlFor="tracking-number">Código de rastreio</label>
          <div className="tracking-input-row">
            <input id="tracking-number" value={number} onChange={e=>setNumber(e.target.value)} maxLength={50} placeholder="Ex.: AB123456789CD" autoComplete="off" autoCapitalize="characters" spellCheck={false} required aria-invalid={!!error} aria-describedby={error?'tracking-hint tracking-error':'tracking-hint'}/>
            <button type="submit" className="button" disabled={loading}>{loading?<><LoaderCircle size={17} className="tracking-spinner"/> Preparando consulta</>:<>Rastrear pedido <ArrowUpRight size={17}/></>}</button>
          </div>
          <p id="tracking-hint" className="tracking-hint">Transportadora: 3CQ. Use o código de rastreio recebido após o envio, não o número do pedido.</p>
          {error&&<div id="tracking-error" className="tracking-error" role="alert"><p>{error}</p><a href="/#perguntas">Preciso de ajuda <ArrowUpRight size={14}/></a></div>}
        </form>
        {!submitted&&<div className="tracking-empty"><PackageSearch size={34} strokeWidth={1}/><h2>Cada etapa, mais perto de você.</h2><p>Digite seu código acima para acompanhar o percurso da entrega.</p></div>}
        {submitted&&<div className="tracking-result-heading"><span className="eyebrow">ATUALIZAÇÕES DA ENTREGA</span><p>Código <strong>{submitted}</strong></p></div>}
        <div id="tracking-result" className="tracking-result" hidden={!submitted}/>
        {submitted&&<p className="tracking-provider">As atualizações da entrega são fornecidas pela transportadora.</p>}
      </section>
      <section className="tracking-faq" aria-label="Ajuda com rastreamento">
        <details><summary>Onde encontro meu código?</summary><p>Confira a mensagem de confirmação de envio da loja. O código de rastreio é disponibilizado depois que o pedido é despachado.</p></details>
        <details><summary>Meu código ainda não tem atualizações.</summary><p>A transportadora pode levar algum tempo para registrar os primeiros eventos. Confira se o código foi digitado corretamente e consulte novamente mais tarde.</p></details>
        <details><summary>Por que alguns eventos aparecem em outro idioma?</summary><p>A interface da consulta está em português. Algumas mensagens são enviadas pela própria transportadora e podem aparecer no idioma de origem.</p></details>
      </section>
    </main>
    <footer className="tracking-footer"><span>Dr. Althea · Um cuidado especial.</span><a href="/">Continuar explorando a loja <ArrowUpRight size={14}/></a></footer>
  </>;
}
