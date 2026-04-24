export type UseCaseValue =
  | "Managing my own health"
  | "Managing health for parents or elderly"
  | "A healthcare professional"
  | "All of the above";

export interface UseCaseOption {
  label: string;
  value: UseCaseValue;
}

export interface FeatureItem {
  id: string;
  title: string;
  problem: string;
  how: string;
  stat: string;
  visual: string;
  helps: string[];
  technicalDetail: string;
}

export const WAITLIST_USE_CASES: UseCaseOption[] = [
  {
    label: "Managing my own health",
    value: "Managing my own health",
  },
  {
    label: "Managing health for parents or elderly",
    value: "Managing health for parents or elderly",
  },
  {
    label: "A healthcare professional",
    value: "A healthcare professional",
  },
  {
    label: "All of the above",
    value: "All of the above",
  },
];

export const PROBLEM_SCENARIOS = [
  {
    title: "The Emergency Room Scramble",
    text: "Your father is rushed to hospital at 2am. The doctor asks what medications he's on. You have no idea. You're searching through 3-year-old WhatsApp messages trying to find a prescription photo. This is dangerous.",
  },
  {
    title: "The Duplicate Test Problem",
    text: "You visit a new doctor. They order the same blood tests your previous doctor ran last month because there is no way to share your history. You pay twice. You wait twice.",
  },
  {
    title: "The Memory Gap",
    text: "Your mother has been on a medication for 8 months. Neither she nor you can remember what it is for anymore, what dosage she is on, or who prescribed it. The prescription is lost.",
  },
] as const;

export const FEATURES: FeatureItem[] = [
  {
    id: "prescription-intelligence",
    title: "Prescription Intelligence",
    problem: "You can't remember what the doctor prescribed last visit.",
    how: "Photo your prescription or send it via WhatsApp. Cura AI reads even difficult handwriting, extracts medicines, dosage, timing, and flags dangerous combinations.",
    stat: "Reads prescriptions in under 8 seconds",
    visual: "Crumpled prescription scan with structured medicines panel",
    helps: ["Self", "Parents", "Elderly"],
    technicalDetail:
      "OCR and medical entity extraction models normalize medication names, dosage units, and schedules while preserving source image audit trails.",
  },
  {
    id: "health-map",
    title: "Your Complete Health Map",
    problem: "Your health history is scattered across 12 different clinics.",
    how: "Every prescription, lab report, X-ray, and doctor visit becomes one visual timeline. Spot patterns over time and share complete history instantly.",
    stat: "One tap to share with any doctor",
    visual: "Timeline with condition tags, event dates, and doctor visits",
    helps: ["Self", "Parents", "Kids"],
    technicalDetail:
      "A timeline graph links encounters, diagnostics, medications, and symptoms by date to build clinically readable continuity of care.",
  },
  {
    id: "lab-report-analysis",
    title: "AI Lab Report Analysis",
    problem: "You get a lab report but do not know what any value means.",
    how: "Upload blood tests, MRI, ECG, ultrasound, and more. Cura AI explains every marker in plain language, highlights abnormalities, and tracks trends.",
    stat: "Supports 200+ types of medical reports",
    visual: "Report values highlighted with simple plain-language interpretation",
    helps: ["Self", "Parents", "Healthcare Professional"],
    technicalDetail:
      "Reference ranges are mapped to demographic and lab context where available, with explainable summaries and trend-aware follow-up prompts.",
  },
  {
    id: "family-profiles",
    title: "Family Health Profiles",
    problem:
      "You are managing your parents', your kids', and your own health with no system.",
    how: "Use one account with separate family profiles. Grandparents, parents, and children stay organized in one secure place, with caregiver mode for seniors.",
    stat: "Up to 10 family members per account",
    visual: "Family switcher with profile cards and medication snapshots",
    helps: ["Parents", "Elderly", "Kids"],
    technicalDetail:
      "Role-based family access supports caregiver workflows while preserving profile-level permissions, consent boundaries, and activity history.",
  },
  {
    id: "whatsapp-integration",
    title: "WhatsApp Integration",
    problem: "Downloading apps is a barrier, especially for older family members.",
    how: "No app required. Send prescriptions, reports, or voice notes to Cura AI on WhatsApp. Everything is parsed and added to your profile automatically.",
    stat: "Works for non-smartphone users too",
    visual: "WhatsApp chat thread with reports and instant structured summaries",
    helps: ["Parents", "Elderly", "Self"],
    technicalDetail:
      "Message ingestion pipelines process media and voice notes asynchronously, then reconcile extracted data into the same longitudinal health record.",
  },
  {
    id: "wearable-sync",
    title: "Health Band and Wearable Sync",
    problem:
      "Your fitness band data lives in a separate app disconnected from your medical history.",
    how: "Connect Mi Band, Noise, boAt, and Google Fit or Apple Health compatible devices. Vitals and sleep trends layer on top of medical history.",
    stat: "Compatible with 50+ popular health bands",
    visual: "Vitals dashboard with heart rate, SpO2, steps, and sleep overlays",
    helps: ["Self", "Parents", "Elderly"],
    technicalDetail:
      "Time-series ingest aligns wearable telemetry with events like medication changes and diagnoses to surface potentially meaningful correlations.",
  },
  {
    id: "emergency-sos",
    title: "Emergency SOS",
    problem:
      "In emergencies, precious minutes are lost sharing medical history with responders.",
    how: "One tap generates a secure QR code containing critical details: blood group, allergies, current medications, and emergency contacts.",
    stat: "Configured in under 2 minutes",
    visual: "Emergency card with QR code and live caregiver alert",
    helps: ["Parents", "Elderly", "Self"],
    technicalDetail:
      "Emergency payloads are tokenized and time-scoped, enabling controlled access while minimizing exposure of non-essential personal information.",
  },
  {
    id: "second-opinion",
    title: "AI Second Opinion",
    problem: "You want a second opinion but cannot always afford another specialist visit.",
    how: "Describe symptoms or upload a diagnosis. Cura AI gives a detailed, history-aware analysis to help you prepare for a better doctor conversation.",
    stat: "Considers your full history and current medications",
    visual: "Clinical chat summary with symptom and risk interpretation",
    helps: ["Self", "Parents", "Healthcare Professional"],
    technicalDetail:
      "Retrieval-augmented medical reasoning combines current evidence summaries with user history context and explicit safety disclaimers.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload everything you have",
    text: "Prescriptions, lab reports, doctor notes. Photo, PDF, or WhatsApp. Takes about 5 minutes.",
  },
  {
    title: "Your health map builds itself",
    text: "Cura AI reads, organizes, and structures your records into one personal timeline.",
  },
  {
    title: "Your family is protected",
    text: "Share instantly with any doctor. Get alerts. Never scramble in emergencies again.",
  },
] as const;

