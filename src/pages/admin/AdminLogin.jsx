import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login, isAuthenticated } from '../../data/store';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl gold-gradient items-center justify-center text-brand-bg font-black text-2xl mb-4">
            S
          </div>
          <h1 className="text-2xl font-black">Admin Dashboard</h1>
          <p className="text-brand-silver text-sm mt-1">Showtime Mobile Detail</p>
        </div>

        <div className="bg-brand-card rounded-2xl p-6 sm:p-8 gold-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@showtime.com"
                className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-silver mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Enter password"
                  className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 pr-12" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-silver hover:text-white">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button type="submit"
              className="w-full py-3.5 gold-gradient text-brand-bg font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-gold/25 flex items-center justify-center gap-2">
              <Lock size={18} /> Sign In
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
            <p className="text-xs text-brand-gold font-semibold mb-1">Demo Credentials:</p>
            <p className="text-xs text-brand-silver">Email: <span className="text-white font-mono">admin@showtime.com</span></p>
            <p className="text-xs text-brand-silver">Password: <span className="text-white font-mono">showtime2024</span></p>
          </div>
        </div>

        <a href="/" className="block text-center text-sm text-brand-silver hover:text-white mt-6 transition-colors">
          &larr; Back to Website
        </a>
      </div>
    </div>
  );
}
