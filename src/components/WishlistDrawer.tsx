import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/lib/toast-context';

export default function WishlistDrawer() {
  const { items, isOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    toggleWishlist(product);
    showToast(`${product.name} moved to cart`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal-900/50 backdrop-blur-sm"
            onClick={closeWishlist}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-white shadow-luxe-lg"
          >
            <div className="flex items-center justify-between border-b border-blush-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rosegold-500" />
                <h2 className="font-display text-xl font-bold text-charcoal-700">
                  Wishlist
                </h2>
                <span className="rounded-full bg-blush-100 px-2 py-0.5 font-body text-xs text-rosegold-500">
                  {items.length}
                </span>
              </div>
              <button onClick={closeWishlist} aria-label="Close wishlist">
                <X className="h-6 w-6 text-charcoal-400 hover:text-charcoal-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blush-50">
                    <Heart className="h-10 w-10 text-blush-300" />
                  </div>
                  <p className="mt-6 font-display text-lg font-semibold text-charcoal-700">
                    Your wishlist is empty
                  </p>
                  <p className="mt-2 font-body text-sm text-charcoal-400">
                    Save your favorite luxury beauty products here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 rounded-luxe border border-blush-100 p-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-body text-sm font-medium text-charcoal-700 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
                          {product.category}
                        </p>
                        <p className="mt-1 font-display text-base font-semibold text-charcoal-700">
                          ${product.price}
                        </p>
                        <div className="mt-auto flex items-center gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center gap-1.5 rounded-full bg-rosegold-500 px-4 py-2 font-button text-xs uppercase tracking-wider text-white transition-colors hover:bg-rosegold-600"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" /> Add
                          </button>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-charcoal-300 hover:text-rosegold-500"
                            aria-label="Remove from wishlist"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
