import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

export type NotifType = "incident" | "risk" | "consent" | "dpia" | "copilot" | "system";
export type Notif = {
  id: string;
  type: NotifType;
  title: string;
  desc: string;
  time: number;
  read: boolean;
  severity?: "critical" | "high" | "medium" | "info";
  link?: string;
};

type Ctx = {
  items: Notif[];
  unread: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clear: () => void;
  push: (n: Omit<Notif, "id" | "time" | "read">) => void;
};

const NCtx = createContext<Ctx | null>(null);
const KEY = "aether.notifications";

const seed: Notif[] = [
  { id: "1", type: "incident", severity: "critical", title: "Incidente #A-221 aberto", desc: "Acesso indevido detectado em tabela payroll", time: Date.now() - 1000 * 60 * 12, read: false, link: "/app/compliance" },
  { id: "2", type: "copilot", severity: "info", title: "Aether Copilot sugere ação", desc: "3 datasets com CPF sem base legal clara", time: Date.now() - 1000 * 60 * 47, read: false, link: "/app/copilot" },
  { id: "3", type: "risk", severity: "high", title: "Shadow data detectado", desc: "23.4k registros em legacy_exports sem política", time: Date.now() - 1000 * 60 * 60 * 2, read: false, link: "/app/risks" },
  { id: "4", type: "dpia", severity: "info", title: "DPIA gerada automaticamente", desc: "Projeto CRM Omnichannel · pronto para revisão", time: Date.now() - 1000 * 60 * 60 * 5, read: true, link: "/app/compliance" },
  { id: "5", type: "consent", severity: "medium", title: "Consentimentos expirando", desc: "4.821 consentimentos expiram em 7 dias", time: Date.now() - 1000 * 60 * 60 * 9, read: true, link: "/app/compliance" },
  { id: "6", type: "system", severity: "info", title: "Notificação à ANPD enviada", desc: "Automática · dentro de 2h · Incidente #A-221", time: Date.now() - 1000 * 60 * 60 * 23, read: true },
];

const livePool: Omit<Notif, "id" | "time" | "read">[] = [
  { type: "copilot", severity: "info", title: "Copilot: novo insight", desc: "Tendência de queda no score de anonimização em logs", link: "/app/copilot" },
  { type: "risk", severity: "high", title: "Alerta preditivo", desc: "Previsão de 2 incidentes em 14 dias · ver plano de mitigação", link: "/app/risks" },
  { type: "consent", severity: "medium", title: "Nova solicitação de titular", desc: "Paula T. · Portabilidade · prazo 15 dias", link: "/app/compliance" },
  { type: "dpia", severity: "info", title: "DPIA pronta para revisão", desc: "Programa de fidelidade v2 · gerada pela IA", link: "/app/compliance" },
];

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Notif[]>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return seed;
  });
  const timer = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      if (Math.random() > 0.5) {
        const n = livePool[Math.floor(Math.random() * livePool.length)];
        setItems(prev => [{ ...n, id: Math.random().toString(36).slice(2), time: Date.now(), read: false }, ...prev].slice(0, 50));
      }
    }, 45_000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const markRead = (id: string) => setItems(arr => arr.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setItems(arr => arr.map(n => ({ ...n, read: true })));
  const remove = (id: string) => setItems(arr => arr.filter(n => n.id !== id));
  const clear = () => setItems([]);
  const push: Ctx["push"] = (n) => setItems(arr => [{ ...n, id: Math.random().toString(36).slice(2), time: Date.now(), read: false }, ...arr]);

  const unread = items.filter(n => !n.read).length;

  return <NCtx.Provider value={{ items, unread, markRead, markAllRead, remove, clear, push }}>{children}</NCtx.Provider>;
}

export function useNotifications() {
  const c = useContext(NCtx);
  if (!c) throw new Error("useNotifications fora do provider");
  return c;
}

export function relativeTime(t: number) {
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "agora";
  if (m < 60) return `há ${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}
