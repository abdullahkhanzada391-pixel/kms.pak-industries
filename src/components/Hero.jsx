import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Cog, Activity, ChevronDown } from 'lucide-react';
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
  const scrollIndicatorRef = useRef(null);
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
        { opacity: 0, y: 40 },
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
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#111315]"
    >
      {/* Cinematic Background Video Container with Dark Luxury Industrial Grading */}
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
            videoLoaded ? 'opacity-50' : 'opacity-25'
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

        {/* Deep Charcoal & Forest-Green Industrial CSS Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-[#111315]/75 to-[#111315]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315]/90 via-[#174D38]/15 to-[#111315]/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
        <div className="absolute inset-0 bg-industrial-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44 pb-12 my-auto w-full">
        <div className="max-w-4xl space-y-6">
          {/* Introductory Eyebrow with Forest-Green Beacon */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#216447]/60 bg-[#174D38]/25 backdrop-blur-md shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E8B62] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#216447]" />
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#E8ECE9] uppercase">
              KEEN POWER SOLUTIONS | ENGINEERING EXCELLENCE
            </span>
          </div>

          {/* Main Headline with Reveal */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-[#E8ECE9] font-display leading-[1.08] will-change-transform"
          >
            POWERING INDUSTRIES.{' '}
            <span className="text-forest-gradient block sm:inline mt-1 sm:mt-0">
              ENGINEERING TOMORROW.
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-xl md:text-2xl text-[#929A96] font-normal leading-relaxed max-w-3xl will-change-transform"
          >
            Delivering reliable power generation, electrical engineering and turnkey energy solutions designed to keep businesses moving forward.
          </p>

          {/* CTA Buttons: Primary Crimson + Secondary Industrial Outline */}
          <div ref={ctaRef} className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5 will-change-transform">
            <Link
              to="/services"
              className="btn-crimson inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm tracking-wide group"
            >
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="btn-outline-industrial inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm tracking-wide backdrop-blur-md"
            >
              <span>Contact Our Team</span>
            </Link>
          </div>

          {/* Elegant Animated Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="pt-6 sm:pt-8 flex items-center gap-3 text-xs font-mono text-[#929A96]"
          >
            <div className="w-5 h-8 rounded-full border border-[#343B37] flex items-start justify-center p-1 bg-[#181C1B]/80">
              <span className="w-1 h-2 rounded-full bg-[#216447] animate-bounce" />
            </div>
            <span className="tracking-wider uppercase text-[11px] text-[#929A96]">
              Scroll to explore technical capabilities
            </span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Industrial Telemetry Strip */}
      <div ref={telemetryRef} className="relative z-10 w-full border-t border-[#343B37] bg-[#181C1B]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-xs font-mono w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174D38]/30 border border-[#216447]/40 text-[#2E8B62]">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#929A96] block text-[10px] uppercase tracking-wider">POWER RANGE</span>
                <span className="font-bold text-[#E8ECE9]">15 – 2500 kVA</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174D38]/30 border border-[#216447]/40 text-[#2E8B62]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#929A96] block text-[10px] uppercase tracking-wider">VERIFIED CLIENTS</span>
                <span className="font-bold text-[#E8ECE9]">100+ Satisfied</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174D38]/30 border border-[#216447]/40 text-[#2E8B62]">
                <Cog className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#929A96] block text-[10px] uppercase tracking-wider">PROJECT SCOPE</span>
                <span className="font-bold text-[#E8ECE9]">Turnkey Solutions</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174D38]/30 border border-[#216447]/40 text-[#2E8B62]">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[#929A96] block text-[10px] uppercase tracking-wider">COVERAGE</span>
                <span className="font-bold text-[#E8ECE9]">Nationwide Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
