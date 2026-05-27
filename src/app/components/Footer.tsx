import { Logo } from "./Logo";

export function Footer() {
  const cols = [
    { title: "Produto", links: ["Plataforma", "Aether Copilot", "LGPD Automation", "Integrações", "Segurança"] },
    { title: "Empresa", links: ["Sobre", "Clientes", "Parceiros", "Carreiras", "Imprensa"] },
    { title: "Recursos", links: ["Documentação", "Academia LGPD", "Blog", "Webinars", "Status"] },
    { title: "Legal", links: ["Termos", "Privacidade", "DPA", "Trust Center", "Subprocessors"] },
  ];
  return (
    <footer className="border-t border-white/5 px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-6 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Logo size={32} />
            <span className="text-xl text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Aether</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Ethereal Intelligence. Governança de Dados & LGPD Enterprise com IA proativa.
          </p>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <p className="text-sm text-white mb-4" style={{ fontWeight: 500 }}>{c.title}</p>
            <ul className="space-y-2">
              {c.links.map(l => (
                <li key={l}><a className="text-sm text-slate-400 hover:text-[#67E8F9] transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Aether Technologies. Todos os direitos reservados.</p>
        <p>Hospedado em regiões BR · Conforme LGPD Art. 50/51 · ISO 27701</p>
      </div>
    </footer>
  );
}
