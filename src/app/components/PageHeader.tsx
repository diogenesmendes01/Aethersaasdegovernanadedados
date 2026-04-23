import { ReactNode } from "react";

export function PageHeader({ title, subtitle, right }: { title: string; subtitle: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
      <div>
        <h1 className="text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 600 }}>{title}</h1>
        <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

export function Tabs({ tabs, value, onChange }: { tabs: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-white/5 mb-6">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} className={`px-4 py-2.5 text-sm border-b-2 -mb-px transition-all ${
          value === t.id ? "border-[#22D3EE] text-white" : "border-transparent text-slate-400 hover:text-white"
        }`}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Badge({ children, color = "cyan" }: { children: ReactNode; color?: "cyan" | "green" | "purple" | "red" | "amber" | "slate" }) {
  const map: Record<string, string> = {
    cyan: "border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#67E8F9]",
    green: "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]",
    purple: "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#c4b5fd]",
    red: "border-red-500/30 bg-red-500/10 text-red-400",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    slate: "border-white/10 bg-white/5 text-slate-300",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border ${map[color]}`}>{children}</span>;
}
