import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ui/ProductCard';
import type { Product } from '@/lib/types';

interface NewArrivalsProps {
  products: Product[];
  loading: boolean;
  onQuickView?: (product: Product) => void;
}

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

export default function NewArrivals({ products, loading, onQuickView }: NewArrivalsProps) {
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  return (
    <section className="section-padding bg-nude-50">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-400">
              Just Dropped
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 font-button text-sm uppercase tracking-wider text-rosegold-500 transition-colors hover:text-rosegold-600"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
              ))}
        </div>
      </div>
    </section>
  );
}
