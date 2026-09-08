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
O botão da grade e o modal de compra nomeiam o produto do kit escolhido, já que existe mais de um.

## Quarta versão — carrinho, avaliação e condições comerciais
Grade de produtos reduzida a pedido do usuário: estava grande demais no desktop. Foto passou de 4/5 para 1/1, grade ganhou `max-width:900px`, e paddings da seção e dos cards diminuíram. A 1440px o card foi de 612x765 para 450x603 e a seção de 1243px para 854px. A grade fica alinhada à esquerda, acompanhando o título.
Carrinho: estado em `Home` como lista de linhas `{slug, qty, n}`, onde `qty` é o tamanho do kit e `n` quantas vezes ele foi adicionado. Kits diferentes do mesmo produto viram linhas separadas. Painel lateral com `Sheet`, botão no cabeçalho com contador, stepper e remoção por linha. O cabeçalho virou sticky para o carrinho ficar sempre alcançável. Não existe carrinho persistido, checkout, cálculo de frete real nem integração com a Shopify: "Finalizar compra" abre o mesmo aviso de prévia.
Condições comerciais informadas pelo usuário e centralizadas em `loja`: desconto de R$30 no Pix, parcelamento em até 3x sem juros, frete grátis com entrega em 14 a 28 dias úteis. O desconto do Pix é aplicado uma vez sobre o subtotal do carrinho, não por kit. Os textos de Política de Frete e Formas de Pagamento no rodapé foram atualizados para não contradizer essas condições.
Kit de 2 unidades passou a vir pré-selecionado, com selo "MAIS POPULAR" (campo `popular` no kit). O botão da grade também adiciona o kit popular.
Avaliação exibida no PDP e no card: 4,9/5 com 1.091 avaliações, número fornecido pelo usuário. PENDENTE: confirmar a origem desse dado. (Ver também a quinta versão.) Se não vier do fabricante ou de avaliações reais da loja, não deve ir ao ar — nota e contagem de avaliações sem lastro configuram publicidade enganosa (CDC art. 37). A seção de avaliações continua com depoimentos fictícios explicitamente identificados.

## Quinta versão — legibilidade do bloco de compra
O usuário achou a informação trabalhosa de ler. Referência: LILYEVE (print enviado no chat), adotada pela hierarquia e densidade, não pela estética — a paleta segue a da Dr. Althea, verde #586a5b no lugar do laranja, sem os cantos muito arredondados.
Causa real do problema: a coluna de informação estava quase toda entre 10 e 13px, com cinzas fracos. #999 sobre branco dá cerca de 2,8:1 de contraste e reprova no WCAG AA. Corrigido subindo tamanhos (preço do kit 15px para 21px, título 34px para 40px, abas 10px para 11px, painéis 13px para 14px) e escurecendo os cinzas de apoio.
Reorganização do bloco de compra, na ordem da referência: marca e categoria, avaliação, título, subtítulo com volume, benefícios como pílulas com check, divisor "COMPRE MAIS, ECONOMIZE MAIS", kits, faixa do Pix, CTA e linha de pagamento/frete com ícones. Preço, Pix e parcelamento saíram de linhas soltas acima e passaram a viver dentro de cada kit, como na referência.
Cada kit mostra economia e preço "de" riscado. O valor de referência é o preço unitário real multiplicado pela quantidade (R$247 x qtd), então 2 unidades exibem "de R$494,00 / economize R$45,00" e 3 exibem "de R$741,00 / economize R$112,00". O kit de 1 unidade não tem preço "de" e por isso não exibe riscado nem selo de economia: não existe preço cheio informado para uma unidade e inventar um seria preço de referência falso.
Selo "MAIS POPULAR" passou a ficar posicionado no topo do card do kit, não mais inline no texto.
A contagem de avaliações virou link para a seção de avaliações.
Cabeçalho no mobile virou flex de uma linha (marca, navegação, carrinho); com o botão do carrinho ele quebrava em duas linhas.

## Sexta versão — paleta azul e bloco unitário reduzido
Cor de destaque trocada de verde para azul, a pedido do usuário, que indicou #9ecbec.
#9ecbec sobre branco dá 1,72:1 de contraste e reprova em qualquer critério de texto (o mínimo AA é 4,5:1). Ele ficou como o tom de marca em preenchimentos e bordas, e a escala foi derivada dele para os demais papéis:
- --accent #9ecbec: apenas decoração e bordas suaves
- --accent-mid #2b86b5 (4,05:1): estrelas, borda do kit selecionado, miniatura ativa
- --accent-strong #15668c (6,34:1): todo texto, links, ícones e selos
- fundos: #eaf4fb (pílulas), #f2f8fc (faixa do Pix), #f4fafd (kit selecionado), #c9e2f3 (bordas)
Contraste medido no navegador sobre os elementos renderizados: menor valor 5,69:1 (pílulas e selo de economia), maior 16,88:1. Todos passam no AA.
A variável --green virou apelido de --accent-strong para não quebrar a regra .green herdada, que já não é usada no JSX.
Bloco do produto unitário reduzido para ficar na mesma escala da seção de produtos: coluna da foto de 1.15fr para .85fr, largura máxima de 1040px acompanhando os 900px da grade, título de 40px para 35px e padding inferior de 110px para 80px. A 1280px a foto foi de 615x769 para 373x466. Os tamanhos de texto ganhos na quinta versão foram mantidos: a redução é de área e espaçamento, não de legibilidade.
