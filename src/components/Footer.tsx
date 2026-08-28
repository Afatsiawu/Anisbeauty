import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Shield, CreditCard, Lock } from 'lucide-react';

const quickLinks = ['Shop', 'Best Sellers', 'New Arrivals', 'Collections', 'About'];
const customerCare = ['Shipping', 'Returns', 'FAQs', 'Privacy Policy', 'Terms', 'Blog'];

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal-700 text-white">
      <div className="container-luxe px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold">
              ANIS<span className="text-gradient-gold">BEAUTY</span>
            </h3>
            <p className="mt-4 font-body text-sm text-white/60">
              Beauty That Speaks Confidence. Premium luxury beauty products
              crafted to bring elegance to every moment.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Youtube, label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-blush-400 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-button text-sm font-semibold uppercase tracking-wider text-blush-200">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    to="/shop"
                    className="font-body text-sm text-white/60 transition-colors hover:text-blush-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-button text-sm font-semibold uppercase tracking-wider text-blush-200">
              Customer Care
            </h4>
            <ul className="mt-4 space-y-2">
              {customerCare.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm text-white/60 transition-colors hover:text-blush-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-button text-sm font-semibold uppercase tracking-wider text-blush-200">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 font-body text-sm text-white/60">
                <Mail className="h-4 w-4 text-blush-300" /> hello@anisbeauty.com
              </li>
              <li className="flex items-center gap-3 font-body text-sm text-white/60">
                <Phone className="h-4 w-4 text-blush-300" /> +1 (800) 555-0199
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blush-300" /> 123 Beauty Avenue,
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Trust */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            {[
              { icon: Shield, label: 'Secure' },
              { icon: Lock, label: 'Encrypted' },
              { icon: CreditCard, label: 'All Cards' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 font-body text-xs text-white/40"
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} ANISBEAUTY. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="font-body text-xs text-white/30 transition-colors hover:text-blush-300"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
