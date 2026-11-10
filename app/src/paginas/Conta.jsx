import Icone from '../components/Icone';
import Cartao from '../components/Cartao';
import { ADAPTACOES, adaptacoesDoPerfil } from '../data/adaptacoes';
import { acoes, useEstado } from '../lib/estado';
import { casaAlerta, todosVeiculos } from '../lib/compat';
import { moeda } from '../lib/util';
import { ir } from '../lib/rota';

// RF17 · RF18 · RF19 · RF20 · RF21 reunidos num só lugar.
export default function Conta() {
  const s = useEstado();
  if (!s.conta) { ir('/entrar?volta=/conta'); return null; }
  const todos = todosVeiculos(s.anuncios);
  const salvos = todos.filter((v) => s.favoritos.includes(v.id));

  return (
    <section className="secao gaveta">
      <div className="secao-cab">
        <div><p className="rotulo mono">Minha conta</p><h1 className="h1-pagina">Olá, {s.conta.nome.split(' ')[0]}</h1></div>
        <button className="btn btn-fantasma" onClick={() => { acoes.sair(); ir('/'); }}><Icone nome="sair" /> Sair</button>
      </div>

      <div className="conta-grade">
        <div className="bloco-ficha">
          <h2><Icone nome="usuario" /> Perfil de condução</h2>
          {s.perfil ? (
            <>
              <p>{s.perfil.quem === 'outro' ? 'Outra pessoa dirige' : 'Você dirige'} · até {moeda(s.perfil.precoMax)}</p>
              <ul className="chips">{adaptacoesDoPerfil(s.perfil).map((a) => <li key={a} className="chip chip-casa">{ADAPTACOES[a].curto}</li>)}</ul>
            </>
          ) : <p>Ainda não montado.</p>}
          <a href="#/perfil" className="link-seta">{s.perfil ? 'Ajustar' : 'Montar agora'} <Icone nome="seta" tam={15} /></a>
        </div>

        <div className="bloco-ficha">
          <h2><Icone nome="sino" /> Alertas</h2>
          {s.alertas.length ? (
            <ul className="alertas">
              {s.alertas.map((al) => {
                const n = todos.filter((v) => casaAlerta(v, al)).length;
                return (
                  <li key={al.id}>
                    <div>
                      <b>{al.adaptacoes.length ? al.adaptacoes.map((a) => ADAPTACOES[a].curto).join(' + ') : 'Qualquer adaptação'}</b>
                      <span>até {moeda(al.precoMax)} · <b className="mono">{n}</b> {n === 1 ? 'anúncio casa' : 'anúncios casam'} hoje</span>
                    </div>
                    <button className="btn-icone" aria-label="Apagar alerta" onClick={() => acoes.removerAlerta(al.id)}><Icone nome="lixo" tam={16} /></button>
                  </li>
                );
              })}
            </ul>
          ) : <p>Nenhum alerta. Crie um no fim do <a href="#/catalogo">catálogo</a>.</p>}
        </div>

        <div className="bloco-ficha">
          <h2><Icone nome="chat" /> Mensagens enviadas</h2>
          {s.mensagens.length ? (
            <ul className="msgs">
              {s.mensagens.slice(0, 5).map((m) => <li key={m.id}><a href={'#/veiculo/' + m.veiculo}>{m.titulo}</a><p>{m.texto}</p></li>)}
            </ul>
          ) : <p>Nenhuma conversa ainda.</p>}
        </div>
      </div>

      <h2 className="sub">Salvos ({salvos.length})</h2>
      {salvos.length ? <div className="grade-cartoes">{salvos.map((v) => <Cartao key={v.id} v={v} />)}</div>
        : <p className="nota-baixa">Toque no coração de um anúncio para guardá-lo aqui.</p>}

      <div className="secao-cab sub-cab">
        <h2 className="sub">Meus anúncios ({s.anuncios.length})</h2>
        <a href="#/anunciar" className="btn btn-fantasma"><Icone nome="mais" /> Novo anúncio</a>
      </div>
      {s.anuncios.length ? (
        <div className="grade-cartoes">
          {s.anuncios.map((v) => (
            <div key={v.id} className="meu-wrap">
              <Cartao v={v} />
              <button className="link perigo" onClick={() => acoes.removerAnuncio(v.id)}><Icone nome="lixo" tam={14} /> Remover anúncio</button>
            </div>
          ))}
        </div>
      ) : <p className="nota-baixa">Você ainda não anunciou nenhum carro.</p>}

      <p className="nota-baixa privacidade">
        <Icone nome="escudo" tam={14} /> Tudo nesta página fica guardado só neste navegador — nada é enviado a servidor.{' '}
        <button className="link" onClick={() => { if (confirm('Apagar todos os seus dados deste navegador?')) { acoes.zerar(); ir('/'); } }}>Apagar meus dados</button>
      </p>
    </section>
  );
}
