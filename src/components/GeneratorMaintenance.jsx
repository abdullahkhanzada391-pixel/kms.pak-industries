import React, { useState, useEffect, useRef } from 'react';
import Interactive3DViewer from './Interactive3DViewer';
import { 
  CheckSquare, 
  Droplets, 
  Fuel, 
  Wind, 
  Wrench, 
  Gauge, 
  BatteryCharging, 
  Zap, 
  Activity, 
  RotateCw,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GeneratorMaintenance() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const stepCardRefs = useRef([]);

  const checklistItems = [
    {
      id: 'oil-filter',
      title: 'Oil Filter Replacement',
      subtitle: 'Full Flow Lubrication Filtration',
      icon: Droplets,
      interval: 'Every 250 Hours / 6 Months',
      criticality: 'High',
      desc: 'Removal of micron-level metallic shavings, carbon sludge, and contaminants from the engine crankcase using genuine OEM high-pressure spin-on filters.',
      tolerance: 'Pre-lubricated seals, torqued to 3/4 turn after gasket contact',
      impact: 'Prevents crankshaft journal wear, bearing scuffing, and thermal breakdown.'
    },
    {
      id: 'fuel-filter',
      title: 'Fuel Filter Replacement',
      subtitle: 'Primary & Secondary Water Separators',
      icon: Fuel,
      interval: 'Every 250–500 Hours',
      criticality: 'Critical',
      desc: 'Dual-stage sediment filtration and fuel-water separation to protect high-pressure common rail (HPCR) and mechanical injector pumps from contaminated diesel.',
      tolerance: '30-micron primary separator + 5-micron secondary final element',
      impact: 'Prevents injector tip erosion, uneven cylinder firing, and loss of prime.'
    },
    {
      id: 'air-filter',
      title: 'Air Filter Replacement',
      subtitle: 'Heavy-Duty Combustion Intake Media',
      icon: Wind,
      interval: 'Every 500 Hours (or by restriction gauge)',
      criticality: 'Medium-High',
      desc: 'Multi-layer pleated nanofiber or cellulose media replacement to ensure clean combustion airflow without introducing abrasive ambient silica dust into cylinders.',
      tolerance: 'Maximum allowable restriction: ≤ 25 in. H2O (6.2 kPa)',
      impact: 'Maintains stoichiometric combustion ratio, avoids black smoke, and preserves turbocharger life.'
    },
    {
      id: 'engine-oil',
      title: 'Engine Oil Replacement',
      subtitle: 'API CI-4 / CK-4 Heavy Duty Diesel Oil',
      icon: Wrench,
      interval: 'Every 250 Operating Hours',
      criticality: 'Critical',
      desc: 'Complete drain of degraded, thermally stressed motor oil while warm, followed by replenishment with API-certified 15W-40 heavy-duty multi-grade diesel oil.',
      tolerance: 'Specific dipstick H-mark at operating temperature',
      impact: 'Maintains hydrodynamic film lubrication across pistons, camshaft, and turbo bearings.'
    },
    {
      id: 'radiator-service',
      title: 'Radiator Service & Coolant Flush',
      subtitle: 'Thermal Exchange & Core Descaling',
      icon: Gauge,
      interval: 'Annually / 1,000 Hours',
      criticality: 'High',
      desc: 'Descaling radiator core fins, testing expansion tank caps, verifying thermostatic valve opening, and treating with ethylene glycol anti-cavitation coolant.',
      tolerance: '50/50 demineralized mix; protection down to -37°C / boil-over 129°C',
      impact: 'Eliminates localized engine hot spots, cylinder liner pitting, and catastrophic thermal seizure.'
    },
    {
      id: 'battery-check',
      title: 'Battery Starting System & Electrolyte',
      subtitle: 'Cold Cranking Amps (CCA) Verification',
      icon: BatteryCharging,
      interval: 'Monthly Scheduled Inspection',
      criticality: 'Critical',
      desc: 'Conductance testing of lead-acid starting banks, terminal cleaning, neutralizer application, specific gravity check, and automated float charger verification.',
      tolerance: '≥ 12.6V resting OCV; minimum 9.6V under 15-second carbon pile cranking load',
      impact: 'Guarantees instantaneous start-signal response during sudden utility grid failure.'
    },
    {
      id: 'electrical-connections',
      title: 'Electrical Terminals & Breaker Torquing',
      subtitle: 'Control Harness & Thermal Verification',
      icon: Zap,
      interval: 'Every 500 Hours / Semi-Annually',
      criticality: 'High',
      desc: 'Infrared thermography scan and calibrated torque-check across all main breaker lugs, neutral bars, ATS auxiliary relays, and engine ECM wiring harnesses.',
      tolerance: 'Torqued strictly to manufacturer Newton-meter (Nm) specs',
      impact: 'Eliminates resistive hot-spots, nuisance breaker trips, and arc-flash fire hazards.'
    },
    {
      id: 'alternator-inspection',
      title: 'Alternator Rotor & Stator Megger Test',
      subtitle: 'Dielectric Insulation Resistance',
      icon: Activity,
      interval: 'Annually / Pre-Monsoon',
      criticality: 'High',
      desc: 'High-voltage megohmmeter (500V/1000V DC) insulation testing between winding phases and chassis earth, alongside exciter diode bridge and AVR calibration.',
      tolerance: 'Minimum insulation resistance: ≥ 5 MΩ at ambient 20°C',
      impact: 'Prevents stator flashover, short circuits, and AVR excitation regulator burnouts.'
    },
    {
      id: 'general-inspection',
      title: 'General 360° Physical & Load Run Test',
      subtitle: 'Full System Functional Validation',
      icon: RotateCw,
      interval: 'Every Service Visit',
      criticality: 'Comprehensive',
      desc: 'Acoustic canopy door seal checks, fuel pipe vibration isolators, governor dynamic response calibration, and 30-minute test run verifying oil pressure, Hz, and phase voltages.',
      tolerance: 'Frequency stability: 50.0 Hz ± 0.25 Hz steady state; voltage ± 1.0%',
      impact: 'Ensures the entire generating set is 100% turnkey operational for commercial duty.'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Setup Scrollytelling triggers for each maintenance step card
      stepCardRefs.current.forEach((el, index) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });

        // Entrance animation as each card scrolls into center view
        gsap.fromTo(
          el,
          { opacity: 0.35, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.8,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="maintenance"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0B192C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-mono uppercase tracking-widest mb-3 sm:mb-4">
            <CheckSquare className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>HK POWER TECHNICAL SERVICE PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
            RELIABILITY DOESN'T HAPPEN BY ACCIDENT.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
            Unplanned power outages cost businesses millions. HK Power Industries technicians execute a rigorous 9-point technical inspection protocol on every generator service contract.
          </p>
        </div>

        {/* Sticky Scrollytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Left Column: Fixed / Sticky 3D Alternator & Progress HUD */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4 sm:space-y-5 z-20">
            <Interactive3DViewer />

            {/* Currently Active Scrollytelling Step Pill with Navy & Gold Accent */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E2E8F0] backdrop-blur-md shadow-warm-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] animate-ping shrink-0" />
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">
                    ACTIVE PROTOCOL INSPECTION
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0B192C]">
                    Step 0{activeStepIndex + 1}: {checklistItems[activeStepIndex]?.title}
                  </span>
                </div>
              </div>

              {/* Step Progress Pill */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
                  {checklistItems.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeStepIndex
                          ? 'bg-[#C59B27] w-5'
                          : i < activeStepIndex
                          ? 'bg-[#0B192C]'
                          : 'bg-[#CBD5E1]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-[#0B192C] border border-[#FDE68A]">
                  {activeStepIndex + 1}/9
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 9 Scrolling Maintenance Step Cards */}
          <div ref={stepsContainerRef} className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] text-xs font-mono text-[#64748B]">
              <span>9-POINT INSPECTION PROTOCOL</span>
              <span className="text-[#C59B27] font-bold">SCROLL TO INSPECT STEPS</span>
            </div>

            {checklistItems.map((item, idx) => {
              const isActive = activeStepIndex === idx;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  ref={(el) => (stepCardRefs.current[idx] = el)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-[#C59B27] shadow-warm-xl scale-[1.02]'
                      : 'bg-white/80 border-[#E2E8F0] hover:border-[#C59B27]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#E2E8F0] pb-4">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className={`p-3 rounded-xl border ${
                        isActive
                          ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#C59B27]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block">
                          CHECKPOINT 0{idx + 1} OF 09
                        </span>
                        <h3 className={`text-lg sm:text-xl font-serif font-bold ${isActive ? 'text-[#0B192C]' : 'text-[#64748B]'}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`text-xs font-mono px-3 py-1 rounded-lg border shrink-0 ${
                      isActive
                        ? 'text-[#0B192C] bg-[#FFFBEB] border-[#FDE68A] font-bold'
                        : 'text-[#64748B] bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}>
                      {item.interval}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
                    <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-1">
                      <span className="text-[10px] text-[#64748B] uppercase block">Tolerance</span>
                      <span className="text-[#0B192C] font-semibold block">{item.tolerance}</span>
                    </div>
                    <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] space-y-1">
                      <span className="text-[10px] text-[#C59B27] uppercase block font-bold">Prevention</span>
                      <span className="text-[#0B192C] font-semibold block">{item.impact}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
