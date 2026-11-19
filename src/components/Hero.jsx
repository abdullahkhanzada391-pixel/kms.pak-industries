import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SpecularButton from './SpecularButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedHeading from './MaskedHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
      videoRef.current.play().catch(() => {});
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.2 }
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // Subtle parallax scrub for background video only
      if (containerRef.current && videoWrapperRef.current) {
        gsap.to(videoWrapperRef.current, {
          yPercent: 16,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0a0c0e]"
    >
      {/* Crystal Clear Background Video Container */}
      <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-105 opacity-100 brightness-[1.04] contrast-[1.04]"
        >
          <source src="/assets/hero-generator-workshop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Minimal Soft Text Legibility Gradient Only (Video Remains Bright and Crystal Clear) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 my-auto w-full">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Main Headline - Crisp, Pure White & High Contrast */}
          <div ref={headlineRef} className="w-full">
            <h1 className="font-serif font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              POWERING INDUSTRIES<br />
              <span className="text-white">ENGINEERING TOMORROW.</span>
            </h1>
          </div>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-sm sm:text-lg md:text-xl text-white font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Reliable power solutions and engineering services designed to keep businesses moving.
          </p>

          {/* Action CTAs with React Bits SpecularButton */}
          <div ref={ctaRef} className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary Specular Button */}
            <SpecularButton
              to="/services"
              size="lg"
              radius={14}
              tint="#111827"
              tintOpacity={1}
              hoverTint="#1f2937"
              textColor="#FFFFFF"
              lineColor="#F59E0B"
              baseColor="#090d16"
              intensity={1.3}
              idleIntensity={0.4}
              thickness={1.5}
              glow={1.3}
              followMouse={true}
              className="font-bold text-xs uppercase tracking-wider group min-h-[48px] px-6 sm:px-8 py-4 shadow-warm-md w-full sm:w-auto border border-[#C59B27]/40"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform duration-300 group-hover:translate-x-1" />
            </SpecularButton>

            {/* Secondary Glass Gold Button */}
            <SpecularButton
              to="/contact"
              size="lg"
              radius={14}
              tint="#C59B27"
              tintOpacity={0.18}
              blur={12}
              textColor="#FFFFFF"
              borderColor="rgba(197, 155, 39, 0.5)"
              hoverTint="#C59B27"
              hoverTintOpacity={1}
              hoverTextColor="#0B192C"
              hoverBorderColor="#F59E0B"
              lineColor="#FDE68A"
              baseColor="#78550D"
              intensity={1.1}
              idleIntensity={0.3}
              thickness={1.3}
              glow={1.1}
              followMouse={true}
              className="font-bold text-xs uppercase tracking-wider min-h-[48px] px-6 sm:px-8 py-4 w-full sm:w-auto shadow-warm-xs"
            >
              <span>Contact Our Team</span>
            </SpecularButton>
          </div>
        </div>
      </div>
    </section>
  );
}
