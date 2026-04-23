import { useState } from "react";
import { PageHeader, Tabs, Badge } from "../../components/PageHeader";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

const tabs = [
  { id: "consent", label: "Consentimentos" },
  { id: "rights", label: "Direitos do Titular" },
  { id: "dpia", label: "DPIA" },
  { id: "incidents", label: "Incidentes" },
];

export default function Compliance() {
  const [tab, setTab] = useState("consent");
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader title="Conformidade LGPD" subtitle="Consentimento, direitos do titular, DPIA e incidentes." />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === "consent" && <Consent />}
      {tab === "rights" && <Rights />}
      {tab === "dpia" && <Dpia />}
      {tab === "incidents" && <Incidents />}
    </div>
  );
}

function Consent() {
  const rows = [
    { f: "Marketing direto", ativo: 12483, revog: 312, base: "Consentimento" },
    { f: "Analytics comportamental", ativo: 8840, revog: 120, base: "Consentimento" },
    { f: "Cookies não essenciais", ativo: 20112, revog: 1820, base: "Consentimento" },
    { f: "Programa de fidelidade", ativo: 5790, revog: 58, base: "Contrato" },
  ];
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-slate-500 uppercase tracking-widest">
            <th className="px-5 py-3">Finalidade</th>
            <th className="px-5 py-3">Ativos</th>
            <th className="px-5 py-3">Revogados</th>
            <th className="px-5 py-3">Base Legal</th>
            <th className="px-5 py-3">Granularidade</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5 hover:bg-white/[0.03]">
              <td className="px-5 py-3 text-sm text-white">{r.f}</td>
              <td className="px-5 py-3 text-sm text-[#10B981]">{r.ativo.toLocaleString("pt-BR")}</td>
              <td className="px-5 py-3 text-sm text-slate-400">{r.revog.toLocaleString("pt-BR")}</td>
              <td className="px-5 py-3"><Badge color="cyan">{r.base}</Badge></td>
              <td className="px-5 py-3 w-48">
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#6366F1]" style={{ width: `${(r.ativo / (r.ativo + r.revog)) * 100}%` }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Rights() {
  const reqs = [
    { t: "Ana S.", type: "Acesso", prazo: "3d", status: "Pendente" },
    { t: "Marcos L.", type: "Eliminação", prazo: "7d", status: "Em andamento" },
    { t: "Paula T.", type: "Portabilidade", prazo: "12d", status: "Concluído" },
    { t: "João P.", type: "Revisão decisão auto.", prazo: "5d", status: "Em andamento" },
    { t: "Fátima R.", type: "Retificação", prazo: "2d", status: "Pendente" },
  ];
  const cols = [
    { k: "Pendente", color: "amber" as const },
    { k: "Em andamento", color: "cyan" as const },
    { k: "Concluído", color: "green" as const },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cols.map(c => (
        <div key={c.k} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge color={c.color}>{c.k}</Badge>
            <span className="text-xs text-slate-500">{reqs.filter(r => r.status === c.k).length}</span>
          </div>
          <div className="space-y-2">
            {reqs.filter(r => r.status === c.k).map((r, i) => (
              <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.03]">
                <p className="text-sm text-white">{r.t}</p>
                <p className="text-xs text-slate-400">{r.type} · prazo {r.prazo}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Dpia() {
  const projs = [
    { n: "CRM Omnichannel", risk: "Alto", status: "Gerado" },
    { n: "Programa de fidelidade v2", risk: "Médio", status: "Pendente" },
    { n: "Scoring de crédito ML", risk: "Alto", status: "Em revisão" },
    { n: "Chatbot Atendimento IA", risk: "Médio", status: "Pendente" },
  ];
  return (
    <div className="space-y-3">
      {projs.map((p, i) => (
        <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-white">{p.n}</p>
            <p className="text-xs text-slate-400 mt-1">Risco: <span className={p.risk === "Alto" ? "text-red-400" : "text-amber-400"}>{p.risk}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <Badge color={p.status === "Gerado" ? "green" : p.status === "Em revisão" ? "cyan" : "amber"}>{p.status}</Badge>
            {p.status === "Pendente" && (
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-xs flex items-center gap-1" style={{ fontWeight: 600 }}>
                <Sparkles className="w-3.5 h-3.5" /> Gerar com IA
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Incidents() {
  const events = [
    { t: "Incidente #A-221 aberto", desc: "Acesso indevido detectado em tabela payroll", when: "há 3h", critical: true },
    { t: "Notificação ANPD enviada", desc: "Automática · dentro de 2h", when: "há 2h", ok: true },
    { t: "Contenção aplicada", desc: "Credenciais revogadas e logs preservados", when: "há 1h", ok: true },
    { t: "Comunicação a titulares", desc: "3.128 titulares notificados via email", when: "há 30min", ok: true },
  ];
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-white/5" />
      {events.map((e, i) => (
        <div key={i} className="relative pb-6 last:pb-0">
          <span className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full ${e.critical ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]" : "bg-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.6)]"}`} />
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-1">
              {e.critical ? <AlertCircle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
              <p className="text-sm text-white">{e.t}</p>
              <span className="ml-auto text-xs text-slate-500">{e.when}</span>
            </div>
            <p className="text-xs text-slate-400 ml-6">{e.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
