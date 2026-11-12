import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  MessageSquare,
  FileText
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      // 2. Left Column (Contact details & Credentials) Slide & Fade
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 3. Right Column (Form container) Slide & Fade
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
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

    // Simulate reliable submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
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
      className="relative py-24 sm:py-32 bg-kps-surface border-t border-slate-900 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consult Our Engineering Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            Initiate Your Engineering Solution.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Contact our Lahore headquarters for generator sales, technical maintenance, turnkey electrical switchgear, or nationwide project quotes.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Official Corporate Contact Information */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="bg-kps-card p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-4">
                Keen Power Solutions (KPS)
              </h3>

              {/* Contact List */}
              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      HEAD OFFICE ADDRESS
                    </span>
                    <p className="text-slate-200 font-medium mt-0.5 leading-snug">
                      26B Block B, Nawab Town, Raiwind Road, Lahore, Pakistan.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      TELEPHONE / DIRECT DESK
                    </span>
                    <a
                      href="tel:04235957670"
                      className="text-amber-400 hover:text-amber-300 font-bold font-mono text-base block mt-0.5 transition-colors"
                    >
                      0423 595 7670
                    </a>
                    <span className="text-xs text-slate-400 font-mono">24/7 Field Dispatch Available</span>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                      OFFICIAL WEBSITE
                    </span>
                    <a
                      href="http://www.kpspak.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-amber-400 font-mono text-sm block mt-0.5 transition-colors"
                    >
                      www.kpspak.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Tax & Registration Credentials */}
              <div className="pt-4 border-t border-slate-800 bg-slate-900/60 -mx-6 -mb-6 p-6 rounded-b-2xl space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Sales Tax Registration (STRN):</span>
                  <span className="text-amber-400 font-bold">3277876180555</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">National Tax Number (NTN):</span>
                  <span className="text-amber-400 font-bold">5561026-7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Project Request Form */}
          <div ref={rightColRef} className="lg:col-span-7 bg-kps-card p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl relative">
            {submitted ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry regarding <strong className="text-amber-400">{formData.service}</strong> has been prepared. Our engineering coordinator will reach you at{' '}
                    <span className="font-mono text-slate-200">{formData.phone}</span>.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="tel:04235957670"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg"
                  >
                    Call 0423 595 7670 Directly
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div ref={formFieldsRef} className="space-y-5">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-xl font-bold text-white font-display">
                      Request Engineering Quotation
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fill in your details below and an engineer will review your specification.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Engr. Ahmad Khan"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-amber-500'
                          }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ahmad@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-amber-500'
                          }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0300 1234567"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-amber-500'
                          }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {serviceOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-900 text-slate-200">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Project Scope / Message *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your power requirements, generator capacity (kVA), project location, or specific engineering scope..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-amber-500'
                        }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <span className="text-[11px] font-mono text-slate-400">
                      Official Response Within 24 Hours
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Processing...' : 'Submit Inquiry'}</span>
                      <Send className="w-4 h-4" />
                    </button>
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
