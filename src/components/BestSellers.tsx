import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import ProductCard from './ui/ProductCard';
import type { Product } from '@/lib/types';

import 'swiper/css';
import 'swiper/css/pagination';

interface BestSellersProps {
  products: Product[];
  loading: boolean;
  onQuickView?: (product: Product) => void;
}

export default function BestSellers({ products, loading, onQuickView }: BestSellersProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const bestSellers = products.filter(
    (p) => p.badge === 'Best Seller' || p.badge === 'Trending' || p.badge === "Editor's Pick" || p.badge === 'Limited Edition'
  ).slice(0, 8);

  if (bestSellers.length < 4) {
    // Fallback: use top-rated products
    const fallback = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
    while (bestSellers.length < 8 && bestSellers.length < fallback.length) {
      bestSellers.push(fallback[bestSellers.length]);
    }
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-400">
            Customer Favorites
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Best Sellers
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-400 sm:text-base">
            Our most-loved luxury beauty essentials, loved by thousands.
          </p>
        </motion.div>

        <div className="mt-12">
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-72 flex-shrink-0">
                  <div className="aspect-[4/5] w-full rounded-luxe skeleton" />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-12"
            >
              {bestSellers.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} onQuickView={onQuickView} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/shop" className="btn-secondary">
            Shop All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
}
