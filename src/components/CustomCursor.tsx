import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  useEffect(() => {
    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.12);
      current.current.y = lerp(current.current.y, pos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x - 20}px, ${current.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${current.current.x + 16}px, ${current.current.y + 16}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Re-scans on every DOM change so hover targets stay valid across route
  // changes and in-page view toggles (e.g. Work grid <-> project detail).
  useEffect(() => {
    if (isTouchDevice()) return;

    const labelOwner = { current: null as Element | null };

    const addHover = (e: Event) => {
      cursorRef.current?.classList.add('scale-150');
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute('data-cursor-text');
      if (text) {
        labelOwner.current = target;
        setLabel(text);
      }
    };

    const removeHover = (e: Event) => {
      cursorRef.current?.classList.remove('scale-150');
      const target = e.currentTarget as HTMLElement;
      if (labelOwner.current === target) {
        labelOwner.current = null;
        setLabel(null);
      }
    };

    const attached = new Set<Element>();
    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor], [data-cursor-text]').forEach((el) => {
        if (attached.has(el)) return;
        attached.add(el);
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      attached.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[99999] transition-transform duration-100 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.20)',
            boxShadow: '0 0 16px rgba(79, 142, 247, 0.15)',
          }}
        />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[99999]"
        style={{ willChange: 'transform' }}
      >
        <div className="w-full h-full rounded-full bg-accent1" style={{ background: '#4F8EF7' }} />
      </div>
      {label && (
        <div ref={labelRef} className="fixed top-0 left-0 pointer-events-none z-[99999]" style={{ willChange: 'transform' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#4F8EF7',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 100,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {label}
          </span>
        </div>
      )}
    </>
  );
}
