# Avisos de compras recentes

Prévia visual: abra a página inicial com `?previewCompra=1`. O card aparece a cada 22 segundos com a etiqueta **Prévia demonstrativa**. Esse modo não consulta a Yampi.

Para usar pedidos reais, configure estas variáveis de ambiente no servidor da Vercel (nunca no código cliente):

- `YAMPI_ALIAS`: alias da loja.
- `YAMPI_USER_TOKEN`: token da API.
- `YAMPI_SECRET_KEY`: chave secreta da API.
- `YAMPI_345_PRODUCT_IDS`: IDs dos produtos ou kits 345, separados por vírgula, se houver IDs além de `46101360`.
- `YAMPI_147_PRODUCT_IDS`: IDs dos produtos ou kits 147, separados por vírgula, se houver IDs além de `46101361`.

O endpoint consulta pedidos autorizados, com valor positivo e confirmação nos últimos 90 minutos. Ele devolve apenas o produto, o tempo aproximado e um identificador irreversível para evitar repetição na mesma visita. Nomes, localização, valores e dados de contato não são enviados ao navegador. Se a API não estiver configurada ou não houver pedido elegível, nenhum aviso aparece.

Os IDs padrão vieram do catálogo da loja. Antes de ativar em produção, conferir também os IDs dos kits com um pedido real, pois kits podem ter IDs próprios na Yampi.
