import Icone from '../components/Icone';
import { SeloLaudo, Compat } from '../components/Selos';
import { ADAPTACOES, ORDEM_ADAPTACOES } from '../data/adaptacoes';
import { calcularIsencao } from '../data/regras';
import { acoes, useEstado } from '../lib/estado';
import { compat, todosVeiculos } from '../lib/compat';
import { moeda, numero } from '../lib/util';

// RF13: até três veículos, adaptação por adaptação.
export default function Comparar() {
  const ids = useEstado((s) => s.comparar);
  const anuncios = useEstado((s) => s.anuncios);
  const perfil = useEstado((s) => s.perfil);
  const todos = todosVeiculos(anuncios);
  const vs = ids.map((id) => todos.find((v) => v.id === id)).filter(Boolean);

  if (!vs.length) return (
    <section className="secao gaveta vazio">
      <Icone nome="balanca" tam={36} />
      <h1 className="h1-pagina">Nada para comparar ainda</h1>
      <p>Toque no ícone de balança em até três anúncios.</p>
      <a className="btn btn-primario" href="#/catalogo">Ir ao catálogo</a>
    </section>
  );

  const linhas = [
    ['Preço', (v) => <b className="mono">{moeda(v.preco)}</b>],
    ['Ano · km', (v) => <span className="mono">{v.ano} · {numero(v.km)} km</span>],
    ['Carroceria', (v) => v.carroceria],
    ['Laudo', (v) => <SeloLaudo v={v} />],
    ['Economia na compra (IPI+ICMS)', (v) => { const i = calcularIsencao(v.preco); return <span className="mono">{moeda(i.ipi + i.icms)}</span>; }],
    ['Cidade', (v) => `${v.cidade}/${v.uf}`],
  ];

  return (
    <section className="secao gaveta">
      <div className="secao-cab">
        <div><p className="rotulo mono">Comparação</p><h1 className="h1-pagina">Lado a lado</h1></div>
        <button className="btn btn-fantasma" onClick={acoes.limparComparar}>Limpar</button>
      </div>
      <div className="tabela-rolagem">
        <table className="tabela-cmp">
          <thead>
            <tr>
              <th scope="col"><span className="oculto-visual">Atributo</span></th>
              {vs.map((v) => (
                <th key={v.id} scope="col">
                  {v.foto && <img src={v.foto} alt="" />}
                  <a href={'#/veiculo/' + v.id}>{v.modelo}</a>
                  <div className="cmp-sub"><Compat c={compat(v, perfil)} />
                    <button className="btn-icone" aria-label={`Remover ${v.modelo}`} onClick={() => acoes.alternarComparar(v.id)}><Icone nome="x" tam={16} /></button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map(([nome, fn]) => (
              <tr key={nome}><th scope="row">{nome}</th>{vs.map((v) => <td key={v.id}>{fn(v)}</td>)}</tr>
            ))}
            <tr className="sep"><th colSpan={vs.length + 1}>Adaptações</th></tr>
            {ORDEM_ADAPTACOES.map((a) => (
              <tr key={a}>
                <th scope="row">{ADAPTACOES[a].nome}</th>
                {vs.map((v) => (
                  <td key={v.id} className={v.adaptacoes.includes(a) ? 'sim' : 'nao'}>
                    {v.adaptacoes.includes(a) ? <><Icone nome="check" tam={18} /><span className="oculto-visual">Tem</span></> : <><span aria-hidden="true">—</span><span className="oculto-visual">Não tem</span></>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
