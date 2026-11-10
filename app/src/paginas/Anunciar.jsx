import { useState } from 'react';
import Icone from '../components/Icone';
import Cartao from '../components/Cartao';
import { ADAPTACOES, ORDEM_ADAPTACOES } from '../data/adaptacoes';
import { CARROCERIAS, NOMES_MARCA } from '../data/veiculos';
import { MARCAS } from '../data/marcas';
import { acoes, useEstado } from '../lib/estado';
import { ir } from '../lib/rota';

// RF21 (fase futura na V1) — o vendedor descreve a adaptação com o mesmo
// vocabulário dos filtros, então o anúncio já nasce encontrável.
const VAZIO = {
  marca: 'fiat', modelo: '', versao: '', ano: 2023, anoFab: 2023, preco: 80000, km: 20000,
  carroceria: 'Hatch', cidade: 'Itapetininga', uf: 'SP', adaptacoes: ['automatico'],
  laudoValidade: '', isencoes: [], compraOriginal: '', destaque: '',
};

export default function Anunciar() {
  const conta = useEstado((s) => s.conta);
  const [a, setA] = useState(VAZIO);
  const [passo, setPasso] = useState(0);
  const set = (k, v) => setA((x) => ({ ...x, [k]: v }));
  const alt = (k, v) => setA((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v] }));

  if (!conta) return (
    <section className="secao gaveta estreita vazio">
      <Icone nome="usuario" tam={36} />
      <h1 className="h1-pagina">Entre para anunciar</h1>
      <p>O anúncio fica ligado à sua conta para você editar e responder interessados.</p>
      <a className="btn btn-primario" href="#/entrar?volta=/anunciar">Entrar ou criar conta</a>
    </section>
  );

  const previa = {
    ...a, id: 'previa', meu: true, verificado: false, nota: 5,
    modelo: a.modelo || 'Seu carro', versao: a.versao || '—', logo: MARCAS[a.marca],
    laudoValidade: a.laudoValidade || null, cambio: a.adaptacoes.includes('automatico') ? 'Automático' : 'Manual',
    combustivel: 'Flex', cor: '—', vendedor: 'Particular', garantia: '—', foto: null,
  };
  const valido = [a.modelo.trim() && a.preco > 0, a.adaptacoes.length > 0 && a.laudoValidade, true][passo];
  const publicar = () => { const { id, ...resto } = previa; acoes.publicarAnuncio(resto); ir('/conta'); };

  return (
    <section className="secao gaveta">
      <p className="rotulo mono">Anunciar · passo {passo + 1} de 3</p>
      <h1 className="h1-pagina">{['O carro', 'A adaptação', 'Revisar e publicar'][passo]}</h1>

      <div className="anunciar">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {passo === 0 && (
            <>
              <div className="duas">
                <label>Marca<select value={a.marca} onChange={(e) => set('marca', e.target.value)}>
                  {Object.entries(NOMES_MARCA).map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select></label>
                <label>Modelo<input value={a.modelo} onChange={(e) => set('modelo', e.target.value)} placeholder="Ex.: Onix Plus LTZ" required /></label>
              </div>
              <div className="duas">
                <label>Versão<input value={a.versao} onChange={(e) => set('versao', e.target.value)} placeholder="Ex.: 1.0 Turbo AT" /></label>
                <label>Carroceria<select value={a.carroceria} onChange={(e) => set('carroceria', e.target.value)}>
                  {CARROCERIAS.map((c) => <option key={c}>{c}</option>)}</select></label>
              </div>
              <div className="tres-campos">
                <label>Ano<input type="number" value={a.ano} onChange={(e) => set('ano', +e.target.value)} /></label>
                <label>Quilometragem<input type="number" value={a.km} onChange={(e) => set('km', +e.target.value)} /></label>
                <label>Preço (R$)<input type="number" value={a.preco} onChange={(e) => set('preco', +e.target.value)} /></label>
              </div>
              <label>Cidade<input value={a.cidade} onChange={(e) => set('cidade', e.target.value)} /></label>
            </>
          )}
          {passo === 1 && (
            <>
              <fieldset>
                <legend>Adaptações instaladas</legend>
                {ORDEM_ADAPTACOES.map((ad) => (
                  <label key={ad} className="check">
                    <input type="checkbox" checked={a.adaptacoes.includes(ad)} onChange={() => alt('adaptacoes', ad)} />
                    <span className="caixa" aria-hidden="true"><Icone nome="check" tam={12} /></span>
                    <span className="check-nome">{ADAPTACOES[ad].nome}</span>
                  </label>
                ))}
              </fieldset>
              <label>Validade do laudo da adaptação<input type="date" value={a.laudoValidade} onChange={(e) => set('laudoValidade', e.target.value)} required /></label>
              <fieldset>
                <legend>Isenções usadas na compra original</legend>
                <div className="pilulas">
                  {['IPI', 'ICMS', 'IPVA'].map((i) => (
                    <button type="button" key={i} className={'pilula' + (a.isencoes.includes(i) ? ' ativa' : '')} aria-pressed={a.isencoes.includes(i)} onClick={() => alt('isencoes', i)}>{i}</button>
                  ))}
                </div>
              </fieldset>
              {a.isencoes.length > 0 && <label>Data da compra com isenção<input type="date" value={a.compraOriginal} onChange={(e) => set('compraOriginal', e.target.value)} /></label>}
            </>
          )}
          {passo === 2 && (
            <>
              <label>Um detalhe que só quem usa sabe<textarea rows={3} value={a.destaque} onChange={(e) => set('destaque', e.target.value)} placeholder="Ex.: pedal esquerdo removível — outra pessoa dirige sem adaptar nada." /></label>
              <p className="aviso"><Icone nome="escudo" tam={15} /> Depois de publicar, a equipe pode conferir laudo e CRLV para aplicar o selo <b>Verificada</b>. No protótipo o anúncio fica salvo só neste navegador.</p>
            </>
          )}
          <div className="assistente-pe">
            {passo > 0 ? <button type="button" className="btn btn-fantasma" onClick={() => setPasso(passo - 1)}><Icone nome="voltar" /> Voltar</button> : <span />}
            {passo < 2
              ? <button type="button" className="btn btn-primario" disabled={!valido} onClick={() => setPasso(passo + 1)}>Continuar <Icone nome="seta" /></button>
              : <button type="button" className="btn btn-primario" onClick={publicar}>Publicar anúncio <Icone nome="check" /></button>}
          </div>
        </form>

        <aside className="previa" aria-label="Prévia do anúncio">
          <p className="rotulo mono">Como vai aparecer</p>
          <div inert=""><Cartao v={previa} /></div>
        </aside>
      </div>
    </section>
  );
}
