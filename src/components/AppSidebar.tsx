import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Bot,
  Search,
  PhoneCall,
  FileText,
  ShieldAlert,
  Lightbulb,
  Newspaper,
  Compass,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AppSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { t } = useLanguage();

  const navItems = [
    { to: '/', label: t.home, icon: Home },
    { to: '/rights', label: t.rights, icon: BookOpen },
    { to: '/ai-assistant', label: t.aiAssistant, icon: Bot },
    { to: '/search', label: t.search, icon: Search },
    { to: '/emergency', label: t.emergency, icon: PhoneCall, isUrgent: true },
    { to: '/complaint-guidance', label: t.complaintGuidance, icon: FileText },
    { to: '/cybercrime', label: t.cybercrime, icon: ShieldAlert },
    { to: '/safety-tips', label: t.safetyTips, icon: Lightbulb },
    { to: '/updates', label: t.updates, icon: Newspaper },
    { to: '/resources', label: t.resources, icon: Compass },
    { to: '/profile', label: t.profile, icon: User },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#1E1A12] border-r border-[#E6DCC3] dark:border-[#4A4230] select-none">
      {/* Sidebar Header on Mobile */}
      <div className="flex items-center justify-between p-4 border-b border-[#E6DCC3] dark:border-[#4A4230] md:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091]" />
          <span className="font-extrabold text-[#3B3426] dark:text-[#F3EDDC] text-base">
            Navigation Menu
          </span>
        </div>
        <button
          onClick={onMobileClose}
          className="p-1 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A]"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5" aria-label="Main Navigation">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isActive
                    ? 'bg-[#C3B091] dark:bg-[#C3B091] text-[#3B3426] dark:text-[#1E1A12] font-bold shadow-sm'
                    : 'text-[#3B3426] dark:text-[#F3EDDC] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A]'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      item.isUrgent && !isActive
                        ? 'text-[#B3261E] dark:text-red-400'
                        : isActive
                        ? 'text-[#3B3426] dark:text-[#1E1A12]'
                        : 'text-[#8A7545] dark:text-[#C3B091]'
                    }`}
                  />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="truncate flex-1 tracking-tight">{item.label}</span>
                  )}
                  {item.isUrgent && (!isCollapsed || isMobileOpen) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-[#B3261E] dark:text-red-300 font-extrabold uppercase">
                      SOS
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Desktop Collapse Toggle Footer */}
      <div className="hidden md:flex items-center justify-between p-3 border-t border-[#E6DCC3] dark:border-[#4A4230]">
        {!isCollapsed && (
          <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] flex items-center gap-1 font-medium pl-1">
            <span>HelpLine v1.0</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A] hover:text-[#3B3426] dark:hover:text-[#F3EDDC] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block transition-all duration-200 ease-in-out h-[calc(100vh-4rem)] sticky top-16 z-20 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
