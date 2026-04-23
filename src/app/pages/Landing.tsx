import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Metrics } from "../components/Metrics";
import { Features } from "../components/Features";
import { Copilot } from "../components/Copilot";
import { Pricing } from "../components/Pricing";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(103,232,249,0.25) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="relative">
        <Navbar />
        <Hero />
        <Metrics />
        <Features />
        <Copilot />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
