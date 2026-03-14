import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'light') setIsLight(true);
    else if (localTheme === 'dark') setIsLight(false);
    else setIsLight(!checkDark);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const seen = localStorage.getItem('settings-onboarding');
    
    if (!seen) {
      const pulseTimer = setTimeout(() => {
        setShowOnboarding(true);
      }, 2000);

      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2300);

      const hideTimer = setTimeout(() => {
        setShowOnboarding(false);
        setShowTooltip(false);
        localStorage.setItem('settings-onboarding', 'true');
      }, 7300);

      return () => {
        clearTimeout(pulseTimer);
        clearTimeout(tooltipTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <>
      {/* Pulse rings — independent from tooltip */}
      {showOnboarding && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '100px' : '24px',
              right: isMobile ? '16px' : '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #4F8EF7',
              zIndex: 999998,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '100px' : '24px',
              right: isMobile ? '16px' : '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #A78BFA',
              zIndex: 999998,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 10, y: isMobile ? 10 : 0, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 10, y: isMobile ? 10 : 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: isMobile ? '160px' : '28px',
              right: isMobile ? '16px' : '82px',
              zIndex: 999999,
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
                Theme & Language
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
    </>
  );
}
