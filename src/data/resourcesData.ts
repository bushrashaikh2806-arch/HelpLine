import type { LegalResource } from '../types';

export const OFFICIAL_RESOURCES: LegalResource[] = [
  {
    id: 'res-india-code',
    title: 'India Code (Digital Repository of Indian Laws)',
    description: 'Official digital repository of all Central and State Acts, ordinances, and delegated regulations in full text.',
    category: 'Government Legal Portals',
    url: 'https://www.indiacode.nic.in',
    verified: true,
  },
  {
    id: 'res-nalsa',
    title: 'NALSA (National Legal Services Authority)',
    description: 'Provides free and competent legal services to the weaker sections of the society, organises Lok Adalats, and runs legal awareness programs.',
    category: 'Legal Aid',
    url: 'https://nalsa.gov.in',
    verified: true,
  },
  {
    id: 'res-cybercrime-portal',
    title: 'National Cyber Crime Reporting Portal',
    description: 'Official citizen portal to report cybercrimes, online financial fraud, and cyber harassment against women and children.',
    category: 'Cybercrime Reporting',
    url: 'https://cybercrime.gov.in',
    verified: true,
  },
  {
    id: 'res-nch',
    title: 'National Consumer Helpline (NCH / INGRAM)',
    description: 'Grievance redressal portal operated by the Department of Consumer Affairs for unfair trade practices, defect complaints, and e-commerce disputes.',
    category: 'Consumer Grievance',
    url: 'https://consumerhelpline.gov.in',
    verified: true,
  },
  {
    id: 'res-edaakhil',
    title: 'e-Daakhil Consumer Court Filing Portal',
    description: 'Online portal enabling consumers to file complaints and pay fees electronically before Consumer Disputes Redressal Commissions without visiting physically.',
    category: 'Consumer Grievance',
    url: 'https://edaakhil.nic.in',
    verified: true,
  },
  {
    id: 'res-indiagov',
    title: 'National Portal of India (India.gov.in)',
    description: 'Single-window access to information and services provided by various Indian Government entities.',
    category: 'Government Legal Portals',
    url: 'https://www.india.gov.in',
    verified: true,
  },
  {
    id: 'res-pib',
    title: 'Press Information Bureau (PIB)',
    description: 'Official nodal agency of the Government of India to disseminate information on government policies, programme initiatives and achievements.',
    category: 'Government Legal Portals',
    url: 'https://pib.gov.in',
    verified: true,
  },
  {
    id: 'res-egazette',
    title: 'The Gazette of India (e-Gazette)',
    description: 'Authorized legal document of the Government of India where all notifications, new Acts, rules, and statutory orders are formally promulgated.',
    category: 'Official Gazette',
    url: 'https://egazette.gov.in',
    verified: true,
  },
  {
    id: 'res-112',
    title: 'Emergency Response Support System (ERSS - 112)',
    description: 'Pan-India single emergency number for immediate police, fire, ambulance, and disaster intervention.',
    category: 'Emergency Resources',
    url: 'https://112.gov.in',
    verified: true,
  },
  {
    id: 'res-swayam',
    title: 'SWAYAM & CEC Legal Education Initiatives',
    description: 'Free university-level courses on Constitution of India, cyber law, and environmental law supported by the Ministry of Education.',
    category: 'Legal Education',
    url: 'https://swayam.gov.in',
    verified: true,
  },
  {
    id: 'res-cpgrams',
    title: 'CPGRAMS (Centralized Public Grievance Portal)',
    description: 'Centralized portal to lodge grievances against any Central or State government ministry or department.',
    category: 'Government Legal Portals',
    url: 'https://pgportal.gov.in',
    verified: true,
  }
];

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const LEGAL_FAQS: FAQItem[] = [
  {
    question: 'Is HelpLine affiliated with the Indian Police or any Government Ministry?',
    answer: 'No. HelpLine is an independent educational and awareness web application created to simplify legal literacy and promote citizen safety. It does not dispatch emergency responders and is not a government agency.',
    category: 'About HelpLine'
  },
  {
    question: 'Can a police officer refuse to file an FIR if the crime occurred in another district?',
    answer: 'No. Under the "Zero FIR" directive recognized by the Supreme Court and Ministry of Home Affairs, the police station must register the Zero FIR and subsequently transfer the investigation to the appropriate station.',
    category: 'Police & FIR'
  },
  {
    question: 'How quickly should I call 1930 after a cyber financial fraud?',
    answer: 'You should call 1930 immediately, ideally within the first two hours (the "Golden Hour"). Speed allows the nodal banking switch to freeze beneficiary accounts before the scammer withdraws the funds.',
    category: 'Cybercrime'
  },
  {
    question: 'Do I need to hire a lawyer to file a complaint in a Consumer Court?',
    answer: 'No. The Consumer Protection Act allows consumers to draft and argue their own cases directly before District, State, or National Commissions, as well as via the online e-Daakhil portal without mandatory legal counsel.',
    category: 'Consumer Rights'
  },
  {
    question: 'Does HelpLine store my complaints or personal sensitive information?',
    answer: 'HelpLine never stores your complaint narratives or personal credentials on any server. Preferences like text size and bookmarks are kept locally in your device’s browser localStorage only.',
    category: 'Privacy'
  }
];
