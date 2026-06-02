import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontakt" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#7fff00]"
              />
              <span className="text-xl tracking-wider uppercase">SmartDzvono</span>
            </div>
            <p className="text-gray-400 mb-4">
              Vaš partner za pametnu sigurnost doma.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7fff00] hover:text-[#1a1f2e] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7fff00] hover:text-[#1a1f2e] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7fff00] hover:text-[#1a1f2e] transition-colors"
              >
                <Twitter className="w-5 h-5" />
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
            <h4 className="font-semibold mb-4">Proizvodi</h4>
            <ul className="space-y-2 text-gray-400">
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Video Zvono</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Pametne Kamere</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Sigurnosni Sistemi</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Aksesoari</motion.a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Podrška</h4>
            <ul className="space-y-2 text-gray-400">
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Uputstvo</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Instalacija</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">FAQ</motion.a></li>
              <li><motion.a whileHover={{ x: 5 }} href="#" className="hover:text-[#7fff00] transition-colors inline-block">Kontakt</motion.a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>+381 11 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>info@smartzvono.rs</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Beograd, Srbija</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2026 SmartDzvono. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
