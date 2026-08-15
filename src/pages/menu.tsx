import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { menu } from 'virtual:content';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function VegBadge({ veg }: { veg: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 shrink-0 border"
      style={{ borderColor: veg ? '#22a84a' : '#c0392b', borderRadius: '2px' }}
      title={veg ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ background: veg ? '#22a84a' : '#c0392b' }}
      />
    </span>
  );
}

// ─── Category Tab (chrome only — no content props) ────────────────────────────
function CategoryTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 px-5 py-3 transition-all duration-300 whitespace-nowrap"
      style={{
        borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
        background: active ? 'rgba(201,168,76,0.06)' : 'transparent',
      }}
    >
      {children}
    </button>
  );
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
      style={{
        fontFamily: 'Raleway, sans-serif',
        letterSpacing: '0.1em',
        fontSize: '0.7rem',
        background: active ? 'linear-gradient(135deg, #C9A84C, #E8C96A)' : 'transparent',
        color: active ? '#1A0A0A' : 'rgba(245,237,216,0.6)',
        border: active ? 'none' : '1px solid rgba(201,168,76,0.25)',
      }}
    >
      {label}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeCat, setActiveCat] = useState(0);
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  const site = 'https://swaadcatering.com';
  const url = `${site}/menu`;

  const currentCat = menu.categories[activeCat];

  const filteredItems = currentCat.items.filter((item) => {
    if (vegFilter === 'veg') return item.veg === true;
    if (vegFilter === 'nonveg') return item.veg === false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Our Menu — SWAAD Catering Services</title>
        <meta
          name="description"
          content="Browse SWAAD's catering menu — authentic Indian cuisine, Hakka Chinese, live cooking stations, BBQ & tandoor, desserts, and beverages. Fully customizable for your event."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Our Menu — SWAAD Catering Services" />
        <meta property="og:description" content="Authentic Indian and Hakka Chinese catering menus for weddings, corporate events, and every celebration." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '52vh' }}>
          <img
            src="/airo-assets/images/pages/menu/hero"
            alt="SWAAD Catering authentic Indian food spread"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={800}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(26,10,10,0.6) 0%, rgba(107,26,42,0.5) 50%, rgba(26,10,10,0.8) 100%)' }}
          />
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
            >
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.2em', fontSize: '0.7rem' }}
                >
                  {menu.hero.eyebrow}
                </span>
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
              </div>
              <h1
                className="mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontWeight: 600,
                  color: '#F5EDD8',
                  lineHeight: 1.15,
                }}
              >
                {menu.hero.headline}
              </h1>
              <p
                className="mx-auto max-w-xl"
                style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '0.95rem',
                  color: 'rgba(245,237,216,0.75)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {menu.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MENU SHOWCASE ─────────────────────────────────────────────────── */}
        <section style={{ background: '#0D0505' }} className="pb-24">

          {/* Category Tabs */}
          <div
            className="sticky top-[88px] z-40 overflow-x-auto"
            style={{ background: '#1A0A0A', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
          >
            <div className="flex min-w-max px-4 lg:px-8 lg:justify-center" role="group" aria-label="Menu categories">
              {menu.categories.map((cat, i) => (
                <CategoryTab
                  key={cat.id}
                  active={activeCat === i}
                  onClick={() => { setActiveCat(i); setVegFilter('all'); }}
                >
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      letterSpacing: '0.1em',
                      color: activeCat === i ? '#C9A84C' : 'rgba(245,237,216,0.55)',
                      fontSize: '0.72rem',
                      transition: 'color 0.3s',
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      color: activeCat === i ? '#1A0A0A' : 'rgba(201,168,76,0.5)',
                      background: activeCat === i ? '#C9A84C' : 'transparent',
                      border: activeCat === i ? 'none' : '1px solid rgba(201,168,76,0.25)',
                      transition: 'all 0.3s',
                    }}
                  >
                    {cat.tag}
                  </span>
                </CategoryTab>
              ))}
            </div>
          </div>

          {/* Category Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' as const }}
            >
              <div className="container mx-auto px-4 lg:px-8 pt-14">
                {/* Category Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={currentCat.image}
                      alt={currentCat.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={800}
                      height={450}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(26,10,10,0.3), transparent)' }}
                    />
                    {/* Tag badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5"
                      style={{ background: '#C9A84C' }}
                    >
                      <span
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: '#1A0A0A',
                          textTransform: 'uppercase',
                        }}
                      >
                        {currentCat.tag}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                      <span
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.7rem',
                          letterSpacing: '0.18em',
                          color: '#C9A84C',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        {currentCat.label}
                      </span>
                    </div>
                    <p
                      className="mb-8"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        color: '#F5EDD8',
                        lineHeight: 1.5,
                        fontWeight: 400,
                      }}
                    >
                      {currentCat.description}
                    </p>

                    {/* Veg / Non-Veg filter */}
                    <div className="flex items-center gap-3 flex-wrap" role="group" aria-label="Filter by dietary preference">
                      <span
                        style={{
                          fontFamily: 'Raleway, sans-serif',
                          fontSize: '0.7rem',
                          color: 'rgba(245,237,216,0.4)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Filter:
                      </span>
                      <FilterPill label="All" active={vegFilter === 'all'} onClick={() => setVegFilter('all')} />
                      <FilterPill label="Veg" active={vegFilter === 'veg'} onClick={() => setVegFilter('veg')} />
                      <FilterPill label="Non-Veg" active={vegFilter === 'nonveg'} onClick={() => setVegFilter('nonveg')} />
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-5 mt-5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-4 h-4 border" style={{ borderColor: '#22a84a', borderRadius: '2px' }}>
                          <span className="w-2 h-2 rounded-full" style={{ background: '#22a84a' }} />
                        </span>
                        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.72rem', color: 'rgba(245,237,216,0.5)' }}>Vegetarian</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-4 h-4 border" style={{ borderColor: '#c0392b', borderRadius: '2px' }}>
                          <span className="w-2 h-2 rounded-full" style={{ background: '#c0392b' }} />
                        </span>
                        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.72rem', color: 'rgba(245,237,216,0.5)' }}>Non-Vegetarian</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items Grid */}
                <div className="mb-6">
                  <p
                    className="mb-6 text-center"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '0.72rem',
                      color: 'rgba(245,237,216,0.35)',
                      letterSpacing: '0.08em',
                      fontStyle: 'italic',
                    }}
                  >
                    {menu.filterNote}
                  </p>
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <AnimatePresence>
                      {filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.3, ease: 'easeOut' as const }}
                          className="flex items-start gap-3 p-4 border transition-all duration-300 hover:border-yellow-600"
                          style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.02)' }}
                        >
                          <VegBadge veg={item.veg} />
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-semibold mb-1"
                              style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                fontSize: '1.05rem',
                                color: '#F5EDD8',
                                lineHeight: 1.3,
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              style={{
                                fontFamily: 'Raleway, sans-serif',
                                fontSize: '0.78rem',
                                color: 'rgba(245,237,216,0.55)',
                                lineHeight: 1.6,
                                fontWeight: 300,
                              }}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                  {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: 'rgba(245,237,216,0.4)' }}>
                        No items match this filter in this category.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28" style={{ background: '#6B1A2A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                {/* Ornamental */}
                <div className="flex items-center gap-4 justify-center mb-8">
                  <div className="w-12 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="#C9A84C" opacity="0.7">
                    <path d="M6 0L7.2 4.8H12L8.4 7.8L9.6 12L6 9L2.4 12L3.6 7.8L0 4.8H4.8L6 0Z" />
                  </svg>
                  <div className="w-12 h-px" style={{ background: 'rgba(201,168,76,0.4)' }} />
                </div>

                <h2
                  className="mb-5"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 600,
                    color: '#F5EDD8',
                    lineHeight: 1.2,
                  }}
                >
                  {menu.cta.headline}
                </h2>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '1rem',
                    color: 'rgba(245,237,216,0.75)',
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  {menu.cta.subheading}
                </p>
                <p
                  className="mb-10 text-xs italic"
                  style={{
                    fontFamily: 'Raleway, sans-serif',
                    color: 'rgba(245,237,216,0.4)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {menu.cta.note}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                      color: '#1A0A0A',
                      fontFamily: 'Raleway, sans-serif',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {menu.cta.button}
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
