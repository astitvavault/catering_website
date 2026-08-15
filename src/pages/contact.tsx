import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, CheckCircle, AlertCircle } from 'lucide-react';
import { contact } from 'virtual:content';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = 'up', className = '' }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right'; className?: string;
}) {
  const initial = direction === 'left' ? { opacity: 0, x: -28 } : direction === 'right' ? { opacity: 0, x: 28 } : { opacity: 0, y: 22 };
  return (
    <motion.div initial={initial} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' as const }} className={className}>
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', color: '#C9A84C', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.5rem' }}>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(245,237,216,0.04)',
  border: '1px solid rgba(201,168,76,0.2)',
  color: '#F5EDD8',
  fontFamily: 'Raleway, sans-serif',
  fontSize: '0.88rem',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s',
};

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'submitting' | 'success' | 'error';

/** All contact / enquiry emails are delivered here via FormSubmit. */
const CONTACT_INBOX = 'prakhardeep19@gmail.com';

function ContactForm() {
  const [status, setStatus] = useState<FormState>('idle');
  const [fields, setFields] = useState({
    name: '', phone: '', email: '', eventType: '', eventDate: '', guests: '', requirements: '', message: '',
  });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const message = [
      `Event Type: ${fields.eventType}`,
      `Event Date: ${fields.eventDate}`,
      `Number of Guests: ${fields.guests}`,
      `Special Requirements: ${fields.requirements}`,
      '',
      fields.message,
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_INBOX}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          eventType: fields.eventType,
          eventDate: fields.eventDate,
          guests: fields.guests,
          requirements: fields.requirements,
          message,
          _subject: `SWAAD Catering enquiry — ${fields.name}`,
          _replyto: fields.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFields({ name: '', phone: '', email: '', eventType: '', eventDate: '', guests: '', requirements: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center justify-center text-center py-16 px-8">
        <div className="w-16 h-16 flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <CheckCircle size={28} style={{ color: '#C9A84C' }} />
        </div>
        <h3 className="mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 600, color: '#F5EDD8' }}>
          Enquiry Received!
        </h3>
        <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.88rem', color: 'rgba(245,237,216,0.65)', lineHeight: 1.8, fontWeight: 300, maxWidth: '28rem' }}>
          Thank you for reaching out. Our team will review your event details and get back to you within 24 hours with a personalised catering proposal.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-80"
          style={{ border: '1px solid rgba(201,168,76,0.35)', color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.12em', background: 'none', cursor: 'pointer' }}
        >
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form name="contact" onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.82rem', color: 'rgba(245,237,216,0.5)', lineHeight: 1.7, fontWeight: 300 }}>
        {contact.form.subtitle}
      </p>

      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <input required value={fields.name} onChange={set('name')} placeholder="Your full name" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <input required type="tel" value={fields.phone} onChange={set('phone')} placeholder="+1 (416) 000-0000" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
      </div>

      {/* Row 2: Email */}
      <div>
        <Label>Email Address *</Label>
        <input required type="email" value={fields.email} onChange={set('email')} placeholder="your@email.com" style={inputStyle}
          onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
      </div>

      {/* Row 3: Event Type + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Event Type *</Label>
          <select required value={fields.eventType} onChange={set('eventType')}
            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
          >
            <option value="" disabled style={{ background: '#1A0A0A' }}>Select event type</option>
            {contact.form.eventTypes.map((et, i) => (
              <option key={i} value={et} style={{ background: '#1A0A0A' }}>{et}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Event Date</Label>
          <input type="date" value={fields.eventDate} onChange={set('eventDate')} style={{ ...inputStyle, colorScheme: 'dark' }}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
      </div>

      {/* Row 4: Guests + Requirements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Number of Guests</Label>
          <input type="number" min="1" value={fields.guests} onChange={set('guests')} placeholder="e.g. 150" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
        <div>
          <Label>Dietary Requirements</Label>
          <input value={fields.requirements} onChange={set('requirements')} placeholder="e.g. Veg only, Jain, Halal" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
      </div>

      {/* Row 5: Message */}
      <div>
        <Label>Additional Details</Label>
        <textarea value={fields.message} onChange={set('message')} rows={4} placeholder="Tell us more about your event — venue, theme, cuisine preferences, or any special requests…"
          style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
          onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}>
          <AlertCircle size={16} style={{ color: '#f87171', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.8rem', color: '#f87171' }}>
            Something went wrong. Please try again or contact us directly.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#1A0A0A', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.14em', border: 'none', cursor: 'pointer' }}
      >
        {status === 'submitting' ? 'Sending…' : contact.form.submitLabel}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const site = 'https://swaadcatering.com';
  const url = `${site}/contact`;

  return (
    <>
      <Helmet>
        <title>Contact & Book — SWAAD Catering Services</title>
        <meta name="description" content="Request a catering quote from SWAAD Catering. Fill in your event details — wedding, corporate, birthday, or private gathering — and we'll respond within 24 hours." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Contact & Book — SWAAD Catering Services" />
        <meta property="og:description" content="Request a personalised catering proposal within 24 hours." />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${url}#webpage`,
          name: 'Contact SWAAD Catering Services',
          url,
          isPartOf: { '@id': `${site}/#website` },
          about: { '@id': `${site}/#organization` },
        })}</script>
      </Helmet>

      <main>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '46vh' }}>
          <img
            src="/airo-assets/images/pages/contact/hero"
            alt="SWAAD Catering elegant food presentation"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={700}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(26,10,10,0.55) 0%, rgba(107,26,42,0.45) 50%, rgba(26,10,10,0.88) 100%)' }} />
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' as const }}>
              <div className="flex items-center gap-4 justify-center mb-5">
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                  {contact.hero.eyebrow}
                </span>
                <div className="w-10 h-px" style={{ background: 'rgba(201,168,76,0.6)' }} />
              </div>
              <h1 className="mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.15 }}>
                {contact.hero.headline}
              </h1>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '1rem', color: 'rgba(245,237,216,0.72)', lineHeight: 1.8, fontWeight: 300 }}>
                {contact.hero.subheading}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28" style={{ background: '#1A0A0A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* ── LEFT: Contact Info ─────────────────────────────────────── */}
              <FadeIn direction="left" className="lg:col-span-2">
                <div className="flex flex-col gap-8">

                  {/* Title */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                      <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                        Contact Details
                      </span>
                    </div>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                      Let's Plan Your Event
                    </h2>
                    <p className="mt-3" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: 'rgba(245,237,216,0.55)', lineHeight: 1.8, fontWeight: 300 }}>
                      {contact.info.responseTime}
                    </p>
                  </div>

                  {/* Info items */}
                  <div className="flex flex-col gap-5">
                    {[
                      { icon: Phone, label: 'Phone', value: contact.info.phone, href: `tel:${contact.info.phone.replace(/\s/g, '')}` },
                      { icon: Mail, label: 'Email', value: contact.info.email, href: `mailto:${contact.info.email}` },
                      { icon: MapPin, label: 'Location', value: contact.info.address, href: null },
                      { icon: Clock, label: 'Hours', value: contact.info.hours, href: null },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                          <Icon size={16} style={{ color: '#C9A84C' }} />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(245,237,216,0.4)', textTransform: 'uppercase' as const, marginBottom: '0.2rem' }}>
                            {label}
                          </p>
                          {href ? (
                            <a href={href} style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.9rem', color: '#F5EDD8', fontWeight: 400, textDecoration: 'none' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#F5EDD8')}>
                              {value}
                            </a>
                          ) : (
                            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.9rem', color: '#F5EDD8', fontWeight: 400 }}>{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div>
                    <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(245,237,216,0.4)', textTransform: 'uppercase' as const, marginBottom: '0.75rem' }}>
                      {contact.social.label}
                    </p>
                    <div className="flex gap-3">
                      {contact.social.links.map((link) => {
                        const Icon = link.platform === 'Instagram' ? Instagram : Facebook;
                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200 hover:opacity-80"
                            style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', textDecoration: 'none' }}
                          >
                            <Icon size={14} />
                            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.72rem', fontWeight: 600 }}>
                              {link.handle}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* ── RIGHT: Form ────────────────────────────────────────────── */}
              <FadeIn direction="right" delay={0.1} className="lg:col-span-3">
                <div className="p-8 lg:p-10" style={{ background: 'rgba(245,237,216,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <h3 className="mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                    {contact.form.title}
                  </h3>
                  <ContactForm />
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ── MAP SECTION ───────────────────────────────────────────────────── */}
        <section style={{ background: '#0D0505' }}>
          <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' as const }}>
                    Find Us
                  </span>
                  <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.2 }}>
                  Serving the Greater Toronto Area
                </h2>
                <p className="mt-3 mx-auto max-w-lg" style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: 'rgba(245,237,216,0.5)', lineHeight: 1.8, fontWeight: 300 }}>
                  Based in Toronto, Ontario — we cater events across the GTA and surrounding regions.
                </p>
              </div>
            </FadeIn>

            {/* Map embed */}
            <FadeIn delay={0.1}>
              <div className="overflow-hidden border" style={{ borderColor: 'rgba(201,168,76,0.15)', height: '380px' }}>
                <iframe
                  title="SWAAD Catering location — Toronto, Ontario"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.57291630348!2d-79.54286!3d43.7182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── BOTTOM CTA STRIP ──────────────────────────────────────────────── */}
        <section className="py-14" style={{ background: '#6B1A2A' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, color: '#F5EDD8', lineHeight: 1.3 }}>
                  Prefer to talk directly?
                </p>
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.85rem', color: 'rgba(245,237,216,0.65)', fontWeight: 300, marginTop: '0.3rem' }}>
                  Call us during business hours and we'll be happy to help.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`tel:${contact.info.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#1A0A0A', fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, textDecoration: 'none' }}
                >
                  <Phone size={14} />
                  <span>{contact.info.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
