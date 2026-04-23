import { TrendingUp, AlertTriangle, Shield, Users, Sparkles, Database, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../auth";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-sm text-slate-400">Olá, {user?.name.split(" ")[0]} 👋</p>
          <h1 className="text-white tracking-tight mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 600 }}>
            Dashboard Executivo
          </h1>
        </div>

        <div className="relative rounded-2xl border border-[#22D3EE]/30 bg-gradient-to-br from-[#22D3EE]/10 to-[#6366F1]/5 p-5 flex items-center gap-5 shadow-[0_0_32px_rgba(34,211,238,0.15)]">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" strokeWidth="6" className="stroke-white/5" fill="none" />
              <circle cx="40" cy="40" r="34" strokeWidth="6" stroke="url(#g)" fill="none" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34 * 0.92} ${2 * Math.PI * 34}`} />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}>92</span>
              <span className="text-[10px] text-slate-400">/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#67E8F9] uppercase tracking-widest">LGPD Maturity Score</p>
            <p className="text-white mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.125rem", fontWeight: 600 }}>Enterprise Ready</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-[#10B981]">
              <CheckCircle2 className="w-3.5 h-3.5" /> +3 pts nos últimos 30 dias
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat icon={Database} label="Dados descobertos" value="1.284.392" trend="+12%" accent="#22D3EE" />
        <Stat icon={Sparkles} label="% Classificados" value="98,7" suffix="%" trend="+0.4%" accent="#67E8F9" />
        <Stat icon={Shield} label="Consentimentos ativos" value="47.2k" trend="12 revogados hoje" accent="#10B981" />
        <Stat icon={AlertTriangle} label="Incidentes em aberto" value="2" trend="1 notificado à ANPD" accent="#8B5CF6" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Evolução da Conformidade</h3>
              <p className="text-xs text-slate-500">Últimos 30 dias</p>
            </div>
            <select className="text-xs text-slate-300 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
              <option>30 dias</option><option>90 dias</option>
            </select>
          </div>
          <LineChart />
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <h3 className="text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Risk Heatmap</h3>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(10, minmax(0,1fr))" }}>
            {Array.from({ length: 70 }).map((_, i) => {
              const v = Math.random();
              const color = v > 0.85 ? "#8B5CF6" : v > 0.55 ? "#6366F1" : v > 0.3 ? "#22D3EE" : "#1E293B";
              return <div key={i} className="aspect-square rounded-sm" style={{ background: color, opacity: 0.4 + v * 0.6 }} />;
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span>Baixo</span>
            {["#1E293B", "#22D3EE", "#6366F1", "#8B5CF6"].map(c => <div key={c} className="flex-1 h-2 rounded-sm" style={{ background: c }} />)}
            <span>Crítico</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
        <h3 className="text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Atividade recente</h3>
        <div className="space-y-2">
          {[
            { t: "DPIA gerada automaticamente", s: "Projeto CRM Omnichannel", time: "há 2h", c: "#22D3EE" },
            { t: "Solicitação de eliminação processada", s: "Titular #7834", time: "há 4h", c: "#10B981" },
            { t: "Shadow data detectado", s: "Tabela legacy_exports", time: "há 6h", c: "#8B5CF6" },
            { t: "Notificação enviada à ANPD", s: "Incidente #A-221", time: "ontem", c: "#67E8F9" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: a.c, boxShadow: `0 0 8px ${a.c}` }} />
                <div>
                  <p className="text-sm text-white">{a.t}</p>
                  <p className="text-xs text-slate-500">{a.s}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LineChart() {
  const pts = Array.from({ length: 30 }, (_, i) => 60 + Math.sin(i * 0.4) * 10 + i * 1.1 + Math.random() * 5);
  const max = Math.max(...pts), min = Math.min(...pts);
  const w = 600, h = 200;
  const path = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * (h - 20) - 10;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#area)" />
      <path d={path} fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.6))" }} />
    </svg>
  );
}

function Stat({ icon: Icon, label, value, suffix, trend, accent }: any) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        <span className="text-xs text-slate-400">{trend}</span>
      </div>
      <p className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.75rem", fontWeight: 600 }}>
        {value}<span style={{ color: accent }}>{suffix ?? ""}</span>
      </p>
      <p className="text-xs text-slate-400 mt-1">{label}</p>
    </div>
  );
}
