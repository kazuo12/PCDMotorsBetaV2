import { adaptacoesDoPerfil } from '../data/adaptacoes';
import { VEICULOS } from '../data/veiculos';
import { mudar } from './estado';

// Compatibilidade de um veículo com o perfil: fração das adaptações exigidas
// que o carro já tem instaladas. null quando não há perfil.
export function compat(veiculo, perfil) {
  const exige = adaptacoesDoPerfil(perfil);
  if (!exige.length) return null;
  const tem = exige.filter((a) => veiculo.adaptacoes.includes(a));
  return { pct: Math.round((tem.length / exige.length) * 100), tem, falta: exige.filter((a) => !tem.includes(a)) };
}

/** Todos os anúncios: catálogo + os publicados pelo próprio usuário. */
export function todosVeiculos(anuncios) {
  return [...anuncios, ...VEICULOS];
}

/** Anúncios que atendem a um alerta (RF19). */
export function casaAlerta(v, alerta) {
  return alerta.adaptacoes.every((a) => v.adaptacoes.includes(a)) && v.preco <= alerta.precoMax;
}

export { mudar };
