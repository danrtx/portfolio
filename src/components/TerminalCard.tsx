import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/AppContext';

// ─── Terminal lines by language ───────────────────────────────────────────────
const LINES = {
  en: [
    { prefix: '$ ', text: 'danilo --status', color: '#4F8EF7', delay: 0 },
    { prefix: '> ', text: 'Available for work ✓', color: '#34D399', delay: 700 },
    { prefix: '> ', text: 'Stack: React · Node.js · TypeScript', color: 'rgba(240,244,255,0.75)', delay: 1400 },
    { prefix: '> ', text: 'Location: Pasto, Colombia 🇨🇴', color: 'rgba(240,244,255,0.75)', delay: 2100 },
    { prefix: '> ', text: 'Building: something cool...', color: '#A78BFA', delay: 2800 },
  ],
  es: [
    { prefix: '$ ', text: 'danilo --estado', color: '#4F8EF7', delay: 0 },
    { prefix: '> ', text: 'Disponible para trabajar ✓', color: '#34D399', delay: 700 },
    { prefix: '> ', text: 'Stack: React · Node.js · TypeScript', color: 'rgba(240,244,255,0.75)', delay: 1400 },
    { prefix: '> ', text: 'Ubicación: Pasto, Colombia 🇨🇴', color: 'rgba(240,244,255,0.75)', delay: 2100 },
    { prefix: '> ', text: 'Construyendo: algo genial...', color: '#A78BFA', delay: 2800 },
  ],
};

function TypedLine({ prefix, text, color, startTyping }: {
  prefix: string; text: string; color: string; startTyping: boolean;
}) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!startTyping) return;
    let i = 0;
    setDisplayed('');
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [text, startTyping]);

  if (!startTyping && displayed === '') return null;

  return (
    <div className="flex items-start gap-0 font-mono leading-relaxed" style={{ fontSize: '0.78rem' }}>
      <span style={{ color: '#4F8EF7', flexShrink: 0, userSelect: 'none' }}>{prefix}</span>
      <span style={{ color }}>{displayed}</span>
      {displayed.length < text.length && startTyping && (
        <span className="inline-block w-[2px] h-[1em] ml-[1px] animate-pulse" style={{ background: '#4F8EF7', verticalAlign: 'sub' }} />
      )}
    </div>
  );
}

export function TerminalCard() {
  const lang = useLanguage();
  const lines = LINES[lang];
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeTyping, setActiveTyping] = useState(0);

  // Reset when language changes
  useEffect(() => {
    setVisibleCount(0);
    setActiveTyping(0);
  }, [lang]);

  // Stagger each line appearing
  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setVisibleCount(i + 1);
        setActiveTyping(i);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [lang, lines]);

  // Show final blinking cursor after all lines typed
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), lines[lines.length - 1].delay + lines[lines.length - 1].text.length * 32 + 400);
    return () => clearTimeout(t);
  }, [lang, lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 160, damping: 22 }}
      style={{
        background: 'rgba(8, 8, 16, 0.82)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        width: '100%',
        maxWidth: 380,
      }}
    >
      {/* Titlebar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px',
        background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Traffic lights */}
        {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />
        ))}
        <span style={{ fontFamily: 'DM Sans', fontSize: '0.65rem', color: 'rgba(240,244,255,0.75)', marginLeft: 6, letterSpacing: '0.06em' }}>
          danilo@portfolio ~ bash
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '14px 16px', minHeight: 130, fontFamily: "'Fira Code', 'Courier New', monospace" }}>
        {lines.map((line, i) => (
          <AnimatePresence key={`${lang}-${i}`}>
            {i < visibleCount && (
              <motion.div
                key={`line-${lang}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <TypedLine
                  prefix={line.prefix}
                  text={line.text}
                  color={line.color}
                  startTyping={i <= activeTyping}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        {/* Final blinking prompt */}
        {done && (
          <div className="flex items-center gap-0 font-mono" style={{ fontSize: '0.78rem', marginTop: 2 }}>
            <span style={{ color: '#4F8EF7' }}>$ </span>
            <span className="inline-block w-[7px] h-[13px] ml-[1px] animate-pulse" style={{ background: '#4F8EF7', borderRadius: 1 }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
