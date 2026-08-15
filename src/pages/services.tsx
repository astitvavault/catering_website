import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { services } from 'virtual:content';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const initial =
    direction === 'left' ? { opacity: 0, x: -28 }
    : direction === 'right' ? { opacity: 0, x: 28 }
    : { opacity: 0, y: 22 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Tracks open/closed state per event card by index
function useOpenStates(count: number) {
  const [states, setStates] = useState<boolean[]>(() => Array(count).fill(false));
  const toggle = (i: number) =>
    setStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  return { states, toggle };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const site = 'https://swaadcatering.com';
  const url = `${site}/services`;
  const { states: eventOpen, toggle: toggleEvent } = useOpenStates(services.eventTypes.events.length);

  return (
    <>
      <Helmet>
        <title>Our Services — SWAAD Catering Services</title>
        <meta
          name="description"
          content="SWAAD Catering offers full-service catering for weddings, corporate events, birthdays, festivals, and outdoor events. Live stations, BBQ & tandoor, grand buffets, authentic Indian and Hakka Chinese cuisine."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Our Services — SWAAD Catering Services" />
        <meta property="og:description" content="Full-service catering for every occasion — weddings, corporate, birthdays, festivals, and more." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          name: 'Our Services — SWAAD Catering Services',
          url,
          isPartOf: { '@id': `${site}/#website` },
          about: { '@id': `${site}/#organization` },
        })}</script>
      </Helmet>

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '52vh' }}>
          <img
            src="/airo-assets/images/pages/services/hero"
            alt="SWAAD Catering professional event setup"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={800}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(26,10,10,0.55) 0%, rgba(107,26,42,0.45) 50%, rgba(26,10,10,0.85) 100%)' }} />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' as const }}>
              <div className="flex items-center gap-4 justify-center mb-5">
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                  {services.hero.eyebrow}
                </span>
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
              </div>
              <h1 className="mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.15 }}>
                {services.hero.headline}
              </h1>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1rem', color: 'rgba(245,237,216,0.75)', lineHeight: 1.8, fontWeight: 300, maxWidth: '38rem', margin: '0 auto' }}>
                {services.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── EVENT TYPES ───────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#0D0505' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                    {services.eventTypes.eyebrow}
                  </span>
                  <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                  {services.eventTypes.headline}
                </h2>
                <p className="mt-4 mx-auto max-w-xl" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.9rem', color: 'rgba(245,237,216,0.55)', lineHeight: 1.8, fontWeight: 300 }}>
                  {services.eventTypes.intro}
                </p>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-6">
              {services.eventTypes.events.map((event, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' as const }}
                    className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border"
                    style={{ borderColor: 'rgba(201,168,76,0.15)' }}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`} style={{ minHeight: '280px' }}>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                        width={800}
                        height={500}
                      />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(26,10,10,0.35), transparent)' }} />
                      <div className="absolute top-4 left-4 px-3 py-1.5" style={{ background: '#C9A84C' }}>
                        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', color: '#1A0A0A', textTransform: 'uppercase' as const }}>
                          {event.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col justify-center p-8 lg:p-10 ${isEven ? 'lg:order-2' : 'lg:order-1'}`} style={{ background: '#1A0A0A' }}>
                      <h3 className="mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                        {event.title}
                      </h3>
                      <p className="mb-5" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.88rem', color: 'rgba(245,237,216,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
                        {event.description}
                      </p>
                      <button
                        onClick={() => toggleEvent(i)}
                        className="flex items-center gap-2 transition-opacity hover:opacity-80"
                        style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', color: '#C9A84C', textTransform: 'uppercase' as const, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        {eventOpen[i] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {eventOpen[i] ? "Hide Details" : "What's Included"}
                      </button>
                      <AnimatePresence>
                        {eventOpen[i] && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' as const }}
                            className="overflow-hidden mt-4 flex flex-col gap-2"
                          >
                            {event.highlights.map((h, hi) => (
                              <li key={hi} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: '#C9A84C' }} />
                                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.8rem', color: 'rgba(245,237,216,0.7)', fontWeight: 300 }}>
                                  {h}
                                </span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FOOD EXPERIENCES ──────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#F5EDD8' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                    {services.experiences.eyebrow}
                  </span>
                  <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#1A0A0A', lineHeight: 1.2 }}>
                  {services.experiences.headline}
                </h2>
                <p className="mt-4 mx-auto max-w-xl" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.9rem', color: '#6B4C3B', lineHeight: 1.8, fontWeight: 300 }}>
                  {services.experiences.intro}
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.experiences.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' as const }}
                  className="overflow-hidden border group"
                  style={{ borderColor: 'rgba(26,10,10,0.12)', background: '#1A0A0A' }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={600}
                      height={338}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(26,10,10,0.7) 100%)' }} />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    <p className="mb-5" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.82rem', color: 'rgba(245,237,216,0.6)', lineHeight: 1.8, fontWeight: 300 }}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((ex, ei) => (
                        <span
                          key={ei}
                          className="px-3 py-1"
                          style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUISINE OPTIONS ───────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#6B1A2A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                    {services.cuisines.eyebrow}
                  </span>
                  <div className="w-8 h-px" style={{ background: 'rgba(201,168,76,0.5)' }} />
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                  {services.cuisines.headline}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FadeIn direction="left">
                <div className="p-8 lg:p-10 h-full" style={{ background: 'rgba(26,10,10,0.5)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <span style={{ fontSize: '1.2rem' }}>🍛</span>
                  </div>
                  <h3 className="mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                    {services.cuisines.indian.title}
                  </h3>
                  <p className="mb-6" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: 'rgba(245,237,216,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
                    {services.cuisines.indian.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    {services.cuisines.indian.categories.map((cat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: '#C9A84C' }} />
                        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.8rem', color: 'rgba(245,237,216,0.7)', fontWeight: 400 }}>{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.1}>
                <div className="p-8 lg:p-10 h-full" style={{ background: 'rgba(26,10,10,0.5)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
                    <span style={{ fontSize: '1.2rem' }}>🥢</span>
                  </div>
                  <h3 className="mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                    {services.cuisines.chinese.title}
                  </h3>
                  <p className="mb-6" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: 'rgba(245,237,216,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
                    {services.cuisines.chinese.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    {services.cuisines.chinese.categories.map((cat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: '#C9A84C' }} />
                        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.8rem', color: 'rgba(245,237,216,0.7)', fontWeight: 400 }}>{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CORPORATE SOLUTIONS ───────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#F5EDD8' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
              <FadeIn direction="left">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                    <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                      {services.corporate.eyebrow}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, color: '#1A0A0A', lineHeight: 1.2 }}>
                    {services.corporate.headline}
                  </h2>
                  <p className="mt-6" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.92rem', color: '#4A3728', lineHeight: 1.9, fontWeight: 300 }}>
                    {services.corporate.body}
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.corporate.features.map((feat, i) => (
                    <motion.div
                      key={feat.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const }}
                      className="p-6 border"
                      style={{ borderColor: 'rgba(107,26,42,0.15)', background: 'rgba(107,26,42,0.03)' }}
                    >
                      <div className="w-8 h-0.5 mb-4" style={{ background: '#C9A84C' }} />
                      <h4 className="mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 600, color: '#1A0A0A', lineHeight: 1.3 }}>
                        {feat.title}
                      </h4>
                      <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.78rem', color: '#6B4C3B', lineHeight: 1.75, fontWeight: 300 }}>
                        {feat.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-24" style={{ background: '#1A0A0A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex items-center gap-4 justify-center mb-6">
                  <div className="w-12 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="#C9A84C" opacity="0.7">
                    <path d="M5 0L6 3.8H10L7 6.2L8 10L5 7.5L2 10L3 6.2L0 3.8H4L5 0Z" />
                  </svg>
                  <div className="w-12 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
                </div>
                <h2 className="mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                  {services.cta.headline}
                </h2>
                <p className="mb-10" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.95rem', color: 'rgba(245,237,216,0.65)', lineHeight: 1.8, fontWeight: 300 }}>
                  {services.cta.subheading}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#1A0A0A', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.12em' }}
                  >
                    {services.cta.button}
                  </Link>
                  <Link
                    to="/menu"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                    style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.12em' }}
                  >
                    View Our Menu
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}
