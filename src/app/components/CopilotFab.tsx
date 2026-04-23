import { Sparkles, X, Send } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "Quais dados sensíveis estão fora da base legal?",
  "Mostre shadow data encontrado esta semana",
  "Qual o risco LGPD no novo projeto de CRM?",
];

export function CopilotFab({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Oi! Sou o Aether Copilot. Em que posso ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");

  const send = (text?: string) => {
    const t = text ?? input;
    if (!t.trim()) return;
    setMsgs(m => [...m, { role: "user", text: t }, { role: "ai", text: "Analisando seus dados... Encontrei 3 datasets relevantes. Deseja que eu gere um plano de mitigação automático?" }]);
    setInput("");
  };

  return (
    <>
      {!open && (
        <button onClick={onToggle} className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-[#0F172A] shadow-[0_0_32px_rgba(34,211,238,0.5)] hover:shadow-[0_0_48px_rgba(34,211,238,0.8)] transition-all" style={{ fontWeight: 600 }}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Aether Copilot</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-40 w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] rounded-2xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#22D3EE]/30 to-[#6366F1]/30 rounded-3xl blur-xl opacity-40 pointer-events-none" />
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0F172A]" />
              </div>
              <div>
                <p className="text-sm text-white" style={{ fontWeight: 500 }}>Aether Copilot</p>
                <p className="text-xs text-[#10B981] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Online</p>
              </div>
            </div>
            <button onClick={onToggle} className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex-1 overflow-y-auto p-5 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-[#6366F1] text-white rounded-br-sm" : "bg-white/5 border border-white/5 text-slate-200 rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {msgs.length <= 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-slate-500 uppercase tracking-widest">Sugestões</p>
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} className="w-full text-left p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#22D3EE]/30 hover:bg-[#22D3EE]/5 text-sm text-slate-300 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative p-4 border-t border-white/5">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-slate-500"
                placeholder="Pergunte sobre seus dados..."
              />
              <button onClick={() => send()} className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#6366F1] flex items-center justify-center">
                <Send className="w-4 h-4 text-[#0F172A]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
