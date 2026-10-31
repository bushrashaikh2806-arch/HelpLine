export interface ComplaintTypeInfo {
  id: string;
  category: 'Police' | 'Cybercrime' | 'Consumer' | 'Workplace Harassment' | 'Women\'s Safety' | 'Online Financial Fraud' | 'Public Grievance';
  title: string;
  overview: string;
  authorityToAddress: string;
  officialPortalUrl?: string;
  officialPortalName?: string;
  requiredDocuments: string[];
  steps: { stepNumber: number; title: string; instruction: string }[];
  afterSubmissionGuide: string[];
  precautions: string[];
}

export const COMPLAINT_TYPES: ComplaintTypeInfo[] = [
  {
    id: 'comp-police',
    category: 'Police',
    title: 'Police First Information Report (FIR) / Formal Written Complaint',
    overview: 'Guidance on submitting a formal written complaint to the local Police Station or registering an FIR for cognizable criminal offences.',
    authorityToAddress: 'The Station House Officer (SHO), Local Police Station',
    requiredDocuments: [
      'Original written complaint letter signed in duplicate',
      'Government Photo ID proof (Aadhaar Card, Voter ID, or Driving License)',
      'Proof of incident: Date, exact time, location coordinates or landmark',
      'Any available physical/digital evidence (CCTV footage reference, photos, medical prescription/MLC if injured)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Draft the Written Complaint',
        instruction: 'Write a chronological account of the incident stating clearly: date, time, location, names/descriptions of culprits, and witness contacts. Sign two copies.'
      },
      {
        stepNumber: 2,
        title: 'Submit at Police Station & Receive Stamped Copy',
        instruction: 'Hand over copy 1 to the Duty Officer. Ensure the officer stamps, writes the DD (Daily Diary) number, dates and signs your second copy as official acknowledgment.'
      },
      {
        stepNumber: 3,
        title: 'Registration of FIR',
        instruction: 'If the offence is cognizable, the officer will prepare the formal FIR. Demand your free certified copy of the FIR as mandated under Section 154(2) CrPC.'
      },
      {
        stepNumber: 4,
        title: 'Zero FIR Provision if Out of Jurisdiction',
        instruction: 'If the police station claims lack of territorial jurisdiction, cite the Supreme Court ruling and request registration of a "Zero FIR" for transfer.'
      }
    ],
    afterSubmissionGuide: [
      'Note down the name and phone number of the Investigating Officer (IO) assigned to your case.',
      'Check the status periodically by visiting the station or via the State Police citizen portal.',
      'If no FIR is registered within 3 days for a cognizable offence, submit a written representation to the Superintendent of Police (SP) or DCP.'
    ],
    precautions: [
      'Never sign blank papers or pre-typed compromise letters without reading every line.',
      'Always retain the stamped acknowledgment copy in a secure folder.'
    ]
  },
  {
    id: 'comp-cybercrime',
    category: 'Cybercrime',
    title: 'National Cyber Crime Reporting (cybercrime.gov.in)',
    overview: 'Official procedure to lodge formal cyber complaints for online harassment, identity theft, malware, and social media abuse.',
    authorityToAddress: 'Indian Cyber Crime Coordination Centre (I4C) & District Cyber Crime Cell',
    officialPortalUrl: 'https://cybercrime.gov.in',
    officialPortalName: 'National Cyber Crime Reporting Portal',
    requiredDocuments: [
      'Full-screen screenshots of fraudulent chats, emails, or posts with timestamps and sender handles',
      'Original email headers (.eml format) if reporting phishing emails',
      'URL of offending social media profiles or websites',
      'Citizen Photo Identity Document'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Preserve Evidence Unaltered',
        instruction: 'Capture complete screenshots before offending profiles or posts are deleted. Do not edit or crop timestamps.'
      },
      {
        stepNumber: 2,
        title: 'Visit cybercrime.gov.in & Choose Category',
        instruction: 'Select "Report Cyber Crime" for general offenses or "Report Women / Child Related Crime" (which offers confidential reporting).'
      },
      {
        stepNumber: 3,
        title: 'Register Citizen Login & Submit Details',
        instruction: 'Authenticate with your mobile OTP, fill in the incident narrative, upload screenshots, and provide suspect bank/UPI/phone details if known.'
      },
      {
        stepNumber: 4,
        title: 'Save Incident Acknowledgement Number',
        instruction: 'Download the PDF acknowledgment copy containing your unique Complaint Reference Number.'
      }
    ],
    afterSubmissionGuide: [
      'Track status online through the "Track Your Complaint" option on cybercrime.gov.in.',
      'You will receive an SMS when the case is forwarded to your local district Cyber Police Cell.',
      'Carry your printed acknowledgment and original evidence when summoned for IO verification.'
    ],
    precautions: [
      'Do not engage with the cyber attacker or share payment verification codes.',
      'Report financial cyber frauds separately on Helpline 1930 within the first 2 hours.'
    ]
  },
  {
    id: 'comp-consumer',
    category: 'Consumer',
    title: 'Consumer Grievance & E-Daakhil Filing',
    overview: 'Step-by-step mechanism to seek compensation and replacement for defective merchandise or deficient services.',
    authorityToAddress: 'District Consumer Disputes Redressal Commission / NCH',
    officialPortalUrl: 'https://consumerhelpline.gov.in',
    officialPortalName: 'National Consumer Helpline & e-Daakhil',
    requiredDocuments: [
      'Purchase invoice / tax receipt with GST number',
      'Warranty card, product photographs, and packaging details',
      'Copy of email communications sent to company customer service requesting remedy',
      'Bank/Credit Card debit proof or UPI receipt'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Serve a Written Legal Notice to Merchant',
        instruction: 'Send an email or registered notice giving the merchant 7 to 15 days to replace the item or refund the purchase amount.'
      },
      {
        stepNumber: 2,
        title: 'Register NCH Grievance (Toll-Free 1915)',
        instruction: 'Log on to consumerhelpline.gov.in or call 1915. Most major e-commerce brands resolve complaints within 30 days during mediation.'
      },
      {
        stepNumber: 3,
        title: 'File Case on e-Daakhil Portal if Unresolved',
        instruction: 'If company refuses, register on edaakhil.nic.in. Upload petition statement, invoice evidence, and pay nominal court fee online.'
      }
    ],
    afterSubmissionGuide: [
      'Track hearing dates on the Confonet case tracking portal.',
      'You may present your case in person or via video conference without needing an advocate.'
    ],
    precautions: [
      'Ensure the complaint is filed within 2 years from the date of the cause of action (defect/service denial).'
    ]
  },
  {
    id: 'comp-posh',
    category: 'Workplace Harassment',
    title: 'Internal Committee (IC) Complaint Under POSH Act',
    overview: 'Filing a formal grievance against sexual harassment or hostile work environment in private or public workplaces.',
    authorityToAddress: 'Presiding Officer, Internal Committee (IC), Your Organization',
    officialPortalUrl: 'https://shebox.wcd.gov.in',
    officialPortalName: 'SHe-Box (Ministry of Women and Child Development)',
    requiredDocuments: [
      'Written complaint detailing date, time, venue, and detailed description of the incident(s)',
      'Supporting communication logs: emails, Slack/Teams chats, WhatsApp messages, call records',
      'List of witnesses who were present or to whom you confided immediately afterward'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Submit Complaint Within 3 Months',
        instruction: 'Submit the written signed complaint to the IC Presiding Officer within 3 months of the incident (can be extended by 3 months with valid reasons).'
      },
      {
        stepNumber: 2,
        title: 'Inquiry Process (Within 90 Days)',
        instruction: 'The IC sends a copy to the respondent within 7 working days. Both parties will be given an opportunity to present statements and witnesses.'
      },
      {
        stepNumber: 3,
        title: 'Interim Relief Measures',
        instruction: 'You have the right to request interim relief: transfer to another department, up to 3 months paid leave, or restraining respondent from your team.'
      }
    ],
    afterSubmissionGuide: [
      'The IC completes inquiry and submits report within 10 days of completion to the employer.',
      'The employer must act on the recommendations within 60 days.',
      'If not resolved, an appeal can be filed before the appellate authority or SHe-Box portal.'
    ],
    precautions: [
      'The POSH Act strictly prohibits publication or leaking of the identity of the complainant or witnesses.'
    ]
  },
  {
    id: 'comp-cpgrams',
    category: 'Public Grievance',
    title: 'CPGRAMS Centralized Public Grievance Portal',
    overview: 'Citizen grievance redressal mechanism against government departments, public sector banks, railways, and municipal utilities.',
    authorityToAddress: 'Department of Administrative Reforms and Public Grievances (DARPG)',
    officialPortalUrl: 'https://pgportal.gov.in',
    officialPortalName: 'CPGRAMS Portal (pgportal.gov.in)',
    requiredDocuments: [
      'Previous application or reference number submitted to the concerned department',
      'Correspondence history and rejection letters if any',
      'Clear description of the administrative delay or deficiency'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sign in to pgportal.gov.in',
        instruction: 'Register with citizen credentials and choose the relevant Central or State Ministry from the dropdown directory.'
      },
      {
        stepNumber: 2,
        title: 'Enter Grievance & Upload PDF',
        instruction: 'Summarize the grievance in up to 4,000 characters and attach supporting documentation.'
      },
      {
        stepNumber: 3,
        title: 'Receive Grievance Tracking Registration Number',
        instruction: 'A unique registration number is generated. Most departments are mandated to resolve within 30 to 45 days.'
      }
    ],
    afterSubmissionGuide: [
      'Track real-time progress of officer remarks and action taken reports.',
      'You have the right to appeal if dissatisfied with the initial resolution.'
    ],
    precautions: [
      'Do not submit RTI applications, commercial disputes, or matter sub-judice in court on CPGRAMS.'
    ]
  }
];
