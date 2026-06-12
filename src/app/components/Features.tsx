import { motion } from 'motion/react';
import { useState } from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-15.857 21.213 0" />
      </svg>
    ),
    title: 'WiFi povezan',
    description: 'Brza i stabilna WiFi konekcija za trenutan pristup',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'HD Video',
    description: 'Kristalno čista slika u visokoj rezoluciji',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Dvosmerna komunikacija',
    description: 'Razgovarajte sa posetiocima u realnom vremenu',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    title: 'Noćno snimanje',
    description: 'Savršena vidljivost i noću zahvaljujući IR tehnologiji',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-500/10',
    textColor: 'text-indigo-500'
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden group max-md:p-4 max-md:rounded-xl"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Icon with animation */}
      <motion.div
        animate={isHovered ? {
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1.1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.5 }}
        className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 relative max-md:mb-3 max-md:h-11 max-md:w-11`}
      >
        <div className={`${feature.textColor} max-md:[&_svg]:h-6 max-md:[&_svg]:w-6`}>
          {feature.icon}
        </div>

        {/* Pulsing ring animation */}
        <motion.div
          animate={isHovered ? {
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0]
          } : {}}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          className={`absolute inset-0 ${feature.bgColor} rounded-full`}
        />
      </motion.div>

      <motion.h3
        className="text-xl font-semibold mb-2 max-md:text-base max-md:leading-tight"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      >
        {feature.title}
      </motion.h3>
      <p className="text-gray-600 max-md:text-xs max-md:leading-snug">{feature.description}</p>

      {/* Decorative corner element */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={isHovered ? { scale: 1, rotate: 90 } : { scale: 0, rotate: 0 }}
        className="absolute top-4 right-4 w-2 h-2 bg-[#7fff00] rounded-full"
      />
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="karakteristike" className="py-20 bg-gray-50 relative overflow-hidden max-md:py-10">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-64 h-64 bg-[#7fff00]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-md:px-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-md:mb-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mb-2 uppercase tracking-wider text-sm font-medium max-md:text-[11px]"
          >
            Zašto izabrati naše pametno zvono?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-md:text-2xl max-md:mb-2"
          >
            Ekskluzivne Karakteristike
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 max-md:grid-cols-2 max-md:gap-3 max-md:mb-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className="hidden">
            {/* Overlay gradient on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e]/80 to-transparent flex items-end p-8"
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="text-white text-lg font-medium"
              >
                Sve funkcije u jednom uređaju
              </motion.p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
