import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import { Project } from '../types';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

// ─── All projects (only real ones remain in data) ───────────────────────────
const allProjects = projects;

// Tag → accent color
const TAG_COLORS: Record<string, string> = {
  'react': '#4F8EF7', 'reactjs': '#4F8EF7', 'next.js': '#A78BFA',
  'typescript': '#4F8EF7', 'node.js': '#34D399', 'express': '#34D399',
  'postgresql': '#34D399', 'javascript': '#F5C842', 'css': '#A78BFA',
  'tailwind': '#4F8EF7', 'three.js': '#34D399', 'webgl': '#34D399',
  'd3': '#F5C842', 'design system': '#A78BFA', 'storybook': '#FF667C',
  'react native': '#4F8EF7', 'glsl': '#34D399', 'motion': '#A78BFA', 'api': '#34D399',
};
const tagColor = (tag: string) => TAG_COLORS[tag.toLowerCase()] ?? 'rgba(240,244,255,0.4)';

// ─── Glass browser mockup ─────────────────────────────────────────────────────
function MockBrowser({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.10)', borderBottom: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
        ))}
        <div style={{ flex: 1, marginLeft: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 5, padding: '2px 10px', fontSize: '0.6rem', color: 'rgba(240,244,255,0.3)', fontFamily: 'DM Sans', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Full-page Project Detail View ────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '8%' : '-8%', opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '8%' : '-8%', opacity: 0, scale: 0.97 }),
};

