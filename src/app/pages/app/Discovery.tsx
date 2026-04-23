import { Search, Filter, GitBranch, Database } from "lucide-react";
import { useState } from "react";
import { PageHeader, Badge } from "../../components/PageHeader";

const assets = [
  { name: "customers_pii", source: "AWS RDS / prod", owner: "Ana Ribeiro", sens: "Sensível", base: "Consentimento", last: "há 2h", risk: "high" },
  { name: "marketing_leads", source: "Salesforce", owner: "João Lima", sens: "Pessoal", base: "Legítimo Interesse", last: "há 6h", risk: "med" },
  { name: "employees_data", source: "Snowflake", owner: "Clara Dias", sens: "Sensível", base: "Contrato", last: "hoje", risk: "low" },
  { name: "support_emails", source: "Google Workspace", owner: "Pedro Souza", sens: "Pessoal", base: "—", last: "há 1d", risk: "high" },
  { name: "biometrics_audit", source: "Azure Blob", owner: "Maria Alves", sens: "Biométrico", base: "Consentimento", last: "há 3d", risk: "low" },
  { name: "legacy_exports", source: "SharePoint", owner: "Sem dono", sens: "Desconhecido", base: "—", last: "há 30d", risk: "high" },
];

export default function Discovery() {
  const [showLineage, setShowLineage] = useState<string | null>(null);
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader title="Descoberta & Catálogo" subtitle="Catálogo unificado com busca semântica e Data Lineage por IA." />

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#67E8F9]" />
        <input
          placeholder='Busque como no Google: "todos os e-mails com CPF dos últimos 2 anos"'
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#22D3EE]/20 bg-white/[0.02] text-white placeholder-slate-500 outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 border border-white/10 rounded px-2 py-0.5">⌘K</div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-[#67E8F9]" />
            <h3 className="text-sm text-white" style={{ fontWeight: 600 }}>Filtros</h3>
          </div>
          <FilterGroup title="Fonte" items={["AWS RDS", "Snowflake", "Salesforce", "Azure Blob", "SharePoint", "Google Workspace"]} />
          <FilterGroup title="Tipo de dado" items={["Pessoal", "Sensível", "Biométrico", "Financeiro", "Criança/Adolescente"]} />
          <FilterGroup title="Sensibilidade" items={["Crítica", "Alta", "Média", "Baixa"]} />
          <FilterGroup title="Base legal" items={["Consentimento", "Contrato", "Legítimo Interesse", "Sem base"]} />
        </aside>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <p className="text-sm text-slate-300">{assets.length} ativos encontrados</p>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10">Exportar</button>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A]" style={{ fontWeight: 600 }}>Nova varredura</button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-widest">
                <th className="px-5 py-3">Ativo</th>
                <th className="px-5 py-3">Fonte</th>
                <th className="px-5 py-3">Dono</th>
                <th className="px-5 py-3">Classificação LGPD</th>
                <th className="px-5 py-3">Base legal</th>
                <th className="px-5 py-3">Últ. varredura</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="px-5 py-3 text-sm text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#67E8F9]" />{a.name}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-400">{a.source}</td>
                  <td className="px-5 py-3 text-sm text-slate-400">{a.owner}</td>
                  <td className="px-5 py-3">
                    <Badge color={a.sens === "Sensível" || a.sens === "Biométrico" ? "purple" : a.sens === "Desconhecido" ? "red" : "cyan"}>{a.sens}</Badge>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    {a.base === "—" ? <Badge color="red">Sem base legal</Badge> : <span className="text-slate-300">{a.base}</span>}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500">{a.last}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => setShowLineage(a.name)} className="text-xs text-[#67E8F9] hover:text-[#22D3EE] flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" /> Ver Lineage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showLineage && <LineageModal name={showLineage} onClose={() => setShowLineage(null)} />}
    </div>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">{title}</p>
      <div className="space-y-1.5">
        {items.map(i => (
          <label key={i} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-white">
            <input type="checkbox" className="rounded border-white/20 bg-white/5" />{i}
          </label>
        ))}
      </div>
    </div>
  );
}

function LineageModal({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
      <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0F172A] p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-[#67E8F9] uppercase tracking-widest">Data Lineage</p>
            <h3 className="text-white mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 600 }}>{name}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <LineageGraph />
      </div>
    </div>
  );
}

function LineageGraph() {
  const nodes = [
    { x: 60, y: 120, label: "PostgreSQL", type: "source" },
    { x: 260, y: 60, label: "ETL Airflow", type: "proc" },
    { x: 260, y: 180, label: "Snowflake", type: "proc" },
    { x: 460, y: 120, label: "customers_pii", type: "current" },
    { x: 660, y: 60, label: "BI Looker", type: "sink" },
    { x: 660, y: 180, label: "ML Model", type: "sink" },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,3],[3,4],[3,5]];
  const color = (t: string) => t === "current" ? "#22D3EE" : t === "source" ? "#10B981" : t === "sink" ? "#8B5CF6" : "#6366F1";
  return (
    <svg viewBox="0 0 760 260" className="w-full h-72 rounded-xl border border-white/5 bg-[#020617]/50">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="28" fill={color(n.type)} opacity="0.2" />
          <circle cx={n.x} cy={n.y} r="18" fill={color(n.type)} />
          <text x={n.x} y={n.y + 48} textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="Inter">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
