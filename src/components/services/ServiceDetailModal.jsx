import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Shield, 
  Layers, 
  Wrench, 
  Building, 
  PhoneCall, 
  CalendarCheck,
  Sliders,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function ServiceDetailModal({ service, isOpen, onClose, onSelectService }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cachedService, setCachedService] = useState(null);
  const [isFullWidth, setIsFullWidth] = useState(false);

  // Sync open/close transitions
  useEffect(() => {
    let animTimer;
    if (isOpen && service) {
      setCachedService(service);
      setIsMounted(true);
      // Trigger animation on next frame
      animTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 20);
    } else if (!isOpen && isMounted) {
      setIsAnimating(false);
      animTimer = setTimeout(() => {
        setIsMounted(false);
        setCachedService(null);
      }, 280);
    }
    return () => clearTimeout(animTimer);
  }, [isOpen, service, isMounted]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isMounted) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMounted]);

  if (!isMounted && !isOpen) return null;

  const currentService = cachedService || service;
  if (!currentService) return null;

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMounted(false);
      setCachedService(null);
      if (onClose) onClose();
    }, 280);
  };

  const handleBookConsultation = () => {
    if (onSelectService) {
      onSelectService(currentService.title);
    }
    handleClose();
  };

  const IconComponent = currentService.icon || Shield;
  const offerings = currentService?.offerings || (currentService?.highlights ? currentService.highlights.map(h => typeof h === 'string' ? h : `${h.title}: ${h.desc}`) : []);
  const specs = currentService?.specs || (currentService?.stats ? currentService.stats.map(s => ({ label: s.label, value: s.val })) : []);

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto flex flex-col justify-start sm:justify-center p-2 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 ease-out ${
        isAnimating 
          ? 'bg-[#0B192C]/70 backdrop-blur-md opacity-100' 
          : 'bg-[#0B192C]/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expanded-service-title"
    >
      {/* Expandable Service Detail Card - Automatically Adjusts to Screen Width */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white shadow-2xl relative my-auto transition-all duration-300 ease-out flex flex-col overflow-hidden ${
          isFullWidth
            ? 'w-screen max-w-[100vw] min-w-full rounded-none border-y border-[#C8A34D]/35'
            : 'w-full max-w-[94vw] lg:max-w-7xl xl:max-w-[1380px] mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90'
        } ${
          isAnimating 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-[0.985]'
        }`}
        style={{ maxHeight: '92vh' }}
      >
        {/* Floating Top-Right Controls: Screen Width Adjust Toggle & Close Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-2">
          {/* Automatic Screen Adjustment Toggle Button */}
          <button
            onClick={() => setIsFullWidth(!isFullWidth)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-[#102C4E] flex items-center justify-center transition-all duration-200 border border-slate-200 shadow-xs"
            title={isFullWidth ? "Auto-adjust to screen" : "Expand to 100% full width"}
            aria-label={isFullWidth ? "Auto-adjust to screen" : "Expand to 100% full width"}
          >
            {isFullWidth ? (
              <Minimize2 className="w-4 h-4 text-slate-700" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-[#102C4E] flex items-center justify-center transition-all duration-200 border border-slate-200 shadow-xs"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================================
            MAIN DETAIL BODY - Responsive Internal Scroll with Comfortable Padding
           ========================================================================= */}
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
            
            {/* ---------------------------------------------------------------------
                LEFT COLUMN: Large Image Showcase, Specs, Capacity & Support Hotline
               --------------------------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Large Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/services/generator-main.jpg';
                  }}
                />
                
                {/* Visual Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-transparent to-transparent pointer-events-none" />

                {/* Top-Right Line Icon Badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#0B192C]/80 backdrop-blur-md text-[#C8A34D] border border-white/20 flex items-center justify-center shadow-lg">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Image Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#DFBA62] block mb-0.5">
                    FACILITY & EQUIPMENT INSPECTION
                  </span>
                  <p className="text-sm font-bold line-clamp-1">
                    {currentService.title}
                  </p>
                </div>
              </div>

              {/* Engineering Capacity & Deployment Scale Card */}
              {currentService.capacity && (
                <div className="p-4 rounded-xl bg-[#F7F9FC] border border-slate-200/90 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#102C4E]">
                    <Sliders className="w-4 h-4 text-[#C8A34D]" />
                    <span>Capacity / Deployment Scale</span>
                  </div>
                  <p className="text-sm font-bold text-[#102C4E]">
                    {currentService.capacity}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    Full engineering design, supply, testing, and lifecycle maintenance included.
                  </p>
                </div>
              )}

              {/* Authorized Brand & Component Alliances */}
              {currentService.brands && currentService.brands.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#102C4E] flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C8A34D]" />
                    <span>Authorized Brand Alliances</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentService.brands.map((brand, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#F7F9FC] text-xs font-semibold text-[#102C4E] border border-slate-200 shadow-2xs"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 24/7 Rapid Escalation Contact Card */}
              <a
                href="tel:04235957670"
                className="group flex items-center gap-3.5 p-4 rounded-xl bg-[#0B192C] text-white hover:bg-[#102C4E] transition-all border border-[#C8A34D]/40 shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C8A34D]/20 border border-[#C8A34D]/50 flex items-center justify-center text-[#DFBA62] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-5 h-5 text-[#DFBA62]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#DFBA62] block">
                    Direct Engineering Desk • 24/7 Hotline
                  </span>
                  <span className="text-base font-bold text-white tracking-wider group-hover:text-[#DFBA62] transition-colors">
                    0423 595 7670
                  </span>
                </div>
              </a>

            </div>

            {/* ---------------------------------------------------------------------
                RIGHT COLUMN: Title, Description, Capabilities, Specs, & Right-Bottom CTA
               --------------------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Main Title */}
              <div className="space-y-3">
                <h2 
                  id="expanded-service-title" 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102C4E] tracking-tight leading-tight pr-24"
                >
                  {currentService.title}
                </h2>

                {/* Elegant architectural divider */}
                <div className="h-1 w-24 bg-gradient-to-r from-[#C8A34D] via-[#DFBA62] to-transparent rounded-full" />
              </div>

              {/* Complete & Detailed Service Description */}
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-[#334155] leading-relaxed font-normal">
                  {currentService.longDesc || currentService.lead || currentService.shortDesc}
                </p>
              </div>

              {/* All Key Capabilities and Services Offered */}
              {offerings && offerings.length > 0 && (
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#102C4E] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#C8A34D]" />
                      <span>All Key Capabilities & Services Offered</span>
                    </h3>
                    <span className="text-[11px] font-mono text-[#C8A34D] font-bold">
                      {offerings.length} Core Capabilities
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {offerings.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F9FC] border border-slate-200/80 hover:border-[#C8A34D]/60 hover:bg-white text-xs sm:text-sm text-[#102C4E] transition-all shadow-2xs group"
                      >
                        <div className="w-5 h-5 rounded-md bg-[#102C4E] text-[#DFBA62] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#C8A34D] group-hover:text-[#0B192C] transition-colors">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications & Standards Table */}
              {specs && specs.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#102C4E] flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#C8A34D]" />
                    <span>Technical Specifications & Standards</span>
                  </h3>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <tbody className="divide-y divide-slate-100">
                        {specs.map((spec, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                            <td className="px-4 py-2.5 font-semibold text-[#102C4E] w-2/5 border-r border-slate-100">
                              {spec.label}
                            </td>
                            <td className="px-4 py-2.5 text-[#334155] font-mono text-xs">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  RIGHT BOTTOM ACTION ROW (Cleanly Aligned to Right, Zero Text Overlap)
                 ========================================================================= */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-slate-100">
                {/* Secondary Back to Services Button */}
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:border-[#102C4E] bg-white text-[#102C4E] hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 text-[#64748B]" />
                  <span>Back to Services</span>
                </button>

                {/* Primary Book a Consultation Button (Exact Navy Blue, White & Gold Theme) */}
                <button
                  onClick={handleBookConsultation}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#102C4E] hover:bg-[#0B192C] text-white border-2 border-[#C8A34D] hover:border-[#DFBA62] font-bold text-sm tracking-wide shadow-lg shadow-[#0B192C]/25 hover:shadow-xl hover:shadow-[#C8A34D]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
                  aria-label="Book a consultation for this service"
                >
                  <CalendarCheck className="w-4 h-4 text-[#DFBA62]" />
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#DFBA62] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