export const TRUST_ITEMS = [
  "India-first data storage (Mumbai servers)",
  "End-to-end encrypted at rest and in transit",
  "You own your data: export or delete anytime",
  "No selling to insurance companies. Ever.",
] as const;

export const WAITLIST_FAQ = [
  {
    q: "When will Cura AI launch?",
    a: "We are onboarding founding members in batches. Waitlist members get first invites and early product access.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. We are built with encryption, strict access controls, and India-first hosting. You can export or delete your data anytime.",
  },
  {
    q: "Do I need to install an app for my parents?",
    a: "Not necessarily. WhatsApp-based workflows are built for families who prefer minimal setup.",
  },
  {
    q: "Will this replace my doctor?",
    a: "No. Cura AI helps you organize records and understand reports. It is not a substitute for medical diagnosis or treatment.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing is being finalized. Founding members get early access and first access to launch plans.",
  },
  {
    q: "Can healthcare professionals use this too?",
    a: "Yes. Doctors and caregivers can use Cura AI to quickly understand a patient's longitudinal history.",
  },
] as const;

export const FOUNDING_MEMBER_BENEFITS = [
  "Early access before public launch",
  "Founding member badge on your profile",
  "Direct influence on product roadmap",
  "Priority support from the Cura AI team",
] as const;

export const WAITLIST_TESTIMONIALS = [
  {
    initials: "RM",
    quote:
      "My mother has diabetes and hypertension. If Cura AI can keep all her records in one place, this is exactly what our family needs.",
    role: "Caregiver, Bengaluru",
  },
  {
    initials: "AK",
    quote:
      "I lose track of prescriptions across different clinics. A single timeline could save so much confusion.",
    role: "Working professional, Mumbai",
  },
  {
    initials: "DS",
    quote:
      "Anything that helps us walk into appointments better prepared is a huge win for families like ours.",
    role: "Parent, Pune",
  },
] as const;

export const TEAM_PLACEHOLDERS = [
  { name: "Founder", title: "Building from lived family health chaos" },
  { name: "CTO", title: "AI systems and secure health infrastructure" },
  { name: "Medical Advisor", title: "Clinical quality and patient safety" },
] as const;
