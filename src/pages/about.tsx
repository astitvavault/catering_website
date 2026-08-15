import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Flame, Leaf, Users, Star, Heart, Award } from 'lucide-react';
import { about } from 'virtual:content';

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
    direction === 'left' ? { opacity: 0, x: -32 }
    : direction === 'right' ? { opacity: 0, x: 32 }
    : { opacity: 0, y: 24 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldLine() {
  return <div className="w-8 h-px" style={{ background: '#C9A84C' }} />;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <GoldLine />
      <span
        style={{
          fontFamily: 'Raleway, sans-serif',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: '#C9A84C',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
    </div>
  );
}

const ICON_MAP: Record<string, React.ElementType> = {
  flame: Flame,
  leaf: Leaf,
  users: Users,
  star: Star,
  heart: Heart,
  award: Award,
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const site = 'https://swaadcatering.com';
  const url = `${site}/about`;

  return (
    <>
      <Helmet>
        <title>About Us — SWAAD Catering Services</title>
        <meta
          name="description"
          content="Learn about SWAAD Catering — our passion for authentic Indian and Hakka Chinese cuisine, our professional team, premium ingredients, and commitment to creating memorable dining experiences."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="About Us — SWAAD Catering Services" />
        <meta property="og:description" content="Crafted with passion, served with pride. Discover the SWAAD story." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${url}#webpage`,
          name: 'About SWAAD Catering Services',
          url,
          isPartOf: { '@id': `${site}/#website` },
          about: { '@id': `${site}/#organization` },
        })}</script>
      </Helmet>

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '55vh' }}>
          <img
            src="/airo-assets/images/pages/about/hero"
            alt="SWAAD Catering team preparing authentic Indian cuisine"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={900}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(26,10,10,0.55) 0%, rgba(107,26,42,0.45) 50%, rgba(26,10,10,0.85) 100%)' }}
          />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' as const }}
            >
              <div className="flex items-center gap-4 justify-center mb-5">
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
                <span
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    color: '#C9A84C',
                    textTransform: 'uppercase',
                  }}
                >
                  {about.hero.eyebrow}
                </span>
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
              </div>
              <h1
                className="mb-5"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontWeight: 600,
                  color: '#F5EDD8',
                  lineHeight: 1.15,
                }}
              >
                {about.hero.headline}
              </h1>
              <p
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '1rem',
                  color: 'rgba(245,237,216,0.75)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                  maxWidth: '36rem',
                  margin: '0 auto',
                }}
              >
                {about.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
        <section style={{ background: '#6B1A2A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                  className="text-center py-10 px-6"
                >
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 600,
                      color: '#C9A84C',
                      lineHeight: 1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {stat.number}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: 'rgba(245,237,216,0.65)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR STORY ─────────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#F5EDD8' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Image stack */}
              <FadeIn direction="left">
                <div className="relative">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img
                      src="/airo-assets/images/pages/about/story-chef"
                      alt="SWAAD head chef preparing authentic Indian cuisine"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={600}
                      height={800}
                    />
                  </div>
                  {/* Floating accent image */}
                  <div
                    className="absolute -bottom-8 -right-8 w-40 h-40 overflow-hidden border-4"
                    style={{ borderColor: '#F5EDD8' }}
                  >
                    <img
                      src="/airo-assets/images/pages/about/ingredients"
                      alt="Premium spices and ingredients used by SWAAD"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={160}
                      height={160}
                    />
                  </div>
                  {/* Gold ornament */}
                  <div
                    className="absolute -top-4 -left-4 w-16 h-16 flex items-center justify-center"
                    style={{ background: '#C9A84C' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="#1A0A0A">
                      <path d="M14 2L16.5 10H25L18.5 15L21 23L14 18L7 23L9.5 15L3 10H11.5L14 2Z" />
                    </svg>
                  </div>
                </div>
              </FadeIn>

              {/* Text */}
              <FadeIn direction="right" delay={0.1}>
                <div>
                  <Eyebrow>{about.story.eyebrow}</Eyebrow>
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                      fontWeight: 600,
                      color: '#1A0A0A',
                      lineHeight: 1.2,
                    }}
                  >
                    {about.story.headline}
                  </h2>
                  <div className="flex flex-col gap-5">
                    {about.story.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.95rem',
                          color: '#4A3728',
                          lineHeight: 1.9,
                          fontWeight: 300,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── VALUES ────────────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#1A0A0A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <GoldLine />
                  <span
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: '#C9A84C',
                      textTransform: 'uppercase',
                    }}
                  >
                    What Drives Us
                  </span>
                  <GoldLine />
                </div>
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 600,
                    color: '#F5EDD8',
                    lineHeight: 1.2,
                  }}
                >
                  Our Core Values
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.values.map((val, i) => {
                const Icon = ICON_MAP[val.icon] ?? Star;
                return (
                  <motion.div
                    key={val.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: 'easeOut' as const }}
                    className="p-8 border transition-all duration-300 hover:border-yellow-600 group"
                    style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.02)' }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
                    >
                      <Icon size={20} style={{ color: '#C9A84C' }} />
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        color: '#F5EDD8',
                        lineHeight: 1.3,
                      }}
                    >
                      {val.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: '0.82rem',
                        color: 'rgba(245,237,216,0.55)',
                        lineHeight: 1.8,
                        fontWeight: 300,
                      }}
                    >
                      {val.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── VISUAL BREAK ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ height: '380px' }}>
          <img
            src="/airo-assets/images/pages/about/events-setup"
            alt="Elegant SWAAD catering event setup"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={380}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(26,10,10,0.85) 0%, rgba(26,10,10,0.4) 60%, rgba(26,10,10,0.1) 100%)' }}
          />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <FadeIn direction="left">
                <div className="max-w-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <GoldLine />
                    <span
                      style={{
                        fontFamily: 'Raleway, sans-serif',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#C9A84C',
                        textTransform: 'uppercase',
                      }}
                    >
                      {about.promise.eyebrow}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      fontWeight: 400,
                      color: '#F5EDD8',
                      lineHeight: 1.5,
                      fontStyle: 'italic',
                    }}
                  >
                    "{about.promise.headline}"
                  </p>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.82rem',
                      color: 'rgba(245,237,216,0.65)',
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >
                    {about.promise.body}
                  </p>
                  <p
                    className="mt-5"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1rem',
                      color: '#C9A84C',
                      fontStyle: 'italic',
                    }}
                  >
                    — {about.promise.signature}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── TEAM PHOTO ────────────────────────────────────────────────────── */}
        <section className="py-24 lg:py-32" style={{ background: '#F5EDD8' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* Text */}
              <FadeIn direction="left">
                <div>
                  <Eyebrow>Meet the Team</Eyebrow>
                  <h2
                    className="mb-6"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                      fontWeight: 600,
                      color: '#1A0A0A',
                      lineHeight: 1.2,
                    }}
                  >
                    Passionate Professionals Behind Every Plate
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.95rem',
                      color: '#4A3728',
                      lineHeight: 1.9,
                      fontWeight: 300,
                    }}
                  >
                    Our team of experienced chefs, event coordinators, and service professionals work in perfect harmony to deliver a seamless catering experience. Each member brings a deep passion for food and hospitality, ensuring that every event is executed with precision and warmth.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                      color: '#1A0A0A',
                      fontFamily: 'Raleway, sans-serif',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {about.cta.button}
                  </Link>
                </div>
              </FadeIn>

              {/* Image */}
              <FadeIn direction="right" delay={0.1}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src="/airo-assets/images/pages/about/team"
                    alt="SWAAD Catering professional team"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {/* Gold corner accent */}
                  <div
                    className="absolute bottom-0 right-0 w-20 h-20"
                    style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(201,168,76,0.4) 50%)' }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-24" style={{ background: '#6B1A2A' }}>
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
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 600,
                    color: '#F5EDD8',
                    lineHeight: 1.2,
                  }}
                >
                  {about.cta.headline}
                </h2>
                <p
                  className="mb-10"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '0.95rem',
                    color: 'rgba(245,237,216,0.7)',
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  {about.cta.subheading}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                      color: '#1A0A0A',
                      fontFamily: 'Raleway, sans-serif',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {about.cta.button}
                  </Link>
                  <Link
                    to="/menu"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                    style={{
                      border: '1px solid rgba(201,168,76,0.4)',
                      color: '#C9A84C',
                      fontFamily: 'Raleway, sans-serif',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Explore Our Menu
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
