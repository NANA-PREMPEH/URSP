export interface SuccessStory {
  id: string;
  name: string;
  country: string;
  targetMajor: string;
  degree: "Bachelors" | "Masters" | "PhD";
  university: string;
  fundingAmount: string;
  assistantshipType?: string;
  fundingPercent: 100 | number;
  storySummary: string;
  awardYear: string;
}

export interface TrackerTask {
  id: string;
  title: string;
  category: "General" | "Academics" | "Tests" | "Essays" | "Visa" | "Financials";
  description: string;
  isCompleted: boolean;
  notes?: string;
  recommendedMonth?: string;
}

export interface VisaQuestion {
  id: string;
  question: string;
  category: string;
  focusTip: string;
  exampleStrongText: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: "Founder & Director" | "Coordinator";
  title: string;
  university: string;
  expertise: string[];
  bio: string;
  quote?: string;
  linkedIn?: string;
  email?: string;
}
