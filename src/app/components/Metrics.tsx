const stats = [
  { value: "98%", label: "Redução em tempo de resposta a titulares" },
  { value: "< 2h", label: "Notificação automatizada à ANPD" },
  { value: "10x", label: "Mais rápido que auditoria manual" },
  { value: "2.4M+", label: "Dados classificados por segundo" },
];

export function Metrics() {
  return (
    <section className="py-20 px-6 border-y border-white/5 bg-gradient-to-b from-transparent via-[#1E2A44]/30 to-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              {s.value}
            </p>
            <p className="mt-2 text-sm text-slate-400 max-w-[200px] mx-auto">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
