import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  User,
  Send,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  Info,
  Scale,
  RefreshCw,
  Clock,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { aiService } from '../services/aiService';
import type { AIResponse } from '../services/aiService';
import type { ChatMessage } from '../types';
import { useToast } from '../components/Toast';

export const AILegalAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: `Hello! I am the **HelpLine AI Legal Assistant (Demo)**.

I can explain Indian constitutional rights, police interaction protocols, online cyber fraud steps, and consumer grievance procedures.

Please select any of the suggested prompt chips below or type your question.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSampleResponse: true,
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const suggestedQuestions = [
    'What are my fundamental rights?',
    'How do I file a police complaint?',
    'What should I do if I experience online fraud?',
    'How can I file a consumer complaint?',
    'What are my rights during a police interaction?',
  ];

  const recentSessions = [
    { title: 'Fundamental Rights Inquiry', time: 'Today' },
    { title: 'Police FIR & Zero FIR', time: 'Yesterday' },
    { title: 'Cyber Financial Fraud (1930)', time: '2 days ago' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const response = await aiService.askLegalAssistant(text);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSampleResponse: response.isSampleResponse,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      showToast('Error generating response', 'Please try again', 'error');
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Response copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        text: 'Conversation cleared. You can ask any legal awareness question or choose a suggested topic below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSampleResponse: true,
      },
    ]);
    showToast('Chat history cleared');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C3B091]/25 text-[#8A7545] dark:text-[#C3B091] text-xs font-bold uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5" />
          <span>Interactive AI Legal Assistant (Demo Prototype)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3B3426] dark:text-[#F3EDDC] mt-2">
          AI Legal Education Assistant
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6954] dark:text-[#BDB59C] max-w-2xl mt-1">
          Explore structured legal answers. Currently running in demo mode with sample verified knowledge and ready for backend Claude API connectivity.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F0] dark:bg-[#231E15] border border-[#E6DCC3] dark:border-[#4A4230] text-xs text-[#6F6954] dark:text-[#BDB59C] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Disclaimer:</strong> HelpLine provides educational legal information, not professional legal advice or attorney representation.
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#8A7545] dark:text-[#C3B091] hidden sm:inline-block">
          Demo Mode Active
        </span>
      </div>

      {/* Main Container: Chat History Sidebar + ChatGPT-Style Chat Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Chat History Sidebar */}
        <aside aria-label="Chat sessions" className="lg:col-span-3 space-y-4 hidden lg:block">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6DCC3] dark:border-[#4A4230]">
              <span className="text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8A7545] dark:text-[#C3B091]" />
                <span>Saved Topics</span>
              </span>
              <button
                onClick={handleClearChat}
                className="text-[11px] text-[#6F6954] hover:text-red-600 flex items-center gap-1"
                title="Clear current conversation"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {recentSessions.map((session, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(session.title)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#F6F1E4] dark:hover:bg-[#1E1A12] border border-transparent hover:border-[#E6DCC3] dark:hover:border-[#4A4230] transition-colors"
                >
                  <div className="text-xs font-semibold text-[#3B3426] dark:text-[#F3EDDC] truncate">
                    {session.title}
                  </div>
                  <div className="text-[10px] text-[#6F6954] dark:text-[#BDB59C] mt-0.5">
                    {session.time}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E6DCC3]/60 dark:border-[#4A4230]/60 text-[10px] text-[#6F6954] dark:text-[#BDB59C]">
              Demo conversations are held in local memory during your browser session.
            </div>
          </div>
        </aside>

        {/* Right: Chat Window */}
        <div className="lg:col-span-9 flex flex-col h-[650px] rounded-3xl bg-white dark:bg-[#2A251A] border border-[#E6DCC3] dark:border-[#4A4230] shadow-soft overflow-hidden">
          {/* Top Bar inside Chat */}
          <div className="px-5 py-3.5 border-b border-[#E6DCC3] dark:border-[#4A4230] bg-[#F6F1E4]/50 dark:bg-[#1E1A12]/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8A7545] text-white flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#3B3426] dark:text-[#F3EDDC] flex items-center gap-1.5">
                  <span>HelpLine Legal Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-[#6F6954] dark:text-[#BDB59C]">
                  Mock engine connected • Architecture ready for Claude 3.5
                </div>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              className="text-xs text-[#6F6954] dark:text-[#BDB59C] hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#2A251A] transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map(msg => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#8A7545] text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[78%] space-y-1.5`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                        isAssistant
                          ? 'bg-[#F6F1E4] dark:bg-[#1E1A12] text-[#3B3426] dark:text-[#F3EDDC] border border-[#E6DCC3] dark:border-[#4A4230]'
                          : 'bg-[#8A7545] dark:bg-[#C3B091] text-white dark:text-[#1E1A12] font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[10px] text-[#6F6954] dark:text-[#BDB59C]">
                      <span>{msg.timestamp}</span>
                      {isAssistant && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {msg.isSampleResponse ? 'Sample Verified Response' : 'Live Connection Notice'}
                          </span>
                          <button
                            onClick={() => handleCopyMessage(msg.text, msg.id)}
                            className="p-1 hover:text-[#3B3426] dark:hover:text-[#F3EDDC] transition-colors ml-1"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#C3B091] text-[#3B3426] flex items-center justify-center flex-shrink-0 mt-1 font-bold text-xs shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Animation Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-[#8A7545] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#F6F1E4] dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8A7545] dark:bg-[#C3B091] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#8A7545] dark:bg-[#C3B091] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#8A7545] dark:bg-[#C3B091] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Chips */}
          <div className="px-4 py-2.5 bg-[#FAF7F0] dark:bg-[#1E1A12] border-t border-[#E6DCC3] dark:border-[#4A4230] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-[#6F6954] dark:text-[#BDB59C] uppercase tracking-wider flex-shrink-0 mr-1">
              Suggested:
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-white dark:bg-[#2A251A] hover:bg-[#E8DFC8] dark:hover:bg-[#352C18] text-[#3B3426] dark:text-[#F3EDDC] border border-[#E6DCC3] dark:border-[#4A4230] transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage(inputPrompt);
            }}
            className="p-3 sm:p-4 bg-white dark:bg-[#2A251A] border-t border-[#E6DCC3] dark:border-[#4A4230] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="Ask a legal or safety question (e.g. 'How do I file a police complaint?')..."
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#F6F1E4]/60 dark:bg-[#1E1A12] border border-[#E6DCC3] dark:border-[#4A4230] text-xs sm:text-sm text-[#3B3426] dark:text-[#F3EDDC] placeholder-[#6F6954] dark:placeholder-[#BDB59C] focus:outline-none focus:ring-2 focus:ring-[#8A7545] transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl bg-[#8A7545] hover:bg-[#6C5B34] dark:bg-[#C3B091] dark:hover:bg-[#D9CBA9] text-white dark:text-[#1E1A12] font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
