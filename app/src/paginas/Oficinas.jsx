import { useState } from 'react';
import Icone from '../components/Icone';
import { OFICINAS } from '../data/oficinas';
import { ADAPTACOES, ORDEM_ADAPTACOES } from '../data/adaptacoes';

// RF22 (fase futura na V1) — protótipo com dados fictícios.
export default function Oficinas() {
  const [servico, setServico] = useState('');
  const [so, setSo] = useState(false);
  const lista = OFICINAS
    .filter((o) => !servico || o.servicos.includes(servico))
    .filter((o) => !so || o.credenciada)
    .sort((a, b) => a.distancia - b.distancia);

  return (
    <section className="secao gaveta">
      <p className="rotulo mono">Oficinas parceiras · protótipo</p>
      <h1 className="h1-pagina">Quem instala e regulariza</h1>
      <p className="secao-linha">Ordenadas pela distância de Itapetininga. <b>Dados fictícios</b>, para demonstrar a funcionalidade prevista no escopo (RF22).</p>

      <div className="barra-resultado">
        <label className="ordenar">
          <span>Serviço</span>
          <select value={servico} onChange={(e) => setServico(e.target.value)}>
            <option value="">Todos</option>
            {ORDEM_ADAPTACOES.filter((a) => a !== 'automatico').map((a) => <option key={a} value={a}>{ADAPTACOES[a].nome}</option>)}
          </select>
        </label>
        <label className="check inline">
          <input type="checkbox" checked={so} onChange={() => setSo(!so)} />
          <span className="caixa" aria-hidden="true"><Icone nome="check" tam={12} /></span>
          <span className="check-nome">Somente credenciadas</span>
        </label>
      </div>

      <ul className="oficinas">
        {lista.map((o) => (
          <li key={o.id} className="oficina">
            <div className="oficina-icone"><Icone nome="ferramenta" tam={24} /></div>
            <div>
              <h3>{o.nome}</h3>
              <p className="mono">{o.cidade}/{o.uf} · {o.distancia ? `${o.distancia} km` : 'na cidade'} · ★ {o.nota.toString().replace('.', ',')}</p>
              <ul className="chips">{o.servicos.map((s) => <li key={s} className={'chip' + (s === servico ? ' chip-casa' : '')}>{ADAPTACOES[s].curto}</li>)}</ul>
            </div>
            <div className="oficina-dir">
              {o.credenciada
                ? <span className="selo selo-verificado"><Icone nome="escudo" tam={12} /> Credenciada</span>
                : <span className="selo selo-vencendo"><Icone nome="alerta" tam={12} /> Credenciamento não confirmado</span>}
              <span className="mono prazo">{o.prazo}</span>
            </div>
          </li>
        ))}
        {!lista.length && <li className="vazio">Nenhuma oficina com esse filtro.</li>}
      </ul>
    </section>
  );
}
