# Documento de Escopo — PCD Motors

**Projeto:** PCD Motors — marketplace de veículos já adaptados para pessoas com deficiência
**Disciplinas:** Engenharia de Software I (Prof. Me. Marcelo dos Santos Moreira) · Projeto Integrador I (Profa. Silvia Garcia)
**Equipe:** Cibele Santiago Soares · Gabriel Kazuo Seckler · Kayke Müller Diniz
**Região de referência:** Itapetininga — SP
**Empresa analisada:** Webmotors
**Versão do documento:** 1.0

---

## 1. Contexto e justificativa

### 1.1 O problema

Os classificados de veículos consolidados no Brasil — Webmotors, OLX Autos,
iCarros — organizam o acervo por marca, modelo, ano, preço e quilometragem.
Nenhum deles trata a **adaptação veicular como atributo de busca**.

Para uma pessoa com deficiência, porém, a adaptação não é um detalhe da
descrição: é o critério que decide se o carro serve ou não. Um Onix com
acelerador esquerdo e um Onix sem adaptação são, para esse comprador, produtos
diferentes — mas aparecem no mesmo resultado de busca, indistinguíveis até que
alguém abra o anúncio e leia o texto livre escrito pelo vendedor.

Disso decorrem três consequências:

1. **Tempo de busca alto.** O comprador abre anúncio por anúncio procurando a
   palavra "adaptado", "pomo", "comando manual". A informação, quando existe,
   está solta na descrição, sem padronização de vocabulário.
2. **Informação incompleta na decisão.** Dois dados que determinam o negócio
   raramente aparecem: se o **laudo da adaptação está válido** e **quais
   isenções** (IPI, ICMS, IPVA) foram usadas na compra original — o que define
   a carência de revenda e o risco de devolução do imposto.
3. **Mercado secundário sem visibilidade.** Quem vende um carro adaptado anuncia
   para o público geral, que não valoriza a adaptação; e quem procura um carro
   adaptado não encontra o estoque que existe.

### 1.2 A oportunidade

Existe um estoque real de veículos adaptados em revenda e nenhum canal
especializado que os reúna. A hipótese central do projeto é:

> Compradores com deficiência preferem um marketplace com filtros
> especializados por tipo de adaptação a garimpar anúncios em classificados
> genéricos.

---

## 2. Objetivos

### 2.1 Objetivo geral

Desenvolver uma aplicação web que centralize a oferta de veículos **já
adaptados** para pessoas com deficiência, permitindo busca pelo tipo de
adaptação instalada e exibindo, em cada anúncio, a validade do laudo técnico e
as isenções fiscais aplicadas na compra original.

### 2.2 Objetivos específicos

| # | Objetivo |
|---|---|
| OE1 | Modelar um vocabulário padronizado de adaptações veiculares, com nome e explicação em linguagem acessível a quem nunca dirigiu adaptado |
| OE2 | Implementar busca e filtragem por adaptação, carroceria, faixa de preço e situação documental |
| OE3 | Exibir em cada anúncio o estado do laudo de adaptação e as isenções declaradas |
| OE4 | Oferecer comparação lado a lado de veículos, adaptação por adaptação |
| OE5 | Disponibilizar um simulador de isenção que mostre IPI, ICMS e IPVA com os tetos legais vigentes |
| OE6 | Construir uma interface acessível e responsiva, utilizável em desktop, tablet e celular |
| OE7 | Documentar requisitos, modelagem e processo conforme as disciplinas de Engenharia de Software I e Projeto Integrador I |

---

## 3. Público-alvo e stakeholders

### 3.1 Usuários finais

| Perfil | Necessidade |
|---|---|
| Pessoa com deficiência condutora | Encontrar veículo cuja adaptação corresponda à sua limitação específica |
| Pessoa com deficiência não condutora | Veículo adaptado para transporte, com acesso e acomodação adequados (direito reconhecido desde 2020) |
| Familiar ou cuidador | Pesquisar e comparar em nome do usuário |
| Vendedor particular | Anunciar para público qualificado, sem contato de comprador incompatível |

