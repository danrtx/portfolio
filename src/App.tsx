import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SettingsButton } from './components/SettingsButton';
import { CommandPalette } from './components/CommandPalette';
import { MobileNav } from './components/MobileNav';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Stack } from './pages/Stack';
import { Work } from './pages/Work';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { useAppContext } from './context/AppContext';
import { translations } from './data/translations';
import { useSettingsOnboarding } from './hooks/useSettingsOnboarding';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:projectSlug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  const { lang } = useAppContext();
  const tr = translations[lang];

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <MobileNav />
      <SettingsButton />
      <CommandPalette lang={lang} />
      <main>
        <AnimatedRoutes />
      </main>
      <footer className="py-8 text-center" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} {tr.footer_text} &nbsp;·&nbsp; Built with React · TypeScript · Vite
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: 4, opacity: 0.6 }}>
          Press <kbd style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '0 5px', fontSize: '0.6rem' }}>K</kbd> to open command palette
        </p>
      </footer>
    </>
  );
}

function RootOnboarding() {
  const { showOnboarding, showTooltip, isMobile } = useSettingsOnboarding();
  const { theme, lang } = useAppContext();
  const tr = translations[lang];
  const isLight = theme === 'light';

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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProvider>
        <AppShell />
        <RootOnboarding />
      </AppProvider>
    </BrowserRouter>
  );
}
