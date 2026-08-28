import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    name: 'Luxury Lip Collection',
    desc: 'Velvet mattes and glossy nudes',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Glow Essentials',
    desc: 'Highlighters & illuminating drops',
    image: 'https://images.pexels.com/photos/2532578/pexels-photo-2532578.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Nude Perfection',
    desc: 'Natural base & soft contour',
    image: 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Bold Beauty',
    desc: 'Statement eyes & bold lips',
    image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function MakeupCollection() {
  return (
    <section id="collections" className="section-padding bg-nude-50">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-400">
            Curated Edits
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Makeup Collections
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to="/shop?category=Makeup"
                className="group relative block overflow-hidden rounded-luxe"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    {collection.name}
                  </h3>
                  <p className="mt-1 font-body text-xs text-white/70">{collection.desc}</p>
                  <div className="mt-4 flex items-center gap-2 font-button text-xs uppercase tracking-wider text-blush-200 opacity-0 transition-all group-hover:opacity-100">
                    Discover <ArrowRight className="h-3.5 w-3.5" />
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
