import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Interactive3DViewer from '../components/Interactive3DViewer';
import TurnkeyProjects from '../components/TurnkeyProjects';
import TiltCard from '../components/TiltCard';
import { 
  Zap, 
  Settings, 
  Wrench, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Network, 
  Users, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef(null);
  const teaserTextRef = useRef(null);
  const teaserCardRef = useRef(null);
  const divisionsHeaderRef = useRef(null);
  const divisionsGridRef = useRef(null);
  const labHeaderRef = useRef(null);
  const ctaStripRef = useRef(null);

  const flagshipSolutions = [
    {
      title: 'Industrial Diesel & Gas Generators',
      capacity: '15 – 2500 kVA Range',
      theme: 'forest',
      desc: 'Sales, rentals, overhauls and certified O&M contracts featuring Lovol, Perkins, Weichai, and Cummins engines.',
      image: '/assets/services/generator-main.jpg',
      link: '/services'
    },
    {
      title: 'Electrical Engineering & Switchgear',
      capacity: 'Custom LT & HT Panels',
      theme: 'charcoal',
      desc: 'ATS/AMF synchronization panels, power factor capacitor banks, and smart distribution boards built to IEC standards.',
      image: '/assets/services/electrical-panel-switchgear.jpg',
      link: '/services'
    },
    {
      title: 'Acoustic Canopies & Heavy Fabrication',
      capacity: '68–75 dBA Attenuation',
      theme: 'forest',
      desc: 'Weatherproof soundproof generator enclosures, bulk fuel tanks, mobile trolleys, and certified fuel piping systems.',
      image: '/assets/services/fabrication-canopy-tanks.jpg',
      link: '/services'
    },
    {
      title: 'Commercial & Industrial Solar Solutions',
      capacity: 'On-Grid, Off-Grid & Hybrid',
      theme: 'charcoal',
      desc: 'Turnkey solar photovoltaic installations engineered for high-efficiency commercial peak-shaving and energy independence.',
      image: '/assets/services/solar-installation-commercial.jpg',
      link: '/services'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Executive Teaser Entrance
      if (teaserTextRef.current) {
        gsap.fromTo(
          teaserTextRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: teaserTextRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      if (teaserCardRef.current) {
        gsap.fromTo(
          teaserCardRef.current,
          { opacity: 0, x: 40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: teaserCardRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 2. Divisions Header & 4 Flagship Cards Stagger
      if (divisionsHeaderRef.current) {
        gsap.fromTo(
          divisionsHeaderRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: divisionsHeaderRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      if (divisionsGridRef.current) {
        gsap.fromTo(
          divisionsGridRef.current.children,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: divisionsGridRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 3. 3D Lab Header Reveal
      if (labHeaderRef.current) {
        gsap.fromTo(
          labHeaderRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: labHeaderRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 4. Bottom CTA Strip Entrance
      if (ctaStripRef.current) {
        gsap.fromTo(
          ctaStripRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaStripRef.current,
              start: 'top 90%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-0 bg-[#111315]">
      {/* 1. Cinematic Video Hero Section */}
      <Hero />

      {/* 2. Executive Overview Teaser in Dark Charcoal */}
      <section className="py-20 sm:py-28 bg-[#181C1B] border-t border-[#343B37] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-industrial-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div ref={teaserTextRef} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/30 border border-[#216447]/60 text-[#E8ECE9] text-xs font-mono uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#216447]" />
                <span>Engineering Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
                Turnkey Power & Engineering Solutions Designed to Keep Businesses Moving Forward.
              </h2>
              <p className="text-base sm:text-lg text-[#929A96] leading-relaxed">
                Keen Power Solutions (KPS) is a quality-driven engineering entity specializing in heavy electrical infrastructure, generator power plants up to 2500 kVA, industrial fabrication, and renewable energy nationwide.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#E8ECE9] bg-[#24282A] p-3 rounded-lg border border-[#343B37]">
                  <CheckCircle2 className="w-4 h-4 text-[#216447] shrink-0" />
                  <span>100+ Satisfied Corporate Clients</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#E8ECE9] bg-[#24282A] p-3 rounded-lg border border-[#343B37]">
                  <CheckCircle2 className="w-4 h-4 text-[#216447] shrink-0" />
                  <span>24/7 Field Dispatch & Emergency AMC</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="btn-forest inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  <span>Explore Company Profile & DNA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="btn-crimson inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  <span>Get a Quote</span>
                </Link>
              </div>
            </div>

            <div ref={teaserCardRef} className="lg:col-span-5">
              <TiltCard
                image="/assets/services/generator-workshop.jpg"
                alt="Keen Power Solutions Lahore Engineering Facility"
                title="Lahore Central Facility"
                subtitle="Full engine rebuild bays, resistive load banking, switchgear testing, and certified technician dispatch center."
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Flagship Engineering Solutions Preview */}
      <section className="py-24 sm:py-32 bg-[#111315] border-t border-[#343B37] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
          <div ref={divisionsHeaderRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#2E8B62] uppercase block mb-1">
                CORE CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display">
                Featured Engineering Divisions.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2E8B62] hover:text-[#E8ECE9] group"
            >
              <span>View All 8 Divisions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div ref={divisionsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flagshipSolutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-[#24282A] rounded-2xl border border-[#343B37] overflow-hidden shadow-xl hover:border-[#216447] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111315]">
                  <img src={sol.image} alt={sol.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24282A] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold text-[#2E8B62] bg-[#111315]/80 px-2.5 py-1 rounded border border-[#216447]/50">
                    {sol.capacity}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#E8ECE9] group-hover:text-white transition-colors">
                      {sol.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#929A96] leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                  <Link
                    to={sol.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2E8B62] hover:text-[#E8ECE9] pt-3 border-t border-[#343B37]"
                  >
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TURNKEY PROJECTS — FOREST GREEN FEATURE SECTION (Visual Break) */}
      <TurnkeyProjects />

      {/* 5. 3D Alternator Spotlight with Link to Maintenance Page */}
      <section className="py-24 sm:py-32 bg-[#181C1B] border-t border-[#343B37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          <div ref={labHeaderRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#2E8B62] uppercase block mb-1">
                3D INTERACTIVE TECHNICAL LAB
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display">
                Generator Alternator & 9-Point Maintenance.
              </h2>
              <p className="mt-3 text-[#929A96] max-w-2xl text-sm sm:text-base">
                Rotate the 3D generator core below and explore our standard 9-point preventative maintenance protocol designed to avoid costly commercial blackouts.
              </p>
            </div>
            <Link
              to="/maintenance"
              className="btn-forest inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0"
            >
              <span>View 9-Point Protocol</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Interactive3DViewer />
        </div>
      </section>

      {/* 6. Direct Action CTA Strip with Crimson Accent */}
      <section ref={ctaStripRef} className="py-20 bg-gradient-to-r from-[#174D38]/20 via-[#24282A] to-[#111315] border-t border-[#343B37] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2E8B62] font-bold">
              READY FOR UNINTERRUPTED POWER?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E8ECE9] font-display">
              Request a Free Technical Engineering Consultation.
            </h2>
            <p className="text-xs sm:text-sm text-[#929A96]">
              Speak directly with our senior power engineers for load calculations, equipment quotes, and AMC contracts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href="tel:04235957670"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono font-bold text-[#E8ECE9] border border-[#343B37] bg-[#181C1B] hover:text-[#2E8B62] hover:border-[#216447] transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#216447]" />
              <span>0423 595 7670</span>
            </a>
            <Link
              to="/contact"
              className="btn-crimson inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              <span>Request Project Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
