import { Send, Sparkles, TrendingUp, AlertTriangle, Eye } from "lucide-react";

const messages = [
  { role: "user", text: "Quais dados sensíveis estão fora da base legal?" },
  { role: "ai", text: "Identifiquei 14 datasets com dados sensíveis sem base legal clara. Destaque: tabela customers_pii (CPF + score de crédito) sem consentimento registrado desde 12/03. Sugiro: 1) pausar ingestão, 2) acionar DPO, 3) gerar DPIA automática." },
  { role: "user", text: "Qual o risco de LGPD no novo projeto de CRM?" },
  { role: "ai", text: "Risco calculado: ALTO (82/100). Motivos: transferência internacional sem cláusula padrão, retenção > 5 anos, falta de anonimização em logs. Recomendo ajustes antes do go-live." },
];

export function Copilot() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6366F1]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-xs text-[#8B5CF6] tracking-wide">IA Nativa</span>
          </div>
          <h2 className="text-white tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 600, lineHeight: 1.1 }}>
            Converse com seus dados.<br />
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">Aether Copilot</span>.
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Um assistente de IA treinado em LGPD, ANPD e políticas internas. Ele entende contexto, prevê riscos e recomenda ações de mitigação em tempo real.
          </p>

          <div className="space-y-4">
            <CapCard icon={TrendingUp} title="Previsão de riscos" desc="Risk Heatmap preditivo com análise de tendências regulatórias." />
            <CapCard icon={Eye} title="Detecção de shadow data" desc="Encontra dados ocultos e uso indevido sem política definida." />
            <CapCard icon={AlertTriangle} title="Impacto de novas leis" desc="Simula efeitos de atualizações da ANPD no seu ambiente atual." />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#22D3EE]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl" />
          <div className="relative rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#0F172A]" />
                </div>
                <div>
                  <p className="text-sm text-white" style={{ fontWeight: 500 }}>Aether Copilot</p>
                  <p className="text-xs text-[#10B981] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Online
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-hidden">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#6366F1] text-white rounded-br-sm"
                      : "bg-white/5 border border-white/5 text-slate-200 rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5">
              <input
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-slate-500"
                placeholder="Pergunte sobre seus dados..."
              />
              <button className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-shadow">
                <Send className="w-4 h-4 text-[#0F172A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#22D3EE]/20 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#67E8F9]" />
      </div>
      <div>
        <p className="text-white text-sm mb-0.5" style={{ fontWeight: 500 }}>{title}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
