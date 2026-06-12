import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import domifyLogo from '../../../Domifylogo.png';

export function Footer() {
  return (
    <footer id="kontakt" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 max-md:px-3 max-md:py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 max-md:grid-cols-3 max-md:gap-4 max-md:mb-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <img src={domifyLogo} alt="Domify" className="h-24 md:h-32 w-auto max-md:h-16" />
            </div>
            <p className="text-gray-400 mb-4 max-md:text-xs max-md:leading-snug">
              Vaš partner za pametnu sigurnost doma.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/domify_rs/"
                aria-label="Instagram @domify_rs"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7fff00] hover:text-[#1a1f2e] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 max-md:mb-2 max-md:text-sm">Proizvodi</h4>
            <ul className="space-y-2 text-gray-400 max-md:space-y-1 max-md:text-xs">
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Video Zvono</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Pametne Kamere</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Sigurnosni Sistemi</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Aksesoari</motion.a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4 max-md:mb-2 max-md:text-sm">Kontakt</h4>
            <ul className="space-y-3 text-gray-400 max-md:text-xs">
              <li className="flex items-start gap-2 max-md:gap-1.5">
                <Instagram className="w-5 h-5 flex-shrink-0 mt-0.5 max-md:h-4 max-md:w-4" />
                <a href="https://www.instagram.com/domify_rs/" target="_blank" rel="noreferrer" className="hover:text-[#7fff00] transition-colors">
                  Instagram: @domify_rs
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 max-md:pt-5 max-md:text-xs">
          <p>&copy; 2026 Domify. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
