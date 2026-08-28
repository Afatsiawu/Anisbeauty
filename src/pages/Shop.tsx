import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import ProductCard from '@/components/ui/ProductCard';
import { useStoreProducts } from '@/lib/use-store-products';
import type { Product } from '@/lib/types';

const CATEGORIES = ['All', 'Makeup', 'Skincare', 'Fragrances', 'Accessories'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

function SkeletonCard() {
  return (
    <div className="flex flex-col">
      <div className="aspect-[4/5] w-full rounded-luxe skeleton" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/3 rounded-full skeleton" />
        <div className="h-4 w-3/4 rounded-full skeleton" />
        <div className="h-3 w-1/4 rounded-full skeleton" />
      </div>
    </div>
  );
}

export default function Shop() {
  const { products, loading } = useStoreProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const selectedCategory = searchParams.get('category') || 'All';

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const setCategory = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-nude-100">
      <Navbar />

      {/* Shop header */}
      <section className="bg-blush-gradient py-16 md:py-20">
        <div className="container-luxe px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-500">
              Luxury Beauty Collection
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-charcoal-700 sm:text-5xl lg:text-6xl">
              Shop All Products
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-500 sm:text-base">
              Discover our full range of premium beauty essentials, from makeup and
              skincare to fragrances and accessories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="section-padding">
        <div className="container-luxe">
          {/* Filter bar */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategory(category)}
                  className={`rounded-full px-5 py-2.5 font-button text-xs uppercase tracking-wider transition-all ${
                    selectedCategory === category
                      ? 'bg-rosegold-500 text-white shadow-luxe'
                      : 'bg-white text-charcoal-600 border border-blush-100 hover:border-rosegold-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-blush-200 bg-white py-3 pl-11 pr-4 font-body text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200 sm:w-64"
                />
              </div>
              <div className="relative">
                <SlidersHorizontal className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-full border border-blush-200 bg-white py-3 pl-11 pr-4 font-body text-sm text-charcoal-700 focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200 sm:w-56"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="mb-6 font-body text-sm text-charcoal-400">
            Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl font-semibold text-charcoal-700">
                No products found
              </p>
              <p className="mt-2 font-body text-sm text-charcoal-400">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
