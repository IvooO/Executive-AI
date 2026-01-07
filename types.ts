
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  uiActions?: UIAction[]; // Support multiple widgets per message
}

export type UIActionType = 'CHOICE' | 'SELECT' | 'SLIDER';

export interface UIAction {
  id?: string; // Unique ID for form handling
  type: UIActionType;
  label?: string;
  options?: string[];
  min?: number;
  max?: number;
  completed?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
  messages: Message[];
}

export interface UserMetric {
  label: string;
  value: string | number;
  unit?: string;
  status: 'optimal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  description?: string;
}

export interface DailyCheckIn {
  energy: number; // 1-10
  mood: string;
  bodyFeeling: string;
  socialContactYesterday: boolean;
  notes: string;
  date: string;
}

export enum AppView {
  COMMAND = 'COMMAND', // Unified Dashboard
  CHAT = 'CHAT',       // AI Interface
  CALENDAR = 'CALENDAR', // Weekly Overview
  SETTINGS = 'SETTINGS', // Configuration
  PROFILE = 'PROFILE'    // Read-only Protocol View
}

export interface Insight {
  id: string;
  type: 'intervention' | 'identity' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
}

export interface IdentityEvidence {
  id: string;
  title: string;
  date: string;
  category: 'social' | 'health' | 'mindset';
  type: 'language_shift' | 'action' | 'streak';
  description: string;
}

export interface CoreIdentity {
  statement: string;
  daysActive: number;
  confidenceScore: number; // 0-100
}

export type SixFPillar = 'FAMILY' | 'FINANCES' | 'FUNCTION' | 'FAITH' | 'FITNESS' | 'FUTURE';

export interface StreamItem {
  id: string;
  type: 'flow_sprint' | 'recovery' | 'audit' | 'event';
  title: string;
  description: string;
  time: string;
  isFuture: boolean;
  priority?: 'high' | 'normal';
}

export interface ProtocolSource {
  id: string;
  name: string;
  type: 'pdf' | 'text' | 'url';
  status: 'indexed' | 'processing' | 'error';
  usageIntent: 'REFERENCE' | 'EXPLANATORY' | 'PATTERN';
  dateAdded: string;
}

export interface IntakeQuestion {
  id: string;
  question: string;
  type: 'text' | 'scale_1_10' | 'boolean' | 'multiple_choice';
  category: 'PHYSIOLOGY' | 'PSYCHOLOGY' | 'LOGISTICS';
  required: boolean;
}

export interface LogicRule {
  id: string;
  triggerMetric: string;
  condition: 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS' | 'STAGNANT';
  threshold: string;
  actionType: 'MESSAGE' | 'TASK' | 'ALERT';
  actionPayload: string;
  active: boolean;
}

export interface ProtocolBlock {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  type: 'DEEP_WORK' | 'RECOVERY' | 'PHYSICAL' | 'SOCIAL' | 'SLEEP' | 'ADMIN';
  behaviorMode: 'SILENT' | 'TACTICAL' | 'REFLECTIVE' | 'CONFRONTATIONAL';
  interventionBudget: number; // Max nudges per block
}

// --- NEW PROTOCOL DEVELOPMENT TYPES ---

export interface AuthorityConfig {
    agentName: string;
    domain: 'HEALTH' | 'PERFORMANCE' | 'PSYCHOLOGY' | 'HYBRID';
    horizon: 'DAILY_EXECUTION' | 'QUARTERLY_PERFORMANCE' | 'LIFELONG_LONGEVITY';
    belief: string; 
    customSystemPrompt?: string; // New: Direct override
}

export interface Principle {
    id: string;
    text: string;
    rank: number;
}

export interface WeeklyRoutineItem {
    day: string;
    body: string;
    mind: string;
    social: string;
    work: string;
}

export interface QuarterlyGoal {
    category: SixFPillar; // Updated to 6 Fs
    items: string[];
}

export interface QuarterlyConfig {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    theme: string;
    goals: QuarterlyGoal[];
    milestones: string[];
}

export interface CoachInteractionConfig {
    morningPrompt: string;
    eveningPrompt: string;
    weeklyPrompt?: string;
    eventTriggers: string[];
    frequency: 'HIGH_TOUCH' | 'LOW_TOUCH' | 'ON_DEMAND';
}

export interface ProtocolConfig {
    authority: AuthorityConfig;
    
    // Step 2: Vision
    yearlyVision: string;
    
    // Step 3: Roadmap
    quarterlyRoadmap: QuarterlyConfig[];
    
    // Step 4: Execution
    weeklyRoutine: WeeklyRoutineItem[];
    
    // Step 5: Coach
    interaction: CoachInteractionConfig;
    
    // Legacy support (optional)
    intakeQuestions: IntakeQuestion[];
    logicRules: LogicRule[]; 
}
