import { Phone, Mail, ArrowUpRight } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.738-.979a9.873 9.873 0 0 0 3.736.272l-.001.001zm5.523-3.83c-.151-.094-1.776-.875-2.05-.975-.275-.1-.475-.15-.674.15-.2.3-.775.974-.95 1.174-.175.2-.349.225-.649.075-.3-.15-1.267-.467-2.413-1.488-.892-.795-1.494-1.776-1.669-2.076-.175-.3-.018-.461.13-.611.136-.135.301-.353.452-.528.151-.175.2-.3.3-.5.099-.2.05-.375-.025-.525-.075-.15-.672-1.62-.922-2.218-.243-.583-.49-.504-.673-.513l-.574-.01c-.2 0-.524.075-.799.375s-1.05 1.026-1.05 2.501 1.075 2.9 1.225 3.1c.149.2 2.115 3.23 5.124 4.528.716.31 1.275.494 1.711.633.719.228 1.373.196 1.89.119.576-.086 1.774-.726 2.024-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.349z"/>
    </svg>
  );
}

const cardBase =
  "group rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center text-center transition-all hover:bg-white/[0.08] hover:border-[#22D3EE]/30";
const iconBox =
  "w-11 h-11 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#6366F1]/20 border border-white/10 flex items-center justify-center mb-4";
const hint =
  "mt-3 inline-flex items-center gap-1 text-xs text-[#67E8F9] opacity-0 group-hover:opacity-100 transition-opacity";

export function Contact() {
  return (
    <section id="contato" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/5 mb-6">
            <Phone className="w-3.5 h-3.5 text-[#67E8F9]" />
            <span className="text-xs text-[#67E8F9]">Fale com a gente</span>
          </div>
          <h2
            className="text-white tracking-tight mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1 }}
          >
            Entre em{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">contato</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Nossa equipe responde em horário comercial. Escolha o canal que preferir.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <a href="https://wa.me/5519994399748" target="_blank" rel="noopener noreferrer" className={cardBase}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#25D366] to-[#12A150] flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(37,211,102,0.35)]">
              <WhatsAppIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">WhatsApp</span>
            <span className="text-white" style={{ fontWeight: 500 }}>+55 19 99439-9748</span>
            <span className={hint}>
              Abrir conversa <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a href="mailto:contato@aethercorporation.com.br" className={cardBase}>
            <div className={iconBox}>
              <Mail className="w-5 h-5 text-[#67E8F9]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">E-mail</span>
            <span className="text-white break-all" style={{ fontWeight: 500 }}>contato@aethercorporation.com.br</span>
            <span className={hint}>
              Enviar e-mail <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
