import { useEffect, useState } from 'react';
import Icone from './components/Icone';
import { MarcaCompleta } from './components/Marca';
import { useRota } from './lib/rota';
import { useEstado } from './lib/estado';
import Inicio from './paginas/Inicio';
import Perfil from './paginas/Perfil';
import Catalogo from './paginas/Catalogo';
import Veiculo from './paginas/Veiculo';
import Comparar from './paginas/Comparar';
import Isencoes from './paginas/Isencoes';
import Adaptacoes from './paginas/Adaptacoes';
import Oficinas from './paginas/Oficinas';
import Anunciar from './paginas/Anunciar';
import Conta from './paginas/Conta';
import Entrar from './paginas/Entrar';

const NAV = [
  ['catalogo', 'Comprar'], ['adaptacoes', 'Adaptações'], ['isencoes', 'Isenções'],
  ['oficinas', 'Oficinas'], ['anunciar', 'Anunciar'],
];

export default function App() {
  const { partes, params, caminho } = useRota();
  const conta = useEstado((s) => s.conta);
  const nCmp = useEstado((s) => s.comparar.length);
  const nFav = useEstado((s) => s.favoritos.length);
  const [menu, setMenu] = useState(false);
  const pag = partes[0] || '';

  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [caminho]);

  let tela;
  switch (pag) {
    case '': tela = <Inicio />; break;
    case 'perfil': tela = <Perfil />; break;
    case 'catalogo': tela = <Catalogo key={params.toString()} params={params} />; break;
    case 'veiculo': tela = <Veiculo id={partes[1]} />; break;
    case 'comparar': tela = <Comparar />; break;
    case 'isencoes': tela = <Isencoes key={params.toString()} params={params} />; break;
    case 'adaptacoes': tela = <Adaptacoes />; break;
    case 'oficinas': tela = <Oficinas />; break;
    case 'anunciar': tela = <Anunciar />; break;
    case 'conta': tela = <Conta />; break;
    case 'entrar': tela = <Entrar params={params} />; break;
    default: tela = <section className="secao gaveta vazio"><h1>Página não encontrada</h1><a className="btn btn-primario" href="#/">Início</a></section>;
  }

  return (
    <>
      <a href="#conteudo" className="pular" onClick={(e) => { e.preventDefault(); document.getElementById('conteudo')?.focus(); }}>Pular para o conteúdo</a>
      <header className="topo">
        <div className="gaveta topo-linha">
          <a href="#/" aria-label="PCD Motors, início"><MarcaCompleta /></a>
          <nav className={'nav' + (menu ? ' aberta' : '')} aria-label="Principal">
            {NAV.map(([k, n]) => <a key={k} href={'#/' + k} aria-current={pag === k ? 'page' : undefined}>{n}</a>)}
          </nav>
          <div className="topo-acoes">
            <a href="#/comparar" className="btn-icone com-num" aria-label={`Comparar (${nCmp})`}>
              <Icone nome="balanca" />{nCmp > 0 && <span className="num-bolha">{nCmp}</span>}
            </a>
            <a href={conta ? '#/conta' : '#/entrar'} className="btn btn-escuro">
              <Icone nome="usuario" tam={16} /> {conta ? conta.nome.split(' ')[0] : 'Entrar'}
              {conta && nFav > 0 && <span className="num-bolha claro">{nFav}</span>}
            </a>
            <button className="btn-icone so-movel" aria-expanded={menu} aria-label="Menu" onClick={() => setMenu(!menu)}><Icone nome={menu ? 'x' : 'menu'} /></button>
          </div>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>{tela}</main>

      {nCmp > 0 && pag !== 'comparar' && (
        <a href="#/comparar" className="barra-cmp"><Icone nome="balanca" /> Comparar {nCmp} {nCmp === 1 ? 'veículo' : 'veículos'} <Icone nome="seta" tam={16} /></a>
      )}

      <footer className="rodape">
        <div className="gaveta rodape-grade">
          <div>
            <MarcaCompleta />
            <p>Marketplace de veículos já adaptados para pessoas com deficiência.</p>
            <p className="mono pequeno">Beta V2 · Projeto Integrador I · Itapetininga/SP</p>
          </div>
          <div>
            <p className="pequeno">Kayke Müller Diniz · Gabriel Kazuo Seckler · Cibele Santiago Soares</p>
            <p className="pequeno">Catálogo e oficinas fictícios. Nenhum dado é enviado a servidor. Logos: car-logos-dataset (MIT).</p>
          </div>
        </div>
      </footer>
    </>
  );
}
