import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Cog, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const telemetryRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setVideoLoaded(true))
          .catch(() => setVideoError(true));
      }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.5'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        telemetryRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );

      // 2. Parallax scrub on scroll
      if (containerRef.current) {
        // Video depth scale & subtle pan
        if (videoWrapperRef.current) {
          gsap.to(videoWrapperRef.current, {
            yPercent: 18,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }

        // Hero text depth float upward
        gsap.to([headlineRef.current, subtextRef.current, ctaRef.current], {
          yPercent: -22,
          opacity: 0.1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom 20%',
            scrub: 0.8,
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-kps-dark"
    >
      {/* Cinematic Background Video Container with Parallax Depth */}
      <div ref={videoWrapperRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/services/generator-workshop.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-55' : 'opacity-25'
          }`}
        >
          <source src="/assets/hero-generator-workshop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback poster background if video fails */}
        {videoError && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/assets/services/generator-workshop.jpg')" }}
          />
        )}

        {/* Sophisticated Dark Industrial Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-kps-dark via-kps-dark/70 to-kps-dark/40" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 scanline-overlay opacity-15 pointer-events-none" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44 pb-12 my-auto w-full">
        <div className="max-w-4xl space-y-6">
          {/* Introductory Engineering Label */}
          <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              KEEN POWER SOLUTIONS | ENGINEERING EXCELLENCE
            </span>
          </div>

          {/* Main Headline with Reveal */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08] will-change-transform"
          >
            Powering Industries.{' '}
            <span className="text-gold-gradient block sm:inline mt-1 sm:mt-0">
              Engineering Tomorrow.
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-xl md:text-2xl text-slate-300 font-normal leading-relaxed max-w-3xl will-change-transform"
          >
            Reliable power generation, electrical engineering and turnkey energy solutions designed to keep businesses moving forward.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5 will-change-transform">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-slate-200 border border-slate-700 bg-slate-900/70 hover:border-amber-500/60 hover:text-amber-400 hover:bg-slate-900 transition-all duration-200 backdrop-blur-md"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Bottom Industrial Telemetry */}
      <div ref={telemetryRef} className="relative z-10 w-full border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-xs font-mono w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">POWER RANGE</span>
                <span className="font-bold text-slate-200">15 – 2500 kVA</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">VERIFIED CLIENTS</span>
                <span className="font-bold text-slate-200">100+ Satisfied</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Cog className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">PROJECT SCOPE</span>
                <span className="font-bold text-slate-200">Turnkey Solutions</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">COVERAGE</span>
                <span className="font-bold text-slate-200">Nationwide Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
