import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/projects';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
};

export function TestimonialsSection() {
  const lang = useLanguage();
  const tr = translations[lang];
  const data = tr.testimonials_data as readonly { name: string; role: string; quote: string }[];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const total = testimonials.length;
  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  };

  const current = testimonials[index];
  const t = data[index] ?? { name: '', role: '', quote: '' };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setGlare({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto" id="testimonials">
      <motion.span aria-hidden="true" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }} className="mb-4">
        {tr.testimonials_label}
      </motion.span>

      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="font-heading text-glass mb-12"
        style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
        {tr.testimonials_heading_1}{' '}<span className="gradient-text-green">{tr.testimonials_heading_accent}</span>
      </motion.h2>

      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="glass-card glare-host p-8"
            style={{ cursor: 'grab', position: 'relative', overflow: 'hidden' }}
            onMouseMove={handleMouseMove}
          >
            <div className="glare-layer" style={{ background: `radial-gradient(360px circle at ${glare.x}% ${glare.y}%, ${current.accent}14, transparent 60%)` }} />

            <div className="flex items-center gap-4 mb-6" style={{ position: 'relative' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: 'var(--glass-bg)', border: `1px solid ${current.accent}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: current.accent, fontWeight: 700, fontFamily: 'Syne, sans-serif',
              }}>
                {t.name.trim().charAt(0) || '?'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>{t.name}</div>
                <div style={{ color: current.accent, fontSize: '0.8rem' }}>{t.role}</div>
              </div>
              {current.placeholder && (
                <span className="glass-chip" style={{ fontSize: '0.6rem', color: '#F59E0B', borderColor: 'rgba(245,158,11,0.35)', flexShrink: 0 }}>
                  ✏️ {lang === 'es' ? 'EDITAR' : 'EDIT ME'}
                </span>
              )}
            </div>

            <blockquote style={{
              position: 'relative', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.75,
              fontStyle: current.placeholder ? 'italic' : 'normal', margin: 0,
            }}>
              “{t.quote}”
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`${lang === 'es' ? 'Ir al testimonio' : 'Go to testimonial'} ${i + 1}`}
            style={{
              width: i === index ? 20 : 8, height: 8, borderRadius: 100, border: 'none', cursor: 'none',
              background: i === index ? current.accent : 'var(--glass-border)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
