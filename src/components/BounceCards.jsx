'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BounceCards.css';

gsap.registerPlugin(ScrollTrigger);

const toCard = (item) => {
  if (typeof item === 'string') return { src: item, alt: '' };
  return {
    src: item?.src || '',
    alt: item?.alt || '',
    title: item?.title || '',
    badge: item?.badge || '',
    desc: item?.desc || '',
    link: item?.link || ''
  };
};

const getResponsiveConfig = (width) => {
  const isSmallMobile = width < 375;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  if (isSmallMobile) {
    return {
      cardSize: 110,
      radius: 14,
      containerHeight: 230,
      containerWidth: Math.max(270, width - 28),
      scrollDistance: 400,
      initial: [
        { x: -42, y: 2, rotate: -5, scale: 0.92 },
        { x: -14, y: -1, rotate: -2, scale: 0.92 },
        { x: 14, y: -1, rotate: 2, scale: 0.92 },
        { x: 42, y: 2, rotate: 5, scale: 0.92 }
      ],
      expanded: [
        { x: -80, y: -12, rotate: -2, scale: 0.94 },
        { x: -27, y: 12, rotate: -1, scale: 0.94 },
        { x: 27, y: -12, rotate: 1, scale: 0.94 },
        { x: 80, y: 12, rotate: 2, scale: 0.94 }
      ]
    };
  }

  if (isMobile) {
    return {
      cardSize: 130,
      radius: 16,
      containerHeight: 250,
      containerWidth: Math.min(340, width - 32),
      scrollDistance: 450,
      initial: [
        { x: -50, y: 2, rotate: -6, scale: 0.95 },
        { x: -16, y: -1, rotate: -2, scale: 0.95 },
        { x: 16, y: -1, rotate: 2, scale: 0.95 },
        { x: 50, y: 2, rotate: 6, scale: 0.95 }
      ],
      expanded: [
        { x: -95, y: -16, rotate: -3, scale: 0.96 },
        { x: -32, y: 16, rotate: -1, scale: 0.96 },
        { x: 32, y: -16, rotate: 1, scale: 0.96 },
        { x: 95, y: 16, rotate: 3, scale: 0.96 }
      ]
    };
  }

  if (isTablet) {
    return {
      cardSize: 175,
      radius: 20,
      containerHeight: 310,
      containerWidth: Math.min(680, width - 48),
      scrollDistance: 650,
      initial: [
        { x: -95, y: 3, rotate: -7, scale: 1 },
        { x: -32, y: -1, rotate: -2, scale: 1 },
        { x: 32, y: -1, rotate: 2, scale: 1 },
        { x: 95, y: 3, rotate: 7, scale: 1 }
      ],
      expanded: [
        { x: -245, y: -4, rotate: -1.5, scale: 1 },
        { x: -82, y: -6, rotate: -0.5, scale: 1 },
        { x: 82, y: -6, rotate: 0.5, scale: 1 },
        { x: 245, y: -4, rotate: 1.5, scale: 1 }
      ]
    };
  }

  // Desktop
  return {
    cardSize: 220,
    radius: 22,
    containerHeight: 340,
    containerWidth: 880,
    scrollDistance: 800,
    initial: [
      { x: -135, y: 4, rotate: -8, scale: 1 },
      { x: -45, y: -2, rotate: -3, scale: 1 },
      { x: 45, y: -2, rotate: 3, scale: 1 },
      { x: 135, y: 4, rotate: 8, scale: 1 }
    ],
    expanded: [
      { x: -345, y: -4, rotate: -2, scale: 1.02 },
      { x: -115, y: -8, rotate: -0.5, scale: 1.02 },
      { x: 115, y: -8, rotate: 0.5, scale: 1.02 },
      { x: 345, y: -4, rotate: 2, scale: 1.02 }
    ]
  };
};

