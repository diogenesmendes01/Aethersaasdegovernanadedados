import { Check } from "lucide-react";

const plans = [
  {
    name: "Growth",
    price: "R$ 4.900",
    desc: "Para empresas em conformidade inicial",
    features: ["Até 500GB de dados", "Classificação automática", "5 usuários", "Suporte email"],
  },
  {
    name: "Enterprise",
    price: "R$ 18.900",
    desc: "Para operações de dados em escala",
    featured: true,
    features: ["Dados ilimitados", "Aether Copilot completo", "Usuários ilimitados", "DPIA automatizada", "Integrações SIEM/SOC", "CSM dedicado"],
  },
  {
    name: "Sovereign",
    price: "Sob consulta",
    desc: "Setor regulado, governo e grupos multinacionais",
    features: ["Deploy dedicado / on-premise", "SLA 99.99%", "Compliance customizado", "Arquiteto dedicado"],
  },
];

export function Pricing() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-[#67E8F9] uppercase tracking-widest mb-4">Preços Enterprise</p>
          <h2 className="text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 600, lineHeight: 1.1 }}>
            Um plano para cada nível de maturidade.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={`relative rounded-2xl p-8 ${
              p.featured
                ? "border-2 border-[#22D3EE]/40 bg-gradient-to-br from-[#22D3EE]/10 via-[#6366F1]/5 to-transparent shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                : "border border-white/10 bg-white/[0.02]"
            }`}>
              {p.featured && (
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-xs" style={{ fontWeight: 600 }}>
                  Mais popular
                </span>
              )}
              <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 600 }}>{p.name}</p>
              <p className="text-sm text-slate-400 mt-1 mb-6">{p.desc}</p>
              <p className="text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.25rem", fontWeight: 700 }}>{p.price}</p>
              <p className="text-xs text-slate-500 mb-6">por mês · anual</p>
              <button className={`w-full py-2.5 rounded-xl text-sm transition-all ${
                p.featured
                  ? "bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:shadow-[0_0_36px_rgba(34,211,238,0.6)]"
                  : "border border-white/10 text-white hover:bg-white/5"
              }`} style={{ fontWeight: 600 }}>
                Falar com especialista
              </button>

              <ul className="mt-8 space-y-3">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
