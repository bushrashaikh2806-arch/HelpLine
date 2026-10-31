import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Bookmark,
  Sliders,
  Bell,
  ShieldCheck,
  Check,
  RotateCcw,
  BookOpen,
  Compass,
  Lightbulb,
  ExternalLink,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { RIGHTS_DATA } from '../data/rightsData';
import { OFFICIAL_RESOURCES } from '../data/resourcesData';
import { SAFETY_TIPS } from '../data/safetyTipsData';
import type { Language } from '../types';
import { useToast } from '../components/Toast';

export const ProfilePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const {
    preferences,
    updatePreferences,
    toggleSavedRight,
    toggleBookmarkedResource,
    toggleSavedTip,
    resetAllPreferences,
  } = useUserPreferences();

  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [displayNameInput, setDisplayNameInput] = useState(preferences.name);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayNameInput.trim()) {
      updatePreferences({ name: displayNameInput.trim() });
      showToast('Display name updated successfully');
    }
  };

  // Saved Items Lookups
  const savedRightsList = RIGHTS_DATA.filter(r => preferences.savedRights.includes(r.id));
  const bookmarkedResList = OFFICIAL_RESOURCES.filter(r => preferences.bookmarkedResources.includes(r.id));
  const savedTipsList = SAFETY_TIPS.filter(t => preferences.savedTips.includes(t.id));

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>Local Device Profile & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Citizen Profile & Device Storage
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Manage your bookmarks, reading preferences, accessibility toggles, and offline storage. All data is retained on this device only.
        </p>
      </div>

      {/* Device Storage Assurance Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-[#231E15] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#6F6954] dark:text-[#BDB59C] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Zero-Cloud Privacy:</strong> Saved on this device only, not an account. HelpLine does not require personal login or store your reading history on cloud servers.
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E6DCC3] dark:border-[#4A4230] pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview & Account Info' },
          { id: 'bookmarks', label: `Saved Items (${preferences.savedRights.length + preferences.bookmarkedResources.length + preferences.savedTips.length})` },
          { id: 'accessibility', label: 'Accessibility & Display' },
          { id: 'privacy', label: 'Privacy & Data Controls' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
                : 'text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & DISPLAY NAME */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: User Card */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-4 text-center">
            <div className="w-20 h-20 rounded-full bg-[#8A7545] text-white text-3xl font-black flex items-center justify-center mx-auto shadow-md">
              {preferences.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                {preferences.name}
              </h2>
              <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-0.5">
                Local Citizen User Profile
              </p>
            </div>

            <div className="pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12]">
                <div className="font-black text-sm text-[#8A7545] dark:text-[#C3B091]">
                  {preferences.savedRights.length}
                </div>
                <div className="text-[10px] text-[#6F6954] dark:text-[#BDB59C]">Rights</div>
              </div>
              <div className="p-2 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12]">
                <div className="font-black text-sm text-[#8A7545] dark:text-[#C3B091]">
                  {preferences.savedTips.length}
                </div>
                <div className="text-[10px] text-[#6F6954] dark:text-[#BDB59C]">Tips</div>
              </div>
              <div className="p-2 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12]">
                <div className="font-black text-sm text-[#8A7545] dark:text-[#C3B091]">
                  {preferences.bookmarkedResources.length}
                </div>
                <div className="text-[10px] text-[#6F6954] dark:text-[#BDB59C]">Portals</div>
              </div>
            </div>
          </div>

          {/* Right: Edit Settings Form */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6">
            <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC]">
              Edit Profile Preferences
            </h3>

            {/* Display Name Edit */}
            <form onSubmit={handleSaveName} className="space-y-3">
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                Citizen Display Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={displayNameInput}
                  onChange={e => setDisplayNameInput(e.target.value)}
                  placeholder="Enter your name"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#8A7545] text-white font-bold text-xs hover:bg-[#6C5B34]"
                >
                  Save
                </button>
              </div>
            </form>

            {/* Preferred Language */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                Preferred Language
              </label>
              <div className="flex gap-2">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिन्दी (Hindi)' },
                  { code: 'mr', label: 'मराठी (Marathi)' },
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code as Language)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      language === l.code
                        ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] border-transparent'
                        : 'bg-white dark:bg-[#1E1A12] text-[#6F6954] dark:text-[#BDB59C] border-[#E6DCC3] dark:border-[#4A4230]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-2 pt-2 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                    In-App Legal Advisories
                  </div>
                  <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                    Show alerts in top bar when new cybercrime warnings are issued
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={e => updatePreferences({ emailNotifications: e.target.checked })}
                  className="rounded text-[#8A7545] focus:ring-[#8A7545]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKMARKS AND SAVED ITEMS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          {/* Saved Rights */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-4">
            <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
              <span>Saved Legal Rights ({savedRightsList.length})</span>
            </h3>

            {savedRightsList.length === 0 ? (
              <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
                No rights saved yet. Click the bookmark icon on any card in the Know Your Rights library.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedRightsList.map(r => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-2xl bg-[#F6F1E4]/50 dark:bg-[#1E1A12]/50 border border-[#E6DCC3] dark:border-[#4A4230] flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#8A7545] dark:text-[#C3B091]">
                        {r.category}
                      </span>
                      <h4 className="font-bold text-xs text-[#3B3426] dark:text-[#F3EDDC] mt-0.5">
                        {r.title}
                      </h4>
                      <Link
                        to={`/rights/${r.id}`}
                        className="text-[11px] font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline mt-1 inline-block"
                      >
                        Read Explanation →
                      </Link>
                    </div>

                    <button
                      onClick={() => {
                        toggleSavedRight(r.id);
                        showToast('Removed from bookmarks');
                      }}
                      className="p-1 text-[#6F6954] hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Portals */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-4">
            <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
              <span>Bookmarked Official Portals ({bookmarkedResList.length})</span>
            </h3>

            {bookmarkedResList.length === 0 ? (
              <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
                No portals bookmarked.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bookmarkedResList.map(p => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-[#F6F1E4]/50 dark:bg-[#1E1A12]/50 border border-[#E6DCC3] dark:border-[#4A4230] flex items-start justify-between gap-2"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-[#3B3426] dark:text-[#F3EDDC]">
                        {p.title}
                      </h4>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline mt-1 inline-flex items-center gap-1"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <button
                      onClick={() => {
                        toggleBookmarkedResource(p.id);
                        showToast('Removed bookmark');
                      }}
                      className="p-1 text-[#6F6954] hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ACCESSIBILITY & DISPLAY */}
      {activeTab === 'accessibility' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6 max-w-2xl">
          <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
            <span>Accessibility & Reading Comfort</span>
          </h3>

          {/* Text Size Controls */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC]">
              Font Scaling (Text Size)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 'normal', label: 'Standard (100%)' },
                { size: 'large', label: 'Large (115%)' },
                { size: 'larger', label: 'Extra Large (130%)' },
              ].map(item => (
                <button
                  key={item.size}
                  onClick={() => {
                    updatePreferences({ textSize: item.size as any });
                    showToast(`Text size set to ${item.label}`);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                    preferences.textSize === item.size
                      ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] border-transparent'
                      : 'bg-white dark:bg-[#1E1A12] text-[#6F6954] dark:text-[#BDB59C] border-[#E6DCC3] dark:border-[#4A4230]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="space-y-2 pt-4 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                  Reduce Animations & Logo Motion
                </div>
                <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                  Disables pulse rings, intro drawing, and sliding effects for vestibular comfort
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.reducedMotion}
                onChange={e => {
                  updatePreferences({ reducedMotion: e.target.checked });
                  showToast(e.target.checked ? 'Reduced motion enabled' : 'Full animations enabled');
                }}
                className="rounded text-[#8A7545] focus:ring-[#8A7545]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRIVACY & DATA CONTROLS */}
      {activeTab === 'privacy' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6 max-w-2xl">
          <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Local Device Privacy & Reset</span>
          </h3>

          <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] leading-relaxed">
            All your bookmarks, search history, and accessibility settings reside exclusively in your browser’s localStorage. Nothing is transmitted to external analytics or private tracking clouds.
          </p>

          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-3">
            <div className="font-bold text-xs text-red-900 dark:text-red-200">
              Clear All Local Data & Bookmarks
            </div>
            <p className="text-[11px] text-red-800 dark:text-red-300">
              This will remove all saved rights, bookmarks, custom display name, and search queries on this device.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all locally stored data and reset preferences?')) {
                  resetAllPreferences();
                  localStorage.removeItem('helpline_search_history');
                  showToast('All local data cleared');
                }
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Everything</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
