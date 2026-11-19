import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-black text-brand-bg text-sm">
                S
              </div>
              <span className="font-extrabold text-sm">
                <span className="text-brand-gold">SHOWTIME</span> MOBILE DETAIL
              </span>
            </div>
            <p className="text-sm text-brand-silver leading-relaxed">
              Houston's premier mobile auto detailing and residential pressure washing service.
              We come to you — showroom results, every time.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-brand-gold uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a href="tel:8326382024" className="flex items-center gap-3 text-sm text-brand-silver hover:text-white transition-colors">
                <Phone size={16} className="text-brand-gold" /> (832) 638-2024
              </a>
              <a href="mailto:stautodetail@gmail.com" className="flex items-center gap-3 text-sm text-brand-silver hover:text-white transition-colors">
                <Mail size={16} className="text-brand-gold" /> stautodetail@gmail.com
              </a>
              <a href="https://instagram.com/showtimemobiledetail_" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-brand-silver hover:text-white transition-colors">
                <Instagram size={16} className="text-brand-gold" /> @showtimemobiledetail_
              </a>
              <div className="flex items-center gap-3 text-sm text-brand-silver">
                <MapPin size={16} className="text-brand-gold" /> Serving Greater Houston, TX
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-brand-gold uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3">
              <a href="#services" className="block text-sm text-brand-silver hover:text-white transition-colors">Auto Detailing</a>
              <a href="#pressure-washing" className="block text-sm text-brand-silver hover:text-white transition-colors">Pressure Washing</a>
              <a href="#gallery" className="block text-sm text-brand-silver hover:text-white transition-colors">Gallery</a>
              <a href="#estimate" className="block text-sm text-brand-silver hover:text-white transition-colors">Free Estimate</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-silver/60">
            &copy; {new Date().getFullYear()} Showtime Mobile Detail. All rights reserved. &bull; Appointments Only
          </p>
          <Link to="/admin" className="text-xs text-brand-silver/30 hover:text-brand-silver/60 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
