import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';

interface NavTranslations {
  home: string;
  rights: string;
  aiAssistant: string;
  search: string;
  emergency: string;
  complaintGuidance: string;
  cybercrime: string;
  safetyTips: string;
  updates: string;
  resources: string;
  profile: string;
  tagline: string;
  translationNotice: string;
}

const translations: Record<Language, NavTranslations> = {
  en: {
    home: 'Home',
    rights: 'Know Your Rights',
    aiAssistant: 'AI Legal Assistant',
    search: 'Smart Legal Search',
    emergency: 'Emergency Help',
    complaintGuidance: 'Complaint Guidance',
    cybercrime: 'Cybercrime Awareness',
    safetyTips: 'Safety Tips',
    updates: 'Legal Updates',
    resources: 'Resources',
    profile: 'Profile',
    tagline: 'KNOW YOUR RIGHTS. STAY SAFE. BE EMPOWERED.',
    translationNotice: '',
  },
  hi: {
    home: 'मुख्य पृष्ठ (Home)',
    rights: 'अपने अधिकार जानें (Know Your Rights)',
    aiAssistant: 'एआई कानूनी सहायक (AI Legal Assistant)',
    search: 'स्मार्ट कानूनी खोज (Smart Legal Search)',
    emergency: 'आपातकालीन सहायता (Emergency Help)',
    complaintGuidance: 'शिकायत मार्गदर्शन (Complaint Guidance)',
    cybercrime: 'साइबर अपराध जागरूकता (Cybercrime)',
    safetyTips: 'सुरक्षा युक्तियाँ (Safety Tips)',
    updates: 'कानूनी समाचार (Legal Updates)',
    resources: 'सरकारी संसाधन (Resources)',
    profile: 'प्रोफ़ाइल (Profile)',
    tagline: 'अधिकार जानें। सुरक्षित रहें। सशक्त बनें।',
    translationNotice: 'हिंदी भाषा समर्थन: नेविगेशन अनुवादित है। विस्तृत पृष्ठ अनुवाद प्रगति पर है (Full translation in progress).',
  },
  mr: {
    home: 'मुख्य पान (Home)',
    rights: 'तुमचे हक्क जाणून घ्या (Know Your Rights)',
    aiAssistant: 'एआय कायदेशीर सहाय्यक (AI Legal Assistant)',
    search: 'स्मार्ट कायदेशीर शोध (Smart Legal Search)',
    emergency: 'आपत्कालीन मदत (Emergency Help)',
    complaintGuidance: 'तक्रार मार्गदर्शन (Complaint Guidance)',
    cybercrime: 'सायबर गुन्हेगारी जनजागृती (Cybercrime)',
    safetyTips: 'सुरक्षा टिप्स (Safety Tips)',
    updates: 'कायदेशीर घडामोडी (Legal Updates)',
    resources: 'अधिकृत संसाधने (Resources)',
    profile: 'प्रोफाइल (Profile)',
    tagline: 'हक्क जाणून घ्या. सुरक्षित राहा. सक्षम बना.',
    translationNotice: 'मराठी भाषा समर्थन: नेव्हिगेशन भाषांतरित आहे. सविस्तर पृष्ठ भाषांतर प्रगतीपथावर आहे (Full translation in progress).',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: NavTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('helpline_lang') as Language | null;
    if (saved === 'en' || saved === 'hi' || saved === 'mr') return saved;
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('helpline_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
