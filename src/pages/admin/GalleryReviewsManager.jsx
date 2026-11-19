import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, Star, Image, MessageSquare } from 'lucide-react';
import { getReviews, saveReview, deleteReview, getGallery, saveGalleryItem, deleteGalleryItem } from '../../data/store';

const emptyReview = { id: '', name: '', rating: 5, text: '', highlight: '', date: '' };
const emptyGallery = { id: '', title: '', category: 'auto', beforeUrl: '', afterUrl: '' };

export default function GalleryReviewsManager() {
  const [tab, setTab] = useState('reviews');
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formReview, setFormReview] = useState(emptyReview);
  const [formGallery, setFormGallery] = useState(emptyGallery);

  const refresh = () => { setReviews(getReviews()); setGallery(getGallery()); };
  useEffect(refresh, []);

  const inputClass = "w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-gold/50";

  /* ── Reviews handlers ── */
  const openNewReview = () => { setFormReview(emptyReview); setEditing('new-review'); };
  const handleSaveReview = () => {
    if (!formReview.name.trim()) return;
    saveReview(editing === 'new-review' ? { ...formReview, id: '' } : formReview);
    refresh(); setEditing(null);
  };
  const handleDeleteReview = (id) => { if (confirm('Delete this review?')) { deleteReview(id); refresh(); } };

  /* ── Gallery handlers ── */
  const openNewGallery = () => { setFormGallery(emptyGallery); setEditing('new-gallery'); };
  const handleSaveGallery = () => {
    if (!formGallery.title.trim()) return;
    saveGalleryItem(editing === 'new-gallery' ? { ...formGallery, id: '' } : formGallery);
    refresh(); setEditing(null);
  };
  const handleDeleteGallery = (id) => { if (confirm('Delete this gallery item?')) { deleteGalleryItem(id); refresh(); } };

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Gallery &amp; Reviews Manager</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('reviews')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            tab === 'reviews' ? 'gold-gradient text-brand-bg shadow-lg shadow-brand-gold/20' : 'bg-brand-card text-brand-silver border border-white/5 hover:text-white'
          }`}>
          <MessageSquare size={16} /> Reviews ({reviews.length})
        </button>
        <button onClick={() => setTab('gallery')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            tab === 'gallery' ? 'gold-gradient text-brand-bg shadow-lg shadow-brand-gold/20' : 'bg-brand-card text-brand-silver border border-white/5 hover:text-white'
          }`}>
          <Image size={16} /> Gallery ({gallery.length})
        </button>
      </div>

      {/* ═══ REVIEWS TAB ═══ */}
      {tab === 'reviews' && (
        <div>
          <button onClick={openNewReview}
            className="mb-5 px-4 py-2.5 gold-gradient text-brand-bg text-sm font-bold rounded-xl hover:opacity-90 flex items-center gap-2 shadow-lg shadow-brand-gold/20">
            <Plus size={16} /> Add Review
          </button>
          <div className="space-y-3">
            {reviews.map(rev => (
              <div key={rev.id} className="bg-brand-card rounded-2xl p-5 gold-border flex flex-col sm:flex-row gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{rev.name}</span>
                    <div className="flex gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} className="text-brand-gold fill-brand-gold" />)}
                    </div>
                  </div>
                  <span className="text-xs text-brand-gold font-semibold">{rev.highlight}</span>
                  <p className="text-sm text-brand-silver mt-1 line-clamp-2">&ldquo;{rev.text}&rdquo;</p>
                </div>
                <button onClick={() => handleDeleteReview(rev.id)}
                  className="text-brand-silver hover:text-red-400 transition-colors self-start">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ GALLERY TAB ═══ */}
      {tab === 'gallery' && (
        <div>
          <button onClick={openNewGallery}
            className="mb-5 px-4 py-2.5 gold-gradient text-brand-bg text-sm font-bold rounded-xl hover:opacity-90 flex items-center gap-2 shadow-lg shadow-brand-gold/20">
            <Plus size={16} /> Add Gallery Item
          </button>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(item => (
              <div key={item.id} className="bg-brand-card rounded-2xl overflow-hidden gold-border">
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  <img
                    src={item.beforeUrl}
                    alt="Before"
                    className="w-full h-28 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/gallery/driveway-before.jpg';
                    }}
                  />
                  <img
                    src={item.afterUrl}
                    alt="After"
                    className="w-full h-28 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/gallery/driveway-after.jpg';
                    }}
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <span className="text-xs text-brand-silver capitalize">{item.category}</span>
                  </div>
                  <button onClick={() => handleDeleteGallery(item.id)}
                    className="text-brand-silver hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ MODALS ═══ */}
      {editing && editing.includes('review') && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-brand-card rounded-2xl p-6 sm:p-8 w-full max-w-lg gold-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Add Review</h3>
              <button onClick={() => setEditing(null)} className="text-brand-silver hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Name</label>
                  <input value={formReview.name} onChange={e => setFormReview(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Customer name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Rating</label>
                  <select value={formReview.rating} onChange={e => setFormReview(f => ({ ...f, rating: Number(e.target.value) }))} className={inputClass}>
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Highlight Tag</label>
                <input value={formReview.highlight} onChange={e => setFormReview(f => ({ ...f, highlight: e.target.value }))} className={inputClass} placeholder="e.g. Same-Day Service" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Review Text</label>
                <textarea value={formReview.text} onChange={e => setFormReview(f => ({ ...f, text: e.target.value }))} rows={3} className={inputClass + " resize-none"} placeholder="Customer review..." />
              </div>
              <button onClick={handleSaveReview}
                className="w-full py-3 gold-gradient text-brand-bg font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
                <Save size={16} /> Save Review
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && editing.includes('gallery') && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-brand-card rounded-2xl p-6 sm:p-8 w-full max-w-lg gold-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Add Gallery Item</h3>
              <button onClick={() => setEditing(null)} className="text-brand-silver hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Title</label>
                <input value={formGallery.title} onChange={e => setFormGallery(f => ({ ...f, title: e.target.value }))} className={inputClass} placeholder="Transformation title" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Category</label>
                <select value={formGallery.category} onChange={e => setFormGallery(f => ({ ...f, category: e.target.value }))} className={inputClass}>
                  <option value="auto">Auto Detailing</option>
                  <option value="pressure">Pressure Washing</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Before Image URL</label>
                <input value={formGallery.beforeUrl} onChange={e => setFormGallery(f => ({ ...f, beforeUrl: e.target.value }))} className={inputClass} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">After Image URL</label>
                <input value={formGallery.afterUrl} onChange={e => setFormGallery(f => ({ ...f, afterUrl: e.target.value }))} className={inputClass} placeholder="https://..." />
              </div>
              <button onClick={handleSaveGallery}
                className="w-full py-3 gold-gradient text-brand-bg font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
                <Save size={16} /> Save Gallery Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
