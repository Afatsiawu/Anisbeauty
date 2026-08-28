import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';

const galleryImages = [
  'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4202925/pexels-photo-4202925.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export default function InstagramGallery() {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush-gradient text-rosegold-500">
            <Instagram className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            @anisbeauty
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-400 sm:text-base">
            Follow us on Instagram for beauty inspiration, tutorials, and behind-the-scenes
            moments from the ANISBEAUTY world.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-6"
          >
            Follow Us
          </a>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {galleryImages.map((image, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-luxe"
            >
              <img
                src={image}
                alt="Instagram beauty post"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900/0 opacity-0 transition-all duration-300 group-hover:bg-charcoal-900/50 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
