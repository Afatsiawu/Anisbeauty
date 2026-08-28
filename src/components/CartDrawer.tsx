import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal } = useCart();

  const shipping = items.length > 0 ? 8 : 0;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal-900/50 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-white shadow-luxe-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blush-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-rosegold-500" />
                <h2 className="font-display text-xl font-bold text-charcoal-700">
                  Shopping Cart
                </h2>
                <span className="rounded-full bg-blush-100 px-2 py-0.5 font-body text-xs text-rosegold-500">
                  {items.length}
                </span>
              </div>
              <button onClick={closeCart} aria-label="Close cart">
                <X className="h-6 w-6 text-charcoal-400 hover:text-charcoal-600" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blush-50">
                    <ShoppingBag className="h-10 w-10 text-blush-300" />
                  </div>
                  <p className="mt-6 font-display text-lg font-semibold text-charcoal-700">
                    Your cart is empty
                  </p>
                  <p className="mt-2 font-body text-sm text-charcoal-400">
                    Discover our luxury beauty collection
                  </p>
                  <button onClick={closeCart} className="btn-primary mt-6">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-luxe border border-blush-100 p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-body text-sm font-medium text-charcoal-700 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
                          {item.product.category}
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-charcoal-700">
                          ₵{item.product.price}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-blush-200 px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-charcoal-400 hover:text-rosegold-500"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-body text-sm font-medium text-charcoal-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-charcoal-400 hover:text-rosegold-500"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-charcoal-300 hover:text-rosegold-500"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-blush-100 px-6 py-5">
                <div className="space-y-2">
                  <div className="flex justify-between font-body text-sm text-charcoal-500">
                    <span>Subtotal</span>
                    <span>₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-charcoal-500">
                    <span>Shipping</span>
                    <span>₵{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-blush-100 pt-2 font-display text-lg font-bold text-charcoal-700">
                    <span>Total</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary mt-4 w-full"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
