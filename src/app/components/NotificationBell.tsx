import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Bell, AlertTriangle, Sparkles, Shield, FileCheck, UserCheck, Info, Check, Trash2, CheckCheck, X } from "lucide-react";
import { useNotifications, relativeTime, NotifType } from "../notifications";

const typeIcon: Record<NotifType, any> = {
  incident: AlertTriangle,
  risk: Shield,
  consent: UserCheck,
  dpia: FileCheck,
  copilot: Sparkles,
  system: Info,
};

const sevColor = (s?: string) => s === "critical" ? "#ef4444" : s === "high" ? "#f59e0b" : s === "medium" ? "#22D3EE" : "#67E8F9";

export function NotificationBell() {
  const { items, unread, markRead, markAllRead, remove, clear } = useNotifications();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  const visible = filter === "unread" ? items.filter(i => !i.read) : items;

  const openItem = (id: string, link?: string) => {
    markRead(id);
    if (link) { navigate(link); setOpen(false); }
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} className="relative w-9 h-9 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 flex items-center justify-center">
        <Bell className="w-4 h-4 text-slate-300" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#6366F1] text-[#0F172A] text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.8)]" style={{ fontWeight: 700 }}>
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-[400px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#22D3EE]/20 to-[#6366F1]/20 rounded-3xl blur-xl opacity-40 pointer-events-none" />
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div>
              <p className="text-sm text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Notificações</p>
              <p className="text-xs text-slate-500">{unread} não lidas</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={markAllRead} disabled={unread === 0} className="text-xs text-slate-400 hover:text-[#67E8F9] px-2 py-1 rounded disabled:opacity-40 disabled:hover:text-slate-400 flex items-center gap-1">
                <CheckCheck className="w-3.5 h-3.5" /> Marcar todas
              </button>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative flex items-center gap-1 px-3 py-2 border-b border-white/5">
            {[{ k: "all", l: "Todas" }, { k: "unread", l: "Não lidas" }].map(t => (
              <button key={t.k} onClick={() => setFilter(t.k as any)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${filter === t.k ? "bg-white/5 text-white border border-white/10" : "text-slate-400 hover:text-white"}`}>
                {t.l} {t.k === "unread" && unread > 0 && <span className="ml-1 text-[#67E8F9]">{unread}</span>}
              </button>
            ))}
          </div>

          <div className="relative max-h-[440px] overflow-y-auto">
            {visible.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-sm text-slate-300">Tudo em dia</p>
                <p className="text-xs text-slate-500 mt-1">Nenhuma notificação {filter === "unread" ? "não lida" : ""}.</p>
              </div>
            ) : (
              visible.map(n => {
                const Icon = typeIcon[n.type];
                return (
                  <div key={n.id} className={`group relative flex gap-3 px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.03] cursor-pointer ${!n.read ? "bg-[#22D3EE]/[0.03]" : ""}`} onClick={() => openItem(n.id, n.link)}>
                    {!n.read && <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center border" style={{ borderColor: `${sevColor(n.severity)}40`, background: `${sevColor(n.severity)}10` }}>
                      <Icon className="w-4 h-4" style={{ color: sevColor(n.severity) }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-tight">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.desc}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{relativeTime(n.time)}</span>
                        {n.severity === "critical" && <span className="text-[10px] text-red-400 uppercase tracking-widest">Crítico</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!n.read && (
                        <button onClick={e => { e.stopPropagation(); markRead(n.id); }} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#10B981]" title="Marcar como lida">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={e => { e.stopPropagation(); remove(n.id); }} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-red-400" title="Remover">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {items.length > 0 && (
            <div className="relative flex items-center justify-between px-5 py-3 border-t border-white/5">
              <button onClick={clear} className="text-xs text-slate-400 hover:text-red-400 transition-colors">Limpar todas</button>
              <span className="text-xs text-slate-500">Atualiza em tempo real</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
