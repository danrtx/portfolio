import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function MobileNav() {
  const { theme } = useAppContext();
  const [activeSection, setActiveSection] = useState('home');
  const isLight = theme === 'light';

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Use IntersectionObserver to update active section naturally
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // SKIP observer updates while programmatic scroll is happening
        if (isScrollingRef.current) return;
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['home', 'about', 'work', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'about', label: 'About', Icon: User },
    { id: 'work', label: 'Work', Icon: Briefcase },
    { id: 'contact', label: 'Contact', Icon: Mail },
  ];

  const scrollTo = (id: string) => {
    // 1. Set active IMMEDIATELY on click — don't wait for scroll observer
    setActiveSection(id);
    
    // 2. Disable the scroll observer temporarily
    isScrollingRef.current = true;
    
    // 3. Scroll to section
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    
    // 4. Re-enable observer after scroll animation finishes (~800ms)
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  if (window.innerWidth >= 768) return null;

  return (
    <nav style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'flex-end',
      height: '60px',
      padding: '0 12px',
      overflow: 'visible',
      background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(15,15,25,0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.12)',
      borderRadius: '100px',
      boxShadow: isLight ? '0 8px 32px rgba(0,0,0,0.12)' : '0 8px 32px rgba(0,0,0,0.4)',
      gap: '4px'
    }}>
      {navItems.map(item => (
        <button key={item.id} onClick={() => scrollTo(item.id)}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            padding: '0 12px 8px',
            overflow: 'visible',
            background: 'none',
            border: 'none',
            cursor: 'none',
          }}
        >
          {/* Active item: circle pops ABOVE the bar */}
          <AnimatePresence mode="popLayout">
            {activeSection === item.id && (
              <motion.div
                key={`bubble-${item.id}`}
                initial={{ opacity: 0, scale: 0.5, y: 8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: -10,
                  transition: { type: 'spring', stiffness: 500, damping: 35 }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5, 
                  y: 8,
                  transition: { duration: 0.12 }
                }}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: isLight ? '#0A0A14' : '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isLight ? '0 -6px 20px rgba(0,0,0,0.15)' : '0 -6px 20px rgba(0,0,0,0.25)',
                }}
              >
                <item.Icon size={18} color={isLight ? '#ffffff' : '#0A0A14'} />
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '9px',
                  fontWeight: 600,
                  color: isLight ? '#ffffff' : '#0A0A14',
                  marginTop: '2px',
                  textTransform: 'capitalize'
                }}>
                  {item.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inactive icon — always visible, scales/fades out when active */}
          <motion.div
            animate={{
              opacity: activeSection === item.id ? 0 : 1,
              scale: activeSection === item.id ? 0.8 : 1
            }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2px' // slight visual adjustment for alignment
            }}
          >
            <item.Icon size={18} color={isLight ? 'rgba(10,10,20,0.40)' : 'rgba(255,255,255,0.45)'} />
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '9px',
              color: isLight ? 'rgba(10,10,20,0.40)' : 'rgba(255,255,255,0.35)',
              marginTop: '1px',
              textTransform: 'capitalize'
            }}>
              {item.label}
            </span>
          </motion.div>
        </button>
      ))}
    </nav>
  );
}
