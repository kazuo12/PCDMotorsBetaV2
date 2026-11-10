import { useSyncExternalStore } from 'react';

// Estado do usuário guardado SÓ neste navegador (RNF08: nada é enviado).
// É o que transforma os requisitos "P" da V1 (conta, favoritos, alertas,
// contato) em fluxos que funcionam de ponta a ponta no protótipo — sem
// back-end, mas com persistência real entre visitas.
const CHAVE = 'pcdmotors-v2';
const INICIAL = {
  conta: null,          // { nome, email }
  perfil: null,         // { quem: 'eu'|'outro', necessidades: [], precoMax, cidade }
  favoritos: [],        // ids
  alertas: [],          // { id, adaptacoes, precoMax, criado }
  mensagens: [],        // { id, veiculo, texto, quando }
  anuncios: [],         // anúncios publicados pelo usuário (RF21)
  comparar: [],         // até 3 ids (RF13)
};

function ler() {
  try { return { ...INICIAL, ...JSON.parse(localStorage.getItem(CHAVE) || '{}') }; }
  catch { return { ...INICIAL }; }
}

let estado = ler();
const ouvintes = new Set();

export function mudar(fn) {
  estado = { ...estado, ...fn(estado) };
  try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch { /* modo privado */ }
  ouvintes.forEach((o) => o());
}

export function useEstado(sel = (s) => s) {
  return useSyncExternalStore(
    (cb) => { ouvintes.add(cb); return () => ouvintes.delete(cb); },
    () => sel(estado),
  );
}

export const acoes = {
  entrar: (conta) => mudar(() => ({ conta })),
  sair: () => mudar(() => ({ conta: null })),
  salvarPerfil: (perfil) => mudar(() => ({ perfil })),
  alternarFavorito: (id) => mudar((s) => ({
    favoritos: s.favoritos.includes(id) ? s.favoritos.filter((x) => x !== id) : [...s.favoritos, id],
  })),
  alternarComparar: (id) => mudar((s) => {
    if (s.comparar.includes(id)) return { comparar: s.comparar.filter((x) => x !== id) };
    return { comparar: [...s.comparar, id].slice(-3) };
  }),
  limparComparar: () => mudar(() => ({ comparar: [] })),
  criarAlerta: (a) => mudar((s) => ({ alertas: [...s.alertas, { ...a, id: 'al' + Date.now(), criado: Date.now() }] })),
  removerAlerta: (id) => mudar((s) => ({ alertas: s.alertas.filter((a) => a.id !== id) })),
  enviarMensagem: (m) => mudar((s) => ({ mensagens: [{ ...m, id: 'm' + Date.now(), quando: Date.now() }, ...s.mensagens] })),
  publicarAnuncio: (a) => mudar((s) => ({ anuncios: [{ ...a, id: 'meu-' + Date.now() }, ...s.anuncios] })),
  removerAnuncio: (id) => mudar((s) => ({ anuncios: s.anuncios.filter((a) => a.id !== id) })),
  zerar: () => mudar(() => ({ ...INICIAL })),
};
