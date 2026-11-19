import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  FileText
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpecularButton from './SpecularButton';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ preselectedService }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const formFieldsRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Generators & Services (15 - 2500 kVA)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      const isMobile = window.innerWidth < 768;

      // 2. Left Column Slide & Fade (Vertical on mobile to prevent horizontal overflow)
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: isMobile ? 0 : -35, y: isMobile ? 25 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 3. Right Column Slide & Fade (Vertical on mobile to prevent horizontal overflow)
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: isMobile ? 0 : 35, y: isMobile ? 25 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 4. Staggered Form Fields Entrance
      if (formFieldsRef.current) {
        gsap.fromTo(
          formFieldsRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 82%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const serviceOptions = [
    'Generators & Services (15 - 2500 kVA)',
    'Generator Rental Services',
    'Generator Maintenance & O&M Contract',
    'Electrical Engineering & LT/HT Panels',
    'ATS / AMF Synchronization Panels',
    'Industrial Fabrication & Canopies',
    'Solar Power Solutions (On-Grid / Off-Grid)',
    'Commercial Kitchen Equipment',
    'Ducting & Industrial Ventilation',
    'Fire Fighting Equipment & Installation',
    'SMD Screen & LED Display Solutions',
    'Complete Turnkey Engineering Project'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please provide a valid phone number (at least 8 digits).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters detailing your project requirements.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: serviceOptions[0],
      message: ''
    });
    setErrors({});
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Architectural Grid Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#C59B27]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
            LET'S POWER YOUR NEXT PROJECT.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
            Contact our Lahore headquarters for generator sales, technical maintenance, turnkey electrical switchgear, or nationwide project quotes.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Corporate Contact Information */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-warm-md space-y-6">
              <h3 className="text-xl font-serif font-bold text-[#0B192C] border-b border-[#E2E8F0] pb-4">
                HK Power Industries
              </h3>

              {/* Contact List */}
              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#C59B27] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block">
                      HEAD OFFICE ADDRESS
                    </span>
                    <p className="text-[#0B192C] font-medium mt-0.5 leading-snug">
                      26B Block B, Nawab Town, Raiwind Road, Lahore, Pakistan.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#C59B27] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block">
                      TELEPHONE / DIRECT DESK
                    </span>
                    <a
                      href="tel:04235957670"
                      className="text-[#0B192C] hover:text-[#C59B27] font-bold font-mono text-base block mt-0.5 transition-colors min-h-[44px] flex items-center"
                    >
                      0423 595 7670
                    </a>
                    <span className="text-xs text-[#64748B] font-mono">24/7 Field Dispatch Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Project Request Form */}
          <div ref={rightColRef} className="lg:col-span-7 bg-white p-5 sm:p-8 lg:p-10 rounded-2xl border border-[#E2E8F0] shadow-warm-lg relative">
            {submitted ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#FFFBEB] border-2 border-[#C59B27] text-[#C59B27] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#0B192C]">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="mt-2 text-sm text-[#334155] max-w-md mx-auto leading-relaxed">
                    Your inquiry regarding <strong className="text-[#0B192C]">{formData.service}</strong> has been logged for our engineering desk. For immediate emergency dispatch or urgent pricing, call our Lahore office directly at{' '}
                    <a href="tel:04235957670" className="font-mono text-[#C59B27] font-bold hover:underline">0423 595 7670</a>.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="tel:04235957670"
                    className="btn-navy px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center"
                  >
                    Call 0423 595 7670 Directly
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl text-xs font-mono text-[#334155] bg-[#F8FAFC] border border-[#E2E8F0] hover:text-[#C59B27] min-h-[48px] w-full sm:w-auto transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div ref={formFieldsRef} className="space-y-5">
                  <div className="border-b border-[#E2E8F0] pb-3">
                    <h3 className="text-xl font-serif font-bold text-[#0B192C]">
                      Request Engineering Quotation
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Fill in your project specifications below and an engineer will review your requirements.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Engr. Ahmad Khan"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border text-base sm:text-sm text-[#0B192C] placeholder-[#64748B]/60 focus:outline-none focus:bg-white transition-colors min-h-[48px] ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#0B192C]'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-500 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ahmad@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border text-base sm:text-sm text-[#0B192C] placeholder-[#64748B]/60 focus:outline-none focus:bg-white transition-colors min-h-[48px] ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#0B192C]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-500 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0300 1234567"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border text-base sm:text-sm text-[#0B192C] placeholder-[#64748B]/60 focus:outline-none focus:bg-white transition-colors min-h-[48px] ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#0B192C]'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                        Interested Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-base sm:text-sm text-[#0B192C] focus:outline-none focus:border-[#0B192C] transition-colors min-h-[48px]"
                      >
                        {serviceOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-white text-[#0B192C]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#64748B] mb-1.5">
                      Project Scope / Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your power requirements, generator capacity (kVA), project location, or specific engineering scope..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border text-base sm:text-sm text-[#0B192C] placeholder-[#64748B]/60 focus:outline-none focus:bg-white transition-colors ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#0B192C]'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-500 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-[11px] font-mono text-[#64748B]">
                      Official Technical Review Within 24 Hours
                    </span>

                    <SpecularButton
                      type="submit"
                      disabled={isSubmitting}
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
                      className="font-bold text-xs uppercase tracking-wider min-h-[48px] px-8 py-3.5 w-full sm:w-auto shadow-warm-sm border border-[#C59B27]/40"
                    >
                      <span>{isSubmitting ? 'Processing...' : 'SEND YOUR INQUIRY'}</span>
                      <Send className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
                    </SpecularButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
