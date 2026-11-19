import { Star, Phone, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-bg relative min-h-screen flex items-center pt-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-brand-gold/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-8 animate-fade-in">
          <Star size={16} className="text-brand-gold fill-brand-gold" />
          <span className="text-sm font-semibold text-brand-gold">
            5.0 Rated &bull; 155+ Five-Star Google Reviews in Houston, TX
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-6 animate-slide-up">
          Showroom Shine &amp;<br />
          <span className="text-transparent bg-clip-text gold-gradient">Exterior Restoration</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-brand-silver">
            — Delivered to Your Doorstep
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-brand-silver leading-relaxed mb-10 animate-fade-in"
           style={{ animationDelay: '0.3s' }}>
          We come to your home or office across Houston. Specializing in{' '}
          <span className="text-white font-semibold">Mobile Auto Detailing</span>,{' '}
          <span className="text-white font-semibold">Ceramic Coating</span>,{' '}
          <span className="text-white font-semibold">Interior Deep Shampoo</span> &amp;{' '}
          <span className="text-white font-semibold">Residential Pressure Washing</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
             style={{ animationDelay: '0.5s' }}>
          <a href="#estimate"
            className="w-full sm:w-auto px-8 py-4 gold-gradient text-brand-bg font-bold rounded-xl text-base hover:opacity-90 transition-opacity shadow-lg shadow-brand-gold/25 flex items-center justify-center gap-2">
            <ArrowDown size={18} />
            Get a Free Estimate
          </a>
          <a href="tel:8326382024"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <Phone size={18} />
            Call / Text (832) 638-2024
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 lg:mt-24 animate-bounce">
          <ArrowDown size={20} className="mx-auto text-brand-silver/40" />
        </div>
      </div>
    </section>
  );
}
