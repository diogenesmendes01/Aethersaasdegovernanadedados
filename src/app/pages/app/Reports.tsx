import { PageHeader, Badge } from "../../components/PageHeader";
import { FileText, Download, Building2, Send } from "lucide-react";

const reports = [
  { n: "LGPD Maturity Report · Q1 2026", type: "Executivo", pages: 42, gen: "hoje" },
  { n: "Relatório de Consentimento", type: "Operacional", pages: 18, gen: "há 2 dias" },
  { n: "Inventário de Dados Pessoais", type: "Auditoria", pages: 112, gen: "há 1 semana" },
  { n: "Notificações ANPD · 30 dias", type: "ANPD", pages: 8, gen: "há 1 semana" },
  { n: "DPIA consolidada", type: "DPO", pages: 34, gen: "há 2 semanas" },
];

export default function Reports() {
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader
        title="Relatórios & Analytics"
        subtitle="Exporte relatórios com assinatura digital e envio automatizado."
      />

      <div className="rounded-2xl border border-[#22D3EE]/20 bg-gradient-to-br from-[#22D3EE]/10 to-[#6366F1]/5 p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" strokeWidth="6" className="stroke-white/5" fill="none" />
              <circle cx="40" cy="40" r="34" strokeWidth="6" stroke="url(#r1)" fill="none" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34 * 0.92} ${2 * Math.PI * 34}`} />
              <defs><linearGradient id="r1"><stop offset="0%" stopColor="#22D3EE" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.75rem", fontWeight: 700 }}>92</span>
              <span className="text-[10px] text-slate-400">/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#67E8F9] uppercase tracking-widest">LGPD Maturity Score</p>
            <p className="text-white mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 600 }}>Enterprise Ready</p>
            <p className="text-xs text-slate-400 mt-1">Cobertura · Automação · Auditabilidade · Resposta a incidentes</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-sm flex items-center gap-2" style={{ fontWeight: 600 }}>
            <Download className="w-4 h-4" /> Exportar PDF assinado
          </button>
          <button className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm flex items-center gap-2 hover:bg-white/10">
            <Send className="w-4 h-4" /> Enviar para ANPD
          </button>
          <button className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm flex items-center gap-2 hover:bg-white/10">
            <Building2 className="w-4 h-4" /> Enviar para Conselho
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <select className="text-sm bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2">
          <option>Últimos 30 dias</option><option>Último trimestre</option><option>Último ano</option>
        </select>
        <select className="text-sm bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2">
          <option>Todas as áreas</option><option>Marketing</option><option>RH</option><option>Financeiro</option>
        </select>
        <select className="text-sm bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2">
          <option>Todos os tipos</option><option>Executivo</option><option>Operacional</option><option>ANPD</option>
        </select>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4 border-t border-white/5 first:border-t-0 hover:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22D3EE]/20 to-[#6366F1]/20 border border-white/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#67E8F9]" />
              </div>
              <div>
                <p className="text-sm text-white">{r.n}</p>
                <p className="text-xs text-slate-400">{r.pages} páginas · gerado {r.gen}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge color="cyan">{r.type}</Badge>
              <button className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white text-xs flex items-center gap-1 hover:bg-white/10">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
