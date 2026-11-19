import { Phone, MessageSquare, Calendar } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
      <div className="bg-brand-card/95 backdrop-blur-lg border border-brand-gold/30 rounded-2xl p-2 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="tel:8326382024"
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 active:scale-95 transition-all"
        >
          <Phone size={14} className="text-brand-gold" />
          Call Now
        </a>
        <a
          href="sms:8326382024?body=Hi%20Showtime%20Detail,%20I'd%20like%20a%20quote%20for%20my%20vehicle/property."
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 active:scale-95 transition-all"
        >
          <MessageSquare size={14} className="text-brand-gold" />
          Text Us
        </a>
        <a
          href="#estimate"
          className="flex-1 py-2.5 px-3 rounded-xl gold-gradient text-brand-bg text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-brand-gold/30 active:scale-95 transition-all"
        >
          <Calendar size={14} />
          Book
        </a>
      </div>
    </div>
  );
}
