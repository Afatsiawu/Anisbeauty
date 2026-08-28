import { motion } from 'framer-motion';
import { Sun, Moon, Droplet, Sparkles, FlaskRound, Leaf } from 'lucide-react';

const morningRoutine = [
  { icon: Droplet, name: 'Cleanser', desc: 'Gentle foaming cleanser' },
  { icon: FlaskRound, name: 'Serum', desc: 'Vitamin C brightening serum' },
  { icon: Sparkles, name: 'Moisturizer', desc: 'Hydra-Luxe moisturizer' },
  { icon: Sun, name: 'SPF', desc: 'Silk Shield SPF 50' },
];

const eveningRoutine = [
  { icon: Droplet, name: 'Cleanser', desc: 'Cream cleanser' },
  { icon: FlaskRound, name: 'Retinol', desc: 'Night renewal retinol' },
  { icon: Sparkles, name: 'Night Cream', desc: 'Rich night cream' },
  { icon: Leaf, name: 'Face Oil', desc: 'Nourishing facial oil' },
];

export default function BeautyRoutine() {
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
            Your Daily Ritual
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Beauty Routine
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-400 sm:text-base">
            A simple yet luxurious skincare ritual for morning and evening to keep
            your skin glowing around the clock.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Morning */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-luxe bg-blush-gradient p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-white">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-charcoal-700">
                Morning Routine
              </h3>
            </div>
            <div className="mt-6 space-y-4">
              {morningRoutine.map((step, i) => (
                <div key={step.name} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-rosegold-500 shadow-soft">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-charcoal-700">
                      <span className="text-rosegold-400">0{i + 1}.</span> {step.name}
                    </p>
                    <p className="font-body text-xs text-charcoal-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Evening */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-luxe bg-charcoal-700 p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush-400 text-white">
                <Moon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Evening Routine
              </h3>
            </div>
            <div className="mt-6 space-y-4">
              {eveningRoutine.map((step, i) => (
                <div key={step.name} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-blush-200">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-white">
                      <span className="text-blush-300">0{i + 1}.</span> {step.name}
                    </p>
                    <p className="font-body text-xs text-white/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
