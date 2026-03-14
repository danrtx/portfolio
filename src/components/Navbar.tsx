import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage, useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';
import { LiquidGlass } from 'simple-liquid-glass';

export function Navbar() {
  const location = useLocation();
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

  // ── Pill background adapts to theme ──────────────────────────────────────
  const textActive = isLight ? '#0A0A14' : '#F0F4FF';
  const textMuted = isLight ? 'rgba(10,10,20,0.55)' : 'rgba(240,244,255,0.55)';
  const dividerColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.12)';

  return (
    <motion.nav
      className="desktop-navbar hidden md:flex fixed items-center justify-center"
      style={{ top: '20px', left: '50%', translateX: '-50%', zIndex: 100 }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
    >
      <LiquidGlass
        radius={100}
        frost={isLight ? 0.1 : 0.05}
        effectMode="auto"
        mobileFallback="css-only"
      >
        <div
          className="flex items-center px-2 py-2 rounded-full"
          style={{
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
      </LiquidGlass>
    </motion.nav>
  );
}
