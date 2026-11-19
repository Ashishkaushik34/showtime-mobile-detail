import { useState, useEffect } from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { getReviews } from '../data/store';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-brand-card/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-3">
            <CheckCircle2 size={14} className="text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Verified Houston Clients</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-brand-gold fill-brand-gold" />
              ))}
            </div>
            <span className="ml-2 text-white font-bold text-sm">5.0 Star Rating</span>
            <span className="text-brand-silver text-sm">&bull; 155+ Google Reviews</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="relative bg-brand-card rounded-2xl p-6 lg:p-8 gold-border card-glow transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Highlight Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold border border-brand-gold/20">
                    {rev.highlight}
                  </div>
                  <Quote size={28} className="text-brand-gold/20" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(rev.rating || 5)].map((_, j) => (
                    <Star key={j} size={15} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-brand-silver leading-relaxed mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-brand-bg font-black text-sm flex-shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                    {rev.name}
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" title="Verified Customer" />
                  </div>
                  <div className="text-xs text-brand-silver flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={11} className="text-brand-gold flex-shrink-0" />
                    <span>{rev.location || 'Houston, TX'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
