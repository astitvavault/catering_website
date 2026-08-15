import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { home } from 'virtual:content';

// ─── Ornamental Divider ───────────────────────────────────────────────────────
function OrnamentalDivider({ light = false }: { light?: boolean }) {
  const lineColor = light ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.35)';
  return (
    <div className="flex items-center gap-4 w-full py-2">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${lineColor})` }} />
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7L7 0Z" fill="#C9A84C" opacity={light ? '0.45' : '0.7'} />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${lineColor}, transparent)` }} />
    </div>
  );
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children, delay = 0, className = '', direction = 'up',
}: {
  children: React.ReactNode; delay?: number; className?: string; direction?: 'up' | 'left' | 'right';
}) {
  const initial = direction === 'left' ? { opacity: 0, x: -28 } : direction === 'right' ? { opacity: 0, x: 28 } : { opacity: 0, y: 24 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars() {
  return (
    <div className="flex gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#C9A84C">
          <path d="M7 0L8.6 5.2H14L9.7 8.4L11.3 13.6L7 10.4L2.7 13.6L4.3 8.4L0 5.2H5.4L7 0Z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Gold CTA Button ─────────────────────────────────────────────────────────
function GoldButton({ to, children, outline = false, large = false }: { to: string; children: React.ReactNode; outline?: boolean; large?: boolean }) {
  const px = large ? 'px-9 py-4' : 'px-7 py-3.5';
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2.5 ${px} text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105`}
      style={
        outline
          ? { border: '1px solid rgba(245,237,216,0.6)', color: '#F5EDD8', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.14em' }
          : { background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)', color: '#1A0A0A', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.14em' }
      }
    >
      {children}
    </Link>
  );
}

// ─── Section Eyebrow ─────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
      <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
        {children}
      </span>
    </div>
  );
}

function EyebrowCentered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
      <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
      <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
        {children}
      </span>
      <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const site = 'https://swaadcatering.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site}/#website`, name: 'SWAAD Catering Services', url: `${site}/` },
      {
        '@type': 'FoodEstablishment',
        '@id': `${site}/#organization`,
        name: 'SWAAD Catering Services',
        url: `${site}/`,
        description: 'Professional catering services specializing in authentic Indian and Hakka Chinese cuisine for weddings, corporate events, and celebrations.',
        servesCuisine: ['Indian', 'Hakka Chinese'],
      },
      {
        '@type': 'WebPage',
        '@id': `${site}/#webpage`,
        url: `${site}/`,
        name: 'SWAAD Catering Services — Authentic Indian & Hakka Chinese Cuisine',
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
        datePublished: '2026-07-13',
        dateModified: '2026-07-13',
      },
    ],
  };

  const cuisineImages = [
    '/airo-assets/images/pages/home/cuisine-indian',
    '/airo-assets/images/pages/home/cuisine-chinese',
    '/assets/IMG_9243.jpg',
    '/airo-assets/images/pages/home/cuisine-bbq',
    '/airo-assets/images/pages/home/cuisine-vegetarian',
    '/airo-assets/images/pages/home/cuisine-desserts',
  ];

  return (
    <>
      <Helmet>
        <title>SWAAD Catering Services — Authentic Indian & Hakka Chinese Cuisine</title>
        <meta name="description" content="SWAAD Catering Services crafts unforgettable dining experiences for weddings, corporate events, and every celebration. Authentic Indian and Hakka Chinese cuisine with bespoke menus and complete service." />
        <link rel="canonical" href={`${site}/`} />
        <meta property="og:title" content="SWAAD Catering Services — Authentic Indian & Hakka Chinese Cuisine" />
        <meta property="og:description" content="Bespoke catering for weddings, corporate events, and every celebration worth remembering." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: '100vh' }}
          aria-label="Hero section"
        >
          <img
            src="/assets/91mOKMcvHUL._AC_UF894,1000_QL80_.jpg"
            alt="Elegant Indian cuisine catering spread — SWAAD Catering Services"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={1080}
          />
          {/* Rich layered overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(160deg, rgba(26,10,10,0.72) 0%, rgba(107,26,42,0.38) 45%, rgba(26,10,10,0.82) 100%)' }}
          />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,4,4,0.55) 100%)' }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Logo */}
            {/* Ornamental rule */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' as const }}
              className="flex items-center gap-4 justify-center mb-9"
            >
              <div className="w-20 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7))' }} />
              <svg width="9" height="9" viewBox="0 0 10 10" fill="#C9A84C" opacity="0.85">
                <path d="M5 0L6 4H10L7 6.5L8 10L5 7.5L2 10L3 6.5L0 4H4L5 0Z" />
              </svg>
              <div className="w-20 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.7), transparent)' }} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: 'easeOut' as const }}
              className="mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 600,
                color: '#F5EDD8',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              <span>{home.hero.headline}</span>
              <br />
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>{home.hero.headline2}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.6, ease: 'easeOut' as const }}
              className="mx-auto mb-12 max-w-2xl"
              style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)',
                color: 'rgba(245,237,216,0.8)',
                fontWeight: 700,
                lineHeight: 1.9,
                letterSpacing: '0.02em',
              }}
            >
              {home.hero.subheading}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.82, ease: 'easeOut' as const }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <GoldButton to="/contact" large>{home.hero.cta1}</GoldButton>
              <GoldButton to="/services" outline large>{home.hero.cta2}</GoldButton>
            </motion.div>
          </div>

          {/* Founder credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-6 right-6 text-right pointer-events-none"
          >
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)' }}>
              Founded by
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(201,168,76,0.75)', letterSpacing: '0.04em' }}>
              Sanket Sikchi
            </p>
          </motion.div>

        </section>

        {/* ── ABOUT PREVIEW ────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-36" style={{ background: '#F5EDD8' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* Image */}
              <FadeIn direction="left">
                <div className="relative">
                  {/* Offset border frame */}
                  <div className="absolute -top-5 -left-5 w-full h-full" style={{ border: '1px solid rgba(201,168,76,0.28)' }} />
                  <img
                    src="/airo-assets/images/pages/home/about-preview"
                    alt="SWAAD Catering professional chef preparing authentic Indian cuisine"
                    className="relative w-full object-cover"
                    style={{ aspectRatio: '4/5', maxHeight: '600px' }}
                    loading="lazy"
                    width={600}
                    height={750}
                  />
                  {/* Floating badge */}
                  <div
                    className="absolute -bottom-6 -right-6 w-32 h-32 flex flex-col items-center justify-center text-center"
                    style={{ background: '#6B1A2A', boxShadow: '0 8px 40px rgba(107,26,42,0.35)' }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>10+</span>
                    <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.58rem', color: '#F5EDD8', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: '5px', lineHeight: 1.4 }}>Years of<br />Excellence</span>
                  </div>
                </div>
              </FadeIn>

              {/* Text */}
              <FadeIn direction="right" delay={0.15}>
                <div>
                  <Eyebrow>{home.about.eyebrow}</Eyebrow>
                  <h2
                    className="mb-6"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                      fontWeight: 600,
                      color: '#1A0A0A',
                      lineHeight: 1.15,
                    }}
                  >
                    {home.about.headline}
                  </h2>
                  <OrnamentalDivider />
                  <p
                    className="mt-7 mb-9"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.97rem',
                      color: '#4A3728',
                      lineHeight: 2,
                      fontWeight: 300,
                    }}
                  >
                    {home.about.body}
                  </p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 text-sm font-semibold uppercase transition-all duration-300 group"
                    style={{ color: '#6B1A2A', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.12em', fontSize: '0.72rem' }}
                  >
                    <span style={{ borderBottom: '1px solid #C9A84C', paddingBottom: '2px' }}>{home.about.link}</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE SWAAD ─────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#0D0505' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <EyebrowCentered>{home.expertise.eyebrow}</EyebrowCentered>
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    fontWeight: 600,
                    color: '#F5EDD8',
                    lineHeight: 1.2,
                  }}
                >
                  {home.expertise.headline}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {home.expertise.items.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.1}>
                  <motion.div
                    className="p-8 border group h-full flex flex-col"
                    style={{ borderColor: 'rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.025)' }}
                    whileHover={{ borderColor: 'rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.05)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="mb-5 leading-none"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '4rem',
                        fontWeight: 700,
                        color: 'rgba(201,168,76,0.18)',
                        lineHeight: 1,
                        transition: 'color 0.3s',
                      }}
                    >
                      <span className="group-hover:text-yellow-600 transition-colors duration-300" style={{ color: 'rgba(201,168,76,0.18)' }}>
                        {item.number}
                      </span>
                    </div>
                    <div className="w-8 h-px mb-5" style={{ background: 'rgba(201,168,76,0.35)' }} />
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.45rem',
                        fontWeight: 600,
                        color: '#F5EDD8',
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: '0.83rem',
                        color: 'rgba(245,237,216,0.55)',
                        lineHeight: 1.85,
                        fontWeight: 300,
                      }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUISINE CATEGORIES ────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#F5EDD8' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <EyebrowCentered>{home.cuisines.eyebrow}</EyebrowCentered>
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    fontWeight: 600,
                    color: '#1A0A0A',
                    lineHeight: 1.2,
                  }}
                >
                  {home.cuisines.headline}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {home.cuisines.items.map((cuisine, i) => (
                <FadeIn key={cuisine.id} delay={i * 0.08}>
                  <motion.div
                    className="group overflow-hidden"
                    style={{ border: '1px solid rgba(201,168,76,0.2)', background: '#fff' }}
                    whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(107,26,42,0.12)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' as const }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={cuisineImages[i]}
                        alt={cuisine.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        width={400}
                        height={300}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: 'rgba(107,26,42,0.15)' }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="w-7 h-px mb-4" style={{ background: '#C9A84C' }} />
                      <h3
                        className="mb-2.5"
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.35rem',
                          fontWeight: 600,
                          color: '#1A0A0A',
                          lineHeight: 1.2,
                        }}
                      >
                        {cuisine.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.82rem',
                          color: '#6B5B45',
                          lineHeight: 1.75,
                          fontWeight: 300,
                        }}
                      >
                        {cuisine.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2}>
              <div className="text-center mt-12">
                <GoldButton to="/menu">Explore the Full Menu</GoldButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#6B1A2A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <EyebrowCentered>{home.testimonials.eyebrow}</EyebrowCentered>
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    fontWeight: 600,
                    color: '#F5EDD8',
                    lineHeight: 1.2,
                  }}
                >
                  {home.testimonials.headline}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {home.testimonials.items.map((t, i) => (
                <FadeIn key={t.id} delay={i * 0.12}>
                  <div
                    className="p-8 lg:p-9 flex flex-col h-full"
                    style={{ background: 'rgba(245,237,216,0.05)', border: '1px solid rgba(201,168,76,0.18)' }}
                  >
                    <div
                      className="mb-3 leading-none"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '5rem',
                        color: 'rgba(201,168,76,0.35)',
                        lineHeight: 0.75,
                        fontWeight: 700,
                      }}
                    >
                      "
                    </div>
                    <Stars />
                    <p
                      className="flex-1 mb-7 italic"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.08rem',
                        color: 'rgba(245,237,216,0.88)',
                        lineHeight: 1.85,
                        fontWeight: 400,
                      }}
                    >
                      {t.quote}
                    </p>
                    <div className="pt-5" style={{ borderTop: '1px solid rgba(201,168,76,0.18)' }}>
                      <p
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: '#C9A84C',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {t.name}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.72rem',
                          color: 'rgba(245,237,216,0.45)',
                          marginTop: '3px',
                          fontWeight: 300,
                        }}
                      >
                        {t.event}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING CTA ──────────────────────────────────────────────────── */}
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          <img
            src="/airo-assets/images/pages/home/booking-cta"
            alt="Luxury catering event setup by SWAAD"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={800}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(26,10,10,0.9) 0%, rgba(107,26,42,0.72) 100%)' }}
          />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 justify-center mb-7">
                <div className="w-14 h-px" style={{ background: 'rgba(201,168,76,0.45)' }} />
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#C9A84C" opacity="0.65">
                  <path d="M5 0L6 4H10L7 6.5L8 10L5 7.5L2 10L3 6.5L0 4H4L5 0Z" />
                </svg>
                <div className="w-14 h-px" style={{ background: 'rgba(201,168,76,0.45)' }} />
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  fontWeight: 600,
                  color: '#F5EDD8',
                  lineHeight: 1.15,
                }}
              >
                {home.booking.headline}
              </h2>
              <p
                className="mb-12 mx-auto max-w-xl"
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '0.97rem',
                  color: 'rgba(245,237,216,0.72)',
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}
              >
                {home.booking.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GoldButton to="/contact" large>{home.booking.cta}</GoldButton>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
    </>
  );
}
