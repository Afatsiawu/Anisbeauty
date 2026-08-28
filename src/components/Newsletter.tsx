import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/lib/toast-context';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    showToast('Welcome to the ANISBEAUTY Club!');
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-padding bg-blush-gradient">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/60 text-rosegold-500 backdrop-blur-sm">
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Join the ANISBEAUTY Club
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-sm text-charcoal-500 sm:text-base">
            Receive exclusive offers, beauty tips, and early access to new collections.
            Be the first to know about our luxury launches.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-full border border-blush-200 bg-white/80 px-6 py-4 font-body text-sm text-charcoal-700 placeholder:text-charcoal-300 backdrop-blur-sm focus:border-rosegold-400 focus:outline-none focus:ring-2 focus:ring-rosegold-200"
            />
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <p className="mt-4 font-body text-xs text-charcoal-400">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
