'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowDown, Plus, Star, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
const money=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
type Kit={qty:number;name:string;price:number};
type Product={
 slug:string;eyebrow:string;title:string[];subtitle:string;description:string;
 volume:string;unit:string;photos:number[];vitrine:{tagline:string;cover:number|null};
 kits:Kit[];
 why:{title:string[];intro:string;photo:number|null;benefits:{title:string;desc:string}[];source:string|null};
 ritual:{title:string[];intro:string;photo:number|null;steps:[string,string][]};
 tech:{intro:string;items:{num:string;name:string;desc:string}[]};
 faq:[string,string][];
};
const products:Product[]=[{
 slug:'345-relief-cream',
 eyebrow:'HIDRATAÇÃO & CONFORTO',
 title:['345','Relief Cream'],
 subtitle:'Um gesto leve. Um cuidado que fica.',
 description:'Hidratante facial de textura leve para uma rotina de cuidado com a pele sensível. Niacinamida, pantenol e ceramida NP em uma fórmula para todos os dias.',
 volume:'DR. ALTHEA PRO LAB · 50 ML',
 unit:'50 ml por unidade',
 photos:[3,1,4,5],
 vitrine:{tagline:'O essencial da hidratação diária.',cover:3},
 kits:[{qty:1,name:'O seu primeiro ritual',price:247},{qty:2,name:'Cuidado em dobro',price:449},{qty:3,name:'Seu ritual completo',price:629}],
 why:{
  title:['Leve na textura.','Essencial no cuidado.'],
  intro:'Segundo a Dr. Althea, a fórmula combina hidratação, suporte à barreira de umidade e cuidado com a aparência da textura da pele.',
  photo:4,
  benefits:[
   {title:'Hidratação equilibrada',desc:'Ajuda a manter o conforto sem uma sensação pesada.'},
   {title:'Barreira de umidade',desc:'Um cuidado diário para apoiar a hidratação da pele.'},
   {title:'Textura mais suave',desc:'Ajuda a suavizar a aparência da textura irregular.'}],
  source:'https://doctoraltheaglobal.com/products/345-relief-cream'},
 ritual:{
  title:['Uma pausa.','Um pequeno gesto.','Seu momento.'],
  intro:'Faça da hidratação um momento simples da sua rotina.',
  photo:6,
  steps:[['Prepare a pele','Comece com a pele limpa.'],['Aplique com delicadeza','Espalhe uma quantidade adequada no rosto.'],['Deixe absorver','Pressione suavemente e siga sua rotina.']]},
 tech:{
  intro:'Ingredientes que fazem parte\nda fórmula do 345 Relief Cream.',
  items:[
   {num:'01',name:'Niacinamida',desc:'Presente na composição, ao lado de ingredientes hidratantes.'},
   {num:'02',name:'Pantenol + ceramida NP',desc:'Parte da combinação de ingredientes para o cuidado diário.'},
   {num:'03',name:'Centella + beta-glucana',desc:'Também integram a lista de ingredientes da fórmula.'}]},
 faq:[
  ['Como incluir na minha rotina?','Aplique na etapa de hidratação, sobre a pele limpa, e espalhe suavemente até a absorção. Siga as orientações da embalagem.'],
  ['Qual é a textura do 345 Relief Cream?','Um creme de textura leve, pensado para a hidratação diária.'],
  ['O que vem em cada kit?','As opções desta prévia apresentam 1, 2 ou 3 unidades de 50 ml. Quantidades e preços comerciais ainda serão confirmados.'],
  ['Quando poderei comprar?','Estamos preparando a loja. A disponibilidade, os valores finais e as condições de entrega serão informados antes da abertura das vendas.']]
},{
 slug:'produto-2',
 eyebrow:'EM PREPARAÇÃO',
 title:['Segundo','produto'],
 subtitle:'Nome e apresentação a definir.',
 description:'Este espaço está reservado para o segundo produto da linha. Nome, descrição, ingredientes, fotos e valores serão preenchidos quando as informações forem confirmadas.',
 volume:'VOLUME A DEFINIR',
 unit:'volume a definir',
 photos:[],
 vitrine:{tagline:'Em breve na linha.',cover:null},
 kits:[],
 why:{title:['Conteúdo','a definir.'],intro:'Os benefícios deste produto serão descritos a partir das informações do fabricante.',photo:null,benefits:[],source:null},
 ritual:{title:['Modo de uso','a definir.'],intro:'As etapas de uso serão descritas conforme as orientações da embalagem.',photo:null,steps:[]},
 tech:{intro:'Os ingredientes serão listados\napós a confirmação da fórmula.',items:[]},
 faq:[]
}];
const gallery=[{id:2,label:'Um momento de pausa'},{id:7,label:'Essencial para levar'},{id:8,label:'Sempre por perto'},{id:4,label:'A delicadeza da textura'},{id:9,label:'Cuidado que acompanha você'}];
const institutional=['Sobre Nós','Trocas e Devoluções','Política de Privacidade','Política de Frete','Política de Cookies','Termos de Serviço','Aviso Legal'];
const support=['Fale Conosco','Falar com consultor','FAQ','Formas de Pagamento','Rastrear pedido'];
const info:Record<string,string>={
'Sobre Nós':'Estamos preparando a apresentação da loja. Em breve, você poderá conhecer nossa história e nossa proposta de cuidado.',
'Trocas e Devoluções':'A política de trocas e devoluções será disponibilizada antes da abertura das vendas.',
'Política de Privacidade':'A política de privacidade está em preparação e será disponibilizada antes da abertura das vendas.',
'Política de Frete':'As regiões atendidas, os prazos e as condições de frete serão informados após a definição da operação de entrega.',
'Política de Cookies':'As informações sobre cookies serão disponibilizadas de acordo com os serviços utilizados na versão final da loja.',
'Termos de Serviço':'Os termos de serviço serão disponibilizados antes da abertura das vendas.',
'Aviso Legal':'As informações legais e a identificação da empresa responsável serão disponibilizadas na versão final da loja.',
'Fale Conosco':'O canal de atendimento será disponibilizado em breve.',
'Falar com consultor':'O contato do consultor será disponibilizado em breve.',
'Formas de Pagamento':'As formas de pagamento serão informadas após a configuração da loja.',
'Rastrear pedido':'O acesso ao rastreamento será disponibilizado após a definição da operação de entrega.'};
const lines=(parts:string[])=>parts.map((t,i)=><span key={t}>{i>0&&<br/>}{t}</span>);
function Shot({n,alt,className,priority}:{n:number|null;alt:string;className?:string;priority?:boolean}){
 if(n===null) return <div className={`photo-pending ${className??''}`}><span>Foto a definir</span></div>;
 return <img src={`/images/campaign-${n}.png`} alt={alt} className={className} loading={priority?undefined:'lazy'} fetchPriority={priority?'high':undefined} width="1122" height="1402"/>;
}
function ProductBlock({p,onBuy}:{p:Product;onBuy:(p:Product,kit:Kit)=>void}){
 const [photo,setPhoto]=useState(p.photos[0]??null);
 const [selected,setSelected]=useState(String(p.kits[0]?.qty??''));
 const kit=p.kits.find(k=>String(k.qty)===selected);
 return <>
 <section className="product section product-v2" id={p.slug}><div className="product-gallery"><div className="product-visual"><span className="eyebrow image-label">{p.eyebrow} / 01</span><Shot n={photo} alt={`${p.title.join(' ')} — fotografia do produto`}/><span className="product-volume">{p.volume}</span></div>{p.photos.length>1&&<div className="thumbnails" aria-label="Fotos do produto">{p.photos.map((n,i)=><button key={n} onClick={()=>setPhoto(n)} aria-label={`Ver foto ${i+1} do produto`} aria-pressed={photo===n}><img src={`/images/campaign-${n}.png`} alt="" loading="lazy" width="1122" height="1402"/></button>)}</div>}</div><div className="product-copy"><span className="eyebrow green">{p.eyebrow}</span><h2>{lines(p.title)}</h2><p className="product-subtitle">{p.subtitle}</p><p>{p.description}</p>{p.kits.length>0?<><div className="kit-heading"><span>Escolha seu ritual</span><span>{p.unit}</span></div><RadioGroup value={selected} onValueChange={v=>setSelected(String(v))} aria-label="Escolha um kit ilustrativo" className="kit-options">{p.kits.map(k=><label className={`kit-option ${selected===String(k.qty)?'selected':''}`} key={k.qty}><RadioGroupItem value={String(k.qty)} aria-label={`${k.qty} ${k.qty===1?'unidade':'unidades'}`}/><span><strong>{k.qty} {k.qty===1?'unidade':'unidades'}</strong><small>{k.name}</small></span><span className="kit-price">{money(k.price)}<small>{money(k.price/k.qty)} / un.</small></span></label>)}</RadioGroup><div className="price" aria-live="polite">{money(kit!.price)} <span>{kit!.qty} × {p.unit.replace(' por unidade','')}</span></div><Button className="button product-button" onClick={()=>onBuy(p,kit!)}>Comprar meu kit <ArrowUpRight size={18}/></Button><p className="demo-label">Prévia de design · valores fictícios, compra indisponível.</p></>:<p className="pending-note">Kits, volumes e valores serão definidos junto com as informações deste produto.</p>}</div></section>
 <section className="why section"><div className="why-photo"><Shot n={p.why.photo} alt={`${p.title.join(' ')} em composição editorial`}/></div><div className="why-copy"><span className="eyebrow">POR QUE FUNCIONA</span><h2>{lines(p.why.title)}</h2><p>{p.why.intro}</p>{p.why.benefits.map((b,i)=><div className="benefit" key={b.title}><span>0{i+1}</span><div><h3>{b.title}</h3><p>{b.desc}</p></div></div>)}{p.why.benefits.length===0&&<p className="pending-note">Benefícios a preencher.</p>}{p.why.source&&<a className="source-link" href={p.why.source} target="_blank" rel="noreferrer">Conheça as informações do fabricante <ArrowUpRight size={13}/></a>}</div></section>
 <section className="ritual"><div className="ritual-photo"><Shot n={p.ritual.photo} alt={`Aplicação de ${p.title.join(' ')}`}/></div><div className="ritual-copy"><span className="eyebrow">MODO DE USO</span><h2>{lines(p.ritual.title)}</h2><p>{p.ritual.intro}</p>{p.ritual.steps.map(([title,desc],i)=><div className="ritual-step" key={title}><span>0{i+1}</span><p>{title}<br/><small>{desc}</small></p></div>)}{p.ritual.steps.length===0&&<p className="pending-note">Etapas a preencher.</p>}<span className="ritual-note">Siga as orientações de uso da embalagem.</span></div></section>
 <section className="technology section"><div className="section-heading"><div><span className="eyebrow">TECNOLOGIAS / A FORMULAÇÃO</span><h2>O cuidado está<br/>na combinação.</h2></div><p>{p.tech.intro.split('\n').map((t,i)=><span key={t}>{i>0&&<br/>}{t}</span>)}</p></div>{p.tech.items.length>0?<div className="technology-grid">{p.tech.items.map(t=><article key={t.num}><span className="technology-number">{t.num}</span><h3>{t.name}</h3><p>{t.desc}</p></article>)}</div>:<p className="pending-note">Ingredientes a preencher.</p>}</section>
 {p.faq.length>0&&<section className="faq section"><div><span className="eyebrow">SUAS PERGUNTAS</span><h2>Conheça melhor.<br/>Cuide com calma.</h2></div><div className="questions">{p.faq.map(([q,a])=><details key={q}><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></section>}
 </>;
}
export default function Home(){
 const [modal,setModal]=useState<string|null>(null);
 const [order,setOrder]=useState<{p:Product;kit:Kit}|null>(null);
 const buy=(p:Product,kit:Kit)=>{setOrder({p,kit});setModal('Comprar')};
 return <>
 <div className="announcement">Cuidado coreano. Um momento só seu.</div>
 <header className="header"><nav aria-label="Navegação principal"><a href="#produtos">Produtos</a><a href={`#${products[0].slug}`}>Seu ritual</a></nav><a className="brand" href="#inicio" aria-label="Dr. Althea — início"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a><a className="header-link" href="#produtos">A beleza do cuidado <ArrowUpRight size={15}/></a></header>
 <main id="inicio">
 <section className="hero"><div className="hero-copy"><span className="eyebrow">DR. ALTHEA / DAILY SKIN ESSENTIALS</span><div><h1>Um respiro.<br/>Para a sua pele.</h1><p>Hidratação leve. Cuidado delicado.<br/>Redescubra a beleza de uma rotina simples.</p><a className="button" href="#produtos">Conheça a linha <ArrowUpRight size={18}/></a></div><a className="scroll-link" href="#produtos"><ArrowDown size={15}/> O cuidado começa aqui</a></div><div className="hero-photo hero-campaign"><img src="/images/campaign-9.png" alt="Modelo segurando o 345 Relief Cream em uma composição clara" fetchPriority="high" width="1122" height="1402"/><div className="photo-caption"><span>DAILY SKIN ESSENTIALS</span><span>O ESSENCIAL, TODOS OS DIAS.</span></div></div></section>
 <section className="showcase section" id="produtos"><div className="section-heading"><div><span className="eyebrow">A LINHA</span><h2>Dois essenciais.<br/>Um mesmo cuidado.</h2></div><p>Escolha por onde começar o seu ritual.</p></div><div className="showcase-grid">{products.map((p,i)=><article key={p.slug} className="showcase-card"><a href={`#${p.slug}`} aria-label={`Ver ${p.title.join(' ')}`}><div className="showcase-visual"><span className="eyebrow image-label">{String(i+1).padStart(2,'0')}</span><Shot n={p.vitrine.cover} alt={`${p.title.join(' ')} — capa`}/></div><div className="showcase-copy"><span className="eyebrow green">{p.eyebrow}</span><h3>{p.title.join(' ')}</h3><p>{p.vitrine.tagline}</p><span className="showcase-link">{p.kits.length>0?`A partir de ${money(Math.min(...p.kits.map(k=>k.price)))}`:'Detalhes em breve'} <ArrowRight size={15}/></span></div></a></article>)}</div></section>
 {products.map(p=><ProductBlock key={p.slug} p={p} onBuy={buy}/>)}
 <section className="ugc section" id="experiencias"><div className="section-heading"><div><span className="eyebrow">NA VIDA, NA ROTINA</span><h2>Pequenos gestos.<br/>Diferentes momentos.</h2></div><p>O cuidado encontra espaço no seu dia.</p></div><div className="ugc-grid">{[{n:6,title:'O toque do cuidado',sub:'Um momento para a pele'},{n:8,title:'Vai com você',sub:'O essencial na sua nécessaire'},{n:9,title:'Seu ritual, seu tempo',sub:'Beleza nos pequenos gestos'}].map(x=><figure key={x.n}><img src={`/images/campaign-${x.n}.png`} alt={x.title} loading="lazy" width="1122" height="1402"/><figcaption><h3>{x.title}</h3><p>{x.sub}</p></figcaption></figure>)}</div><p className="section-note">Imagens editoriais. Vídeos de experiências em breve.</p></section>
 <section className="reviews section" id="avaliacoes"><div className="section-heading"><div><span className="eyebrow">AVALIAÇÕES</span><h2>Quem cuida, conta.</h2></div><p className="review-disclaimer">Exemplos fictícios para visualizar o layout.<br/>Não representam experiências de clientes.</p></div><div className="review-grid">{[{name:'Marina',text:'Gostei de reservar alguns minutos do dia só para cuidar de mim. O produto encontrou um lugar na minha rotina.'},{name:'Camila',text:'A apresentação delicada e a proposta de uma rotina simples são o que mais chamaram minha atenção.'},{name:'Beatriz',text:'Um pequeno ritual que combina com os meus momentos de pausa. Adorei a ideia de levar na nécessaire.'}].map(r=><article key={r.name}><div className="review-stars" aria-label="5 estrelas — exemplo fictício">{[1,2,3,4,5].map(n=><Star key={n} size={13}/>)}</div><blockquote>“{r.text}”</blockquote><div className="review-person"><span>{r.name}<small>Personagem fictícia</small></span><span>EXEMPLO</span></div></article>)}</div></section>
 <section className="moments section" id="galeria"><div className="section-heading"><div><span className="eyebrow">UM OLHAR MAIS DE PERTO</span><h2>O essencial, em cena.</h2></div><p>Texturas, luz e pequenos rituais.</p></div><Carousel className="editorial-carousel" opts={{align:'start',loop:false}} aria-label="Galeria de imagens do produto"><CarouselContent>{gallery.map(g=><CarouselItem key={g.id} className="gallery-slide"><figure><img src={`/images/campaign-${g.id}.png`} alt={g.label} loading="lazy" width="1122" height="1402"/><figcaption>{g.label}</figcaption></figure></CarouselItem>)}</CarouselContent><div className="carousel-controls"><span>Arraste para explorar</span><div><CarouselPrevious aria-label="Imagem anterior"/><CarouselNext aria-label="Próxima imagem"/></div></div></Carousel></section>
 <section className="closing"><span className="eyebrow">O ESSENCIAL, TODOS OS DIAS.</span><h2>Seu próximo ritual<br/>começa com um gesto.</h2><a className="button" href="#produtos">Escolha seu kit <ArrowUpRight size={18}/></a></section>
 </main><footer className="footer-v2"><div className="footer-grid"><div className="footer-intro"><a className="footer-brand" href="#inicio"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a><p>Uma rotina simples.<br/>Um cuidado especial.</p><span className="eyebrow">SKINCARE / DAILY ESSENTIALS</span></div><div><h3>Institucional</h3>{institutional.map(label=><button key={label} onClick={()=>setModal(label)}>{label}</button>)}</div><div><h3>Atendimento</h3>{support.map(label=>label==='FAQ'?<a key={label} href={`#${products[0].slug}`}>FAQ</a>:<button key={label} onClick={()=>setModal(label)}>{label}</button>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} · Dr. Althea — conceito da loja</span><span>BRASIL · PORTUGUÊS</span><a href="#inicio">Voltar ao início ↑</a></div></footer>
 <Dialog open={modal!==null} onOpenChange={open=>{if(!open)setModal(null)}}><DialogContent className="information-dialog"><DialogTitle>{modal==='Comprar'?'Seu kit na prévia':modal}</DialogTitle><DialogDescription>{modal==='Comprar'&&order?`${order.p.title.join(' ')} · ${order.kit.qty} ${order.kit.qty===1?'unidade':'unidades'} · ${money(order.kit.price)}. Este valor é fictício e serve apenas para avaliar o design. Nenhum pedido ou pagamento será realizado.`:modal?info[modal]:''}</DialogDescription><Button variant="outline" onClick={()=>setModal(null)}>Voltar para a página <ArrowRight size={16}/></Button></DialogContent></Dialog>
 </>;
}
