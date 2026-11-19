import React, { useState, useRef } from 'react';
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
  PhoneCall 
} from 'lucide-react';
import CircularCarousel from './CircularCarousel';
import SpecularButton from './SpecularButton';

export default function Services({ onSelectServiceForContact }) {
  const [selectedService, setSelectedService] = useState(null);
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const servicesData = [
    {
      id: 'generators',
      title: 'Generators & Power Generation',
      division: 'DIV 01',
      badge: '15 – 2500 kVA',
      theme: 'mocha',
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
      title: 'Electrical Panels & Switchgear',
      division: 'DIV 02',
      badge: 'IEC Certified Panels',
      theme: 'ivory',
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
      title: 'Canopies & Industrial Fabrication',
      division: 'DIV 03',
      badge: 'Acoustic Enclosures',
      theme: 'mocha',
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
      title: 'Solar Energy & Renewable Solutions',
      division: 'DIV 04',
      badge: 'Clean Energy',
      theme: 'ivory',
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
      theme: 'mocha',
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
      theme: 'ivory',
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
      theme: 'gold',
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
      theme: 'mocha',
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

  const carouselItems = servicesData.map((svc) => ({
    src: svc.image,
    alt: svc.title,
    title: svc.title,
    subtitle: `${svc.division} • ${svc.badge}`
  }));

  const currentService = servicesData[activePanelIndex] || servicesData[0];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute top-0 right-0 w-full h-full bg-architectural-grid opacity-30 pointer-events-none" />

      {/* Main Section Container */}
      <div className="w-full flex flex-col justify-between">
        {/* Header with Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 mb-8 sm:mb-12">
          <div className="pb-6 border-b border-[#E2E8F0]">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C59B27] uppercase block mb-1">
              ENGINEERING CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#0B192C] tracking-tight">
              Powering Every Possibility.
            </h2>
          </div>
        </div>

        {/* Interactive 3D Circular Carousel */}
        <div className="w-full relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
          {/* Circular 3D Carousel Viewport */}
          <div className="w-full h-[480px] sm:h-[540px] md:h-[580px] relative">
            <CircularCarousel
              ref={carouselRef}
              items={carouselItems}
              preset="cylinder"
              intro="rise"
              cardWidth={280}
              aspectRatio={1.3}
              gap={24}
              speed={12}
              autoplay="drift"
              draggable={true}
              momentum={0.6}
              snap={true}
              pauseOnHover={true}
              focusOnClick={true}
              cornerRadius={16}
              fadeColor="#F8FAFC"
              depthFade={0.55}
              captions={false}
              onChange={(index) => {
                setActivePanelIndex(index);
              }}
              onItemClick={(item, index) => {
                if (index === activePanelIndex) {
                  setSelectedService(servicesData[index]);
                }
              }}
            />
          </div>

          {/* Active Division Spotlight Summary Card */}
          <div className="w-full mt-6 bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-7 shadow-warm-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 transition-all duration-300">
            <div className="space-y-3.5 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono tracking-wider bg-[#0B192C] text-white font-bold shadow-sm">
                  {React.createElement(currentService.icon, { className: "w-3.5 h-3.5 text-[#F59E0B]" })}
                  {currentService.badge}
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B45309] bg-[#FFFBEB] px-2.5 py-1 rounded border border-[#FDE68A]">
                  {currentService.division}
                </span>
                <span className="text-xs font-mono text-[#64748B]">
                  Active Engineering Division
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#0B192C] font-bold">
                {currentService.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-3xl">
                {currentService.lead}
              </p>

              {/* Quick Specs Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentService.specs.map((sp, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[11px] font-mono shadow-warm-xs">
                    <span className="text-[#64748B] mr-1.5">{sp.label}:</span>
                    <span className="text-[#0B192C] font-bold">{sp.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col shrink-0 gap-3 justify-center">
              <SpecularButton
                onClick={() => setSelectedService(currentService)}
                size="md"
                radius={12}
                tint="#FFFFFF"
                tintOpacity={1}
                textColor="#0B192C"
                borderColor="#E2E8F0"
                hoverTint="#0B192C"
                hoverTextColor="#FFFFFF"
                hoverBorderColor="#0B192C"
                lineColor="#C59B27"
                baseColor="#E2E8F0"
                intensity={1}
                idleIntensity={0.3}
                thickness={1.2}
                glow={0.8}
                followMouse={true}
                className="font-bold text-xs uppercase tracking-wider min-h-[44px] px-5 py-3 shadow-warm-xs"
              >
                <span>Full Specifications</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </SpecularButton>

              <SpecularButton
                onClick={() => onSelectServiceForContact && onSelectServiceForContact(currentService.title)}
                size="md"
                radius={12}
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
                className="font-bold text-xs uppercase tracking-wider min-h-[44px] px-5 py-3 shadow-warm-xs border border-[#C59B27]/40"
              >
                <span>Inquire About Division</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
              </SpecularButton>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Detailed Technical Drawer */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B192C]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-8 shadow-warm-xl space-y-5 sm:space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C59B27] uppercase tracking-wider">
                  <selectedService.icon className="w-4 h-4 text-[#C59B27]" />
                  Engineering Division Spec Sheet
                </span>
                <h3 className="text-xl sm:text-3xl font-serif text-[#0B192C] mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-10 h-10 flex items-center justify-center text-[#64748B] hover:text-[#0B192C] rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] active:scale-95 transition-transform"
                aria-label="Close specification modal"
              >
                ✕
              </button>
            </div>

            {/* Images Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm">
                <img src={selectedService.altImage || selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Complete Scope */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B192C] mb-3">
                Full Technical Scope & Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {selectedService.items.map((it, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#0B192C] bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                    <Check className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Specifications Grid */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B192C] mb-3">
                Design & Testing Specifications:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {selectedService.specs.map((sp, i) => (
                  <div key={i} className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0] text-xs font-mono">
                    <span className="text-[#64748B] block text-[10px]">{sp.label}</span>
                    <span className="text-[#0B192C] font-bold block mt-0.5">{sp.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <a
                href="tel:04235957670"
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-[#0B192C] bg-white border border-[#E2E8F0] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] hover:-translate-y-0.5 hover:shadow-warm-md transition-all duration-300 shadow-warm-xs min-h-[44px] group"
              >
                <PhoneCall className="w-4 h-4 text-[#C59B27] group-hover:text-[#F59E0B] transition-colors duration-300" />
                <span>Direct Line: 0423 595 7670</span>
              </a>

              <SpecularButton
                onClick={() => {
                  if (onSelectServiceForContact) onSelectServiceForContact(selectedService.title);
                  setSelectedService(null);
                }}
                size="md"
                radius={12}
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
                className="font-bold text-xs uppercase tracking-wider min-h-[44px] px-6 py-3 w-full sm:w-auto shadow-warm-sm border border-[#C59B27]/40"
              >
                <span>Request Quotation for this Solution</span>
              </SpecularButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
