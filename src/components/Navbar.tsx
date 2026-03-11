import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage, useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const lang = useLanguage();
  const { theme } = useAppContext();
  const tr = translations[lang];
  const isLight = theme === 'light';

  const navItems = [
    { path: '/', label: tr.nav_home },
    { path: '/about', label: tr.nav_about },
    { path: '/work', label: tr.nav_work },
    { path: '/contact', label: tr.nav_contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Pill background adapts to theme ──────────────────────────────────────
  const pillBg = isLight
    ? 'rgba(255,255,255,0.88)'
    : scrolled ? 'rgba(5,5,8,0.88)' : 'rgba(255,255,255,0.06)';

  const pillBorder = isLight
    ? '1px solid rgba(0,0,0,0.12)'
    : '1px solid rgba(255,255,255,0.14)';

  const pillShadow = isLight
    ? '0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)'
    : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)';

  const textActive = isLight ? '#0A0A14' : '#F0F4FF';
  const textMuted = isLight ? 'rgba(10,10,20,0.55)' : 'rgba(240,244,255,0.55)';
  const dividerColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.12)';

  return (
    <motion.nav
      className="fixed z-50 flex items-center justify-center"
      style={{ top: '20px', left: '50%', translateX: '-50%' }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
    >
      <div
        className="flex items-center px-2 py-2 rounded-full"
        style={{
          background: pillBg,
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: pillBorder,
          boxShadow: pillShadow,
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          gap: '4px',
        }}
      >
        {navItems.map(({ path, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink key={path} to={path} className="relative">
              <motion.div
                className="relative px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  color: isActive ? textActive : textMuted,
                  // no textShadow in light mode — it would be dark-on-light
                  textShadow: isLight ? 'none' : '0 1px 8px rgba(0,0,0,0.5)',
                }}
                whileHover={{ color: textActive }}
                transition={{ duration: 0.2 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isLight ? 'rgba(79,142,247,0.10)' : 'rgba(79,142,247,0.15)',
                      border: '1px solid rgba(79,142,247,0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#4F8EF7', boxShadow: '0 0 6px #4F8EF7' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: dividerColor, margin: '0 4px' }} />

        {/* Download CV */}
        <motion.a
          href={`/${tr.cv_file}`}
          download={tr.cv_download_name}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full"
          style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 600,
            color: '#34D399',
            background: isLight ? 'rgba(52,211,153,0.12)' : 'rgba(52,211,153,0.10)',
            border: '1px solid rgba(52,211,153,0.30)',
            letterSpacing: '0.03em',
            textDecoration: 'none', cursor: 'none',
          }}
          whileHover={{ scale: 1.05, background: 'rgba(52,211,153,0.20)', boxShadow: '0 0 16px rgba(52,211,153,0.25)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
            <path d="M8 12l-4-4h2.5V3h3v5H12L8 12zM3 13h10v1.5H3V13z"/>
          </svg>
          {tr.nav_cv}
        </motion.a>
      </div>
    </motion.nav>
  );
}
