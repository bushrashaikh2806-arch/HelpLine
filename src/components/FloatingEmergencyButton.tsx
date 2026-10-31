import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, ShieldAlert, X, AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FloatingEmergencyButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating 112 Trigger Button */}
      <aside aria-label="Emergency quick dial" className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Emergency quick call dialer"
          aria-expanded={isOpen}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#B3261E] hover:bg-[#951F18] text-white font-bold rounded-full shadow-2xl border-2 border-white dark:border-[#2A251A] transition-colors focus:outline-none focus:ring-4 focus:ring-red-400/50"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
          >
            <PhoneCall className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-base tracking-wide font-black">112 SOS</span>
        </motion.button>
      </aside>

      {/* Quick Emergency Action Panel Modal / Popover */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-sm bg-white dark:bg-[#2A251A] rounded-2xl shadow-2xl border border-[#E6DCC3] dark:border-[#4A4230] p-5 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DCC3] dark:border-[#4A4230]">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-[#B3261E]">
                    <ShieldAlert className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#3B3426] dark:text-[#F3EDDC] text-base leading-tight">
                      Quick Emergency Dial
                    </h3>
                    <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
                      Direct tap-to-call response lines
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Call Buttons Grid */}
              <div className="mt-4 space-y-2.5">
                {/* 112 Unified */}
                <a
                  href="tel:112"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#B3261E] hover:bg-[#951F18] text-white font-bold transition-all shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                    <div>
                      <div className="text-sm font-black">Call 112 National Emergency</div>
                      <div className="text-xs font-normal text-red-100">Police • Fire • Medical (ERSS)</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-xs bg-white/20 rounded font-bold">Tap to Call</span>
                </a>

                {/* 100 Police */}
                <a
                  href="tel:100"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] text-[#3B3426] dark:text-[#F3EDDC] font-semibold border border-[#E6DCC3] dark:border-[#4A4230] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#C3B091]/30 flex items-center justify-center font-bold text-[#8A7545] dark:text-[#C3B091]">
                      100
                    </span>
                    <div>
                      <div className="text-sm font-bold">Police Control Room</div>
                      <div className="text-xs text-[#6F6954] dark:text-[#BDB59C]">Law enforcement assistance</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091]">Call</span>
                </a>

                {/* 108 Ambulance */}
                <a
                  href="tel:108"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] text-[#3B3426] dark:text-[#F3EDDC] font-semibold border border-[#E6DCC3] dark:border-[#4A4230] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#C3B091]/30 flex items-center justify-center font-bold text-[#8A7545] dark:text-[#C3B091]">
                      108
                    </span>
                    <div>
                      <div className="text-sm font-bold">Medical Ambulance (EMRI)</div>
                      <div className="text-xs text-[#6F6954] dark:text-[#BDB59C]">Urgent trauma & patient transit</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091]">Call</span>
                </a>
              </div>

              {/* Bottom Notice & View All link */}
              <div className="mt-4 pt-3 border-t border-[#E6DCC3] dark:border-[#4A4230] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#6F6954] dark:text-[#BDB59C]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Works offline</span>
                </div>
                <Link
                  to="/emergency"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                >
                  <span>All Helplines (1930, 1098...)</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
