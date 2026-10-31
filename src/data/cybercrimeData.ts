import type { CybercrimeTopic } from '../types';
export type { CybercrimeTopic };

export const CYBERCRIME_TOPICS: CybercrimeTopic[] = [
  {
    id: 'phishing',
    title: 'Phishing & Impersonation Scams',
    shortDesc: 'Deceptive messages posing as trusted institutions (banks, income tax, electricity boards) to harvest credentials.',
    warningSigns: [
      'Urgent threats of power disconnection, SIM blockage, or bank account deactivation within 2 hours.',
      'Generic sender ID or suspicious URLs like `sbi-kyc-update.xyz` instead of `.bank.sbi` or `.gov.in`.',
      'Requests to download an `.apk` file or install screen-sharing software (AnyDesk, TeamViewer).'
    ],
    preventionSteps: [
      'Never click links in unexpected SMS messages regarding KYC or bill payments.',
      'Check official website URLs and SSL certificates directly by typing the domain.',
      'Remember: No electricity board asks you to pay via personal mobile number or third-party APK.'
    ],
    immediateStepsIfVictim: [
      'Disconnect Wi-Fi and mobile data immediately if an unknown APK was downloaded.',
      'Uninstall suspicious applications in Android Safe Mode or factory reset the device.',
      'Call your bank\'s customer care immediately to block net banking credentials and ATM cards.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'critical'
  },
  {
    id: 'otp-fraud',
    title: 'OTP & Social Engineering Fraud',
    shortDesc: 'Attackers manipulate victims into sharing One-Time Passwords under false pretexts of cashback or verification.',
    warningSigns: [
      'Caller claims to be a bank manager, courier delivery agent, or lottery official requesting an OTP.',
      'Caller insists you recite or type a 6-digit code received on SMS to "cancel an unauthorized charge".',
      'SMS text begins with "DO NOT SHARE THIS OTP FOR TRANSACTION OF RS. ...".'
    ],
    preventionSteps: [
      'Remember the golden rule: Bank staff, police, and government officials NEVER ask for OTPs.',
      'Read the full SMS body accompanying the OTP: check the merchant name and amount debited.',
      'Never recite or forward OTPs to anyone, even if they know your date of birth and address.'
    ],
    immediateStepsIfVictim: [
      'Immediately dial 1930 (National Cyber Financial Fraud Helpline).',
      'Log into net banking or mobile banking and temporarily disable international/domestic online card limits.',
      'Register an incident report on cybercrime.gov.in with screenshot evidence of transaction SMS.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'critical'
  },
  {
    id: 'upi-fraud',
    title: 'UPI "Request Money" & QR Code Fraud',
    shortDesc: 'Scammers send "Collect Request" or fake QR codes claiming it will credit money to your account.',
    warningSigns: [
      'Seller on OLX or social media claiming they will "pay advance" by sending you a QR code to scan.',
      'The payment app prompts you: "ENTER UPI PIN TO PAY ₹15,000" while the scammer says "Entering PIN receives money".',
      'Fake payment screenshots created via prank generator apps.'
    ],
    preventionSteps: [
      'YOU NEVER ENTER A UPI PIN TO RECEIVE MONEY. Entering your UPI PIN always debits your account.',
      'Never scan a QR code sent on WhatsApp to receive funds.',
      'Verify account credit exclusively by checking your own bank passbook/statement in the official app.'
    ],
    immediateStepsIfVictim: [
      'Open your UPI app (BHIM, PhonePe, GPay, Paytm) and dispute the specific transaction.',
      'Call 1930 immediately to freeze the beneficiary account.',
      'Note down the UTR (Unique Transaction Reference) number and file an online cyber complaint.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'critical'
  },
  {
    id: 'fake-jobs',
    title: 'Work-from-Home & Part-time Job Scams',
    shortDesc: 'Fraudulent offers promising high daily earnings for liking YouTube videos, reviewing hotels, or rating crypto tasks.',
    warningSigns: [
      'Unsolicited WhatsApp or Telegram message offering ₹3,000 to ₹8,000 per day for simple clicking tasks.',
      'Small initial payouts (₹150 - ₹500) provided to gain trust before demanding "prepaid task deposits".',
      'The victim is added to a Telegram group where fake bots celebrate large investment profits.'
    ],
    preventionSteps: [
      'Legitimate companies never hire via unsolicited Telegram messages or ask employees to deposit money to work.',
      'Verify company listings on official career portals (LinkedIn, company domain careers page).',
      'Never transfer "security deposits" or "cryptocurrency recharge fees" for job tasks.'
    ],
    immediateStepsIfVictim: [
      'Stop sending further "recovery" deposits immediately; scammers will keep asking for more.',
      'Save full chat transcripts, Telegram handles, and bank transaction details.',
      'Report on cybercrime.gov.in under "Financial Fraud" with all recipient UPI IDs/bank accounts.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'high'
  },
  {
    id: 'social-hacking',
    title: 'Social Media Account Takeover & Impersonation',
    shortDesc: 'Hijacking WhatsApp or Instagram accounts to solicit emergency money from friends and family.',
    warningSigns: [
      'A friend messages on Instagram saying: "Hey, can you vote for me in an ambassador contest? Send me the link code you receive".',
      'Unsolicited WhatsApp verification code received without requesting a transfer.',
      'Sudden loss of access to your social media handle and altered recovery email.'
    ],
    preventionSteps: [
      'Turn on Two-Factor Authentication (2FA) using an Authenticator app (like Google/Microsoft Authenticator) instead of SMS alone.',
      'Never send screenshots of SMS or recovery links to friends whose accounts may already be compromised.',
      'Set a custom 6-digit PIN on WhatsApp Settings > Account > Two-Step Verification.'
    ],
    immediateStepsIfVictim: [
      'Notify your close contacts via alternate phone calls that your social account has been compromised.',
      'Follow official recovery procedures on Instagram/WhatsApp support with selfie video verification.',
      'File a complaint on cybercrime.gov.in under "Social Media Crime".'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'high'
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft & Fake Loan App Harassment',
    shortDesc: 'Illegal lending apps that steal phone contacts and photos to blackmail victims with morphed images.',
    warningSigns: [
      'App on third-party website offering "Instant ₹50,000 loan without CIBIL" requiring full contacts and gallery permission.',
      'Heavily shortened tenure (6-7 days) with exorbitant 40% processing deductions.',
      'Abusive calls and harassment messages sent to your family and colleagues.'
    ],
    preventionSteps: [
      'Only borrow from RBI-registered NBFCs and banks listed on the RBI official website.',
      'Never grant camera, gallery, and contacts permissions to quick-loan applications.',
      'Check app reviews and developer information on the Google Play Store; avoid sideloading APKs.'
    ],
    immediateStepsIfVictim: [
      'Do not give in to extortion; paying once leads to repeated extortion demands.',
      'File a complaint at the local police cyber cell and on cybercrime.gov.in with proof of threats.',
      'Inform your contact list on social media that rogue scammers are circulating fake materials.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'critical'
  },
  {
    id: 'online-harassment',
    title: 'Cyberbullying, Stalking & Non-Consensual Imagery',
    shortDesc: 'Online harassment, persistent stalking, non-consensual sharing of intimate images, and blackmail.',
    warningSigns: [
      'Persistent threatening or sexually explicit messages from burner or anonymous accounts.',
      'Threats to publish private photos or personal contact details (doxxing).',
      'Creation of fake profiles using victim\'s name, photos, and phone numbers.'
    ],
    preventionSteps: [
      'Keep social media profiles private and restrict audience permissions for photos.',
      'Do not engage, retaliate, or negotiate with cyber stalkers.',
      'Utilize StopNCII.org (supported by National Commission for Women and tech platforms) to generate cryptographic image hashes to prevent spread.'
    ],
    immediateStepsIfVictim: [
      'Do not delete the messages: capture complete full-screen screenshots, URLs, and timestamps.',
      'File an emergency complaint on cybercrime.gov.in under "Report Crime Related to Women / Child".',
      'The portal allows anonymous reporting for child and women-related sexual abuse material.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930 or 1091',
    severity: 'critical'
  },
  {
    id: 'fake-shopping',
    title: 'Counterfeit & Deceptive Shopping Websites',
    shortDesc: 'Fake online stores advertising branded apparel or electronics at 90% discount on Facebook and Instagram ads.',
    warningSigns: [
      'Unbelievable prices: e.g. "iPhone 15 for ₹8,999" or "Nike Sneakers for ₹499".',
      'Payment options restricted solely to UPI QR or advance bank transfer (No Cash on Delivery).',
      'No physical contact address, no GST number, or newly registered domain (<30 days old).'
    ],
    preventionSteps: [
      'Check domain age using WHOIS tools before buying from unfamiliar social media sponsors.',
      'Look for valid return policies, customer care telephone numbers, and customer reviews outside the website.',
      'Prefer Cash on Delivery (COD) or reputable escrow payment gateways for initial orders.'
    ],
    immediateStepsIfVictim: [
      'Contact your bank immediately to flag the payment gateway transaction as fraudulent.',
      'Report the fake advertiser URL to the platform (Meta / Google Ad Complaints).',
      'File a complaint on the National Consumer Helpline (1915) or cybercrime.gov.in.'
    ],
    reportingUrl: 'https://consumerhelpline.gov.in',
    reportingHelpline: '1915',
    severity: 'moderate'
  },
  {
    id: 'malicious-links',
    title: 'Malicious Links & Trojanized APKs',
    shortDesc: 'Infected files distributed via WhatsApp forwards posing as official wedding invites, free recharge, or subsidy vouchers.',
    warningSigns: [
      'Message: "Congratulations! Government PM-Kisan ₹5,000 allowance approved. Click here to claim: `bit.ly/pm-kisan-claim`".',
      'WhatsApp file sent with `.apk` extension masquerading as a document: e.g. `Wedding_Card.apk` or `EPFO_Passbook.apk`.',
      'Device battery draining rapidly, overheating, or unauthorized SMS sending in the background.'
    ],
    preventionSteps: [
      'Never install files with the `.apk` extension received over WhatsApp or Telegram.',
      'Verify official government schemes on official `.gov.in` portals exclusively.',
      'Keep Google Play Protect enabled on your Android smartphone.'
    ],
    immediateStepsIfVictim: [
      'Turn on Airplane mode immediately to disconnect network access for the malware.',
      'Backup only personal documents/photos (do not backup downloaded APKs) and perform a factory reset.',
      'Contact your telecom operator if SIM swapping or unauthorized call forwarding was enabled.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'high'
  },
  {
    id: 'password-security',
    title: 'Credential Stuffing & Password Security',
    shortDesc: 'Reusing the same simple password across multiple web portals, leading to cascading account break-ins.',
    warningSigns: [
      'Security alert emails: "New login to your account from a device in another state or country".',
      'Notifications from HaveIBeenPwned that your email appeared in a third-party corporate data breach.',
      'Repeated password reset requests arriving in your inbox.'
    ],
    preventionSteps: [
      'Use a distinct, strong passphrase (at least 14 characters with words, numbers, and symbols) for banking and primary email.',
      'Never reuse your email master password on forum websites or mobile applications.',
      'Employ a reputable password manager and enable hardware or app-based 2FA.'
    ],
    immediateStepsIfVictim: [
      'Change your primary email password immediately and click "Sign out of all other sessions".',
      'Review and revoke unauthorized third-party apps connected to your Google/Apple accounts.',
      'Check forwarding rules in your email settings to ensure hackers didn’t set up silent email routing.'
    ],
    reportingUrl: 'https://cybercrime.gov.in',
    reportingHelpline: '1930',
    severity: 'moderate'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; isCorrect: boolean; explanation: string }[];
}

export const CYBER_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'You receive an urgent SMS: "Your electricity connection will be disconnected tonight at 9:30 PM due to unpaid bill. Call officer at 9876543210 immediately." What should you do?',
    options: [
      {
        text: 'Call the mobile number in the SMS to pay quickly before power goes off',
        isCorrect: false,
        explanation: 'Electricity boards never dispatch disconnection threats from personal 10-digit mobile numbers.'
      },
      {
        text: 'Ignore the SMS or check your consumer account directly on the official state electricity portal/app',
        isCorrect: true,
        explanation: 'Correct! Official state discoms communicate via verified SMS sender headers and through your official consumer portal.'
      },
      {
        text: 'Forward the message to your neighbors to warn them',
        isCorrect: false,
        explanation: 'Forwarding unverified warnings causes panic and spreads scam numbers.'
      }
    ]
  },
  {
    id: 2,
    question: 'A buyer on OLX agrees to buy your used table. He sends you a QR code on WhatsApp and says "Scan this QR code and enter your UPI PIN to receive ₹4,000 into your Google Pay." What happens if you scan and enter your PIN?',
    options: [
      {
        text: '₹4,000 will be credited to your bank account',
        isCorrect: false,
        explanation: 'Entering your UPI PIN NEVER credits money to you. It always debits your account.'
      },
      {
        text: '₹4,000 will be immediately deducted from your bank account',
        isCorrect: true,
        explanation: 'Correct! Entering a UPI PIN is strictly an authorization to transfer money OUT of your account.'
      },
      {
        text: 'The money will be held safely in escrow until you approve it',
        isCorrect: false,
        explanation: 'There is no escrow mechanism triggered by entering a personal UPI PIN.'
      }
    ]
  },
  {
    id: 3,
    question: 'What is the national emergency helpline number for reporting cyber financial fraud to freeze funds in the golden hour?',
    options: [
      {
        text: '100',
        isCorrect: false,
        explanation: '100 connects to general police control room, not the specialized financial cyber fraud switch.'
      },
      {
        text: '1930',
        isCorrect: true,
        explanation: 'Correct! 1930 is the Citizen Financial Cyber Fraud Reporting System (CFCFRS) operated by MHA I4C.'
      },
      {
        text: '181',
        isCorrect: false,
        explanation: '181 is the Women\'s Helpline.'
      }
    ]
  },
  {
    id: 4,
    question: 'A relative sends a WhatsApp forward containing an APK named "PM_Free_Recharge_Offer.apk". What is the safest course of action?',
    options: [
      {
        text: 'Install it to check if you qualify for the data recharge',
        isCorrect: false,
        explanation: 'Installing APKs from chat apps exposes your contacts, SMS, and banking sessions to malware.'
      },
      {
        text: 'Delete the file immediately and gently advise your relative that the APK is malicious',
        isCorrect: true,
        explanation: 'Correct! Government bodies and legitimate telecom companies never distribute offers via third-party APK files in chats.'
      },
      {
        text: 'Open it in private browsing mode',
        isCorrect: false,
        explanation: 'Private browsing only affects web browsers; installing an APK file installs software directly onto your operating system.'
      }
    ]
  },
  {
    id: 5,
    question: 'Which of the following is true about filing a police complaint (FIR) for women in India?',
    options: [
      {
        text: 'An FIR can only be filed in the specific police station where the crime took place',
        isCorrect: false,
        explanation: 'Under the "Zero FIR" doctrine, any police station across India is mandated to register the initial complaint.'
      },
      {
        text: 'A woman can register a "Zero FIR" at any police station regardless of jurisdiction',
        isCorrect: true,
        explanation: 'Correct! Zero FIR ensures prompt investigation and evidence preservation irrespective of local police territorial boundaries.'
      },
      {
        text: 'A woman cannot file an FIR without hiring an advocate first',
        isCorrect: false,
        explanation: 'Any citizen or victim can file an FIR directly; legal counsel is not required to register a complaint.'
      }
    ]
  }
];

export interface ScenarioSimulation {
  id: string;
  channel: 'WhatsApp' | 'SMS' | 'Email';
  sender: string;
  time: string;
  content: string;
  redFlags: string[];
  safeAction: string;
  dangerAction: string;
}

export const SCENARIO_SIMULATIONS: ScenarioSimulation[] = [
  {
    id: 'sim-electricity',
    channel: 'SMS',
    sender: '+91 97234 11890',
    time: 'Today, 8:14 PM',
    content: 'DEAR CONSUMER YOUR ELECTRICITY POWER WILL BE DISCONNECTED TONIGHT AT 9.30 PM FROM ELECTRICITY OFFICE BECAUSE YOUR PREVIOUS MONTH BILL WAS NOT UPDATED. PLEASE CONTACT OUR NODAL OFFICER AT 9821034455 IMMEDIATELY.',
    redFlags: [
      'Sent from an ordinary personal 10-digit mobile number instead of an authorized government sender ID (e.g. VM-MSEDCL or VK-BSES).',
      'Artificial urgency ("Tonight at 9:30 PM") designed to induce panic.',
      'Instructions to call an unofficial personal phone number.'
    ],
    safeAction: 'Open your state discom official app or check your paper bill. Never call numbers from alarmist SMS.',
    dangerAction: 'Calling the phone number and installing screen-sharing software (AnyDesk) to "pay ₹10 verification charge".'
  },
  {
    id: 'sim-parttime',
    channel: 'WhatsApp',
    sender: '+1 (555) 019-2831',
    time: 'Yesterday, 2:30 PM',
    content: 'Hello! I am Sarah from Global Talent HR. We reviewed your profile and want to offer you an easy remote job. Just like 3 YouTube videos per day and earn ₹2,500 daily. Reply YES to get your first ₹150 bonus immediately.',
    redFlags: [
      'Unsolicited message from an international virtual number.',
      'Absurdly high pay for trivial actions (liking videos).',
      'Common bait-and-switch scheme to pull victims into prepaid task investments.'
    ],
    safeAction: 'Block and report the contact on WhatsApp without engaging.',
    dangerAction: 'Replying "YES" and joining a Telegram channel where they demand ₹5,000 "crypto activation" deposits.'
  },
  {
    id: 'sim-customs',
    channel: 'Email',
    sender: 'parcel-clearance@fedex-courier-india-support.com',
    time: '10:45 AM',
    content: 'URGENT: Your international parcel #IND-8910 contains prohibited foreign currency. Central Crime Branch has initiated a case against your Aadhaar. Transfer ₹48,000 security bond to RBI clearance account immediately to avoid arrest.',
    redFlags: [
      'Spoofed email domain (`fedex-courier-india-support.com` instead of official corporate domain).',
      'Police or customs authorities NEVER threaten arrest via generic emails demanding bank transfers.',
      'No government or law enforcement agency uses personal "security bond" transfers over UPI.'
    ],
    safeAction: 'Mark as phishing and report to cybercrime.gov.in. Do not reply or send money.',
    dangerAction: 'Believing the threat, panicking, and transferring funds into the scammer’s mule account.'
  }
];
