import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const problemLines = [
  ['Kurir pozvoni.', 'Ti si na poslu.'],
  ['Komšija zvoni.', 'Ti ne čuješ.'],
  ['Neko je ispred vrata.', 'Ti ne znaš ko je.'],
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.72, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="karakteristike" className="relative -mt-px overflow-hidden bg-[#07111f] pb-24 pt-8 text-white md:pb-28 md:pt-10">
      <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#7fff00]/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      <motion.div
        style={{ opacity: bottomFadeOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-white"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#9dff5a]"
        >
          Moderno Rešenje Svakodnevnih Problema
        </motion.p>

        <h2 className="mx-auto max-w-4xl space-y-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {problemLines.map(([firstLine, secondLine], index) => (
            <motion.span
              key={firstLine}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.14 }}
              className="block"
            >
              <span className="block text-white">{firstLine}</span>
              <span className="block text-white/62">{secondLine}</span>
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-[#7fff00]/20 bg-gradient-to-r from-[#7fff00]/16 to-sky-400/12 px-5 py-4 text-base font-bold leading-7 text-white shadow-2xl shadow-[#7fff00]/5 md:text-lg"
        >
          Sa Domify zvonom, dobijaš obaveštenje odmah - vidiš ko je ispred vrata i možeš da odgovoriš direktno sa telefona.
        </motion.p>
      </div>
    </section>
  );
}
