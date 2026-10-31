import type { SafetyTip } from '../types';

export const SAFETY_TIPS: SafetyTip[] = [
  {
    id: 'tip-personal-1',
    category: 'Personal',
    title: 'Situational Awareness in Unfamiliar Areas',
    summary: 'Keeping sensory awareness active in isolated or poorly lit areas minimizes surprise vulnerability.',
    actionPoints: [
      'Avoid walking with noise-canceling headphones over both ears in dark alleys or desolate bus stops.',
      'Walk with an upright, purposeful posture and keep your phone in your pocket, not actively scrolling.',
      'If you suspect someone is following you on foot, cross the street, enter a lighted shop or pharmacy, and alert the shopkeeper.'
    ],
    realWorldScenario: 'Walking back from a late coaching class: stay on main lighted commercial avenues rather than taking unlit shortcuts through vacant plots.'
  },
  {
    id: 'tip-womens-1',
    category: 'Women\'s',
    title: 'Safety Precautions During Cab & Auto Rides',
    summary: 'Verification protocols before and during private hire transit, especially during late hours.',
    actionPoints: [
      'Always verify the cab registration plate and driver name against the app before sitting inside.',
      'Share live ride tracking with a family member or friend via WhatsApp or ride-hailing app.',
      'Check that child locks are disabled on the rear doors before closing, and keep your window rolled down a couple of inches.',
      'If the driver deviates onto an unauthorized route, demand an immediate halt at the nearest populated junction or dial 112.'
    ],
    realWorldScenario: 'Taking an airport or railway station cab after 10:00 PM: confirm driver details, share live ride link, and sit behind the driver to maintain visible oversight.'
  },
  {
    id: 'tip-travel-1',
    category: 'Travel',
    title: 'Protecting Valuables & Identity on Long-Distance Trains',
    summary: 'Practical precautions for train travel and bus transits across state borders.',
    actionPoints: [
      'Chain and padlock luggage beneath lower berths; avoid leaving bags untethered near train vestibules.',
      'Never accept open food, unpackaged beverages, or confectionery from strangers (beware of drugging gangs).',
      'Keep your original ID documents in a discreet inner pouch and carry digital copies on DigiLocker.'
    ],
    realWorldScenario: 'During overnight sleeper journeys: keep your handbag or laptop bag under your pillow rather than on luggage racks near compartment doors.'
  },
  {
    id: 'tip-public-transport-1',
    category: 'Public Transport',
    title: 'Navigating Crowded Metros and Local Buses',
    summary: 'Tactical positioning to deter pickpocketing and harassment in crowded public transit.',
    actionPoints: [
      'Wear backpacks on your chest when entering crowded metro coaches or suburban trains.',
      'Keep wallets and mobile phones in front trouser pockets with tight hems, never rear pockets.',
      'Locate emergency talk-back units (PEB - Passenger Emergency Alarm) inside metro trains in case of unruly behavior.'
    ],
    realWorldScenario: 'Boarding a peak-hour suburban train: secure phone in zip compartment, position near central coach poles, and avoid lingering near open exit footboards.'
  },
  {
    id: 'tip-online-1',
    category: 'Online',
    title: 'Defending Personal Privacy on Public Wi-Fi Networks',
    summary: 'Preventing packet sniffing and credential theft on open airport, café, and railway Wi-Fi networks.',
    actionPoints: [
      'Avoid logging into bank accounts or conducting credit card transactions on unsecured public Wi-Fi hotspots.',
      'Turn off automatic Wi-Fi reconnect settings on your smartphone to avoid rogue honeypot networks.',
      'Ensure the browser displays HTTPS and a padlock icon for every visited webpage.'
    ],
    realWorldScenario: 'Waiting at a railway station: use cellular 4G/5G mobile hotspot for net banking rather than free open public railway Wi-Fi.'
  },
  {
    id: 'tip-home-1',
    category: 'Home',
    title: 'Verification Protocols for Domestic Staff & Delivery Agents',
    summary: 'Essential home safety checks for independent houses and apartment dwellers.',
    actionPoints: [
      'Insist on police verification for full-time domestic helpers, drivers, and security guards.',
      'Install a digital peephole or wide-angle door camera; never open the door to delivery agents before checking their courier package label.',
      'Keep emergency telephone numbers (112, society security intercom, local doctor) pinned prominently near the front door.'
    ],
    realWorldScenario: 'An unknown delivery agent knocks claiming a COD parcel for your neighbor: inspect ID through the peephole and call the neighbor before opening the security latch.'
  },
  {
    id: 'tip-student-1',
    category: 'Student',
    title: 'Anti-Ragging Rights & Safe Campus Onboarding',
    summary: 'Clear demarcation between harmless ice-breaking and prohibited institutional ragging.',
    actionPoints: [
      'Know that forcing you to perform degrading acts, clean senior rooms, or surrender belongings is punishable under UGC Anti-Ragging regulations.',
      'Save the National Anti-Ragging Helpline 1800-180-5522 in your phone before college commences.',
      'Grievances can be filed confidentially without disclosing your room number or personal identity.'
    ],
    realWorldScenario: 'Senior students summon first-year students after midnight to perform humiliation drills: document times, report promptly to the hostel warden and UGC portal.'
  },
  {
    id: 'tip-emergency-prep-1',
    category: 'Emergency Preparedness',
    title: 'Building a 72-Hour Urban Disaster Preparedness Kit',
    summary: 'Readiness measures for monsoon urban flooding, power grid failure, or seismic events.',
    actionPoints: [
      'Assemble a waterproof kit containing 3 days of non-perishable food, water purification tablets, and essential prescription medications.',
      'Include a high-lumen torch, extra batteries, fully charged 20,000mAh power bank, and a basic first-aid kit.',
      'Store laminated photocopies of Aadhaar, insurance policies, and property deeds in a sealed dry-bag.'
    ],
    realWorldScenario: 'During heavy monsoon waterlogging or cyclone warnings: ensure mobile phones and backup batteries are charged at 100% and keep emergency medicines readily accessible.'
  }
];

export const SAFETY_CHECKLIST = [
  { id: 'sc-1', label: '112, 1930 and 108 saved in phone contacts with speed-dial', category: 'Emergency' },
  { id: 'sc-2', label: 'DigiLocker installed with verified Aadhaar and Driving License', category: 'Digital Identity' },
  { id: 'sc-3', label: 'Two-Factor Authentication (2FA) active on WhatsApp, Gmail, and Instagram', category: 'Cyber' },
  { id: 'sc-4', label: 'UPI transaction limits configured to avoid excessive exposure', category: 'Finance' },
  { id: 'sc-5', label: 'Location sharing enabled with family for late night travel', category: 'Travel' },
  { id: 'sc-6', label: 'Basic first-aid kit and torch readily available at home', category: 'Home' }
];
