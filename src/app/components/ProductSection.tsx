import { motion } from 'motion/react';
import { Check, Shield, Smartphone, Bell, Star } from 'lucide-react';
import { useState } from 'react';
import productImage from '../../imports/image-4.png';

export function ProductSection() {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    'Jednostavna instalacija - spremno za 10 minuta',
    'Kompatibilno sa svim pametnim telefonima',
    'Besplatna aplikacija za iOS i Android',
    'Push notifikacije u realnom vremenu',
    'Vodootporno kućište (IP65)',
    'Garantovana podrška 2 godine',
  ];

  return (
    <section id="proizvod" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#7fff00]/5 to-blue-500/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 relative overflow-hidden"
            >
              <motion.img
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                src={productImage}
                alt="Pametno video zvono"
                className="w-full h-auto relative z-10"
              />

              {/* Animated decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 w-64 h-64 bg-[#7fff00]/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              />
            </motion.div>

            {/* Floating badge with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
            >
              -30% POPUST
            </motion.div>

            {/* Rating stars floating element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
              <span className="text-sm font-semibold ml-1">5.0</span>
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 mb-2 uppercase tracking-wider text-sm font-medium"
              >
                Premium Kvalitet
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Pametno Video Zvono
                <br />
                <span className="text-[#7fff00]">Nova Generacija</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-lg"
              >
                Zaštitite svoj dom sa najnovijom tehnologijom. Naše pametno video zvono kombinuje elegantni dizajn sa naprednim funkcijama sigurnosti.
              </motion.p>
            </div>

            {/* Benefits List with staggered animation */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="w-6 h-6 bg-[#7fff00]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  >
                    <Check className="w-4 h-4 text-[#7fff00]" />
                  </motion.div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Price and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
              className="bg-gray-50 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-baseline gap-3">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold text-gray-900"
                >
                  2.999 RSD
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 }}
                  className="text-xl text-gray-400 line-through"
                >
                  4.299 RSD
                </motion.span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#7fff00] text-[#1a1f2e] py-4 rounded-full hover:bg-[#6eee00] transition-colors font-semibold text-lg shadow-lg shadow-[#7fff00]/20"
              >
                Dodaj u Korpu
              </motion.button>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Sigurna kupovina</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Brza dostava</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Smartphone className="w-5 h-5" />
                <span>iOS & Android</span>
              </motion.div>
              <div className="w-px h-6 bg-gray-300"></div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Shield className="w-5 h-5" />
                <span>2 godine garancije</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
