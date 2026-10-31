import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  Search,
  Copy,
  Check,
  ShieldAlert,
  ExternalLink,
  MapPin,
  AlertTriangle,
  Info,
  Building2,
  HeartPulse,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { EMERGENCY_NUMBERS, EMERGENCY_PREPARATION_TIPS, INDIAN_STATES } from '../data/emergencyData';
import { useToast } from '../components/Toast';

export const EmergencyHelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('All India (National)');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { showToast } = useToast();

  const categories = [
    { id: 'all', label: 'All Helplines' },
    { id: 'national', label: 'National (112 & General)' },
    { id: 'police', label: 'Police (100)' },
    { id: 'medical', label: 'Medical (108/102)' },
    { id: 'cyber', label: 'Cyber Fraud (1930)' },
    { id: 'women', label: 'Women (181/1091)' },
    { id: 'child', label: 'Childline (1098)' },
    { id: 'fire', label: 'Fire & Rescue (101)' },
    { id: 'legal', label: 'Legal Aid (15100)' },
    { id: 'disaster', label: 'Disaster (1070)' },
  ];

  const handleCopyNumber = (number: string, id: string) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    showToast(`Copied ${number} to clipboard`, 'Ready to dial or paste');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredNumbers = useMemo(() => {
    return EMERGENCY_NUMBERS.filter(contact => {
      const matchesCategory =
        selectedCategory === 'all' || contact.category === selectedCategory;
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.number.includes(searchQuery) ||
        contact.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header & Emergency Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-[#B3261E] dark:text-red-300 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Offline Ready Emergency Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
              National Emergency Helplines
            </h1>
            <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
              Tap-to-call verified government hotlines. Cached automatically on this device so you can access all numbers even when offline.
            </p>
          </div>

          {/* State Jurisdiction Filter */}
          <div className="flex items-center gap-2 bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] rounded-xl px-3 py-1.5 text-xs">
            <MapPin className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              aria-label="Filter by Indian State"
              className="bg-transparent font-semibold text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none cursor-pointer"
            >
              {INDIAN_STATES.map(st => (
                <option key={st} value={st} className="dark:bg-[#2A251A]">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Non-Dispatch Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Important Notice:</strong> HelpLine is an educational information resource and does not dispatch emergency responders. To reach law enforcement, fire rescue, or medical assistance, dial <strong>112</strong> immediately.
          </div>
        </div>
      </div>

      {/* 2. Highlight: 112 Pan-India Unified Emergency Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
              Single Unified National Number
            </span>
            <div className="flex items-baseline gap-4 mt-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight">112</span>
              <span className="text-lg sm:text-xl font-bold opacity-90">
                ERSS (Emergency Response Support System)
              </span>
            </div>
            <p className="text-sm opacity-90 max-w-xl leading-relaxed pt-1">
              One single toll-free number connects you to Police, Fire, Ambulance, and Disaster assistance across India. Compatible with SIM-less phones and SOS panic buttons.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <a
              href="tel:112"
              className="px-6 py-4 rounded-2xl bg-white text-[#B3261E] font-black text-center text-base hover:bg-gray-100 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5 animate-pulse text-[#B3261E]" />
              <span>Call 112 Now</span>
            </a>

            <button
              onClick={() => handleCopyNumber('112', 'hero-112')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs text-center border border-white/30 transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedId === 'hero-112' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'hero-112' ? 'Copied 112' : 'Copy Number'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Nearby Facilities Map Search (No API key needed, opens Google Maps query) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nearby Police Stations */}
        <a
          href="https://www.google.com/maps/search/nearby+police+stations"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft hover:border-[#8A7545] dark:hover:border-[#C3B091] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC]">
                Find Nearby Police Stations
              </h3>
              <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
                Open live GPS location map in new tab
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] opacity-70 group-hover:opacity-100" />
        </a>

        {/* Nearby Hospitals & Emergency Wards */}
        <a
          href="https://www.google.com/maps/search/nearby+hospitals+emergency"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft hover:border-[#8A7545] dark:hover:border-[#C3B091] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC]">
                Find Nearby Hospitals & Trauma Centers
              </h3>
              <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
                Navigate to closest emergency medical care
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] opacity-70 group-hover:opacity-100" />
        </a>
      </section>

      {/* 4. Search and Category Filter Toolbar */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6F6954] dark:text-[#BDB59C] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search helpline name, number, or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
                  : 'bg-[#F6F1E4] dark:bg-[#2A251A] text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 5. Directory Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNumbers.map(contact => (
          <div
            key={contact.id}
            className={`p-5 rounded-2xl bg-white dark:bg-[#2A251A] border shadow-soft flex flex-col justify-between transition-all ${
              contact.number === '112'
                ? 'border-red-400 dark:border-red-800'
                : 'border-[#E6DCC3] dark:border-[#4A4230]'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] border border-[#E6DCC3] dark:border-[#4A4230]">
                    {contact.category}
                  </span>
                  <div className="text-2xl font-black text-[#8A7545] dark:text-[#C3B091] mt-2">
                    {contact.number}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyNumber(contact.number, contact.id)}
                  className="p-2 rounded-xl text-[#6F6954] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] transition-colors"
                  title="Copy telephone number"
                  aria-label={`Copy ${contact.number}`}
                >
                  {copiedId === contact.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC] mt-2">
                {contact.name}
              </h3>
              <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1 leading-relaxed">
                {contact.description}
              </p>

              <div className="mt-3 text-[11px] text-[#8A7545] dark:text-[#C3B091] font-medium">
                ⏱ {contact.timing}
              </div>

              {contact.stateAvailability && (
                <div className="mt-1 text-[10px] text-amber-700 dark:text-amber-400">
                  ℹ {contact.stateAvailability}. Verify availability in your state.
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 space-y-2">
              <a
                href={`tel:${contact.number}`}
                className="w-full py-2.5 px-3 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] dark:bg-[#C3B091] dark:hover:bg-[#D9CBA9] text-white dark:text-[#1E1A12] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {contact.number}</span>
              </a>

              {contact.officialPortal && (
                <a
                  href={contact.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded-xl bg-[#F6F1E4] hover:bg-[#E8DFC8] dark:bg-[#1E1A12] dark:hover:bg-[#352C18] text-[#6F6954] dark:text-[#BDB59C] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 6. Emergency Preparation Guidelines Accordion / Tips */}
      <section className="p-6 rounded-2xl bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091]" />
          <h2 className="text-lg font-bold text-[#3B3426] dark:text-[#F3EDDC]">
            How to Communicate During an Emergency Call
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EMERGENCY_PREPARATION_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs"
            >
              <div className="font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
                {idx + 1}. {tip.title}
              </div>
              <p className="text-[#6F6954] dark:text-[#BDB59C] leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
