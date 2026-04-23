import { Search, Sparkles, Database, ShieldCheck, Brain, Lock, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Descoberta & Catálogo Inteligente",
    desc: "Varredura automática de bancos, data lakes, cloud e SaaS. Catálogo unificado com busca semântica e Data Lineage por IA.",
    tags: ["Data Lineage", "Busca Semântica", "Multi-cloud"],
  },
  {
    icon: Sparkles,
    title: "Classificação Automática com IA",
    desc: "Identificação em tempo real de dados pessoais, sensíveis, biométricos e financeiros. Sugestão inteligente de base legal LGPD.",
    tags: ["LGPD-ready", "Base Legal", "Pseudonimização"],
  },
  {
    icon: Database,
    title: "Governança Enterprise",
    desc: "Políticas centralizadas e versionadas, Data Quality Score com IA, gestão de Data Owners, Stewards e DPO com workflows completos.",
    tags: ["Data Quality", "Retention", "Workflows"],
  },
  {
    icon: ShieldCheck,
    title: "Conformidade LGPD Automatizada",
    desc: "100% dos direitos do titular automatizados. DPIA gerada por IA em minutos. Notificação à ANPD em até 2 horas.",
    tags: ["DPIA", "ANPD", "Consentimento"],
  },
  {
    icon: Brain,
    title: "Aether Copilot — IA Nativa",
    desc: "Assistente que responde: 'Quais dados sensíveis estão fora da base legal?'. Previsão de riscos, shadow data e análise preditiva.",
    tags: ["Copilot", "Risk Heatmap", "Shadow Data"],
    highlight: true,
  },
  {
    icon: Lock,
    title: "Segurança Zero Trust",
    desc: "RBAC + ABAC com IA, criptografia ponta a ponta, auditoria imutável. Integração nativa com SSO, SIEM, SOC e DLP.",
    tags: ["Zero Trust", "SSO", "SIEM"],
  },
  {
    icon: BarChart3,
    title: "Analytics Executivos",
    desc: "Dashboard com LGPD Maturity Score, relatórios automáticos para Conselho, DPO e ANPD com assinatura digital.",
    tags: ["Maturity Score", "Board Reports", "Auditoria"],
  },
];

export function Features() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-[#67E8F9] uppercase tracking-widest mb-4">Plataforma Completa</p>
          <h2 className="text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 600, lineHeight: 1.1 }}>
            Uma suíte inteira para{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">governança proativa</span>.
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Enquanto soluções tradicionais são reativas e manuais, a Aether é proativa, preditiva e autônoma.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isLarge = f.highlight;
            return (
              <div
                key={i}
                className={`group relative rounded-2xl border overflow-hidden p-6 transition-all hover:-translate-y-1 ${
                  isLarge
                    ? "lg:col-span-2 lg:row-span-1 border-[#22D3EE]/30 bg-gradient-to-br from-[#22D3EE]/10 via-[#6366F1]/5 to-transparent"
                    : "border-white/5 bg-white/[0.02] hover:border-[#22D3EE]/20 hover:bg-white/[0.04]"
                }`}
              >
                {isLarge && (
                  <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#22D3EE]/20 rounded-full blur-3xl" />
                )}
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                    isLarge
                      ? "bg-gradient-to-br from-[#22D3EE] to-[#6366F1] shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                      : "bg-white/5 border border-white/10"
                  }`}>
                    <Icon className={`w-5 h-5 ${isLarge ? "text-[#0F172A]" : "text-[#67E8F9]"}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 600 }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
