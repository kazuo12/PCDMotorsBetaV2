import { useMemo, useState } from 'react';
import Icone from '../components/Icone';
import Cartao from '../components/Cartao';
import { ADAPTACOES, ORDEM_ADAPTACOES, adaptacoesDoPerfil } from '../data/adaptacoes';
import { CARROCERIAS, ORDENACOES, laudoValido, NOMES_MARCA } from '../data/veiculos';
import { REGRAS } from '../data/regras';
import { acoes, useEstado } from '../lib/estado';
import { compat, todosVeiculos } from '../lib/compat';
import { moeda } from '../lib/util';

const isentoTotal = (v) => v.preco <= REGRAS.icms.teto && v.preco <= REGRAS.ipi.teto;

export default function Catalogo({ params }) {
  const perfil = useEstado((s) => s.perfil);
  const anuncios = useEstado((s) => s.anuncios);
  const conta = useEstado((s) => s.conta);
  const todos = todosVeiculos(anuncios);

  const [f, setF] = useState(() => ({
    texto: params.get('q') || '',
    adaptacoes: perfil ? adaptacoesDoPerfil(perfil) : (params.get('a') ? [params.get('a')] : []),
    carrocerias: [],
    precoMax: perfil?.precoMax ?? 185000,
    laudo: params.get('laudo') === '1',
    isencao: false,
    verificado: false,
  }));
  const [ordem, setOrdem] = useState(perfil ? 'compat' : 'menor-preco');
  const [avisoAlerta, setAvisoAlerta] = useState(false);
  // No celular os filtros começam recolhidos para os resultados aparecerem logo.
  const [abertoInicial] = useState(() => typeof matchMedia !== 'function' || matchMedia('(min-width: 1001px)').matches);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const alterna = (k, v) => setF((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v] }));

  // Filtros sem as adaptações: a contagem ao lado de cada adaptação (RF07)
  // diz quantos anúncios ela acrescentaria dentro dos demais filtros.
  const base = useMemo(() => todos.filter((v) => {
    const t = f.texto.trim().toLowerCase();
    if (t && !`${v.modelo} ${NOMES_MARCA[v.marca] || v.marca} ${v.cidade}`.toLowerCase().includes(t)) return false;
    if (f.carrocerias.length && !f.carrocerias.includes(v.carroceria)) return false;
    if (v.preco > f.precoMax) return false;
    if (f.laudo && !laudoValido(v)) return false;
    if (f.isencao && !isentoTotal(v)) return false;
    if (f.verificado && !v.verificado) return false;
    return true;
  }), [todos, f]);

  const lista = useMemo(() => {
    const r = base.filter((v) => f.adaptacoes.every((a) => v.adaptacoes.includes(a)));
    const fn = {
      compat: (a, b) => (compat(b, perfil)?.pct ?? 0) - (compat(a, perfil)?.pct ?? 0) || b.nota - a.nota,
      'menor-preco': (a, b) => a.preco - b.preco,
      'maior-preco': (a, b) => b.preco - a.preco,
      'menor-km': (a, b) => a.km - b.km,
      'mais-novo': (a, b) => b.ano - a.ano || a.km - b.km,
    }[ordem];
    return [...r].sort(fn);
  }, [base, f.adaptacoes, ordem, perfil]);

  const criarAlerta = () => {
    acoes.criarAlerta({ adaptacoes: f.adaptacoes, precoMax: f.precoMax });
    setAvisoAlerta(true);
  };

  const filtros = (
    <div className="filtros">
      <div className="campo-busca">
        <Icone nome="busca" />
        <input type="search" placeholder="Modelo, marca ou cidade" value={f.texto}
               aria-label="Buscar por modelo, marca ou cidade" onChange={(e) => set('texto', e.target.value)} />
      </div>

      <fieldset>
        <legend className="rotulo mono">Adaptação necessária</legend>
        {perfil && <p className="filtro-dica"><Icone nome="usuario" tam={13} /> Pré-marcado pelo seu perfil</p>}
        {ORDEM_ADAPTACOES.map((a) => {
          const n = base.filter((v) => v.adaptacoes.includes(a)).length;
          return (
            <label key={a} className="check">
              <input type="checkbox" checked={f.adaptacoes.includes(a)} onChange={() => alterna('adaptacoes', a)} />
              <span className="caixa" aria-hidden="true"><Icone nome="check" tam={12} /></span>
              <span className="check-nome">{ADAPTACOES[a].nome}</span>
              <span className="check-num mono" aria-label={`${n} anúncios`}>{n}</span>
            </label>
          );
        })}
      </fieldset>

      <fieldset>
        <legend className="rotulo mono">Carroceria</legend>
        <div className="pilulas">
          {CARROCERIAS.map((c) => (
            <button key={c} className={'pilula' + (f.carrocerias.includes(c) ? ' ativa' : '')}
                    aria-pressed={f.carrocerias.includes(c)} onClick={() => alterna('carrocerias', c)}>{c}</button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="rotulo mono">Preço até</legend>
        <output className="mono filtro-preco">{moeda(f.precoMax)}</output>
        <input type="range" min={55000} max={230000} step={1000} value={f.precoMax}
               aria-label="Preço máximo" onChange={(e) => set('precoMax', +e.target.value)} />
        {f.precoMax > REGRAS.icms.teto && <p className="filtro-dica alerta"><Icone nome="alerta" tam={13} /> Acima de {moeda(REGRAS.icms.teto)} não há isenção de ICMS</p>}
      </fieldset>

      <fieldset>
        <legend className="rotulo mono">Documentação</legend>
        {[
          ['laudo', 'Laudo da adaptação em dia'],
          ['verificado', 'Somente adaptação verificada'],
          ['isencao', 'Dentro de todos os tetos de isenção'],
        ].map(([k, t]) => (
          <label key={k} className="check">
            <input type="checkbox" checked={f[k]} onChange={() => set(k, !f[k])} />
            <span className="caixa" aria-hidden="true"><Icone nome="check" tam={12} /></span>
            <span className="check-nome">{t}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );

  return (
    <section className="secao gaveta">
      <div className="secao-cab">
        <div>
          <p className="rotulo mono">Catálogo</p>
          <h1 className="h1-pagina">Veículos já adaptados</h1>
        </div>
      </div>

      <div className="catalogo">
        <aside aria-label="Filtros">
          <details className="filtros-movel" open={abertoInicial}>
            <summary><Icone nome="filtro" /> Filtros</summary>
            {filtros}
          </details>
        </aside>

        <div>
          <div className="barra-resultado">
            <p aria-live="polite"><b className="mono">{lista.length}</b> {lista.length === 1 ? 'anúncio' : 'anúncios'}</p>
            <label className="ordenar">
              <span>Ordenar</span>
              <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                {ORDENACOES.filter((o) => o.id !== 'compat' || perfil).map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}
              </select>
            </label>
          </div>

          {!perfil && (
            <a href="#/perfil" className="aviso-perfil">
              <Icone nome="usuario" /> <span><b>Monte seu perfil de condução</b> e cada anúncio mostra quanto serve para você.</span> <Icone nome="seta" tam={16} />
            </a>
          )}

          {lista.length ? (
            <div className="grade-cartoes">{lista.map((v) => <Cartao key={v.id} v={v} />)}</div>
          ) : (
            <div className="vazio">
              <Icone nome="busca" tam={32} />
              <h2>Nenhum carro com essa combinação agora</h2>
              <p>O estoque compatível com adaptações específicas é pequeno. Crie um alerta e avisamos quando entrar um que serve.</p>
            </div>
          )}

          <div className="alerta-caixa">
            <Icone nome="sino" tam={22} />
            <div>
              <b>Avise-me quando entrar um carro assim</b>
              <p>{f.adaptacoes.length ? f.adaptacoes.map((a) => ADAPTACOES[a].curto).join(' + ') : 'Qualquer adaptação'} · até {moeda(f.precoMax)}</p>
            </div>
            {avisoAlerta
              ? <span className="ok"><Icone nome="check" /> Alerta criado{!conta && ' — entre para recebê-lo'}</span>
              : <button className="btn btn-primario" onClick={criarAlerta}>Criar alerta</button>}
          </div>
        </div>
      </div>
    </section>
  );
}
