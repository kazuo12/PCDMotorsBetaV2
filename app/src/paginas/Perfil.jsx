import { useState } from 'react';
import Icone from '../components/Icone';
import { NECESSIDADES, ADAPTACOES, adaptacoesDoPerfil } from '../data/adaptacoes';
import { acoes, useEstado } from '../lib/estado';
import { ir } from '../lib/rota';
import { moeda } from '../lib/util';
import { REGRAS } from '../data/regras';

// Assistente de perfil de condução (novidade V2). Traduz a situação da pessoa
// em adaptações exigidas e liga isso a todo o resto do site.
export default function Perfil() {
  const salvo = useEstado((s) => s.perfil);
  const [passo, setPasso] = useState(0);
  const [p, setP] = useState(salvo || { quem: null, necessidades: [], precoMax: REGRAS.icms.teto });

  const opcoes = NECESSIDADES.filter((n) => p.quem !== 'outro' || n.so === 'acesso');
  const exige = adaptacoesDoPerfil(p);
  const alternar = (id) => setP({
    ...p, necessidades: p.necessidades.includes(id) ? p.necessidades.filter((x) => x !== id) : [...p.necessidades, id],
  });
  const concluir = () => { acoes.salvarPerfil(p); ir('/catalogo'); };
  const podeSeguir = [p.quem, true, true][passo];

  return (
    <section className="secao gaveta estreita">
      <p className="rotulo mono">Perfil de condução · passo {passo + 1} de 3</p>
      <div className="progresso" aria-hidden="true"><span style={{ width: `${((passo + 1) / 3) * 100}%` }} /></div>

      {passo === 0 && (
        <fieldset className="pergunta">
          <legend><h1>Quem vai dirigir o carro?</h1></legend>
          <p className="secao-linha">Desde 2020 a isenção também vale para a pessoa com deficiência que não dirige — o carro é conduzido por alguém a serviço dela.</p>
          <div className="opcoes-2">
            {[
              { id: 'eu', t: 'Eu mesmo', d: 'Preciso de comandos adaptados para dirigir', i: 'volante' },
              { id: 'outro', t: 'Outra pessoa', d: 'Sou passageiro; preciso de acesso e espaço', i: 'cadeira' },
            ].map((o) => (
              <label key={o.id} className={'opcao' + (p.quem === o.id ? ' marcada' : '')}>
                <input type="radio" name="quem" checked={p.quem === o.id} onChange={() => setP({ ...p, quem: o.id })} />
                <Icone nome={o.i} tam={28} />
                <b>{o.t}</b><span>{o.d}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {passo === 1 && (
        <fieldset className="pergunta">
          <legend><h1>{p.quem === 'outro' ? 'O que facilita o seu acesso?' : 'O que muda quando você dirige?'}</h1></legend>
          <p className="secao-linha">Marque tudo o que se aplica. Não precisa saber o nome da adaptação — a gente traduz.</p>
          <div className="opcoes-lista">
            {opcoes.map((n) => (
              <label key={n.id} className={'opcao-linha' + (p.necessidades.includes(n.id) ? ' marcada' : '')}>
                <input type="checkbox" checked={p.necessidades.includes(n.id)} onChange={() => alternar(n.id)} />
                <span className="caixa" aria-hidden="true"><Icone nome="check" tam={14} /></span>
                <span><b>{n.titulo}</b><small>{n.detalhe}</small></span>
                <span className="opcao-traduz mono">→ {n.pede.map((a) => ADAPTACOES[a].curto).join(' + ')}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {passo === 2 && (
        <fieldset className="pergunta">
          <legend><h1>Até quanto você quer pagar?</h1></legend>
          <p className="secao-linha">Os tetos da isenção estão marcados na régua. Acima de {moeda(REGRAS.icms.teto)} a isenção de ICMS some inteira — não é proporcional.</p>
          <output className="preco-grande mono">{moeda(p.precoMax)}</output>
          <div className="regua">
            <input type="range" min={50000} max={230000} step={1000} value={p.precoMax}
                   aria-label="Preço máximo" onChange={(e) => setP({ ...p, precoMax: +e.target.value })} />
            <span className="marco" style={{ left: `${((REGRAS.icms.teto - 50000) / 180000) * 100}%`, '--p': (REGRAS.icms.teto - 50000) / 180000 }}>ICMS</span>
            <span className="marco" style={{ left: `${((REGRAS.ipi.teto - 50000) / 180000) * 100}%`, '--p': (REGRAS.ipi.teto - 50000) / 180000 }}>IPI</span>
          </div>
          <div className="resumo-perfil">
            <p className="rotulo mono">Vamos procurar carros com</p>
            {exige.length ? (
              <ul className="chips">{exige.map((a) => <li key={a} className="chip chip-casa">{ADAPTACOES[a].nome}</li>)}</ul>
            ) : <p>Nenhuma adaptação específica — mostraremos todo o catálogo.</p>}
          </div>
        </fieldset>
      )}

      <div className="assistente-pe">
        {passo > 0 ? <button className="btn btn-fantasma" onClick={() => setPasso(passo - 1)}><Icone nome="voltar" /> Voltar</button> : <span />}
        {passo < 2
          ? <button className="btn btn-primario" disabled={!podeSeguir} onClick={() => setPasso(passo + 1)}>Continuar <Icone nome="seta" /></button>
          : <button className="btn btn-primario" onClick={concluir}>Ver carros compatíveis <Icone nome="seta" /></button>}
      </div>
      {salvo && <p className="nota-baixa"><button className="link" onClick={() => { acoes.salvarPerfil(null); ir('/'); }}>Apagar meu perfil</button></p>}
    </section>
  );
}
