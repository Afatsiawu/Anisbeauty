import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Mail, Phone, MapPin, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Order, OrderItem } from '@/lib/types';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gold-100 text-gold-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setOrders(data as Order[]);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId: string, status: string) {
    try {
      await supabase.from('orders').update({ status }).eq('id', orderId);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: status as Order['status'] } : o))
      );
      setSelectedOrder((prev) => (prev && prev.id === orderId ? { ...prev, status: status as Order['status'] } : prev));
    } catch {
      alert('Failed to update order status');
    }
  }

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal-700">Orders</h1>
        <p className="font-body text-sm text-charcoal-400">
          {orders.length} total orders
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order number, name, or email..."
          className="w-full rounded-luxe border border-blush-200 bg-white py-3 pl-11 pr-4 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
        />
      </div>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`rounded-full px-4 py-2 font-button text-xs uppercase tracking-wider transition-all ${
              statusFilter === filter
                ? 'bg-rosegold-500 text-white shadow-luxe'
                : 'bg-white text-charcoal-600 border border-blush-100 hover:border-rosegold-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 rounded-luxe skeleton" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-luxe bg-white p-12 text-center shadow-soft">
          <Package className="mx-auto h-12 w-12 text-blush-300" />
          <p className="mt-4 font-display text-lg font-semibold text-charcoal-700">
            No orders found
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-luxe bg-white shadow-soft md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blush-100 bg-nude-50 text-left">
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Order #</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Customer</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Date</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Total</th>
                  <th className="px-6 py-4 font-button text-xs uppercase tracking-wider text-charcoal-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer border-b border-blush-50 transition-colors hover:bg-nude-50"
                  >
                    <td className="px-6 py-4 font-body text-sm font-medium text-charcoal-700">
                      {order.order_number}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-sm text-charcoal-700">{order.customer_name}</p>
                      <p className="font-body text-xs text-charcoal-400">{order.customer_email}</p>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-charcoal-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-display text-sm font-bold text-charcoal-700">
                      ₵{Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 font-button text-[10px] uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedOrder(order)}
                className="cursor-pointer rounded-luxe bg-white p-4 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <p className="font-body text-sm font-medium text-charcoal-700">
                    {order.order_number}
                  </p>
                  <span className={`rounded-full px-2 py-0.5 font-button text-[9px] uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 font-body text-xs text-charcoal-500">{order.customer_name}</p>
                <p className="font-body text-xs text-charcoal-400">
                  {new Date(order.created_at).toLocaleDateString()} · ₵{Number(order.total).toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Order detail drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal-900/50 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-white shadow-luxe-lg"
            >
              <div className="flex items-center justify-between border-b border-blush-100 px-6 py-5">
                <div>
                  <h2 className="font-display text-lg font-bold text-charcoal-700">
                    {selectedOrder.order_number}
                  </h2>
                  <p className="font-body text-xs text-charcoal-400">
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
                <button onClick={() => setSelectedOrder(null)} aria-label="Close drawer">
                  <X className="h-6 w-6 text-charcoal-400 hover:text-charcoal-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Status */}
                <div>
                  <p className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                    Order Status
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedOrder.id, status)}
                        className={`rounded-full px-3 py-1.5 font-button text-[10px] uppercase tracking-wider transition-all ${
                          selectedOrder.status === status
                            ? STATUS_COLORS[status]
                            : 'bg-nude-50 text-charcoal-400 hover:bg-nude-100'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer info */}
                <div className="mt-6">
                  <p className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                    Customer
                  </p>
                  <div className="mt-2 space-y-2">
                    <p className="font-body text-sm font-medium text-charcoal-700">
                      {selectedOrder.customer_name}
                    </p>
                    <p className="flex items-center gap-2 font-body text-sm text-charcoal-500">
                      <Mail className="h-3.5 w-3.5 text-rosegold-400" /> {selectedOrder.customer_email}
                    </p>
                    {selectedOrder.customer_phone && (
                      <p className="flex items-center gap-2 font-body text-sm text-charcoal-500">
                        <Phone className="h-3.5 w-3.5 text-rosegold-400" /> {selectedOrder.customer_phone}
                      </p>
                    )}
                    <p className="flex items-start gap-2 font-body text-sm text-charcoal-500">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-rosegold-400" />
                      {selectedOrder.shipping_address}, {selectedOrder.city}
                      {selectedOrder.postal_code && `, ${selectedOrder.postal_code}`}
                      {`, ${selectedOrder.country}`}
                    </p>
                  </div>
                </div>

                {/* Delivery notes */}
                {selectedOrder.delivery_notes && (
                  <div className="mt-6">
                    <p className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Delivery Notes
                    </p>
                    <p className="mt-2 rounded-luxe bg-nude-50 p-3 font-body text-sm text-charcoal-600">
                      {selectedOrder.delivery_notes}
                    </p>
                  </div>
                )}

                {/* Items */}
                <div className="mt-6">
                  <p className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                    Items ({(selectedOrder.items as OrderItem[]).length})
                  </p>
                  <div className="mt-2 space-y-3">
                    {(selectedOrder.items as OrderItem[]).map((item, i) => (
                      <div key={i} className="flex gap-3 rounded-luxe border border-blush-100 p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-14 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-body text-sm font-medium text-charcoal-700 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
                            {item.category}
                          </p>
                          <p className="font-body text-xs text-charcoal-400">
                            Qty: {item.quantity} × ₵{item.price}
                          </p>
                        </div>
                        <p className="font-body text-sm font-semibold text-charcoal-700">
                          ₵{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-2 border-t border-blush-100 pt-4">
                  <div className="flex justify-between font-body text-sm text-charcoal-500">
                    <span>Subtotal</span>
                    <span>₵{Number(selectedOrder.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-charcoal-500">
                    <span>Shipping</span>
                    <span>
                      {Number(selectedOrder.shipping) === 0 ? 'Free' : `₵${Number(selectedOrder.shipping).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-blush-100 pt-2 font-display text-lg font-bold text-charcoal-700">
                    <span>Total</span>
                    <span>₵{Number(selectedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
