import Icone from '../components/Icone';
import { ADAPTACOES, ORDEM_ADAPTACOES } from '../data/adaptacoes';
import { useEstado } from '../lib/estado';
import { todosVeiculos } from '../lib/compat';

// RF15 · RN05.
export default function Adaptacoes() {
  const anuncios = useEstado((s) => s.anuncios);
  const todos = todosVeiculos(anuncios);
  const grupo = (g) => ORDEM_ADAPTACOES.filter((a) => ADAPTACOES[a].grupo === g);

  const Lista = ({ ids, ini }) => (
    <div className="glossario">
      {ids.map((a, i) => {
        const n = todos.filter((v) => v.adaptacoes.includes(a)).length;
        return (
          <article key={a}>
            <span className="mono num">{String(ini + i + 1).padStart(2, '0')}</span>
            <h3>{ADAPTACOES[a].nome}</h3>
            <p>{ADAPTACOES[a].texto}</p>
            <a href={'#/catalogo?a=' + a} className="link-seta">{n} {n === 1 ? 'anúncio' : 'anúncios'} <Icone nome="seta" tam={15} /></a>
          </article>
        );
      })}
    </div>
  );

  return (
    <section className="secao gaveta">
      <p className="rotulo mono">Glossário</p>
      <h1 className="h1-pagina">O que cada adaptação resolve</h1>
      <p className="secao-linha">Comprar adaptado exige um vocabulário que ninguém ensina. Estes são os sete itens que aparecem nos filtros.</p>

      <h2 className="sub">Para dirigir</h2>
      <Lista ids={grupo('conducao')} ini={0} />
      <h2 className="sub">Para entrar e levar a cadeira</h2>
      <Lista ids={grupo('acesso')} ini={grupo('conducao').length} />

      <div className="legal">
        <Icone nome="escudo" tam={28} />
        <div>
          <h2>O que torna uma adaptação legal</h2>
          <ol>
            <li>Instalada em <b>oficina credenciada</b>, com nota fiscal do serviço;</li>
            <li>Aprovada em <b>vistoria</b>, que gera o laudo — e o laudo tem validade;</li>
            <li>Registrada no campo de <b>observações do CRLV</b>.</li>
          </ol>
          <p>Faltou um desses passos, a adaptação não vale perante a lei, a transferência trava e a isenção corre risco.</p>
          <a href="#/oficinas" className="link-seta">Encontrar oficina credenciada <Icone nome="seta" tam={16} /></a>
        </div>
      </div>
    </section>
  );
}
