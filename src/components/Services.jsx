import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Settings, 
  Wrench, 
  Sun, 
  Utensils, 
  Wind, 
  Flame, 
  Monitor, 
  ArrowRight, 
  Check, 
  ChevronRight,
  PhoneCall,
  Sliders,
  Sparkles
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onSelectServiceForContact }) {
  const [selectedService, setSelectedService] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  const sectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const trackRef = useRef(null);

  const servicesData = [
    {
      id: 'generators',
      title: 'Generators & Power Generation',
      division: 'DIV 01',
      badge: '15 – 2500 kVA',
      theme: 'forest', // forest-green accented
      icon: Zap,
      image: '/assets/services/generator-main.jpg',
      altImage: '/assets/services/generator-cummins-perkins.jpg',
      lead: 'Complete turnkey power generation solutions featuring world-leading engine alliances including Lovol, Perkins, Weichai, and Cummins.',
      items: [
        'Sales of New & Certified Reconditioned Generators',
        'Commercial & Industrial Rental Generator Fleet',
        'Comprehensive Repair, Overhauls & Field Maintenance',
        'Capacity Coverage: 15 KVA up to 2500 KVA',
        'Genuine OEM Spare Parts & Filter Kits',
        'Annual Maintenance Contracts (O&M AMC)'
      ],
      specs: [
        { label: 'Rating', val: '15 to 2500 kVA' },
        { label: 'Fuel Types', val: 'Diesel / Natural Gas' },
        { label: 'Alliances', val: 'Lovol, Perkins, Weichai' },
        { label: 'Service Support', val: '24/7 Rapid Response' }
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical Engineering & Switchgear',
      division: 'DIV 02',
      badge: 'IEC Certified Panels',
      theme: 'charcoal',
      icon: Settings,
      image: '/assets/services/electrical-panel-switchgear.jpg',
      altImage: '/assets/services/electrical-ats-panel.jpg',
      lead: 'Custom-engineered power distribution, automation panels, and industrial lighting designed to international IEC standards.',
      items: [
        'Low Tension (LT) & High Tension (HT) Panels',
        'Automatic Transfer Switch (ATS) & AMF Synchronization Panels',
        'Power Factor Correction (PFC) Capacitor Banks',
        'Industrial LED & SMD Street and Flood Lighting Systems'
      ],
      specs: [
        { label: 'Standard', val: 'IEC 61439 compliant' },
        { label: 'Protection', val: 'IP54 / IP55 rated' },
        { label: 'Automation', val: 'DeepSea / ComAp controllers' },
        { label: 'Testing', val: 'Dielectric Tested' }
      ]
    },
    {
      id: 'fabrication',
      title: 'Industrial Heavy Metal Fabrication',
      division: 'DIV 03',
      badge: 'Acoustic Enclosures',
      theme: 'forest',
      icon: Wrench,
      image: '/assets/services/fabrication-canopy-tanks.jpg',
      altImage: '/assets/services/fabrication-plant.jpg',
      lead: 'High-precision metal fabrication, acoustic attenuation, and fluid transport infrastructure built for rigorous environments.',
      items: [
        'Acoustic Soundproof & Weatherproof Generator Canopies',
        'Bulk Fuel Storage Tanks (Underground & Overhead)',
        'Heavy-Duty Mobile Generator Towing Trolleys',
        'Custom Electrical DB Enclosures & Server Racks',
        'Certified Fuel Piping Lines & Industrial Ducting'
      ],
      specs: [
        { label: 'Acoustics', val: '68–75 dBA @ 7m' },
        { label: 'Finishing', val: 'Electrostatic Powder Coated' },
        { label: 'Steel Grade', val: 'Prime CRCA / Galvanized' },
        { label: 'Testing', val: 'Hydrostatic Validated' }
      ]
    },
    {
      id: 'solar',
      title: 'Solar Power Projects & Renewables',
      division: 'DIV 04',
      badge: 'Clean Energy',
      theme: 'charcoal',
      icon: Sun,
      image: '/assets/services/solar-installation-commercial.jpg',
      altImage: '/assets/services/solar-grid-inverter.jpg',
      lead: 'Commercial, industrial, and institutional solar photovoltaic systems delivering measurable electricity bill reductions and grid resilience.',
      items: [
        'On-Grid Grid-Tied Solar Energy Systems',
        'Off-Grid Independent Battery Energy Storage Systems',
        'Hybrid Synchronized Solar-Diesel Systems',
        'Routine Preventative Maintenance & After-Sales Performance Monitoring'
      ],
      specs: [
        { label: 'PV Modules', val: 'Tier 1 TopCon / PERC' },
        { label: 'Inverters', val: 'European / Top Global certified' },
        { label: 'Sync Capability', val: 'Zero Export & Generator Sync' },
        { label: 'Performance', val: 'Up to 25 Yr Warranty' }
      ]
    },
    {
      id: 'commercial-kitchen',
      title: 'Commercial Kitchen Equipment',
      division: 'DIV 05',
      badge: 'Hospitality EPC',
      theme: 'forest',
      icon: Utensils,
      image: '/assets/services/commercial-kitchen.jpg',
      altImage: '/assets/services/kitchen-exhaust-hood.jpg',
      lead: 'Turnkey supply, layout design, and precision installation of stainless steel commercial kitchen appliances and food preparation lines.',
      items: [
        'Commercial Cooking Ranges, Ovens & Heavy Fryers',
        'Stainless Steel Grade 304 Preparation Tables & Sinks',
        'Commercial Refrigeration, Freezers & Cold Rooms',
        'Complete Kitchen Layout Planning & Gas Piping Integration'
      ],
      specs: [
        { label: 'Material', val: 'Food Grade SS-304' },
        { label: 'Applications', val: 'Hotels, Hospitals, Cafeterias' },
        { label: 'Safety', val: 'Integrated Gas Leak Sensors' },
        { label: 'Compliance', val: 'Food Authority Certified' }
      ]
    },
    {
      id: 'ducting',
      title: 'Commercial & Industrial Ducting',
      division: 'DIV 06',
      badge: 'HVAC & Exhaust',
      theme: 'charcoal',
      icon: Wind,
      image: '/assets/services/ducting-commercial-hvac.jpg',
      altImage: '/assets/services/ducting-industrial.jpg',
      lead: 'Engineered air distribution, kitchen exhaust hoods, smoke evacuation, and industrial ventilation systems fabricated to exact site drawings.',
      items: [
        'Galvanized Iron (GI) Rectangular & Spiral Ducting',
        'High-Temperature Kitchen Exhaust Hoods & Precipitators',
        'Generator Radiator Air Discharge Louvers & Acoustic Ducts',
        'Inline Axial & Centrifugal Exhaust Fan Installations'
      ],
      specs: [
        { label: 'Sheet Gauge', val: '18 to 26 Gauge Galvanized' },
        { label: 'Sealing', val: 'Class A Low Leakage' },
        { label: 'Insulation', val: 'Fiberglass / Acoustic Foam' },
        { label: 'Testing', val: 'Air Balancing Tested' }
      ]
    },
    {
      id: 'fire-fighting',
      title: 'Fire Fighting Equipment Supply',
      division: 'DIV 07',
      badge: 'Life Safety',
      theme: 'crimson', // subtle crimson themed card
      icon: Flame,
      image: '/assets/services/fire-fighting-hydrant-pump.jpg',
      altImage: '/assets/services/fire-equipment-extinguishers.jpg',
      lead: 'NFPA-compliant life safety systems, fire hydrants, specialized pump skids, and suppression equipment for industrial facilities.',
      items: [
        'Electric, Diesel & Jockey Fire Pump Skid Sets',
        'Wet & Dry Fire Hydrant Systems & Hose Reel Cabinets',
        'Automatic Fire Sprinkler Networks & Flow Switches',
        'Certified Fire Extinguishers (CO2, DCP, Foam, Clean Agent)'
      ],
      specs: [
        { label: 'Pump Pressure', val: 'Up to 250 PSI Rated' },
        { label: 'Standards', val: 'NFPA 20 / Civil Defense' },
        { label: 'Monitoring', val: 'Integrated with FACP' },
        { label: 'Validation', val: 'Hydrostatic Pressure Certified' }
      ]
    },
    {
      id: 'smd-displays',
      title: 'SMD Screen & LED Video Walls',
      division: 'DIV 08',
      badge: 'Digital Displays',
      theme: 'forest',
      icon: Monitor,
      image: '/assets/services/smd-screen-display-outdoor.jpg',
      altImage: '/assets/services/smd-led-videowall.jpg',
      lead: 'Cutting-edge digital visual systems ranging from ultra-fine pitch indoor conference displays to high-brightness outdoor billboard video walls.',
      items: [
        'Indoor & Outdoor High-Refresh LED SMD Screens',
        'Commercial Video Walls & Command Center Displays',
        'High-Resolution LED Panels with Seamless Bezel Design',
        'Custom Curved, Rental & Architectural Screen Configurations',
        'Synchronous & Asynchronous Content Management Systems',
        'On-Site Calibration, Preventative Maintenance & Technical Support'
      ],
      specs: [
        { label: 'Pixel Pitch', val: 'P1.2, P1.8, P2.5, P3.9, P6' },
        { label: 'Brightness', val: 'Up to 6500 nits Outdoor' },
        { label: 'Refresh Rate', val: '≥3840 Hz Flicker-Free' },
        { label: 'Protection', val: 'IP65 Weatherproof' }
      ]
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 120;

      const horizontalTween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(Math.round(p * 100));
            const activeIdx = Math.min(servicesData.length - 1, Math.floor(p * servicesData.length));
            setActivePanelIndex(activeIdx);
          }
        }
      });

      return () => {
        horizontalTween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#181C1B] border-t border-[#343B37] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#174D38]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Pinned Desktop Container */}
      <div ref={pinContainerRef} className="w-full min-h-screen py-16 sm:py-20 flex flex-col justify-between">
        {/* Sticky Header with Exact Heading Requested in Prompt */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#343B37]">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#2E8B62] uppercase block mb-1">
                ENGINEERING CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight">
                POWERING EVERY POSSIBILITY.
              </h2>
            </div>

            {/* Desktop Scroller HUD Indicator */}
            <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#929A96] bg-[#24282A]/90 px-5 py-2.5 rounded-xl border border-[#343B37]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#216447] animate-pulse" />
                <span className="text-[#E8ECE9]">
                  DIVISION 0{activePanelIndex + 1} / 0{servicesData.length}
                </span>
              </div>
              <div className="w-32 h-1.5 rounded-full bg-[#111315] overflow-hidden">
                <div
                  className="h-full bg-[#216447] transition-all duration-150 ease-out"
                  style={{ width: `${Math.max(12, scrollProgress)}%` }}
                />
              </div>
              <span className="text-[#2E8B62] font-bold">{scrollProgress}%</span>
            </div>
          </div>
        </div>

        {/* Desktop Horizontal Track (Pinned) & Mobile Fluid Vertical Flow */}
        <div className="w-full relative overflow-x-visible lg:overflow-x-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-8 px-4 sm:px-6 lg:px-12 w-full lg:w-max will-change-transform"
          >
            {servicesData.map((svc, idx) => {
              const isForest = svc.theme === 'forest';
              const isCrimson = svc.theme === 'crimson';

              return (
                <div
                  key={svc.id}
                  className={`w-full lg:w-[480px] xl:w-[520px] shrink-0 rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
                    isForest
                      ? 'bg-gradient-to-b from-[#174D38]/20 via-[#24282A] to-[#24282A] border-[#216447]/60 hover:border-[#2E8B62]'
                      : isCrimson
                      ? 'bg-gradient-to-b from-[#B51F32]/15 via-[#24282A] to-[#24282A] border-[#B51F32]/50 hover:border-[#D12B42]'
                      : 'bg-[#24282A] border-[#343B37] hover:border-[#216447]'
                  }`}
                >
                  {/* Visual Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111315]">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24282A] via-[#24282A]/35 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono tracking-wider backdrop-blur-md border ${
                        isForest
                          ? 'bg-[#174D38]/80 text-[#E8ECE9] border-[#216447]'
                          : isCrimson
                          ? 'bg-[#B51F32]/80 text-[#FFFFFF] border-[#D12B42]'
                          : 'bg-[#111315]/80 text-[#2E8B62] border-[#343B37]'
                      }`}>
                        <svc.icon className="w-3.5 h-3.5" />
                        {svc.badge}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E8ECE9] bg-[#111315]/80 px-2.5 py-1 rounded border border-[#343B37]">
                        {svc.division}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#E8ECE9] font-display group-hover:text-white transition-colors">
                        {svc.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-[#929A96] leading-relaxed">
                        {svc.lead}
                      </p>

                      {/* Scope Technical Deliverables */}
                      <div className="mt-4 pt-4 border-t border-[#343B37] space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#2E8B62] font-bold block">
                          Technical Deliverables:
                        </span>
                        {svc.items.slice(0, 4).map((it, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#E8ECE9]">
                            <Check className="w-3.5 h-3.5 text-[#216447] shrink-0 mt-0.5" />
                            <span className="leading-snug">{it}</span>
                          </div>
                        ))}
                        {svc.items.length > 4 && (
                          <div className="text-[11px] font-mono text-[#929A96] pl-5">
                            + {svc.items.length - 4} additional specialized capabilities
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technical Specs & Buttons */}
                    <div className="pt-4 border-t border-[#343B37] space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#181C1B] p-2.5 rounded-lg border border-[#343B37]">
                        {svc.specs.slice(0, 2).map((sp, i) => (
                          <div key={i}>
                            <span className="text-[#929A96] block text-[10px]">{sp.label}</span>
                            <span className="text-[#E8ECE9] font-bold truncate block">{sp.val}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <button
                          onClick={() => setSelectedService(svc)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2E8B62] hover:text-[#E8ECE9] transition-colors"
                        >
                          <span>Full Specifications</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onSelectServiceForContact && onSelectServiceForContact(svc.title)}
                          className="btn-crimson inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal / Detailed Technical Drawer for Service */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#24282A] rounded-2xl border border-[#343B37] p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#343B37] pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2E8B62] uppercase tracking-wider">
                  <selectedService.icon className="w-4 h-4" />
                  Engineering Division Spec Sheet
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E8ECE9] font-display mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-[#929A96] hover:text-[#E8ECE9] rounded-lg bg-[#181C1B] border border-[#343B37]"
              >
                ✕
              </button>
            </div>

            {/* Images split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#343B37] bg-[#111315]">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#343B37] bg-[#111315]">
                <img src={selectedService.altImage || selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Complete Scope */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E8B62] mb-3">
                Full Technical Scope & Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.items.map((it, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#E8ECE9] bg-[#181C1B] p-3 rounded-lg border border-[#343B37]">
                    <Check className="w-4 h-4 text-[#216447] shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Specifications Grid */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E8B62] mb-3">
                Design & Testing Specifications:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedService.specs.map((sp, i) => (
                  <div key={i} className="bg-[#181C1B] p-3 rounded-lg border border-[#343B37] text-xs font-mono">
                    <span className="text-[#929A96] block text-[10px]">{sp.label}</span>
                    <span className="text-[#E8ECE9] font-bold block mt-0.5">{sp.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#343B37] flex flex-wrap items-center justify-between gap-4">
              <a
                href="tel:04235957670"
                className="flex items-center gap-2 text-xs font-mono text-[#929A96] hover:text-[#E8ECE9]"
              >
                <PhoneCall className="w-4 h-4 text-[#216447]" />
                <span>Direct Engineer Line: 0423 595 7670</span>
              </a>

              <button
                onClick={() => {
                  if (onSelectServiceForContact) onSelectServiceForContact(selectedService.title);
                  setSelectedService(null);
                }}
                className="btn-crimson px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Request Quotation for this Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
