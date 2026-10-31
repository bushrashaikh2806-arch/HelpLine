import React, { useState } from 'react';
import { Search, Sun, Moon, Bell, Globe, Menu, Shield } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { NotificationModal } from './NotificationModal';
import { UserDropdown } from './UserDropdown';
import type { Language } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#1E1A12]/95 backdrop-blur-md border-b border-[#E6DCC3] dark:border-[#4A4230] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile Menu Toggle & Animated Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-[#3B3426] dark:text-[#F3EDDC] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center">
            <AnimatedLogo size="sm" showText playIntro={false} loop={true} />
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search laws, FIR guidelines, cyber fraud, emergency..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545] transition-all"
            />
            <Search className="w-4 h-4 text-[#6F6954] dark:text-[#BDB59C] absolute left-3 top-2.5" />
          </form>
        </div>

        {/* Right Action Icons: Language, Dark/Light Toggle, Notifications, User Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Mobile search icon button */}
          <Link
            to="/search"
            className="md:hidden p-2 rounded-xl text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A] transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <div className="flex items-center bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] rounded-xl px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-[#8A7545] dark:text-[#C3B091]" />
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as Language)}
                aria-label="Select language"
                className="bg-transparent text-[#3B3426] dark:text-[#F3EDDC] font-semibold text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="en" className="dark:bg-[#2A251A]">English</option>
                <option value="hi" className="dark:bg-[#2A251A]">हिन्दी (Hindi)</option>
                <option value="mr" className="dark:bg-[#2A251A]">मराठी (Marathi)</option>
              </select>
            </div>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A] hover:text-[#3B3426] dark:hover:text-[#F3EDDC] transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#8A7545]" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 rounded-xl text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A] relative transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
            </button>
            <NotificationModal
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>

          {/* User Profile Avatar Dropdown */}
          <UserDropdown />
        </div>
      </div>

      {/* Language translation disclaimer banner if Hindi or Marathi is active */}
      {t.translationNotice && (
        <div className="bg-[#FAF7F0] dark:bg-[#231E15] border-t border-[#E6DCC3] dark:border-[#4A4230] px-4 py-1.5 text-center text-[11px] font-medium text-[#8A7545] dark:text-[#C3B091]">
          {t.translationNotice}
        </div>
      )}
    </header>
  );
};
