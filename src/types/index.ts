export type Language = 'en' | 'hi' | 'mr';

export interface RightItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  whatItMeans: string;
  example: string;
  legalReference: string;
  sourceLink: string;
  officialSource: string;
  verified: boolean;
  relatedIds: string[];
}

export interface EmergencyContact {
  id: string;
  category: 'national' | 'police' | 'medical' | 'fire' | 'women' | 'child' | 'cyber' | 'disaster' | 'legal';
  name: string;
  number: string;
  description: string;
  timing: string;
  isNational: boolean;
  stateAvailability?: string;
  verifiedOfficial: boolean;
  officialPortal?: string;
}

export interface LegalUpdate {
  id: string;
  category: 'Traffic' | 'Cyber' | 'Citizen Rights' | 'Education' | 'Consumer' | 'Women\'s Safety';
  title: string;
  description: string;
  date: string;
  whatThisMeans: string;
  source: string;
  sourceUrl?: string;
  isDemo: boolean;
}

export interface CybercrimeTopic {
  id: string;
  title: string;
  shortDesc: string;
  warningSigns: string[];
  preventionSteps: string[];
  immediateStepsIfVictim: string[];
  reportingUrl: string;
  reportingHelpline: string;
  severity: 'high' | 'critical' | 'moderate';
}

export interface SafetyTip {
  id: string;
  category: 'Personal' | 'Women\'s' | 'Travel' | 'Public Transport' | 'Online' | 'Home' | 'Student' | 'Emergency Preparedness';
  title: string;
  summary: string;
  actionPoints: string[];
  realWorldScenario: string;
}

export interface LegalResource {
  id: string;
  title: string;
  description: string;
  category: 'Government Legal Portals' | 'Legal Aid' | 'Cybercrime Reporting' | 'Consumer Grievance' | 'Emergency Resources' | 'Legal Education' | 'Official Gazette';
  url: string;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isSampleResponse?: boolean;
}

export interface UserPreferences {
  name: string;
  language: Language;
  theme: 'light' | 'dark' | 'system';
  textSize: 'normal' | 'large' | 'larger';
  reducedMotion: boolean;
  emailNotifications: boolean;
  savedRights: string[];
  bookmarkedResources: string[];
  savedTips: string[];
}
