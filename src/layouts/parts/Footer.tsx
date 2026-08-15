import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const OrnamentalDivider = () =>
<div className="flex items-center gap-3 w-full">
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#C9A84C" opacity="0.8" />
    </svg>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
  </div>;


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/menu', label: 'Our Menu' },
  { href: '/contact', label: 'Contact' }];


  const services = [
  'Wedding Catering',
  'Corporate Events',
  'Birthday & Anniversaries',
  'Festival Catering',
  'Live Cooking Stations',
  'BBQ & Tandoor'];


  return (
    <footer style={{ background: '#0D0505', color: '#F5EDD8' }}>
      <OrnamentalDivider />

      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" aria-label="SWAAD Catering Services home">
              <img
                src="/assets/Untitled design-modified.png"
                alt="SWAAD Catering Services"
                className="object-contain w-auto mb-5"
                style={{ height: '44px' }} />
              
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(245,237,216,0.65)', fontFamily: 'Raleway, sans-serif', lineHeight: '1.8' }}>
              Crafting unforgettable dining experiences through authentic Indian and Hakka Chinese cuisine for every celebration that matters.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Youtube, href: '#', label: 'YouTube' }].
              map(({ icon: Icon, href, label }) =>
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400"
                style={{ borderColor: 'rgba(201,168,76,0.3)', color: 'rgba(245,237,216,0.6)' }}>
                
                  <Icon size={15} />
                </a>
              )}

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.15em' }}>
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Footer links">
              {quickLinks.map((link) =>
              <Link
                key={link.href}
                to={link.href}
                className="text-sm transition-colors duration-200 hover:text-yellow-400 flex items-center gap-2 group"
                style={{ color: 'rgba(245,237,216,0.65)', fontFamily: 'Raleway, sans-serif' }}>
                
                  <span className="w-3 h-px transition-all duration-300 group-hover:w-5" style={{ background: '#C9A84C' }} />
                  {link.label}
                </Link>
              )}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.15em' }}>
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) =>
              <li key={service} className="text-sm flex items-center gap-2" style={{ color: 'rgba(245,237,216,0.65)', fontFamily: 'Raleway, sans-serif' }}>
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#C9A84C' }} />
                  {service}
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.15em' }}>
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+19053245299" className="flex items-start gap-3 text-sm transition-colors hover:text-yellow-400 group" style={{ color: 'rgba(245,237,216,0.65)', fontFamily: 'Raleway, sans-serif' }}>
                <Phone size={14} className="mt-0.5 shrink-0 group-hover:text-yellow-400 transition-colors" style={{ color: '#C9A84C' }} />
                <span>+1 (905) 324-5299</span>
              </a>
              <a href="mailto:prakhardeep19@gmail.com" className="flex items-start gap-3 text-sm transition-colors hover:text-yellow-400 group" style={{ color: 'rgba(245,237,216,0.65)', fontFamily: 'Raleway, sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail mt-0.5 shrink-0" style={{ color: 'rgb(201, 168, 76)' }}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>prakhardeep19@gmail.com


              </a>
              <div className="flex items-start gap-3 text-sm" style={{ color: 'rgba(245,237,216,0.65)', fontFamily: 'Raleway, sans-serif' }}>
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
                <span>Serving the Greater Metropolitan Area & Surrounding Regions</span>
              </div>
            </div>


          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
          <p className="text-xs" style={{ color: 'rgba(245,237,216,0.4)', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.05em' }}>
            © {currentYear} SWAAD Catering Services. All rights reserved.
          </p>
          <p className="text-xs italic" style={{ color: 'rgba(201,168,76,0.5)', fontFamily: 'Cormorant Garamond, serif' }}>
            Authentic Flavours. Exceptional Experiences.
          </p>
        </div>
      </div>
    </footer>);

}