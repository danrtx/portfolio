import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../data/projects';

const NAME = personal.displayName;
const FIRST = NAME.charAt(0);
const REST = NAME.slice(1);

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const letterStyle: React.CSSProperties = {
  fontFamily: 'Syne, sans-serif',
  fontWeight: 800,
  fontSize: 'clamp(4rem, 16vw, 9rem)',
  lineHeight: 1,
  letterSpacing: '0.02em',
};

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [stage, setStage] = useState<'letter' | 'word' | 'subtitle'>('letter');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setStage('word'), 900);
    const t2 = setTimeout(() => setStage('subtitle'), 1700);
    const t3 = setTimeout(() => setShow(false), 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      // ALWAYS unlock — no conditions
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
    };
  }, [reduced]);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    document.documentElement.style.overflow = '';
  };

  if (reduced) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(79,142,247,0.25) 0%, rgba(167,139,250,0.12) 45%, transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline' }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.4, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text shimmer"
              style={letterStyle}
            >
              {FIRST}
            </motion.span>

            {stage !== 'letter' &&
              REST.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="gradient-text shimmer"
                  style={letterStyle}
                >
                  {letter}
                </motion.span>
              ))}
          </div>

          <AnimatePresence>
            {stage === 'subtitle' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  marginTop: 20,
                  color: 'rgba(240,244,255,0.55)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                {personal.role}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
