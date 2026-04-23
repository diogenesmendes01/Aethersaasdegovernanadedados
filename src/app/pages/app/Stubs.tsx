function Stub({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-white tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 600 }}>{title}</h1>
      <p className="text-sm text-slate-400 mb-8">{desc}</p>
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/5 text-xs text-[#67E8F9] mb-4">Em construção</div>
        <p className="text-slate-400 max-w-md mx-auto">Esta seção está sendo finalizada. Em breve você verá aqui o módulo completo com dados reais da sua organização.</p>
      </div>
    </div>
  );
}

export function Catalog() { return <Stub title="Catálogo de Dados" desc="Descoberta e classificação de todos os seus repositórios." />; }
export function LGPD() { return <Stub title="LGPD" desc="Consentimento, direitos do titular e DPIA automatizada." />; }
export function Copilot() { return <Stub title="Aether Copilot" desc="Converse com seus dados e receba recomendações da IA." />; }
