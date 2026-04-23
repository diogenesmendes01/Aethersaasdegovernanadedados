import { Sparkles } from "lucide-react";
import { Link } from "react-router";

export function Navbar() {
  const links = ["Plataforma", "Funcionalidades", "LGPD", "IA Copilot", "Preços"];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0F172A]/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <Sparkles className="w-4 h-4 text-[#0F172A]" strokeWidth={2.5} />
          </div>
          <span className="text-xl tracking-tight text-white" style={{ fontWeight: 600 }}>Aether</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href="#" className="text-sm text-slate-300 hover:text-[#67E8F9] transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden md:block text-sm text-slate-300 hover:text-white transition-colors">Entrar</Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-sm shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:shadow-[0_0_32px_rgba(34,211,238,0.6)] transition-all" style={{ fontWeight: 600 }}>
            Solicitar Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
