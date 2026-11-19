import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    setVisible(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-hover')
      );
      setHovered(!!isInteractive);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const animate = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.16);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.16);
      
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Precision Gold Center Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[#C59B27] rounded-full pointer-events-none z-50 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />
      {/* Fluid Trailing Ring with Navy & Gold Accents */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-40 border transition-all duration-150 ease-out ${
          clicked
            ? 'w-10 h-10 -ml-5 -mt-5 bg-[#C59B27]/20 border-[#C59B27]'
            : hovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-[#C59B27]/10 border-[#C59B27]/60 scale-125'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#0B192C]/30'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
