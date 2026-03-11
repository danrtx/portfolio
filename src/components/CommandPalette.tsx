import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
  labelEs: string;
  icon: string;
}

const SECTIONS: Section[] = [
  { id: 'home',       label: 'Home',         labelEs: 'Inicio',      icon: '🏠' },
  { id: 'about',      label: 'About Me',     labelEs: 'Sobre mí',    icon: '👤' },
  { id: 'work',       label: 'Work',         labelEs: 'Proyectos',   icon: '💼' },
  { id: 'experience', label: 'Experience',   labelEs: 'Experiencia', icon: '🚀' },
  { id: 'education',  label: 'Education',    labelEs: 'Educación',   icon: '🎓' },
  { id: 'contact',    label: 'Contact',      labelEs: 'Contacto',    icon: '✉️' },
];

interface Props {
  lang: 'en' | 'es';
}

export function CommandPalette({ lang }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter sections
  const filtered = SECTIONS.filter((s) => {
    const label = lang === 'es' ? s.labelEs : s.label;
    return label.toLowerCase().includes(query.toLowerCase()) || s.id.includes(query.toLowerCase());
  });

  // Keyboard handler — Ctrl+K or just K when no input focused
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    const inInput = tag === 'INPUT' || tag === 'TEXTAREA';

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((o) => !o);
      return;
    }
    if (!inInput && e.key === 'k' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setOpen((o) => !o);
      return;
    }
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Arrow nav + enter
  const handleInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      handleSelect(filtered[selectedIdx]);
    }
  };

  const handleSelect = (section: Section) => {
    setOpen(false);
    // Always scroll — never use URL navigation on a single-page app
    if (section.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(section.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)', zIndex: 99990,
            }}
          />

          {/* Panel */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              position: 'fixed',
              top: '18%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90vw',
              maxWidth: 520,
              zIndex: 99991,
              background: 'rgba(10,10,20,0.92)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 18,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            {/* Search input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="rgba(240,244,255,0.4)" strokeWidth="2" width="16" height="16" style={{ flexShrink: 0 }}>
                <circle cx="8.5" cy="8.5" r="5.5" /><path d="M15 15l-3-3" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
                onKeyDown={handleInputKey}
                placeholder={lang === 'es' ? 'Buscar sección...' : 'Go to section...'}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
                  color: 'rgba(240,244,255,0.9)', cursor: 'none',
                }}
              />
              <kbd style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 6, padding: '2px 7px', fontSize: '0.65rem',
                color: 'rgba(240,244,255,0.35)', fontFamily: 'DM Sans, sans-serif',
              }}>esc</kbd>
            </div>

            {/* Results */}
            <div style={{ padding: '8px 8px', maxHeight: 320, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'rgba(240,244,255,0.3)', fontSize: '0.85rem', fontFamily: 'DM Sans' }}>
                  {lang === 'es' ? 'Sin resultados' : 'No results'}
                </div>
              ) : (
                filtered.map((section, i) => {
                  const label = lang === 'es' ? section.labelEs : section.label;
                  const isSelected = i === selectedIdx;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSelect(section)}
                      onMouseEnter={() => setSelectedIdx(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                        padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'none',
                        background: isSelected ? 'rgba(79,142,247,0.15)' : 'transparent',
                        textAlign: 'left', transition: 'background 0.12s ease',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{section.icon}</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: isSelected ? '#F0F4FF' : 'rgba(240,244,255,0.65)', fontWeight: isSelected ? 600 : 400 }}>
                        {label}
                      </span>
                      {isSelected && (
                        <span style={{ marginLeft: 'auto', color: '#4F8EF7', fontSize: '0.75rem', fontFamily: 'DM Sans' }}>↵ enter</span>
                      )}
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '8px 18px',
              display: 'flex', gap: 16, alignItems: 'center',
            }}>
              {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([key, desc]) => (
                <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <kbd style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 5, padding: '1px 6px', fontSize: '0.65rem', color: 'rgba(240,244,255,0.35)', fontFamily: 'DM Sans' }}>
                    {key}
                  </kbd>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(240,244,255,0.25)', fontFamily: 'DM Sans' }}>{desc}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
