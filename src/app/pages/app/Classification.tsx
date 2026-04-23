import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader, Badge } from "../../components/PageHeader";
import { useState } from "react";

const rows = [
  { dado: "customers.cpf", tipo: "Pessoal Sensível", base: "Consentimento", conf: 98, anon: false },
  { dado: "customers.health_score", tipo: "Dado Sensível", base: "Legítimo Interesse", conf: 89, anon: true },
  { dado: "leads.email", tipo: "Pessoal", base: "Consentimento", conf: 99, anon: false },
  { dado: "minors_db.birthdate", tipo: "Criança/Adolescente", base: "Consentimento parental", conf: 94, anon: false },
  { dado: "biometrics.fingerprint", tipo: "Biométrico", base: "Consentimento específico", conf: 97, anon: false },
  { dado: "payroll.salary", tipo: "Financeiro", base: "Contrato", conf: 96, anon: false },
  { dado: "logs.ip_masked", tipo: "Pessoal anonimizado", base: "—", conf: 72, anon: true },
];

export default function Classification() {
  const [showInsuf, setShowInsuf] = useState(false);
  const filtered = showInsuf ? rows.filter(r => r.anon && r.conf < 90) : rows;

  return (
    <div className="p-8 max-w-7xl">
      <PageHeader
        title="Classificação com IA"
        subtitle="Classificação LGPD em tempo real com sugestão de base legal."
        right={
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] flex items-center gap-2 shadow-[0_0_24px_rgba(34,211,238,0.35)]" style={{ fontWeight: 600 }}>
            <Sparkles className="w-4 h-4" /> Aplicar todas as sugestões da IA
          </button>
        }
      />

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {[
          { l: "Pendentes de revisão", v: "847", c: "#22D3EE" },
          { l: "Confiança média IA", v: "94%", c: "#67E8F9" },
          { l: "Sem base legal", v: "23", c: "#ef4444" },
          { l: "Anonimização insuf.", v: "5", c: "#8B5CF6" },
        ].map(k => (
          <div key={k.l} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-xs text-slate-400">{k.l}</p>
            <p className="mt-2 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.75rem", fontWeight: 600, color: k.c }}>{k.v}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={showInsuf} onChange={e => setShowInsuf(e.target.checked)} />
          Somente com anonimização insuficiente
        </label>
        <p className="text-xs text-slate-500">{filtered.length} itens</p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase tracking-widest">
              <th className="px-5 py-3">Dado</th>
              <th className="px-5 py-3">Tipo LGPD</th>
              <th className="px-5 py-3">Sugestão de Base Legal</th>
              <th className="px-5 py-3">Confiança IA</th>
              <th className="px-5 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/[0.03]">
                <td className="px-5 py-3 text-sm text-white font-mono">{r.dado}</td>
                <td className="px-5 py-3"><Badge color={r.tipo.includes("Sensível") || r.tipo.includes("Criança") || r.tipo.includes("Biométrico") ? "purple" : "cyan"}>{r.tipo}</Badge></td>
                <td className="px-5 py-3 text-sm text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#67E8F9]" />{r.base}
                </td>
                <td className="px-5 py-3 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.conf}%`, background: r.conf > 90 ? "#10B981" : r.conf > 75 ? "#22D3EE" : "#f59e0b" }} />
                    </div>
                    <span className="text-xs text-slate-400">{r.conf}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-lg border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] flex items-center justify-center hover:bg-[#10B981]/20"><CheckCircle2 className="w-3.5 h-3.5" /></button>
                    <button className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 text-slate-300 flex items-center justify-center hover:bg-white/10"><XCircle className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
