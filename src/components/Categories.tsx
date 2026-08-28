import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Makeup',
    subcategories: ['Lipsticks', 'Foundations', 'Eyeshadow', 'Blush', 'Highlighters', 'Concealers', 'Mascaras', 'Eyeliners'],
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Skincare',
    subcategories: ['Serums', 'Moisturizers', 'Face Masks', 'Sunscreen'],
    image: 'https://images.pexels.com/photos/4202925/pexels-photo-4202925.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Accessories',
    subcategories: ['Brush Sets', 'Beauty Blenders', 'Mirrors'],
    image: 'https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Perfumes',
    subcategories: ['Eau de Parfum', 'Extrait de Parfum'],
    image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Categories() {
  return (
    <section className="section-padding bg-nude-50">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-400">
            Curated Collections
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-400 sm:text-base">
            Explore our luxury beauty categories, each crafted with premium ingredients
            and designed to elevate your daily routine.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${category.name}`}
                className="group relative block overflow-hidden rounded-luxe"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="rounded-full bg-white/20 px-2.5 py-1 font-body text-[10px] text-white backdrop-blur-sm"
                      >
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="rounded-full bg-white/20 px-2.5 py-1 font-body text-[10px] text-white backdrop-blur-sm">
                        +{category.subcategories.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 font-button text-xs uppercase tracking-wider text-blush-200 opacity-0 transition-opacity group-hover:opacity-100">
                    Shop Now <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
