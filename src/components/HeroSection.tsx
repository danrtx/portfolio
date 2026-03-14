import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { ParticleScene } from './ParticleScene';
import { TerminalCard } from './TerminalCard';
import { personal } from '../data/projects';
import { useLanguage, useTheme } from '../context/AppContext';
import { translations } from '../data/translations';

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, type: 'spring' as const, stiffness: 180, damping: 18 },
  }),
};

const title = personal.displayName; // "DANILO"

export function HeroSection() {
  const lang = useLanguage();
  const tr = translations[lang];

  const roles = [...tr.hero_roles] as string[];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const cvFile = lang === 'es' ? '/cv-danilo-montezuma-es.pdf' : '/cv-danilo-montezuma.pdf';
  const cvDownloadName = lang === 'es' ? 'Danilo_Montezuma_CV_ES.pdf' : 'Danilo_Montezuma_CV_EN.pdf';

  useEffect(() => {
    setDisplayed(''); setIsDeleting(false); setRoleIdx(0);
  }, [lang]);

  useEffect(() => {
    const currentRole = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < currentRole.length)
      t = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 75);
    else if (!isDeleting && displayed.length === currentRole.length)
      t = setTimeout(() => setIsDeleting(true), 2200);
    else if (isDeleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else { setIsDeleting(false); setRoleIdx((i) => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIdx, roles]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 10 });
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Make absolutely sure body scroll is enabled before scrolling
    document.body.style.overflow = 'unset';
    document.body.style.overflowX = 'hidden';

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative w-full md:overflow-hidden"
      style={{ height: '100vh', display: 'flex', alignItems: 'center' }}
      onMouseMove={handleMouseMove}
    >
      {/* Three.js background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}><ParticleScene /></div>

      {/* Radial gradient */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #050508 100%)' }} />

      {/* ── Left: all text content ──────────────────────────────────────── */}
      <div className="relative z-[2]" style={{ paddingLeft: '6vw', maxWidth: '55vw' }}>

        {/* Top Row: Badge + CV Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
          
          {/* Available for work badge */}
          <div className="glass-chip" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.7rem', letterSpacing: '0.15em', height: 'fit-content' }}>
            <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block', marginRight: 8 }} />
            {tr.hero_badge}
          </div>

          {/* CV download button */}
          <a
            href={cvFile}
            download={cvDownloadName}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.14)',
              color: isLight ? '#0A0A14' : '#F0F4FF',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            <Download size={13} color="#34D399" />
            <span>↓ CV</span>
          </a>
        </motion.div>

        {/* DANILO title */}
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 0.9, letterSpacing: '0.04em', marginBottom: 16, marginTop: 0 }}>
          <div style={{ display: 'flex', transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`, transition: 'transform 0.1s ease-out', width: '100%', overflow: 'visible', whiteSpace: 'nowrap' }}>
            {title.split('').map((letter, i) => (
              <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate="visible"
                className="gradient-text"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 13vw, 5rem)', lineHeight: 1, display: 'inline-block', fontWeight: 800 }}>
                {letter}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Typewriter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          style={{ marginBottom: 20, minHeight: '2rem', transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.3}px)`, transition: 'transform 0.15s ease-out' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.6rem)', fontWeight: 600, color: 'rgba(240,244,255,0.7)', letterSpacing: '0.04em' }}>
            {displayed}
            <span className="animate-pulse" style={{ color: '#4F8EF7', marginLeft: 2 }}>|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 36, maxWidth: 460, marginTop: 0 }}>
          {tr.hero_description}
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <motion.button className="glass-btn px-8 py-3"
            onClick={() => scrollToSection('work')}
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#F0F4FF', fontSize: '0.9rem', background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.4)', cursor: 'pointer' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79,142,247,0.3)' }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            {tr.hero_cta_work}
          </motion.button>
          <motion.button className="glass-btn px-8 py-3"
            onClick={() => scrollToSection('contact')}
            style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(240,244,255,0.7)', fontSize: '0.9rem', cursor: 'pointer' }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            {tr.hero_cta_contact}
          </motion.button>
        </motion.div>
      </div>

      {/* ── Right: Terminal card — absolutely positioned, never affects left layout ── */}
      <motion.div
        className="hidden lg:flex"
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, type: 'spring', stiffness: 140, damping: 20 }}
        style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 370, zIndex: 2 }}
      >
        <TerminalCard />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>{tr.hero_scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(240,244,255,0.3)' }}>↓</motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
