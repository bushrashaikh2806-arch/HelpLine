import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AnimatedLogo } from './AnimatedLogo';

export const SplashScreen: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasSeen = sessionStorage.getItem('helpline_splash_seen');
    return !hasSeen;
  });

  useEffect(() => {
    if (!isVisible) return;

    const duration = shouldReduceMotion ? 1200 : 2600;
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('helpline_splash_seen', 'true');
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, shouldReduceMotion]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#1E1A12] px-6 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <div className="flex flex-col items-center text-center max-w-md">
            <AnimatedLogo size="lg" showText playIntro loop={false} />
            <motion.p
              className="mt-6 text-sm font-medium text-[#6F6954] dark:text-[#BDB59C]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              Legal Awareness & Citizen Safety Platform
            </motion.p>

            <motion.div
              className="w-48 h-1 bg-[#F6F1E4] dark:bg-[#2A251A] rounded-full mt-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-[#8A7545] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </motion.div>

            <button
              onClick={() => {
                setIsVisible(false);
                sessionStorage.setItem('helpline_splash_seen', 'true');
              }}
              className="mt-8 text-xs text-[#8A7545] dark:text-[#C3B091] underline hover:opacity-80 transition-opacity"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
