import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import TurnkeyProjects from '../components/TurnkeyProjects';
import PartnersClients from '../components/PartnersClients';
import TiltCard from '../components/TiltCard';
import SpecularButton from '../components/SpecularButton';
import BounceCards from '../components/BounceCards';
import { 
  Zap, 
  Settings, 
  Wrench, 
  Sun, 
  ArrowRight, 
  Award, 
  Network, 
  Users, 
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const navigate = useNavigate();
  const [activeDivision, setActiveDivision] = useState(-1);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const teaserTextRef = useRef(null);
  const teaserCardRef = useRef(null);
  const divisionsHeaderRef = useRef(null);
  const deckContainerRef = useRef(null);
  const stepRefs = useRef([]);

  const stickySteps = [
    {
      id: 'overview',
      step: '01 // EXECUTIVE MISSION',
      image: '/assets/services/generator-workshop.jpg',
      badge: 'Lahore Central Facility',
      title: 'Central Engineering Bays & Rebuild Center',
      subtitle: 'Engine rebuild bays, load banking & dispatch center'
    },
    {
      id: 'infrastructure',
      step: '02 // WORKSHOP & TESTING',
      image: '/assets/services/electrical-panel-switchgear.jpg',
      badge: '2500 kVA Testing Bay',
      title: 'IEC-Compliant Switchgear & Load Verification',
      subtitle: 'Dyno stress-testing & synchronization testing'
    },
    {
      id: 'deployment',
      step: '03 // LIFECYCLE ASSURANCE',
      image: '/assets/services/turnkey-fleet-emergency.jpg',
      badge: '24/7 Field Support',
      title: 'Nationwide Commissioning & Emergency AMC',
      subtitle: 'Rapid technician response across all industrial zones'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateActiveStep = () => {
      const viewportTarget = window.innerHeight * 0.45;
      let bestIndex = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Measure element center relative to reading zone
        const elementCenter = rect.top + rect.height * 0.35;
        const distance = Math.abs(elementCenter - viewportTarget);

        if (distance < minDistance) {
          minDistance = distance;
          bestIndex = index;
        }
      });

      setActiveStep((prev) => (prev !== bestIndex ? bestIndex : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveStep);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateActiveStep();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const flagshipSolutions = [
    {
      title: 'Industrial Diesel & Gas Generators',
      capacity: '15 – 2500 kVA Range',
      desc: 'Sales, rentals, overhauls and certified O&M contracts featuring Lovol, Perkins, Weichai, and Cummins engines.',
      image: '/assets/services/generator-main.jpg',
      link: '/services'
    },
    {
      title: 'Electrical Engineering & Switchgear',
      capacity: 'Custom LT & HT Panels',
      desc: 'ATS/AMF synchronization panels, power factor capacitor banks, and smart distribution boards built to IEC standards.',
      image: '/assets/services/electrical-panel-switchgear.jpg',
      link: '/services'
    },
    {
      title: 'Acoustic Canopies & Heavy Fabrication',
      capacity: '68–75 dBA Attenuation',
      desc: 'Weatherproof soundproof generator enclosures, bulk fuel tanks, mobile trolleys, and certified fuel piping systems.',
      image: '/assets/services/fabrication-canopy-tanks.jpg',
      link: '/services'
    },
    {
      title: 'Commercial & Industrial Solar Solutions',
      capacity: 'On-Grid, Off-Grid & Hybrid',
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
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
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

      // 1b. Synchronized Scrollytelling Step Triggers for Sticky Card
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-0 bg-white">
      {/* 1. Cinematic Video Hero Section */}
      <Hero />

      {/* 2. Executive Overview Sticky Image Scroll Showcase */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] relative">
        <div className="absolute top-0 right-0 w-full h-full bg-architectural-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 relative">
            {/* Sticky Image Column (Left) */}
            <div className="lg:col-span-5 relative h-full">
              <div
                className="lg:sticky top-24 lg:top-28 w-full transition-all duration-300 z-20"
                style={{ top: 'max(96px, calc(50vh - 200px))' }}
              >
                <div
                  ref={teaserCardRef}
                  className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-warm-lg hover:shadow-warm-xl p-4 sm:p-5 group transition-shadow duration-300"
                >
                  {/* Visual images container with smooth cross-fade */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                    {stickySteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          activeStep === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#F59E0B] block mb-1">
                            MILESTONE 0{idx + 1} / 03
                          </span>
                          <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-sm text-white">
                            {step.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress & Milestone Indicator */}
                  <div className="pt-3 px-1.5 flex items-center justify-between border-t border-[#E2E8F0] mt-3 text-xs text-[#64748B]">
                    <span className="font-mono text-[11px] font-semibold text-[#0B192C] flex items-center gap-1.5 truncate max-w-[210px] sm:max-w-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] shrink-0" />
                      <span className="truncate">{stickySteps[activeStep]?.subtitle}</span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {stickySteps.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setActiveStep(i);
                            stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                            activeStep === i ? 'w-5 bg-[#C59B27]' : 'w-1.5 bg-[#CBD5E1] hover:bg-[#64748B]'
                          }`}
                          aria-label={`Go to section ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Content Column (Right) */}
            <div className="lg:col-span-7 space-y-16 sm:space-y-24 lg:space-y-32 pt-2 lg:pt-0 pb-8 lg:pb-12">
              {/* Step 1: Core Executive Mission & CTAs */}
              <div
                ref={(el) => {
                  stepRefs.current[0] = el;
                  teaserTextRef.current = el;
                }}
                className={`space-y-5 sm:space-y-6 transition-all duration-500 ease-out ${
                  activeStep === 0 ? 'opacity-100 translate-y-0' : 'opacity-90 lg:opacity-45'
                }`}
              >
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
                  Turnkey Power & Engineering Solutions Designed to Keep Businesses Moving Forward.
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed font-sans">
                  HK Power Industries is a quality-driven engineering entity specializing in heavy electrical infrastructure, generator power plants up to 2500 kVA, industrial fabrication, and renewable energy nationwide.
                </p>

                <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <SpecularButton
                    to="/about"
                    size="md"
                    radius={14}
                    tint="#0B192C"
                    tintOpacity={1}
                    hoverTint="#1E3A8A"
                    textColor="#FFFFFF"
                    lineColor="#F59E0B"
                    baseColor="#071220"
                    intensity={1.2}
                    idleIntensity={0.35}
                    thickness={1.4}
                    glow={1.1}
                    followMouse={true}
                    className="font-bold text-xs uppercase tracking-wider min-h-[48px] px-6 py-3.5 w-full sm:w-auto shadow-warm-sm border border-[#C59B27]/40"
                  >
                    <span>Explore Company Profile & DNA</span>
                    <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
                  </SpecularButton>

                  <SpecularButton
                    to="/contact"
                    size="md"
                    radius={14}
                    tint="#FFFFFF"
                    tintOpacity={1}
                    textColor="#0B192C"
                    borderColor="#CBD5E1"
                    hoverTint="#C59B27"
                    hoverTextColor="#0B192C"
                    hoverBorderColor="#F59E0B"
                    lineColor="#FDE68A"
                    baseColor="#78550D"
                    intensity={1.2}
                    idleIntensity={0.3}
                    thickness={1.3}
                    glow={1}
                    followMouse={true}
                    className="font-bold text-xs uppercase tracking-wider min-h-[48px] px-6 py-3.5 w-full sm:w-auto shadow-warm-xs hover:shadow-gold-glow"
                  >
                    <span>Get in Touch</span>
                  </SpecularButton>
                </div>
              </div>

              {/* Step 2: Advanced Workshop & Testing Infrastructure */}
              <div
                ref={(el) => (stepRefs.current[1] = el)}
                className={`space-y-5 sm:space-y-6 transition-all duration-500 ease-out ${
                  activeStep === 1 ? 'opacity-100 translate-y-0' : 'opacity-90 lg:opacity-45'
                }`}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
                  Dedicated Engine Rebuild Bays & Computerized Load Bank Testing.
                </h3>

                <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-sans">
                  Every generator overhauled in our Lahore workshop undergoes full-spectrum resistive load bank certification up to 2.5 MW. We stress-test fuel governors, alternator windings, and heat exchangers under peak load before deployment.
                </p>

                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-4 bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-warm-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0 mt-0.5 text-[#C59B27]">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#0B192C]">Precision Tolerances & OEM Diagnostic Tools</h4>
                      <p className="text-xs text-[#64748B] mt-0.5">Calibrated micrometer bore gauges, electronic injector testers, and direct ECU diagnostic link-ups.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white p-4 sm:p-5 rounded-xl border border-[#E2E8F0] shadow-warm-xs">
                    <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center shrink-0 mt-0.5 text-[#C59B27]">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#0B192C]">Smart Switchgear & ATS Synchronization</h4>
                      <p className="text-xs text-[#64748B] mt-0.5">Custom PLC synchronizing panels for seamless multi-generator paralleling with grid power.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Lifecycle Assurance & Emergency AMC */}
              <div
                ref={(el) => (stepRefs.current[2] = el)}
                className={`space-y-5 sm:space-y-6 transition-all duration-500 ease-out ${
                  activeStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-90 lg:opacity-45'
                }`}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
                  Nationwide Emergency AMC & Rapid Field Support.
                </h3>

                <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-sans">
                  Power interruptions cannot wait. Our field service engineers operate mobile service vehicles equipped with genuine consumables, diagnostic instruments, and emergency bypass apparatus ready for 24/7 emergency dispatch.
                </p>

                <div className="p-6 rounded-2xl bg-[#0B192C] text-white shadow-warm-md space-y-4 border border-[#1E3A8A]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-slate-300">EMERGENCY ASSISTANCE</span>
                    <span className="text-xs font-mono bg-[#C59B27]/20 text-[#F59E0B] border border-[#C59B27]/40 px-2.5 py-1 rounded font-bold">24/7 ACTIVE</span>
                  </div>
                  <div>
                    <a
                      href="tel:04235957670"
                      aria-label="Dial Emergency Assistance: 0423 595 7670"
                      className="text-lg sm:text-xl font-mono font-bold tracking-tight text-[#F59E0B] hover:text-white hover:underline transition-colors duration-200 inline-block cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 rounded"
                    >
                      0423 595 7670
                    </a>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Immediate escalation to senior mechanical and electrical engineers for continuous commercial and industrial continuity.
                  </p>
                </div>

                <div className="pt-3">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0B192C] hover:text-[#C59B27] pb-1 border-b border-[#0B192C] group transition-colors"
                  >
                    <span>Explore All Engineering Solutions & Turnkey Services</span>
                    <ArrowRight className="w-4 h-4 text-[#C59B27] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Flagship Engineering Solutions Preview */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-architectural-grid opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
          <div ref={divisionsHeaderRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#C59B27] uppercase block mb-1">
                CORE CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C]">
                Featured Engineering Divisions.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#334155] max-w-xl">
                Every division is operated by certified engineers and equipped with dedicated fabrication bays, testing apparatus, and round-the-clock maintenance infrastructure.
              </p>
            </div>
          </div>

          {/* Interactive Scroll-Driven Deck with Pinned Expand & Collapse */}
          <div
            ref={deckContainerRef}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-3 sm:p-6 lg:p-10 shadow-warm-xs flex flex-col items-center justify-center relative overflow-hidden my-4 sm:my-6 w-full"
          >
            <div className="w-full flex items-center justify-center py-4 sm:py-6">
              <BounceCards
                pinRef={deckContainerRef}
                images={flagshipSolutions.map(sol => ({
                  src: sol.image,
                  alt: sol.title,
                  title: sol.title,
                  badge: sol.capacity
                }))}
                borderWidth={4}
                borderColor="#FFFFFF"
                shadow
                onCardClick={(index) => {
                  navigate(flagshipSolutions[index].link);
                }}
                onHoverChange={(index) => {
                  setActiveDivision(index);
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. TURNKEY PROJECTS — FEATURE SECTION */}
      <TurnkeyProjects />

      {/* 5. 100+ SATISFIED CLIENTS & CORPORATE ALLIANCES */}
      <PartnersClients />
    </div>
  );
}
