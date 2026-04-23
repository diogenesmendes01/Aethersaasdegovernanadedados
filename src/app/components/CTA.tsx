import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#22D3EE]/30 to-[#6366F1]/30 rounded-3xl blur-3xl opacity-60" />
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#1E2A44] via-[#0F172A] to-[#1E2A44] p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#22D3EE] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#8B5CF6] rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#67E8F9]" />
              <span className="text-xs text-[#67E8F9]">Pronto para governança autônoma?</span>
            </div>
            <h2 className="text-white tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, lineHeight: 1.1 }}>
              Transforme LGPD em{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">
                vantagem competitiva
              </span>.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Agende uma demo personalizada com nossos arquitetos de dados e veja a Aether operando no seu contexto enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:shadow-[0_0_60px_rgba(34,211,238,0.8)] transition-all" style={{ fontWeight: 600 }}>
                Solicitar Demo Enterprise
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                Conversar com DPO especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
