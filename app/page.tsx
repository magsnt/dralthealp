'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Plus, Minus, Star, X, ShoppingBag } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
const money=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const loja={pixOff:30,parcelas:3,frete:'Frete grátis · entrega em 14 a 28 dias úteis'};
type Kit={qty:number;name:string;price:number;popular?:boolean};
type Product={
 slug:string;name:string;category:string;eyebrow:string;subtitle:string;
 volume:string;unit:string;cover:number|null;photos:number[];kits:Kit[];benefits:string[];
 rating:{score:number;count:number}|null;
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
 kits:[{qty:1,name:'O seu primeiro ritual',price:247},{qty:2,name:'Cuidado em dobro',price:449,popular:true},{qty:3,name:'Seu ritual completo',price:629}],
 benefits:['Hidratação equilibrada','Barreira de umidade','Textura mais suave','Textura leve, sem sensação pesada'],
 rating:{score:4.9,count:1091},
 tabs:{
  descricao:'Hidratante facial de textura leve para uma rotina de cuidado com a pele sensível. Niacinamida, pantenol e ceramida NP em uma fórmula para todos os dias. Segundo a Dr. Althea, a fórmula combina hidratação, suporte à barreira de umidade e cuidado com a aparência da textura da pele.',
  ingredientes:[
   {name:'Niacinamida',desc:'Presente na composição, ao lado de ingredientes hidratantes.'},
   {name:'Pantenol + ceramida NP',desc:'Parte da combinação de ingredientes para o cuidado diário.'},
   {name:'Centella + beta-glucana',desc:'Também integram a lista de ingredientes da fórmula.'}],
  uso:[['Prepare a pele','Comece com a pele limpa.'],['Aplique com delicadeza','Espalhe uma quantidade adequada no rosto.'],['Deixe absorver','Pressione suavemente e siga sua rotina.']],
  entrega:'Frete grátis para todo o Brasil. A entrega acontece em 14 a 28 dias úteis após a confirmação do pagamento.'},
 source:'https://doctoraltheaglobal.com/products/345-relief-cream'
},{
 slug:'segundo',
 name:'Segundo produto',
 category:'Categoria a definir',
 eyebrow:'EM PREPARAÇÃO',
 subtitle:'Nome e apresentação a definir.',
 volume:'Volume a definir',
 unit:'—',
 cover:null,
 photos:[],
 kits:[],
 benefits:[],
 rating:null,
 tabs:{
  descricao:'Este espaço está reservado para o segundo produto da linha. Nome, descrição, ingredientes, fotos e valores serão preenchidos quando as informações forem confirmadas.',
  ingredientes:[],
  uso:[],
  entrega:'As condições de entrega serão informadas junto com as do restante da linha.'},
 source:null
}];
const faq:[string,string][]=[
 ['Como incluir na minha rotina?','Aplique na etapa de hidratação, sobre a pele limpa, e espalhe suavemente até a absorção. Siga as orientações da embalagem.'],
 ['Qual é a textura do 345 Relief Cream?','Um creme de textura leve, pensado para a hidratação diária.'],
 ['O que vem em cada kit?','As opções desta prévia apresentam 1, 2 ou 3 unidades de 50 ml. Quantidades e preços comerciais ainda serão confirmados.'],
 ['Quando poderei comprar?','Estamos preparando a loja. A disponibilidade, os valores finais e as condições de entrega serão informados antes da abertura das vendas.']];