### 3.2 Demais partes interessadas

| Stakeholder | Interesse |
|---|---|
| Concessionárias e lojas | Canal segmentado para veículos adaptados em estoque |
| Oficinas de adaptação veicular | Visibilidade como parceiras verificadas e fonte de pós-venda |
| Despachantes | Demanda de transferência e regularização documental |
| Corpo docente | Avaliação do projeto nas duas disciplinas |

---

## 4. Escopo do produto

### 4.1 Visão geral

Aplicação web de página única, composta por seis áreas:

| Área | Função |
|---|---|
| Início | Apresentação do problema, números do acervo, vitrine de destaques, glossário resumido das adaptações, explicação das isenções e perguntas frequentes |
| Catálogo | Listagem completa com filtros, ordenação e comparação |
| Veículo | Ficha do anúncio: fotos, dados técnicos, adaptações explicadas, estado do laudo, isenções |
| Adaptações | Glossário completo dos sete comandos, e o que torna uma adaptação legal |
| Isenções | IPI, ICMS e IPVA — regras, tetos e a armadilha dos dois tetos diferentes |
| Entrar | Acesso à conta (interface) |

### 4.2 Requisitos funcionais

Legenda de situação: **I** = implementado · **P** = interface pronta, sem persistência · **F** = previsto para fase futura

| ID | Requisito | Situação |
|---|---|---|
| RF01 | O sistema deve listar os veículos adaptados disponíveis, exibindo marca, modelo, versão, ano, quilometragem, preço, localização e adaptações instaladas | I |
| RF02 | O sistema deve permitir filtrar a listagem por **tipo de adaptação**, com seleção múltipla | I |
| RF03 | O sistema deve permitir filtrar por **carroceria** (hatch, sedã, SUV) | I |
| RF04 | O sistema deve permitir filtrar por **preço máximo** | I |
| RF05 | O sistema deve permitir filtrar por **situação documental**: somente anúncios com laudo válido | I |
| RF06 | O sistema deve permitir filtrar por **isenção total** (veículos dentro de todos os tetos) | I |
| RF07 | O sistema deve indicar, junto a cada filtro de adaptação, quantos anúncios o atendem | I |
| RF08 | O sistema deve permitir ordenar a listagem por relevância, preço, quilometragem e ano | I |
| RF09 | O sistema deve exibir uma página de detalhe por veículo, com a ficha técnica completa | I |
| RF10 | O sistema deve explicar, na ficha do veículo, o que cada adaptação instalada faz, em linguagem não técnica | I |
| RF11 | O sistema deve exibir o **estado do laudo** da adaptação (válido ou vencido) e destacar visualmente o caso vencido | I |
| RF12 | O sistema deve exibir **quais isenções** (IPI, ICMS, IPVA) foram aplicadas na compra original do veículo | I |
| RF13 | O sistema deve permitir **comparar até três veículos** simultaneamente, adaptação por adaptação | I |
| RF14 | O sistema deve oferecer um **simulador de isenção** que calcule IPI, ICMS e IPVA a partir de um preço informado, sinalizando quando o valor ultrapassa cada teto | I |
| RF15 | O sistema deve apresentar um glossário completo das adaptações e explicar o papel do laudo técnico | I |
| RF16 | O sistema deve informar a ausência de resultados quando nenhum anúncio atender aos filtros | I |
| RF17 | O sistema deve oferecer cadastro e autenticação de usuário | P |
| RF18 | O sistema deve permitir salvar anúncios de interesse na conta do usuário | P |
| RF19 | O sistema deve notificar o usuário quando entrar um veículo compatível com sua adaptação | P |
| RF20 | O sistema deve permitir contato direto entre comprador e vendedor | P |
| RF21 | O sistema deve permitir que o vendedor cadastre um anúncio, incluindo dados da adaptação e laudo | F |
| RF22 | O sistema deve manter um diretório de oficinas parceiras especializadas em adaptação | F |
| RF23 | O sistema deve aplicar selo de "adaptação verificada" aos anúncios conferidos pela equipe | F |

