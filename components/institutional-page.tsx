import { ArrowLeft, ArrowUpRight, Camera, Mail, MessageCircle } from 'lucide-react';

export type InstitutionalPageKey =
  | 'sobre-nos'
  | 'politica-trocas'
  | 'politica-privacidade'
  | 'politica-frete'
  | 'politica-cookies'
  | 'termos-servico'
  | 'aviso-legal'
  | 'fale-conosco'
  | 'faq'
  | 'formas-pagamento';

type Section = { title: string; paragraphs?: string[]; bullets?: string[] };
type Page = { eyebrow: string; title: string; intro: string; updated?: string; sections: Section[] };

const email = 'doctoraltheabr@gmail.com';
const whatsappDisplay = '(47) 92005-0963';
const whatsappUrl = 'https://wa.me/5547920050963';
const instagramUrl = 'https://www.instagram.com/dr.althea_br/';
const cnpj = '69.125.056/0001-79';

const pages: Record<InstitutionalPageKey, Page> = {
  'sobre-nos': {
    eyebrow: 'NOSSA ESSÊNCIA', title: 'Sobre a Doctor Althea Brasil',
    intro: 'Cuidado coreano original, escolhido para tornar a rotina de skincare mais simples, delicada e consciente.',
    sections: [
      { title: 'Quem somos', paragraphs: ['A Doctor Althea Brasil é uma revendedora independente especializada em produtos originais Dr. Althea. Aproximamos do público brasileiro fórmulas desenvolvidas na Coreia do Sul, com uma experiência de compra clara e atendimento próximo.'] },
      { title: 'Nossa proposta', paragraphs: ['Acreditamos que cuidar da pele não precisa ser complicado. Selecionamos produtos que se encaixam em rotinas reais e apresentamos suas características, modo de uso e condições de compra com transparência.'] },
      { title: 'Origem dos produtos', paragraphs: ['Os produtos são originais e importados da Coreia do Sul. A loja atua como revendedora independente e não representa oficialmente a fabricante Dr. Althea.'] },
      { title: 'Nosso compromisso', paragraphs: ['Queremos que cada pessoa saiba o que está comprando, quanto tempo a entrega pode levar e como pedir ajuda. Por isso mantemos nossas políticas, canais de atendimento e informações de rastreamento acessíveis.'] },
      { title: 'Informações da empresa', bullets: [`CNPJ: ${cnpj}`, `E-mail: ${email}`, `WhatsApp: ${whatsappDisplay}`] },
    ],
  },
  'politica-trocas': {
    eyebrow: 'COMPRA SEGURA', title: 'Política de Trocas e Devoluções',
    intro: 'Esta política explica como solicitar arrependimento, troca, reenvio ou reembolso em compras realizadas na Doctor Althea Brasil.', updated: '21 de setembro de 2026',
    sections: [
      { title: '1. Direito de arrependimento', paragraphs: ['Você pode desistir da compra em até 7 dias corridos contados do recebimento, conforme o artigo 49 do Código de Defesa do Consumidor. Para iniciar a solicitação, entre em contato antes do fim desse prazo.'] },
      { title: '2. Problema, avaria ou item incorreto', paragraphs: ['Se o produto chegar avariado, apresentar problema ou for diferente do pedido, fale conosco assim que perceber a ocorrência. Para produtos não duráveis, o prazo legal para reclamar de vícios aparentes é de 30 dias a partir da entrega, sem prejuízo das demais garantias previstas em lei.'] },
      { title: '3. Como solicitar', bullets: ['Envie nome completo, e-mail utilizado na compra e número do pedido.', 'Explique o motivo da solicitação.', 'Em caso de avaria, defeito ou item incorreto, envie fotos ou vídeo que permitam analisar o ocorrido.', `Entre em contato pelo e-mail ${email} ou WhatsApp ${whatsappDisplay}.`] },
      { title: '4. Condições do produto', paragraphs: ['Conserve o produto, a embalagem e os itens recebidos até receber nossas orientações. No arrependimento, o produto deve ser encaminhado com seus componentes e sem danos causados pelo cliente. A abertura necessária para conferência será analisada conforme o caso e a legislação aplicável.'] },
      { title: '5. Devolução e custos', paragraphs: ['Quando a devolução física for necessária, enviaremos as instruções e o código ou procedimento de postagem. Nos casos de arrependimento dentro do prazo legal, produto avariado, defeituoso ou incorreto, os custos de devolução serão suportados pela loja.'] },
      { title: '6. Reenvio ou reembolso', paragraphs: ['Após a análise, poderemos oferecer reenvio, troca por item disponível ou reembolso, conforme a situação e a escolha cabível ao consumidor. O reembolso será solicitado pelo mesmo meio de pagamento. O prazo de visualização no cartão depende da administradora e pode alcançar faturas posteriores.'] },
      { title: '7. Atendimento', paragraphs: [`As solicitações são recebidas em ${email} e pelo WhatsApp ${whatsappDisplay}. Retornaremos com as orientações em até 2 dias úteis.`] },
    ],
  },
  'politica-privacidade': {
    eyebrow: 'SEUS DADOS', title: 'Política de Privacidade',
    intro: 'Tratamos dados pessoais somente para operar a loja, entregar pedidos, prestar atendimento e cumprir obrigações legais.', updated: '7 de outubro de 2026',
    sections: [
      { title: '1. Quem controla os dados', paragraphs: [`A Doctor Althea Brasil, inscrita no CNPJ ${cnpj}, é responsável pela operação da loja e pelo tratamento dos dados. O contato para assuntos de privacidade é ${email}.`] },
      { title: '2. Dados que podemos tratar', bullets: ['Nome, CPF e dados de contato.', 'Endereço e informações necessárias para entrega.', 'Dados do pedido, pagamento e atendimento.', 'Dados técnicos de navegação, como endereço IP, dispositivo e cookies.', 'Preferências de comunicação, quando houver consentimento.'] },
      { title: '3. Para que utilizamos os dados', bullets: ['Processar pagamentos e pedidos.', 'Providenciar envio, rastreamento e suporte.', 'Prevenir fraude e proteger a operação.', 'Cumprir obrigações legais, fiscais e regulatórias.', 'Medir o funcionamento do site e campanhas, quando aplicável.', 'Enviar comunicações autorizadas pelo cliente.'] },
      { title: '4. Com quem podemos compartilhar', paragraphs: [
        'Compartilhamos somente os dados necessários com parceiros de pagamento, fornecedores, serviços de entrega, hospedagem e atendimento que participam da operação da loja. Também poderá haver compartilhamento com autoridades quando exigido por lei. Não comercializamos dados pessoais.',
        'Também compartilhamos dados com plataformas de publicidade e mensuração, como Meta (Facebook e Instagram) e Google. Nesses casos, podem ser compartilhados dados de navegação e, quando aplicável, identificadores de contato criptografados, como e-mail e telefone convertidos em código irreversível. A finalidade é mensurar o resultado das campanhas e reduzir a exibição de anúncios irrelevantes.',
        'Parte desses parceiros está sediada no exterior, o que pode envolver transferência internacional de dados, realizada conforme as hipóteses previstas na LGPD.',
      ] },
      { title: '5. Cookies e tecnologias semelhantes', paragraphs: ['Utilizamos cookies essenciais, necessários ao funcionamento do site, e cookies de desempenho e publicidade, que ajudam a medir campanhas e a entender a navegação. Você pode gerenciar cookies nas configurações do seu navegador. A desativação de cookies essenciais pode afetar recursos do site.'] },
      { title: '6. Pagamento', paragraphs: ['Os dados completos do cartão são processados pelos parceiros de pagamento no ambiente seguro do checkout. A Doctor Althea Brasil não armazena o número completo ou o código de segurança do cartão.'] },
      { title: '7. Retenção e segurança', paragraphs: ['Os dados são mantidos pelo tempo necessário às finalidades informadas e aos prazos legais. Adotamos medidas razoáveis de segurança, embora nenhum sistema conectado à internet seja totalmente isento de riscos.'] },
      { title: '8. Seus direitos', bullets: ['Confirmar o tratamento e acessar seus dados.', 'Solicitar correção de informações incompletas ou desatualizadas.', 'Pedir informações sobre compartilhamento.', 'Solicitar anonimização, bloqueio, eliminação ou portabilidade quando aplicável.', 'Revogar consentimentos e se opor a tratamentos nas hipóteses legais.'] },
      { title: '9. Como exercer seus direitos', paragraphs: [`Envie sua solicitação para ${email}. Poderemos pedir informações adicionais para confirmar a identidade do solicitante e proteger os dados contra acesso indevido.`] },
      { title: '10. Atualizações', paragraphs: ['Esta política poderá ser atualizada para refletir mudanças legais ou operacionais. A versão vigente sempre indicará a data de atualização.'] },
    ],
  },
  'politica-frete': {
    eyebrow: 'DA ORIGEM ATÉ VOCÊ', title: 'Política de Frete e Entrega',
    intro: 'Frete grátis para todo o Brasil, com acompanhamento do envio e informações claras sobre a importação.', updated: '21 de setembro de 2026',
    sections: [
      { title: '1. Origem e modalidade de envio', paragraphs: ['Os produtos são originais, importados da Coreia do Sul e enviados na modalidade de entrega internacional. Parceiros logísticos acompanham o pedido até o destino final.'] },
      { title: '2. Processamento', paragraphs: ['Após a confirmação do pagamento, o pedido pode levar até 2 dias úteis para processamento antes do envio. Pedidos realizados em fins de semana ou feriados começam a ser processados no próximo dia útil.'] },
      { title: '3. Prazo de entrega', paragraphs: ['A estimativa de entrega é de até 20 dias úteis após o envio. O prazo é uma estimativa e pode ser afetado por fiscalização aduaneira, operação logística, eventos climáticos, greves, feriados ou situações de força maior.'] },
      { title: '4. Frete grátis', paragraphs: ['O frete padrão é gratuito para todo o Brasil, sem valor mínimo de compra.'] },
      { title: '5. Rastreamento', paragraphs: ['O código de rastreio será disponibilizado após o despacho. Os primeiros eventos podem levar alguns dias para aparecer. Acompanhe pela página de rastreio da loja utilizando o código recebido.'] },
      { title: '6. Endereço', paragraphs: ['Revise CEP, rua, número, complemento, cidade e estado antes de concluir a compra. Se perceber um erro, contate o atendimento imediatamente. Depois do despacho, pode não ser possível alterar o destino.'] },
      { title: '7. Atraso, avaria ou extravio', paragraphs: [`Caso o prazo estimado seja ultrapassado ou o pedido apresente qualquer problema, escreva para ${email} ou chame no WhatsApp ${whatsappDisplay} com o número do pedido.`] },
    ],
  },
  'politica-cookies': {
    eyebrow: 'NAVEGAÇÃO TRANSPARENTE', title: 'Política de Cookies',
    intro: 'Esta página explica como pequenos arquivos e tecnologias semelhantes podem ser utilizados durante a navegação.', updated: '21 de setembro de 2026',
    sections: [
      { title: '1. O que são cookies', paragraphs: ['Cookies são pequenos arquivos armazenados pelo navegador. Eles ajudam a manter funções do site, reconhecer preferências e compreender o desempenho das páginas.'] },
      { title: '2. Categorias utilizadas', bullets: ['Necessários: viabilizam recursos essenciais, segurança e funcionamento do carrinho.', 'Funcionais: lembram preferências e facilitam a navegação.', 'Medição: ajudam a entender acessos e corrigir problemas de desempenho.', 'Publicidade: podem medir campanhas e tornar anúncios mais relevantes, quando essas ferramentas estiverem ativas.'] },
      { title: '3. Tecnologias de terceiros', paragraphs: ['O checkout e outros serviços necessários à compra podem utilizar cookies próprios. Ferramentas de análise ou publicidade somente serão descritas como ativas quando efetivamente utilizadas na operação.'] },
      { title: '4. Como controlar', paragraphs: ['Você pode bloquear ou apagar cookies nas configurações do navegador. O bloqueio de cookies necessários pode impedir o funcionamento correto do carrinho, checkout ou outras partes da loja.'] },
      { title: '5. Atualizações e contato', paragraphs: [`Podemos atualizar esta política quando as tecnologias utilizadas mudarem. Dúvidas podem ser enviadas para ${email}.`] },
    ],
  },
  'termos-servico': {
    eyebrow: 'CONDIÇÕES DA LOJA', title: 'Termos de Serviço',
    intro: 'Estes termos regulam o acesso ao site e as compras realizadas na Doctor Althea Brasil.', updated: '21 de setembro de 2026',
    sections: [
      { title: '1. Operadora da loja', paragraphs: [`O site doctoraltheabr.com.br é operado pela Doctor Althea Brasil, inscrita no CNPJ ${cnpj}.`] },
      { title: '2. Produtos e disponibilidade', paragraphs: ['Buscamos apresentar descrições, imagens, preços e disponibilidade com precisão. Pequenas diferenças de cor podem ocorrer conforme a tela. Se houver indisponibilidade após a compra, entraremos em contato para oferecer solução ou reembolso.'] },
      { title: '3. Preços e pagamento', paragraphs: ['Vale o preço exibido no momento da conclusão da compra. Aceitamos Pix e cartão de crédito pelas opções mostradas no checkout. O cartão pode ser parcelado em até 3 vezes sem juros, observadas as condições exibidas antes da confirmação.'] },
      { title: '4. Confirmação do pedido', paragraphs: ['O pedido é confirmado após a aprovação do pagamento. Poderemos realizar verificações de segurança e entrar em contato quando necessário para prevenir fraude ou corrigir dados.'] },
      { title: '5. Entrega', paragraphs: ['O processamento pode levar até 2 dias úteis e a entrega é estimada em até 20 dias úteis após o envio. Consulte a Política de Frete para detalhes.'] },
      { title: '6. Trocas e devoluções', paragraphs: ['O direito de arrependimento, as hipóteses de troca e o procedimento de reembolso estão detalhados na Política de Trocas e Devoluções, preservados todos os direitos previstos na legislação brasileira.'] },
      { title: '7. Uso do site', paragraphs: ['O usuário deve fornecer informações verdadeiras, utilizar o site de forma lícita e não tentar interferir em sua segurança ou funcionamento.'] },
      { title: '8. Propriedade intelectual', paragraphs: ['Textos, identidade visual, fotografias e demais conteúdos pertencem aos respectivos titulares e não podem ser reproduzidos comercialmente sem autorização. As marcas de terceiros permanecem de propriedade de seus titulares.'] },
      { title: '9. Privacidade', paragraphs: ['O tratamento de dados pessoais segue a Política de Privacidade e a legislação aplicável.'] },
      { title: '10. Legislação', paragraphs: ['Estes termos são regidos pela legislação brasileira. Fica preservado ao consumidor o foro de seu domicílio e os demais direitos previstos no Código de Defesa do Consumidor.'] },
    ],
  },
  'aviso-legal': {
    eyebrow: 'TRANSPARÊNCIA', title: 'Aviso Legal',
    intro: 'Informações importantes sobre a operação da loja, o uso do site e a relação com marcas e serviços de terceiros.', updated: '21 de setembro de 2026',
    sections: [
      { title: '1. Identificação', bullets: [`CNPJ: ${cnpj}`, 'Nome comercial: Doctor Althea Brasil', `Contato: ${email} · ${whatsappDisplay}`] },
      { title: '2. Revenda independente', paragraphs: ['A Doctor Althea Brasil é uma revendedora independente. Não somos a fabricante, subsidiária ou representante oficial da Dr. Althea. As marcas, nomes e sinais distintivos citados pertencem aos seus respectivos titulares.'] },
      { title: '3. Conteúdo informativo', paragraphs: ['As informações de skincare têm finalidade informativa e não substituem avaliação dermatológica. Resultados variam conforme pele, rotina e modo de uso. Interrompa o uso em caso de irritação e procure orientação profissional quando necessário.'] },
      { title: '4. Uso adequado', paragraphs: ['Siga as instruções do fabricante, confira a lista de ingredientes e realize teste de contato quando indicado. A loja não responde por uso contrário às instruções ou por condições individuais desconhecidas.'] },
      { title: '5. Disponibilidade do site', paragraphs: ['Trabalhamos para manter o conteúdo correto e o serviço disponível. Podem ocorrer indisponibilidades temporárias, manutenções ou erros que serão corrigidos assim que identificados.'] },
      { title: '6. Serviços externos', paragraphs: ['Pagamento, rastreamento e outros recursos podem ser prestados por terceiros, sujeitos também às políticas e termos desses fornecedores.'] },
      { title: '7. Contato', paragraphs: [`Para esclarecimentos, escreva para ${email} ou fale pelo WhatsApp ${whatsappDisplay}.`] },
    ],
  },
  'fale-conosco': {
    eyebrow: 'ESTAMOS POR PERTO', title: 'Fale Conosco',
    intro: 'Dúvidas sobre produtos, pagamento, entrega ou seu pedido? Escolha o canal mais conveniente.',
    sections: [
      { title: 'WhatsApp', paragraphs: [`Atendimento pelo número ${whatsappDisplay}. Para agilizar, tenha em mãos o nome usado na compra e o número do pedido.`] },
      { title: 'E-mail', paragraphs: [`Envie sua mensagem para ${email}. Inclua o número do pedido no assunto quando a dúvida for sobre uma compra.`] },
      { title: 'Prazo de resposta', paragraphs: ['Respondemos às solicitações em até 2 dias úteis. Mensagens enviadas em fins de semana e feriados são analisadas a partir do próximo dia útil.'] },
      { title: 'Informações da empresa', bullets: [`CNPJ: ${cnpj}`, 'Nome comercial: Doctor Althea Brasil'] },
    ],
  },
  faq: {
    eyebrow: 'SUAS PERGUNTAS', title: 'Perguntas Frequentes',
    intro: 'Respostas diretas sobre produtos, pagamento, entrega, rastreamento e atendimento.',
    sections: [
      { title: 'Os produtos são originais?', paragraphs: ['Sim. Trabalhamos com produtos Dr. Althea originais, importados da Coreia do Sul. A Doctor Althea Brasil é uma revendedora independente.'] },
      { title: 'Como escolher entre o 345 e o 147?', paragraphs: ['O 345 Relief Cream oferece hidratação mais leve para o cuidado diário. O 147 Barrier Cream tem textura mais rica e é indicado para momentos de maior ressecamento ou sensibilidade da barreira da pele.'] },
      { title: 'Quais formas de pagamento são aceitas?', paragraphs: ['Pix e cartão de crédito pelas opções disponíveis no checkout. No cartão, o parcelamento é de até 3 vezes sem juros.'] },
      { title: 'Qual é o prazo de entrega?', paragraphs: ['O pedido pode levar até 2 dias úteis para ser processado. Depois do envio, a entrega é estimada em até 20 dias úteis.'] },
      { title: 'A entrega é gratuita?', paragraphs: ['Sim. O frete padrão é grátis para todo o Brasil.'] },
      { title: 'Como acompanho meu pedido?', paragraphs: ['Após o envio, você receberá um código. Digite esse código na página Rastrear pedido para acompanhar a entrega.'] },
      { title: 'Posso cancelar depois de receber?', paragraphs: ['Você pode exercer o direito de arrependimento em até 7 dias corridos após o recebimento. Consulte a Política de Trocas e Devoluções para o procedimento.'] },
      { title: 'Como falo com o atendimento?', paragraphs: [`Envie um e-mail para ${email} ou chame no WhatsApp ${whatsappDisplay}. Respondemos em até 2 dias úteis.`] },
    ],
  },
  'formas-pagamento': {
    eyebrow: 'COMPRA PROTEGIDA', title: 'Formas de Pagamento',
    intro: 'As opções e os valores finais são apresentados com clareza no checkout antes da confirmação do pedido.',
    sections: [
      { title: 'Pix', paragraphs: ['Pagamento com confirmação normalmente imediata. O valor promocional de cada produto ou kit aparece na página e no checkout antes da conclusão.'] },
      { title: 'Cartão de crédito', paragraphs: ['Pagamento em cartão pelas bandeiras disponíveis no checkout. É possível parcelar em até 3 vezes sem juros, conforme as condições mostradas no momento da compra.'] },
      { title: 'Segurança', paragraphs: ['O pagamento é processado em ambiente seguro por parceiros homologados. A transmissão é protegida e a Doctor Althea Brasil não armazena os dados completos do cartão.'] },
      { title: 'Confirmação', paragraphs: ['Após a aprovação, você recebe a confirmação do pedido no e-mail informado. Confira também as pastas de spam e promoções.'] },
      { title: 'Problemas para pagar', bullets: ['Confira os dados digitados e o limite disponível.', 'Verifique se o banco solicitou confirmação no aplicativo.', 'Tente novamente ou escolha outro método.', `Se o problema continuar, fale conosco pelo WhatsApp ${whatsappDisplay}.`] },
    ],
  },
};

