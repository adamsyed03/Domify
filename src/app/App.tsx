import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShoppingCart, Instagram } from 'lucide-react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import ScrollyCanvas from './components/ScrollyCanvas';
import domifyLogo from '../../Domifylogo.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pastLanding, setPastLanding] = useState(false);

  useEffect(() => {
    const updateHeaderStyle = () => {
      const landing = document.getElementById('pocetna');
      setPastLanding(Boolean(landing && landing.getBoundingClientRect().bottom <= 96));
    };

    updateHeaderStyle();
    window.addEventListener('scroll', updateHeaderStyle, { passive: true });
    window.addEventListener('resize', updateHeaderStyle);

    return () => {
      window.removeEventListener('scroll', updateHeaderStyle);
      window.removeEventListener('resize', updateHeaderStyle);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 text-white transition-colors duration-300 ${
          pastLanding ? 'bg-[#1a1f2e] shadow-lg shadow-black/10' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-24">
            <div className="flex items-center">
              <img src={domifyLogo} alt="Domify" className="h-20 w-auto drop-shadow-2xl md:h-32" />
            </div>

            {/* Desktop Navigation */}
            <div
              className={`hidden items-center gap-8 rounded-full border px-5 py-3 text-sm shadow-2xl backdrop-blur-md transition-colors duration-300 md:flex ${
                pastLanding ? 'border-white/10 bg-white/5' : 'border-white/15 bg-black/15'
              }`}
            >
              <a href="#pocetna" className="hover:text-[#7fff00] transition-colors font-semibold">Početna</a>
              <a href="#karakteristike" className="hover:text-[#7fff00] transition-colors font-semibold">Karakteristike</a>
              <a href="#proizvod" className="hover:text-[#7fff00] transition-colors font-semibold">Proizvod</a>
              <a href="#kontakt" className="hover:text-[#7fff00] transition-colors font-semibold">Kontakt</a>
              <a href="#kontakt" className="rounded-full bg-[#7fff00] px-6 py-2 font-bold text-[#1a1f2e] transition-colors hover:bg-[#6eee00]">
                Kupi Sada
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`rounded-full border p-2 backdrop-blur-md transition-colors duration-300 md:hidden ${
                pastLanding ? 'border-white/10 bg-white/10' : 'border-white/20 bg-black/20'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="space-y-2 rounded-2xl border border-white/15 bg-black/45 px-4 py-4 shadow-2xl backdrop-blur-md md:hidden">
              <a href="#pocetna" className="block py-2 hover:text-[#7fff00] transition-colors font-semibold">Početna</a>
              <a href="#karakteristike" className="block py-2 hover:text-[#7fff00] transition-colors font-semibold">Karakteristike</a>
              <a href="#proizvod" className="block py-2 hover:text-[#7fff00] transition-colors font-semibold">Proizvod</a>
              <a href="#kontakt" className="block py-2 hover:text-[#7fff00] transition-colors font-semibold">Kontakt</a>
              <a href="#kontakt" className="block text-center w-full bg-[#7fff00] text-[#1a1f2e] px-6 py-2 rounded-full hover:bg-[#6eee00] transition-colors font-bold">
                Kupi Sada
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <ScrollyCanvas>
        {(scrollProgress) => <Hero scrollProgress={scrollProgress} />}
      </ScrollyCanvas>
      <Features />
      <ProductSection />

      {/* CTA Section */}
      <section className="bg-[#1a1f2e] text-white py-16 md:py-20 relative overflow-hidden max-md:py-10">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#7fff00]/5 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-md:px-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold mb-6 max-md:mb-3"
          >
            Zaštitite Svoj Dom Danas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-white/80 max-md:mb-5 max-md:text-sm"
          >
            Pridružite se hiljadama zadovoljnih korisnika koji su unapredili sigurnost svog doma.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-md:gap-3"
          >
            <motion.a
              href="https://ig.me/m/domify_rs"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto justify-center bg-[#7fff00] text-[#1a1f2e] px-8 py-3 rounded-full hover:bg-[#6eee00] transition-colors font-bold inline-flex items-center gap-2 shadow-lg shadow-[#7fff00]/20 max-md:w-auto max-md:px-6 max-md:py-2.5 max-md:text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              Naruči za 2.999 RSD
            </motion.a>
            <motion.a
              href="https://www.instagram.com/domify_rs/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto justify-center border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors font-bold inline-flex items-center gap-2 max-md:w-auto max-md:px-6 max-md:py-2.5 max-md:text-sm"
            >
              <Instagram className="w-5 h-5" />
              @domify_rs
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
