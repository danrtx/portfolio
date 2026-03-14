import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

// ─── Icons ────────────────────────────────────────────────────────────────────
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
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
          style={{
            padding: '3px 12px', borderRadius: 100, border: 'none', cursor: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            background: lang === opt ? '#4F8EF7' : 'transparent',
            color: lang === opt ? '#fff' : 'rgba(240,244,255,0.45)',
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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const tr = translations[lang];
  const isLight = theme === 'light';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Onboarding sequence
  useEffect(() => {
    // Double check localStorage on mount
    const seen = localStorage.getItem('settings-onboarding');
    
    if (!seen) {
      // Show pulse after 2 seconds
      const pulseTimer = setTimeout(() => {
        setShowOnboarding(true);
      }, 2000);

      // Show tooltip after 2.3 seconds
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2300);

      // Hide everything after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowOnboarding(false);
        setShowTooltip(false);
        localStorage.setItem('settings-onboarding', 'true');
      }, 5000);

      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(tooltipTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

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

      {/* Onboarding Animation */}
      {/* Pulse rings — independent from tooltip */}
      {showOnboarding && !open && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '100px' : '24px',
              right: isMobile ? '16px' : '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #4F8EF7',
              zIndex: 9998,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 2.0, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '100px' : '24px',
              right: isMobile ? '16px' : '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #A78BFA',
              zIndex: 9998,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 10, y: isMobile ? 10 : 0, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 10, y: isMobile ? 10 : 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '160px' : '28px',
              right: isMobile ? '16px' : '82px',
              zIndex: 9999,
              background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(15,15,25,0.95)',
              backdropFilter: 'blur(16px)',
              border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.15)',
              borderRadius: '14px',
              padding: '12px 16px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              ...(isMobile ? {
                bottom: '-6px',
                right: '11px', 
                borderBottom: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.15)',
                borderRight: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.15)',
              } : {
                right: '-5px',
                top: '50%',
                marginTop: '-5px', 
                borderTop: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.15)',
                borderRight: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.15)',
              }),
              width: '10px',
              height: '10px',
              background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(15,15,25,0.95)',
              transform: 'rotate(45deg)',
            }} />

            <span style={{ fontSize: '18px' }}>⚙️</span>
            <div>
              <div style={{
                color: isLight ? '#0A0A14' : '#F0F4FF',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '3px',
              }}>
                {tr.settings_theme} & {tr.settings_language}
              </div>
              <div style={{
                color: isLight ? 'rgba(10,10,20,0.55)' : 'rgba(240,244,255,0.55)',
                fontSize: '11px',
              }}>
                 Switch dark/light · EN / ES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
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
