import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px]"
      style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #4F8EF7, #A78BFA, #34D399)',
          transform: 'scaleX(0)',
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(79,142,247,0.6)',
          transition: 'transform 0.05s linear',
        }}
      />
    </div>
  );
}
