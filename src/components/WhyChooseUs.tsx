import { motion } from 'framer-motion';
import { Gem, Stethoscope, Rabbit, FlaskConical, Truck, Recycle } from 'lucide-react';

const reasons = [
  { icon: Gem, title: 'Premium Ingredients', desc: 'Sourced from the finest natural and scientific ingredients worldwide.' },
  { icon: Stethoscope, title: 'Dermatologist Tested', desc: 'Every formula is rigorously tested and approved by skincare experts.' },
  { icon: Rabbit, title: 'Cruelty-Free', desc: 'We never test on animals. All products are certified cruelty-free.' },
  { icon: FlaskConical, title: 'Paraben-Free', desc: 'Free from parabens, sulfates, and harmful chemicals for safe beauty.' },
  { icon: Truck, title: 'Fast Shipping', desc: 'Free express shipping on all orders above ₵75, worldwide delivery.' },
  { icon: Recycle, title: 'Sustainable Packaging', desc: 'Recyclable and eco-friendly packaging because luxury should be responsible.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-blush-gradient">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-button text-xs uppercase tracking-[0.3em] text-rosegold-500">
            The ANISBEAUTY Promise
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-500 sm:text-base">
            We believe luxury beauty should be effective, ethical, and extraordinary.
            Here is what sets us apart.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-start gap-4 rounded-luxe bg-white/70 p-6 backdrop-blur-sm transition-all hover:bg-white hover:shadow-luxe"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-rosegold-100 text-rosegold-500 transition-all group-hover:bg-rosegold-500 group-hover:text-white group-hover:scale-110">
                <reason.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal-700">
                  {reason.title}
                </h3>
                <p className="mt-1 font-body text-sm text-charcoal-500">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