const gallery=[{id:2,label:'Um momento de pausa'},{id:7,label:'Essencial para levar'},{id:8,label:'Sempre por perto'},{id:4,label:'A delicadeza da textura'},{id:9,label:'Cuidado que acompanha você'}];
const institutional=['Sobre Nós','Trocas e Devoluções','Política de Privacidade','Política de Frete','Política de Cookies','Termos de Serviço','Aviso Legal'];
const support=['Fale Conosco','Falar com consultor','FAQ','Formas de Pagamento','Rastrear pedido'];
const info:Record<string,string>={
'Sobre Nós':'Estamos preparando a apresentação da loja. Em breve, você poderá conhecer nossa história e nossa proposta de cuidado.',
'Trocas e Devoluções':'A política de trocas e devoluções será disponibilizada antes da abertura das vendas.',
'Política de Privacidade':'A política de privacidade está em preparação e será disponibilizada antes da abertura das vendas.',
'Política de Frete':'Frete grátis para todo o Brasil, com entrega em 14 a 28 dias úteis. As regiões atendidas e as demais condições serão detalhadas antes da abertura das vendas.',
'Política de Cookies':'As informações sobre cookies serão disponibilizadas de acordo com os serviços utilizados na versão final da loja.',
'Termos de Serviço':'Os termos de serviço serão disponibilizados antes da abertura das vendas.',
'Aviso Legal':'As informações legais e a identificação da empresa responsável serão disponibilizadas na versão final da loja.',
'Fale Conosco':'O canal de atendimento será disponibilizado em breve.',
'Falar com consultor':'O contato do consultor será disponibilizado em breve.',
'Formas de Pagamento':'Pix e cartão em até 3x sem juros. As bandeiras aceitas e as demais formas serão confirmadas após a configuração da loja.',
'Rastrear pedido':'O acesso ao rastreamento será disponibilizado após a definição da operação de entrega.'};
function Shot({n,alt,priority}:{n:number|null;alt:string;priority?:boolean}){
 if(n===null) return <div className="photo-pending"><span>Foto a definir</span></div>;
 return <img src={`/images/campaign-${n}.png`} alt={alt} loading={priority?undefined:'lazy'} fetchPriority={priority?'high':undefined} width="1122" height="1402"/>;
}
function Rating({score,count}:{score:number;count:number}){
 return <div className="rating"><span className="rating-stars" aria-hidden="true">{[1,2,3,4,5].map(n=><Star key={n} size={13} className={n<=Math.round(score)?'on':''}/>)}</span><span>{score.toLocaleString('pt-BR',{minimumFractionDigits:1})}/5</span><span className="rating-count">{count.toLocaleString('pt-BR')} avaliações</span></div>;
}
const tabDefs=[{id:'descricao',label:'DESCRIÇÃO'},{id:'ingredientes',label:'INGREDIENTES'},{id:'uso',label:'MODO DE USO'},{id:'entrega',label:'ENTREGA'}];
// Prefixo obrigatorio: slugs como "345-relief-cream" comecam com digito e viram
// seletor CSS invalido se usados crus como id.
const anchor=(slug:string)=>`produto-${slug}`;
type Line={slug:string;qty:number;n:number};
function ProductDetail({p,onAdd}:{p:Product;onAdd:(p:Product,kit:Kit)=>void}){
 const [photo,setPhoto]=useState(p.photos[0]??null);
 const [selected,setSelected]=useState(String((p.kits.find(k=>k.popular)??p.kits[0])?.qty??''));
 const [tab,setTab]=useState('descricao');
 const kit=p.kits.find(k=>String(k.qty)===selected);
 return <section className="pdp" id={anchor(p.slug)}>
 <div className="pdp-info">
  <span className="pdp-crumb">Dr. Althea / {p.name}</span>
  <h2>{p.name}</h2>
  {p.rating&&<Rating score={p.rating.score} count={p.rating.count}/>}
  <p className="pdp-price">{kit?money(kit.price):'Valor a definir'}</p>
  {kit&&<p className="pdp-pix">{money(kit.price-loja.pixOff)} no Pix <em>economize {money(loja.pixOff)}</em></p>}
  {kit&&<p className="pdp-terms">ou em até {loja.parcelas}x de {money(kit.price/loja.parcelas)} sem juros</p>}
  <p className="pdp-volume">{p.volume}</p>
  <p className="pdp-subtitle">{p.subtitle}</p>
  {p.benefits.length>0?<div className="pdp-benefits"><span className="eyebrow green">PRINCIPAIS BENEFÍCIOS</span><ul>{p.benefits.map(b=><li key={b}>{b}</li>)}</ul></div>:<p className="pending-note">Benefícios a preencher.</p>}
  {p.kits.length>0?<><RadioGroup value={selected} onValueChange={v=>setSelected(String(v))} aria-label="Escolha um kit ilustrativo" className="kit-options">{p.kits.map(k=><label className={`kit-option ${selected===String(k.qty)?'selected':''}`} key={k.qty}><RadioGroupItem value={String(k.qty)} aria-label={`${k.qty} ${k.qty===1?'unidade':'unidades'}`}/><span><strong>{k.qty} {k.qty===1?'unidade':'unidades'}{k.popular&&<i className="kit-badge">MAIS POPULAR</i>}</strong><small>{k.name}</small></span><span className="kit-price">{money(k.price)}<small>{money(k.price/k.qty)} / un.</small></span></label>)}</RadioGroup><Button className="button pdp-button" onClick={()=>onAdd(p,kit!)}>Adicionar ao carrinho <ArrowRight size={16}/></Button><p className="pdp-shipping">{loja.frete}</p><p className="demo-label">Prévia de design · valores fictícios, compra indisponível.</p></>:<p className="pending-note">Kits, volumes e valores serão definidos junto com as informações deste produto.</p>}
  <div className="pdp-tabs">
   <div className="tab-list" role="tablist" aria-label={`Informações sobre ${p.name}`}>{tabDefs.map(t=><button key={t.id} role="tab" id={`${anchor(p.slug)}-tab-${t.id}`} aria-selected={tab===t.id} aria-controls={`${anchor(p.slug)}-panel-${t.id}`} className={tab===t.id?'active':''} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
   {tabDefs.map(t=><div key={t.id} role="tabpanel" id={`${anchor(p.slug)}-panel-${t.id}`} aria-labelledby={`${anchor(p.slug)}-tab-${t.id}`} className="tab-panel" hidden={tab!==t.id}>
    {t.id==='descricao'&&<p>{p.tabs.descricao}</p>}
    {t.id==='ingredientes'&&(p.tabs.ingredientes.length>0?<dl className="tab-list-items">{p.tabs.ingredientes.map(i=><div key={i.name}><dt>{i.name}</dt><dd>{i.desc}</dd></div>)}</dl>:<p className="pending-note">Ingredientes a preencher.</p>)}
    {t.id==='uso'&&(p.tabs.uso.length>0?<dl className="tab-list-items">{p.tabs.uso.map(([title,desc],i)=><div key={title}><dt>0{i+1} · {title}</dt><dd>{desc}</dd></div>)}</dl>:<p className="pending-note">Etapas a preencher.</p>)}
    {t.id==='entrega'&&<p>{p.tabs.entrega}</p>}
   </div>)}
   {p.source&&<a className="source-link" href={p.source} target="_blank" rel="noreferrer">Informações do fabricante <ArrowUpRight size={13}/></a>}
  </div>
 </div>
 <div className="pdp-media"><div className="pdp-visual"><span className="eyebrow image-label">{p.eyebrow}</span><Shot n={photo} alt={`${p.name} — fotografia do produto`}/></div>{p.photos.length>1&&<div className="thumbnails" aria-label="Fotos do produto">{p.photos.map((n,i)=><button key={n} onClick={()=>setPhoto(n)} aria-label={`Ver foto ${i+1} do produto`} aria-pressed={photo===n}><img src={`/images/campaign-${n}.png`} alt="" loading="lazy" width="1122" height="1402"/></button>)}</div>}</div>
 </section>;
}
export default function Home(){
 const [modal,setModal]=useState<string|null>(null);
 const [lines,setLines]=useState<Line[]>([]);
 const [cartOpen,setCartOpen]=useState(false);
 const find=(slug:string,qty:number)=>products.find(p=>p.slug===slug)!.kits.find(k=>k.qty===qty)!;
 const add=(p:Product,kit:Kit)=>{
  setLines(prev=>{const i=prev.findIndex(l=>l.slug===p.slug&&l.qty===kit.qty); if(i<0) return [...prev,{slug:p.slug,qty:kit.qty,n:1}]; const next=[...prev]; next[i]={...next[i],n:next[i].n+1}; return next});
  setCartOpen(true);
 };
 const setN=(slug:string,qty:number,n:number)=>setLines(prev=>n<=0?prev.filter(l=>!(l.slug===slug&&l.qty===qty)):prev.map(l=>l.slug===slug&&l.qty===qty?{...l,n}:l));
 const itens=lines.reduce((s,l)=>s+l.n,0);
 const subtotal=lines.reduce((s,l)=>s+find(l.slug,l.qty).price*l.n,0);
 return <>
 <div className="announcement">Cuidado coreano. Um momento só seu.</div>
 <header className="header"><nav aria-label="Navegação principal"><a href="#produtos">Produtos</a><a href="#perguntas">Perguntas</a></nav><a className="brand" href="#inicio" aria-label="Dr. Althea — início"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a><button className="cart-open" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho, ${itens} ${itens===1?'item':'itens'}`}><ShoppingBag size={16}/> CARRINHO <span className="cart-count">{itens}</span></button></header>
 <main id="inicio">
 <section className="hero"><div className="hero-copy"><span className="eyebrow">DR. ALTHEA / DAILY SKIN ESSENTIALS</span><div><h1>Um respiro.<br/>Para a sua pele.</h1><p>Hidratação leve. Cuidado delicado.<br/>Redescubra a beleza de uma rotina simples.</p><a className="button" href="#produtos">Conheça a linha <ArrowUpRight size={18}/></a></div><a className="scroll-link" href="#produtos"><ArrowDown size={15}/> O cuidado começa aqui</a></div><div className="hero-photo hero-campaign"><img src="/images/campaign-9.png" alt="Modelo segurando o 345 Relief Cream em uma composição clara" fetchPriority="high" width="1122" height="1402"/><div className="photo-caption"><span>DAILY SKIN ESSENTIALS</span><span>O ESSENCIAL, TODOS OS DIAS.</span></div></div></section>
 <section className="catalog" id="produtos"><div className="catalog-head"><span className="eyebrow">A LINHA</span><h2>Produtos</h2></div><div className="catalog-grid" style={{'--cols':Math.min(3,products.length)} as React.CSSProperties}>{products.map(p=><article key={p.slug} className="catalog-card"><a className="catalog-visual" href={`#${anchor(p.slug)}`} aria-label={`Ver ${p.name}`}><Shot n={p.cover} alt={`${p.name} — capa`}/></a><div className="catalog-info"><div className="catalog-line"><a href={`#${anchor(p.slug)}`}>{p.name}</a><span>{p.kits.length>0?money(p.kits[0].price):'—'}</span></div><p>{p.category}</p>{p.rating&&<Rating score={p.rating.score} count={p.rating.count}/>}</div>{p.kits.length>0?<button className="catalog-button" onClick={()=>add(p,p.kits.find(k=>k.popular)??p.kits[0])}>ADICIONAR AO CARRINHO <ArrowRight size={14}/></button>:<a className="catalog-button pending" href={`#${anchor(p.slug)}`}>EM BREVE <ArrowRight size={14}/></a>}</article>)}</div><p className="section-note">Prévia de design · valores fictícios, compra indisponível.</p></section>
 {products.map(p=><ProductDetail key={p.slug} p={p} onAdd={add}/>)}
 <section className="ugc section" id="experiencias"><div className="section-heading"><div><span className="eyebrow">NA VIDA, NA ROTINA</span><h2>Pequenos gestos.<br/>Diferentes momentos.</h2></div><p>O cuidado encontra espaço no seu dia.</p></div><div className="ugc-grid">{[{n:6,title:'O toque do cuidado',sub:'Um momento para a pele'},{n:8,title:'Vai com você',sub:'O essencial na sua nécessaire'},{n:9,title:'Seu ritual, seu tempo',sub:'Beleza nos pequenos gestos'}].map(x=><figure key={x.n}><img src={`/images/campaign-${x.n}.png`} alt={x.title} loading="lazy" width="1122" height="1402"/><figcaption><h3>{x.title}</h3><p>{x.sub}</p></figcaption></figure>)}</div><p className="section-note">Imagens editoriais. Vídeos de experiências em breve.</p></section>
 <section className="faq section" id="perguntas"><div><span className="eyebrow">SUAS PERGUNTAS</span><h2>Conheça melhor.<br/>Cuide com calma.</h2></div><div className="questions">{faq.map(([q,a])=><details key={q}><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></section>
 <section className="reviews section" id="avaliacoes"><div className="section-heading"><div><span className="eyebrow">AVALIAÇÕES</span><h2>Quem cuida, conta.</h2></div><p className="review-disclaimer">Exemplos fictícios para visualizar o layout.<br/>Não representam experiências de clientes.</p></div><div className="review-grid">{[{name:'Marina',text:'Gostei de reservar alguns minutos do dia só para cuidar de mim. O produto encontrou um lugar na minha rotina.'},{name:'Camila',text:'A apresentação delicada e a proposta de uma rotina simples são o que mais chamaram minha atenção.'},{name:'Beatriz',text:'Um pequeno ritual que combina com os meus momentos de pausa. Adorei a ideia de levar na nécessaire.'}].map(r=><article key={r.name}><div className="review-stars" aria-label="5 estrelas — exemplo fictício">{[1,2,3,4,5].map(n=><Star key={n} size={13}/>)}</div><blockquote>“{r.text}”</blockquote><div className="review-person"><span>{r.name}<small>Personagem fictícia</small></span><span>EXEMPLO</span></div></article>)}</div></section>
 <section className="moments section" id="galeria"><div className="section-heading"><div><span className="eyebrow">UM OLHAR MAIS DE PERTO</span><h2>O essencial, em cena.</h2></div><p>Texturas, luz e pequenos rituais.</p></div><Carousel className="editorial-carousel" opts={{align:'start',loop:false}} aria-label="Galeria de imagens do produto"><CarouselContent>{gallery.map(g=><CarouselItem key={g.id} className="gallery-slide"><figure><img src={`/images/campaign-${g.id}.png`} alt={g.label} loading="lazy" width="1122" height="1402"/><figcaption>{g.label}</figcaption></figure></CarouselItem>)}</CarouselContent><div className="carousel-controls"><span>Arraste para explorar</span><div><CarouselPrevious aria-label="Imagem anterior"/><CarouselNext aria-label="Próxima imagem"/></div></div></Carousel></section>
 <section className="closing"><span className="eyebrow">O ESSENCIAL, TODOS OS DIAS.</span><h2>Seu próximo ritual<br/>começa com um gesto.</h2><a className="button" href="#produtos">Ver produtos <ArrowUpRight size={18}/></a></section>
 </main><footer className="footer-v2"><div className="footer-grid"><div className="footer-intro"><a className="footer-brand" href="#inicio"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a><p>Uma rotina simples.<br/>Um cuidado especial.</p><span className="eyebrow">SKINCARE / DAILY ESSENTIALS</span></div><div><h3>Institucional</h3>{institutional.map(label=><button key={label} onClick={()=>setModal(label)}>{label}</button>)}</div><div><h3>Atendimento</h3>{support.map(label=>label==='FAQ'?<a key={label} href="#perguntas">FAQ</a>:<button key={label} onClick={()=>setModal(label)}>{label}</button>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} · Dr. Althea — conceito da loja</span><span>BRASIL · PORTUGUÊS</span><a href="#inicio">Voltar ao início ↑</a></div></footer>
 <Sheet open={cartOpen} onOpenChange={setCartOpen}><SheetContent side="right" className="cart-panel"><SheetTitle>Seu carrinho</SheetTitle><SheetDescription className="cart-sub">{itens===0?'Nenhum item adicionado.':`${itens} ${itens===1?'item':'itens'}`}</SheetDescription>
  {lines.length>0&&<div className="cart-lines">{lines.map(l=>{const p=products.find(x=>x.slug===l.slug)!;const k=find(l.slug,l.qty);return <div className="cart-line" key={`${l.slug}-${l.qty}`}>
   <div className="cart-thumb"><Shot n={p.cover} alt=""/></div>
   <div className="cart-body"><strong>{p.name}</strong><small>{k.qty} {k.qty===1?'unidade':'unidades'} · {k.name}</small>
    <div className="cart-step"><button onClick={()=>setN(l.slug,l.qty,l.n-1)} aria-label={`Diminuir ${p.name}, kit de ${k.qty}`}><Minus size={13}/></button><span aria-live="polite">{l.n}</span><button onClick={()=>setN(l.slug,l.qty,l.n+1)} aria-label={`Aumentar ${p.name}, kit de ${k.qty}`}><Plus size={13}/></button><button className="cart-remove" onClick={()=>setN(l.slug,l.qty,0)} aria-label={`Remover ${p.name}, kit de ${k.qty}`}><X size={13}/></button></div></div>
   <span className="cart-line-price">{money(k.price*l.n)}</span></div>})}</div>}
  {lines.length>0&&<div className="cart-foot"><div className="cart-row"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="cart-row pix"><span>No Pix</span><span>{money(Math.max(0,subtotal-loja.pixOff))}</span></div><p className="cart-note">Economia de {money(loja.pixOff)} no Pix · ou em até {loja.parcelas}x de {money(subtotal/loja.parcelas)} sem juros</p><p className="cart-note">{loja.frete}</p><Button className="button cart-checkout" onClick={()=>{setCartOpen(false);setModal('Finalizar')}}>Finalizar compra <ArrowRight size={16}/></Button><p className="demo-label">Prévia de design · valores fictícios, compra indisponível.</p></div>}
 </SheetContent></Sheet>
 <Dialog open={modal!==null} onOpenChange={open=>{if(!open)setModal(null)}}><DialogContent className="information-dialog"><DialogTitle>{modal==='Finalizar'?'Checkout indisponível':modal}</DialogTitle><DialogDescription>{modal==='Finalizar'?`Seu carrinho soma ${money(subtotal)} (${money(Math.max(0,subtotal-loja.pixOff))} no Pix). Esta é uma prévia de design: os valores são fictícios e não existe checkout. Nenhum pedido ou pagamento será realizado.`:modal?info[modal]:''}</DialogDescription><Button variant="outline" onClick={()=>setModal(null)}>Voltar para a página <ArrowRight size={16}/></Button></DialogContent></Dialog>
 </>;
}
