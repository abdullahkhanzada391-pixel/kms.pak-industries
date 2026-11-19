import React from 'react';
import { whyChooseKPS } from './ServicesData';
import { 
  CheckCircle2, 
  Users, 
  Award, 
  ShieldCheck, 
  Wrench, 
  Clock, 
  HeartHandshake, 
  Building2 
} from 'lucide-react';

export default function WhyChooseKPS() {
  const pillarIcons = [
    Building2,
    Users,
    ShieldCheck,
    Wrench,
    Clock,
    HeartHandshake
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Trust Stat Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-20">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102C4E]/5 border border-[#102C4E]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
              <span className="text-[11px] font-bold tracking-widest text-[#102C4E] uppercase">
                THE KPS ADVANTAGE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C4E] tracking-tight">
              Engineering Excellence You Can Rely On.
            </h2>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
              We stand apart through in-house manufacturing capabilities, rigorous compliance 
              with international electrical and mechanical standards, and dedicated long-term lifecycle support.
            </p>
          </div>

          {/* Company-Reported Highlight Card: 100+ Satisfied Clients */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-1 bg-[#C8A34D]" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#102C4E] text-[#C8A34D] flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#102C4E] tracking-tight font-mono">
                    100+
                  </div>
                  <p className="text-xs font-bold text-[#C8A34D] uppercase tracking-wider">
                    Satisfied Clients
                  </p>
                  <p className="text-[11px] text-[#64748B]">
                    Industrial & Commercial Deployments
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseKPS.map((pillar, idx) => {
            const Icon = pillarIcons[idx] || ShieldCheck;
            return (
              <div
                key={pillar.id}
                className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C8A34D] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Icon & Index Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#F7F9FC] group-hover:bg-[#102C4E] text-[#102C4E] group-hover:text-[#C8A34D] flex items-center justify-center border border-slate-200/90 group-hover:border-[#102C4E] transition-all duration-200 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-[#C8A34D] transition-colors">
                      0{pillar.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#102C4E] group-hover:text-[#1E5A91] transition-colors duration-200 mb-2">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom subtle indicator */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-[#102C4E] opacity-70 group-hover:opacity-100 group-hover:text-[#C8A34D] transition-all">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>KPS Engineering Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
