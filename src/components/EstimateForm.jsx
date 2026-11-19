import { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2, Phone, Calendar, MapPin, Car, ShieldCheck } from 'lucide-react';
import { saveLead, getActiveServices } from '../data/store';

export default function EstimateForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Auto Detailing',
    selectedService: 'Full Interior & Exterior Detail',
    vehicleSize: 'SUV / Mid-Size Truck',
    zipCode: '',
    details: '',
    date: '',
    timeSlot: 'Morning (8:00 AM - 12:00 PM)',
    notes: '',
  });

  const [activeServices, setActiveServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const svcs = getActiveServices();
    setActiveServices(svcs);
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const generatedRef = 'ST-' + Math.floor(100000 + Math.random() * 900000);
    setTimeout(() => {
      saveLead({
        ...form,
        refNumber: generatedRef,
        details: `${form.vehicleSize} • ${form.selectedService} • ${form.details || 'Standard'} • Zip: ${form.zipCode || 'Houston'} • Slot: ${form.timeSlot}`
      });
      setRefNumber(generatedRef);
      setLoading(false);
      setSubmitted(true);
      setForm({
        name: '', phone: '', email: '', category: 'Auto Detailing',
        selectedService: 'Full Interior & Exterior Detail', vehicleSize: 'SUV / Mid-Size Truck',
        zipCode: '', details: '', date: '', timeSlot: 'Morning (8:00 AM - 12:00 PM)', notes: ''
      });
    }, 700);
  };

  const inputClass = "w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/30 transition-all";

  return (
    <section id="estimate" className="py-20 lg:py-28 section-fade relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-3">
            <ShieldCheck size={14} className="text-brand-gold" />
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Fast 24-Hr Turnaround</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Get a Free Instant Estimate
          </h2>
          <p className="mt-4 text-brand-silver max-w-xl mx-auto text-sm sm:text-base">
            Tell us about your vehicle or property. We come fully equipped with our own purified spot-free water &amp; power across Greater Houston!
          </p>
        </div>

        <div className="bg-brand-card rounded-2xl p-6 sm:p-10 gold-border shadow-2xl relative overflow-hidden">
          {/* Subtle gold glow accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-12 px-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-gold/30">
                <CheckCircle size={36} className="text-brand-bg" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Booking Confirmed</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-2">Estimate Request Received!</h3>
              <p className="text-sm text-brand-silver max-w-md mx-auto mb-6">
                Your confirmation reference is <span className="font-mono text-white font-bold px-2 py-0.5 rounded bg-white/10">{refNumber}</span>. We will call or text you shortly to lock in your preferred appointment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:8326382024"
                  className="w-full sm:w-auto px-6 py-3.5 gold-gradient text-brand-bg font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Phone size={16} /> Call (832) 638-2024 Now
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Pill Selector */}
              <div>
                <label className="block text-xs font-bold text-brand-gold mb-2 uppercase tracking-wider">
                  1. Select Service Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Auto Detailing', 'Pressure Washing'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, category: cat }))}
                      className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                        form.category === cat
                          ? 'gold-gradient text-brand-bg border-brand-gold shadow-lg shadow-brand-gold/20'
                          : 'bg-brand-bg text-brand-silver border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <Car size={16} />
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Primary Service Desired *
                  </label>
                  <select
                    name="selectedService"
                    value={form.selectedService}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    {form.category === 'Auto Detailing' ? (
                      <>
                        <option>Full Interior &amp; Exterior Detail</option>
                        <option>Ceramic Coating &amp; Paint Correction</option>
                        <option>Deep Interior Shampoo &amp; Stain Removal</option>
                        <option>Engine Bay Detail &amp; Leather Conditioning</option>
                        <option>Headlight Restoration &amp; Scratch Removal</option>
                      </>
                    ) : (
                      <>
                        <option>Driveway &amp; Garage Floor Pressure Wash</option>
                        <option>Patio, Pool Deck &amp; Walkway Soft Wash</option>
                        <option>Full House Exterior &amp; Siding Soft Wash</option>
                        <option>Brick, Stone &amp; Mildew Removal</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Vehicle Size (if Auto) or Area Sq Ft (if Pressure) */}
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    {form.category === 'Auto Detailing' ? 'Vehicle Size *' : 'Estimated Area *'}
                  </label>
                  {form.category === 'Auto Detailing' ? (
                    <select
                      name="vehicleSize"
                      value={form.vehicleSize}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option>Sedan / Coupe / Hatchback</option>
                      <option>SUV / Mid-Size Truck / Crossover</option>
                      <option>Large SUV / Lifted Truck / Van</option>
                      <option>Exotic / Supercar / Classic</option>
                    </select>
                  ) : (
                    <input
                      name="vehicleSize"
                      value={form.vehicleSize}
                      onChange={handleChange}
                      placeholder="e.g. 2-car driveway (~800 sq ft)"
                      className={inputClass}
                      required
                    />
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Your Full Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Michael Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Phone Number (Cell) *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(832) 555-0199"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Houston ZIP Code *
                  </label>
                  <input
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 77019 / 77494"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Vehicle / Property Details & Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="michael@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Vehicle Year, Make &amp; Model *
                  </label>
                  <input
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2024 Porsche Cayenne - Black"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Preferred Date & Time Slot */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={13} className="text-brand-gold" /> Preferred Service Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                    Preferred Arrival Window
                  </label>
                  <select
                    name="timeSlot"
                    value={form.timeSlot}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Morning (8:00 AM - 12:00 PM)</option>
                    <option>Afternoon (12:00 PM - 4:00 PM)</option>
                    <option>Evening / Flexible</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">
                  Special Notes or Severe Issues (Pet Hair, Heavy Stains, Tree Sap, etc.)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Tell us anything we should prepare for..."
                  className={inputClass + " resize-none"}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 gold-gradient text-brand-bg font-extrabold rounded-xl text-base hover:opacity-95 transition-all shadow-xl shadow-brand-gold/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? 'Securing Your Estimate...' : 'Get My Free Estimate & Book Appointment'}
              </button>

              <p className="text-[11px] text-center text-brand-silver/70">
                🔒 No credit card required. Free quote with zero obligations. We serve Houston, Katy, Sugar Land, The Woodlands, Cypress, Pearland &amp; surrounding areas.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
