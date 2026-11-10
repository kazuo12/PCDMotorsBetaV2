// Ícones de traço, 24×24, desenhados à mão para não depender de biblioteca.
const P = {
  busca: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4',
  coracao: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  balanca: 'M12 4v16M7 20h10M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z',
  sino: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
  escudo: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6L6 18',
  alerta: 'M12 4l9 16H3zM12 10v4M12 17v.5',
  pino: 'M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11zM12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  seta: 'M5 12h14M13 6l6 6-6 6',
  voltar: 'M19 12H5M11 6l-6 6 6 6',
  usuario: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  chave: 'M14 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM11.5 11.5L4 19M7 16l2 2',
  volante: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3.5 11h6.5M14 11h6.5M12 14v7',
  cadeira: 'M9 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 8v6h6l2 5M13 21a5 5 0 1 1-6.5-6.5',
  chat: 'M4 5h16v11H9l-5 4z',
  mais: 'M12 5v14M5 12h14',
  calendario: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  filtro: 'M4 5h16l-6 8v6l-4-2v-4z',
  ferramenta: 'M14.5 4a4.5 4.5 0 0 0-4.3 5.8L4 16l4 4 6.2-6.2A4.5 4.5 0 0 0 20 9.5l-3 1-2.5-2.5 1-3z',
  lixo: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13',
  sair: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
  estrela: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  info: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 11v6M12 7.5v.5',
};
export default function Icone({ nome, tam = 18, cheio = false, ...r }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" aria-hidden="true" fill={cheio ? 'currentColor' : 'none'}
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...r}>
      <path d={P[nome]} />
    </svg>
  );
}
