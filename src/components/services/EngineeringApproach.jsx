import React from 'react';
import { processSteps } from './ServicesData';
import { ArrowRight, Compass, Shield, Wrench, CheckCircle } from 'lucide-react';

export default function EngineeringApproach() {
  const stepIcons = [Compass, Wrench, Shield, CheckCircle];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#F7F9FC] border-y border-slate-200/80 relative overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#102C4E 1px, transparent 1px), linear-gradient(90deg, #102C4E 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102C4E] tracking-tight">
            From Planning to Performance.
          </h2>

          <p className="text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            While each engineering challenge requires tailored execution, our structured milestone 
            approach ensures technical accuracy, zero safety compromises, and reliable project handovers.
          </p>
        </div>

        {/* 4-Step Horizontal Process with Connected Lines */}
        <div className="relative">
          
          {/* Desktop Connecting Line between Step Centers */}
          <div 
            className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#C8A34D]/20 via-[#102C4E]/20 to-[#C8A34D]/20 -translate-y-12 z-0" 
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {processSteps.map((item, index) => {
              const Icon = stepIcons[index] || Shield;
              return (
                <div
                  key={item.step}
                  className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 hover:border-[#C8A34D] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Step Number & Icon Header */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#102C4E] text-[#C8A34D] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <span className="font-mono text-2xl font-black text-slate-200 group-hover:text-[#C8A34D] transition-colors duration-200">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-[#102C4E] group-hover:text-[#1E5A91] transition-colors duration-200 mb-2.5">
                      {item.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Golden Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8A34D] opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
