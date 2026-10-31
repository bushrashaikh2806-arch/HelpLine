import React, { useState } from 'react';
import {
  Compass,
  ExternalLink,
  ShieldCheck,
  Search,
  Bookmark,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  Building,
} from 'lucide-react';
import { OFFICIAL_RESOURCES, LEGAL_FAQS } from '../data/resourcesData';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useToast } from '../components/Toast';

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const { toggleBookmarkedResource, isResourceBookmarked } = useUserPreferences();
  const { showToast } = useToast();

  const categories = [
    'All',
    'Government Legal Portals',
    'Legal Aid',
    'Cybercrime Reporting',
    'Consumer Grievance',
    'Emergency Resources',
    'Legal Education',
    'Official Gazette',
  ];

  const filteredResources = OFFICIAL_RESOURCES.filter(res => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      res.title.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      res.url.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (idx: number) => {
    setExpandedFaqIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Verified Government Portals</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Official Government Resources & Legal Directory
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Direct verified links to authorized portals including India Code, NALSA legal aid, National Cyber Crime Portal, e-Daakhil, and e-Gazette.
        </p>
      </div>

      {/* 2. Filters & Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6F6954] dark:text-[#BDB59C] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search verified portals (e.g. 'India Code', 'NALSA', 'e-Gazette')..."
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

      {/* 3. Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map(resource => {
          const isSaved = isResourceBookmarked(resource.id);
          return (
            <div
              key={resource.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft hover:border-[#8A7545] dark:hover:border-[#C3B091] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] border border-[#E6DCC3] dark:border-[#4A4230]">
                    {resource.category}
                  </span>

                  <button
                    onClick={() => {
                      toggleBookmarkedResource(resource.id);
                      showToast(isSaved ? 'Removed bookmark' : 'Bookmarked resource');
                    }}
                    className="p-1.5 rounded-lg text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12]"
                    title="Bookmark resource"
                    aria-label="Bookmark resource"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isSaved ? 'fill-[#8A7545] text-[#8A7545] dark:fill-[#C3B091] dark:text-[#C3B091]' : ''
                      }`}
                    />
                  </button>
                </div>

                <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] mt-2.5">
                  {resource.title}
                </h3>
                <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1.5 leading-relaxed">
                  {resource.description}
                </p>

                <div className="mt-3 text-[11px] font-mono text-[#8A7545] dark:text-[#C3B091] truncate">
                  {resource.url}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 flex items-center justify-between text-xs">
                {resource.verified ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-amber-700 text-xs italic">
                    Placeholder URL (Pending verification)
                  </span>
                )}

                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Domain</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Frequently Asked Legal Questions (FAQ) Accordion */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091]" />
          <h2 className="text-xl font-bold text-[#3B3426] dark:text-[#F3EDDC]">
            Frequently Asked Questions (Citizen Law & Public Safety)
          </h2>
        </div>
        <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
          Key legal facts, statutory jurisdiction, and privacy assurances.
        </p>

        <div className="space-y-3 pt-2">
          {LEGAL_FAQS.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#3B3426] dark:text-[#F3EDDC]"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6F6954] flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#6F6954] dark:text-[#BDB59C] leading-relaxed border-t border-[#E6DCC3]/40 dark:border-[#4A4230]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
