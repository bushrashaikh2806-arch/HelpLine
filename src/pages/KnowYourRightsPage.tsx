import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark,
  Share2,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Scale,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { RIGHTS_DATA, CATEGORIES } from '../data/rightsData';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useToast } from '../components/Toast';

export const KnowYourRightsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const { toggleSavedRight, isRightSaved } = useUserPreferences();
  const { showToast } = useToast();

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(`${title}\n\n${text}\n\nSource: HelpLine - Know Your Rights`);
    showToast('Copied summary to clipboard', title);
  };

  const handleShare = (id: string, title: string) => {
    const url = `${window.location.origin}/rights/${id}`;
    if (navigator.share) {
      navigator.share({ title: `HelpLine: ${title}`, url });
    } else {
      navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard', 'Shareable URL ready to send');
    }
  };

  const filteredRights = useMemo(() => {
    return RIGHTS_DATA.filter(item => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.whatItMeans.toLowerCase().includes(q) ||
        item.legalReference.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Awareness Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Know Your Rights & Protections
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Searchable legal repository written in plain language. Every statute is referenced with verified legal citations from the Constitution, BNSS/CrPC, and Central Acts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F6954] dark:text-[#BDB59C] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search rights (e.g. 'Article 21', 'Zero FIR', 'Arrest of Women', 'MRP', 'POSH')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
                : 'bg-[#F6F1E4] dark:bg-[#2A251A] text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230]'
            }`}
          >
            All Categories ({RIGHTS_DATA.length})
          </button>
          {CATEGORIES.map(cat => (
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

      {/* Rights Cards List */}
      <div className="space-y-4">
        {filteredRights.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230]">
            <BookOpen className="w-10 h-10 text-[#6F6954] dark:text-[#BDB59C] mx-auto opacity-50" />
            <div className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] mt-3">
              No matching rights found
            </div>
            <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1 max-w-md mx-auto">
              Try searching with another keyword or selecting a different category from above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#8A7545] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredRights.map(right => {
            const isExpanded = !!expandedCards[right.id];
            const isSaved = isRightSaved(right.id);

            return (
              <motion.div
                key={right.id}
                layout
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft transition-all"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] border border-[#E6DCC3] dark:border-[#4A4230]">
                        {right.category}
                      </span>
                      {right.verified ? (
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified Citation</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Verify before relying on this</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
                      {right.title}
                    </h2>
                  </div>

                  {/* Actions: Bookmark, Share, Copy */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        toggleSavedRight(right.id);
                        showToast(isSaved ? 'Removed from saved' : 'Saved to bookmarks');
                      }}
                      className="p-2 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
                      title={isSaved ? 'Remove bookmark' : 'Bookmark this right'}
                      aria-label="Bookmark"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-[#8A7545] text-[#8A7545] dark:fill-[#C3B091] dark:text-[#C3B091]' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => handleCopy(right.summary, right.title)}
                      className="p-2 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
                      title="Copy summary"
                      aria-label="Copy summary"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleShare(right.id, right.title)}
                      className="p-2 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
                      title="Share link"
                      aria-label="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Plain-Language Summary */}
                <p className="text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] mt-2.5 leading-relaxed font-normal">
                  {right.summary}
                </p>

                {/* Statutory Reference Badge */}
                <div className="mt-3 p-3 rounded-xl bg-[#F6F1E4]/70 dark:bg-[#1E1A12]/70 border border-[#E6DCC3]/60 dark:border-[#4A4230]/60 text-xs">
                  <span className="font-bold text-[#8A7545] dark:text-[#C3B091]">Legal Citation: </span>
                  <span className="text-[#3B3426] dark:text-[#F3EDDC] font-medium">{right.legalReference}</span>
                </div>

                {/* Expandable Accordion Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-[#E6DCC3] dark:border-[#4A4230] space-y-3.5 text-xs"
                    >
                      {/* What this means */}
                      <div>
                        <div className="font-bold text-[#8A7545] dark:text-[#C3B091] uppercase tracking-wider text-[11px]">
                          What This Means in Practice:
                        </div>
                        <p className="text-[#3B3426] dark:text-[#F3EDDC] mt-1 leading-relaxed">
                          {right.whatItMeans}
                        </p>
                      </div>

                      {/* Real-world example */}
                      <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-[#352C18]/40 border border-amber-200/50 dark:border-[#4A4230]">
                        <div className="font-bold text-amber-900 dark:text-amber-200 text-[11px] uppercase tracking-wider">
                          Real-World Example:
                        </div>
                        <p className="text-amber-950 dark:text-amber-100 mt-1 leading-relaxed">
                          {right.example}
                        </p>
                      </div>

                      {/* Official Source Link */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                        <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                          Official Source: <span className="font-medium text-[#3B3426] dark:text-[#F3EDDC]">{right.officialSource}</span>
                        </div>
                        {right.sourceLink && (
                          <a
                            href={right.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                          >
                            <span>Read Official Statute</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Bar: Expand Button & Full Detail Link */}
                <div className="mt-4 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleExpand(right.id)}
                    className="font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Read Full Meaning & Example'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <Link
                    to={`/rights/${right.id}`}
                    className="font-bold text-[#3B3426] dark:text-[#F3EDDC] hover:text-[#8A7545] dark:hover:text-[#C3B091] flex items-center gap-1"
                  >
                    <span>Next Steps & Detail View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
