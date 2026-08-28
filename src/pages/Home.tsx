import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import PromoBanner from '@/components/PromoBanner';
import NewArrivals from '@/components/NewArrivals';
import BestSellers from '@/components/BestSellers';
import WhyChooseUs from '@/components/WhyChooseUs';
import BeautyRoutine from '@/components/BeautyRoutine';
import Testimonials from '@/components/Testimonials';
import BeforeAfter from '@/components/BeforeAfter';
import MakeupCollection from '@/components/MakeupCollection';
import InstagramGallery from '@/components/InstagramGallery';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import { useStoreProducts } from '@/lib/use-store-products';
import type { Product } from '@/lib/types';

export default function Home() {
  const { products, loading } = useStoreProducts();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-nude-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories />
        <FeaturedProducts
          products={products}
          loading={loading}
          onQuickView={setQuickViewProduct}
        />
        <PromoBanner />
        <NewArrivals
          products={products}
          loading={loading}
          onQuickView={setQuickViewProduct}
        />
        <BestSellers
          products={products}
          loading={loading}
          onQuickView={setQuickViewProduct}
        />
        <WhyChooseUs />
        <BeautyRoutine />
        <Testimonials />
        <BeforeAfter />
        <MakeupCollection />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
