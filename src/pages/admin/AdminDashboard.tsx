import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Package, Clock, Plus, TrendingUp, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/lib/types';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gold-100 text-gold-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('products').select('id', { count: 'exact', head: true }),
        ]);

        if (ordersRes.data) setOrders(ordersRes.data as Order[]);
        if (productsRes.count !== null) setProductCount(productsRes.count);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const stats = [
    { label: 'Revenue', value: `₵${revenue.toFixed(2)}`, icon: DollarSign, color: 'bg-rosegold-100 text-rosegold-500' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'bg-blush-100 text-blush-600' },
    { label: 'Products', value: productCount, icon: Package, color: 'bg-gold-100 text-gold-600' },
    { label: 'Pending Orders', value: pendingCount, icon: Clock, color: 'bg-purple-100 text-purple-600' },
  ];

  const quickActions = [
    { label: 'Add Product', path: '/admin/products/new', icon: Plus },
    { label: 'View Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-luxe bg-white p-5 shadow-soft"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-charcoal-700">
              {loading ? '—' : stat.value}
            </p>
            <p className="font-body text-xs text-charcoal-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-luxe bg-white p-6 shadow-soft"
      >
        <h2 className="font-display text-lg font-bold text-charcoal-700">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="group flex items-center gap-3 rounded-luxe border border-blush-100 p-4 transition-all hover:border-rosegold-300 hover:shadow-soft"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 text-rosegold-500 transition-colors group-hover:bg-rosegold-500 group-hover:text-white">
                <action.icon className="h-5 w-5" />
              </div>
              <span className="font-body text-sm font-medium text-charcoal-700">
                {action.label}
              </span>
              <ArrowRight className="ml-auto h-4 w-4 text-charcoal-300 transition-colors group-hover:text-rosegold-500" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-luxe bg-white p-6 shadow-soft"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-charcoal-700">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="flex items-center gap-1 font-button text-xs uppercase tracking-wider text-rosegold-500 hover:text-rosegold-600"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-4 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 rounded-luxe skeleton" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="font-body text-sm text-charcoal-400">No orders yet</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-luxe border border-blush-100 p-3"
              >
                <div>
                  <p className="font-body text-sm font-medium text-charcoal-700">
                    {order.order_number}
                  </p>
                  <p className="font-body text-xs text-charcoal-400">
                    {order.customer_name} · {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 font-button text-[10px] uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="font-display text-sm font-bold text-charcoal-700">
                    ₵{Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
