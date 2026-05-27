import { NavLink, Outlet, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import { LayoutDashboard, Search, Brain, Database, ShieldCheck, AlertTriangle, FileText, Settings as SettingsIcon, Compass, LogOut, User } from "lucide-react";
import { useAuth } from "../auth";
import { Logo } from "./Logo";
import { CopilotFab } from "./CopilotFab";
import { NotificationBell } from "./NotificationBell";

const mainNav = [
  { to: "/app", icon: LayoutDashboard, label: "Home", end: true },
  { to: "/app/discovery", icon: Compass, label: "Descoberta" },
  { to: "/app/classification", icon: Search, label: "Classificação" },
  { to: "/app/governance", icon: Database, label: "Governança" },
  { to: "/app/compliance", icon: ShieldCheck, label: "Conformidade" },
  { to: "/app/copilot", icon: Brain, label: "Copilot", glow: true },
  { to: "/app/risks", icon: AlertTriangle, label: "Riscos & Alertas" },
  { to: "/app/reports", icon: FileText, label: "Relatórios" },
  { to: "/app/settings", icon: SettingsIcon, label: "Configurações" },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [copilotOpen, setCopilotOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (!user.firstAccessDone) return <Navigate to="/first-access" replace />;

  const doLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <aside className="w-60 border-r border-white/5 bg-[#0F172A]/60 backdrop-blur-xl flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Aether</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {mainNav.map(item => <NavItem key={item.to} {...item} />)}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <NavLink to="/app/profile" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? "bg-white/5 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-[#0F172A]" style={{ background: `linear-gradient(135deg, ${user.avatarColor}, #6366F1)`, fontWeight: 600 }}>
              {user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs text-white truncate leading-tight" style={{ fontWeight: 500 }}>{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate leading-tight">{user.company}</p>
            </div>
          </NavLink>
          <button onClick={doLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/5 bg-[#0F172A]/60 backdrop-blur-xl px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input placeholder="Buscar dados, políticas, titulares..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/5 bg-white/5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#22D3EE]/40" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-xs text-[#10B981]">Conforme</span>
            </div>
            <NotificationBell />
            <NavLink to="/app/profile" className="w-9 h-9 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </NavLink>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <CopilotFab open={copilotOpen} onToggle={() => setCopilotOpen(o => !o)} />
    </div>
  );
}

function NavItem({ to, icon: Icon, label, end, glow }: any) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
          isActive
            ? "bg-gradient-to-r from-[#22D3EE]/15 to-transparent text-white border border-[#22D3EE]/20"
            : "text-slate-400 hover:text-[#22D3EE] hover:bg-white/5 border border-transparent"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={glow ? "relative" : ""}>
            <Icon className={`w-4 h-4 ${isActive ? "text-[#67E8F9]" : glow ? "text-[#67E8F9]" : ""}`} />
            {glow && <span className="absolute inset-0 bg-[#22D3EE] rounded-full blur-md opacity-40 -z-0" />}
          </div>
          <span className="relative">{label}</span>
          {glow && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[#22D3EE]/20 text-[#67E8F9]">IA</span>}
        </>
      )}
    </NavLink>
  );
}
