import { useState } from 'react';
import { motion, MotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { instagramOrderUrl, openInstagramOrder } from '../../lib/instagram';

type HeroProps = {
  scrollProgress: MotionValue<number>;
};

function ScrollReveal({
  children,
  progress,
  range,
  className = '',
  interactive = false,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  interactive?: boolean;
}) {
  const [isActive, setIsActive] = useState(progress.get() >= range[1]);
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [36, 0]);
  const scale = useTransform(progress, range, [0.98, 1]);

  useMotionValueEvent(progress, 'change', (latest) => {
    setIsActive(latest >= range[1]);
  });

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents: interactive && isActive ? 'auto' : 'none' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero({ scrollProgress }: HeroProps) {
  const underlineScale = useTransform(scrollProgress, [0.04, 0.14], [0, 1]);
  const bottomFadeOpacity = useTransform(scrollProgress, [0.58, 0.9], [0, 1]);

  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden text-white">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#7fff00]/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[72vh] max-w-4xl flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center space-y-6 md:space-y-8">
            <ScrollReveal
              progress={scrollProgress}
              range={[0, 0.12]}
              className="w-full"
            >
              <h1 className="text-4xl font-extrabold leading-tight drop-shadow-2xl md:text-6xl lg:text-7xl">
                Pametno video zvono koje ti pokazuje ko je{' '}
                <span className="relative inline-block pb-3 text-[#7fff00]">
                  ispred vrata
                  <motion.span
                    style={{ scaleX: underlineScale }}
                    className="absolute bottom-0 left-0 right-0 h-1 origin-left rounded-full bg-[#7fff00]"
                  />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal
              progress={scrollProgress}
              range={[0.42, 0.62]}
              className="mx-auto w-full max-w-3xl"
              interactive
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl border border-[#7fff00]/60 bg-black/35 px-6 py-4 shadow-2xl backdrop-blur-md"
                >
                  <div className="text-3xl font-extrabold text-[#7fff00]">2.999 RSD</div>
                  <div className="mt-2 text-sm font-semibold text-white/85">
                    Spremno za slanje · Dostava širom Srbije · Plaćanje pouzećem
                  </div>
                </motion.div>

                <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center">
                  <motion.a
                    href={instagramOrderUrl}
                    onClick={(event) => {
                      event.preventDefault();
                      openInstagramOrder();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7fff00] px-8 py-4 font-bold text-[#1a1f2e] shadow-lg shadow-[#7fff00]/20 transition-colors hover:bg-[#6eee00] sm:w-auto"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Poruči odmah
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,8,18,0.18)_48%,rgba(6,8,18,0.72)_100%)]" />
      <motion.div
        style={{ opacity: bottomFadeOpacity }}
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[31vh] bg-gradient-to-b from-transparent via-[#07111f]/82 to-[#07111f]"
      />
    </section>
  );
}
