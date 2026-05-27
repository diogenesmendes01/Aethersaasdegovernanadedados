import { Phone, MessageCircle, Mail, Building2, ArrowUpRight } from "lucide-react";

const cardBase =
  "rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col transition-all";
const iconBox =
  "w-11 h-11 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#6366F1]/20 border border-white/10 flex items-center justify-center mb-4";

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

        <div className="grid sm:grid-cols-3 gap-5">
          <a
            href="https://wa.me/5519994399748"
            target="_blank"
            rel="noopener noreferrer"
            className={`group ${cardBase} hover:bg-white/[0.08] hover:border-[#22D3EE]/30`}
          >
            <div className={iconBox}>
              <MessageCircle className="w-5 h-5 text-[#67E8F9]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">WhatsApp</span>
            <span className="text-white" style={{ fontWeight: 500 }}>+55 19 99439-9748</span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#67E8F9] opacity-0 group-hover:opacity-100 transition-opacity">
              Abrir conversa <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="mailto:contato@aethercorporation.com.br"
            className={`group ${cardBase} hover:bg-white/[0.08] hover:border-[#22D3EE]/30`}
          >
            <div className={iconBox}>
              <Mail className="w-5 h-5 text-[#67E8F9]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">E-mail</span>
            <span className="text-white break-all" style={{ fontWeight: 500 }}>contato@aethercorporation.com.br</span>
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-[#67E8F9] opacity-0 group-hover:opacity-100 transition-opacity">
              Enviar e-mail <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <div className={cardBase}>
            <div className={iconBox}>
              <Building2 className="w-5 h-5 text-[#67E8F9]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">CNPJ</span>
            <span className="text-white" style={{ fontWeight: 500 }}>60.558.323/0001-27</span>
          </div>
        </div>
      </div>
    </section>
  );
}
