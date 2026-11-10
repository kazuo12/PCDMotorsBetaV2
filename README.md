<img src="app/public/favicon.svg" width="64" alt="">

# PCD Motors · Beta V2

Marketplace de veículos **já adaptados** para pessoas com deficiência — segunda
versão do protótipo.

Projeto Integrador I · Engenharia de Software I — Itapetininga/SP
Kayke Müller Diniz · Gabriel Kazuo Seckler · Cibele Santiago Soares

V1: [kazuo12/PCDMotors](https://github.com/kazuo12/PCDMotors) · [site](https://kazuo12.github.io/PCDMotors/)

---

## O que muda da V1 para a V2

A V1 colocou a adaptação como primeiro filtro. A V2 dá um passo antes:
**a pessoa não precisa saber o nome da adaptação.** Ela responde três perguntas
em linguagem comum — quem dirige, o que muda ao dirigir, até quanto pagar — e o
site traduz isso nas adaptações necessárias. A partir daí, cada anúncio mostra
**quanto serve para ela** e o que falta.

| Novidade | Requisito |
|---|---|
| **Perfil de condução** em 3 passos, incluindo quem não dirige | RF24 |
| **Compatibilidade** em cada anúncio (% e o que falta) | RF25 |
| **Oficinas que instalam o que falta**, direto na ficha | RF22 · RF26 |
| **Laudo calculado pela data**: em dia / vence em N dias / vencido | RF11 · RF27 |
| **Fim da carência de revenda** na ficha | RF28 |
| Conta, salvos, alertas e mensagens **funcionando** (no navegador) | RF17–RF20 |
| **Anunciar** em 3 passos com prévia ao vivo | RF21 |
| Selo **Adaptação verificada** | RF23 |
| Simulador com a **faixa da armadilha** (R$ 120–200 mil) destacada na régua | RF14 · RN04 |

Detalhes e rastreabilidade completa em
[`documentacao/ESCOPO-V2.md`](documentacao/ESCOPO-V2.md). O escopo original
está em [`documentacao/ESCOPO-V1.md`](documentacao/ESCOPO-V1.md).

## Páginas

`#/` início · `#/perfil` perfil de condução · `#/catalogo` · `#/veiculo/:id` ·
`#/comparar` · `#/isencoes` · `#/adaptacoes` · `#/oficinas` · `#/anunciar` ·
`#/conta` · `#/entrar`

## Rodar

```bash
cd app
npm install
npm run dev        # desenvolvimento
npm run build      # gera ../docs, que é o que o GitHub Pages publica
```

## Publicar no GitHub Pages

A pasta `docs/` já contém o site construído. Em **Settings → Pages → Source**,
escolha *Deploy from a branch*, a branch `main` e a pasta **`/docs`**.

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Anúncios, datas de laudo, selo verificado | `app/src/data/veiculos.js` |
| Textos das adaptações e o mapa "situação → adaptação" do perfil | `app/src/data/adaptacoes.js` |
| **Alíquotas, tetos e prazos de carência** | `app/src/data/regras.js` |
| Oficinas | `app/src/data/oficinas.js` |
| Cores, tipografia, layout | `app/src/styles/app.css` |
| Fotos dos anúncios | `app/src/assets/fotos-reais/<id>.webp` |

## Como foi feito

Vite + React 19, sem nenhuma outra dependência. Roteamento por hash (funciona em
hospedagem estática), estado global com `useSyncExternalStore` sobre o
`localStorage` (`app/src/lib/estado.js`).

## Limites honestos

- **Sem servidor.** Conta, mensagens, alertas e anúncios publicados ficam só no
  navegador de quem usa. Nada é enviado; "Apagar meus dados" na conta limpa tudo.
- **Catálogo e oficinas são fictícios.** Fotos dos modelos vêm da V1; logos do
  [car-logos-dataset](https://github.com/filippofilip95/car-logos-dataset) (MIT).
- **Prazos de carência** em `regras.js` são valores de referência — confirmem na
  legislação vigente antes da banca.