function ProjectDetailView({
  project, projectIndex, direction, onBack, onNavigate, lang,
}: {
  project: Project; projectIndex: number; direction: number;
  onBack: () => void; onNavigate: (dir: number) => void;
  lang: 'en' | 'es';
}) {
  const tr = translations[lang];
  const isLive = Boolean(project.link);
  const hasPrev = projectIndex > 0;
  const hasNext = projectIndex < allProjects.length - 1;

  // Lock body scroll while detail view is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const innerVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '50%' : '-50%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-50%' : '50%', opacity: 0 }),
  };

  return (
    <>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.id}
          custom={direction}
          variants={innerVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }}
        >
          {/* Hero image — full width, starts at top:0, floats under navbar */}
      <div style={{ position: 'relative', height: 'clamp(320px, 52vh, 540px)', overflow: 'hidden', marginTop: 0 }}>
        <img src={project.image} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Top fade — darkens under navbar so glass text stays readable */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
        {/* Bottom + left overlays — fade to theme bg */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 65%)' }} />

        {/* Title + badges — paddingTop keeps content below navbar (~70px) + breathing room */}
        <div style={{ position: 'absolute', bottom: 40, left: '6vw', right: '6vw', paddingTop: 90 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <span className="glass-chip" style={{ fontSize: '0.65rem' }}>{project.year}</span>
            <span className="glass-chip" style={{ fontSize: '0.65rem', color: '#4F8EF7', borderColor: 'rgba(79,142,247,0.4)' }}>
              {project.role}
            </span>
            {isLive && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.35)', borderRadius: 100, padding: '3px 10px', fontSize: '0.6rem', color: '#34D399', fontFamily: 'DM Sans', fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 6px #34D399' }} />
                LIVE
              </span>
            )}
          </div>
          {/* Title/subtitle stay white over image — textShadow ensures contrast on both themes */}
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#F0F4FF', margin: 0, lineHeight: 1.05, textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: 'DM Sans', fontSize: '1rem', color: 'rgba(240,244,255,0.75)', margin: '8px 0 0', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 6vw 0', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48 }}
        className="block lg:grid">
        {/* Left: description + responsibilities */}
        <div>
          <div style={{ fontFamily: 'DM Sans', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 14 }}>
            {lang === 'es' ? 'DESCRIPCIÓN' : 'DESCRIPTION'}
          </div>
          <p style={{ fontFamily: 'DM Sans', fontSize: '0.97rem', color: 'var(--text-primary)', lineHeight: 1.85, marginBottom: 36, opacity: 0.8 }}>
            {project.longDescription ?? project.description}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {isLive ? (
              <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px', borderRadius: 100, background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.4)', color: 'var(--accent1)', fontFamily: 'DM Sans', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', cursor: 'none' }}
                whileHover={{ background: 'rgba(79,142,247,0.28)', boxShadow: '0 0 24px rgba(79,142,247,0.25)' }}
                whileTap={{ scale: 0.97 }}>
                {tr.work_view_live} ↗
              </motion.a>
            ) : (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 18px', borderRadius: 100,
                background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)', fontFamily: 'DM Sans', fontSize: '0.82rem',
                fontStyle: 'italic',
              }}>
                {project.slug === 'mastercoffe-pasto'
                  ? (lang === 'es'
                      ? '🏆 Desplegado para competencia · Retirado tras el evento (2023)'
                      : '🏆 Deployed for competition · Taken down after event (2023)')
                  : (lang === 'es' ? 'Sin despliegue público' : 'Not publicly deployed')}
              </span>
            )}
            {project.github && (
              <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 100, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'DM Sans', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', cursor: 'none' }}
                whileHover={{ color: 'var(--text-primary)', background: 'var(--glass-bg-strong)' }} whileTap={{ scale: 0.97 }}>
                {'</>'} {tr.work_view_github}
              </motion.a>
            )}
          </div>
        </div>

        {/* Right: tech stack */}
        <div>
          <div style={{ fontFamily: 'DM Sans', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 14 }}>
            TECH STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(project.technologies ?? project.tags).map((tech) => (
              <span key={tech} style={{ padding: '6px 14px', borderRadius: 100, fontSize: '0.78rem', fontFamily: 'DM Sans', fontWeight: 600, background: `${tagColor(tech)}18`, border: `1px solid ${tagColor(tech)}40`, color: tagColor(tech) }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      </motion.div>
      </AnimatePresence>

      {/* ── Fixed bottom navigation — fully theme-aware ─────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        padding: '16px 6vw',
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderTop: '1px solid var(--glass-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Back to grid */}
        <motion.button onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 100, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', fontFamily: 'DM Sans', fontSize: '0.82rem', color: 'var(--text-muted)', cursor: 'none' }}
          whileHover={{ color: 'var(--text-primary)', background: 'var(--glass-bg-strong)', borderColor: 'var(--glass-border-strong)' }}
          whileTap={{ scale: 0.96 }}>
          ← {lang === 'es' ? 'Volver a Proyectos' : 'Back to Projects'}
        </motion.button>

        {/* Prev / Next */}
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ label: `← ${lang === 'es' ? 'Anterior' : 'Prev'}`, fn: () => onNavigate(-1), active: hasPrev },
            { label: `${lang === 'es' ? 'Siguiente' : 'Next'} →`, fn: () => onNavigate(1), active: hasNext }].map(({ label, fn, active }) => (
            <motion.button key={label} onClick={fn} disabled={!active}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 100, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', fontFamily: 'DM Sans', fontSize: '0.82rem', cursor: 'none', color: 'var(--text-muted)', opacity: active ? 1 : 0.35, transition: 'opacity 0.2s' }}
              whileHover={active ? { color: 'var(--text-primary)', background: 'var(--glass-bg-strong)', borderColor: 'var(--glass-border-strong)' } : {}}
              whileTap={active ? { scale: 0.96 } : {}}>
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Project grid card ────────────────────────────────────────────────────────
function ProjectCard({ project, isReal, onOpen }: { project: Project; isReal: boolean; onOpen?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const isLive = Boolean(project.link);

  if (!isReal) {
    // Coming soon card — greyed out, no hover
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 0.5, y: 0 }} style={{ filter: 'grayscale(0.5)' }}>
        <div className="glass-card overflow-hidden">
          <div style={{ height: 190, position: 'relative', overflow: 'hidden' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,8,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', color: 'rgba(240,244,255,0.45)', background: 'rgba(0,0,0,0.5)', borderRadius: 100, padding: '6px 16px', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '0.1em' }}>
                COMING SOON
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'rgba(240,244,255,0.35)', marginBottom: 6 }}>{project.title}</h3>
            <p style={{ color: 'rgba(240,244,255,0.2)', fontSize: '0.8rem', lineHeight: 1.6 }}>{project.description}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
      onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 800, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -8 }}>
      <div className="glass-card overflow-hidden" style={{ cursor: 'none' }}>
        <MockBrowser url={project.link || `danilo.dev/${project.slug}`}>
          <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
            <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.7) 0%, transparent 50%)' }} />
            {isLive && (
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.35)', borderRadius: 100, padding: '3px 9px', fontSize: '0.6rem', color: '#34D399', fontFamily: 'DM Sans', fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 6px #34D399' }} />
                LIVE
              </div>
            )}
          </div>
        </MockBrowser>
        <div className="p-5">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{project.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: 12 }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{ padding: '2px 10px', borderRadius: 100, fontSize: '0.64rem', fontFamily: 'DM Sans', fontWeight: 600, background: `${tagColor(tag)}18`, border: `1px solid ${tagColor(tag)}40`, color: tagColor(tag) }}>
                {tag}
              </span>
            ))}
          </div>
          <motion.button onClick={onOpen} className="w-full py-2 rounded-full"
            style={{ background: 'rgba(79,142,247,0.10)', border: '1px solid rgba(79,142,247,0.25)', color: '#4F8EF7', fontSize: '0.78rem', fontFamily: 'DM Sans', fontWeight: 600, cursor: 'none' }}
            whileHover={{ background: 'rgba(79,142,247,0.2)', boxShadow: '0 0 16px rgba(79,142,247,0.2)' }}
            whileTap={{ scale: 0.97 }}>
            View Details →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Work Section (root) ──────────────────────────────────────────────────────
