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
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        title="About Keen Power Solutions:"
        highlight="Engineering Tomorrow"
        subtitle="Quality-driven engineering service provider specializing in power generation, customized electrical switchgear, fabrication, and nationwide turnkey execution."
      />

      {/* Main Profile Story */}
      <section className="py-20 sm:py-28 bg-[#181C1B] border-t border-[#343B37] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="border-l-2 border-[#216447] pl-5">
                <span className="text-xs font-mono font-bold text-[#2E8B62] uppercase tracking-widest block mb-1">
                  OFFICIAL COMPANY INTRODUCTION
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E8ECE9] font-display leading-tight">
                  A Quality-Driven Engineering Entity Built on Technical Precision.
                </h2>
              </div>

              <p className="text-base text-[#929A96] leading-relaxed">
                Keen Power Solutions (KPS) is an engineering service provider having commands in electrical products and services and engineering solutions. The products line ranges from LT Panels, HT Panels, generators, soundproof canopies, trolleys, power transmissions, distribution and synchronization panels, indoor outdoor LED lights, solar panels, and specialized commercial equipment.
              </p>

              <p className="text-sm text-[#929A96] leading-relaxed">
                KPS aspires for a leading market position by delivering best engineering services with customized products, reinforcing national and international brand alliances, and upholding best quality and ethical standards as the company's backbone of progressive growth.
              </p>

              {/* Core Capabilities */}
              <div className="pt-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E8ECE9] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B51F32]" />
                  <span>Integrated Engineering Scope:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {capabilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E8ECE9] bg-[#24282A] p-3 rounded-lg border border-[#343B37]">
                      <CheckCircle2 className="w-4 h-4 text-[#216447] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Workshop Facility Card */}
            <div className="lg:col-span-5 space-y-4">
              <TiltCard
                image="/assets/services/generator-workshop.jpg"
                alt="Keen Power Solutions Generator Workshop and Rebuild Bays"
                title="Lahore Central Workshop & Facility"
                subtitle="Engine testing bays, resistive load banking, switchgear assembly floor, and emergency field dispatch depot."
                aspectRatio="aspect-[4/3]"
              >
                <div className="mt-3 pt-3 border-t border-[#343B37] flex items-center justify-between text-xs font-mono text-[#929A96]">
                  <span>Location: Lahore, Pakistan</span>
                  <span className="text-[#2E8B62] font-semibold">NTN: 5561026-7</span>
                </div>
              </TiltCard>

              {/* Corporate Credentials Box */}
              <div className="bg-[#24282A] p-5 rounded-xl border border-[#343B37] font-mono text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#929A96]">Sales Tax (STRN):</span>
                  <span className="text-[#E8ECE9] font-bold">3277876180555</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#929A96]">Income Tax (NTN):</span>
                  <span className="text-[#E8ECE9] font-bold">5561026-7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#929A96]">Satisfied Clients:</span>
                  <span className="text-[#E8ECE9] font-bold">100+ Verified Accounts</span>
                </div>
              </div>
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
