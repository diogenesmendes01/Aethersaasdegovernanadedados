import { useState } from "react";
import { Link } from "react-router";
import { AuthShell, Field, Input, PrimaryButton } from "../components/AuthShell";
import { Mail } from "lucide-react";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthShell title="Verifique seu email" subtitle={`Enviamos instruções para ${email}.`}
        footer={<Link to="/login" className="text-[#67E8F9] hover:text-[#22D3EE]">Voltar para login</Link>}>
        <div className="flex flex-col items-center text-center py-8 px-4 rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.5)]">
            <Mail className="w-6 h-6 text-[#0F172A]" />
          </div>
          <p className="mt-4 text-white" style={{ fontWeight: 500 }}>Link de recuperação enviado</p>
          <p className="mt-1 text-sm text-slate-400">O link expira em 30 minutos. Verifique sua caixa de entrada e spam.</p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Enviaremos um link seguro para redefinir sua senha."
      footer={<Link to="/login" className="text-[#67E8F9] hover:text-[#22D3EE]">Voltar para login</Link>}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email cadastrado">
          <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@empresa.com" />
        </Field>
        <PrimaryButton type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar link de recuperação"}</PrimaryButton>
      </form>
    </AuthShell>
  );
}
