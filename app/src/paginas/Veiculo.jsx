import { useState } from 'react';
import Icone from '../components/Icone';
import { SeloLaudo, SeloVerificado, Compat, estadoLaudo } from '../components/Selos';
import { ADAPTACOES } from '../data/adaptacoes';
import { NOMES_MARCA, HOJE } from '../data/veiculos';
import { OFICINAS } from '../data/oficinas';
import { calcularIsencao, fimCarencia, REGRAS } from '../data/regras';
import { acoes, useEstado } from '../lib/estado';
import { compat, todosVeiculos } from '../lib/compat';
import { moeda, numero } from '../lib/util';

export default function Veiculo({ id }) {
  const anuncios = useEstado((s) => s.anuncios);
  const perfil = useEstado((s) => s.perfil);
  const conta = useEstado((s) => s.conta);
  const fav = useEstado((s) => s.favoritos.includes(id));
  const cmp = useEstado((s) => s.comparar.includes(id));
  const mensagens = useEstado((s) => s.mensagens);
  const enviadas = mensagens.filter((m) => m.veiculo === id);
  const [texto, setTexto] = useState('');

  const v = todosVeiculos(anuncios).find((x) => x.id === id);
  if (!v) return <section className="secao gaveta vazio"><h1>Anúncio não encontrado</h1><a className="btn btn-primario" href="#/catalogo">Voltar ao catálogo</a></section>;

  const c = compat(v, perfil);
  const laudo = estadoLaudo(v);
  const isen = calcularIsencao(v.preco);
  const carencia = fimCarencia(v);
  const carenciaAtiva = carencia && carencia > HOJE;
  const oficinas = c?.falta.length ? OFICINAS.filter((o) => c.falta.some((a) => o.servicos.includes(a))) : [];

  const enviar = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    acoes.enviarMensagem({ veiculo: v.id, titulo: `${v.modelo} ${v.ano}`, texto: texto.trim() });
    setTexto('');
  };

  return (
    <section className="secao gaveta">
      <a href="#/catalogo" className="link-voltar"><Icone nome="voltar" tam={16} /> Catálogo</a>

      <div className="ficha">
        <div className="ficha-midia">
          {v.foto ? <img src={v.foto} alt={`${v.modelo}, foto ${v.fotoReal ? 'do modelo' : 'ilustrativa'}`} /> : <div className="sem-foto grande"><Icone nome="volante" tam={64} /></div>}
          {!v.fotoReal && <p className="legenda">Foto ilustrativa — não é o veículo anunciado.</p>}
        </div>

        <div className="ficha-resumo">
          <p className="mono ficha-marca">{NOMES_MARCA[v.marca] || v.marca}</p>
          <h1>{v.modelo}</h1>
          <p className="mono ficha-versao">{v.versao} · {v.anoFab}/{v.ano} · {numero(v.km)} km · {v.cidade}/{v.uf}</p>
          <p className="ficha-preco mono">{moeda(v.preco)}</p>
          <div className="cartao-selos"><SeloLaudo v={v} completo /><SeloVerificado v={v} /></div>

          {c && (
            <div className={'ficha-compat' + (c.pct === 100 ? ' total' : '')}>
              <Compat c={c} grande />
              <div>
                <b>{c.pct === 100 ? 'Tem tudo o que o seu perfil pede' : `Falta ${c.falta.map((a) => ADAPTACOES[a].curto).join(', ')}`}</b>
                <p>{c.pct === 100 ? 'Nenhuma adaptação extra necessária.' : 'Dá para instalar depois numa oficina credenciada — veja abaixo.'}</p>
              </div>
            </div>
          )}

          <div className="ficha-botoes">
            <a href="#contato" className="btn btn-primario"><Icone nome="chat" /> Falar com o vendedor</a>
            <button className={'btn btn-fantasma' + (fav ? ' ativo' : '')} aria-pressed={fav} onClick={() => acoes.alternarFavorito(v.id)}>
              <Icone nome="coracao" cheio={fav} /> {fav ? 'Salvo' : 'Salvar'}
            </button>
            <button className={'btn btn-fantasma' + (cmp ? ' ativo' : '')} aria-pressed={cmp} onClick={() => acoes.alternarComparar(v.id)}>
              <Icone nome="balanca" /> {cmp ? 'Comparando' : 'Comparar'}
            </button>
          </div>
          {v.destaque && <p className="ficha-destaque">“{v.destaque}”</p>}
        </div>
      </div>

      <div className="ficha-blocos">
        <div className="bloco-ficha largo">
          <h2>Adaptações instaladas</h2>
          <ul className="lista-adapt">
            {v.adaptacoes.map((a) => (
              <li key={a} className={c?.tem.includes(a) ? 'casa' : ''}>
                <b>{ADAPTACOES[a].nome}{c?.tem.includes(a) && <span className="mini-tag">seu perfil pede</span>}</b>
                <p>{ADAPTACOES[a].texto}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bloco-ficha">
          <h2>Documentação</h2>
          <dl className="dl">
            <div><dt>Laudo da adaptação</dt><dd className={'nivel-' + laudo.nivel}>{laudo.nivel === 'vencido' ? `Vencido em ${laudo.data}` : `Válido até ${laudo.data}`}</dd></div>
            <div><dt>Registro no CRLV</dt><dd>{v.verificado ? 'Conferido pela equipe' : 'Declarado pelo vendedor'}</dd></div>
            <div><dt>Isenções na compra original</dt><dd>{v.isencoes.length ? v.isencoes.join(' · ') : 'Nenhuma'}</dd></div>
            {carencia && <div><dt>Fim da carência de revenda</dt><dd className={carenciaAtiva ? 'nivel-vencendo' : ''}>{carencia.toLocaleDateString('pt-BR')}</dd></div>}
            <div><dt>Garantia</dt><dd>{v.garantia}</dd></div>
          </dl>
          {laudo.nivel === 'vencido' && <p className="aviso alerta"><Icone nome="alerta" tam={15} /> Com laudo vencido a transferência fica impedida até a revalidação. Combine com o vendedor quem paga a nova vistoria.</p>}
          {carenciaAtiva && <p className="aviso"><Icone nome="info" tam={15} /> Ainda dentro da carência: vender agora obriga o dono atual a devolver o imposto isentado. Peça a comprovação.</p>}
        </div>

        <div className="bloco-ficha">
          <h2>Se você comprasse este modelo novo</h2>
          <dl className="dl">
            <div><dt>IPI ({(REGRAS.ipi.aliquota * 100).toFixed(2).replace('.', ',')}%)</dt><dd className="mono">{isen.temIpi ? moeda(isen.ipi) : 'acima do teto'}</dd></div>
            <div><dt>ICMS ({REGRAS.icms.aliquota * 100}%)</dt><dd className="mono">{isen.temIcms ? moeda(isen.icms) : 'acima do teto'}</dd></div>
            <div><dt>IPVA por ano</dt><dd className="mono">{moeda(isen.ipva)}</dd></div>
          </dl>
          {isen.faixaArmadilha && <p className="aviso alerta"><Icone nome="alerta" tam={15} /> Faixa entre os tetos: isento de IPI, mas paga ICMS integral.</p>}
          <a href={'#/isencoes?preco=' + v.preco} className="link-seta">Abrir no simulador <Icone nome="seta" tam={16} /></a>
        </div>

        <div className="bloco-ficha">
          <h2>Ficha técnica</h2>
          <dl className="dl">
            {[['Carroceria', v.carroceria], ['Câmbio', v.cambio], ['Combustível', v.combustivel], ['Cor', v.cor], ['Vendedor', v.vendedor]].map(([k, val]) => (
              <div key={k}><dt>{k}</dt><dd>{val}</dd></div>
            ))}
          </dl>
        </div>

        {oficinas.length > 0 && (
          <div className="bloco-ficha largo">
            <h2>Oficinas que instalam o que falta</h2>
            <ul className="oficinas-mini">
              {oficinas.slice(0, 3).map((o) => (
                <li key={o.id}>
                  <b>{o.nome}</b>
                  <span>{o.cidade} · {o.distancia ? `${o.distancia} km` : 'na cidade'} · {o.prazo}</span>
                  {o.credenciada && <span className="selo selo-verificado"><Icone nome="escudo" tam={12} /> Credenciada</span>}
                </li>
              ))}
            </ul>
            <a href="#/oficinas" className="link-seta">Todas as oficinas <Icone nome="seta" tam={16} /></a>
          </div>
        )}

        <div className="bloco-ficha largo" id="contato">
          <h2>Falar com o vendedor</h2>
          {enviadas.length > 0 && (
            <ul className="conversa">
              {[...enviadas].reverse().map((m) => <li key={m.id}><p>{m.texto}</p><time>{new Date(m.quando).toLocaleString('pt-BR')}</time></li>)}
              <li className="sistema">Protótipo: a mensagem fica salva no seu navegador. Na versão com servidor, o vendedor recebe aqui.</li>
            </ul>
          )}
          {conta ? (
            <form onSubmit={enviar} className="form-contato">
              <label className="oculto-visual" htmlFor="msg">Mensagem</label>
              <textarea id="msg" rows={3} value={texto} onChange={(e) => setTexto(e.target.value)}
                        placeholder={`Olá! O ${v.modelo} ainda está disponível? Posso agendar para ver a adaptação funcionando?`} />
              <div className="sugestoes">
                {['O laudo está com o senhor?', 'Aceita vistoria em oficina credenciada?', 'Qual a data da compra com isenção?'].map((s) => (
                  <button type="button" key={s} className="pilula" onClick={() => setTexto(s)}>{s}</button>
                ))}
              </div>
              <button className="btn btn-primario" disabled={!texto.trim()}>Enviar mensagem</button>
            </form>
          ) : (
            <p><a className="btn btn-primario" href={'#/entrar?volta=/veiculo/' + v.id}>Entre para enviar mensagem</a></p>
          )}
        </div>
      </div>
    </section>
  );
}
