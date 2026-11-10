import Icone from './Icone';
import { SeloLaudo, SeloVerificado, Compat } from './Selos';
import { ADAPTACOES } from '../data/adaptacoes';
import { moeda, numero } from '../lib/util';
import { acoes, useEstado } from '../lib/estado';
import { compat } from '../lib/compat';

export default function Cartao({ v }) {
  const fav = useEstado((s) => s.favoritos.includes(v.id));
  const cmp = useEstado((s) => s.comparar.includes(v.id));
  const perfil = useEstado((s) => s.perfil);
  const c = compat(v, perfil);
  const titulo = `${v.modelo} ${v.ano}`;

  return (
    <article className="cartao">
      <a href={'#/veiculo/' + v.id} className="cartao-link" aria-label={`Ver ${titulo}, ${moeda(v.preco)}`}>
        <div className="cartao-foto">
          {v.foto ? <img src={v.foto} alt="" loading="lazy" /> : <div className="sem-foto"><Icone nome="volante" tam={40} /></div>}
          {v.logo && <img className="cartao-logo" src={v.logo} alt="" />}
          {v.meu && <span className="cartao-meu">Seu anúncio</span>}
        </div>
        <div className="cartao-corpo">
          <div className="cartao-topo">
            <div>
              <h3>{v.modelo}</h3>
              <p className="mono cartao-versao">{v.versao} · {v.ano} · {numero(v.km)} km</p>
            </div>
            <Compat c={c} />
          </div>
          <p className="cartao-preco mono">{moeda(v.preco)}</p>
          <ul className="chips" aria-label="Adaptações instaladas">
            {v.adaptacoes.map((a) => (
              <li key={a} className={'chip' + (c && c.tem.includes(a) ? ' chip-casa' : '')}>{ADAPTACOES[a]?.curto}</li>
            ))}
          </ul>
          <div className="cartao-selos">
            <SeloLaudo v={v} />
            <SeloVerificado v={v} />
          </div>
          <p className="cartao-local"><Icone nome="pino" tam={14} /> {v.cidade}/{v.uf}</p>
        </div>
      </a>
      <div className="cartao-acoes">
        <button className={'btn-icone' + (fav ? ' ativo' : '')} aria-pressed={fav}
                aria-label={fav ? 'Remover dos salvos' : 'Salvar anúncio'} onClick={() => acoes.alternarFavorito(v.id)}>
          <Icone nome="coracao" cheio={fav} />
        </button>
        <button className={'btn-icone' + (cmp ? ' ativo' : '')} aria-pressed={cmp}
                aria-label={cmp ? 'Tirar da comparação' : 'Adicionar à comparação'} onClick={() => acoes.alternarComparar(v.id)}>
          <Icone nome="balanca" />
        </button>
      </div>
    </article>
  );
}
