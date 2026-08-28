import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Menu, X, Store } from 'lucide-react';
import type { ReactNode } from 'react';
import { useAdmin } from '@/lib/admin-context';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, signOut } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const Sidebar = (
    <aside className="flex h-full w-64 flex-col bg-charcoal-700 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <Link to="/admin/dashboard" className="font-display text-xl font-bold">
          ANIS<span className="text-gradient-gold">BEAUTY</span>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-white/60"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="px-3 font-button text-[10px] uppercase tracking-widest text-white/30">
          Menu
        </p>
        <ul className="mt-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-luxe px-3 py-3 font-body text-sm transition-all ${
                    active
                      ? 'bg-rosegold-500 text-white shadow-luxe'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-luxe px-3 py-3 font-body text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Store className="h-5 w-5" /> View Store
        </Link>
        <div className="mt-4 flex items-center gap-3 rounded-luxe bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rosegold-500 font-display text-sm font-bold text-white">
            {(session?.user?.email || 'A')[0].toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-body text-sm font-medium text-white">
              {session?.user?.email || 'Admin'}
            </p>
            <p className="font-body text-xs text-white/40">Administrator</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-white/40 hover:text-rosegold-400"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-nude-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{Sidebar}</div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal-900/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-full lg:hidden"
            >
              {Sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-blush-100 bg-white px-4 py-4 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6 text-charcoal-600" />
          </button>
          <h1 className="font-display text-xl font-bold text-charcoal-700">
            {navItems.find((item) => location.pathname.startsWith(item.path))?.label || 'Admin'}
          </h1>
          <div className="w-8 lg:w-0" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