export function InstitutionalPage({ page }: { page: InstitutionalPageKey }) {
  const content = pages[page];
  return <>
    <div className="announcement">Cuidado coreano. Um momento só seu.</div>
    <header className="policy-header">
      <a href="/" className="policy-back"><ArrowLeft size={16}/> Voltar à loja</a>
      <a className="brand" href="/" aria-label="Doctor Althea Brasil — início"><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/></a>
      <a href="/fale-conosco" className="policy-help">Precisa de ajuda?</a>
    </header>
    <main className="policy-page">
      <div className="policy-layout">
        <aside className="policy-summary">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          {content.updated&&<small>Última atualização: {content.updated}</small>}
          <div className="policy-contact">
            <a href={`mailto:${email}`}><Mail size={15}/> E-mail</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={15}/> Instagram</a>
          </div>
        </aside>
        <article className="policy-content">
          {content.sections.map(section=><section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
            {section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}
          </section>)}
        </article>
      </div>
    </main>
    <footer className="policy-footer">
      <div><img src="/images/logo.webp" alt="Dr. Althea" width="3545" height="1182"/><p>Doctor Althea Brasil · Cuidado coreano original.</p></div>
      <nav aria-label="Links institucionais"><a href="/politica-privacidade">Privacidade</a><a href="/politica-frete">Frete</a><a href="/politica-trocas">Trocas</a><a href="/fale-conosco">Contato</a></nav>
      <a href="/">Continuar explorando <ArrowUpRight size={14}/></a>
    </footer>
  </>;
}
