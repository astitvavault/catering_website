import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/menu', label: 'Menu' },

  { href: '/contact', label: 'Contact' }];


  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ?
        'rgba(26, 10, 10, 0.97)' :
        '#1A0A0A',
        boxShadow: isScrolled ? '0 2px 40px rgba(0,0,0,0.4)' : 'none',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none'
      }}>
      
      {/* Top accent bar */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: '88px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" aria-label="SWAAD Catering Services home">
            <img
              src="/assets/Untitled design-modified.png"
              alt="SWAAD Catering Services"
              className="h-14 md:h-16 w-auto object-contain"
            />




            
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navItems.map((item) =>
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium tracking-wide transition-all duration-300 relative group"
              style={{
                color: location.pathname === item.href ? '#C9A84C' : '#F5EDD8',
                fontFamily: 'Raleway, sans-serif',
                letterSpacing: '0.06em',
                fontSize: '0.8rem',
                textTransform: 'uppercase'
              }}>
              
                {item.label}
                <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: '#C9A84C' }} />
              
              </Link>
            )}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+19053245299"
              className="flex items-center gap-2 text-xs transition-colors duration-300"
              style={{ color: '#C9A84C', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.04em' }}>
              
              <Phone size={14} />
              <span>+1 (905) 324-5299</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                color: '#1A0A0A',
                fontFamily: 'Raleway, sans-serif',
                letterSpacing: '0.12em'
              }}>
              
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: '#F5EDD8' }}
            aria-label="Toggle menu">
            
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div
        className="lg:hidden border-t"
        style={{ background: '#1A0A0A', borderColor: 'rgba(201,168,76,0.2)' }}>
        
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {navItems.map((item) =>
          <Link
            key={item.href}
            to={item.href}
            className="py-3 px-2 text-sm font-medium tracking-widest uppercase border-b transition-colors duration-200"
            style={{
              color: location.pathname === item.href ? '#C9A84C' : '#F5EDD8',
              borderColor: 'rgba(201,168,76,0.1)',
              fontFamily: 'Raleway, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.1em'
            }}
            onClick={() => setIsMobileMenuOpen(false)}>
            
                {item.label}
              </Link>
          )}
            <Link
            to="/contact"
            className="mt-4 py-3 text-center text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
              color: '#1A0A0A',
              fontFamily: 'Raleway, sans-serif',
              letterSpacing: '0.12em'
            }}
            onClick={() => setIsMobileMenuOpen(false)}>
            
              Book Now
            </Link>
          </nav>
        </div>
      }

      {/* Bottom accent bar */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />
    </header>);

}