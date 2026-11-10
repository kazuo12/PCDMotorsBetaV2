import { useState } from 'react';
import Icone from '../components/Icone';
import { MarcaCompleta } from '../components/Marca';
import { acoes } from '../lib/estado';
import { ir } from '../lib/rota';

// RF17 em protótipo: a conta é local, sem senha verificada em servidor.
export default function Entrar({ params }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const volta = params.get('volta') || '/conta';
  const ok = nome.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
  const enviar = (e) => { e.preventDefault(); if (!ok) return; acoes.entrar({ nome: nome.trim(), email: email.trim() }); ir(volta); };

  return (
    <section className="secao gaveta estreita">
      <div className="entrar">
        <MarcaCompleta tam={30} />
        <h1 className="h1-pagina">Entrar ou criar conta</h1>
        <p className="secao-linha">Para salvar anúncios, receber alertas e falar com vendedores.</p>
        <form onSubmit={enviar} className="form">
          <label>Nome<input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" required /></label>
          <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label>
          <button className="btn btn-primario largo" disabled={!ok}>Continuar <Icone nome="seta" /></button>
        </form>
        <p className="aviso"><Icone nome="info" tam={15} /> Protótipo: não há senha nem servidor. Nome e e-mail ficam só neste navegador e nunca são enviados.</p>
      </div>
    </section>
  );
}
