import { ArrowRight, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#22D3EE]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#6366F1]/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/5 backdrop-blur-sm mb-8">
            <Zap className="w-3.5 h-3.5 text-[#67E8F9]" />
            <span className="text-xs text-[#67E8F9] tracking-wide">Nova era da Governança de Dados com IA</span>
          </div>

          <h1 className="max-w-4xl text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 600, lineHeight: 1.05 }}>
            Governança de dados{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#67E8F9] to-[#8B5CF6] bg-clip-text text-transparent">
              inteligente, autônoma
            </span>{" "}
            e em conformidade.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            A Aether transforma a complexidade da LGPD em vantagem estratégica.
            Descubra, classifique, proteja e monitore seus dados em tempo real — com IA proativa e preditiva.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.7)] transition-all" style={{ fontWeight: 600 }}>
              Solicitar Demo Enterprise
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all">
              <Shield className="w-4 h-4 text-[#67E8F9]" />
              Ver Plataforma
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs text-slate-500 uppercase tracking-widest">
            <span>LGPD Art. 50/51</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>ISO 27701</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>SOC 2 Type II</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Zero Trust</span>
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="mt-20 relative mx-auto max-w-5xl">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#22D3EE]/30 to-[#6366F1]/30 rounded-3xl blur-2xl opacity-50" />
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#1E2A44] to-[#0F172A] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-4 text-xs text-slate-500">aether.io / dashboard</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="LGPD Maturity" value="94" suffix="/100" accent="#22D3EE" />
          <StatCard label="Dados Classificados" value="2.4M" accent="#67E8F9" />
          <StatCard label="Riscos Abertos" value="12" accent="#8B5CF6" />
          <StatCard label="Titulares Atendidos" value="847" accent="#10B981" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="col-span-2 rounded-xl border border-white/5 bg-white/5 p-4 h-48">
            <p className="text-xs text-slate-400 mb-3">Risk Heatmap — Últimos 30 dias</p>
            <div className="grid grid-cols-12 gap-1 h-32">
              {Array.from({ length: 84 }).map((_, i) => {
                const intensity = Math.random();
                const color = intensity > 0.8 ? "#8B5CF6" : intensity > 0.5 ? "#6366F1" : intensity > 0.25 ? "#22D3EE" : "#1E293B";
                return <div key={i} className="rounded-sm" style={{ background: color, opacity: 0.4 + intensity * 0.6 }} />;
              })}
            </div>
          </div>
          <div className="rounded-xl border border-[#22D3EE]/20 bg-gradient-to-br from-[#22D3EE]/10 to-[#6366F1]/10 p-4">
            <p className="text-xs text-[#67E8F9] mb-2">⚡ Aether Copilot</p>
            <p className="text-sm text-slate-200 leading-relaxed">3 datasets contêm CPF sem base legal clara. Sugiro revisar a política de consentimento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, suffix, accent }: { label: string; value: string; suffix?: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.75rem", fontWeight: 600 }}>
        {value}<span style={{ color: accent }}>{suffix}</span>
      </p>
      <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: "70%", background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      </div>
    </div>
  );
}
