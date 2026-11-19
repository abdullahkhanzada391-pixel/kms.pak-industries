import React from 'react';
import PageHeader from '../components/PageHeader';
import VisionMission from '../components/VisionMission';
import Leadership from '../components/Leadership';
import TiltCard from '../components/TiltCard';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Factory, 
  CheckCircle2, 
  Zap, 
  CheckCheck,
  FileText
} from 'lucide-react';

export default function AboutPage() {
  const capabilities = [
    'LT & HT Electrical Power Distribution & Synchronization Panels',
    'Industrial Diesel & Gas Generators (15 kVA to 2500 kVA)',
    'Heavy-Duty Acoustic & Weatherproof Soundproof Canopies',
    'Custom Fabrication, Fuel Piping Systems & Storage Tanks',
    'On-Grid, Off-Grid & Hybrid Solar Energy Installations',
    'Commercial Kitchen Equipment & Heavy Ducting Systems',
    'Fire Fighting Equipment Supply & Certified Field Installation',
    'Ultra-High-Resolution Indoor & Outdoor SMD Screen Displays'
  ];

  return (
    <div className="space-y-0 bg-white">
      {/* Page Header */}
      <PageHeader
        title="About HK Power Industries:"
        highlight="Engineering Tomorrow"
        subtitle="Quality-driven engineering service provider specializing in power generation, customized electrical switchgear, fabrication, and nationwide turnkey execution."
      />

      {/* Main Profile Story */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 lg:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="border-l-2 border-[#C59B27] pl-4 sm:pl-5">
                <span className="text-xs font-mono font-bold text-[#C59B27] uppercase tracking-widest block mb-1">
                  OFFICIAL COMPANY INTRODUCTION
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B192C] font-serif leading-tight">
                  A Quality-Driven Engineering Entity Built on Technical Precision.
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                HK Power Industries is an engineering service provider having commands in electrical products and services and engineering solutions. The products line ranges from LT Panels, HT Panels, generators, soundproof canopies, trolleys, power transmissions, distribution and synchronization panels, indoor outdoor LED lights, solar panels, and specialized commercial equipment.
              </p>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                HK Power Industries aspires for a leading market position by delivering best engineering services with customized products, reinforcing national and international brand alliances, and upholding best quality and ethical standards as the company's backbone of progressive growth.
              </p>

              {/* Core Capabilities */}
              <div className="pt-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B192C] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                  <span>Integrated Engineering Scope:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-[#0B192C] bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-warm-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Workshop Facility Card */}
            <div className="lg:col-span-5 space-y-4">
              <TiltCard
                image="/assets/services/generator-workshop.jpg"
                alt="HK Power Industries Generator Workshop and Rebuild Bays"
                title="Lahore Central Workshop & Facility"
                subtitle="Engine testing bays, resistive load banking, switchgear assembly floor, and emergency field dispatch depot."
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <VisionMission />

      {/* Executive Leadership Section */}
      <Leadership />
    </div>
  );
}
