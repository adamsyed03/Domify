import { motion } from 'motion/react';
import { ChevronDown, Package, PlayCircle, Smartphone, Wifi, Wrench } from 'lucide-react';
import productImage from '../../imports/image-4.png';

const steps = [
  {
    icon: Wrench,
    title: 'Montiraš zvono',
    text: 'Postaviš ga kod ulaznih vrata uz nosač i šrafove iz pakovanja.',
  },
  {
    icon: Wifi,
    title: 'Povežeš na Wi-Fi',
    text: 'Povežeš zvono na kućni Wi-Fi signal kod ulaza.',
  },
  {
    icon: Smartphone,
    title: 'Gledaš preko aplikacije',
    text: 'Kada neko pozvoni, obaveštenje stiže direktno na telefon.',
  },
];

const boxItems = [
  'Pametno video zvono',
  'Nosač',
  'Šrafovi',
  'Uputstvo',
  'USB-C kabl',
  'Zvučnik za utičnicu',
];

const faqs = [
  {
    question: 'Da li radi na iPhone i Android telefonu?',
    answer: 'Da, povezuje se sa aplikacijom na telefonu.',
  },
  {
    question: 'Da li mora da se poveže na Wi-Fi?',
    answer: 'Da, potreban je Wi-Fi signal kod ulaznih vrata.',
  },
  {
    question: 'Da li mogu da pričam sa kurirom?',
    answer: 'Da, zvono ima dvosmerni audio.',
  },
  {
    question: 'Da li radi noću?',
    answer: 'Da, ima noćni vid.',
  },
  {
    question: 'Kako se plaća?',
    answer: 'Plaćanje pouzećem prilikom dostave.',
  },
  {
    question: 'Koliko traje dostava?',
    answer: 'Dostava širom Srbije. Tačan rok dostave dodati ovde.',
  },
];

type ProductSectionProps = {
  onOpenTutorial: () => void;
};

export function ProductSection({ onOpenTutorial }: ProductSectionProps) {
  return (
    <section id="proizvod" className="relative overflow-hidden bg-white py-16 max-md:py-10">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#7fff00]/10 blur-3xl" />
      <div className="absolute bottom-40 left-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#16a34a]">Kako funkcioniše</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-950 md:text-5xl">
              Od montaže do odgovora na telefon u 2 minuta.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
              Domify je napravljen da reši jednostavan problem: da znaš ko je ispred vrata i kada nisi kod kuće.
            </p>
          </motion.div>

          <div className="grid gap-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7fff00]/20 text-[#1a1f2e]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              </motion.article>
            ))}
            <motion.button
              type="button"
              onClick={onOpenTutorial}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.42, delay: 0.24 }}
              className="mx-auto mt-4 inline-flex items-center justify-center gap-4 rounded-full border border-gray-200 bg-gray-950 px-12 py-6 text-2xl font-extrabold text-white shadow-xl shadow-gray-900/15 max-sm:px-8 max-sm:py-4 max-sm:text-xl"
            >
              <PlayCircle className="h-10 w-10 text-[#7fff00] max-sm:h-8 max-sm:w-8" />
              Video tutorijal
            </motion.button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="mx-auto w-full max-w-[420px] rounded-3xl bg-gray-100 p-4 lg:mx-0"
          >
            <img
              src={productImage}
              alt="Domify pametno video zvono i delovi iz pakovanja"
              className="w-full rounded-2xl shadow-xl"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#16a34a]">U pakovanju</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-950">Šta dobijaš u kutiji</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {boxItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                    <Package className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-gray-900">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#16a34a]">FAQ</p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-950">Česta pitanja</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Kratki odgovori na pitanja pre poručivanja.
            </p>
          </div>

          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-950">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
