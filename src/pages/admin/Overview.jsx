import { useState, useEffect } from 'react';
import { MessageSquare, Settings, TrendingUp } from 'lucide-react';
import { getLeads, getActiveServices } from '../../data/store';

export default function Overview() {
  const [stats, setStats] = useState({ total: 0, today: 0, services: 0 });

  useEffect(() => {
    const leads = getLeads();
    const todayStr = new Date().toISOString().slice(0, 10);
    const today = leads.filter(l => l.submittedAt?.startsWith(todayStr)).length;
    setStats({
      total: leads.length,
      today,
      services: getActiveServices().length,
    });
  }, []);

  const cards = [
    { label: 'Total Quote Requests', value: stats.total, icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'New Leads Today', value: stats.today, icon: TrendingUp, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { label: 'Active Services', value: stats.services, icon: Settings, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Overview</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((c, i) => (
          <div key={i} className="bg-brand-card rounded-2xl p-6 gold-border card-glow">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.icon size={22} className={c.color} />
              </div>
              <div>
                <div className="text-3xl font-black">{c.value}</div>
                <div className="text-sm text-brand-silver">{c.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">Recent Quote Requests</h3>
        <div className="bg-brand-card rounded-2xl gold-border overflow-hidden">
          {getLeads().slice(0, 5).length === 0 ? (
            <div className="p-8 text-center text-brand-silver text-sm">
              No quote requests yet. Submit one from the website to see it here!
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {getLeads().slice(0, 5).map(lead => (
                <div key={lead.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-brand-bg font-bold text-xs flex-shrink-0">
                    {lead.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate">{lead.name}</div>
                    <div className="text-xs text-brand-silver truncate">{lead.category} — {lead.details}</div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                    lead.status === 'New' ? 'bg-blue-400/10 text-blue-400' :
                    lead.status === 'Contacted' ? 'bg-yellow-400/10 text-yellow-400' :
                    lead.status === 'Scheduled' ? 'bg-brand-gold/10 text-brand-gold' :
                    'bg-emerald-400/10 text-emerald-400'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
