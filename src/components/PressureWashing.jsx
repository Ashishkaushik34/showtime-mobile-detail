import { Droplets, CheckCircle2 } from 'lucide-react';
import { defaultPressureServices } from '../data/seedData';

export default function PressureWashing() {
  return (
    <section id="pressure-washing" className="py-20 lg:py-28 bg-brand-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="text-brand-gold text-sm font-bold uppercase tracking-widest">Exterior Restoration</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Pressure Washing &amp;<br />
              <span className="text-transparent bg-clip-text gold-gradient">Soft Washing</span>
            </h2>
            <p className="mt-4 text-brand-silver leading-relaxed max-w-lg">
              Transform your home's exterior with our professional pressure washing and soft
              washing services. We safely remove years of grime, mildew, and staining from
              any surface.
            </p>

            <a href="#estimate"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 gold-gradient text-brand-bg font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-gold/20">
              <Droplets size={18} /> Get a Free Quote
            </a>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-3">
            {defaultPressureServices.map((svc, i) => (
              <div key={i}
                className="flex items-center gap-3 p-4 bg-brand-card rounded-xl gold-border hover:bg-brand-card-hover transition-colors">
                <CheckCircle2 size={18} className="text-brand-gold flex-shrink-0" />
                <span className="text-sm font-medium">{svc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
