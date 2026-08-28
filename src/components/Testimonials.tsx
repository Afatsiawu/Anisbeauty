import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/catalog';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
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
            Loved By Thousands
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.name}>
                <div className="flex h-full flex-col rounded-luxe bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i <= testimonial.rating
                            ? 'fill-gold-400 text-gold-400'
                            : 'text-charcoal-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-charcoal-600">
                    "{testimonial.review}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-blush-100 pt-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-body text-sm font-semibold text-charcoal-700">
                        {testimonial.name}
                      </p>
                      <p className="font-body text-xs text-charcoal-400">
                        {testimonial.location}
                      </p>
                    </div>
                    <span className="ml-auto flex items-center gap-1 rounded-full bg-blush-50 px-2.5 py-1 font-button text-[10px] uppercase tracking-wider text-rosegold-500">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
