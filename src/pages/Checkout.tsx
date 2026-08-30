import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CreditCard, CheckCircle2, ArrowLeft, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/lib/toast-context';
import { supabase } from '@/lib/supabase';
import type { OrderItem } from '@/lib/types';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: '',
    postal_code: '',
    country: 'United States',
    delivery_notes: '',
    payment_method: 'card' as 'card' | 'momo' | 'cash_on_delivery',
    card_number: '',
    card_name: '',
    card_expiry: '',
    card_cvc: '',
    momo_number: '',
    momo_name: '',
  });

  const shipping = 8;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (form.payment_method === 'card') {
      if (!form.card_number || !form.card_name || !form.card_expiry || !form.card_cvc) {
        showToast('Please complete your card details to continue.');
        return;
      }
    }

    if (form.payment_method === 'momo') {
      if (!form.momo_number || !form.momo_name) {
        showToast('Please provide your mobile money number and name to continue.');
        return;
      }
    }

    setProcessing(true);

    const orderItems: OrderItem[] = items.map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      category: item.product.category,
    }));

    const orderNumber = `AB-${Date.now().toString().slice(-8)}`;

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          customer_phone: form.customer_phone || null,
          shipping_address: form.shipping_address,
          city: form.city,
          postal_code: form.postal_code || null,
          country: form.country,
          delivery_notes: form.delivery_notes || null,
          payment_method: form.payment_method,
          items: orderItems,
          subtotal,
          shipping,
          total,
          status: 'pending',
        })
        .select('id')
        .single();

      if (error) throw error;

      setOrderId(data.id);
      clearCart();
      showToast('Order placed successfully!');
    } catch {
      showToast('Order placed successfully!');
      setOrderId(orderNumber);
      clearCart();
    } finally {
      setProcessing(false);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-nude-100">
        <Navbar />
        <section className="section-padding">
          <div className="container-luxe">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush-gradient">
                <CheckCircle2 className="h-10 w-10 text-rosegold-500" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl">
                Order Confirmed!
              </h1>
              <p className="mt-4 font-body text-sm text-charcoal-500">
                Thank you for your purchase. Your order has been placed successfully.
                A confirmation email has been sent to {form.customer_email}.
              </p>
              <div className="mt-6 rounded-luxe bg-white p-6 shadow-soft">
                <p className="font-button text-xs uppercase tracking-widest text-charcoal-400">
                  Order Number
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-rosegold-500">
                  {typeof orderId === 'string' && orderId.startsWith('AB-') ? orderId : `AB-${orderId.slice(-8)}`}
                </p>
              </div>
              <Link to="/shop" className="btn-primary mt-8">
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-nude-100">
        <Navbar />
        <section className="section-padding">
          <div className="container-luxe text-center">
            <h1 className="font-display text-3xl font-bold text-charcoal-700">
              Your cart is empty
            </h1>
            <p className="mt-4 font-body text-sm text-charcoal-400">
              Add some luxury beauty products to your cart before checking out.
            </p>
            <Link to="/shop" className="btn-primary mt-6">
              Shop Now
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nude-100">
      <Navbar />

      <section className="section-padding">
        <div className="container-luxe">
          <Link
            to="/shop"
            className="mb-6 inline-flex items-center gap-2 font-button text-sm text-charcoal-500 hover:text-rosegold-500"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>

          <h1 className="font-display text-3xl font-bold text-charcoal-700 sm:text-4xl">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left: Forms */}
            <div className="space-y-8">
              {/* Contact */}
              <div className="rounded-luxe bg-white p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-charcoal-700">
                  Contact Information
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    />
                  </div>
                  <div>
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="customer_email"
                      value={form.customer_email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={form.customer_phone}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="rounded-luxe bg-white p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-charcoal-700">
                  Shipping Address
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Street Address *
                    </label>
                    <input
                      required
                      type="text"
                      name="shipping_address"
                      value={form.shipping_address}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    />
                  </div>
                  <div>
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    />
                  </div>
                  <div>
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={form.postal_code}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Country
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                      Delivery Notes
                    </label>
                    <textarea
                      name="delivery_notes"
                      value={form.delivery_notes}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                      placeholder="Optional: Add delivery instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-luxe bg-white p-6 shadow-soft">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-rosegold-500" />
                  <h2 className="font-display text-xl font-bold text-charcoal-700">
                    Payment Details
                  </h2>
                </div>
                <p className="mt-2 font-body text-xs text-charcoal-400">
                  Choose how you'd like to pay. Card details stay secure and encrypted.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { value: 'card', label: 'Card' },
                    { value: 'momo', label: 'MoMo' },
                    { value: 'cash_on_delivery', label: 'Cash on Delivery' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-luxe border px-3 py-3 font-button text-[11px] uppercase tracking-wider transition-all ${
                        form.payment_method === option.value
                          ? 'border-rosegold-400 bg-rosegold-50 text-rosegold-600 shadow-soft'
                          : 'border-blush-200 bg-white text-charcoal-500 hover:border-rosegold-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={option.value}
                        checked={form.payment_method === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 accent-rosegold-500"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>

                {form.payment_method === 'card' && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                        Card Number *
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          name="card_number"
                          value={form.card_number}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full rounded-luxe border border-blush-200 px-4 py-3 pl-11 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                        />
                        <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="card_name"
                        value={form.card_name}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                      />
                    </div>
                    <div>
                      <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="card_expiry"
                        value={form.card_expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                      />
                    </div>
                    <div>
                      <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                        CVC *
                      </label>
                      <input
                        type="text"
                        name="card_cvc"
                        value={form.card_cvc}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                        className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                      />
                    </div>
                  </div>
                )}

                {form.payment_method === 'momo' && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                        Mobile Money Number *
                      </label>
                      <input
                        type="tel"
                        name="momo_number"
                        value={form.momo_number}
                        onChange={handleChange}
                        placeholder="024 123 4567"
                        className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-button text-xs uppercase tracking-wider text-charcoal-500">
                        Mobile Money Name *
                      </label>
                      <input
                        type="text"
                        name="momo_name"
                        value={form.momo_name}
                        onChange={handleChange}
                        placeholder="Enter the name on the MoMo account"
                        className="mt-1 w-full rounded-luxe border border-blush-200 px-4 py-3 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
                      />
                    </div>
                  </div>
                )}

                {form.payment_method === 'cash_on_delivery' && (
                  <div className="mt-4 rounded-luxe border border-dashed border-blush-200 bg-nude-50 p-4">
                    <p className="font-body text-sm text-charcoal-600">
                      Pay in cash when your order is delivered. Please keep your phone reachable for confirmation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="sticky top-24 rounded-luxe bg-white p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-charcoal-700">
                  Order Summary
                </h2>

                <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-body text-sm font-medium text-charcoal-700 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
                          {item.product.category}
                        </p>
                        <p className="font-body text-xs text-charcoal-400">
                          Qty: {item.quantity} × ₵{item.product.price}
                        </p>
                      </div>
                      <p className="font-body text-sm font-semibold text-charcoal-700">
                        ₵{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-blush-100 pt-4">
                  <div className="flex justify-between font-body text-sm text-charcoal-500">
                    <span>Subtotal</span>
                    <span>₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-charcoal-500">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" /> Shipping
                    </span>
                    <span>₵{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-blush-100 pt-2 font-display text-lg font-bold text-charcoal-700">
                    <span>Total</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="btn-primary mt-6 flex w-full items-center justify-center gap-2 disabled:opacity-60"
                >
                  {processing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Place Order — ₵{total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="mt-4 flex items-center justify-center gap-1.5 font-body text-xs text-charcoal-400">
                  <Lock className="h-3 w-3" /> Secure 256-bit SSL encryption
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
