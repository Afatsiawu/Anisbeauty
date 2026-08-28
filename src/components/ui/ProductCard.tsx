import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useToast } from '@/lib/toast-context';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const badgeColors: Record<string, string> = {
  New: 'bg-rosegold-500 text-white',
  Sale: 'bg-blush-400 text-white',
  Trending: 'bg-gold-400 text-charcoal-800',
  'Best Seller': 'bg-charcoal-700 text-white',
  'Limited Edition': 'bg-gold-500 text-white',
  "Editor's Pick": 'bg-rosegold-400 text-white',
};

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wished = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-luxe bg-nude-100">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.badge && (
            <span
              className={`rounded-full px-3 py-1 font-button text-[10px] font-semibold uppercase tracking-wider ${
                badgeColors[product.badge] || 'bg-charcoal-700 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="rounded-full bg-blush-400 px-3 py-1 font-button text-[10px] font-semibold uppercase tracking-wider text-white">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-soft transition-all hover:scale-110 hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${wished ? 'fill-rosegold-500 text-rosegold-500' : 'text-charcoal-400'}`}
          />
        </button>

        {/* Image */}
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
          />
          {product.hover_image && (
            <img
              src={product.hover_image}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
            />
          )}
        </div>

        {/* Quick actions overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full gap-2 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rosegold-500 py-3 font-button text-xs font-semibold uppercase tracking-wider text-white shadow-luxe transition-colors hover:bg-rosegold-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-charcoal-700 shadow-luxe transition-colors hover:bg-blush-100"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        <p className="font-button text-[11px] uppercase tracking-widest text-rosegold-400">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-base font-medium leading-snug text-charcoal-700 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i <= Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-charcoal-200'
                }`}
              />
            ))}
          </div>
          <span className="font-body text-xs text-charcoal-400">({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-lg font-semibold text-charcoal-700">
            ${product.price}
          </span>
          {product.old_price && (
            <span className="font-body text-sm text-charcoal-300 line-through">
              ${product.old_price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
