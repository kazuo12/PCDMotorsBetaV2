import Icone from './Icone';
import { HOJE, laudoValido } from '../data/veiculos';

const DIA = 86400000;
const dataBR = (d) => new Date(d + 'T12:00:00').toLocaleDateString('pt-BR');

// RF11 · RN06: estado do laudo calculado pela data, com três níveis.
export function estadoLaudo(v) {
  const dias = Math.ceil((new Date(v.laudoValidade + 'T23:59:59') - HOJE) / DIA);
  if (!laudoValido(v)) return { nivel: 'vencido', rotulo: 'Laudo vencido', dias, data: dataBR(v.laudoValidade) };
  if (dias <= 60) return { nivel: 'vencendo', rotulo: `Laudo vence em ${dias} dias`, dias, data: dataBR(v.laudoValidade) };
  return { nivel: 'ok', rotulo: 'Laudo em dia', dias, data: dataBR(v.laudoValidade) };
}

export function SeloLaudo({ v, completo = false }) {
  if (!v.laudoValidade) return null;
  const e = estadoLaudo(v);
  return (
    <span className={'selo selo-' + e.nivel}>
      <Icone nome={e.nivel === 'ok' ? 'check' : 'alerta'} tam={13} />
      {e.rotulo}{completo && <span className="selo-data"> · {e.nivel === 'vencido' ? 'desde' : 'até'} {e.data}</span>}
    </span>
  );
}

// RF23: selo de adaptação verificada pela equipe.
export function SeloVerificado({ v }) {
  if (!v.verificado) return null;
  return (
    <span className="selo selo-verificado" title="Adaptação conferida pela equipe PCD Motors (protótipo)">
      <Icone nome="escudo" tam={13} /> Verificada
    </span>
  );
}

export function Compat({ c, grande = false }) {
  if (!c) return null;
  const nivel = c.pct === 100 ? 'total' : c.pct >= 50 ? 'parcial' : 'baixa';
  const tam = grande ? 48 : 16;
  const anel = (
    <svg viewBox="0 0 36 36" width={tam} height={tam} aria-hidden="true">
      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth={grande ? 4 : 7} />
      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth={grande ? 4 : 7} strokeLinecap="round"
              strokeDasharray={`${(c.pct / 100) * 88} 88`} transform="rotate(-90 18 18)" />
    </svg>
  );
  if (grande) return <span className={'compat compat-g compat-' + nivel} aria-hidden="true">{anel}<b className="mono">{c.pct}%</b></span>;
  return (
    <span className={'compat-pilula compat-' + nivel}>
      {anel}<b className="mono">{c.pct}%</b><span className="oculto-visual"> compatível com seu perfil</span>
    </span>
  );
}
