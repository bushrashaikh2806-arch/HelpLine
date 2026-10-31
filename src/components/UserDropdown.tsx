import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bookmark, Sliders, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserPreferences } from '../context/UserPreferencesContext';

export const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { preferences } = useUserPreferences();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#F6F1E4] dark:bg-[#2A251A] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
      >
        <div className="w-7 h-7 rounded-full bg-[#8A7545] text-white flex items-center justify-center font-bold text-xs">
          {preferences.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline-block text-xs font-semibold text-[#3B3426] dark:text-[#F3EDDC] max-w-[100px] truncate">
          {preferences.name}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#6F6954] dark:text-[#BDB59C]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2A251A] rounded-2xl shadow-xl border border-[#E6DCC3] dark:border-[#4A4230] py-2 z-50 overflow-hidden"
          >
            {/* User Info Header */}
            <div className="px-4 py-2.5 border-b border-[#E6DCC3] dark:border-[#4A4230]">
              <div className="text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] truncate">
                {preferences.name}
              </div>
              <div className="text-[10px] text-[#8A7545] dark:text-[#C3B091] mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Device Storage Mode (Local Only)</span>
              </div>
            </div>

            {/* Links */}
            <div className="py-1 text-xs">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-[#3B3426] dark:text-[#F3EDDC] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
              >
                <User className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
                <span>Profile & Device Settings</span>
              </Link>

              <Link
                to="/profile?tab=bookmarks"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-[#3B3426] dark:text-[#F3EDDC] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
                  <span>Saved Rights & Tips</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C3B091]/30 font-bold text-[#8A7545] dark:text-[#C3B091]">
                  {preferences.savedRights.length + preferences.savedTips.length}
                </span>
              </Link>

              <Link
                to="/profile?tab=accessibility"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-[#3B3426] dark:text-[#F3EDDC] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
              >
                <Sliders className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
                <span>Text Size & Motion</span>
              </Link>
            </div>

            {/* Disclaimer strip */}
            <div className="px-4 py-2 bg-[#F6F1E4]/60 dark:bg-[#1E1A12]/60 border-t border-[#E6DCC3] dark:border-[#4A4230] text-[10px] text-[#6F6954] dark:text-[#BDB59C]">
              No server account required. Settings saved on this device only.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
