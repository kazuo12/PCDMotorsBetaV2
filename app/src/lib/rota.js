import { useSyncExternalStore } from 'react';

// Roteamento por hash: funciona em hospedagem estática (RNF06) sem configurar
// redirecionamento no servidor.
const ler = () => (location.hash.replace(/^#/, '') || '/');
export function useRota() {
  const r = useSyncExternalStore(
    (cb) => { addEventListener('hashchange', cb); return () => removeEventListener('hashchange', cb); },
    ler,
  );
  const [caminho, busca = ''] = r.split('?');
  const partes = caminho.split('/').filter(Boolean);
  return { partes, params: new URLSearchParams(busca), caminho };
}
export const ir = (h) => { location.hash = h; };
