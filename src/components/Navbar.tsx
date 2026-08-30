import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useStoreProducts } from '@/lib/use-store-products';
import type { Product } from '@/lib/types';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Makeup', path: '/shop?category=Makeup' },
  { label: 'Skincare', path: '/shop?category=Skincare' },
  { label: 'Fragrances', path: '/shop?category=Fragrances' },
  { label: 'Collections', path: '/#collections' },
  { label: 'Best Sellers', path: '/#best-sellers' },
  { label: 'About', path: '/#about' },
  { label: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, openCart } = useCart();
  const { count, openWishlist } = useWishlist();
  const { products } = useStoreProducts();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  const filteredResults: Product[] = searchQuery
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const trendingSearches = ['Lipstick', 'Serum', 'Foundation', 'Perfume', 'Mascara'];

  const handleSearchResult = (product: Product) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate('/shop');
  };

  return (
    <>
      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : 'bg-white/90 backdrop-blur-md shadow-soft'
        }`}
      >
        <nav className="container-luxe flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            className="lg:hidden flex-shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className={`h-6 w-6 ${transparent ? 'text-white' : 'text-charcoal-700'}`} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span
              className={`font-display text-xl font-bold tracking-wider sm:text-2xl ${
                transparent ? 'text-white' : 'text-charcoal-700'
              }`}
            >
              ANIS<span className="text-gradient-gold">BEAUTY</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`font-button text-xs font-medium uppercase tracking-wider transition-colors hover:text-rosegold-500 ${
                    transparent ? 'text-white/90' : 'text-charcoal-600'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              to="/shop"
              className={`hidden md:inline-flex items-center rounded-full border px-4 py-2 font-button text-[10px] uppercase tracking-wider transition-all hover:-translate-y-0.5 ${
                transparent
                  ? 'border-white/40 bg-white/10 text-white hover:bg-white/20'
                  : 'border-rosegold-200 bg-rosegold-50 text-rosegold-600 hover:bg-rosegold-100'
              }`}
            >
              Shop Now
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`transition-colors hover:text-rosegold-500 ${
                transparent ? 'text-white' : 'text-charcoal-600'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={openWishlist}
              aria-label="Wishlist"
              className={`relative transition-colors hover:text-rosegold-500 ${
                transparent ? 'text-white' : 'text-charcoal-600'
              }`}
            >
              <Heart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rosegold-500 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              aria-label="Cart"
              className={`relative transition-colors hover:text-rosegold-500 ${
                transparent ? 'text-white' : 'text-charcoal-600'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blush-400 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              to="/admin"
              aria-label="Profile"
              className={`hidden sm:block transition-colors hover:text-rosegold-500 ${
                transparent ? 'text-white' : 'text-charcoal-600'
              }`}
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-full w-[80%] max-w-sm bg-white shadow-luxe-lg lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-blush-100 px-6 py-5">
                <span className="font-display text-xl font-bold text-charcoal-700">
                  ANIS<span className="text-gradient-gold">BEAUTY</span>
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6 text-charcoal-600" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-4 py-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="block rounded-luxe px-4 py-3 font-button text-sm font-medium uppercase tracking-wider text-charcoal-600 transition-colors hover:bg-blush-50 hover:text-rosegold-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto px-6 py-4">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 font-button text-sm text-charcoal-500"
                >
                  <User className="h-4 w-4" /> Admin Login
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal-900/40 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed left-1/2 top-20 z-50 w-[90%] max-w-2xl -translate-x-1/2"
            >
              <div className="overflow-hidden rounded-luxe bg-white shadow-luxe-lg">
                <div className="flex items-center gap-3 border-b border-blush-100 px-5 py-4">
                  <Search className="h-5 w-5 text-charcoal-400" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, categories..."
                    className="flex-1 bg-transparent font-body text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:outline-none"
                  />
                  <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                    <X className="h-5 w-5 text-charcoal-400 hover:text-charcoal-600" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto p-5">
                  {!searchQuery && (
                    <div>
                      <p className="font-button text-xs uppercase tracking-widest text-charcoal-400">
                        Trending Searches
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="rounded-full bg-blush-50 px-4 py-2 font-body text-sm text-charcoal-600 transition-colors hover:bg-blush-100"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchQuery && filteredResults.length > 0 && (
                    <div className="space-y-3">
                      {filteredResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSearchResult(product)}
                          className="flex w-full items-center gap-4 rounded-luxe p-2 text-left transition-colors hover:bg-blush-50"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-body text-sm font-medium text-charcoal-700">
                              {product.name}
                            </p>
                            <p className="font-button text-xs uppercase tracking-wider text-rosegold-400">
                              {product.category}
                            </p>
                          </div>
                          <span className="font-display text-sm font-semibold text-charcoal-700">
                            ₵{product.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery && filteredResults.length === 0 && (
                    <p className="py-8 text-center font-body text-sm text-charcoal-400">
                      No products found for "{searchQuery}"
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