### 4.3 Requisitos não funcionais

| ID | Requisito | Critério verificável |
|---|---|---|
| RNF01 | **Responsividade** — a interface deve funcionar em desktop, tablet e celular | Layout verificado em 1200 px, 810 px e 390 px sem corte de conteúdo ou rolagem horizontal |
| RNF02 | **Acessibilidade** — navegação por teclado, contraste adequado e marcação semântica | Elementos interativos alcançáveis por tabulação; rótulos ARIA nos grupos de filtro; contraste mínimo AA no texto |
| RNF03 | **Desempenho de carga** — a primeira pintura não deve depender do download integral dos recursos | Recursos servidos separadamente; primeira pintura após ~413 KB, em vez de aguardar HTML único de 4,3 MB |
| RNF04 | **Fluidez de interação** — animações e reordenações devem ocorrer sem travamento perceptível | Animação por física de mola com passo fixo de 1/120 s e um único laço de quadro para a página; reordenação por técnica FLIP |
| RNF05 | **Clareza terminológica** — nenhum termo técnico de adaptação pode aparecer sem explicação ao alcance do usuário | Cada adaptação possui nome curto, nome completo e texto explicativo; todos exibidos na ficha do veículo |
| RNF06 | **Portabilidade de publicação** — o site deve poder ser hospedado como conteúdo estático | Publicação via GitHub Pages a partir de pasta de build, sem servidor de aplicação |
| RNF07 | **Manutenibilidade do conteúdo** — alterar acervo, textos ou regras fiscais não deve exigir alteração de componentes de interface | Dados isolados em `veiculos.js`, `adaptacoes.js`; regras fiscais parametrizadas no simulador |
| RNF08 | **Privacidade** — o sistema não coleta nem transmite dados pessoais na fase atual | Ausência de back-end, formulários sem envio e ausência de rastreadores |

### 4.4 Regras de negócio

| ID | Regra |
|---|---|
| RN01 | A isenção de **IPI** é de 9,91% e vale para veículos de até **R$ 200.000,00** |
| RN02 | A isenção de **ICMS** é de 12% e, em São Paulo, vale para veículos de até **R$ 120.000,00** |
| RN03 | A isenção de **IPVA** é de 4% ao ano e, em São Paulo, **não possui teto de valor**; permanece válida enquanto o veículo estiver registrado em nome da pessoa com deficiência, limitada a um veículo por titular |
| RN04 | Na faixa entre R$ 120.000,00 e R$ 200.000,00 o veículo é isento de IPI mas paga ICMS integral — é a faixa que mais induz erro de cálculo e deve ser sinalizada explicitamente |
| RN05 | A adaptação só é legalmente reconhecida quando instalada em oficina credenciada, aprovada em vistoria e registrada no campo de observações do CRLV |
| RN06 | O laudo de adaptação possui prazo de validade; vencido, a transferência fica impedida e a isenção corre risco — o anúncio deve marcar esse caso |
| RN07 | Veículo comprado com isenção de IPI ou ICMS possui prazo de carência para revenda sem devolução do imposto; por isso cada anúncio declara as isenções da compra original |
| RN08 | Desde 2020 a isenção alcança também a pessoa com deficiência que **não dirige**, desde que o veículo seja conduzido por motorista autorizado a seu serviço |

### 4.5 Modelo de dados (entidades principais)

**Veículo / Anúncio**
`id`, `marca`, `modelo`, `versao`, `ano`, `anoFab`, `preco`, `km`, `carroceria`,
`cambio`, `combustivel`, `cor`, `cidade`, `uf`, `vendedor`, `nota`,
`adaptacoes[]`, `isencoes[]`, `laudo`, `garantia`, `destaque`, `foto`

