import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, Image, LogOut, Menu, X } from 'lucide-react';
import { isAuthenticated, logout } from '../../data/store';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/dashboard/leads', icon: MessageSquare, label: 'Quote Requests' },
  { to: '/admin/dashboard/services', icon: Settings, label: 'Services Manager' },
  { to: '/admin/dashboard/gallery-reviews', icon: Image, label: 'Gallery & Reviews' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin', { replace: true });
  }, [navigate]);

  const handleLogout = () => { logout(); navigate('/admin'); };

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar Overlay (mobile) */}
      {sideOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-card border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        sideOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center text-brand-bg font-black text-sm">
              S
            </div>
            <div>
              <span className="font-bold text-sm text-brand-gold">SHOWTIME</span>
              <span className="block text-[10px] text-brand-silver -mt-0.5">Admin Panel</span>
            </div>
          </div>
          <button onClick={() => setSideOpen(false)} className="lg:hidden text-brand-silver">
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              onClick={() => setSideOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                    : 'text-brand-silver hover:text-white hover:bg-white/5'
                }`
              }>
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-brand-silver hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-brand-bg/95 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={() => setSideOpen(true)} className="lg:hidden text-brand-silver hover:text-white">
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-bold">Dashboard</h1>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="ml-auto text-xs text-brand-silver hover:text-brand-gold transition-colors">
            View Website &rarr;
          </a>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
