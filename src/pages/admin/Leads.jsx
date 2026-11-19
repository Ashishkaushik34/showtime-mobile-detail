import { useState, useEffect } from 'react';
import { Trash2, Search } from 'lucide-react';
import { getLeads, updateLeadStatus, deleteLead } from '../../data/store';

const STATUSES = ['New', 'Contacted', 'Scheduled', 'Completed'];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const refresh = () => setLeads(getLeads());
  useEffect(refresh, []);

  const handleStatus = (id, status) => { updateLeadStatus(id, status); refresh(); };
  const handleDelete = (id) => { if (confirm('Delete this lead?')) { deleteLead(id); refresh(); } };

  const filtered = leads
    .filter(l => filterStatus === 'All' || l.status === filterStatus)
    .filter(l => {
      const q = search.toLowerCase();
      return !q || l.name?.toLowerCase().includes(q) || l.phone?.includes(q) || l.email?.toLowerCase().includes(q);
    });

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Quote Requests</h2>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-silver" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-brand-card border border-white/10 rounded-xl text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-gold/50" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-brand-card border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-gold/50">
          <option value="All">All Statuses</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-brand-card rounded-2xl gold-border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-5 py-4 font-semibold text-brand-silver text-xs uppercase tracking-wider">Name</th>
              <th className="px-5 py-4 font-semibold text-brand-silver text-xs uppercase tracking-wider hidden sm:table-cell">Contact</th>
              <th className="px-5 py-4 font-semibold text-brand-silver text-xs uppercase tracking-wider hidden md:table-cell">Service</th>
              <th className="px-5 py-4 font-semibold text-brand-silver text-xs uppercase tracking-wider hidden lg:table-cell">Details</th>
              <th className="px-5 py-4 font-semibold text-brand-silver text-xs uppercase tracking-wider">Status</th>
              <th className="px-5 py-4 font-semibold text-brand-silver text-xs uppercase tracking-wider w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-brand-silver">No leads found.</td></tr>
            ) : filtered.map(lead => (
              <tr key={lead.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="font-semibold flex items-center gap-2">
                    {lead.name}
                    {lead.refNumber && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                        {lead.refNumber}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-brand-silver sm:hidden">{lead.phone}</div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <a href={`tel:${lead.phone}`} className="hover:text-brand-gold transition-colors font-medium">
                    {lead.phone}
                  </a>
                  <div className="text-xs text-brand-silver">{lead.email || 'No email provided'}</div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell text-brand-silver font-medium">{lead.category}</td>
                <td className="px-5 py-4 hidden lg:table-cell text-brand-silver text-xs max-w-[280px]">
                  <div className="truncate font-medium text-white">{lead.details}</div>
                  {lead.notes && <div className="truncate text-brand-silver/70 italic">"{lead.notes}"</div>}
                </td>
                <td className="px-5 py-4">
                  <select value={lead.status} onChange={e => handleStatus(lead.id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border-0 focus:outline-none cursor-pointer ${
                      lead.status === 'New' ? 'bg-blue-400/10 text-blue-400' :
                      lead.status === 'Contacted' ? 'bg-yellow-400/10 text-yellow-400' :
                      lead.status === 'Scheduled' ? 'bg-brand-gold/10 text-brand-gold' :
                      'bg-emerald-400/10 text-emerald-400'
                    }`}>
                    {STATUSES.map(s => <option key={s} className="bg-brand-card text-white">{s}</option>)}
                  </select>
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => handleDelete(lead.id)}
                    className="text-brand-silver hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
