import { motion } from 'framer-motion';
import { Rabbit, Truck, ShieldCheck, RefreshCw, Gem, Sparkles } from 'lucide-react';

const features = [
  { icon: Rabbit, title: 'Cruelty Free', desc: 'Never tested on animals' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Free shipping over $75' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: 'Encrypted checkout' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Gem, title: 'Premium Quality', desc: 'Luxury ingredients' },
  { icon: Sparkles, title: 'Beauty Experts', desc: 'Pro advice & tips' },
];

export default function Features() {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxe">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col items-center rounded-luxe border border-blush-100 bg-nude-50 p-5 text-center transition-all hover:shadow-luxe hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blush-100 text-rosegold-500 transition-all group-hover:bg-rosegold-500 group-hover:text-white group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-charcoal-700">
                {feature.title}
              </h3>
              <p className="mt-1 font-body text-xs text-charcoal-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
