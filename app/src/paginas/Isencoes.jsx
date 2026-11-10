import { useState } from 'react';
import Icone from '../components/Icone';
import { REGRAS, calcularIsencao } from '../data/regras';
import { useEstado } from '../lib/estado';
import { todosVeiculos } from '../lib/compat';
import { moeda } from '../lib/util';

const MIN = 50000, MAX = 230000;
const pos = (x) => `${((x - MIN) / (MAX - MIN)) * 100}%`;

// RF14 · RN01–RN04 · RN08.
export default function Isencoes({ params }) {
  const anuncios = useEstado((s) => s.anuncios);
  const [preco, setPreco] = useState(() => Math.min(MAX, Math.max(MIN, +params.get('preco') || 98000)));
  const r = calcularIsencao(preco);
  const todos = todosVeiculos(anuncios);
  const cabem = todos.filter((v) => v.preco <= REGRAS.icms.teto).length;
  const faixa = !r.temIpi ? 'fora' : r.faixaArmadilha ? 'armadilha' : 'total';

  return (
    <section className="secao gaveta">
      <p className="rotulo mono">Isenções · referência {REGRAS.uf}</p>
      <h1 className="h1-pagina">Quanto a isenção tira do preço</h1>
      <p className="secao-linha">Arraste até o valor do carro. Os tetos não são proporcionais: passou um real, perde a isenção daquele imposto inteira.</p>

      <div className="sim">
        <div className="sim-controle">
          <output className="preco-grande mono">{moeda(preco)}</output>
          <div className="regua regua-faixas">
            <div className="faixas" aria-hidden="true">
              <span className="f-total" style={{ left: 0, width: pos(REGRAS.icms.teto) }} />
              <span className="f-armadilha" style={{ left: pos(REGRAS.icms.teto), width: `calc(${pos(REGRAS.ipi.teto)} - ${pos(REGRAS.icms.teto)})` }} />
              <span className="f-fora" style={{ left: pos(REGRAS.ipi.teto), right: 0 }} />
            </div>
            <input type="range" min={MIN} max={MAX} step={500} value={preco} aria-label="Preço do veículo"
                   onChange={(e) => setPreco(+e.target.value)} />
            <span className="marco" style={{ left: pos(REGRAS.icms.teto), "--p": (REGRAS.icms.teto - MIN) / (MAX - MIN) }}>R$ 120 mil</span>
            <span className="marco" style={{ left: pos(REGRAS.ipi.teto), "--p": (REGRAS.ipi.teto - MIN) / (MAX - MIN) }}>R$ 200 mil</span>
          </div>
          <div className={'faixa-msg faixa-' + faixa} aria-live="polite">
            {faixa === 'total' && <><Icone nome="check" /> Isenção completa: IPI, ICMS e IPVA.</>}
            {faixa === 'armadilha' && <><Icone nome="alerta" /> <span><b>Faixa da armadilha.</b> Isento de IPI, mas paga o ICMS inteiro. É onde mais se erra a conta.</span></>}
            {faixa === 'fora' && <><Icone nome="x" /> Acima dos dois tetos: sobra só o IPVA.</>}
          </div>
          <p className="nota-baixa">{cabem} dos {todos.length} anúncios do catálogo ficam abaixo do teto de ICMS. <a href="#/catalogo">Ver catálogo</a></p>
        </div>

        <div className="sim-painel">
          <dl>
            <div className={r.temIpi ? '' : 'fora'}><dt>IPI <small>{(REGRAS.ipi.aliquota * 100).toFixed(2).replace('.', ',')}% · teto {moeda(REGRAS.ipi.teto)}</small></dt><dd className="mono">{r.temIpi ? moeda(r.ipi) : '—'}</dd></div>
            <div className={r.temIcms ? '' : 'fora'}><dt>ICMS <small>{REGRAS.icms.aliquota * 100}% · teto {moeda(REGRAS.icms.teto)}</small></dt><dd className="mono">{r.temIcms ? moeda(r.icms) : '—'}</dd></div>
          </dl>
          <div className="sim-total"><span>Economia na compra</span><strong className="mono">{moeda(r.ipi + r.icms)}</strong></div>
          <div className="sim-ipva"><span>IPVA isento, por ano <small>sem teto em SP</small></span><b className="mono">{moeda(r.ipva)}</b></div>
          <p className="aviso"><Icone nome="info" tam={14} /> Estimativa. Alíquotas e tetos mudam por estado e por lei — confirme no órgão antes de fechar.</p>
        </div>
      </div>

      <div className="tres regras">
        <div className="bloco"><h3>Quem não dirige também tem direito</h3><p>Desde 2020 a isenção alcança a pessoa com deficiência que não conduz, desde que o carro seja dirigido por motorista autorizado a seu serviço.</p></div>
        <div className="bloco"><h3>Carência de revenda</h3><p>Quem compra com isenção de IPI ou ICMS só revende sem devolver o imposto depois de um prazo. Por isso cada anúncio aqui informa a data da compra original e quando a carência termina.</p></div>
        <div className="bloco"><h3>IPVA: um carro por titular</h3><p>Em São Paulo não há teto de valor para o IPVA, mas a isenção vale para um veículo por pessoa e enquanto estiver no nome dela.</p></div>
      </div>
    </section>
  );
}
