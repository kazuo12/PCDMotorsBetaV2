// Vocabulário padronizado (OE1 · RF10 · RF15 · RNF05).
// Cada adaptação tem nome completo, nome curto e explicação em português claro.
// `grupo` separa o que serve para DIRIGIR do que serve para ENTRAR e LEVAR a
// cadeira — a distinção importa para quem não dirige (RN08).
export const ADAPTACOES = {
  automatico: {
    nome: 'Câmbio automático', curto: 'Automático', grupo: 'conducao',
    texto: 'Sem pedal de embreagem e sem troca manual de marchas. É a base de quase toda adaptação: libera a perna esquerda e as duas mãos para os demais comandos.',
  },
  'acelerador-esquerdo': {
    nome: 'Acelerador esquerdo', curto: 'Acel. esquerdo', grupo: 'conducao',
    texto: 'Um segundo pedal de acelerador instalado à esquerda do freio, para quem não tem força ou mobilidade na perna direita. O pedal original fica travado ou removível.',
  },
  pomo: {
    nome: 'Pomo no volante', curto: 'Pomo', grupo: 'conducao',
    texto: 'Manopla fixada no aro do volante que permite girar a direção com uma mão só, deixando a outra livre para câmbio, setas e comandos manuais.',
  },
  'freio-manual': {
    nome: 'Comando manual de freio e acelerador', curto: 'Comando manual', grupo: 'conducao',
    texto: 'Haste ao lado do volante: empurrar freia, puxar acelera. Indicada para quem não usa as pernas para dirigir.',
  },
  pedais: {
    nome: 'Prolongador de pedais', curto: 'Prolongador', grupo: 'conducao',
    texto: 'Extensores que aproximam acelerador e freio do motorista, para pessoas de baixa estatura ou com alcance reduzido.',
  },
  giratorio: {
    nome: 'Banco giratório', curto: 'Banco giratório', grupo: 'acesso',
    texto: 'O banco gira para fora do carro e, nos modelos com elevação, desce até a altura da cadeira de rodas. Facilita a transferência sem esforço de terceiros.',
  },
  elevador: {
    nome: 'Elevador de cadeira', curto: 'Elevador', grupo: 'acesso',
    texto: 'Plataforma no porta-malas que ergue e guarda a cadeira de rodas sozinha, comandada por botão.',
  },
};
export const ORDEM_ADAPTACOES = Object.keys(ADAPTACOES);

// Perfil de condução (novidade da V2). Em vez de exigir que a pessoa saiba o
// nome técnico da adaptação, ela descreve a própria situação e o sistema traduz
// para os comandos necessários.
export const NECESSIDADES = [
  { id: 'perna-direita', titulo: 'Não uso a perna direita', detalhe: 'Sem força, mobilidade ou com prótese', pede: ['automatico', 'acelerador-esquerdo'], so: 'conducao' },
  { id: 'pernas', titulo: 'Não uso as pernas para dirigir', detalhe: 'Paraplegia, lesão medular, amputação bilateral', pede: ['automatico', 'freio-manual'], so: 'conducao' },
  { id: 'um-braco', titulo: 'Dirijo com uma mão só', detalhe: 'Mobilidade reduzida em um dos braços', pede: ['automatico', 'pomo'], so: 'conducao' },
  { id: 'estatura', titulo: 'Tenho baixa estatura ou pouco alcance', detalhe: 'Os pedais ficam longe', pede: ['automatico', 'pedais'], so: 'conducao' },
  { id: 'esquerda', titulo: 'Não uso a perna esquerda', detalhe: 'Basta tirar a embreagem', pede: ['automatico'], so: 'conducao' },
  { id: 'transferencia', titulo: 'Preciso de ajuda para entrar no carro', detalhe: 'Transferência a partir da cadeira de rodas', pede: ['giratorio'], so: 'acesso' },
  { id: 'cadeira', titulo: 'Levo cadeira de rodas', detalhe: 'E não quero depender de alguém para erguê-la', pede: ['elevador'], so: 'acesso' },
];

/** Traduz um perfil em lista de adaptações exigidas, sem repetição. */
export function adaptacoesDoPerfil(perfil) {
  if (!perfil) return [];
  const out = new Set();
  for (const id of perfil.necessidades || []) {
    const n = NECESSIDADES.find((x) => x.id === id);
    if (!n) continue;
    // Quem não dirige (RN08) não precisa dos comandos de condução.
    if (perfil.quem === 'outro' && n.so === 'conducao') continue;
    n.pede.forEach((a) => out.add(a));
  }
  return [...out];
}
