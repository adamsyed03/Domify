import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShoppingCart, Instagram, Phone, PhoneOff, PlayCircle } from 'lucide-react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import ScrollyCanvas from './components/ScrollyCanvas';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './components/ui/dialog';
import domifyLogo from '../../Domifylogo.png';
import productImage from '../imports/image-4.png';

const tutorialVideoSrc = '/tutorial.mp4';
const initialOrderForm = {
  firstName: '',
  lastName: '',
  houseFlatNumber: '',
  street: '',
  city: '',
  country: 'Srbija',
  phoneNumber: '',
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pastLanding, setPastLanding] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [callPopupDismissed, setCallPopupDismissed] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSubmitError, setOrderSubmitError] = useState('');
  const [orderForm, setOrderForm] = useState(initialOrderForm);

  const openOrderForm = () => {
    setOrderSubmitted(false);
    setOrderSubmitError('');
    setOrderFormOpen(true);
  };

  const handleOrderSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderSubmitting(true);
    setOrderSubmitError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderForm),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Porudžbina nije poslata.');
      }

      setOrderSubmitted(true);
      setOrderForm(initialOrderForm);
    } catch (error) {
      setOrderSubmitError(error instanceof Error ? error.message : 'Porudžbina nije poslata.');
    } finally {
      setOrderSubmitting(false);
    }
  };

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

  useEffect(() => {
    if (callPopupDismissed) return;

    const productSection = document.getElementById('proizvod');
    if (!productSection) return;

    const maybeShowCallPopup = () => {
      if (callPopupDismissed) return;

      const rect = productSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const reachedProductSection = rect.top <= viewportHeight * 0.82 && rect.bottom >= viewportHeight * 0.12;

      if (reachedProductSection) {
        setCallPopupOpen(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCallPopupOpen(true);
        }
      },
      { rootMargin: '0px 0px -35% 0px', threshold: 0 }
    );

    observer.observe(productSection);

    const fallbackTimer = window.setTimeout(maybeShowCallPopup, 600);
    maybeShowCallPopup();
    window.addEventListener('scroll', maybeShowCallPopup, { passive: true });
    window.addEventListener('resize', maybeShowCallPopup);
    window.addEventListener('pageshow', maybeShowCallPopup);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', maybeShowCallPopup);
      window.removeEventListener('resize', maybeShowCallPopup);
      window.removeEventListener('pageshow', maybeShowCallPopup);
    };
  }, [callPopupDismissed]);

  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

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
              <img src={domifyLogo} alt="Domify" className="h-12 w-auto drop-shadow-2xl md:h-20" />
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
              <button
                type="button"
                onClick={() => setTutorialOpen(true)}
                className="font-semibold transition-colors hover:text-[#7fff00]"
              >
                Tutorial
              </button>
              <a href="#kontakt" className="hover:text-[#7fff00] transition-colors font-semibold">Kontakt</a>
              <button
                type="button"
                onClick={openOrderForm}
                className="rounded-full bg-[#7fff00] px-6 py-2 font-bold text-[#1a1f2e] transition-colors hover:bg-[#6eee00]"
              >
                Kupi Sada
              </button>
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
              <button
                type="button"
                onClick={() => {
                  setTutorialOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full py-2 text-left font-semibold transition-colors hover:text-[#7fff00]"
              >
                Tutorial
              </button>
              <a href="#kontakt" className="block py-2 hover:text-[#7fff00] transition-colors font-semibold">Kontakt</a>
              <button
                type="button"
                onClick={() => {
                  openOrderForm();
                  setMobileMenuOpen(false);
                }}
                className="block text-center w-full bg-[#7fff00] text-[#1a1f2e] px-6 py-2 rounded-full hover:bg-[#6eee00] transition-colors font-bold"
              >
                Kupi Sada
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <ScrollyCanvas>
        {(scrollProgress) => <Hero scrollProgress={scrollProgress} onOpenOrderForm={openOrderForm} />}
      </ScrollyCanvas>
      <Features />
      <ProductSection onOpenTutorial={() => setTutorialOpen(true)} />

      {/* CTA Section */}
      <section id="poruci" className="bg-[#1a1f2e] text-white py-16 md:py-20 relative overflow-hidden max-md:py-10">
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
            Unapredite Svoj Dom Danas
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
            <motion.button
              type="button"
              onClick={openOrderForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto justify-center bg-[#7fff00] text-[#1a1f2e] px-8 py-3 rounded-full hover:bg-[#6eee00] transition-colors font-bold inline-flex items-center gap-2 shadow-lg shadow-[#7fff00]/20 max-md:w-auto max-md:px-6 max-md:py-2.5 max-md:text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              Naruči za 2.999 RSD
            </motion.button>
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

      <Dialog open={tutorialOpen} onOpenChange={setTutorialOpen}>
        <DialogContent className="border-0 bg-transparent p-0 shadow-none sm:max-w-[min(92vw,420px)]">
          <DialogTitle className="sr-only">Video tutorijal</DialogTitle>
          <div className="overflow-hidden rounded-2xl bg-gray-950 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-white">
              <PlayCircle className="h-5 w-5 shrink-0 text-[#7fff00]" />
              <span className="text-sm font-extrabold">Video tutorijal</span>
            </div>
            <video
              className="aspect-[9/16] max-h-[80vh] w-full bg-black object-cover"
              aria-label="Domify video tutorijal"
              controls
              playsInline
              preload="metadata"
              poster={productImage}
            >
              <source src={tutorialVideoSrc} type="video/mp4" />
              Tvoj browser ne podržava video reprodukciju.
            </video>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={orderFormOpen} onOpenChange={setOrderFormOpen}>
        <DialogContent className="max-h-[94vh] overflow-y-auto border-0 bg-white p-0 text-gray-950 shadow-2xl max-sm:w-[calc(100vw-1.25rem)] max-sm:max-w-none max-sm:rounded-2xl sm:max-w-[560px]">
          <div className="flex items-center gap-3 bg-[#1a1f2e] px-5 py-4 pr-12 text-white sm:gap-4 sm:px-6 sm:py-5 sm:pr-14">
            <img src={domifyLogo} alt="Domify" className="h-10 w-auto shrink-0 sm:h-14" />
            <div className="min-w-0">
              <DialogTitle className="text-xl font-extrabold leading-tight sm:text-2xl">Porudžbina</DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-5 text-white/75">
                Unesite podatke za dostavu. Plaćanje je pouzećem.
            </DialogDescription>
            </div>
          </div>

          {orderSubmitted ? (
            <div className="px-6 py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7fff00] text-2xl font-extrabold text-[#1a1f2e]">
                OK
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-gray-950">Hvala na porudžbini!</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Vaši podaci su uneti. Kontaktiraćemo vas uskoro radi potvrde porudžbine.
              </p>
              <button
                type="button"
                onClick={() => setOrderFormOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1a1f2e] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#283247]"
              >
                Zatvori
              </button>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="grid gap-4 px-5 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="grid gap-2 text-sm font-bold text-gray-800">
                  Ime
                  <input
                    type="text"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    value={orderForm.firstName}
                    onChange={(event) => setOrderForm({ ...orderForm, firstName: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-gray-800">
                  Prezime
                  <input
                    type="text"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    value={orderForm.lastName}
                    onChange={(event) => setOrderForm({ ...orderForm, lastName: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-[0.72fr_1.28fr] sm:gap-4">
                <label className="grid gap-2 text-sm font-bold text-gray-800">
                  Broj kuće/stana
                  <input
                    type="text"
                    name="houseFlatNumber"
                    required
                    autoComplete="address-line2"
                    value={orderForm.houseFlatNumber}
                    onChange={(event) => setOrderForm({ ...orderForm, houseFlatNumber: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-gray-800">
                  Ulica
                  <input
                    type="text"
                    name="street"
                    required
                    autoComplete="address-line1"
                    value={orderForm.street}
                    onChange={(event) => setOrderForm({ ...orderForm, street: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="grid gap-2 text-sm font-bold text-gray-800">
                  Grad
                  <input
                    type="text"
                    name="city"
                    required
                    autoComplete="address-level2"
                    value={orderForm.city}
                    onChange={(event) => setOrderForm({ ...orderForm, city: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-gray-800">
                  Država
                  <input
                    type="text"
                    name="country"
                    required
                    autoComplete="country-name"
                    value={orderForm.country}
                    onChange={(event) => setOrderForm({ ...orderForm, country: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-bold text-gray-800">
                Broj telefona
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    autoComplete="tel"
                    value={orderForm.phoneNumber}
                    onChange={(event) => setOrderForm({ ...orderForm, phoneNumber: event.target.value })}
                    className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-medium text-gray-950 outline-none transition focus:border-[#7fff00] focus:bg-white focus:ring-2 focus:ring-[#7fff00]/30"
                  />
                </label>

              <button
                type="submit"
                disabled={orderSubmitting}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-[#7fff00] px-6 text-base font-extrabold text-[#1a1f2e] shadow-lg shadow-[#7fff00]/20 transition-colors hover:bg-[#6eee00] disabled:cursor-not-allowed disabled:opacity-70 sm:h-14"
              >
                {orderSubmitting ? 'Slanje...' : 'Pošalji porudžbinu'}
              </button>
              {orderSubmitError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {orderSubmitError}
                </p>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>

      {callPopupOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            x: [0, -4, 4, -3, 3, 0],
          }}
          transition={{
            opacity: { duration: 0.25 },
            y: { duration: 0.25 },
            scale: { duration: 0.25 },
            x: { duration: 0.45, repeat: Infinity, repeatDelay: 3 },
          }}
          className="fixed bottom-4 right-4 z-[60] w-[min(92vw,320px)] overflow-hidden rounded-2xl border border-white/15 bg-[#0f172a] text-white shadow-2xl shadow-black/30 max-md:bottom-3 max-md:right-3"
        >
          <button
            type="button"
            onClick={() => {
              setCallPopupDismissed(true);
              setCallPopupOpen(false);
            }}
            aria-label="Zatvori poziv"
            className="absolute right-3 top-3 z-20 rounded-full bg-black/50 p-1.5 text-white backdrop-blur"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative h-52 bg-black">
            <img
              src="/postman.png"
              alt="Domify prikaz poziva sa ulaznih vrata"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/75" />
            <div className="absolute bottom-3 left-3 right-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Domify video zvono</p>
              <p className="mt-1 text-lg font-extrabold leading-tight">Neko je ispred vrata</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4">
            <button
              type="button"
              onClick={() => {
                setCallPopupDismissed(true);
                setCallPopupOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-4 py-3 text-sm font-bold text-white"
            >
              <PhoneOff className="h-4 w-4" />
              Odbij
            </button>
            <button
              type="button"
              onClick={() => {
                setCallPopupDismissed(true);
                setCallPopupOpen(false);
                openOrderForm();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7fff00] px-4 py-3 text-sm font-bold text-[#1a1f2e]"
            >
              <Phone className="h-4 w-4" />
              Odgovori
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
