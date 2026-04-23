import { useState } from "react";
import { Sparkles, Send, Link2, Zap } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

const starters = [
  { t: "Quais dados sensíveis estão fora da base legal?", cat: "LGPD" },
  { t: "Qual o risco LGPD no novo projeto de CRM?", cat: "Risco" },
  { t: "Mostre shadow data encontrado esta semana", cat: "Descoberta" },
  { t: "Gere uma DPIA para o projeto de scoring ML", cat: "DPIA" },
  { t: "Qual o impacto da última resolução da ANPD?", cat: "Regulatório" },
  { t: "Resuma incidentes abertos e prazos", cat: "Incidentes" },
];

type Msg = { role: "user" | "ai"; text: string; sources?: string[] };

export default function CopilotPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const send = (t?: string) => {
    const text = t ?? input;
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }, {
      role: "ai",
      text: "Identifiquei 14 datasets com dados sensíveis sem base legal clara. Destaque: customers_pii (CPF + score de crédito) sem consentimento registrado desde 12/03. Sugiro: 1) pausar ingestão, 2) acionar DPO, 3) gerar DPIA automática.",
      sources: ["customers_pii · AWS RDS", "Política Master v3.2", "DPIA #2025-042"],
    }]);
    setInput("");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <PageHeader
        title="Aether Copilot"
        subtitle="Converse com seus dados. Receba respostas com fontes e ações."
        right={<span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-xs text-[#67E8F9]"><Sparkles className="w-3.5 h-3.5" /> IA Nativa</span>}
      />

      {msgs.length === 0 ? (
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Comece com um prompt sugerido</p>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {starters.map(s => (
              <button key={s.t} onClick={() => send(s.t)} className="group text-left p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/5 transition-all">
                <p className="text-xs text-[#67E8F9] uppercase tracking-widest mb-2">{s.cat}</p>
                <p className="text-sm text-white leading-relaxed">{s.t}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${m.role === "user" ? "" : "w-full"}`}>
                <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-[#6366F1] text-white rounded-br-sm" : "bg-white/5 border border-white/5 text-slate-200"}`}>
                  {m.text}
                </div>
                {m.sources && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-1"><Link2 className="w-3 h-3" /> Fontes</p>
                    <div className="flex flex-wrap gap-2">
                      {m.sources.map(s => (
                        <span key={s} className="text-xs px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-slate-300">{s}</span>
                      ))}
                    </div>
                    <button className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-xs" style={{ fontWeight: 600 }}>
                      <Zap className="w-3.5 h-3.5" /> Tomar ação
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sticky bottom-6 rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-3 shadow-[0_0_32px_rgba(34,211,238,0.15)]">
        <div className="flex items-center gap-3 px-4 py-2">
          <Sparkles className="w-4 h-4 text-[#67E8F9]" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-slate-500"
            placeholder="Pergunte sobre LGPD, dados, riscos, políticas..."
          />
          <button onClick={() => send()} className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center">
            <Send className="w-4 h-4 text-[#0F172A]" />
          </button>
        </div>
      </div>
    </div>
  );
}
