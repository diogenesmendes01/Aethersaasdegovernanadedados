import { PageHeader, Badge } from "../../components/PageHeader";
import { AlertTriangle, Eye, Shield } from "lucide-react";

const alerts = [
  { t: "Shadow data em legacy_exports", desc: "23.4k registros sem dono ou política aplicada", sev: "Crítico", when: "há 2h" },
  { t: "CPF sem base legal em 3 datasets", desc: "customers_pii, marketing_temp, crm_old", sev: "Alto", when: "há 5h" },
  { t: "Transferência internacional não mapeada", desc: "Export para bucket em us-east-1", sev: "Alto", when: "há 8h" },
  { t: "Anonimização insuficiente detectada", desc: "Dataset logs.ip_masked reversível via cruzamento", sev: "Médio", when: "ontem" },
  { t: "Consentimento expirando", desc: "4.821 consentimentos expiram em 7 dias", sev: "Médio", when: "ontem" },
];

export default function Risks() {
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader title="Riscos & Alertas" subtitle="Risk Heatmap preditivo e alertas proativos com IA." />

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Risco global" value="42" max="100" color="#8B5CF6" desc="Moderado · tendência de queda" />
        <MetricCard title="Alertas críticos" value="3" color="#ef4444" desc="Requerem ação em até 24h" />
        <MetricCard title="Shadow data" value="1.284" color="#22D3EE" desc="Registros sem política aplicada" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Risk Heatmap</h3>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(20, minmax(0,1fr))" }}>
            {Array.from({ length: 160 }).map((_, i) => {
              const v = Math.random();
              const color = v > 0.85 ? "#8B5CF6" : v > 0.55 ? "#6366F1" : v > 0.3 ? "#22D3EE" : "#1E293B";
              return <div key={i} className="aspect-square rounded-sm" style={{ background: color, opacity: 0.4 + v * 0.6 }} />;
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span>Menor</span>
            {["#1E293B", "#22D3EE", "#6366F1", "#8B5CF6"].map(c => <div key={c} className="flex-1 h-2 rounded-sm" style={{ background: c }} />)}
            <span>Crítico</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#22D3EE]/20 bg-gradient-to-br from-[#22D3EE]/10 to-[#6366F1]/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#67E8F9]" />
            <p className="text-xs text-[#67E8F9] uppercase tracking-widest">Previsão IA</p>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">
            Com base em seus padrões, prevejo <span className="text-white">2 incidentes potenciais</span> nos próximos 14 dias. Principais vetores: shadow data e consentimentos expirando.
          </p>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-sm" style={{ fontWeight: 600 }}>Ver plano de mitigação</button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <p className="text-sm text-white" style={{ fontWeight: 500 }}>Alertas abertos</p>
          <div className="flex gap-2">
            <select className="text-xs bg-white/5 border border-white/10 text-slate-300 rounded-lg px-2 py-1">
              <option>Todas severidades</option><option>Crítico</option><option>Alto</option><option>Médio</option>
            </select>
          </div>
        </div>
        {alerts.map((a, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 border-t border-white/5 hover:bg-white/[0.03]">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${a.sev === "Crítico" ? "text-red-400" : a.sev === "Alto" ? "text-amber-400" : "text-[#67E8F9]"}`} />
              <div className="min-w-0">
                <p className="text-sm text-white">{a.t}</p>
                <p className="text-xs text-slate-400 truncate">{a.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge color={a.sev === "Crítico" ? "red" : a.sev === "Alto" ? "amber" : "cyan"}>{a.sev}</Badge>
              <span className="text-xs text-slate-500">{a.when}</span>
              <button className="text-xs text-[#67E8F9] hover:text-[#22D3EE] flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Investigar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ title, value, max, color, desc }: { title: string; value: string; max?: string; color: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-2 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 600, color }}>
        {value}{max && <span className="text-slate-500 text-lg">/{max}</span>}
      </p>
      <p className="text-xs text-slate-400 mt-1">{desc}</p>
    </div>
  );
}
