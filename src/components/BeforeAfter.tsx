import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

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
            See The Transformation
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal-700 sm:text-4xl lg:text-5xl">
            Before & After
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-charcoal-400 sm:text-base">
            Drag the slider to reveal the difference. From natural everyday beauty
            to full glam — ANISBEAUTY has you covered.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-luxe shadow-luxe-lg"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After (Glam) - full background */}
            <img
              src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Glam look"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-4 right-4 rounded-full bg-charcoal-900/60 px-4 py-2 backdrop-blur-sm">
              <span className="font-button text-xs uppercase tracking-wider text-white">
                Glam Look
              </span>
            </div>

            {/* Before (Natural) - clipped */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src="https://images.pexels.com/photos/3993452/pexels-photo-3993452.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Natural look"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ width: `${containerRef.current?.offsetWidth || 100}%` }}
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-blush-400/80 px-4 py-2 backdrop-blur-sm">
                <span className="font-button text-xs uppercase tracking-wider text-white">
                  Natural Look
                </span>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-luxe-lg"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-luxe-lg">
                <MoveHorizontal className="h-5 w-5 text-rosegold-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
