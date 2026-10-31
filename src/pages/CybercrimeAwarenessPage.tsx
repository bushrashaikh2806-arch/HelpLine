import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  PhoneCall,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  Award,
  RefreshCw,
  Lock,
} from 'lucide-react';
import {
  CYBERCRIME_TOPICS,
  CYBER_QUIZ_QUESTIONS,
  SCENARIO_SIMULATIONS,
} from '../data/cybercrimeData';
import type { CybercrimeTopic } from '../data/cybercrimeData';
import { useToast } from '../components/Toast';

export const CybercrimeAwarenessPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<CybercrimeTopic>(CYBERCRIME_TOPICS[0]);
  const [activeTab, setActiveTab] = useState<'topics' | 'simulator' | 'quiz'>('topics');

  // Quiz States
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Simulator State
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIO_SIMULATIONS[0].id);
  const [simFeedback, setSimFeedback] = useState<{ isSafe: boolean; message: string } | null>(null);

  const { showToast } = useToast();

  const handleSelectQuizOption = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswerIndex(optionIndex);
    setShowExplanation(true);

    const question = CYBER_QUIZ_QUESTIONS[currentQuizIndex];
    if (question.options[optionIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < CYBER_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      showToast('Cyber Quiz Completed!', `Your Score: ${score + (selectedAnswerIndex !== null && CYBER_QUIZ_QUESTIONS[currentQuizIndex].options[selectedAnswerIndex].isCorrect ? 1 : 0)} / ${CYBER_QUIZ_QUESTIONS.length}`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswerIndex(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  const activeScenario = SCENARIO_SIMULATIONS.find(s => s.id === activeScenarioId) || SCENARIO_SIMULATIONS[0];

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-[#B3261E] dark:text-red-300 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Cyber Safety & Fraud Prevention</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          Cybercrime Awareness & Citizen Defense
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Learn how to recognize online financial scams, report to helpline 1930 within the golden hour, and test your readiness with our interactive scam simulator.
        </p>
      </div>

      {/* 2. Emergency 1930 Reminder Banner */}
      <section className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
            Golden Hour Alert
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            Defrauded Online? Report Cyber Financial Fraud to 1930 Immediately
          </h2>
          <p className="text-xs text-red-100 max-w-xl">
            Calling 1930 within 2 hours enables banking nodal teams to place a debit freeze on the beneficiary account before funds are cashed out.
          </p>
        </div>

        <a
          href="tel:1930"
          className="px-6 py-3 rounded-xl bg-white text-[#B3261E] font-black text-sm flex items-center gap-2 hover:bg-gray-100 shadow-md transition-transform active:scale-95 flex-shrink-0"
        >
          <PhoneCall className="w-4 h-4 text-[#B3261E]" />
          <span>Call 1930 Now</span>
        </a>
      </section>

      {/* 3. Navigation Tabs: Topics Library, Scam Simulator, Cyber Quiz */}
      <div className="flex items-center gap-2 border-b border-[#E6DCC3] dark:border-[#4A4230] pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'topics'
              ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
              : 'text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A]'
          }`}
        >
          10 Cyber Threat Topics
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'simulator'
              ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
              : 'text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A]'
          }`}
        >
          Fictional Scam Simulator
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quiz'
              ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
              : 'text-[#6F6954] dark:text-[#BDB59C] hover:bg-[#F6F1E4] dark:hover:bg-[#2A251A]'
          }`}
        >
          Cyber Safety Score Quiz
        </button>
      </div>

      {/* TAB 1: 10 CYBERCRIME TOPICS */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Topics List Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {CYBERCRIME_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                  selectedTopic.id === topic.id
                    ? 'bg-[#F6F1E4] dark:bg-[#352C18] border-[#8A7545] dark:border-[#C3B091] shadow-xs'
                    : 'bg-white dark:bg-[#2A251A] border-[#E6DCC3] dark:border-[#4A4230] text-[#3B3426] dark:text-[#F3EDDC] hover:bg-[#F6F1E4]/50'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-[#3B3426] dark:text-[#F3EDDC]">
                    {topic.title}
                  </div>
                  <div className="text-[11px] text-[#6F6954] dark:text-[#BDB59C] mt-0.5 line-clamp-1">
                    {topic.shortDesc}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8A7545] dark:text-[#C3B091] flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>

          {/* Active Topic Details Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E6DCC3] dark:border-[#4A4230]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                  Threat Level: {selectedTopic.severity.toUpperCase()}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
                  {selectedTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] mt-1">
                  {selectedTopic.shortDesc}
                </p>
              </div>

              <a
                href={selectedTopic.reportingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#8A7545] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#6C5B34]"
              >
                <span>Report on Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Warning Signs */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Warning Signs (Red Flags)</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#3B3426] dark:text-[#F3EDDC]">
                {selectedTopic.warningSigns.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-50/60 dark:bg-[#352C18]/30 border border-amber-200/50 dark:border-[#4A4230]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Prevention Checklist</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#3B3426] dark:text-[#F3EDDC]">
                {selectedTopic.preventionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-[#F6F1E4]/50 dark:bg-[#1E1A12]/50 border border-[#E6DCC3]/60 dark:border-[#4A4230]/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to do if victimized */}
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-red-800 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Immediate Steps If Victimized</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#3B3426] dark:text-[#F3EDDC]">
                {selectedTopic.immediateStepsIfVictim.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer helpline */}
            <div className="pt-3 border-t border-[#E6DCC3] dark:border-[#4A4230] flex items-center justify-between text-xs">
              <span className="text-[#6F6954] dark:text-[#BDB59C]">
                Official Reporting Helpline: <strong className="text-[#3B3426] dark:text-[#F3EDDC]">{selectedTopic.reportingHelpline}</strong>
              </span>
              <a
                href={`tel:${selectedTopic.reportingHelpline.replace(/[^0-9]/g, '')}`}
                className="font-bold text-[#8A7545] dark:text-[#C3B091] hover:underline"
              >
                Dial {selectedTopic.reportingHelpline}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FICTIONAL SCAM SCENARIO SIMULATOR */}
      {activeTab === 'simulator' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A7545]/15 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interactive Scam Simulator (Fictional Training)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
              Can You Spot The Scam?
            </h2>
            <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] mt-1">
              Analyze realistic simulated phishing texts. <em>Notice: HelpLine never collects passwords, OTPs, or real financial data.</em>
            </p>
          </div>

          {/* Scenario Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SCENARIO_SIMULATIONS.map(sc => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  setSimFeedback(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeScenario.id === sc.id
                    ? 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] shadow-xs'
                    : 'bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#6F6954] dark:text-[#BDB59C] border border-[#E6DCC3] dark:border-[#4A4230]'
                }`}
              >
                {sc.channel}: {sc.id.replace('sim-', '').toUpperCase()} Scam
              </button>
            ))}
          </div>

          {/* Simulated Mobile Device Message Box */}
          <div className="max-w-xl mx-auto rounded-3xl bg-[#F6F1E4] dark:bg-[#1E1A12] border-2 border-[#E6DCC3] dark:border-[#4A4230] p-5 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#6F6954] dark:text-[#BDB59C]">
              <span className="font-bold text-[#3B3426] dark:text-[#F3EDDC]">
                {activeScenario.channel} Message from: {activeScenario.sender}
              </span>
              <span>{activeScenario.time}</span>
            </div>

            {/* Bubble */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] text-xs sm:text-sm font-mono text-[#3B3426] dark:text-[#F3EDDC] leading-relaxed shadow-xs">
              {activeScenario.content}
            </div>

            {/* Interactive Decision Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setSimFeedback({
                    isSafe: false,
                    message: `Danger! ${activeScenario.dangerAction}`,
                  });
                }}
                className="py-2.5 px-3 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-800 dark:text-red-200 text-xs font-bold transition-colors"
              >
                Follow Link / Call Number
              </button>

              <button
                onClick={() => {
                  setSimFeedback({
                    isSafe: true,
                    message: `Correct! ${activeScenario.safeAction}`,
                  });
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition-colors"
              >
                Verify Via Official Portal / Block
              </button>
            </div>
          </div>

          {/* Simulator Feedback */}
          {simFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs sm:text-sm max-w-xl mx-auto flex items-start gap-3 ${
                simFeedback.isSafe
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
              }`}
            >
              {simFeedback.isSafe ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">{simFeedback.message}</div>
            </motion.div>
          )}

          {/* Red flags analysis breakdown */}
          <div className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] max-w-xl mx-auto space-y-2 text-xs">
            <div className="font-bold text-[#8A7545] dark:text-[#C3B091] uppercase tracking-wider text-[11px]">
              Why this message is fraudulent (Red Flags):
            </div>
            <ul className="space-y-1 text-[#6F6954] dark:text-[#BDB59C]">
              {activeScenario.redFlags.map((rf, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* TAB 3: CYBER SAFETY SCORE QUIZ */}
      {activeTab === 'quiz' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-6 max-w-2xl mx-auto">
          {!quizFinished ? (
            <>
              {/* Quiz Progress Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DCC3] dark:border-[#4A4230]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7545] dark:text-[#C3B091]">
                    Question {currentQuizIndex + 1} of {CYBER_QUIZ_QUESTIONS.length}
                  </span>
                  <h3 className="font-bold text-base text-[#3B3426] dark:text-[#F3EDDC] mt-0.5">
                    Cyber Safety Diagnostic
                  </h3>
                </div>
                <div className="text-xs font-extrabold text-[#8A7545] dark:text-[#C3B091]">
                  Score: {score}
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-sm sm:text-base font-bold text-[#3B3426] dark:text-[#F3EDDC] leading-relaxed">
                {CYBER_QUIZ_QUESTIONS[currentQuizIndex].question}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {CYBER_QUIZ_QUESTIONS[currentQuizIndex].options.map((opt, idx) => {
                  const isSelected = selectedAnswerIndex === idx;
                  let btnStyle =
                    'bg-[#F6F1E4] dark:bg-[#1E1A12] border-[#E6DCC3] dark:border-[#4A4230] text-[#3B3426] dark:text-[#F3EDDC] hover:border-[#8A7545]';

                  if (showExplanation) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-100 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-red-100 dark:bg-red-950/70 border-red-500 text-red-900 dark:text-red-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm leading-relaxed ${btnStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-xs mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#FAF7F0] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] space-y-2 text-xs"
                >
                  <div className="font-bold text-[#8A7545] dark:text-[#C3B091]">
                    Explanation:
                  </div>
                  <p className="text-[#3B3426] dark:text-[#F3EDDC]">
                    {selectedAnswerIndex !== null && CYBER_QUIZ_QUESTIONS[currentQuizIndex].options[selectedAnswerIndex].explanation}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2 rounded-xl bg-[#8A7545] text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <span>{currentQuizIndex < CYBER_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Safety Score'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            /* Quiz Results Card */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F0] dark:bg-[#1E1A12] border-2 border-[#8A7545] dark:border-[#C3B091] mx-auto flex items-center justify-center text-[#8A7545] dark:text-[#C3B091]">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC]">
                Your Cyber Safety Score
              </h3>

              <div className="text-4xl font-black text-[#8A7545] dark:text-[#C3B091]">
                {score} / {CYBER_QUIZ_QUESTIONS.length}
              </div>

              <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-md mx-auto leading-relaxed">
                {score >= 4
                  ? 'Excellent Awareness! You possess a strong radar for phishing hooks, OTP security, and official helpline protocols.'
                  : 'Good Effort! Review our 10 Cyber Threat Topics to strengthen your defense against QR codes and fake call threats.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-[#8A7545] text-white text-xs font-bold inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
