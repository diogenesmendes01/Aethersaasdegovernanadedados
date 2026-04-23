import { useState } from "react";
import { Bell, Globe, Lock, Palette, Zap, Trash2 } from "lucide-react";

const tabs = [
  { id: "general", label: "Geral", icon: Globe },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "security", label: "Segurança", icon: Lock },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "integrations", label: "Integrações", icon: Zap },
];

export default function Settings() {
  const [tab, setTab] = useState("general");
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-white tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 600 }}>Configurações</h1>
      <p className="text-sm text-slate-400 mb-8">Personalize a plataforma de acordo com seu fluxo de trabalho.</p>

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        <nav className="space-y-1">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                active ? "bg-gradient-to-r from-[#22D3EE]/15 to-transparent text-white border border-[#22D3EE]/20" : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}>
                <Icon className={`w-4 h-4 ${active ? "text-[#67E8F9]" : ""}`} /> {t.label}
              </button>
            );
          })}
        </nav>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          {tab === "general" && <General />}
          {tab === "notifications" && <Notifications />}
          {tab === "security" && <Security />}
          {tab === "appearance" && <Appearance />}
          {tab === "integrations" && <Integrations />}
        </div>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: any) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{desc}</p>
      {children}
    </div>
  );
}

function Toggle({ label, desc, defaultChecked = false }: { label: string; desc?: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
      <div className="pr-4">
        <p className="text-sm text-white">{label}</p>
        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
      </div>
      <button onClick={() => setOn(o => !o)} className={`w-10 h-6 rounded-full flex-shrink-0 relative transition-all ${on ? "bg-gradient-to-r from-[#22D3EE] to-[#6366F1] shadow-[0_0_12px_rgba(34,211,238,0.4)]" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function General() {
  return (
    <>
      <Section title="Organização" desc="Informações da sua workspace Aether.">
        <div className="grid md:grid-cols-2 gap-4">
          <TextRow label="Nome da organização" defaultValue="Aether Corp" />
          <TextRow label="Domínio" defaultValue="aether.com.br" />
          <TextRow label="Região de dados" defaultValue="Brasil (São Paulo)" disabled />
          <TextRow label="Fuso horário" defaultValue="GMT-3 São Paulo" />
        </div>
      </Section>
      <Section title="Idioma" desc="Altere o idioma da interface.">
        <select className="w-full md:w-80 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-[#22D3EE]/50">
          {["Português (Brasil)", "English (US)", "Español"].map(o => <option key={o} className="bg-[#0F172A]">{o}</option>)}
        </select>
      </Section>
    </>
  );
}

function Notifications() {
  return (
    <Section title="Notificações" desc="Escolha como e quando receber alertas.">
      <Toggle label="Email · Incidentes críticos" desc="Alertas de breach e notificações à ANPD" defaultChecked />
      <Toggle label="Email · Novos titulares" desc="Novas solicitações de direitos do titular" defaultChecked />
      <Toggle label="Slack · Risk Heatmap" desc="Quando um risco crítico é detectado" />
      <Toggle label="Resumo semanal" desc="Relatório executivo todas as segundas" defaultChecked />
      <Toggle label="Aether Copilot insights" desc="Recomendações automáticas por IA" defaultChecked />
    </Section>
  );
}

function Security() {
  return (
    <>
      <Section title="Autenticação" desc="Proteja sua conta com múltiplos fatores.">
        <Toggle label="Autenticação em dois fatores (2FA)" desc="Recomendado via app autenticador" defaultChecked />
        <Toggle label="Login via SSO SAML" desc="Integrado com seu IdP corporativo" defaultChecked />
        <Toggle label="Bloquear após 5 tentativas falhas" />
      </Section>
      <Section title="Sessões" desc="Dispositivos que acessaram sua conta recentemente.">
        <div className="space-y-2">
          {[
            { d: "MacBook Pro · Chrome", loc: "São Paulo, BR", now: true },
            { d: "iPhone 15 · Safari", loc: "São Paulo, BR", now: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02]">
              <div>
                <p className="text-sm text-white">{s.d}</p>
                <p className="text-xs text-slate-400">{s.loc} · {s.now ? "ativo agora" : "há 2 dias"}</p>
              </div>
              {s.now ? <span className="text-xs text-[#10B981]">Este dispositivo</span> : <button className="text-xs text-red-400 hover:text-red-300">Revogar</button>}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Zona de risco" desc="Ações irreversíveis.">
        <button className="px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Excluir conta
        </button>
      </Section>
    </>
  );
}

function Appearance() {
  const [theme, setTheme] = useState("dark");
  return (
    <Section title="Tema" desc="Dark mode é o padrão enterprise da Aether.">
      <div className="grid grid-cols-3 gap-3 max-w-lg">
        {[
          { id: "dark", label: "Dark", bg: "linear-gradient(135deg, #0F172A, #1E2A44)" },
          { id: "midnight", label: "Midnight", bg: "linear-gradient(135deg, #020617, #0F172A)" },
          { id: "system", label: "Sistema", bg: "linear-gradient(135deg, #0F172A 50%, #F1F5F9 50%)" },
        ].map(t => (
          <button key={t.id} onClick={() => setTheme(t.id)} className={`p-3 rounded-xl border transition-all ${theme === t.id ? "border-[#22D3EE]/50 shadow-[0_0_16px_rgba(34,211,238,0.3)]" : "border-white/10 hover:border-white/20"}`}>
            <div className="h-16 rounded-lg mb-2" style={{ background: t.bg }} />
            <span className="text-xs text-white">{t.label}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Integrations() {
  const items = [
    { n: "Slack", d: "Notificações no canal #compliance", on: true },
    { n: "Google Workspace", d: "Descoberta em Drive & Gmail", on: true },
    { n: "AWS", d: "Scan de S3, RDS e Redshift", on: true },
    { n: "Snowflake", d: "Classificação de warehouses", on: false },
    { n: "Splunk SIEM", d: "Envio de logs de auditoria", on: false },
  ];
  return (
    <Section title="Integrações" desc="Conecte o Aether ao seu ecossistema enterprise.">
      <div className="space-y-2">
        {items.map(i => (
          <div key={i.n} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22D3EE]/20 to-[#6366F1]/20 border border-white/10 flex items-center justify-center text-sm text-[#67E8F9]" style={{ fontWeight: 600 }}>
                {i.n[0]}
              </div>
              <div>
                <p className="text-sm text-white" style={{ fontWeight: 500 }}>{i.n}</p>
                <p className="text-xs text-slate-400">{i.d}</p>
              </div>
            </div>
            <button className={`px-3 py-1.5 rounded-lg text-xs ${i.on ? "border border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]" : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}>
              {i.on ? "Conectado" : "Conectar"}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TextRow({ label, defaultValue, disabled }: { label: string; defaultValue: string; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs text-slate-400 mb-1.5">{label}</span>
      <input defaultValue={defaultValue} disabled={disabled} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-[#22D3EE]/50 disabled:opacity-60" />
    </label>
  );
}
