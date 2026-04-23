import { useState } from "react";
import { PageHeader, Tabs, Badge } from "../../components/PageHeader";
import { FileCheck, Users } from "lucide-react";

const tabs = [
  { id: "policies", label: "Políticas" },
  { id: "quality", label: "Data Quality" },
  { id: "roles", label: "Responsabilidades" },
  { id: "lifecycle", label: "Ciclo de Vida" },
];

export default function Governance() {
  const [tab, setTab] = useState("policies");
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader title="Governança Enterprise" subtitle="Políticas, qualidade, papéis e ciclo de vida dos dados." />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === "policies" && <Policies />}
      {tab === "quality" && <Quality />}
      {tab === "roles" && <Roles />}
      {tab === "lifecycle" && <Lifecycle />}
    </div>
  );
}

function Policies() {
  const items = [
    { n: "Política Master de Privacidade", v: "v3.2", owner: "DPO", status: "Ativa" },
    { n: "Retenção de dados de marketing", v: "v1.4", owner: "Data Steward Marketing", status: "Ativa" },
    { n: "Anonimização de logs", v: "v2.0", owner: "Security", status: "Revisão" },
    { n: "Transferência internacional", v: "v1.0", owner: "Legal", status: "Ativa" },
  ];
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <p className="text-sm text-slate-300">{items.length} políticas centralizadas</p>
        <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A]" style={{ fontWeight: 600 }}>Nova política</button>
      </div>
      {items.map((p, i) => (
        <div key={i} className="flex items-center justify-between px-5 py-4 border-t border-white/5 hover:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <FileCheck className="w-4 h-4 text-[#67E8F9]" />
            <div>
              <p className="text-sm text-white">{p.n}</p>
              <p className="text-xs text-slate-500">{p.v} · {p.owner}</p>
            </div>
          </div>
          <Badge color={p.status === "Ativa" ? "green" : "amber"}>{p.status}</Badge>
        </div>
      ))}
    </div>
  );
}

function Quality() {
  const assets = [
    { n: "customers_pii", p: 94, c: 98, cons: 92 },
    { n: "marketing_leads", p: 87, c: 75, cons: 90 },
    { n: "employees_data", p: 99, c: 99, cons: 97 },
    { n: "legacy_exports", p: 42, c: 38, cons: 51 },
  ];
  return (
    <div className="space-y-3">
      {assets.map((a, i) => {
        const avg = Math.round((a.p + a.c + a.cons) / 3);
        return (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-white font-mono">{a.n}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Score</span>
                <span className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: avg > 85 ? "#10B981" : avg > 60 ? "#22D3EE" : "#ef4444" }}>{avg}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ l: "Precisão", v: a.p }, { l: "Completude", v: a.c }, { l: "Consistência", v: a.cons }].map(m => (
                <div key={m.l}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{m.l}</span>
                    <span className="text-slate-300">{m.v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.v}%`, background: "linear-gradient(90deg, #22D3EE, #6366F1)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Roles() {
  const people = [
    { n: "Ana Ribeiro", role: "DPO", scope: "Global" },
    { n: "Carlos Mendes", role: "Data Owner", scope: "Financeiro" },
    { n: "Julia Castro", role: "Data Steward", scope: "Marketing" },
    { n: "Rafael Torres", role: "Data Owner", scope: "RH" },
    { n: "Larissa Vieira", role: "Data Steward", scope: "Produto" },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {people.map((p, i) => (
        <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center text-[#0F172A]" style={{ fontWeight: 700 }}>
            {p.n.split(" ").map(x => x[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1">
            <p className="text-sm text-white">{p.n}</p>
            <p className="text-xs text-slate-400">{p.role} · {p.scope}</p>
          </div>
          <Users className="w-4 h-4 text-slate-500" />
        </div>
      ))}
    </div>
  );
}

function Lifecycle() {
  const cols = [
    { t: "Solicitado", items: ["Retenção logs 90d", "Revisar política de cookies"] },
    { t: "Em análise", items: ["Anonimizar dataset antigo", "DPIA projeto CRM"] },
    { t: "Aprovado", items: ["Nova política backup", "Descarte trimestral"] },
    { t: "Publicado", items: ["Política master v3.2"] },
  ];
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cols.map(c => (
        <div key={c.t} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">{c.t} · {c.items.length}</p>
          <div className="space-y-2">
            {c.items.map(i => (
              <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.03] text-sm text-white">{i}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
