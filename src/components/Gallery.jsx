import { useState, useEffect, useRef } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { getGallery } from '../data/store';

const FILTERS = [
  { key: 'all', label: 'All Showcase' },
  { key: 'auto', label: 'Auto Detailing' },
  { key: 'pressure', label: 'Pressure Washing' },
];

function BeforeAfterCard({ item }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <div className="group relative bg-brand-card rounded-2xl overflow-hidden gold-border card-glow flex flex-col">
      {/* Interactive Image Split Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => {
          setIsInteracting(false);
          setSliderPos(50);
        }}
        className="relative aspect-[4/3] w-full overflow-hidden select-none cursor-ew-resize touch-none bg-black"
      >
        {/* AFTER Image (Full background layer) */}
        <img
          src={item.afterUrl}
          alt={`${item.title} After`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = item.category === 'pressure' ? '/gallery/driveway-after.jpg' : '/gallery/ceramic-after.jpg';
          }}
        />

        {/* BEFORE Image (Clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={item.beforeUrl}
            alt={`${item.title} Before`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              height: '100%'
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = item.category === 'pressure' ? '/gallery/driveway-before.jpg' : '/gallery/interior-before.jpg';
            }}
          />
        </div>

        {/* Golden Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Centered Circular Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full gold-gradient shadow-lg flex items-center justify-center text-brand-bg font-black text-xs">
            <MoveHorizontal size={14} className="text-brand-bg" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-30 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider bg-black/70 backdrop-blur-md text-brand-silver border border-white/10 pointer-events-none">
          BEFORE
        </div>
        <div className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider bg-brand-gold text-brand-bg shadow-md pointer-events-none flex items-center gap-1">
          <Sparkles size={11} /> SHOWTIME AFTER
        </div>

        {/* Hover/Touch Instruction Pill */}
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/10 pointer-events-none transition-opacity duration-300 ${
          isInteracting ? 'opacity-0' : 'opacity-100'
        }`}>
          &larr; Drag or hover to compare &rarr;
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              {item.category === 'auto' ? 'Auto Detailing' : 'Pressure Washing'}
            </span>
          </div>
          <h3 className="font-bold text-base text-white group-hover:text-brand-gold transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-brand-silver mt-1.5 leading-relaxed">
            {item.subtitle || 'Professional multi-stage transformation by Showtime Mobile Detail.'}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <a
            href="#estimate"
            className="text-xs font-bold text-brand-gold hover:text-brand-gold-hover transition-colors inline-flex items-center gap-1"
          >
            Book This Service &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setGallery(getGallery());
  }, []);

  const filtered = filter === 'all' ? gallery : gallery.filter(g => g.category === filter);

  return (
    <section id="gallery" className="py-20 lg:py-28 section-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-3">
            <Sparkles size={14} className="text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Proof of Craftsmanship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Interactive Before &amp; After Showcase
          </h2>
          <p className="mt-4 text-brand-silver max-w-xl mx-auto text-sm sm:text-base">
            Slide or drag across any image to reveal the true transformation. We bring showroom results directly to your driveway across Greater Houston.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {FILTERS.map(f => {
            const count = f.key === 'all' ? gallery.length : gallery.filter(g => g.category === f.key).length;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  filter === f.key
                    ? 'gold-gradient text-brand-bg shadow-lg shadow-brand-gold/25 scale-105'
                    : 'bg-brand-card text-brand-silver hover:text-white border border-white/5 hover:border-brand-gold/20'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === f.key ? 'bg-brand-bg/20 text-brand-bg' : 'bg-white/10 text-brand-silver'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
