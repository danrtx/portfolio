import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

// ─── Icons ────────────────────────────────────────────────────────────────────
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" role="img" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" role="img" aria-hidden="true" focusable="false">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" role="img" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-label={`Switch to ${checked ? 'dark' : 'light'} mode`}
      aria-checked={checked}
      style={{
        width: 40, height: 22, borderRadius: 100, border: 'none', cursor: 'none',
        background: checked ? '#4F8EF7' : 'rgba(255,255,255,0.12)',
        position: 'relative', transition: 'background 0.25s ease',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute', top: 3, width: 16, height: 16, borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />
    </button>
  );
}

// ─── Lang Pill Switcher ───────────────────────────────────────────────────────
function LangPill({ lang, setLang }: { lang: 'en' | 'es'; setLang: (l: 'en' | 'es') => void }) {
  return (
    <div style={{ display: 'flex', gap: 0, background: 'rgba(255,255,255,0.07)', borderRadius: 100, padding: 2, border: '1px solid rgba(255,255,255,0.1)' }}>
      {(['en', 'es'] as const).map((opt) => (
        <motion.button
          key={opt}
          onClick={() => setLang(opt)}
          aria-label={opt === 'en' ? 'Switch language to English' : 'Cambiar idioma a Español'}
          aria-pressed={lang === opt}
          style={{
            padding: '3px 12px', borderRadius: 100, border: 'none', cursor: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            background: lang === opt ? '#4F8EF7' : 'transparent',
            color: lang === opt ? '#fff' : 'rgba(240,244,255,0.75)',
            transition: 'color 0.2s ease',
          }}
          whileHover={{ color: '#F0F4FF' }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {opt}
        </motion.button>
      ))}
    </div>
  );
}

// ─── Main Settings Button ─────────────────────────────────────────────────────
export function SettingsButton() {
  const { theme, setTheme, lang, setLang } = useAppContext();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const tr = translations[lang];
  const isLight = theme === 'light';

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Panel glass styles — flips with theme
  const panelBg = isLight
    ? 'rgba(245,247,255,0.92)'
    : 'rgba(14,14,22,0.92)';
  const panelBorder = isLight
    ? 'rgba(0,0,0,0.10)'
    : 'rgba(255,255,255,0.12)';
  const labelColor = isLight ? '#1a1a2e' : 'rgba(240,244,255,0.7)';
  const dividerColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

  return (
    <div className="fixed right-4 md:right-6 bottom-[100px] md:bottom-6 z-[9999]">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              position: 'absolute', bottom: 56, right: 0,
              width: 220,
              background: panelBg,
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: `1px solid ${panelBorder}`,
              borderRadius: 16,
              boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              padding: '12px 14px',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Theme Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ color: labelColor, opacity: 0.6, flexShrink: 0 }}>
                {isLight ? <SunIcon /> : <MoonIcon />}
              </span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: labelColor, flex: 1, fontWeight: 500 }}>
                {tr.settings_theme}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: labelColor, opacity: 0.5 }}>
                  {isLight ? tr.settings_theme_light : tr.settings_theme_dark}
                </span>
                <Toggle checked={isLight} onChange={() => setTheme(isLight ? 'dark' : 'light')} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: dividerColor, marginBottom: 12 }} />

            {/* Language Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.9rem', flexShrink: 0 }}>🌐</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: labelColor, flex: 1, fontWeight: 500 }}>
                {tr.settings_language}
              </span>
              <LangPill lang={lang} setLang={setLang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open settings — change theme and language"
        style={{
          width: 44, height: 44, borderRadius: '50%',
          cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: `1px solid ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)'}`,
          boxShadow: open
            ? '0 0 0 2px #4F8EF7, 0 8px 24px rgba(0,0,0,0.3)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          color: isLight ? '#1a1a2e' : 'rgba(240,244,255,0.7)',
          transition: 'box-shadow 0.2s ease, background 0.3s ease',
        }}
        whileHover={{
          scale: 1.1,
          color: '#4F8EF7',
          boxShadow: '0 0 0 1px rgba(79,142,247,0.5), 0 8px 24px rgba(0,0,0,0.4)',
        }}
        whileTap={{ scale: 0.95, rotate: open ? 0 : 30 }}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <GearIcon />
      </motion.button>
    </div>
  );
}
