import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  playIntro?: boolean;
  loop?: boolean;
  className?: string;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  showText = true,
  playIntro = false,
  loop = true,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [introFinished, setIntroFinished] = useState(!playIntro || shouldReduceMotion);

  useEffect(() => {
    if (playIntro && !shouldReduceMotion) {
      const timer = setTimeout(() => {
        setIntroFinished(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [playIntro, shouldReduceMotion]);

  // Dimension scaling
  const dimensions = {
    sm: { width: 36, height: 36, wordmarkSize: 'text-lg', tagSize: 'text-[9px]' },
    md: { width: 48, height: 48, wordmarkSize: 'text-2xl', tagSize: 'text-[10px]' },
    lg: { width: 88, height: 88, wordmarkSize: 'text-4xl', tagSize: 'text-xs' },
  }[size];

  const shieldVariants = {
    hidden: { pathLength: 0, fillOpacity: 0 },
    visible: {
      pathLength: 1,
      fillOpacity: 1,
      transition: { duration: 0.9, ease: 'easeInOut' },
    },
    static: { pathLength: 1, fillOpacity: 1 },
  };

  const innerOutlineVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.6, duration: 0.4 } },
    static: { opacity: 1 },
  };

  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.9,
        type: 'spring',
        stiffness: 300,
        damping: 12,
      },
    },
    static: { scale: 1, opacity: 1 },
  };

  const headsetVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 1.2, duration: 0.5, ease: 'easeOut' },
    },
    static: { opacity: 1, scale: 1 },
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <motion.div
        className="relative flex items-center justify-center cursor-pointer"
        whileHover={
          !shouldReduceMotion
            ? {
                y: -3,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }
            : undefined
        }
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Signal Pulse Rings */}
          {loop && introFinished && !shouldReduceMotion && (
            <>
              <motion.circle
                cx="32"
                cy="35"
                r="18"
                stroke="#C3B091"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0.8, 1.4, 1.7],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  duration: 1.6,
                  ease: 'easeOut',
                }}
              />
              <motion.circle
                cx="32"
                cy="35"
                r="18"
                stroke="#8A7545"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.6, 2.0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  duration: 1.8,
                  delay: 0.25,
                  ease: 'easeOut',
                }}
              />
            </>
          )}

          {/* Shield Outer Path */}
          <motion.path
            d="M32 4L10 14V30C10 44 20 54 32 60C44 54 54 44 54 30V14L32 4Z"
            fill="#8A7545"
            stroke="#6C5B34"
            strokeWidth="1.5"
            variants={shieldVariants}
            initial={playIntro && !shouldReduceMotion ? 'hidden' : 'static'}
            animate={introFinished || shouldReduceMotion ? 'static' : 'visible'}
          />

          {/* Thin Inner Light Khaki Outline */}
          <motion.path
            d="M32 8L14 16.5V29C14 41 22 49.5 32 55C42 49.5 50 41 50 29V16.5L32 8Z"
            stroke="#C3B091"
            strokeWidth="1.5"
            strokeDasharray="2 1"
            variants={innerOutlineVariants}
            initial={playIntro && !shouldReduceMotion ? 'hidden' : 'static'}
            animate={introFinished || shouldReduceMotion ? 'static' : 'visible'}
          />

          {/* Small Khaki Star at Top Inside */}
          <motion.polygon
            points="32,11 33.6,15.2 38,15.5 34.6,18.3 35.8,22.8 32,20.4 28.2,22.8 29.4,18.3 26,15.5 30.4,15.2"
            fill="#C3B091"
            variants={starVariants}
            initial={playIntro && !shouldReduceMotion ? 'hidden' : 'static'}
            animate={introFinished || shouldReduceMotion ? 'static' : 'visible'}
          />

          {/* White Headset */}
          <motion.g
            variants={headsetVariants}
            initial={playIntro && !shouldReduceMotion ? 'hidden' : 'static'}
            animate={introFinished || shouldReduceMotion ? 'static' : 'visible'}
            whileHover={
              !shouldReduceMotion
                ? {
                    scale: 1.06,
                    y: -1,
                    transition: { type: 'spring', stiffness: 500 },
                  }
                : undefined
            }
          >
            {/* Headband */}
            <path
              d="M21 34C21 27.9249 25.9249 23 32 23C38.0751 23 43 27.9249 43 34"
              stroke="#FFFFFF"
              strokeWidth="2.75"
              strokeLinecap="round"
            />
            {/* Left Ear cup */}
            <rect x="18" y="32" width="4.5" height="10" rx="2.25" fill="#FFFFFF" />
            {/* Right Ear cup */}
            <rect x="41.5" y="32" width="4.5" height="10" rx="2.25" fill="#FFFFFF" />
            {/* Mic Arm */}
            <path
              d="M42 38C42 43 38 45.5 33 45.5H30"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Mic Dot */}
            <circle cx="28" cy="45.5" r="2.2" fill="#C3B091" stroke="#FFFFFF" strokeWidth="0.75" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Wordmark and Tagline */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight leading-none">
            <motion.span
              className={`font-extrabold text-[#3B3426] dark:text-[#F3EDDC] ${dimensions.wordmarkSize}`}
              initial={playIntro && !shouldReduceMotion ? { opacity: 0, x: -12 } : { opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              Help
            </motion.span>
            <motion.span
              className={`font-extrabold text-[#8A7545] dark:text-[#C3B091] ${dimensions.wordmarkSize}`}
              initial={playIntro && !shouldReduceMotion ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.4 }}
            >
              Line
            </motion.span>
          </div>
          {/* Khaki Underline */}
          <motion.div
            className="h-[2px] bg-[#C3B091] rounded-full mt-1 mb-0.5"
            initial={playIntro && !shouldReduceMotion ? { width: 0 } : { width: '100%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 2.0, duration: 0.4 }}
          />
          {/* Tagline */}
          <motion.span
            className={`font-semibold tracking-wider text-[#8A7545] dark:text-[#BDB59C] uppercase ${dimensions.tagSize}`}
            initial={playIntro && !shouldReduceMotion ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            KNOW YOUR RIGHTS. STAY SAFE.
          </motion.span>
        </div>
      )}
    </div>
  );
};
