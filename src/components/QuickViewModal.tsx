import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/lib/toast-context';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setActiveImage(0);
    }
  }, [product]);

  if (!product) return null;

  const images = [product.image, product.hover_image].filter(Boolean) as string[];
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    showToast(`${product.name} added to cart`);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-charcoal-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="pointer-events-auto relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-luxe bg-white shadow-luxe-lg"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-soft backdrop-blur-sm transition-colors hover:bg-blush-100"
                aria-label="Close quick view"
              >
                <X className="h-5 w-5 text-charcoal-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Images */}
                <div className="relative">
                  <div className="aspect-square w-full overflow-hidden rounded-luxe bg-nude-100">
                    <img
                      src={images[activeImage]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                            activeImage === i ? 'border-rosegold-500' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col p-6 md:p-8">
                  <p className="font-button text-xs uppercase tracking-widest text-rosegold-400">
                    {product.category}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-charcoal-700">
                    {product.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i <= Math.round(product.rating)
                              ? 'fill-gold-400 text-gold-400'
                              : 'text-charcoal-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-body text-sm text-charcoal-400">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-charcoal-700">
                          ₵{product.price}
                    </span>
                    {product.old_price && (
                      <span className="font-body text-lg text-charcoal-300 line-through">
                        ₵{product.old_price}
                      </span>
                    )}
                    {product.badge && (
                      <span className="rounded-full bg-blush-100 px-3 py-1 font-button text-xs uppercase tracking-wider text-rosegold-500">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 font-body text-sm leading-relaxed text-charcoal-500">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-blush-200 px-4 py-2">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-charcoal-400 hover:text-rosegold-500"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-body text-sm font-medium text-charcoal-700">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-charcoal-400 hover:text-rosegold-500"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                        wished
                          ? 'border-rosegold-500 bg-rosegold-50'
                          : 'border-blush-200 hover:border-rosegold-400'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          wished ? 'fill-rosegold-500 text-rosegold-500' : 'text-charcoal-400'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="btn-primary mt-6 flex w-full items-center justify-center gap-2"
                  >
                      <ShoppingBag className="h-5 w-5" /> Add to Cart — ₵{(product.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
