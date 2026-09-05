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
Nova seção vitrine (`#produtos`), logo após o hero: os produtos lado a lado, cada card com âncora para o bloco detalhado correspondente. Em telas até 600px vira coluna única.
Cada produto renderiza um bloco completo via `ProductBlock`: produto/kits, por que funciona, modo de uso, tecnologias e FAQ. Isso muda a ordem da segunda versão, onde essas seções apareciam uma única vez e intercaladas com UGC e avaliações. UGC, avaliações, carrossel, CTA e rodapé seguem compartilhados, depois dos blocos de produto.
Conteúdo ainda não confirmado usa estado pendente explícito, nunca conteúdo inventado: `Shot` desenha um bloco hachurado com "Foto a definir" quando não há imagem, e listas vazias (kits, benefícios, etapas, ingredientes, FAQ) viram uma nota de pendência em vez de sumirem em silêncio.
Segundo produto: entrou como placeholder (slug `produto-2`, eyebrow "EM PREPARAÇÃO"). Nome, descrição, volume, kits/valores, benefícios, ingredientes, etapas de uso, FAQ e fotos estão todos por definir e devem ser preenchidos a partir de informações do fabricante ou do usuário.
O modal de compra passou a nomear o produto do kit escolhido, já que existe mais de um.
