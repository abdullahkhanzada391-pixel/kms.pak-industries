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
      desc: 'High-pressure fin de-clogging, internal descaling, thermostat validation, and 50/50 ethylene glycol OAT long-life coolant replenishment.',
      tolerance: 'Operating range: 82°C – 95°C under 100% full prime load',
      impact: 'Eliminates localized engine hot spots, cylinder head warping, and emergency high-temp shutdowns.'
    },
    {
      id: 'battery-water',
      title: 'Battery Water & Electrolyte Checks',
      subtitle: 'Cranking Battery Specific Gravity',
      icon: BatteryCharging,
      interval: 'Monthly / Pre-Run Inspection',
      criticality: 'High',
      desc: 'Hydrometer testing of electrolyte specific gravity, terminal deoxidation, and demineralized distilled water topping to battery cell plates.',
      tolerance: 'Specific gravity: 1.260–1.280 at 25°C; float charge: 13.6V–13.8V per 12V block',
      impact: 'Guarantees reliable emergency starter motor cranking torque during mains blackouts.'
    },
    {
      id: 'voltage-checks',
      title: 'Generator Voltage Checks',
      subtitle: 'Automatic Voltage Regulator (AVR) Trim',
      icon: Zap,
      interval: 'Quarterly Routine / Under Load Test',
      criticality: 'Critical',
      desc: 'Digital RMS multimeter and oscilloscope measurement of phase-to-phase (400V) and phase-to-neutral (230V) steady-state and transient response.',
      tolerance: 'Voltage regulation: ± 1.0% from no-load to 100% balanced load',
      impact: 'Protects sensitive facility electronics, CNC machinery, and hospital equipment from voltage surges.'
    },
    {
      id: 'frequency-checks',
      title: 'Frequency (Hz) Checks',
      subtitle: 'Governor & Electronic Actuator Calibration',
      icon: Activity,
      interval: 'Quarterly Routine / Load Step Tests',
      criticality: 'Critical',
      desc: 'Testing electrical frequency stabilization under step-load changes; calibration of electronic speed governor (ESG) and magnetic pickup unit (MPU).',
      tolerance: '50.0 Hz nominal; isochronous regulation droop: 0% to ≤ 3% max',
      impact: 'Ensures synchronized motor speeds, prevents panel tripping, and protects inductive transformer loads.'
    },
    {
      id: 'rpm-checks',
      title: 'RPM Calibration Checks',
      subtitle: 'Engine Crankshaft Synchronous Speed',
      icon: RotateCw,
      interval: 'Routine Field Testing',
      criticality: 'High',
      desc: 'Laser optical tachometer and MPU frequency cross-verification ensuring prime mover crankshaft maintains constant 1500 RPM for 4-pole 50 Hz generation.',
      tolerance: '1500 RPM (± 0.25% steady state stability)',
      impact: 'Prevents mechanical harmonic vibration, governor hunting, and alternator rotor overheating.'
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
      className="relative py-24 sm:py-32 bg-[#111315] border-t border-[#343B37] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#174D38]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#B51F32]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Exact Prompt Heading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/30 border border-[#216447]/60 text-[#E8ECE9] text-xs font-mono uppercase tracking-widest mb-4">
            <CheckSquare className="w-3.5 h-3.5 text-[#216447]" />
            <span>KPS TECHNICAL SERVICE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
            RELIABILITY DOESN'T HAPPEN BY ACCIDENT.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#929A96]">
            Unplanned power outages cost businesses millions. KPS maintenance technicians execute a rigorous 9-point technical inspection protocol on every generator service contract.
          </p>
        </div>

        {/* Sticky Scrollytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
          {/* Left Column: Fixed / Sticky 3D Alternator & Forest-Green Progress HUD */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-5 z-20">
            <Interactive3DViewer />

            {/* Currently Active Scrollytelling Step Pill with Crimson Accent */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#181C1B]/95 border border-[#343B37] backdrop-blur-md shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B51F32] animate-ping shrink-0" />
                <div>
                  <span className="text-[10px] text-[#929A96] uppercase block">
                    ACTIVE PROTOCOL INSPECTION
                  </span>
                  <span className="text-sm font-bold text-[#E8ECE9]">
                    Step 0{activeStepIndex + 1}: {checklistItems[activeStepIndex]?.title}
                  </span>
                </div>
              </div>

              {/* Forest Green Step Progress Pill */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {checklistItems.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeStepIndex
                          ? 'bg-[#B51F32] w-5'
                          : i < activeStepIndex
                          ? 'bg-[#216447]'
                          : 'bg-[#343B37]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#174D38]/40 text-[#2E8B62] border border-[#216447]/40">
                  {activeStepIndex + 1}/9
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 9 Scrolling Maintenance Step Cards */}
          <div ref={stepsContainerRef} className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#343B37] text-xs font-mono text-[#929A96]">
              <span>9-POINT INSPECTION PROTOCOL</span>
              <span className="text-[#2E8B62] font-bold">SCROLL TO INSPECT STEPS</span>
            </div>

            {checklistItems.map((item, idx) => {
              const isActive = activeStepIndex === idx;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  ref={(el) => (stepCardRefs.current[idx] = el)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#24282A] border-[#B51F32] shadow-2xl shadow-[#B51F32]/10 scale-[1.02]'
                      : 'bg-[#181C1B]/80 border-[#343B37] hover:border-[#216447]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-[#343B37] pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-3 rounded-xl border ${
                        isActive
                          ? 'bg-[#B51F32]/20 border-[#B51F32] text-[#E83E55]'
                          : 'bg-[#24282A] border-[#343B37] text-[#929A96]'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#929A96] uppercase tracking-wider block">
                          CHECKPOINT 0{idx + 1} OF 09
                        </span>
                        <h3 className={`text-lg sm:text-xl font-bold font-display ${isActive ? 'text-[#E8ECE9]' : 'text-[#929A96]'}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span className={`text-xs font-mono px-3 py-1 rounded-lg border shrink-0 ${
                      isActive
                        ? 'text-[#FFFFFF] bg-[#B51F32] border-[#D12B42]'
                        : 'text-[#929A96] bg-[#24282A] border-[#343B37]'
                    }`}>
                      {item.interval}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#929A96] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-[#181C1B] p-3 rounded-lg border border-[#343B37] space-y-1">
                      <span className="text-[10px] text-[#929A96] uppercase block">Tolerance</span>
                      <span className="text-[#E8ECE9] font-semibold block">{item.tolerance}</span>
                    </div>
                    <div className="bg-[#181C1B] p-3 rounded-lg border border-[#343B37] space-y-1">
                      <span className="text-[10px] text-[#2E8B62] uppercase block">Prevention</span>
                      <span className="text-[#E8ECE9] font-semibold block">{item.impact}</span>
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
