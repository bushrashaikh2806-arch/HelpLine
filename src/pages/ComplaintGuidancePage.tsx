import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  Copy,
  Printer,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Send,
  Edit3,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { COMPLAINT_TYPES } from '../data/complaintsData';
import type { ComplaintTypeInfo } from '../data/complaintsData';
import { useToast } from '../components/Toast';

export const ComplaintGuidancePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('comp-police');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Draft Complaint Generator states (NEVER saved to localStorage as mandated)
  const [incidentText, setIncidentText] = useState('');
  const [draftCategory, setDraftCategory] = useState('Police FIR');
  const [policeStationName, setPoliceStationName] = useState('Local City / Precinct');
  const [complainantName, setComplainantName] = useState('Complainant Name');
  const [contactNumber, setContactNumber] = useState('98765XXXXX');
  const [incidentDate, setIncidentDate] = useState('DD/MM/YYYY');
  const [incidentLocation, setIncidentLocation] = useState('City, State');
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [isEditingDraft, setIsEditingDraft] = useState(false);

  const { showToast } = useToast();

  const currentType = COMPLAINT_TYPES.find(c => c.id === selectedCategory) || COMPLAINT_TYPES[0];

  const toggleDocCheck = (doc: string) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  const copyDocumentChecklist = () => {
    const list = currentType.requiredDocuments.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n');
    navigator.clipboard.writeText(`Required Documents Checklist for ${currentType.title}:\n\n${list}`);
    showToast('Checklist copied to clipboard');
  };

  const handlePrint = () => {
    window.print();
  };

  // Draft Complaint Generation Function
  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentText.trim()) {
      showToast('Please describe what happened', '', 'error');
      return;
    }

    const todayDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const letter = `To,
The Station House Officer (SHO),
Police Station: ${policeStationName || '[Name of Police Station]'},
District / City: ${incidentLocation || '[City, State]'}

Date: ${todayDate}

Subject: Formal Written Complaint / Request to Register FIR regarding ${draftCategory.toUpperCase()}

Respected Sir / Madam,

I, ${complainantName || '[Your Full Name]'}, residing at [Your Residential Address], holding Mobile Number ${contactNumber || '[Your Mobile Phone]'}, wish to bring the following matter to your urgent attention:

1. PARTICULARS OF INCIDENT:
- Date & Time of Occurrence: ${incidentDate || '[Date and Approximate Time]'}
- Exact Location / Platform: ${incidentLocation || '[Exact Physical Address or Digital Platform]'}

2. DETAILED DESCRIPTION OF THE EVENT:
${incidentText.trim()}

3. EVIDENCE & WITNESS DETAILS:
- Available supporting documents (receipts, transaction screenshots, medical memos, or witness accounts) are enclosed herewith.

4. PRAYER / RELIEF SOUGHT:
In light of the facts stated above, I respectfully request you to record this complaint, register a formal First Information Report (FIR) under the appropriate sections of law (or a Zero FIR if applicable), initiate an immediate investigation, and provide me with a certified copy of the registered report free of cost as mandated under Section 154(2) of the Code of Criminal Procedure.

Yours faithfully,

(Signature)
_______________________
Name: ${complainantName || '[Your Full Name]'}
Contact: ${contactNumber || '[Your Phone Number]'}
Enclosures: As mentioned above.`;

    setGeneratedDraft(letter);
    setIsEditingDraft(false);
    showToast('Formal draft letter generated successfully');
  };

  const copyGeneratedDraft = () => {
    if (generatedDraft) {
      navigator.clipboard.writeText(generatedDraft);
      showToast('Formal letter template copied to clipboard');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Filing Procedures & Complaint Tool</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Citizen Complaint Guidance & Draft Generator
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Structured step-by-step instructions for police FIRs, consumer forums, workplace harassment (POSH), and public grievance submissions.
        </p>
      </div>

      {/* Non-submission disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Frontend Template Only:</strong> HelpLine does not submit complaints to police or government authorities on your behalf, nor does it store your complaint text on any server or in localStorage. You must copy/print the generated draft and submit it physically or via the official government portal.
        </div>
      </div>

      {/* 2. Category Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {COMPLAINT_TYPES.map(comp => (
          <button
            key={comp.id}
            onClick={() => {
              setSelectedCategory(comp.id);
              setActiveStep(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === comp.id
                ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-sm'
                : 'bg-white dark:bg-[#2A251A] text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#352C18] border border-[#E6DCC3] dark:border-[#4A4230]'
            }`}
          >
            {comp.category}
          </button>
        ))}
      </div>

      {/* 3. Interactive Stepper with Progress */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#8A7545] dark:text-[#C3B091]">
              Category: {currentType.category}
            </span>
            <div className="text-xs text-[#6F6954] dark:text-[#BDB59C]">
              Addressed To: <span className="font-bold text-[#3B3426] dark:text-[#F3EDDC]">{currentType.authorityToAddress}</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
            {currentType.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] mt-1">
            {currentType.overview}
          </p>
        </div>

        {/* Stepper Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentType.steps.map((st, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`p-3 rounded-xl text-left border transition-all text-xs ${
                activeStep === i
                  ? 'bg-[#FAF7F0] dark:bg-[#352C18] border-[#8A7545] dark:border-[#C3B091] font-bold text-[#3B3426] dark:text-[#F3EDDC]'
                  : 'bg-white dark:bg-[#2A251A] border-[#E6DCC3] dark:border-[#4A4230] text-[#6F6954] dark:text-[#BDB59C]'
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-[#8A7545] dark:text-[#C3B091]">
                Step {st.stepNumber}
              </div>
              <div className="truncate mt-0.5">{st.title}</div>
            </button>
          ))}
        </div>

        {/* Active Step Content Card */}
        <div className="p-5 rounded-2xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12]/60 border border-[#E6DCC3] dark:border-[#4A4230] space-y-2">
          <div className="text-sm font-bold text-[#8A7545] dark:text-[#C3B091]">
            Step {currentType.steps[activeStep].stepNumber}: {currentType.steps[activeStep].title}
          </div>
          <p className="text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] leading-relaxed">
            {currentType.steps[activeStep].instruction}
          </p>
        </div>

        {/* Stepper Navigation buttons */}
        <div className="flex items-center justify-between text-xs pt-2">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-xl border border-[#E6DCC3] dark:border-[#4A4230] text-[#6F6954] disabled:opacity-40"
          >
            Previous Step
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(currentType.steps.length - 1, prev + 1))}
            disabled={activeStep === currentType.steps.length - 1}
            className="px-4 py-2 rounded-xl bg-[#8A7545] text-white font-bold disabled:opacity-40"
          >
            Next Step
          </button>
        </div>

        {/* Two Columns: Required Documents Checklist & What to do After Submission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E6DCC3] dark:border-[#4A4230]">
          {/* Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091]" />
                <span>Required Documents Checklist</span>
              </h3>
              <button
                onClick={copyDocumentChecklist}
                className="text-[11px] text-[#8A7545] dark:text-[#C3B091] font-bold hover:underline flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Checklist</span>
              </button>
            </div>

            <div className="space-y-2">
              {currentType.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checkedDocs[doc];
                return (
                  <label
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] cursor-pointer hover:bg-[#F6F1E4] dark:hover:bg-[#352C18] text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDocCheck(doc)}
                      className="mt-0.5 rounded text-[#8A7545] focus:ring-[#8A7545]"
                    />
                    <span className={isChecked ? 'line-through text-[#6F6954] dark:text-[#BDB59C]' : 'text-[#3B3426] dark:text-[#F3EDDC]'}>
                      {doc}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* After Submission & Precautions */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC] mb-2">
                What To Do After Submission
              </h3>
              <ul className="space-y-1.5 text-xs text-[#6F6954] dark:text-[#BDB59C]">
                {currentType.afterSubmissionGuide.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A7545] dark:bg-[#C3B091] mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentType.officialPortalUrl && (
              <div className="p-3 rounded-xl bg-[#FAF7F0] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                    {currentType.officialPortalName}
                  </div>
                  <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
                    Submit officially online without physical travel
                  </div>
                </div>
                <a
                  href={currentType.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#8A7545] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#6C5B34]"
                >
                  <span>Open Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. "Draft Complaint" Interactive Letter Generator Tool */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAF7F0] via-white to-[#F6F1E4] dark:from-[#2A251A] dark:via-[#1E1A12] dark:to-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A7545]/15 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Interactive Complaint Letter Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
            Draft Your Formal Written Police Complaint
          </h2>
          <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] mt-1">
            Fill in the particulars below to generate a formally formatted legal complaint letter following Indian police and statutory conventions.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerateDraft} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
                Category
              </label>
              <select
                value={draftCategory}
                onChange={e => setDraftCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
              >
                <option value="Police FIR">Police Complaint (FIR)</option>
                <option value="Online Cyber Financial Fraud">Cyber Financial Fraud</option>
                <option value="Consumer Defect & Refund">Consumer Defect Grievance</option>
                <option value="Harassment at Workplace">Workplace Harassment</option>
                <option value="Street Harassment & Stalking">Women's Safety & Stalking</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
                Police Station / Jurisdiction
              </label>
              <input
                type="text"
                value={policeStationName}
                onChange={e => setPoliceStationName(e.target.value)}
                placeholder="e.g. Connaught Place / Indiranagar"
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
                Incident Date & Time
              </label>
              <input
                type="text"
                value={incidentDate}
                onChange={e => setIncidentDate(e.target.value)}
                placeholder="e.g. 14 Jan 2025 around 6:30 PM"
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
                Your Full Name (Complainant)
              </label>
              <input
                type="text"
                value={complainantName}
                onChange={e => setComplainantName(e.target.value)}
                placeholder="Your full legal name"
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
                Your Contact Number
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
              />
            </div>
          </div>

          {/* Incident Description Textarea */}
          <div>
            <label className="block text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] mb-1">
              Describe what happened (in chronological order) *
            </label>
            <textarea
              rows={4}
              value={incidentText}
              onChange={e => setIncidentText(e.target.value)}
              placeholder="State exactly what occurred: who was involved, any suspect names or vehicle numbers, bank transaction reference numbers, and what loss was sustained..."
              className="w-full p-3 rounded-2xl bg-white dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#6F6954] dark:text-[#BDB59C]">
              Note: Review and edit before submitting to authorities.
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <span>Generate Draft Letter</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Generated Formal Letter Card */}
        {generatedDraft && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white dark:bg-[#1E1A12] border-2 border-[#8A7545] dark:border-[#C3B091] shadow-lg space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E6DCC3] dark:border-[#4A4230]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8A7545] dark:text-[#C3B091]" />
                <h3 className="font-extrabold text-sm text-[#3B3426] dark:text-[#F3EDDC]">
                  Your Generated Formal Complaint Letter
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingDraft(!isEditingDraft)}
                  className="px-3 py-1.5 rounded-xl border border-[#E6DCC3] dark:border-[#4A4230] text-xs font-semibold text-[#8A7545] dark:text-[#C3B091] flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingDraft ? 'Finish Editing' : 'Edit Draft'}</span>
                </button>
                <button
                  onClick={copyGeneratedDraft}
                  className="px-3 py-1.5 rounded-xl bg-[#8A7545] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#6C5B34]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Letter</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl border border-[#E6DCC3] dark:border-[#4A4230] text-xs font-semibold text-[#6F6954] dark:text-[#BDB59C] flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Letter View / Textarea editor */}
            {isEditingDraft ? (
              <textarea
                rows={12}
                value={generatedDraft}
                onChange={e => setGeneratedDraft(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#F6F1E4]/50 dark:bg-[#2A251A] font-mono text-xs text-[#3B3426] dark:text-[#F3EDDC] border border-[#E6DCC3] dark:border-[#4A4230] focus:outline-none focus:ring-2 focus:ring-[#8A7545]"
              />
            ) : (
              <div className="p-5 rounded-xl bg-[#FAF7F0] dark:bg-[#2A251A] font-serif text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] leading-relaxed whitespace-pre-line border border-[#E6DCC3] dark:border-[#4A4230]">
                {generatedDraft}
              </div>
            )}

            <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] flex items-center justify-between">
              <span>Next step: Print 2 copies, sign, submit at station, and get 2nd copy stamped with Daily Diary (DD) number.</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Ready to print/copy</span>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};
