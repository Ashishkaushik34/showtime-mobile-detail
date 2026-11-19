import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Pressure Washing', href: '#pressure-washing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Free Estimate', href: '#estimate' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-bg/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center font-black text-brand-bg text-lg">
              S
            </div>
            <span className="text-sm sm:text-base font-extrabold tracking-tight">
              <span className="text-brand-gold">SHOWTIME</span>
              <span className="text-white"> MOBILE DETAIL</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-sm font-medium text-brand-silver hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#estimate"
              className="ml-2 px-5 py-2.5 gold-gradient text-brand-bg text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-gold/20">
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-brand-silver hover:text-white">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        open ? 'max-h-96 border-b border-white/5' : 'max-h-0'
      }`}>
        <div className="bg-brand-bg/98 backdrop-blur-md px-4 pb-6 pt-2 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-brand-silver hover:text-white hover:pl-2 transition-all">
              {l.label}
            </a>
          ))}
          <a href="tel:8326382024"
            className="flex items-center gap-2 py-3 text-sm font-medium text-brand-gold">
            <Phone size={16} /> (832) 638-2024
          </a>
          <a href="#estimate" onClick={() => setOpen(false)}
            className="block mt-2 text-center px-5 py-3 gold-gradient text-brand-bg text-sm font-bold rounded-lg">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}
