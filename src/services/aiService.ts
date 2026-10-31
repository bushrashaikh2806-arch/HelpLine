export interface AIResponse {
  answer: string;
  isSampleResponse: boolean;
  legalReferences: string[];
  suggestedActions: string[];
  disclaimer: string;
}

const SAMPLE_KNOWLEDGE_BASE: Record<string, AIResponse> = {
  'fundamental-rights': {
    answer: `Under Part III of the Constitution of India (Articles 12 to 35), all Indian citizens are guaranteed six broad categories of Fundamental Rights:

1. **Right to Equality (Articles 14–18):** Equality before the law, prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth, and equality of opportunity in public employment.
2. **Right to Freedom (Articles 19–22):** Freedom of speech and expression, peaceful assembly, association, movement throughout India, residence, and profession, protected by Article 21 (Protection of Life and Personal Liberty).
3. **Right against Exploitation (Articles 23–24):** Prohibition of human trafficking, forced labor, and employment of children in hazardous occupations.
4. **Right to Freedom of Religion (Articles 25–28):** Freedom of conscience and free profession, practice, and propagation of religion.
5. **Cultural and Educational Rights (Articles 29–30):** Protection of interests and culture of minorities and their right to establish educational institutions.
6. **Right to Constitutional Remedies (Article 32):** The right to approach the Supreme Court of India directly via writ petitions (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari) if any fundamental right is violated.`,
    isSampleResponse: true,
    legalReferences: ['Constitution of India, Part III (Articles 12 to 35)'],
    suggestedActions: [
      'Read Article 14 and 21 in detail in the Know Your Rights section',
      'Learn about filing writ petitions under Article 32 or 226'
    ],
    disclaimer: 'HelpLine provides educational legal information, not professional legal advice.'
  },
  'police-complaint': {
    answer: `To file a formal police complaint or First Information Report (FIR) in India, follow these established steps:

1. **Distinguish Between Cognizable and Non-Cognizable Offence:**
   - For serious (cognizable) offences like theft, physical assault, cyber fraud, or harassment, the police officer is legally mandated to register an FIR under Section 154 CrPC / Sec 173 BNSS.
   - For minor disputes, a Non-Cognizable Report (NCR) is recorded.

2. **Writing the Complaint:**
   - Clearly state: Date, exact time, exact location, details of persons involved, witness names, and step-by-step description of what transpired.
   - You can write in your preferred local language (English, Hindi, or state language).

3. **Submitting at Police Station:**
   - Submit two copies. Have the Duty Officer stamp, sign, and date the second copy as your official "Received" acknowledgment.
   - You are entitled by law to a **FREE copy of the registered FIR** immediately.

4. **Zero FIR Provision:**
   - If the incident occurred in another town or district, the nearest police station CANNOT refuse your complaint. They must register a "Zero FIR" and transfer it to the jurisdictional station.

5. **If Police Refuse to Register FIR:**
   - Send the complaint via registered post or email to the Superintendent of Police (SP) or Deputy Commissioner of Police (DCP).
   - Approach the Judicial Magistrate under Section 156(3) CrPC / Sec 175(3) BNSS through a legal aid counsel.`,
    isSampleResponse: true,
    legalReferences: [
      'Section 154, 156(3) Code of Criminal Procedure (CrPC) / Sec 173, 175 BNSS',
      'Supreme Court Ruling: Lalita Kumari v. Govt. of U.P. (Mandatory FIR registration)'
    ],
    suggestedActions: [
      'Use the HelpLine "Complaint Guidance & Draft Complaint" tool',
      'Call 112 if immediate on-site police intervention is needed'
    ],
    disclaimer: 'HelpLine provides educational legal information, not professional legal advice.'
  },
  'online-fraud': {
    answer: `If you have experienced unauthorized financial cyber fraud or digital theft, take immediate emergency steps within the "Golden Hour":

1. **Call Helpline 1930 Immediately:**
   - Dial 1930 (National Cyber Financial Fraud Reporting System operated by I4C, MHA).
   - Provide transaction details: Bank account number, debit card number, UPI ID, transaction reference number (UTR), and deducted amount.
   - 1930 alerts the beneficiary bank nodal officers to place an immediate debit freeze/lien on the stolen funds before cash is withdrawn.

2. **Block Digital Banking Access:**
   - Call your bank helpline to temporarily freeze net banking, block the debit/credit card, and disable UPI access for that account.

3. **Preserve Digital Evidence:**
   - Do not delete chat logs, SMS messages, recipient UPI handles, or fraudulent website URLs. Take full screenshots showing timestamps and phone numbers.

4. **Lodge Formal Complaint on Official Portal:**
   - Visit https://cybercrime.gov.in and file a formal incident report under "Financial Fraud". Save the generated Acknowledgement Number for court or bank reimbursement claims under RBI Zero Liability guidelines.`,
    isSampleResponse: true,
    legalReferences: [
      'Information Technology Act, 2000 (Sections 43, 66C, 66D)',
      'RBI Circular: Limiting Liability of Customers in Unauthorised Electronic Banking Transactions'
    ],
    suggestedActions: [
      'Check Cybercrime Awareness modules for preventative security',
      'Report immediately on https://cybercrime.gov.in'
    ],
    disclaimer: 'HelpLine provides educational legal information, not professional legal advice.'
  },
  'consumer-complaint': {
    answer: `To file a consumer complaint against defective goods, substandard services, or misleading advertisements under the Consumer Protection Act, 2019:

1. **Step 1: Send Formal Notice to the Company:**
   - Write an email to the merchant or company nodal officer detailing the defect, invoice copy, warranty card, and desired remedy (replacement or full refund within 7-14 days).

2. **Step 2: National Consumer Helpline (NCH - 1915):**
   - Register a grievance online at https://consumerhelpline.gov.in or call toll-free 1915. Many registered brand partners resolve grievances at this stage.

3. **Step 3: Online Consumer Court (e-Daakhil):**
   - If the business fails to resolve the issue, file a formal consumer case online on the e-Daakhil portal (edaakhil.nic.in).
   - No physical lawyer is required. You can represent yourself as a consumer complainant.
   - Jurisdictions:
     - District Commission: Claims up to ₹50 Lakhs
     - State Commission: Claims from ₹50 Lakhs to ₹2 Crores
     - National Commission (NCDRC): Claims exceeding ₹2 Crores`,
    isSampleResponse: true,
    legalReferences: [
      'Consumer Protection Act, 2019 (Sections 34, 47, 58)',
      'Department of Consumer Affairs E-Daakhil Guidelines'
    ],
    suggestedActions: [
      'Access the National Consumer Helpline at https://consumerhelpline.gov.in',
      'Dial 1915 between 8 AM and 8 PM'
    ],
    disclaimer: 'HelpLine provides educational legal information, not professional legal advice.'
  },
  'police-interaction-rights': {
    answer: `When interacting with police officers or during inquiry, you hold clear statutory protections:

1. **Right to Know Officer Identity:**
   - Every police officer on duty is required to wear a visible name badge and designation tag. You have the right to ask and note down their name and station.

2. **Questioning at Residence:**
   - Under Section 160 CrPC / Sec 179 BNSS, women, children below the age of 15, and senior citizens above 65 cannot be summoned to a police station for interrogation; questioning must happen at their residence in the presence of family.

3. **Right During Arrest (D.K. Basu Guidelines):**
   - You must be explicitly told the exact reason for arrest.
   - An "Arrest Memo" must be prepared, signed by an independent witness and counter-signed by you.
   - You have the right to have a family member or friend notified within 8 to 12 hours.
   - You have the right to be medically examined every 48 hours while in custody.
   - You MUST be produced before the nearest Judicial Magistrate within 24 hours of arrest (excluding travel time).

4. **Arrest of Women:**
   - No woman can be arrested between sunset and sunrise except under exceptional orders from a Judicial Magistrate.
   - Arrest must be performed only by a female police officer.`,
    isSampleResponse: true,
    legalReferences: [
      'Article 22(1), (2) Constitution of India',
      'Sections 46(4), 50, 50A, 54, 57 CrPC / Sec 43, 47 BNSS',
      'Supreme Court landmark guidelines in D.K. Basu v. State of West Bengal'
    ],
    suggestedActions: [
      'Review Rights During Police Interaction in the Rights Library',
      'Keep 15100 (NALSA Free Legal Aid) on hand'
    ],
    disclaimer: 'HelpLine provides educational legal information, not professional legal advice.'
  }
};

