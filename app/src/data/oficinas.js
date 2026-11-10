// Diretório de oficinas (RF22 — previsto para fase futura, aqui em protótipo).
// FICTÍCIO: nomes e endereços inventados para demonstrar a funcionalidade.
export const OFICINAS = [
  { id: 'o1', nome: 'Adapta Sorocaba', cidade: 'Sorocaba', uf: 'SP', distancia: 68, servicos: ['acelerador-esquerdo', 'pomo', 'freio-manual', 'pedais'], credenciada: true, nota: 4.8, prazo: '3 a 5 dias' },
  { id: 'o2', nome: 'Mobilidade Itapê', cidade: 'Itapetininga', uf: 'SP', distancia: 0, servicos: ['acelerador-esquerdo', 'pomo', 'pedais'], credenciada: true, nota: 4.6, prazo: '2 a 4 dias' },
  { id: 'o3', nome: 'Giro Acessível', cidade: 'Campinas', uf: 'SP', distancia: 180, servicos: ['giratorio', 'elevador'], credenciada: true, nota: 4.9, prazo: '10 a 15 dias' },
  { id: 'o4', nome: 'Oficina Tatuí Adapt', cidade: 'Tatuí', uf: 'SP', distancia: 42, servicos: ['pomo', 'pedais'], credenciada: false, nota: 4.1, prazo: '1 a 2 dias' },
  { id: 'o5', nome: 'Comando Livre', cidade: 'Jundiaí', uf: 'SP', distancia: 150, servicos: ['freio-manual', 'acelerador-esquerdo', 'giratorio'], credenciada: true, nota: 4.7, prazo: '5 a 7 dias' },
];
