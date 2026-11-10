// Regras de negócio parametrizadas num ponto só (RNF07 · RS1).
// RN01–RN03: alíquotas e tetos; RN07: carência de revenda.
// ATENÇÃO: valores de referência para São Paulo. Os prazos de carência variam
// conforme a lei vigente na data da compra — a equipe deve confirmar antes da
// apresentação e ajustar aqui, sem tocar em nenhum componente.
export const REGRAS = {
  ipi: { aliquota: 0.0991, teto: 200000, carenciaAnos: 2 },
  icms: { aliquota: 0.12, teto: 120000, carenciaAnos: 2 },
  ipva: { aliquota: 0.04, teto: null },
  uf: 'SP',
};

export function calcularIsencao(preco) {
  const { ipi, icms, ipva } = REGRAS;
  const temIpi = preco <= ipi.teto;
  const temIcms = preco <= icms.teto;
  return {
    ipi: temIpi ? preco * ipi.aliquota : 0,
    icms: temIcms ? preco * icms.aliquota : 0,
    ipva: preco * ipva.aliquota,
    temIpi, temIcms,
    // RN04: entre os dois tetos é isento de IPI mas paga ICMS integral.
    faixaArmadilha: !temIcms && temIpi,
  };
}

/** Data em que a carência de revenda termina (RN07). null se não houve isenção. */
export function fimCarencia(veiculo) {
  const anos = Math.max(
    ...veiculo.isencoes.map((i) => REGRAS[i.toLowerCase()]?.carenciaAnos || 0), 0,
  );
  if (!anos || !veiculo.compraOriginal) return null;
  const d = new Date(veiculo.compraOriginal + 'T12:00:00');
  d.setFullYear(d.getFullYear() + anos);
  return d;
}
