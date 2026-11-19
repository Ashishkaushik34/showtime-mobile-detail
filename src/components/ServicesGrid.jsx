import { useState, useEffect } from 'react';
import { Car, Shield, Sparkles, Sun, Wrench, ArrowRight } from 'lucide-react';
import { getActiveServices } from '../data/store';

const iconMap = { Car, Shield, Sparkles, Sun, Wrench };

export default function ServicesGrid() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(getActiveServices().filter(s => s.category === 'auto'));
  }, []);

  return (
    <section id="services" className="py-20 lg:py-28 section-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-brand-gold text-sm font-bold uppercase tracking-widest">Our Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Mobile Auto Detailing
          </h2>
          <p className="mt-4 text-brand-silver max-w-xl mx-auto">
            Professional detailing delivered to your doorstep. Every vehicle treated with
            showroom-level care and premium products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon] || Sparkles;
            return (
              <div key={svc.id}
                className="group relative bg-brand-card rounded-2xl p-6 lg:p-8 gold-border card-glow transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5 group-hover:bg-brand-gold/20 transition-colors">
                  <Icon size={24} className="text-brand-gold" />
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-brand-silver leading-relaxed mb-4">{svc.description}</p>

                {/* Price */}
                <div className="text-brand-gold font-bold text-sm mb-5">{svc.price}</div>

                {/* CTA */}
                <a href="#estimate"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:gap-3 transition-all">
                  Request Quote <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
