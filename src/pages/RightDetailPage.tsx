import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Scale,
  ShieldCheck,
  Bookmark,
  Share2,
  Copy,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FileText,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { RIGHTS_DATA } from '../data/rightsData';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useToast } from '../components/Toast';

export const RightDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleSavedRight, isRightSaved } = useUserPreferences();
  const { showToast } = useToast();

  const right = RIGHTS_DATA.find(r => r.id === id);

  if (!right) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] space-y-4">
        <Scale className="w-12 h-12 text-[#6F6954] mx-auto opacity-50" />
        <h2 className="text-xl font-bold text-[#3B3426] dark:text-[#F3EDDC]">
          Legal Right Not Found
        </h2>
        <p className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
          The requested statute or right identifier does not exist in the catalog.
        </p>
        <Link
          to="/rights"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8A7545] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Rights Library</span>
        </Link>
      </div>
    );
  }

  const isSaved = isRightSaved(right.id);

  // Related rights objects
  const relatedRights = RIGHTS_DATA.filter(r => right.relatedIds.includes(r.id));

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${right.title}\n\nSummary:\n${right.summary}\n\nLegal Citation:\n${right.legalReference}\n\nOfficial Source:\n${right.officialSource}`
    );
    showToast('Copied full legal brief to clipboard', right.title);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: right.title, url });
    } else {
      navigator.clipboard.writeText(url);
      showToast('Page link copied to clipboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Previous View</span>
        </button>
      </div>

      {/* Main Detail Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#E6DCC3] dark:border-[#4A4230]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091] border border-[#E6DCC3] dark:border-[#4A4230]">
                {right.category}
              </span>
              {right.verified ? (
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Statutory Law</span>
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Verify before relying on this</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-3">
              {right.title}
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                toggleSavedRight(right.id);
                showToast(isSaved ? 'Removed from bookmarks' : 'Saved to bookmarks');
              }}
              className="p-2.5 rounded-xl border border-[#E6DCC3] dark:border-[#4A4230] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors"
              title="Bookmark"
              aria-label="Bookmark"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isSaved ? 'fill-[#8A7545] text-[#8A7545] dark:fill-[#C3B091] dark:text-[#C3B091]' : 'text-[#6F6954]'
                }`}
              />
            </button>
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl border border-[#E6DCC3] dark:border-[#4A4230] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors text-[#6F6954]"
              title="Copy"
              aria-label="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-[#E6DCC3] dark:border-[#4A4230] hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] transition-colors text-[#6F6954]"
              title="Share"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section 1: Plain Language Summary */}
        <div>
          <h2 className="text-xs font-extrabold text-[#8A7545] dark:text-[#C3B091] uppercase tracking-wider">
            1. Core Summary
          </h2>
          <p className="text-sm sm:text-base text-[#3B3426] dark:text-[#F3EDDC] mt-2 leading-relaxed font-medium">
            {right.summary}
          </p>
        </div>

        {/* Section 2: In-Depth Explanation */}
        <div>
          <h2 className="text-xs font-extrabold text-[#8A7545] dark:text-[#C3B091] uppercase tracking-wider">
            2. What This Means in Practice
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] mt-2 leading-relaxed">
            {right.whatItMeans}
          </p>
        </div>

        {/* Section 3: Real-World Scenario */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-[#352C18]/40 border border-amber-200/60 dark:border-[#4A4230]">
          <h2 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
            3. Real-World Practical Example
          </h2>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 mt-1.5 leading-relaxed">
            {right.example}
          </p>
        </div>

        {/* Section 4: What to do if Violated (Actionable Next Steps) */}
        <div>
          <h2 className="text-xs font-extrabold text-[#8A7545] dark:text-[#C3B091] uppercase tracking-wider">
            4. What To Do If Your Right Is Denied or Violated
          </h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12]/60 border border-[#E6DCC3] dark:border-[#4A4230] text-xs">
              <div className="font-bold text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
                <span>Document Evidence Immediately</span>
              </div>
              <p className="text-[#6F6954] dark:text-[#BDB59C]">
                Note down time, officer/merchant details, preserve invoices, photos, or witness contact numbers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12]/60 border border-[#E6DCC3] dark:border-[#4A4230] text-xs">
              <div className="font-bold text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-1.5 mb-1">
                <FileText className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
                <span>Submit Written Representation</span>
              </div>
              <p className="text-[#6F6954] dark:text-[#BDB59C]">
                Use our formal complaint drafting tool to generate a structured petition to the SHO, IC, or Consumer Forum.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Legal Citation and Verified Source */}
        <div className="pt-4 border-t border-[#E6DCC3] dark:border-[#4A4230] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-[#8A7545] dark:text-[#C3B091]">Statutory Authority: </span>
            <span className="text-[#3B3426] dark:text-[#F3EDDC] font-semibold">{right.legalReference}</span>
          </div>

          {right.sourceLink && (
            <a
              href={right.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline"
            >
              <span>View On {right.officialSource}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Related Rights Section */}
      {relatedRights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#3B3426] dark:text-[#F3EDDC]">
            Related Rights & Constitutional Provisions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {relatedRights.map(rel => (
              <Link
                key={rel.id}
                to={`/rights/${rel.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] hover:border-[#8A7545] dark:hover:border-[#C3B091] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#8A7545] dark:text-[#C3B091] uppercase">
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-xs text-[#3B3426] dark:text-[#F3EDDC] mt-1 group-hover:text-[#8A7545] dark:group-hover:text-[#C3B091] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] mt-1 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E6DCC3]/50 dark:border-[#4A4230]/50 flex items-center justify-between text-[11px] font-bold text-[#8A7545] dark:text-[#C3B091]">
                  <span>Explore</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
