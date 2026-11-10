import Icone from '../components/Icone';
import Cartao from '../components/Cartao';
import { useEstado } from '../lib/estado';
import { compat, todosVeiculos } from '../lib/compat';
import { ADAPTACOES, adaptacoesDoPerfil } from '../data/adaptacoes';
import { laudoValido } from '../data/veiculos';
import { REGRAS } from '../data/regras';
import { moeda } from '../lib/util';

export default function Inicio() {
  const perfil = useEstado((s) => s.perfil);
  const anuncios = useEstado((s) => s.anuncios);
  const todos = todosVeiculos(anuncios);
  const exige = adaptacoesDoPerfil(perfil);
  const servem = perfil ? todos.filter((v) => compat(v, perfil)?.pct === 100) : [];
  const vitrine = (perfil && servem.length ? servem : todos.filter((v) => v.verificado)).slice(0, 3);
  const comLaudo = todos.filter(laudoValido).length;

  return (
    <>
      <section className="hero">
        <div className="gaveta hero-grade">
          <div>
            <p className="rotulo mono">Marketplace de veículos já adaptados</p>
            <h1>Comece pelo que você precisa para dirigir. <em>Não pela marca.</em></h1>
            <p className="hero-sub">
              Nos classificados comuns, a adaptação é uma frase perdida na descrição.
              Aqui ela é o primeiro filtro — e o laudo e as isenções aparecem antes
              de você perder a viagem.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primario" href="#/perfil">
                {perfil ? 'Ajustar meu perfil' : 'Montar meu perfil de condução'} <Icone nome="seta" />
              </a>
              <a className="btn btn-fantasma" href="#/catalogo">Ver todos os {todos.length} anúncios</a>
            </div>
          </div>

          <aside className="hero-painel" aria-label="Resumo do seu perfil">
            {perfil ? (
              <>
                <p className="rotulo mono">Seu perfil</p>
                <p className="hero-painel-num"><b className="mono">{servem.length}</b> carros têm tudo o que você precisa</p>
                <ul className="chips">
                  {exige.map((a) => <li key={a} className="chip chip-casa">{ADAPTACOES[a].curto}</li>)}
                </ul>
                <a href="#/catalogo" className="link-seta">Ver compatíveis <Icone nome="seta" tam={16} /></a>
              </>
            ) : (
              <>
                <p className="rotulo mono">Em 3 perguntas</p>
                <ol className="passos">
                  <li><b>Quem vai dirigir?</b> Você ou outra pessoa</li>
                  <li><b>O que muda ao dirigir?</b> Em palavras comuns, sem termo técnico</li>
                  <li><b>Até quanto?</b> Já com os tetos da isenção</li>
                </ol>
                <p className="hero-painel-pe">Cada anúncio passa a mostrar quanto ele <b>serve para você</b>.</p>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="faixa-numeros">
        <div className="gaveta numeros">
          <div><b className="mono">{todos.length}</b><span>anúncios adaptados</span></div>
          <div><b className="mono">{comLaudo}</b><span>com laudo em dia</span></div>
          <div><b className="mono">7</b><span>tipos de adaptação no filtro</span></div>
          <div><b className="mono">{moeda(REGRAS.icms.teto / 1000).replace(',00', '')} mil</b><span>teto do ICMS em SP</span></div>
        </div>
      </section>

      <section className="secao gaveta">
        <div className="secao-cab">
          <div>
            <p className="rotulo mono">{perfil && servem.length ? 'Servem para você' : 'Adaptação verificada'}</p>
            <h2>{perfil && servem.length ? 'Compatíveis com o seu perfil' : 'Destaques conferidos pela equipe'}</h2>
          </div>
          <a href="#/catalogo" className="link-seta">Catálogo completo <Icone nome="seta" tam={16} /></a>
        </div>
        <div className="grade-cartoes">{vitrine.map((v) => <Cartao key={v.id} v={v} />)}</div>
      </section>

      <section className="secao gaveta">
        <p className="rotulo mono">Por que é diferente</p>
        <h2 className="h2-largo">Três perguntas que o classificado comum não responde</h2>
        <div className="tres">
          <a href="#/adaptacoes" className="bloco">
            <Icone nome="volante" tam={28} />
            <h3>Esse carro serve para mim?</h3>
            <p>Sete adaptações com nome padronizado e explicação em português claro. Filtre por elas — ou deixe o perfil filtrar por você.</p>
          </a>
          <a href="#/catalogo?laudo=1" className="bloco">
            <Icone nome="escudo" tam={28} />
            <h3>A documentação está em dia?</h3>
            <p>Cada anúncio mostra a validade do laudo, avisa quando está perto de vencer e quando a carência de revenda termina.</p>
          </a>
          <a href="#/isencoes" className="bloco">
            <Icone nome="calendario" tam={28} />
            <h3>Quanto eu economizo?</h3>
            <p>Simulador com os tetos de IPI e ICMS — incluindo a faixa entre R$ 120 e 200 mil, onde muita gente erra a conta.</p>
          </a>
        </div>
      </section>

      <section className="secao gaveta">
        <div className="chamada">
          <div>
            <h2>Tem um carro adaptado para vender?</h2>
            <p>Anuncie para quem procura exatamente essa adaptação, em vez do público geral que não a valoriza.</p>
          </div>
          <a className="btn btn-claro" href="#/anunciar">Anunciar meu carro <Icone nome="seta" /></a>
        </div>
      </section>
    </>
  );
}
