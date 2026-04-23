import { useState } from "react";
import { useAuth } from "../../auth";
import { Eye, EyeOff, Check } from "lucide-react";

export default function Profile() {
  const { user, update } = useAuth();
  const [form, setForm] = useState({ name: user!.name, email: user!.email, role: user!.role, company: user!.company });
  const [saved, setSaved] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    update(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.next.length < 8) return setPwdMsg({ ok: false, text: "Senha deve ter no mínimo 8 caracteres." });
    if (pwd.next !== pwd.confirm) return setPwdMsg({ ok: false, text: "As senhas não coincidem." });
    setPwdMsg({ ok: true, text: "Senha alterada com sucesso." });
    setPwd({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-white tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 600 }}>Perfil</h1>
      <p className="text-sm text-slate-400 mb-8">Gerencie suas informações pessoais e credenciais.</p>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl text-[#0F172A] shadow-[0_0_24px_rgba(34,211,238,0.4)]" style={{ background: `linear-gradient(135deg, ${user!.avatarColor}, #6366F1)`, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
            {user!.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div>
            <p className="text-white" style={{ fontWeight: 500 }}>{user!.name}</p>
            <p className="text-sm text-slate-400">{user!.role} · {user!.company}</p>
            <button className="mt-2 text-xs text-[#67E8F9] hover:text-[#22D3EE]">Alterar foto</button>
          </div>
        </div>

        <form onSubmit={save} className="grid md:grid-cols-2 gap-4">
          <Field label="Nome completo"><TxtInput value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Email"><TxtInput type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Cargo"><TxtInput value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></Field>
          <Field label="Empresa"><TxtInput value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></Field>

          <div className="md:col-span-2 flex items-center justify-between pt-2">
            {saved ? (
              <span className="text-sm text-[#10B981] flex items-center gap-2"><Check className="w-4 h-4" /> Alterações salvas</span>
            ) : <span />}
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_24px_rgba(34,211,238,0.35)]" style={{ fontWeight: 600 }}>Salvar alterações</button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
        <h2 className="text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Alterar senha</h2>
        <p className="text-sm text-slate-400 mb-5">Use uma senha forte com 8+ caracteres, incluindo números e símbolos.</p>

        <form onSubmit={changePwd} className="space-y-4 max-w-md">
          <Field label="Senha atual">
            <div className="relative">
              <TxtInput type={show ? "text" : "password"} value={pwd.current} onChange={e => setPwd({ ...pwd, current: e.target.value })} />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>
          <Field label="Nova senha"><TxtInput type={show ? "text" : "password"} value={pwd.next} onChange={e => setPwd({ ...pwd, next: e.target.value })} /></Field>
          <Field label="Confirmar nova senha"><TxtInput type={show ? "text" : "password"} value={pwd.confirm} onChange={e => setPwd({ ...pwd, confirm: e.target.value })} /></Field>

          {pwdMsg && (
            <p className={`text-sm px-3 py-2 rounded-lg border ${pwdMsg.ok ? "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20" : "text-red-400 bg-red-500/10 border-red-500/20"}`}>
              {pwdMsg.text}
            </p>
          )}

          <button type="submit" className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10">Atualizar senha</button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-slate-400 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
function TxtInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)] transition-all" />;
}
