# Escopo — PCD Motors Beta V2

Complemento ao [Documento de Escopo v1.0](ESCOPO-V1.md). Tudo o que está lá
continua valendo (contexto, objetivos, stakeholders, RNF, regras de negócio,
fora do escopo, premissas, restrições, riscos, glossário). Este documento
registra **apenas o que muda na V2**.

## 1. Objetivo da V2

A V1 provou a hipótese central na interface: a adaptação como primeiro
filtro. Deixou, porém, sete requisitos só em interface (**P**) ou para o futuro
(**F**). A V2 leva todos eles a um fluxo que funciona de ponta a ponta no
navegador — ainda **sem back-end** (restrição R4), com persistência local — e
acrescenta uma ideia nova: o **perfil de condução**.

## 2. Situação dos requisitos funcionais

Legenda: **I** implementado · **L** implementado com persistência local (sem servidor) · **P** interface sem persistência · **F** fase futura

| ID | Requisito | V1 | V2 |
|---|---|---|---|
| RF01–RF16 | Catálogo, filtros, ordenação, ficha, laudo, isenções, comparação, simulador, glossário, estado vazio | I | I |
| RF17 | Cadastro e autenticação | P | L |
| RF18 | Salvar anúncios de interesse | P | L |
| RF19 | Alerta de veículo compatível | P | L ¹ |
| RF20 | Contato comprador–vendedor | P | L ² |
| RF21 | Vendedor cadastra anúncio com adaptação e laudo | F | L |
| RF22 | Diretório de oficinas parceiras | F | L ³ |
| RF23 | Selo de "adaptação verificada" | F | I ⁴ |
| **RF24** | O sistema deve permitir ao usuário descrever sua situação em linguagem comum (quem dirige, o que muda ao dirigir, orçamento) e traduzi-la nas adaptações necessárias | — | L |
| **RF25** | O sistema deve exibir, em cada anúncio, o percentual de compatibilidade com o perfil e quais adaptações faltam | — | I |
| **RF26** | O sistema deve indicar oficinas que instalam as adaptações que faltam num anúncio | — | I ³ |
| **RF27** | O sistema deve calcular o estado do laudo pela data de validade, com aviso quando faltam 60 dias ou menos | — | I |
| **RF28** | O sistema deve exibir a data de fim da carência de revenda, a partir da data da compra com isenção | — | I |

¹ O alerta é salvo e a conta mostra quantos anúncios casam hoje; o envio de notificação depende de servidor.
² A mensagem fica salva e aparece na conversa; o vendedor só a receberá com servidor.
³ Dados de oficinas são fictícios (R5: sem parceiros reais).
⁴ O selo é um campo do anúncio; a conferência humana que o justifica está fora do escopo acadêmico.

## 3. Regras de negócio novas

| ID | Regra |
|---|---|
| RN09 | Quando quem dirige não é a pessoa com deficiência (RN08), o perfil ignora as adaptações de condução e considera só as de acesso (banco giratório, elevador) |
| RN10 | Compatibilidade = adaptações exigidas pelo perfil presentes no carro ÷ total exigido. 100% = nenhuma adaptação extra |
| RN11 | Laudo: **vencido** se a data já passou; **vencendo** se faltam até 60 dias; **em dia** nos demais casos |
| RN12 | Fim da carência = data da compra original + o maior prazo de carência entre as isenções usadas. Os prazos estão em `app/src/data/regras.js` e **devem ser confirmados na legislação vigente** antes da apresentação |

## 4. Requisito não funcional alterado

| ID | V1 | V2 |
|---|---|---|
| RNF08 Privacidade | Nenhum dado coletado | Conta, perfil, alertas, mensagens e anúncios ficam **só no `localStorage` do navegador**; nada é transmitido. A conta oferece "Apagar meus dados" |

## 5. Critérios de aceitação adicionais

1. Montar o perfil em 3 passos e ver o catálogo já filtrado e ordenado por compatibilidade;
2. Um anúncio com laudo vencido e outro com laudo vencendo aparecem com selos distintos;
3. Criar conta, salvar um anúncio, criar um alerta e enviar uma mensagem — e encontrar os quatro na página da conta após recarregar;
4. Publicar um anúncio e encontrá-lo no catálogo, filtrável pelas adaptações informadas;
5. Interface sem rolagem horizontal em 1280 px e 390 px em todas as páginas.