**Adaptação**
`codigo`, `nome`, `curto`, `texto`

Sete adaptações catalogadas: câmbio automático, acelerador esquerdo, pomo no
volante, comando manual de freio, prolongador de pedais, banco giratório e
elevador de cadeira.

---

## 5. Escopo do projeto (entregas)

### 5.1 Estrutura analítica

```
PCD Motors
├── 1. Levantamento
│   ├── 1.1 Análise da empresa de referência (Webmotors)
│   ├── 1.2 Identificação do problema e da lacuna de mercado
│   ├── 1.3 Mapeamento de stakeholders
│   └── 1.4 Levantamento de requisitos
├── 2. Modelagem
│   ├── 2.1 Requisitos funcionais e não funcionais
│   ├── 2.2 Regras de negócio e legislação de isenção
│   ├── 2.3 Modelo de dados
│   └── 2.4 Diagramas (casos de uso, atividades)
├── 3. Design
│   ├── 3.1 Identidade visual e tokens de design
│   ├── 3.2 Wireframes e mockups de alta fidelidade
│   └── 3.3 Protótipo navegável (Framer)
├── 4. Implementação
│   ├── 4.1 Estrutura do projeto e sistema de estilos
│   ├── 4.2 Catálogo, filtros e ordenação
│   ├── 4.3 Ficha do veículo e glossário
│   ├── 4.4 Comparador
│   ├── 4.5 Simulador de isenção
│   └── 4.6 Responsividade e acessibilidade
├── 5. Publicação
│   ├── 5.1 Build de produção
│   └── 5.2 Hospedagem estática (GitHub Pages)
└── 6. Documentação
    ├── 6.1 Documento de escopo
    ├── 6.2 Documentação técnica (README)
    └── 6.3 Apresentação final
```

### 5.2 Entregáveis

| # | Entregável | Forma |
|---|---|---|
| E1 | Documento de escopo e requisitos | Documento escrito |
| E2 | Mockups estáticos de alta fidelidade | Telas em imagem |
| E3 | Protótipo navegável | Projeto Framer, seis páginas, três breakpoints |
| E4 | Aplicação web funcional | Código-fonte React + build estático |
| E5 | Site publicado | URL pública via GitHub Pages |
| E6 | Documentação técnica | README do repositório |
| E7 | Apresentação final | Slides e demonstração |

---

## 6. Fora do escopo

Os itens abaixo foram deliberadamente excluídos desta etapa. A exclusão é de
escopo, não de viabilidade — vários estão previstos para evolução futura.

| Item | Motivo da exclusão |
|---|---|
| Pagamento ou transação financeira na plataforma | O produto é classificado, não intermediário de venda; a negociação ocorre entre as partes |
| Aplicativo móvel nativo | O MVP é integralmente web responsivo |
| Back-end, banco de dados e persistência | Fora do recorte das disciplinas nesta etapa; acervo é estático e fictício |
| Laudo de vistoria mecânica geral do veículo | Serviço de terceiros, não automatizável pela plataforma |
| Integração automatizada com Detran ou despachantes | Depende de convênio institucional inexistente |
| Chat com histórico, notificações push | Depende de back-end; previsto para fase posterior |
| Cadastro de anúncio pelo vendedor | Depende de autenticação e persistência |
| Diretório de oficinas parceiras | Depende de parcerias comerciais reais |
| Moderação de conteúdo e verificação presencial de laudo | Exige operação humana, fora do escopo acadêmico |

---

## 7. Premissas

| # | Premissa |
|---|---|
| P1 | O acervo exibido é **fictício**, montado com modelos e preços plausíveis para o mercado brasileiro de 2023–2024; não há venda real |
| P2 | As alíquotas e tetos de isenção utilizados são os vigentes em São Paulo no período do projeto e podem ser reajustados por legislação |
| P3 | A equipe dispõe de acesso aos ambientes de desenvolvimento e publicação durante todo o período letivo |
| P4 | As fotografias de marca utilizadas provêm de base aberta sob licença MIT (car-logos-dataset) |
| P5 | O projeto não coleta dados pessoais, dispensando tratamento de conformidade com a LGPD nesta etapa |

