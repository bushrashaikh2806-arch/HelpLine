import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  Calendar,
  ExternalLink,
  Filter,
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
  Rss,
  RefreshCw,
} from 'lucide-react';
import type { LegalUpdate } from '../types';
import { updatesService, CONFIGURED_FEEDS } from '../services/updatesService';
import { useToast } from '../components/Toast';

export const LegalUpdatesPage: React.FC = () => {
  const [updates, setUpdates] = useState<LegalUpdate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const { showToast } = useToast();

  const categories = [
    'All',
    'Traffic',
    'Cyber',
    'Citizen Rights',
    'Education',
    'Consumer',
    'Women\'s Safety',
  ];

  useEffect(() => {
    loadUpdates();
  }, [selectedCategory]);

  const loadUpdates = async () => {
    setIsLoading(true);
    try {
      const data = await updatesService.getUpdates(selectedCategory);
      setUpdates(data);
    } catch {
      showToast('Error loading legal updates', '', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncFeeds = async () => {
    setIsSyncing(true);
    const result = await updatesService.syncLiveFeeds();
    setIsSyncing(false);
    showToast('Feed Sync Checked', result.message, 'info');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Citizen Law & Public Safety Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
            Legal & Public Safety Updates
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
            Plain-language explanations of government advisories, rule revisions, and consumer guidelines. Clearly labeled demo content.
          </p>
        </div>

        {/* Sync Feed Button */}
        <button
          onClick={handleSyncFeeds}
          disabled={isSyncing}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#F6F1E4] dark:bg-[#2A251A] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230] text-xs font-bold text-[#8A7545] dark:text-[#C3B091] flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Check Live Feeds</span>
        </button>
      </div>

      {/* Demo Notice Strip */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>
          <strong>Notice:</strong> Items displayed below are verified educational demo mockups modeled after real official gazette patterns. They are not real-time breaking news.
        </span>
      </div>

      {/* Category Filter Pills */}
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

      {/* Updates List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] animate-pulse space-y-2"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>
        ) : updates.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230]">
            <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
              No legal updates found in the "{selectedCategory}" category.
            </p>
          </div>
        ) : (
          updates.map(item => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft hover:border-[#8A7545] dark:hover:border-[#C3B091] transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#8A7545] dark:text-[#C3B091] px-2.5 py-0.5 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230]">
                    {item.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                    Demo Content
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#6F6954] dark:text-[#BDB59C]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] leading-relaxed">
                {item.description}
              </p>

              {/* What this means for you section */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F0] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs">
                <span className="font-bold text-[#8A7545] dark:text-[#C3B091]">
                  💡 What this means for you:{' '}
                </span>
                <span className="text-[#3B3426] dark:text-[#F3EDDC] font-medium">
                  {item.whatThisMeans}
                </span>
              </div>

              {/* Source attribution */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                <div>
                  Source Authority:{' '}
                  <span className="font-semibold text-[#3B3426] dark:text-[#F3EDDC]">
                    {item.source}
                  </span>
                </div>

                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                  >
                    <span>View Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feed Architecture & Integration Blueprint */}
      <section className="p-5 rounded-2xl bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-3">
        <div className="flex items-center gap-2">
          <Rss className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
          <h2 className="font-bold text-xs text-[#3B3426] dark:text-[#F3EDDC]">
            Connected Architecture: Official Feed Endpoints (Ready for FastAPI Backend)
          </h2>
        </div>
        <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
          The HelpLine service layer (<code className="text-[11px] px-1 bg-white dark:bg-[#1E1A12] rounded">services/updatesService.ts</code>) is pre-configured with endpoints to ingest RSS and Gazette APIs once backend scrapers or API keys are provisioned.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {CONFIGURED_FEEDS.map((feed, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-[11px]"
            >
              <div className="font-bold text-[#3B3426] dark:text-[#F3EDDC] truncate">{feed.name}</div>
              <div className="text-[10px] text-[#8A7545] dark:text-[#C3B091] mt-0.5 capitalize">
                Format: {feed.feedType.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
