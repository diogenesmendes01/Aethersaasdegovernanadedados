import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { AuthShell, Field, Input, PrimaryButton } from "../components/AuthShell";
import { useAuth } from "../auth";
import { Check, Shield, Database, Users } from "lucide-react";

const steps = ["Perfil", "Empresa", "Objetivos", "Pronto"];

export default function FirstAccess() {
  const { user, completeFirstAccess } = useAuth();
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("Data Protection Officer");
  const [industry, setIndustry] = useState("Financeiro");
  const [size, setSize] = useState("501-5000");
  const [goals, setGoals] = useState<string[]>(["LGPD Automation"]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.firstAccessDone) return <Navigate to="/app" replace />;

  const toggleGoal = (g: string) => setGoals(gs => gs.includes(g) ? gs.filter(x => x !== g) : [...gs, g]);

  const next = () => {
    if (step < 3) setStep(s => s + 1);
    else {
      completeFirstAccess({ role });
      nav("/app");
    }
  };

  return (
    <AuthShell title={`Bem-vindo, ${user.name.split(" ")[0]}`} subtitle="Vamos configurar seu workspace em 4 passos rápidos.">
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              i < step ? "bg-[#10B981] text-[#0F172A]" : i === step ? "bg-gradient-to-br from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_16px_rgba(34,211,238,0.5)]" : "bg-white/5 text-slate-500 border border-white/10"
            }`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? "bg-[#10B981]" : "bg-white/5"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <Field label="Seu cargo">
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-[#22D3EE]/50">
              {["Data Protection Officer", "CISO", "Arquiteto de Dados", "Compliance Lead", "CTO / CIO", "Outro"].map(r => <option key={r} className="bg-[#0F172A]">{r}</option>)}
            </select>
          </Field>
          <Field label="Telefone (opcional)">
            <Input type="tel" placeholder="+55 11 99999-0000" />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <Field label="Setor">
            <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-[#22D3EE]/50">
              {["Financeiro", "Saúde", "Varejo", "Governo", "Tecnologia", "Educação", "Indústria"].map(r => <option key={r} className="bg-[#0F172A]">{r}</option>)}
            </select>
          </Field>
          <Field label="Tamanho da empresa">
            <div className="grid grid-cols-3 gap-2">
              {["1-100", "101-500", "501-5000", "5001-20k", "20k+"].map(s => (
                <button type="button" key={s} onClick={() => setSize(s)} className={`py-2 rounded-xl text-sm border transition-all ${
                  size === s ? "border-[#22D3EE]/50 bg-[#22D3EE]/10 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                }`}>{s}</button>
              ))}
            </div>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">Selecione seus principais objetivos:</p>
          {[
            { id: "LGPD Automation", icon: Shield, desc: "Automação total de direitos do titular" },
            { id: "Descoberta de Dados", icon: Database, desc: "Mapeamento de dados em toda a empresa" },
            { id: "Governança", icon: Users, desc: "Políticas, papéis e workflows" },
          ].map(g => {
            const on = goals.includes(g.id);
            const Icon = g.icon;
            return (
              <button type="button" key={g.id} onClick={() => toggleGoal(g.id)} className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                on ? "border-[#22D3EE]/50 bg-[#22D3EE]/10" : "border-white/10 bg-white/5 hover:border-white/20"
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${on ? "bg-gradient-to-br from-[#22D3EE] to-[#6366F1]" : "bg-white/5"}`}>
                  <Icon className={`w-4 h-4 ${on ? "text-[#0F172A]" : "text-[#67E8F9]"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm" style={{ fontWeight: 500 }}>{g.id}</p>
                  <p className="text-xs text-slate-400">{g.desc}</p>
                </div>
                {on && <Check className="w-4 h-4 text-[#10B981]" />}
              </button>
            );
          })}
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center shadow-[0_0_32px_rgba(34,211,238,0.5)]">
            <Check className="w-7 h-7 text-[#0F172A]" strokeWidth={3} />
          </div>
          <p className="mt-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 600 }}>Tudo pronto!</p>
          <p className="mt-2 text-sm text-slate-400">Seu workspace foi configurado. Vamos começar a descobrir seus dados.</p>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 0 && step < 3 && (
          <button onClick={() => setStep(s => s - 1)} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">Voltar</button>
        )}
        <div className="flex-1"><PrimaryButton onClick={next}>{step === 3 ? "Entrar na plataforma" : "Continuar"}</PrimaryButton></div>
      </div>
    </AuthShell>
  );
}
