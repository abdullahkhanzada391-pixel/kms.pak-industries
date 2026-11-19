import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie choice
    try {
      const consent = localStorage.getItem('hk_cookie_consent');
      if (!consent) {
        // Show banner after brief delay
        const timer = setTimeout(() => {
          setVisible(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('hk_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem('hk_cookie_consent', 'rejected');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Cookie Consent Floating Card */}
      <aside
        role="dialog"
        aria-live="polite"
        aria-label="Cookie and Privacy Consent"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 max-w-lg w-[calc(100%-2rem)] sm:w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#E2E8F0] shadow-warm-2xl p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#C59B27] flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B192C]">
              Cookie Preferences & Privacy
            </span>
          </div>
          <button
            onClick={() => setVisible(false)}
            aria-label="Dismiss cookie notice"
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B192C] hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-sans mb-4 sm:mb-6">
          To provide the best experiences, we use technologies such as cookies to store and/or access device information. We use cookies to make your browsing experience more secure and efficient. For more information on cookies and how to disable them, please visit our{' '}
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="text-[#C59B27] font-semibold underline underline-offset-2 hover:text-[#0B192C] transition-colors focus:outline-none"
          >
            Privacy Policy
          </button>
          .
        </p>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleReject}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-[#0B192C] font-semibold text-xs sm:text-sm hover:bg-[#F8FAFC] hover:border-[#0B192C] active:scale-[0.98] transition-all min-h-[44px]"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm shadow-warm-xs border border-[#0B192C] active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Accept All Cookies</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          </button>
        </div>
      </aside>

      {/* Privacy Policy Lightbox Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B192C]/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-xl w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-warm-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#C59B27]" />
                <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                  Privacy & Cookie Policy
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#0B192C] hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
              <p>
                <strong>HK Power Industries</strong> respects your privacy and is committed to protecting your technical and browsing data.
              </p>
              <h4 className="font-mono text-xs font-bold uppercase text-[#0B192C]">
                1. How We Use Cookies
              </h4>
              <p>
                We use strictly necessary cookies to ensure the website operates smoothly, remembers your preferences, and protects interactive contact inquiry submissions.
              </p>
              <h4 className="font-mono text-xs font-bold uppercase text-[#0B192C]">
                2. Analytics & Performance
              </h4>
              <p>
                Performance telemetry helps us understand which engineering divisions and generator specifications are most relevant to our commercial clients so we can deliver optimal technical solutions.
              </p>
              <h4 className="font-mono text-xs font-bold uppercase text-[#0B192C]">
                3. Your Control
              </h4>
              <p>
                You may choose to accept or reject optional cookies at any time. Strictly necessary cookies required for website security and core functionality cannot be disabled.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 rounded-xl bg-[#0B192C] text-white hover:bg-[#1E3A8A] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

