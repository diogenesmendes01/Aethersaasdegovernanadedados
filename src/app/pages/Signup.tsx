import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthShell, Field, Input, PrimaryButton } from "../components/AuthShell";
import { useAuth } from "../auth";
import { Check } from "lucide-react";

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const s = strength(form.password);
  const labels = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte"];
  const colors = ["#334155", "#ef4444", "#f59e0b", "#22D3EE", "#10B981"];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!agree) return setError("É necessário aceitar os termos e DPA.");
    if (s < 3) return setError("Senha não atende aos requisitos mínimos.");
    setLoading(true);
    try {
      await signup(form);
      nav("/first-access");
    } catch (err: any) {
      setError(err.message ?? "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Criar sua conta Aether"
      subtitle="Comece com um trial enterprise de 14 dias."
      footer={<>Já tem conta? <Link to="/login" className="text-[#67E8F9] hover:text-[#22D3EE]">Entrar</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nome completo">
          <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ana Ribeiro" />
        </Field>
        <Field label="Email corporativo">
          <Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ana@empresa.com" />
        </Field>
        <Field label="Empresa">
          <Input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Nome da sua empresa" />
        </Field>
        <Field label="Senha">
          <Input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 8 caracteres" />
          <div className="mt-2 flex gap-1">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i < s ? colors[s] : "#1E293B" }} />
            ))}
          </div>
          <p className="mt-1 text-xs" style={{ color: colors[s] }}>{form.password ? labels[s] : "8+ caracteres, maiúscula, número e símbolo"}</p>
        </Field>

        <label className="flex items-start gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5" />
          <span>Li e concordo com os <a href="#" className="text-[#67E8F9]">Termos</a>, <a href="#" className="text-[#67E8F9]">Política de Privacidade</a> e <a href="#" className="text-[#67E8F9]">DPA</a>.</span>
        </label>

        {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

        <PrimaryButton type="submit" disabled={loading}>{loading ? "Criando conta..." : "Criar conta"}</PrimaryButton>

        <div className="flex items-center gap-2 text-xs text-slate-500 justify-center pt-2">
          <Check className="w-3.5 h-3.5 text-[#10B981]" /> Sem cartão · <Check className="w-3.5 h-3.5 text-[#10B981]" /> Dados hospedados no Brasil
        </div>
      </form>
    </AuthShell>
  );
}
