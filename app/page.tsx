'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Plus, Minus, Star, X, ShoppingBag, CreditCard, Truck, Volume2, Check, ShieldCheck, Sparkles, Menu } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import importedReviews from '@/lib/imported-reviews.json';
import { dadosProduto, fbEvento } from '@/lib/fbpixel';
import { useViewContent } from '@/hooks/useViewContent';
const money=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const loja={frete:'Frete grátis para todo o Brasil'};
const pixPrice=(price:number)=>Math.round(price*0.9*100)/100;
type Kit={qty:number;name:string;price:number;compareAt?:number;yampiCheckoutUrl:string;popular?:boolean};
type Asset=number|string;
type Product={
 slug:string;name:string;category:string;eyebrow:string;subtitle:string;
 volume:string;unit:string;cover:Asset|null;photos:Asset[];kits:Kit[];benefits:string[];
 rating:{score:number;count:number}|null;
 available:boolean;
 tabs:{descricao:string;ingredientes:{name:string;desc:string}[];uso:[string,string][];entrega:string};
 source:string|null;
};
const products:Product[]=[{
 slug:'345-relief-cream',
 name:'345 Relief Cream',
 category:'Hidratante facial diário',
 eyebrow:'HIDRATAÇÃO & CONFORTO',
 subtitle:'Um gesto leve. Um cuidado que fica.',
 volume:'50 ml · 1,69 fl.oz',
 unit:'50 ml',
 cover:3,
 photos:[3,1,4,5],
 kits:[{qty:1,name:'O seu primeiro ritual',price:221.11,yampiCheckoutUrl:'https://doctor-althea-br.pay.yampi.com.br/r/M4M6OCL21I:1'},{qty:2,name:'Cuidado em dobro',price:318.89,compareAt:434,yampiCheckoutUrl:'https://doctor-althea-br.pay.yampi.com.br/r/QVOGYCIMWS:1',popular:true},{qty:3,name:'Seu ritual completo',price:396.67,compareAt:651,yampiCheckoutUrl:'https://doctor-althea-br.pay.yampi.com.br/r/3O0P9HXJPF:1'}],
 benefits:['Hidratação equilibrada','Barreira de umidade','Textura mais suave','Textura leve, sem sensação pesada'],
 rating:{score:4.9,count:1091},
 available:true,
 tabs:{
  descricao:'Hidratante facial de textura leve para uma rotina de cuidado com a pele sensível. Niacinamida, pantenol e ceramida NP em uma fórmula para todos os dias. Segundo a Dr. Althea, a fórmula combina hidratação, suporte à barreira de umidade e cuidado com a aparência da textura da pele.',
  ingredientes:[
   {name:'Niacinamida',desc:'Presente na composição, ao lado de ingredientes hidratantes.'},
   {name:'Pantenol + ceramida NP',desc:'Parte da combinação de ingredientes para o cuidado diário.'},
   {name:'Centella + beta-glucana',desc:'Também integram a lista de ingredientes da fórmula.'}],
  uso:[['Prepare a pele','Comece com a pele limpa.'],['Aplique com delicadeza','Espalhe uma quantidade adequada no rosto.'],['Deixe absorver','Pressione suavemente e siga sua rotina.']],
  entrega:'Frete grátis para todo o Brasil. O processamento pode levar até 2 dias úteis e a entrega é estimada em até 20 dias úteis após o envio.'},
 source:'https://doctoraltheaglobal.com/products/345-relief-cream'
},{
 slug:'147-barrier-cream',
 name:'147 Barrier Cream',
 category:'Creme reparador da barreira',
 eyebrow:'BARREIRA & HIDRATAÇÃO PROFUNDA',
 subtitle:'Conforto profundo para uma barreira fortalecida.',
 volume:'50 ml · 1,69 fl.oz',
 unit:'50 ml',
 cover:'147-2.webp',
 photos:['147-2.webp','147-4.webp','147-3.webp','147-1.webp','147-5.webp','147-6.webp','147-7.webp','147-8.webp'],
 kits:[{qty:1,name:'O seu primeiro ritual',price:217,yampiCheckoutUrl:'https://doctor-althea-br.pay.yampi.com.br/r/S8V9ZGEIP2:1'},{qty:2,name:'Cuidado em dobro',price:317,compareAt:434,yampiCheckoutUrl:'https://doctor-althea-br.pay.yampi.com.br/r/71KGPVYCVZ:1',popular:true},{qty:3,name:'Seu ritual completo',price:397,compareAt:651,yampiCheckoutUrl:'https://doctor-althea-br.pay.yampi.com.br/r/QU9QSXCWLI:1'}],
 benefits:['Suporte à barreira de umidade','Hidratação profunda e duradoura','Conforto para a pele ressecada','Textura rica, sem acabamento oleoso'],
 rating:{score:4.9,count:297},
 available:true,
 tabs:{
  descricao:'Creme hidratante diário desenvolvido para peles secas, desidratadas, sensíveis ou com a barreira fragilizada. Segundo a Dr. Althea, sua textura rica e confortável ajuda a repor e reter a umidade, reduzindo a sensação de repuxamento, aspereza e desconforto sem deixar acabamento oleoso.',
  ingredientes:[
   {name:'Ceramida NP',desc:'Ingrediente presente na fórmula para o cuidado da barreira de umidade.'},
   {name:'Ectoína + esqualano',desc:'Combinados a ingredientes nutritivos e hidratantes para o conforto da pele.'},
   {name:'Complexo de ácido hialurônico',desc:'Sete formas de ácido hialurônico ajudam a oferecer hidratação em diferentes níveis.'},
   {name:'Centella + beta-glucana',desc:'Também integram a fórmula de cuidado para peles sensibilizadas.'}],
  uso:[['Finalize a rotina','Depois das etapas mais leves, aplique uma quantidade adequada no rosto.'],['Espalhe com delicadeza','Distribua o creme de maneira uniforme, sem esfregar excessivamente.'],['Ajude na absorção','Pressione suavemente a pele até o produto ser absorvido.']],
  entrega:'Frete grátis para todo o Brasil. O processamento pode levar até 2 dias úteis e a entrega é estimada em até 20 dias úteis após o envio.'},
 source:'https://doctoraltheaglobal.com/products/dralthea-147_barrier_cream'
}];
const faq:[string,string][]=[
 ['Como escolher entre o 345 e o 147?','O 345 Relief Cream tem proposta de hidratação leve para o cuidado diário. O 147 Barrier Cream oferece uma textura mais rica para pele seca, desidratada ou com a barreira sensibilizada.'],
 ['Qual é a textura do 345 Relief Cream?','Um creme de textura leve, pensado para a hidratação diária.'],
 ['Qual é a textura do 147 Barrier Cream?','Uma textura rica e confortável, especialmente indicada pelo fabricante para a rotina noturna, períodos frios ou momentos de maior ressecamento.'],
 ['O que vem em cada kit?','Você pode escolher 1, 2 ou 3 unidades de 50 ml do produto disponível.'],
 ['Como finalizo a compra?','Depois de escolher a quantidade e finalizar o carrinho, você será direcionado ao checkout seguro para informar entrega e pagamento.']];
