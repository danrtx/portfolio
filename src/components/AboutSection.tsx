import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import { skills, personal } from '../data/projects';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>{icon}</span>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.4 }}>{text}</span>
    </div>
  );
}

function ProfileCard() {
  const lang = useLanguage();
  const tr = translations[lang];

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  const chipSkills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Three.js'];

  const infoRows = [
    { icon: '📍', text: tr.info_location },
    { icon: '🎓', text: tr.info_education },
    { icon: '🌐', text: tr.info_languages },
    { icon: '✅', text: tr.info_status },
  ];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, perspective: 900, transformStyle: 'preserve-3d' }}
      className="float-animation w-full max-w-sm mx-auto"
      transition={{ type: 'spring', stiffness: 250, damping: 28 }}
    >
      <div
        style={{
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid var(--glass-border-strong)',
          borderRadius: '28px',
          boxShadow: 'var(--glass-shadow)',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, background: 'radial-gradient(circle, rgba(79,142,247,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #4F8EF7 0%, #A78BFA 100%)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 0 20px rgba(79,142,247,0.35)' }}>
            🧑‍💻
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {personal.name}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 2, lineHeight: 1.3 }}>
              {personal.role}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '100px', padding: '3px 9px', flexShrink: 0 }}>
            <span style={{ color: '#F5C842', fontSize: '0.65rem' }}>★</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.7rem', fontWeight: 600 }}>4.9</span>
          </div>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {chipSkills.map((s) => (
            <motion.span key={s} className="glass-chip" style={{ fontSize: '0.68rem' }}
              whileHover={{ borderColor: '#4F8EF7', color: '#4F8EF7', y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* Personal info rows */}
        <div className="space-y-2.5 mb-5" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '14px 16px' }}>
          {infoRows.map(({ icon, text }) => (
            <InfoRow key={icon} icon={icon} text={text} />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="w-full glass-btn py-3 flex items-center justify-center gap-2 flex-1"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', background: 'linear-gradient(135deg, rgba(79,142,247,0.18) 0%, rgba(52,211,153,0.12) 100%)', border: '1px solid rgba(79,142,247,0.35)', letterSpacing: '0.03em', cursor: 'pointer' }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(79,142,247,0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            {tr.about_cta}
          </motion.button>
          <motion.a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            className="glass-btn"
            style={{ width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0 }}
            whileHover={{ scale: 1.1, color: 'var(--accent1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const lang = useLanguage();
  const tr = translations[lang];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="about">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-4"
        style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }}>
        {tr.about_label}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-heading text-glass mb-6"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text-primary)' }}>
            {tr.about_heading_1}{' '}
            <span className="gradient-text">{tr.about_heading_accent}</span>
            {' '}{tr.about_heading_2}
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }} className="mb-8 space-y-4">
            <p>{tr.about_bio_1}</p>
            <p>{tr.about_bio_2}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-2">
            {skills.slice(0, 10).map((skill, i) => (
              <motion.span key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04, type: 'spring', stiffness: 300 }}
                className="glass-chip" style={{ cursor: 'default' }}
                whileHover={{ borderColor: skill.color, color: skill.color, boxShadow: `0 0 12px ${skill.color}40`, y: -2 }}>
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, type: 'spring', stiffness: 140 }}>
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}
