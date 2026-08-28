import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Heart, Leaf, Globe } from 'lucide-react';

const stats = [
  { value: 25000, suffix: '+', label: 'Happy Customers', icon: Heart },
  { value: 4.9, suffix: '★', label: 'Beauty Rating', icon: Star, decimal: true },
  { value: 100, suffix: '%', label: 'Cruelty-Free', icon: Leaf },
];

function AnimatedNumber({ value, decimal }: { value: number; decimal?: boolean }) {
  return (
    <span>
      {decimal ? value.toFixed(1) : value.toLocaleString()}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury beauty model with flawless makeup"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/70 via-charcoal-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-blush-300/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Rose gold decorative line */}
      <div className="absolute left-8 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-rosegold-400 to-transparent lg:block" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container-luxe px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-gold-400" />
              <p className="font-button text-xs uppercase tracking-[0.3em] text-blush-200 sm:text-sm">
                Discover Luxury Beauty
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 font-display text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
            >
              Enhance Your <span className="text-gradient-gold italic">Natural Glow</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Discover premium beauty products crafted to bring confidence,
              elegance, and timeless beauty to every moment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link to="/shop" className="btn-primary">
                Shop Collection
              </Link>
              <Link to="/shop?category=Makeup" className="btn-secondary">
                Explore Makeup
              </Link>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full glass">
                    <stat.icon className="h-5 w-5 text-blush-200" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white">
                      <AnimatedNumber value={stat.value} decimal={stat.decimal} />
                      {stat.suffix}
                    </p>
                    <p className="font-body text-xs text-white/70">{stat.label}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full glass">
                  <Globe className="h-5 w-5 text-blush-200" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-white">100+</p>
                  <p className="font-body text-xs text-white/70">Worldwide Shipping</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