export default function BounceCards({
  images = [],
  className = '',
  style,
  borderWidth = 4,
  borderColor = '#FFFFFF',
  shadow = true,
  pinRef,
  onCardClick,
  onHoverChange
}) {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const [config, setConfig] = useState(() =>
    getResponsiveConfig(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  const cards = images.map(toCard);

  // Resize listener to adjust geometry across breakpoints
  useEffect(() => {
    const handleResize = () => {
      const newConfig = getResponsiveConfig(window.innerWidth);
      setConfig(newConfig);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger Pinned Expand & Collapse Timeline
  useEffect(() => {
    const pinTarget = pinRef?.current || rootRef.current;
    if (!pinTarget) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cardEls = cardRefs.current.filter(Boolean);
      if (cardEls.length === 0) return;

      // 1. Initial State: Establish compact stacked arrangement immediately
      cardEls.forEach((cardEl, i) => {
        const init = config.initial[i] || { x: 0, y: 0, rotate: 0, scale: 1 };
        gsap.set(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: init.x,
          y: init.y,
          rotation: init.rotate,
          scale: init.scale,
          transformOrigin: '50% 50%',
          zIndex: i + 1,
          opacity: 1
        });
      });

      // 2. Master Scroll-Driven Timeline: Compact -> Smooth Staggered Expansion -> Stay Expanded
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinTarget,
          start: 'center center',
          end: () => `+=${config.scrollDistance}`,
          pin: pinTarget,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // --- STAGE 0: Initial compact pause window (cards stay resting before scroll spreads them)
      tl.to({}, { duration: 0.25 });

      // --- STAGE 1: Scroll-Driven Expansion (Smooth staggered spreading of all cards)
      cardEls.forEach((cardEl, i) => {
        const exp = config.expanded[i] || { x: 0, y: 0, rotate: 0, scale: 1 };
        // Gentle stagger offset: outside cards lead the fanning motion
        const staggerDelay = Math.abs(i - 1.5) * 0.08;

        tl.to(
          cardEl,
          {
            x: exp.x,
            y: exp.y,
            rotation: exp.rotate,
            scale: exp.scale,
            duration: 1.5,
            ease: 'power2.inOut'
          },
          0.25 + staggerDelay
        );
      });

      // --- STAGE 2: Expanded Hold Window (Cards stay fully expanded as user continues scrolling)
      tl.to({}, { duration: 0.6 });

    }, rootRef);

    // Refresh ScrollTrigger to ensure all markers and spacers are in sync
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [config, pinRef]);

  return (
    <div
      ref={rootRef}
      className={`bounce-cards${className ? ` ${className}` : ''}`}
      style={{
        width: `${config.containerWidth}px`,
        height: `${config.containerHeight}px`,
        maxWidth: '100%',
        '--bounce-cards-size': `${config.cardSize}px`,
        '--bounce-cards-border': `${Math.max(0, borderWidth)}px`,
        '--bounce-cards-border-color': borderColor,
        '--bounce-cards-radius': `${config.radius}px`,
        '--bounce-cards-shadow': shadow
          ? '0 1px 3px rgba(0, 0, 0, 0.12), 0 10px 28px -6px rgba(0, 0, 0, 0.32)'
          : 'none',
        ...style
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onClick={() => onCardClick?.(i)}
          onMouseEnter={() => onHoverChange?.(i)}
          onMouseLeave={() => onHoverChange?.(-1)}
          className="bounce-cards__card bounce-cards__card--clickable cursor-pointer select-none"
          role="button"
          tabIndex={0}
          aria-label={card.alt || card.title || `Card ${i + 1}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick?.(i);
            }
          }}
        >
          {card.src && (
            <img
              src={card.src}
              alt={card.alt || card.title}
              draggable={false}
              loading="lazy"
            />
          )}
          {(card.title || card.badge) && (
            <div className="bounce-cards__overlay">
              {card.badge && (
                <span className="bounce-cards__badge">{card.badge}</span>
              )}
              {card.title && (
                <span className="bounce-cards__title">{card.title}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
