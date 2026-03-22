import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', letterSpacing: '0.05em', opacity: 0.9 }}>
          © {new Date().getFullYear()} {tr.footer_text} &nbsp;·&nbsp; Built with React · TypeScript · Vite
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: 8, opacity: 0.75 }}>
          Press <kbd style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '0 5px', fontSize: '12px' }}>K</kbd> to open command palette
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}