type View = 'grid' | 'detail';

export function WorkSection() {
  const lang = useLanguage();
  const tr = translations[lang];
  const [view, setView] = useState<View>('grid');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const openDetail = (idx: number) => { setDirection(1); setSelectedIdx(idx); setView('detail'); };
  const goBack = () => { setDirection(-1); setView('grid'); };
  const navigate = (dir: number) => {
    const next = selectedIdx + dir;
    if (next < 0 || next >= allProjects.length) return;
    setDirection(dir);
    setSelectedIdx(next);
  };

  return (
    <div id="work" style={{ position: 'relative' }}>
      <AnimatePresence mode="wait" custom={direction}>
        {view === 'grid' ? (
          <motion.div key="grid"
            custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
            <section className="py-24 px-6 max-w-6xl mx-auto">
              {view === 'grid' && (
                <>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }}>
                {tr.work_label}
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1 }} className="font-heading text-glass mb-12"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
                {tr.work_heading_1}{' '}<span className="gradient-text">{tr.work_heading_accent}</span>
              </motion.h2>
                </>
              )}

              {/* Project cards — centered 2-column grid, max width so cards don't stretch */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24, maxWidth: 820, margin: '0 auto' }}>
                {allProjects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} isReal={true}
                    onOpen={() => openDetail(idx)} />
                ))}
              </div>

              {/* Subtle coming-soon caption */}
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{ textAlign: 'center', marginTop: 40, fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
              >
                {lang === 'es' ? '✦ Más proyectos próximamente' : '✦ More projects coming soon'}
              </motion.p>
            </section>
          </motion.div>
        ) : (
          <motion.div key="detail"
            initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'var(--bg)', overflowY: 'auto' }}>
            <ProjectDetailView
              project={allProjects[selectedIdx]}
              projectIndex={selectedIdx}
              direction={direction}
              onBack={goBack}
              onNavigate={navigate}
              lang={lang}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
