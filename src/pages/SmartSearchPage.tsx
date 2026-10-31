import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Clock,
  Trash2,
  Filter,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles,
  Info,
  Scale,
} from 'lucide-react';
import { RIGHTS_DATA } from '../data/rightsData';
import { EMERGENCY_NUMBERS } from '../data/emergencyData';
import { CYBERCRIME_TOPICS } from '../data/cybercrimeData';
import { COMPLAINT_TYPES } from '../data/complaintsData';
import { OFFICIAL_RESOURCES } from '../data/resourcesData';
import { useToast } from '../components/Toast';

interface UnifiedSearchResult {
  id: string;
  type: 'Constitutional Rights' | 'Indian Laws' | 'Consumer Protection' | 'Cybercrime' | 'Women\'s Safety' | 'Complaint Procedures' | 'Government Resources';
  title: string;
  description: string;
  citationOrPortal: string;
  sourceLabel: string;
  url: string;
}

export const SmartSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'title'>('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('helpline_search_history');
      return saved ? JSON.parse(saved) : ['Zero FIR', '1930 Cyber Fraud', 'Article 21', 'MRP Refund'];
    } catch {
      return ['Zero FIR', '1930 Cyber Fraud', 'Article 21'];
    }
  });

  const popularSearches = [
    'Zero FIR',
    'Arrest of Women',
    '1930 Cyber Fraud',
    'Article 21 Liberty',
    'Consumer MRP Overcharging',
    'POSH Workplace Harassment',
    'Free Legal Aid NALSA',
    'Phishing & OTP Scam',
  ];

  const categoryFilters = [
    'All',
    'Constitutional Rights',
    'Indian Laws',
    'Consumer Protection',
    'Cybercrime',
    'Women\'s Safety',
    'Complaint Procedures',
    'Government Resources',
  ];

  // Build unified search pool from our comprehensive local datasets
  const allSearchItems = useMemo<UnifiedSearchResult[]>(() => {
    const results: UnifiedSearchResult[] = [];

    // From Rights
    RIGHTS_DATA.forEach(r => {
      let type: UnifiedSearchResult['type'] = 'Indian Laws';
      if (r.category === 'Fundamental Rights') type = 'Constitutional Rights';
      else if (r.category === 'Women\'s Rights') type = 'Women\'s Safety';
      else if (r.category === 'Consumer Rights') type = 'Consumer Protection';
      else if (r.category === 'Cybersecurity & Online Rights') type = 'Cybercrime';

      results.push({
        id: `right-${r.id}`,
        type,
        title: r.title,
        description: `${r.summary} ${r.whatItMeans}`,
        citationOrPortal: r.legalReference,
        sourceLabel: r.officialSource,
        url: `/rights/${r.id}`,
      });
    });

    // From Cybercrime
    CYBERCRIME_TOPICS.forEach(c => {
      results.push({
        id: `cyber-${c.id}`,
        type: 'Cybercrime',
        title: c.title,
        description: `${c.shortDesc} Warning signs: ${c.warningSigns.join(', ')}`,
        citationOrPortal: `Helpline ${c.reportingHelpline} | cybercrime.gov.in`,
        sourceLabel: 'I4C / Ministry of Home Affairs',
        url: '/cybercrime',
      });
    });

    // From Complaint Guides
    COMPLAINT_TYPES.forEach(comp => {
      let type: UnifiedSearchResult['type'] = 'Complaint Procedures';
      if (comp.category === 'Women\'s Safety' || comp.category === 'Workplace Harassment') {
        type = 'Women\'s Safety';
      }
      results.push({
        id: `comp-${comp.id}`,
        type,
        title: comp.title,
        description: comp.overview,
        citationOrPortal: comp.authorityToAddress,
        sourceLabel: comp.officialPortalName || 'Procedural Guide',
        url: '/complaint-guidance',
      });
    });

    // From Official Resources
    OFFICIAL_RESOURCES.forEach(res => {
      results.push({
        id: `res-${res.id}`,
        type: 'Government Resources',
        title: res.title,
        description: res.description,
        citationOrPortal: res.url,
        sourceLabel: res.category,
        url: res.url,
      });
    });

    return results;
  }, []);

  // Filter & Search logic
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    let items = allSearchItems.filter(item => {
      const matchesFilter = selectedFilter === 'All' || item.type === selectedFilter;
      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.citationOrPortal.toLowerCase().includes(q);
      return matchesFilter && matchesText;
    });

    if (sortBy === 'title') {
      items = [...items].sort((a, b) => a.title.localeCompare(b.title));
    }

    return items;
  }, [allSearchItems, query, selectedFilter, sortBy]);

  const executeSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setSearchParams({ q: searchTerm });

    // Simulate quick indexing skeleton
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 250);

    // Save to history
    if (searchTerm.trim() && !searchHistory.includes(searchTerm.trim())) {
      const updated = [searchTerm.trim(), ...searchHistory.slice(0, 7)];
      setSearchHistory(updated);
      localStorage.setItem('helpline_search_history', JSON.stringify(updated));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('helpline_search_history');
    showToast('Search history cleared');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <Search className="w-3.5 h-3.5" />
          <span>Local Legal Search Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Smart Legal Search
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Query statutory laws, constitutional sections, consumer remedies, and cybercrime protocols from our verified offline dataset.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-4">
        <form onSubmit={handleFormSubmit} className="relative">
          <Search className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091] absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type legal question, keywords or acts (e.g. 'police arrest', '1930', 'equal pay')..."
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-sm sm:text-base text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545] transition-all"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-2 px-5 py-2 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] dark:bg-[#C3B091] dark:hover:bg-[#D9CBA9] text-white dark:text-[#1E1A12] font-bold text-xs shadow-xs transition-colors"
          >
            Search
          </button>
        </form>

        {/* Popular Search Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#6F6954] dark:text-[#BDB59C] font-semibold text-[11px] mr-1">
            Popular:
          </span>
          {popularSearches.map(pop => (
            <button
              key={pop}
              onClick={() => executeSearch(pop)}
              className="px-2.5 py-1 rounded-lg bg-[#F6F1E4] dark:bg-[#1E1A12] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] text-[#3B3426] dark:text-[#F3EDDC] text-[11px] font-medium border border-[#E6DCC3] dark:border-[#4A4230] transition-colors"
            >
              {pop}
            </button>
          ))}
        </div>

        {/* Search History Chips */}
        {searchHistory.length > 0 && (
          <div className="pt-2 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#6F6954] dark:text-[#BDB59C] font-medium text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" /> Recent:
              </span>
              {searchHistory.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => executeSearch(item)}
                  className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-[#C3B091]/20 text-[#6F6954] dark:text-[#BDB59C] text-[11px] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={clearHistory}
              className="text-[11px] text-[#6F6954] hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categoryFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
                  : 'bg-[#F6F1E4] dark:bg-[#2A251A] text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6F6954] dark:text-[#BDB59C]">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            aria-label="Sort search results"
            className="p-1.5 rounded-xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] text-[#3B3426] dark:text-[#F3EDDC] font-semibold text-xs cursor-pointer focus:outline-none"
          >
            <option value="relevance">Relevance</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-4">
        {isLoading ? (
          /* Loading Skeletons */
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] animate-pulse space-y-2"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : !query.trim() ? (
          /* Initial Empty Prompt State */
          <div className="p-10 text-center rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-3">
            <Scale className="w-10 h-10 text-[#8A7545] dark:text-[#C3B091] mx-auto opacity-70" />
            <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC]">
              Ready to Search Indian Legal Provisions
            </h3>
            <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] max-w-md mx-auto leading-relaxed">
              Enter any query or click on a popular topic above to search through fundamental rights, consumer acts, cybercrime hotlines, and complaint workflows.
            </p>
          </div>
        ) : searchResults.length === 0 ? (
          /* No Results Found State */
          <div className="p-10 text-center rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-3">
            <Info className="w-10 h-10 text-amber-600 mx-auto opacity-80" />
            <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC]">
              No local results found for "{query}"
            </h3>
            <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] max-w-md mx-auto">
              Please check your spelling, try broader keywords, or select "All" categories.
            </p>
          </div>
        ) : (
          /* Results Cards */
          searchResults.map(item => {
            const isInternal = item.url.startsWith('/');
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft hover:border-[#8A7545] dark:hover:border-[#C3B091] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#8A7545] dark:text-[#C3B091] px-2.5 py-0.5 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230]">
                      {item.type}
                    </span>
                    <span className="text-[#6F6954] dark:text-[#BDB59C] font-medium">
                      Source: {item.sourceLabel}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1.5 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="mt-3 p-2 rounded-xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12]/60 text-xs text-[#3B3426] dark:text-[#F3EDDC]">
                    <span className="font-bold text-[#8A7545] dark:text-[#C3B091]">Reference: </span>
                    {item.citationOrPortal}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 flex items-center justify-between text-xs">
                  {isInternal ? (
                    <Link
                      to={item.url}
                      className="font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                    >
                      <span>Open Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                    >
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Local Verified Record</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Honest Local Search Notice & Placeholder for Future Web Search */}
      <div className="p-5 rounded-2xl bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
          <h3 className="font-bold text-xs text-[#3B3426] dark:text-[#F3EDDC]">
            Dataset Scope & Future Verified Web Search (Placeholder)
          </h3>
        </div>
        <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] leading-relaxed">
          This search interface currently indexes curated local statutory datasets to ensure zero hallucination and 100% offline accessibility.
          A future integration layer is designed to query verified live government repositories (e-Gazette, India Code API, Supreme Court judgment portals) via a secure backend proxy. HelpLine does not claim to index the entire live web.
        </p>
      </div>
    </div>
  );
};
