# Referências e estado da LP
Direção visual: briefing do usuário e imagens em ../referencias; https://gezeiten.com/en.
Logo: fornecido pelo usuário.
Fotos product.jpg e editorial.jpg: https://doctoraltheaglobal.com/products/345-relief-cream (galeria oficial). Licença de reutilização não informada na página; validar uso comercial antes da publicação pública.
Esta versão é uma prévia privada de design. Preço de R$247 observado no cadastro Shopify durante esta tarefa; não é sincronizado automaticamente. CTA aponta para o produto na Shopify. Não existe integração direta de carrinho/checkout nesta versão.
Produto: 9039742959773. Loja: evg0ar-mr.myshopify.com.
Pendências comerciais: fornecedor, estoque, peso, frete, prazos e custo real. Nenhuma avaliação, resultado clínico ou desconto foi inventado.

## Segunda versão
Ordem solicitada: hero, produto/kits, espaço UGC, perguntas, avaliações, por que funciona, modo de uso, tecnologias, carrossel, CTA, rodapé.
As 9 imagens em ../imagens-para-site foram fornecidas pelo usuário e copiadas para public/images/campaign-1.png a campaign-9.png. Hero e UGC usam imagens conforme instrução do usuário; nenhum vídeo foi fornecido.
Kits: 1 unidade R$247; 2 unidades R$449; 3 unidades R$629. Valores fictícios autorizados pelo usuário e identificados na interface. O CTA abre resumo de demonstração e não cria pedidos.
Avaliações: textos e personagens fictícios explicitamente identificados. Substituir por relatos reais antes de abrir vendas.
Rodapé: todos os itens solicitados presentes. Páginas legais, contato, pagamentos e rastreamento exibem estado pendente, sem condições inventadas.
Informações de benefícios/formulação conferidas em https://doctoraltheaglobal.com/products/345-relief-cream. Não foram adicionadas tecnologias patenteadas ou resultados clínicos não confirmados.

## Terceira versão — estrutura multiproduto (branch `multi-produtos`)
Os dados de produto saíram do JSX e viraram o array `products` em app/page.tsx, tipado por `Product`. Adicionar um produto é adicionar um objeto nesse array; nenhuma seção precisa ser duplicada à mão.
Uma primeira tentativa usou vitrine editorial + um bloco longo por produto (por que funciona, modo de uso, tecnologias e FAQ repetidos). Foi descartada pelo usuário: a página passava de 19.000px e perdia o foco. Referências escolhidas em ../referencias: `produtos.jpeg` (CYKLAR) para a grade e `pag do produto 2.jpeg` (SKINSENSE) para o detalhe.
Seção `#produtos`: grade no padrão CYKLAR, com divisórias entre células, foto, nome e preço na mesma linha, categoria e botão de largura total. O número de colunas acompanha a quantidade de produtos até o teto de 3, via a variável CSS `--cols` definida inline — usar `grid-template-columns` inline quebraria as media queries.
Detalhe por produto (`ProductDetail`): coluna de informação + foto sticky, no padrão SKINSENSE. Traz breadcrumb, nome, preço, volume, benefícios em bullets, seleção de kit, botão e abas DESCRIÇÃO / INGREDIENTES / MODO DE USO / ENTREGA. As abas são feitas à mão com `role=tablist/tab/tabpanel`; o componente shadcn traz visual de pílula em Tailwind que briga com a estética da página. Cada produto mantém o estado da própria aba.
Saíram as seções longas por que funciona, modo de uso e tecnologias: o conteúdo migrou para bullets e abas. O FAQ voltou a ser uma seção única compartilhada, não repetida por produto. Hero, UGC, avaliações, carrossel, CTA e rodapé seguem compartilhados. A página caiu para cerca de 7.300px.
Ids de âncora usam o prefixo `produto-` (helper `anchor()`): o slug `345-relief-cream` começa com dígito e, cru como id, vira seletor CSS inválido — `querySelector('#345-relief-cream')` lança erro.
Conteúdo ainda não confirmado usa estado pendente explícito, nunca conteúdo inventado: `Shot` desenha um bloco hachurado com "Foto a definir" quando não há imagem, e listas vazias (kits, benefícios, ingredientes, etapas) viram uma nota de pendência em vez de sumirem em silêncio. A aba ENTREGA repete a pendência de frete já registrada acima.
Segundo produto: entrou como placeholder (slug `segundo`, eyebrow "EM PREPARAÇÃO"). Nome, categoria, descrição, volume, kits/valores, benefícios, ingredientes, etapas de uso e fotos estão todos por definir e devem ser preenchidos a partir de informações do fabricante ou do usuário. As 9 imagens existentes são todas do 345; reaproveitá-las para outro produto seria enganoso.
O botão da grade e o modal de compra nomeiam o produto do kit escolhido, já que existe mais de um. Continua sem carrinho ou checkout reais.
