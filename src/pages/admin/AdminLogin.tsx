import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAdmin } from '@/lib/admin-context';

export default function AdminLogin() {
  const { session, signIn } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@anisheels.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error === 'Invalid login credentials' ? 'Invalid email or password' : error);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Luxury beauty"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rosegold-900/80 via-charcoal-900/60 to-blush-900/70" />
        <div className="relative z-10 flex h-full flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-400" />
              <p className="font-button text-xs uppercase tracking-[0.3em] text-blush-200">
                Admin Portal
              </p>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-white">
              ANIS<span className="text-gradient-gold">BEAUTY</span>
            </h1>
            <p className="mt-4 max-w-md font-body text-sm text-white/70">
              Manage your luxury beauty storefront. Add products, track orders,
              and keep your collection shining.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-nude-50 p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="mb-8 block lg:hidden">
            <span className="font-display text-2xl font-bold text-charcoal-700">
              ANIS<span className="text-gradient-gold">BEAUTY</span>
            </span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-charcoal-700">
            Welcome Back
          </h2>
          <p className="mt-2 font-body text-sm text-charcoal-400">
            Sign in to access the admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-luxe bg-red-50 px-4 py-3"
              >
                <p className="font-body text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-luxe border border-blush-200 bg-white py-3.5 pl-11 pr-4 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                />
              </div>
            </div>

            <div>
              <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-luxe border border-blush-200 bg-white py-3.5 pl-11 pr-12 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-luxe bg-blush-50 p-4">
            <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
              Demo Credentials
            </p>
            <p className="mt-1 font-body text-sm text-charcoal-600">
              Email: admin@anisheels.com
            </p>
            <p className="font-body text-sm text-charcoal-600">
              Password: anisheels2026
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 block text-center font-button text-sm text-charcoal-400 hover:text-rosegold-500"
          >
            ← Back to Store
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
