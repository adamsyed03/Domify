import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1f2e] text-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#7fff00]"></div>
              <span className="text-xl tracking-wider uppercase">SmartDzvono</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#pocetna" className="hover:text-[#7fff00] transition-colors">Početna</a>
              <a href="#karakteristike" className="hover:text-[#7fff00] transition-colors">Karakteristike</a>
              <a href="#proizvod" className="hover:text-[#7fff00] transition-colors">Proizvod</a>
              <a href="#kontakt" className="hover:text-[#7fff00] transition-colors">Kontakt</a>
              <button className="bg-[#7fff00] text-[#1a1f2e] px-6 py-2 rounded-full hover:bg-[#6eee00] transition-colors font-medium">
                Kupi Sada
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-white/10">
              <a href="#pocetna" className="block py-2 hover:text-[#7fff00] transition-colors">Početna</a>
              <a href="#karakteristike" className="block py-2 hover:text-[#7fff00] transition-colors">Karakteristike</a>
              <a href="#proizvod" className="block py-2 hover:text-[#7fff00] transition-colors">Proizvod</a>
              <a href="#kontakt" className="block py-2 hover:text-[#7fff00] transition-colors">Kontakt</a>
              <button className="w-full bg-[#7fff00] text-[#1a1f2e] px-6 py-2 rounded-full hover:bg-[#6eee00] transition-colors font-medium">
                Kupi Sada
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <Hero />
      <Features />
      <ProductSection />

      {/* CTA Section */}
      <section className="bg-[#1a1f2e] text-white py-20 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#7fff00]/5 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Zaštitite Svoj Dom Danas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg mb-8 max-w-2xl mx-auto text-white/80"
          >
            Pridružite se hiljadama zadovoljnih korisnika koji su unapredili sigurnost svog doma.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#7fff00] text-[#1a1f2e] px-8 py-3 rounded-full hover:bg-[#6eee00] transition-colors font-medium inline-flex items-center gap-2 shadow-lg shadow-[#7fff00]/20"
            >
              <ShoppingCart className="w-5 h-5" />
              Naruči za 2.999 RSD
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors font-medium inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Kontaktirajte Nas
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}