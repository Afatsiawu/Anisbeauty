import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-blush-gradient" />
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury makeup products"
          loading="lazy"
          className="h-full w-full object-cover opacity-30 mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 container-luxe px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-500">
            Limited Time Campaign
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-charcoal-700 sm:text-5xl lg:text-6xl">
            Beauty Begins With <span className="italic text-gradient-gold">Confidence</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-body text-base text-charcoal-500 sm:text-lg">
            Embrace your unique beauty with our luxury collection. Up to 30% off
            selected essentials. Because you deserve to feel extraordinary.
          </p>
          <Link to="/shop" className="btn-primary mt-8">
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
