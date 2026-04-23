import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthShell, Field, Input, PrimaryButton } from "../components/AuthShell";
import { useAuth } from "../auth";
import { Eye, EyeOff, Github } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      nav("/app");
    } catch (err: any) {
      setError(err.message ?? "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Entrar na sua conta"
      subtitle="Acesse sua plataforma de governança de dados."
      footer={<>Não tem conta? <Link to="/signup" className="text-[#67E8F9] hover:text-[#22D3EE]">Começar agora</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email corporativo">
          <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@empresa.com" autoComplete="email" />
        </Field>
        <Field label="Senha">
          <div className="relative">
            <Input type={show ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input type="checkbox" className="rounded border-white/20 bg-white/5" /> Lembrar-me
          </label>
          <Link to="/forgot" className="text-[#67E8F9] hover:text-[#22D3EE]">Esqueceu a senha?</Link>
        </div>

        {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

        <PrimaryButton type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</PrimaryButton>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
          <div className="relative flex justify-center"><span className="px-3 text-xs text-slate-500 bg-[#0F172A]">ou continuar com</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm flex items-center justify-center gap-2 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#fff" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12s3.36-7.27 7.19-7.27c2.95 0 4.69 1.88 4.69 1.88L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12s4.39 10 10.22 10c5.1 0 8.75-3.49 8.75-8.66 0-1.09-.15-1.73-.15-1.73z"/></svg>
            Google
          </button>
          <button type="button" className="py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm flex items-center justify-center gap-2 transition-colors">
            <Github className="w-4 h-4" /> SSO
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