class AIService {
  /**
   * Responds to legal inquiries.
   * Delivers verified educational mock responses for sample questions,
   * and cleanly communicates connection status for other prompts.
   * Ready for future Anthropic Claude API / backend proxy plugging.
   */
  async askLegalAssistant(prompt: string): Promise<AIResponse> {
    // Realistic simulation of thinking latency
    await new Promise(resolve => setTimeout(resolve, 600));

    const normalized = prompt.toLowerCase().trim();

    if (normalized.includes('fundamental right') || normalized.includes('article 21') || normalized.includes('constitution')) {
      return SAMPLE_KNOWLEDGE_BASE['fundamental-rights'];
    }
    if (normalized.includes('file a police complaint') || normalized.includes('fir') || normalized.includes('police complaint')) {
      return SAMPLE_KNOWLEDGE_BASE['police-complaint'];
    }
    if (normalized.includes('online fraud') || normalized.includes('cyber fraud') || normalized.includes('1930') || normalized.includes('scam')) {
      return SAMPLE_KNOWLEDGE_BASE['online-fraud'];
    }
    if (normalized.includes('consumer complaint') || normalized.includes('defective') || normalized.includes('consumer') || normalized.includes('refund')) {
      return SAMPLE_KNOWLEDGE_BASE['consumer-complaint'];
    }
    if (normalized.includes('police interaction') || normalized.includes('arrest') || normalized.includes('interrogate') || normalized.includes('officer')) {
      return SAMPLE_KNOWLEDGE_BASE['police-interaction-rights'];
    }

    // Default honest response when an unmapped query is asked
    return {
      answer: `The live AI assistant is not connected yet.

HelpLine is designed as an architectural frontend prototype ready for integration with Claude 3.5 Sonnet or a secure FastAPI/Supabase backend.

Currently, you can explore verified, sample legal explanations by clicking any of the suggested prompt chips above, or browsing the comprehensive **Know Your Rights** library and **Complaint Guidance** modules.`,
      isSampleResponse: false,
      legalReferences: ['HelpLine Architecture & Knowledge Base (Demo Mode)'],
      suggestedActions: [
        'Try: "What are my fundamental rights?"',
        'Try: "How do I file a police complaint?"',
        'Try: "What should I do if I experience online fraud?"'
      ],
      disclaimer: 'HelpLine provides educational legal information, not professional legal advice.'
    };
  }
}

export const aiService = new AIService();