---

## 8. Restrições

| # | Restrição | Natureza |
|---|---|---|
| R1 | Prazo limitado ao calendário das disciplinas | Cronograma |
| R2 | Equipe de três integrantes, em regime de estudo | Recurso humano |
| R3 | Orçamento nulo: apenas ferramentas gratuitas ou de camada gratuita | Financeiro |
| R4 | Hospedagem estática, sem servidor de aplicação — o que impede, por si só, qualquer funcionalidade que exija persistência | Técnica |
| R5 | Ausência de acesso a dados reais de anúncios ou a parceiros comerciais | Dados |
| R6 | Legislação de isenção varia por estado; o escopo adota São Paulo como referência | Regulatória |

---

## 9. Critérios de aceitação

O projeto será considerado concluído quando:

1. O site estiver publicado e acessível por URL pública;
2. A listagem permitir filtrar por adaptação, carroceria, preço e situação
   documental, com resultado consistente e contagem por filtro;
3. Cada anúncio exibir adaptações explicadas, estado do laudo e isenções
   declaradas;
4. A comparação de até três veículos funcionar adaptação por adaptação;
5. O simulador calcular IPI, ICMS e IPVA e sinalizar corretamente a faixa entre
   os dois tetos;
6. A interface operar sem defeito visual em 1200 px, 810 px e 390 px;
7. A documentação de escopo, requisitos e técnica estiver entregue.

---

## 10. Riscos

| # | Risco | Prob. | Impacto | Resposta |
|---|---|---|---|---|
| RS1 | Mudança na legislação de isenção durante o projeto | Baixa | Médio | Alíquotas e tetos parametrizados em um único ponto do código |
| RS2 | Ausência de usuários PcD para validação da interface | Média | Alto | Validar com roteiro de usabilidade junto a familiares e, se possível, associações locais |
| RS3 | Indisponibilidade de fotografias reais dos modelos anunciados | Alta | Baixo | Anúncio sem foto real exibe aviso explícito de "foto ilustrativa" |
| RS4 | Escopo crescer além da capacidade da equipe | Média | Alto | Lista de "fora do escopo" explícita e revisada a cada entrega |
| RS5 | Divergência entre protótipo e implementação | Média | Médio | Tokens de design compartilhados; protótipo tratado como referência, não como entrega paralela |
| RS6 | Perda de trabalho por falha de ambiente | Baixa | Alto | Versionamento em repositório remoto a cada entrega |

---

## 11. Glossário

| Termo | Definição |
|---|---|
| **PcD** | Pessoa com Deficiência |
| **Adaptação veicular** | Alteração física no veículo que permite sua condução ou uso por pessoa com deficiência |
| **Laudo de adaptação** | Documento emitido após vistoria que atesta a adaptação; possui prazo de validade |
| **CRLV** | Certificado de Registro e Licenciamento de Veículo; a adaptação deve constar em suas observações |
| **IPI** | Imposto sobre Produtos Industrializados — federal, incide sobre veículo novo |
| **ICMS** | Imposto sobre Circulação de Mercadorias e Serviços — estadual |
| **IPVA** | Imposto sobre a Propriedade de Veículos Automotores — estadual, anual |
| **Carência de revenda** | Prazo mínimo de posse antes da revenda sem devolução do imposto isentado |
| **Pomo** | Manopla fixada ao volante que permite girar a direção com uma das mãos |
| **Acelerador esquerdo** | Segundo pedal de acelerador instalado à esquerda do freio |
| **MVP** | Produto Mínimo Viável — menor versão capaz de validar a hipótese central |
| **FLIP** | Técnica de animação de reordenação de lista (First, Last, Invert, Play) |