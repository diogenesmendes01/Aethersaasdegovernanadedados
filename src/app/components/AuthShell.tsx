import { Sparkles } from "lucide-react";
import { Link } from "react-router";
import { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E2A44] to-[#0F172A] p-12">
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-[#22D3EE]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/20 rounded-full blur-[120px]" />
        <div className="relative flex flex-col justify-between w-full">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              <Sparkles className="w-4 h-4 text-[#0F172A]" strokeWidth={2.5} />
            </div>
            <span className="text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Aether</span>
          </Link>

          <div>
            <p className="text-sm text-[#67E8F9] uppercase tracking-widest mb-4">Ethereal Intelligence</p>
            <h1 className="tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.1 }}>
              Governança de dados{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">proativa</span>,{" "}
              autônoma e conforme LGPD.
            </h1>
            <div className="space-y-3">
              {["Classificação automática com IA", "DPIA gerada em minutos", "Notificação à ANPD em até 2h"].map(t => (
                <div key={t} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">© 2026 Aether Technologies · LGPD Art. 50/51</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="lg:hidden absolute top-6 left-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0F172A]" strokeWidth={2.5} />
            </div>
            <span className="text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Aether</span>
          </Link>
        </div>
        <div className="w-full max-w-md">
          <h2 className="tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.75rem", fontWeight: 600 }}>{title}</h2>
          <p className="text-sm text-slate-400 mb-8">{subtitle}</p>
          {children}
          {footer && <div className="mt-8 text-sm text-slate-400 text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-xs text-slate-400 mb-1.5 tracking-wide">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500 mt-1">{hint}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 outline-none focus:border-[#22D3EE]/50 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)] transition-all ${props.className ?? ""}`}
    />
  );
}

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:shadow-[0_0_36px_rgba(34,211,238,0.6)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      style={{ fontWeight: 600 }}
    >
      {children}
    </button>
  );
}
