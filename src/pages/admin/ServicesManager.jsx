import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save } from 'lucide-react';
import { getServices, saveService, deleteService } from '../../data/store';

const emptyService = { id: '', title: '', description: '', price: '', category: 'auto', active: true, icon: 'Sparkles' };

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyService);

  const refresh = () => setServices(getServices());
  useEffect(refresh, []);

  const openNew = () => { setForm(emptyService); setEditing('new'); };
  const openEdit = (svc) => { setForm({ ...svc }); setEditing(svc.id); };
  const close = () => setEditing(null);

  const handleSave = () => {
    if (!form.title.trim()) return;
    saveService(editing === 'new' ? { ...form, id: '' } : form);
    refresh();
    close();
  };

  const handleToggle = (svc) => {
    saveService({ ...svc, active: !svc.active });
    refresh();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this service?')) { deleteService(id); refresh(); }
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const inputClass = "w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-gold/50";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black">Services Manager</h2>
        <button onClick={openNew}
          className="px-4 py-2.5 gold-gradient text-brand-bg text-sm font-bold rounded-xl hover:opacity-90 flex items-center gap-2 shadow-lg shadow-brand-gold/20">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {services.map(svc => (
          <div key={svc.id}
            className={`bg-brand-card rounded-2xl p-5 gold-border flex flex-col sm:flex-row sm:items-center gap-4 transition-opacity ${!svc.active ? 'opacity-50' : ''}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold truncate">{svc.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${svc.active ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                  {svc.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <p className="text-sm text-brand-silver truncate">{svc.description}</p>
              <span className="text-sm text-brand-gold font-semibold">{svc.price}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleToggle(svc)}
                className="p-2 text-brand-silver hover:text-brand-gold transition-colors" title={svc.active ? 'Deactivate' : 'Activate'}>
                {svc.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
              </button>
              <button onClick={() => openEdit(svc)}
                className="p-2 text-brand-silver hover:text-white transition-colors">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(svc.id)}
                className="p-2 text-brand-silver hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={close}>
          <div className="bg-brand-card rounded-2xl p-6 sm:p-8 w-full max-w-lg gold-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">{editing === 'new' ? 'Add Service' : 'Edit Service'}</h3>
              <button onClick={close} className="text-brand-silver hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Title</label>
                <input name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="Service name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="Service description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Starting Price</label>
                  <input name="price" value={form.price} onChange={handleChange} className={inputClass} placeholder="Starting at $99" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                    <option value="auto">Auto Detailing</option>
                    <option value="pressure">Pressure Washing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Icon</label>
                <select name="icon" value={form.icon} onChange={handleChange} className={inputClass}>
                  <option value="Car">Car</option>
                  <option value="Shield">Shield</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Sun">Sun</option>
                  <option value="Wrench">Wrench</option>
                </select>
              </div>
              <button onClick={handleSave}
                className="w-full py-3 gold-gradient text-brand-bg font-bold rounded-xl hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20">
                <Save size={16} /> Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
