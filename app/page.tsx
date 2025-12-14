import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <Hero />

      {/* Visual separator with glowing gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      <div id="about" className="relative bg-zinc-950">
        {/* Polka dot pattern for About section */}
        <div className="absolute inset-0 opacity-[0.1]" style={{
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <About />
      </div>

      {/* Visual separator with glowing gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-80 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />

      <div id="services" className="relative bg-gradient-to-b from-[#0a0f1c] to-[#050511]">
        {/* Stronger grid pattern for Services */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(to right, #00d4ff 1px, transparent 1px), linear-gradient(to bottom, #00d4ff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <Services />
      </div>

      {/* Visual separator with glowing gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      <div id="portfolio" className="relative bg-gradient-to-b from-zinc-950 to-black">
        {/* Diagonal lines pattern for Portfolio */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50% )',
          backgroundSize: '20px 20px'
        }} />
        <Portfolio />
      </div>

      {/* Visual separator with glowing gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-80 shadow-[0_0_15px_rgba(147,51,234,0.5)]" />

      <div id="contact" className="relative bg-gradient-to-t from-black to-[#0a0510]">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
