import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Bot,
  Search,
  PhoneCall,
  FileText,
  ShieldAlert,
  Lightbulb,
  Compass,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import { RIGHTS_DATA } from '../data/rightsData';
import { UPDATES_DATA } from '../data/updatesData';
import { SAFETY_TIPS } from '../data/safetyTipsData';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useToast } from '../components/Toast';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState('');
  const { toggleSavedRight, isRightSaved } = useUserPreferences();
  const { showToast } = useToast();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
    }
  };

  const featureCards = [
    {
      title: 'Know Your Rights',
      desc: 'Understand fundamental rights, consumer protections, and police interaction laws.',
      icon: BookOpen,
      to: '/rights',
      badge: '10 Categories',
    },
    {
      title: 'AI Legal Assistant',
      desc: 'Get instant educational explanations for complex legal and complaint questions.',
      icon: Bot,
      to: '/ai-assistant',
      badge: 'Interactive Demo',
    },
    {
      title: 'Smart Legal Search',
      desc: 'Instant keyword search across Indian legal statutes, FIR procedures, and rights.',
      icon: Search,
      to: '/search',
      badge: 'Instant Results',
    },
    {
      title: 'Emergency Help',
      desc: 'Offline-ready directory of verified national helplines: 112, 1930, 1098, 181.',
      icon: PhoneCall,
      to: '/emergency',
      badge: 'Works Offline',
      isEmergency: true,
    },
    {
      title: 'Complaint Guidance',
      desc: 'Step-by-step FIR and consumer filing checklists with formal draft complaint generator.',
      icon: FileText,
      to: '/complaint-guidance',
      badge: 'Draft Generator',
    },
    {
      title: 'Cybercrime Awareness',
      desc: 'Spot phishing, OTP scams, and learn immediate steps if targeted by cyber fraud.',
      icon: ShieldAlert,
      to: '/cybercrime',
      badge: 'Quiz & Simulator',
    },
    {
      title: 'Safety Tips',
      desc: 'Actionable personal, transit, and online safety checklists for daily life.',
      icon: Lightbulb,
      to: '/safety-tips',
      badge: 'Checklists',
    },
    {
      title: 'Resources',
      desc: 'Direct links to official portals: India Code, NALSA, e-Daakhil, and e-Gazette.',
      icon: Compass,
      to: '/resources',
      badge: 'Verified Portals',
    },
  ];

  const quickHelplines = [
    { number: '112', title: 'National Emergency', desc: 'Police • Fire • Medical (ERSS)', isSos: true },
    { number: '1930', title: 'Cyber Financial Fraud', desc: 'Freeze fraudulent UPI/Bank debits', isSos: false },
    { number: '1098', title: 'Childline Helpline', desc: 'Emergency assistance for minors', isSos: false },
    { number: '181', title: 'Women\'s Helpline', desc: 'Domestic distress & legal safety', isSos: false },
  ];

  const featuredRights = RIGHTS_DATA.slice(0, 3);
  const latestUpdates = UPDATES_DATA.slice(0, 3);
  const dailyTip = SAFETY_TIPS[0];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F6F1E4] via-white to-[#F6F1E4] dark:from-[#2A251A] dark:via-[#1E1A12] dark:to-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] p-6 sm:p-10 shadow-soft">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C3B091]/25 border border-[#C3B091]/50 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Know Your Rights. Stay Safe. Be Empowered.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] tracking-tight leading-tight">
              Welcome to <span className="text-[#8A7545] dark:text-[#C3B091]">HelpLine</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6F6954] dark:text-[#BDB59C] max-w-xl leading-relaxed">
              Your trusted platform for legal awareness, public safety, emergency guidance, and citizen rights. Designed for Indian citizens, students, women, and seniors.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <a
                href="#features-grid"
                className="px-5 py-3 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] dark:bg-[#C3B091] dark:hover:bg-[#D9CBA9] text-white dark:text-[#1E1A12] font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/emergency"
                className="px-5 py-3 rounded-xl bg-white dark:bg-[#2A251A] hover:bg-[#F6F1E4] dark:hover:bg-[#352C18] text-[#B3261E] dark:text-red-400 font-bold text-sm border border-[#E6DCC3] dark:border-[#4A4230] shadow-sm transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#B3261E] dark:text-red-400" />
                <span>Emergency Numbers (112)</span>
              </Link>
            </div>
          </div>

          {/* Right SVG Justice Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-[#2A251A]/70 backdrop-blur-md border border-[#E6DCC3] dark:border-[#4A4230] shadow-md flex flex-col items-center text-center">
              {/* Animated Scale of Justice SVG */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center text-[#8A7545] dark:text-[#C3B091]">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Central Pillar */}
                  <line x1="50" y1="15" x2="50" y2="85" />
                  <path d="M40 85H60" />
                  <path d="M45 15H55" />
                  {/* Top Beam */}
                  <line x1="20" y1="28" x2="80" y2="28" />
                  {/* Left Pan */}
                  <line x1="20" y1="28" x2="12" y2="52" />
                  <line x1="20" y1="28" x2="28" y2="52" />
                  <path d="M10 52C10 58 30 58 30 52H10Z" fill="currentColor" fillOpacity="0.15" />
                  {/* Right Pan */}
                  <line x1="80" y1="28" x2="72" y2="52" />
                  <line x1="80" y1="28" x2="88" y2="52" />
                  <path d="M70 52C70 58 90 58 90 52H70Z" fill="currentColor" fillOpacity="0.15" />
                  {/* Center Star */}
                  <polygon points="50,18 51.5,21.5 55,21.8 52.5,24 53.3,27.5 50,25.8 46.7,27.5 47.5,24 45,21.8 48.5,21.5" fill="#C3B091" />
                </svg>
              </div>

              <div className="mt-4">
                <div className="font-extrabold text-[#3B3426] dark:text-[#F3EDDC] text-base">
                  Citizen Legal Protection
                </div>
                <div className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1 max-w-xs">
                  Educating every citizen on procedural justice, personal safety, and constitutional safeguards.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Search Strip */}
      <section className="p-4 sm:p-5 rounded-2xl bg-[#F6F1E4] dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230]">
        <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091] absolute left-3.5 top-3" />
            <input
              type="text"
              value={quickQuery}
              onChange={e => setQuickQuery(e.target.value)}
              placeholder="Search legal queries (e.g. 'How to file FIR', 'Zero FIR', '1930 fraud', 'MRP')..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-sm text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] dark:bg-[#C3B091] dark:hover:bg-[#D9CBA9] text-white dark:text-[#1E1A12] font-bold text-sm transition-all"
          >
            Search
          </button>
        </form>
      </section>

      {/* 3. Emergency Numbers Quick Access Strip */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-[#B3261E] dark:text-red-300">
              <PhoneCall className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-[#3B3426] dark:text-[#F3EDDC]">
              National Emergency Hotlines
            </h2>
          </div>
          <Link
            to="/emergency"
            className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
          >
            <span>View All Numbers</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickHelplines.map(line => (
            <div
              key={line.number}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                line.isSos
                  ? 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/60'
                  : 'bg-white dark:bg-[#2A251A] border-[#E6DCC3] dark:border-[#4A4230]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black ${line.isSos ? 'text-[#B3261E] dark:text-red-400' : 'text-[#8A7545] dark:text-[#C3B091]'}`}>
                    {line.number}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E6DCC3]/50 dark:bg-[#4A4230]/50 text-[#6F6954] dark:text-[#BDB59C]">
                    Toll-Free
                  </span>
                </div>
                <h3 className="font-bold text-[#3B3426] dark:text-[#F3EDDC] text-sm mt-1">
                  {line.title}
                </h3>
                <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-0.5">
                  {line.desc}
                </p>
              </div>

              <a
                href={`tel:${line.number}`}
                className={`mt-4 w-full py-2 px-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all shadow-xs ${
                  line.isSos
                    ? 'bg-[#B3261E] hover:bg-[#951F18] text-white'
                    : 'bg-[#F6F1E4] hover:bg-[#E8DFC8] dark:bg-[#1E1A12] dark:hover:bg-[#352C18] text-[#8A7545] dark:text-[#C3B091] border border-[#E6DCC3] dark:border-[#4A4230]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {line.number}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Eight Core Feature Cards */}
      <section id="features-grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC]">
              Core Modules & Citizen Tools
            </h2>
            <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-0.5">
              Comprehensive guidance tailored for accessible citizen safety and legal awareness
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map(feature => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] border border-[#E6DCC3] dark:border-[#4A4230]">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] mt-4 group-hover:text-[#8A7545] dark:group-hover:text-[#C3B091] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1.5 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60">
                  <Link
                    to={feature.to}
                    className="w-full py-2 px-3 rounded-xl bg-[#F6F1E4] hover:bg-[#E8DFC8] dark:bg-[#1E1A12] dark:hover:bg-[#352C18] text-[#8A7545] dark:text-[#C3B091] font-bold text-xs flex items-center justify-between transition-colors"
                  >
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Spotlight: Featured Rights Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#C3B091]/30 text-[#8A7545] dark:text-[#C3B091]">
              <Scale className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-[#3B3426] dark:text-[#F3EDDC]">
              Featured Citizen Rights
            </h2>
          </div>
          <Link
            to="/rights"
            className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
          >
            <span>Explore All 10 Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredRights.map(right => (
            <div
              key={right.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#8A7545] dark:text-[#C3B091] px-2 py-0.5 rounded bg-[#F6F1E4] dark:bg-[#1E1A12]">
                    {right.category}
                  </span>
                  <button
                    onClick={() => {
                      toggleSavedRight(right.id);
                      showToast(isRightSaved(right.id) ? 'Removed from saved' : 'Saved to profile bookmarks');
                    }}
                    className="p-1 text-[#6F6954] hover:text-[#8A7545] dark:hover:text-[#C3B091]"
                    aria-label="Save right"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isRightSaved(right.id) ? 'fill-[#8A7545] text-[#8A7545] dark:fill-[#C3B091] dark:text-[#C3B091]' : ''}`}
                    />
                  </button>
                </div>

                <h3 className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC] mt-2.5">
                  {right.title}
                </h3>
                <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1.5 line-clamp-2">
                  {right.summary}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-[#F6F1E4]/70 dark:bg-[#1E1A12]/70 text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                  <span className="font-bold text-[#3B3426] dark:text-[#F3EDDC]">Statutory Ref: </span>
                  {right.legalReference}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 flex items-center justify-between">
                <Link
                  to={`/rights/${right.id}`}
                  className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
                >
                  <span>Detailed Explanation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  ✓ Verified Source
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Two-Column Grid: Safety Tip of the Day & Latest Legal Updates */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Safety Tip of the Day */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#FAF7F0] to-[#F6F1E4] dark:from-[#2A251A] dark:to-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8A7545]/15 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Safety Tip of the Day</span>
              </span>
              <span className="text-[10px] font-semibold text-[#6F6954] dark:text-[#BDB59C]">
                {dailyTip.category}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-3">
              {dailyTip.title}
            </h3>
            <p className="text-xs text-[#6F6954] dark:text-[#BDB59C] mt-1.5">
              {dailyTip.summary}
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-[#3B3426] dark:text-[#F3EDDC]">
              {dailyTip.actionPoints.slice(0, 2).map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A7545] dark:bg-[#C3B091] mt-1.5 flex-shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-[#E6DCC3] dark:border-[#4A4230] flex items-center justify-between">
            <Link
              to="/safety-tips"
              className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline flex items-center gap-1"
            >
              <span>More Daily Safety Tips</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Latest Legal Updates (Preview) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DCC3] dark:border-[#4A4230]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#C3B091]/30 text-[#8A7545] dark:text-[#C3B091]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC]">
                  Recent Legal & Safety Updates (Demo Feed)
                </h3>
              </div>
              <Link
                to="/updates"
                className="text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {latestUpdates.map(u => (
                <div
                  key={u.id}
                  className="p-3 rounded-xl bg-[#F6F1E4]/50 dark:bg-[#1E1A12]/50 border border-[#E6DCC3]/50 dark:border-[#4A4230]/50"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#8A7545] dark:text-[#C3B091] px-2 py-0.5 rounded bg-white dark:bg-[#2A251A]">
                      {u.category}
                    </span>
                    <span className="text-[#6F6954] dark:text-[#BDB59C] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {u.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#3B3426] dark:text-[#F3EDDC] mt-1.5">
                    {u.title}
                  </h4>
                  <p className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] mt-0.5 line-clamp-1">
                    {u.whatThisMeans}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E6DCC3] dark:border-[#4A4230] text-[11px] text-[#6F6954] dark:text-[#BDB59C] flex items-center justify-between">
            <span>Sources: Press Information Bureau, e-Gazette, India Code</span>
            <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">Demo Content</span>
          </div>
        </div>
      </section>

      {/* 7. Statutory & Emergency Disclaimer Strip */}
      <section className="p-4 rounded-xl bg-[#FAF7F0] dark:bg-[#231E15] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#6F6954] dark:text-[#BDB59C] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] flex-shrink-0" />
          <span>
            <strong>Disclaimer:</strong> HelpLine provides general educational information and is not a substitute for professional legal advice or emergency dispatch.
          </span>
        </div>
        <div className="text-[11px] font-semibold text-[#8A7545] dark:text-[#C3B091] flex items-center gap-2 flex-shrink-0">
          <span>Trusted Citations: India Code • e-Gazette • PIB</span>
        </div>
      </section>
    </div>
  );
};
