import { motion } from 'motion/react';
import { ShoppingCart, Play } from 'lucide-react';

export function Hero() {
  return (
    <section id="pocetna" className="relative overflow-hidden bg-[#1a1f2e] text-white py-24 md:py-32">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7fff00]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Pametno Video Zvono
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[#7fff00] inline-block"
              >
                za Vaš Dom
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            >
              Vidite ko je na vratima. Bilo gde, bilo kada. HD video kvalitet sa dvosmjernom komunikacijom.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7fff00] text-[#1a1f2e] px-8 py-4 rounded-full hover:bg-[#6eee00] transition-colors font-semibold inline-flex items-center gap-2 shadow-lg shadow-[#7fff00]/20"
              >
                <ShoppingCart className="w-5 h-5" />
                Naruči Sada
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(127, 255, 0, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all font-semibold inline-flex items-center gap-2"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-5 h-5 fill-current" />
                </motion.div>
                Saznaj Više
              </motion.button>
            </motion.div>

            {/* Price Badge with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, type: "spring", stiffness: 200 }}
              className="pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-[#7fff00]/20 border border-[#7fff00]/50 px-6 py-3 rounded-full cursor-default"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-white/60 line-through text-sm mr-3"
                >
                  4.299 RSD
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-[#7fff00] font-bold text-2xl"
                >
                  2.999 RSD
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Floating indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="flex justify-center gap-8 pt-8 text-sm"
            >
              {['✓ Besplatna dostava', '✓ 2 godine garancije', '✓ 30 dana povraćaj novca'].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + i * 0.1 }}
                  className="text-white/70 hidden md:block"
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 pointer-events-none"></div>
    </section>
  );
}