const footerGallery=[
 ...Array.from({length:9},(_,i)=>({src:`/images/campaign-${i+1}.png`,alt:`345 Relief Cream — imagem ${i+1}`})),
 ...Array.from({length:8},(_,i)=>({src:`/images/147-${i+1}.webp`,alt:`147 Barrier Cream — imagem ${i+1}`})),
 {src:'/images/147-1-kit.jpg',alt:'147 Barrier Cream — kit'}
];
const ugcVideos=['ugc-01.mp4','ugc-02.mp4','ugc-03.mp4','ugc-04.mp4','ugc-05.mp4','ugc-06.mp4'];
const displayedReviews=importedReviews.filter(r=>r.rating>=4);
const reviewRows=[displayedReviews.filter((_,i)=>i%2===0),displayedReviews.filter((_,i)=>i%2===1)];
const institutional=[
 ['Sobre Nós','/sobre-nos'],['Trocas e Devoluções','/politica-trocas'],['Política de Privacidade','/politica-privacidade'],
 ['Política de Frete','/politica-frete'],['Política de Cookies','/politica-cookies'],['Termos de Serviço','/termos-servico'],['Aviso Legal','/aviso-legal']
] as const;
const support=[
 ['Fale Conosco','/fale-conosco'],['Falar com consultor','https://wa.me/5547920050963'],['FAQ','/faq'],
 ['Formas de Pagamento','/formas-pagamento'],['Rastrear pedido','/rastreio'],['Instagram · @dr.althea_br','https://www.instagram.com/dr.althea_br/']
] as const;
const assetSrc=(asset:Asset)=>typeof asset==='number'?`/images/campaign-${asset}.png`:`/images/${asset}`;
function Shot({n,alt,priority}:{n:Asset|null;alt:string;priority?:boolean}){
 if(n===null) return <div className="photo-pending"><span>Foto a definir</span></div>;
 return <img src={assetSrc(n)} alt={alt} loading={priority?undefined:'lazy'} fetchPriority={priority?'high':undefined} width="1122" height="1402"/>;
}
function Rating({score,count}:{score:number;count:number}){
 return <div className="rating"><span className="rating-stars" aria-hidden="true">{[1,2,3,4,5].map(n=><Star key={n} size={14} className={n<=Math.round(score)?'on':''}/>)}</span><strong>{score.toLocaleString('pt-BR',{minimumFractionDigits:1})}/5</strong><span className="rating-count">{count.toLocaleString('pt-BR')} avaliações</span></div>;
}
const tabDefs=[{id:'descricao',label:'DESCRIÇÃO'},{id:'ingredientes',label:'INGREDIENTES'},{id:'uso',label:'MODO DE USO'},{id:'entrega',label:'ENTREGA'}];
// Prefixo obrigatorio: slugs como "345-relief-cream" comecam com digito e viram
// seletor CSS invalido se usados crus como id.
const anchor=(slug:string)=>`produto-${slug}`;
type Line={slug:string;qty:number;n:number};
function UgcInline({onOpen}:{onOpen:(src:string)=>void}){
 return <section className="ugc-inline" id="experiencias" aria-label="Vídeos de experiências com os produtos">
  <div className="ugc-inline-heading"><span className="eyebrow">NA VIDA, NA ROTINA</span><h3>Veja o cuidado em movimento.</h3><p>Toque em um vídeo para assistir com som.</p></div>
  <Carousel className="ugc-inline-carousel" opts={{align:'start',loop:true}} aria-label="Deslize pelos vídeos de experiências">
   <CarouselContent>{ugcVideos.map((src,index)=><CarouselItem className="ugc-inline-slide" key={src}><button type="button" className="ugc-video-card" onClick={()=>onOpen(src)} aria-label={`Abrir experiência em vídeo ${index+1} com som`}><video autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}><source src={`/videos/${src}`} type="video/mp4"/></video><span className="ugc-sound-hint"><Volume2 size={14}/> ABRIR COM SOM</span></button></CarouselItem>)}</CarouselContent>
   <div className="carousel-controls"><span>Deslize para ver mais</span><div><CarouselPrevious aria-label="Vídeo anterior"/><CarouselNext aria-label="Próximo vídeo"/></div></div>
  </Carousel>
 </section>;
}
function ProductDetail({p,onAdd,onUgcOpen}:{p:Product;onAdd:(p:Product,kit:Kit)=>void;onUgcOpen:(src:string)=>void}){
 const secaoRef=useRef<HTMLElement>(null);
 useViewContent(secaoRef,{id:p.slug,nome:p.name,preco:p.kits[0].price});
 const [photo,setPhoto]=useState(p.photos[0]??null);
 const [selected,setSelected]=useState(String((p.kits.find(k=>k.popular)??p.kits[0])?.qty??''));
 const [tab,setTab]=useState('descricao');
 const kit=p.kits.find(k=>String(k.qty)===selected);
 return <section className="pdp" id="produto" ref={secaoRef}>
 <div className="pdp-media"><div className="pdp-visual"><span className="eyebrow image-label">{p.eyebrow}</span><Shot n={photo} alt={`${p.name} — fotografia do produto`}/></div>{p.photos.length>1&&<div className="thumbnails" aria-label="Fotos do produto">{p.photos.map((n,i)=><button key={n} onClick={()=>setPhoto(n)} aria-label={`Ver foto ${i+1} do produto`} aria-pressed={photo===n}><img src={assetSrc(n)} alt="" loading="lazy" width="1122" height="1402"/></button>)}</div>}</div>
 <div className="pdp-info">
  <span className="pdp-crumb">DR. ALTHEA · {p.category}</span>
  {p.rating&&<Rating score={p.rating.score} count={p.rating.count}/>}
  <h2>{p.name}</h2>
  <p className="pdp-subtitle">{p.subtitle} <span>{p.volume}</span></p>
  {p.benefits.length>0?<div className="pdp-benefits" aria-label="Principais benefícios">{p.benefits.slice(0,3).map(b=><div key={b}><Check size={13}/><p>{b}</p></div>)}</div>:<p className="pending-note">Benefícios a preencher.</p>}
  {p.kits.length>0?<>
   <div className="kit-heading"><div><span className="eyebrow">COMPRE MAIS, ECONOMIZE MAIS</span><p>Escolha seu kit · {p.unit} por unidade</p></div></div>
   <RadioGroup value={selected} onValueChange={v=>setSelected(String(v))} aria-label="Escolha a quantidade" className="kit-options">{p.kits.map(k=>{const off=(k.compareAt??k.price)-k.price;return <label className={`kit-option ${selected===String(k.qty)?'selected':''}`} key={k.qty}>
    {k.popular&&<i className="kit-badge">MAIS ESCOLHIDO ✦</i>}
    <RadioGroupItem value={String(k.qty)} aria-label={`${k.qty} ${k.qty===1?'unidade':'unidades'}`}/>
    <span className="kit-label"><strong>{k.qty} {k.qty===1?'Unidade':'Unidades'}{off>0&&<i className="kit-off">Economize {money(off)}</i>}</strong><small>no Pix: <b>{money(pixPrice(k.price))}</b></small></span>
    <span className="kit-price"><strong>{money(k.price)}</strong>{off>0&&<s>{money(k.compareAt!)}</s>}</span></label>})}</RadioGroup>
   {p.available?<>
   <div className="pdp-pix-note"><Sparkles size={17}/> No Pix, você economiza {money(kit!.price-pixPrice(kit!.price))}</div>
   <Button className="button pdp-button" onClick={()=>onAdd(p,kit!)}>COMPRAR AGORA <ArrowRight size={18}/></Button>
   <div className="pdp-terms"><span><CreditCard size={15}/> 3x sem juros</span><span><Truck size={15}/> {loja.frete}</span></div></>:<p className="pending-note">Produto esgotado no momento.</p>}</>:<p className="pending-note">Produto indisponível no momento.</p>}
  <UgcInline onOpen={onUgcOpen}/>
  <div className="pdp-tabs">
   <div className="tab-list" role="tablist" aria-label={`Informações sobre ${p.name}`}>{tabDefs.map(t=><button key={t.id} role="tab" id={`${anchor(p.slug)}-tab-${t.id}`} aria-selected={tab===t.id} aria-controls={`${anchor(p.slug)}-panel-${t.id}`} className={tab===t.id?'active':''} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
   {tabDefs.map(t=><div key={t.id} role="tabpanel" id={`${anchor(p.slug)}-panel-${t.id}`} aria-labelledby={`${anchor(p.slug)}-tab-${t.id}`} className="tab-panel" hidden={tab!==t.id}>
    {t.id==='descricao'&&<p>{p.tabs.descricao}</p>}
    {t.id==='ingredientes'&&(p.tabs.ingredientes.length>0?<dl className="tab-list-items">{p.tabs.ingredientes.map(i=><div key={i.name}><dt>{i.name}</dt><dd>{i.desc}</dd></div>)}</dl>:<p className="pending-note">Ingredientes a preencher.</p>)}
    {t.id==='uso'&&(p.tabs.uso.length>0?<dl className="tab-list-items">{p.tabs.uso.map(([title,desc],i)=><div key={title}><dt>0{i+1} · {title}</dt><dd>{desc}</dd></div>)}</dl>:<p className="pending-note">Etapas a preencher.</p>)}
    {t.id==='entrega'&&<p>{p.tabs.entrega}</p>}
   </div>)}
  </div>
  </div>
 </section>;
}
export default function Home(){
 const [activeProduct,setActiveProduct]=useState(0);
 const heroProduct=products[activeProduct];
 const jumpToProduct=(index:number)=>{
  setActiveProduct(index);
  requestAnimationFrame(()=>document.getElementById('produto')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 };
 useEffect(()=>{
  const scrollWithoutHash=(event:MouseEvent)=>{
   if(event.defaultPrevented||!(event.target instanceof Element)) return;
   const link=event.target.closest<HTMLAnchorElement>('a[href^="#"]');
   if(!link||!link.hash) return;
   const section=document.getElementById(decodeURIComponent(link.hash.slice(1)));
   if(!section) return;
   event.preventDefault();
   section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };
  document.addEventListener('click',scrollWithoutHash);
  return ()=>document.removeEventListener('click',scrollWithoutHash);
 },[]);
 const [ugcOpen,setUgcOpen]=useState<string|null>(null);
 const [mobileMenu,setMobileMenu]=useState(false);
 const [lines,setLines]=useState<Line[]>([]);
 const [cartOpen,setCartOpen]=useState(false);
 const find=(slug:string,qty:number)=>products.find(p=>p.slug===slug)!.kits.find(k=>k.qty===qty)!;
 const add=(p:Product,kit:Kit)=>{
  setLines(prev=>{const i=prev.findIndex(l=>l.slug===p.slug&&l.qty===kit.qty); if(i<0) return [...prev,{slug:p.slug,qty:kit.qty,n:1}]; const next=[...prev]; next[i]={...next[i],n:next[i].n+1}; return next});
  fbEvento('AddToCart',dadosProduto({id:p.slug,nome:p.name,preco:p.kits[0].price,quantidade:kit.qty}));
  setCartOpen(true);
 };
 const setN=(slug:string,qty:number,n:number)=>setLines(prev=>n<=0?prev.filter(l=>!(l.slug===slug&&l.qty===qty)):prev.map(l=>l.slug===slug&&l.qty===qty?{...l,n}:l));
 const itens=lines.reduce((s,l)=>s+l.n,0);
 const subtotal=lines.reduce((s,l)=>s+find(l.slug,l.qty).price*l.n,0);
 const checkout=()=>{
  const items=lines.map(l=>{
   const token=find(l.slug,l.qty).yampiCheckoutUrl.split('/r/')[1]?.split(/[?:]/)[0];
   return token?`${token}:${l.n}`:'';
  }).filter(Boolean).join(',');
  if(items) window.location.href=`https://doctor-althea-br.pay.yampi.com.br/r/${items}`;
 };
 return <>
 <div className="announcement">FRETE GRÁTIS PARA TODO O BRASIL <span>·</span> CUIDADO COREANO ORIGINAL</div>
 <header className={`header ${mobileMenu?'menu-open':''}`}><button className="mobile-nav-toggle" type="button" aria-label={mobileMenu?'Fechar menu':'Abrir menu'} aria-expanded={mobileMenu} onClick={()=>setMobileMenu(v=>!v)}>{mobileMenu?<X size={23}/>:<Menu size={23}/>}</button><nav aria-label="Navegação principal"><a href="#produto" onClick={()=>setMobileMenu(false)}>Produtos</a><a href="#experiencias" onClick={()=>setMobileMenu(false)}>Experiências</a><a href="#perguntas" onClick={()=>setMobileMenu(false)}>Perguntas</a><a href="/rastreio">Rastrear pedido</a></nav><a className="brand" href="#inicio" aria-label="Dr. Althea — início"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a><button className="cart-open" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho, ${itens} ${itens===1?'item':'itens'}`}><ShoppingBag size={18}/><span>CARRINHO</span><span className="cart-count">{itens}</span></button></header>
 <main id="inicio" className="lily-inspired">
 <section className="li-hero" aria-label="Produtos Dr. Althea">
  <div className="li-hero-copy"><span className="li-overline">DR. ALTHEA · SKINCARE COREANO</span><div className="li-hero-body"><span className="li-index">0{activeProduct+1} / 0{products.length}</span><h1>{activeProduct===0?<>Sua pele merece<br/><em>um respiro.</em></>:<>Sua barreira merece<br/><em>mais cuidado.</em></>}</h1><p>{activeProduct===0?'Hidratação leve e conforto para transformar o cuidado diário em um momento seu.':'Textura rica e confortável para uma rotina de hidratação e cuidado da barreira de umidade.'}</p><div className="li-hero-price"><strong>A partir de {money(heroProduct.kits[0].price)}</strong><span>{money(pixPrice(heroProduct.kits[0].price))} no Pix</span></div><button className="li-hero-cta" onClick={()=>jumpToProduct(activeProduct)}>Conhecer {heroProduct.name} <ArrowRight size={19}/></button></div><div className="li-hero-switch" role="tablist" aria-label="Escolher produto em destaque">{products.map((p,i)=><button key={p.slug} type="button" role="tab" aria-selected={i===activeProduct} onClick={()=>setActiveProduct(i)}><span>0{i+1}</span>{p.name}</button>)}</div></div>
  <div className="li-hero-stage"><img key={heroProduct.slug} className={activeProduct===0?'li-hero-image-345':undefined} src={activeProduct===0?'/images/hero-345.png':assetSrc(heroProduct.cover!)} alt={heroProduct.name} width="1122" height="1402" fetchPriority="high"/><div className="li-stage-label"><span>{heroProduct.name.toUpperCase()}</span><span>50 ML · CUIDADO DIÁRIO</span></div></div>
 </section>
 <div className="li-trust" aria-label="Condições da loja"><span><Truck size={19}/> Frete grátis em todo o Brasil</span><span><CreditCard size={19}/> Até 3x sem juros</span><span><ShieldCheck size={19}/> Produtos originais</span></div>
 <section className="li-product-intro" aria-label="Escolha seu cuidado"><span className="eyebrow">ESCOLHA O SEU CUIDADO</span><h2>O essencial para cada momento da sua pele.</h2><div className="li-product-switch" role="tablist" aria-label="Escolher produto">{products.map((p,i)=><button key={p.slug} role="tab" aria-selected={activeProduct===i} onClick={()=>setActiveProduct(i)}><img src={assetSrc(p.cover!)} alt="" width="70" height="70"/><span><strong>{p.name}</strong><small>{p.category}</small></span><ArrowRight size={17}/></button>)}</div></section>
 <ProductDetail key={heroProduct.slug} p={heroProduct} onAdd={add} onUgcOpen={setUgcOpen}/>
 <section className="li-story" id="beneficios"><div className="li-story-photo"><img src={assetSrc(activeProduct===0?4:'147-4.webp')} alt={`Detalhe do ${heroProduct.name}`} loading="lazy" width="1122" height="1402"/></div><div className="li-story-copy"><span className="eyebrow">POR QUE ESCOLHER</span><h2>{activeProduct===0?<>Leveza para a pele.<br/><em>Espaço para você.</em></>:<>Mais conforto.<br/><em>Todos os dias.</em></>}</h2><p>{heroProduct.tabs.descricao}</p><div className="li-benefit-list">{heroProduct.benefits.map((benefit,i)=><div key={benefit}><span>0{i+1}</span><strong>{benefit}</strong></div>)}</div></div></section>
 <section className="reviews section" id="avaliacoes"><div className="section-heading"><div><span className="eyebrow">AVALIAÇÕES</span><h2>O cuidado, por quem usa.</h2></div></div><div className="review-marquees">{reviewRows.map((row,rowIndex)=><div className="review-track" key={rowIndex}><div className={"review-rail "+(rowIndex===1?"reverse":"")} style={{animationDuration:row.length*10+"s"}}>{[...row,...row].map((r,i)=><article key={rowIndex+"-"+i} aria-hidden={i>=row.length}><div className="review-card-body"><div className="review-card-head"><strong>{r.name}</strong></div><div className="review-stars" aria-label={r.rating+" de 5 estrelas"}>{[1,2,3,4,5].map(n=><Star key={n} size={14} className={n<=r.rating?"on":""}/>)}</div><blockquote>“{r.text}”</blockquote>{r.pictures.length>0&&<div className="review-photos">{r.pictures.map(src=><div key={src} className="review-photo"><img src={src} alt={"Foto enviada na avaliação de "+r.name} loading="lazy" decoding="async" referrerPolicy="no-referrer"/></div>)}</div>}</div></article>)}</div></div>)}</div></section>
 <section className="li-how" id="modo-de-uso"><div className="li-section-head"><span className="eyebrow">MODO DE USO</span><h2>Um ritual simples, do seu jeito.</h2><p>Três passos para incluir {heroProduct.name} na sua rotina.</p></div><div className="li-steps">{heroProduct.tabs.uso.map(([title,desc],i)=><div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>
 <section className="li-ingredients" id="ingredientes"><div className="li-ingredients-lead"><span className="eyebrow">A FÓRMULA</span><h2>Cuidado em cada detalhe.</h2><p>Conheça alguns dos ingredientes presentes no {heroProduct.name}.</p></div><div className="li-ingredient-grid">{heroProduct.tabs.ingredientes.slice(0,3).map((ingredient,i)=><article key={ingredient.name}><span>0{i+1}</span><h3>{ingredient.name}</h3><p>{ingredient.desc}</p></article>)}</div></section>
 <section className="faq section" id="perguntas"><div><span className="eyebrow">SUAS PERGUNTAS</span><h2>Conheça melhor.<br/>Cuide com calma.</h2></div><div className="questions">{faq.map(([q,a])=><details key={q}><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></section>
 <section className="li-final"><span className="eyebrow">COMECE SEU RITUAL</span><h2>O cuidado que a sua pele<br/><em>merece, todos os dias.</em></h2><p>Escolha entre hidratação leve e conforto profundo. Encontre o seu Dr. Althea.</p><button className="li-hero-cta" onClick={()=>jumpToProduct(activeProduct)}>Escolher meu kit <ArrowRight size={19}/></button><div><span>✓ Frete grátis</span><span>✓ Até 3x sem juros</span><span>✓ Compra segura</span></div></section>
 <section className="footer-lifestyle" aria-label="Galeria Dr. Althea"><div className="footer-lifestyle-track">{[false,true].map(copy=><div className="footer-lifestyle-group" key={String(copy)} aria-hidden={copy}>{footerGallery.map(image=><figure key={image.src}><img src={image.src} alt={copy?'':image.alt} loading="lazy" width="1122" height="1402"/></figure>)}</div>)}</div></section>
 </main><footer className="footer-v2"><div className="footer-grid"><div className="footer-intro"><a className="footer-brand" href="#inicio"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a><p>Uma rotina simples.<br/>Um cuidado especial.</p><span className="eyebrow">SKINCARE / DAILY ESSENTIALS</span></div><div><h3>Institucional</h3>{institutional.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div><div><h3>Atendimento</h3>{support.map(([label,href])=><a key={href} href={href} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noreferrer':undefined}>{label}</a>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} · Doctor Althea Brasil</span><span>BRASIL · PORTUGUÊS</span><a href="#inicio">Voltar ao início ↑</a></div></footer>
 <Sheet open={cartOpen} onOpenChange={setCartOpen}><SheetContent side="right" className="cart-panel"><SheetTitle>Seu carrinho</SheetTitle><SheetDescription className="cart-sub">{itens===0?'Nenhum item adicionado.':`${itens} ${itens===1?'item':'itens'}`}</SheetDescription>
  {lines.length>0&&<div className="cart-lines">{lines.map(l=>{const p=products.find(x=>x.slug===l.slug)!;const k=find(l.slug,l.qty);return <div className="cart-line" key={`${l.slug}-${l.qty}`}>
   <div className="cart-thumb"><Shot n={p.cover} alt=""/></div>
   <div className="cart-body"><strong>{p.name}</strong><small>{k.qty} {k.qty===1?'unidade':'unidades'} · {k.name}</small>
    <div className="cart-step"><button onClick={()=>setN(l.slug,l.qty,l.n-1)} aria-label={`Diminuir ${p.name}, kit de ${k.qty}`}><Minus size={13}/></button><span aria-live="polite">{l.n}</span><button onClick={()=>setN(l.slug,l.qty,l.n+1)} aria-label={`Aumentar ${p.name}, kit de ${k.qty}`}><Plus size={13}/></button><button className="cart-remove" onClick={()=>setN(l.slug,l.qty,0)} aria-label={`Remover ${p.name}, kit de ${k.qty}`}><X size={13}/></button></div></div>
   <span className="cart-line-price">{money(k.price*l.n)}</span></div>})}</div>}
  {lines.length>0&&<div className="cart-foot"><div className="cart-row"><span>Subtotal</span><span>{money(subtotal)}</span></div><p className="cart-note">{loja.frete}</p><Button className="button cart-checkout" onClick={checkout}>Finalizar compra <ArrowRight size={16}/></Button></div>}
 </SheetContent></Sheet>
 <Dialog open={ugcOpen!==null} onOpenChange={open=>{if(!open)setUgcOpen(null)}}><DialogContent className="ugc-dialog"><DialogTitle className="sr-only">Vídeo de experiência</DialogTitle><DialogDescription className="sr-only">Reprodução ampliada com áudio e controles.</DialogDescription>{ugcOpen&&<video key={ugcOpen} controls autoPlay playsInline><source src={`/videos/${ugcOpen}`} type="video/mp4"/>Seu navegador não oferece suporte à reprodução de vídeo.</video>}</DialogContent></Dialog>
 </>;
}
