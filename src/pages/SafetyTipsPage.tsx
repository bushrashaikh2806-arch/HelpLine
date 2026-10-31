import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Search,
  Bookmark,
  Share2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckSquare,
  AlertTriangle,
} from 'lucide-react';
import { SAFETY_TIPS, SAFETY_CHECKLIST } from '../data/safetyTipsData';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useToast } from '../components/Toast';

export const SafetyTipsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const { toggleSavedTip, isTipSaved } = useUserPreferences();
  const { showToast } = useToast();

  const categories = [
    'All',
    'Personal',
    'Women\'s',
    'Travel',
    'Public Transport',
    'Online',
    'Home',
    'Student',
    'Emergency Preparedness',
  ];

  const filteredTips = useMemo(() => {
    return SAFETY_TIPS.filter(tip => {
      const matchesCategory =
        selectedCategory === 'All' || tip.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        tip.title.toLowerCase().includes(q) ||
        tip.summary.toLowerCase().includes(q) ||
        tip.realWorldScenario.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleTipExpand = (id: string) => {
    setExpandedTipId(prev => (prev === id ? null : id));
  };

  const handleShareTip = (title: string, summary: string) => {
    if (navigator.share) {
      navigator.share({ title: `HelpLine Safety Tip: ${title}`, text: summary });
    } else {
      navigator.clipboard.writeText(`${title}\n\n${summary}\n\nShared via HelpLine`);
      showToast('Safety tip copied to clipboard');
    }
  };

  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Citizen Safety & Prevention Protocols</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Safety Tips & Daily Protocols
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Practical situational awareness, travel safeguards, and online defense measures curated for Indian public transit and urban living.
        </p>
      </div>

      {/* 2. Featured Daily Tip Hero Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAF7F0] via-white to-[#F6F1E4] dark:from-[#2A251A] dark:via-[#1E1A12] dark:to-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-[#8A7545]/15 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
            Featured Daily Focus • {SAFETY_TIPS[0].category}
          </span>
          <span className="text-xs text-[#6F6954] dark:text-[#BDB59C]">Actionable Advice</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#3B3426] dark:text-[#F3EDDC]">
          {SAFETY_TIPS[0].title}
        </h2>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] leading-relaxed max-w-2xl">
          {SAFETY_TIPS[0].summary}
        </p>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs space-y-1.5">
          <div className="font-bold text-[#8A7545] dark:text-[#C3B091] uppercase tracking-wider text-[11px]">
            Key Action Points:
          </div>
          <ul className="space-y-1 text-[#3B3426] dark:text-[#F3EDDC]">
            {SAFETY_TIPS[0].actionPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A7545] dark:bg-[#C3B091] mt-1.5 flex-shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Search and Category Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F6954] dark:text-[#BDB59C] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search safety tips (e.g. 'cab', 'wi-fi', 'domestic staff', 'metro')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
                  : 'bg-[#F6F1E4] dark:bg-[#2A251A] text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.map(tip => {
          const isExpanded = expandedTipId === tip.id;
          const isSaved = isTipSaved(tip.id);

          return (
            <div
              key={tip.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#8A7545] dark:text-[#C3B091] px-2.5 py-0.5 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12]">
                    {tip.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        toggleSavedTip(tip.id);
                        showToast(isSaved ? 'Removed from saved tips' : 'Saved to profile');
                      }}
                      className="p-1.5 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12]"
                      title="Save tip"
                      aria-label="Save tip"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-[#8A7545] text-[#8A7545] dark:fill-[#C3B091] dark:text-[#C3B091]' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleShareTip(tip.title, tip.summary)}
                      className="p-1.5 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12]"
                      title="Share tip"
                      aria-label="Share tip"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] mt-2.5">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1.5 leading-relaxed">
                  {tip.summary}
                </p>

                {/* Expanded Action Points & Real-world scenario */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-[#E6DCC3] dark:border-[#4A4230] space-y-2.5 text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#8A7545] dark:text-[#C3B091] text-[11px] uppercase tracking-wider">
                          Key Protocols:
                        </div>
                        <ul className="mt-1 space-y-1 text-[#3B3426] dark:text-[#F3EDDC]">
                          {tip.actionPoints.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8A7545] dark:bg-[#C3B091] mt-1.5 flex-shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-[#352C18]/40 border border-amber-200/50 dark:border-[#4A4230]">
                        <div className="font-bold text-amber-900 dark:text-amber-200 text-[11px] uppercase tracking-wider">
                          Everyday Example:
                        </div>
                        <p className="text-amber-950 dark:text-amber-100 mt-0.5 leading-relaxed">
                          {tip.realWorldScenario}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60">
                <button
                  onClick={() => toggleTipExpand(tip.id)}
                  className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Show Less' : 'View Action Steps & Example'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Citizen Readiness Checklist */}
      <section className="p-6 rounded-3xl bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091]" />
          <h2 className="text-lg font-bold text-[#3B3426] dark:text-[#F3EDDC]">
            Citizen Safety Readiness Checklist
          </h2>
        </div>
        <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
          Check off essential items to ensure personal, digital, and household readiness.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {SAFETY_CHECKLIST.map(item => {
            const isChecked = !!checkedItems[item.id];
            return (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] cursor-pointer hover:bg-[#FAF7F0] dark:hover:bg-[#352C18] transition-colors text-xs"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleChecklist(item.id)}
                  className="mt-0.5 rounded text-[#8A7545] focus:ring-[#8A7545]"
                />
                <div>
                  <span className={isChecked ? 'line-through text-[#6F6954] dark:text-[#BDB59C]' : 'font-semibold text-[#3B3426] dark:text-[#F3EDDC]'}>
                    {item.label}
                  </span>
                  <div className="text-[10px] text-[#8A7545] dark:text-[#C3B091] font-bold mt-0.5">
                    {item.category}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>
    </div>
  );
};
