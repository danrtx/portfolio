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

  return (
    <motion.nav
      className="desktop-navbar hidden md:flex fixed items-center justify-center"
      style={{ top: '20px', left: '50%', translateX: '-50%', zIndex: 100 }}
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

      </div>
    </motion.nav>
  );
}
