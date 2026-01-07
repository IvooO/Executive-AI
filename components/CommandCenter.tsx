
import React, { useState, useRef } from 'react';
import { 
  Zap, Clock, CheckCircle2, AlertCircle, 
  Target, Calendar, Quote, Check, BarChart3, ChevronRight, Battery,
  Star, Timer, Flag, ArrowRight, Watch, Activity, Moon, Heart, UserCheck,
  Upload, FileText, X, RefreshCw, Brain, Loader2, Anchor, LayoutGrid, Dumbbell, Plane, Leaf, Volume2, VolumeX, TrendingUp, Sparkles
} from 'lucide-react';
import { ProtocolConfig } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Types & Data Structures ---

type QuarterKey = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface GoalItem {
    id: string;
    text: string;
    completed: boolean;
}

interface PillarData {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    items: GoalItem[];
}

interface QuarterData {
    title: string;
    subTitle: string; 
    tag: string; 
    description: string;
    image: string;
    completion: number; 
    focusIcon: React.ReactNode;
    focusLabel: string;
    pillars: PillarData[];
}

interface GlobalTarget {
    label: string;
    subLabel: string;
    progress: number; // 0-100
    color: string;
}

// --- INITIAL DATA CONFIGURATION (Colors adjusted for Light Mode) ---

const INITIAL_QUARTERS: Record<QuarterKey, QuarterData> = {
    Q1: {
        title: "Reset & Accelerate",
        subTitle: "Foundation Phase",
        tag: "Active Operations",
        description: "Establishing metabolic flexibility, locking in habits, and preparing the logistical ground for London.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop", // Gym/Workout
        completion: 0,
        focusIcon: <Dumbbell className="text-stone-800" size={20} />,
        focusLabel: "Foundations",
        pillars: [
            {
                id: 'body', title: 'Body & Health', icon: <Dumbbell size={18} />, color: 'bg-emerald-100 text-emerald-800',
                items: [
                    { id: 'b1', text: 'Body fat: 16% → 13–14%', completed: false },
                    { id: 'b2', text: 'Full biomarkers & CGM baseline', completed: false },
                    { id: 'b3', text: 'Strength 3x/week, Zone 2 cardio 4–5x/week', completed: false },
                    { id: 'b4', text: 'Sleep 7.5–8h/night', completed: false },
                    { id: 'b5', text: 'Nutrition: –500–700 kcal/day, high protein', completed: false },
                ]
            },
            {
                id: 'mind', title: 'Mind & Identity', icon: <Brain size={18} />, color: 'bg-purple-100 text-purple-800',
                items: [
                    { id: 'm1', text: 'Daily meditation 10 min', completed: false },
                    { id: 'm2', text: 'Weekly reflection 30 min', completed: false },
                    { id: 'm3', text: 'Start AI coach check-ins', completed: false },
                    { id: 'm4', text: 'Identity language tracking', completed: false },
                ]
            },
            {
                id: 'love', title: 'Relationships & Love', icon: <Heart size={18} />, color: 'bg-rose-100 text-rose-800',
                items: [
                    { id: 'r1', text: 'Human connections ≥3/week', completed: false },
                    { id: 'r2', text: 'One intentional dating interaction/week', completed: false },
                    { id: 'r3', text: 'Weekly coffee/lunch with friends', completed: false },
                    { id: 'r4', text: 'Social exposure: sailing, running club', completed: false },
                ]
            },
            {
                id: 'career', title: 'Career & Lifestyle', icon: <Zap size={18} />, color: 'bg-amber-100 text-amber-800',
                items: [
                    { id: 'c1', text: 'Class A catamaran purchased', completed: false },
                    { id: 'c2', text: 'Sailing lessons restarted', completed: false },
                    { id: 'c3', text: 'Lab AI prototype initial version', completed: false },
                    { id: 'c4', text: 'London prep: networking, legal, tax', completed: false },
                ]
            }
        ]
    },
    Q2: {
        title: "Stabilize & Deepen",
        subTitle: "Growth Phase",
        tag: "Future Protocol",
        description: "Deepening the groove. Increasing intensity in training, narrowing focus in relationships, and validating the startup MVP.",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop", // Sailing
        completion: 0,
        focusIcon: <Anchor className="text-stone-800" size={20} />,
        focusLabel: "Consistency",
        pillars: [
            {
                id: 'body', title: 'Body & Health', icon: <Dumbbell size={18} />, color: 'bg-emerald-100 text-emerald-800',
                items: [
                    { id: 'b1', text: 'Body fat: 13–14% → 11–12%', completed: false },
                    { id: 'b2', text: 'Home lipid/cholesterol checks monthly', completed: false },
                    { id: 'b3', text: 'Marathon training volume increases', completed: false },
                    { id: 'b4', text: 'Strength & recovery maintained', completed: false },
                ]
            },
            {
                id: 'mind', title: 'Mind & Identity', icon: <Brain size={18} />, color: 'bg-purple-100 text-purple-800',
                items: [
                    { id: 'm1', text: 'Daily meditation streak continued', completed: false },
                    { id: 'm2', text: 'Weekly reflection + pattern analysis', completed: false },
                    { id: 'm3', text: 'AI coach event-triggered prompts', completed: false },
                    { id: 'm4', text: 'Cognitive & stress resilience focus', completed: false },
                ]
            },
            {
                id: 'love', title: 'Relationships & Love', icon: <Heart size={18} />, color: 'bg-rose-100 text-rose-800',
                items: [
                    { id: 'r1', text: 'Deepen selected relationships', completed: false },
                    { id: 'r2', text: 'Fewer dates, higher intentionality', completed: false },
                    { id: 'r3', text: 'Regular friend 1-on-1s', completed: false },
                    { id: 'r4', text: 'Vulnerability & shared experiences', completed: false },
                ]
            },
            {
                id: 'career', title: 'Career & Lifestyle', icon: <Zap size={18} />, color: 'bg-amber-100 text-amber-800',
                items: [
                    { id: 'c1', text: 'Lab AI tool implementation', completed: false },
                    { id: 'c2', text: 'Startup MVP initial experiments', completed: false },
                    { id: 'c3', text: 'Sailing integrated into weekly schedule', completed: false },
                    { id: 'c4', text: 'London preparation continues', completed: false },
                ]
            }
        ]
    },
    Q3: {
        title: "Peak & Bond",
        subTitle: "Performance Phase",
        tag: "Future Protocol",
        description: "The performance peak. Hitting physical targets, executing the marathon, and consolidating social bonds.",
        image: "https://images.unsplash.com/photo-1552674605-46d53b036979?q=80&w=2070&auto=format&fit=crop", // Marathon / Running
        completion: 0,
        focusIcon: <TrendingUp className="text-stone-800" size={20} />,
        focusLabel: "Performance",
        pillars: [
            {
                id: 'body', title: 'Body & Health', icon: <Dumbbell size={18} />, color: 'bg-emerald-100 text-emerald-800',
                items: [
                    { id: 'b1', text: 'Body fat target reached: 10–11%', completed: false },
                    { id: 'b2', text: 'Marathon peak training completed', completed: false },
                    { id: 'b3', text: 'Visceral fat optimized', completed: false },
                    { id: 'b4', text: 'Biomarker re-check if needed', completed: false },
                ]
            },
            {
                id: 'mind', title: 'Mind & Identity', icon: <Brain size={18} />, color: 'bg-purple-100 text-purple-800',
                items: [
                    { id: 'm1', text: 'Daily meditation, post-marathon reflection', completed: false },
                    { id: 'm2', text: 'Identity reinforced by achievements', completed: false },
                    { id: 'm3', text: 'AI coach continues mentor guidance', completed: false },
                ]
            },
            {
                id: 'love', title: 'Relationships & Love', icon: <Heart size={18} />, color: 'bg-rose-100 text-rose-800',
                items: [
                    { id: 'r1', text: 'Shared experiences: trips, sailing', completed: false },
                    { id: 'r2', text: 'Romantic prospect relationship development', completed: false },
                    { id: 'r3', text: 'Social & adventure consolidation', completed: false },
                ]
            },
            {
                id: 'career', title: 'Career & Lifestyle', icon: <Zap size={18} />, color: 'bg-amber-100 text-amber-800',
                items: [
                    { id: 'c1', text: 'Startup MVP or pilot live', completed: false },
                    { id: 'c2', text: 'London network active', completed: false },
                    { id: 'c3', text: 'Sailing & catamaran regular usage', completed: false },
                    { id: 'c4', text: 'Career leverage through lab & AI recognized', completed: false },
                ]
            }
        ]
    },
    Q4: {
        title: "Integrate & Commit",
        subTitle: "Integration Phase",
        tag: "Future Protocol",
        description: "Integration. Deciding on the relationship, executing the move, and setting the stage for 2027.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop", // London
        completion: 0,
        focusIcon: <Target className="text-stone-800" size={20} />,
        focusLabel: "Decisions",
        pillars: [
            {
                id: 'body', title: 'Body & Health', icon: <Dumbbell size={18} />, color: 'bg-emerald-100 text-emerald-800',
                items: [
                    { id: 'b1', text: 'Body fat maintained ~10%', completed: false },
                    { id: 'b2', text: 'Full biomarker panel Q4', completed: false },
                    { id: 'b3', text: 'Long-term nutrition & training plan locked', completed: false },
                ]
            },
            {
                id: 'mind', title: 'Mind & Identity', icon: <Brain size={18} />, color: 'bg-purple-100 text-purple-800',
                items: [
                    { id: 'm1', text: 'Meditation = core identity', completed: false },
                    { id: 'm2', text: 'Full year reflection', completed: false },
                    { id: 'm3', text: 'Pattern recognition & adjustments', completed: false },
                    { id: 'm4', text: 'Prepare mindset for 2027 goals', completed: false },
                ]
            },
            {
                id: 'love', title: 'Relationships & Love', icon: <Heart size={18} />, color: 'bg-rose-100 text-rose-800',
                items: [
                    { id: 'r1', text: 'Relationship decision: commit or reset', completed: false },
                    { id: 'r2', text: 'Shared routines established', completed: false },
                    { id: 'r3', text: 'Maintain deep friendships', completed: false },
                ]
            },
            {
                id: 'career', title: 'Career & Lifestyle', icon: <Zap size={18} />, color: 'bg-amber-100 text-amber-800',
                items: [
                    { id: 'c1', text: 'Startup decision (scale/pause/pivot)', completed: false },
                    { id: 'c2', text: 'London move executed or staged', completed: false },
                    { id: 'c3', text: 'Long-term career plan aligned', completed: false },
                    { id: 'c4', text: 'Sailing & lifestyle routines stable', completed: false },
                ]
            }
        ]
    }
};

const GLOBAL_TARGETS: GlobalTarget[] = [
    { label: 'Body Fat', subLabel: '10%', progress: 15, color: '#10b981' }, // Emerald
    { label: 'Marathon', subLabel: 'Completed', progress: 30, color: '#10b981' },
    { label: 'Biomarkers', subLabel: 'Optimized', progress: 5, color: '#10b981' },
    { label: 'Relationship', subLabel: 'Trajectory', progress: 10, color: '#f43f5e' }, // Rose
    { label: 'Class A Cat', subLabel: 'Owned', progress: 20, color: '#3b82f6' }, // Blue
    { label: 'London', subLabel: 'Moved', progress: 15, color: '#3b82f6' },
    { label: 'AI Lab', subLabel: 'Leader', progress: 25, color: '#3b82f6' },
    { label: 'Meditation', subLabel: 'Daily', progress: 40, color: '#8b5cf6' }, // Purple
];

// Reusable Circular Progress (Light Mode)
const CircularProgress = ({ progress, color }: { progress: number, color: string }) => {
    const data = [
        { name: 'Completed', value: progress },
        { name: 'Remaining', value: 100 - progress },
    ];
    return (
        <div className="w-14 h-14 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={26}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell key="cell-0" fill={color} />
                        <Cell key="cell-1" fill="#e7e5e4" /> 
                    </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[10px] font-bold text-stone-400">{progress}%</span>
             </div>
        </div>
    );
};

interface BSLIScore {
    total: number;
    status: 'Optimal' | 'Moderate' | 'High Load' | 'Burnout Risk';
    insight: string;
    metrics: {
        hrvScore: number;
        rhrScore: number;
        sleepScore: number;
        activityScore: number;
        mindScore: number;
    }
}

interface BSLIInputData {
    hrvCurrent: number;
    hrvBaseline: number;
    rhrCurrent: number;
    rhrBaseline: number;
    sleepDuration: number; // hours
    respRateStable: boolean;
    activityBalance: 'balanced' | 'under_recovered' | 'overtaxed';
    mindfulnessState: 'regulated' | 'reactive' | 'drained';
}

interface CommandCenterProps {
  config: ProtocolConfig;
  onNavigateToChat: () => void;
  onNavigateToSettings: () => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ config, onNavigateToChat, onNavigateToSettings }) => {
  const [activeTab, setActiveTab] = useState<QuarterKey>('Q1');
  const [quarterData, setQuarterData] = useState<Record<QuarterKey, QuarterData>>(INITIAL_QUARTERS);
  
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Derived current state
  const currentQ = quarterData[activeTab];

  // BSLI Logic integration
  const [bsli, setBsli] = useState<BSLIScore>({
      total: 84,
      status: 'Moderate',
      insight: 'Maintain load. Prioritize sleep tonight.',
      metrics: { hrvScore: 25, rhrScore: 20, sleepScore: 10, activityScore: 20, mindScore: 9 }
  });

  const handleBsliUpdate = (newScore: BSLIScore) => {
      setBsli(newScore);
      setIsScannerOpen(false);
  };

  const toggleItem = (quarter: QuarterKey, pillarId: string, itemId: string) => {
      setQuarterData(prev => {
          const qData = prev[quarter];
          const newPillars = qData.pillars.map(p => {
              if (p.id !== pillarId) return p;
              return {
                  ...p,
                  items: p.items.map(i => i.id === itemId ? { ...i, completed: !i.completed } : i)
              };
          });
          return {
              ...prev,
              [quarter]: { ...qData, pillars: newPillars }
          };
      });
  };

  const calculateCompletion = (q: QuarterKey) => {
      const allItems = quarterData[q].pillars.flatMap(p => p.items);
      const completed = allItems.filter(i => i.completed).length;
      return allItems.length > 0 ? Math.round((completed / allItems.length) * 100) : 0;
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#F9F7F2] text-stone-900 p-6 md:p-10 relative font-sans">
        
        {/* HEADER: Clean & Minimal */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-10 pb-6 border-b border-stone-200">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center shadow-md">
                     <Target className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-stone-900">Master Plan <span className="text-stone-400 font-light">2026</span></h1>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Protocol Active</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 max-w-4xl justify-between items-center px-4 xl:px-12 gap-8">
                 <div className="hidden md:block">
                     <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Body Fat</div>
                     <div className="text-lg font-serif font-medium text-stone-900">16% <span className="text-stone-400 text-sm">→</span> 10%</div>
                 </div>
                 <div className="hidden md:block w-px h-10 bg-stone-200" />
                 <div className="hidden md:block">
                     <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Marathon</div>
                     <div className="text-lg font-serif font-medium text-stone-900">T-Minus 210 Days</div>
                 </div>
                 <div className="hidden md:block w-px h-10 bg-stone-200" />
                 <div className="hidden md:block">
                     <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Visceral Fat</div>
                     <div className="text-lg font-serif font-medium text-rose-600">Reducing</div>
                 </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsScannerOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm rounded-full text-xs font-bold tracking-widest uppercase transition-all text-stone-600"
                >
                    <Activity size={14} /> Biomarkers
                </button>
            </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
            
            {/* TIMELINE NAVIGATION (Sidebar style) */}
            <div className="w-full lg:w-48 shrink-0 flex flex-col gap-8">
                <div>
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 pl-1">Timeline</h3>
                    <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                        {(['Q1', 'Q2', 'Q3', 'Q4'] as QuarterKey[]).map((q) => (
                            <button
                                key={q}
                                onClick={() => setActiveTab(q)}
                                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all relative shrink-0 ${
                                    activeTab === q 
                                    ? 'bg-stone-900 text-white shadow-md' 
                                    : 'text-stone-500 hover:text-stone-900 hover:bg-white'
                                }`}
                            >
                                <span className="flex items-center justify-between w-full">
                                    {q}
                                    {activeTab === q && <ChevronRight size={14} className="opacity-50" />}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto hidden lg:block">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 pl-1">Tools</h3>
                    <button 
                        onClick={onNavigateToChat}
                        className="w-full text-left p-4 rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all group"
                    >
                         <div className="flex items-center gap-3 mb-2">
                             <div className="p-2 bg-stone-100 rounded-lg text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                                <Sparkles size={18} />
                             </div>
                             <span className="font-serif font-bold text-stone-900">AI Coach</span>
                         </div>
                         <p className="text-xs text-stone-500 leading-relaxed">
                             Generate daily reflection & identity insight.
                         </p>
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 space-y-8">
                
                {/* HERO CARD (Magazine Style) */}
                <div className="w-full rounded-3xl bg-white p-2 shadow-sm border border-stone-200">
                    <div className="relative rounded-[20px] overflow-hidden bg-stone-100 min-h-[320px] flex flex-col md:flex-row">
                        {/* Image Side */}
                        <div className="md:w-1/2 relative h-64 md:h-auto">
                            <img 
                                src={currentQ.image} 
                                alt={currentQ.title} 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
                        </div>
                        
                        {/* Content Side */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FDFBF7]">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-stone-900" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{currentQ.tag}</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 leading-tight">
                                {currentQ.title}
                            </h2>
                            
                            <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light mb-8">
                                {currentQ.description}
                            </p>

                            <div className="flex items-center gap-8 border-t border-stone-200 pt-6">
                                <div>
                                     <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Completion</div>
                                     <div className="text-2xl font-serif text-stone-900">{calculateCompletion(activeTab)}%</div>
                                </div>
                                <div className="w-px h-10 bg-stone-200" />
                                <div>
                                     <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Focus</div>
                                     <div className="flex items-center gap-2 text-stone-900 font-medium">
                                        {currentQ.focusIcon} {currentQ.focusLabel}
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PILLAR GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentQ.pillars.map((pillar) => (
                        <div key={pillar.id} className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl ${pillar.color} bg-opacity-30`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="font-serif font-bold text-xl text-stone-900">{pillar.title}</h3>
                            </div>
                            <div className="space-y-4">
                                {pillar.items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => toggleItem(activeTab, pillar.id, item.id)}
                                        className="flex items-start gap-3 group cursor-pointer"
                                    >
                                        <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                                            item.completed 
                                            ? 'bg-stone-900 border-stone-900 text-white' 
                                            : 'border-stone-300 bg-white group-hover:border-stone-400'
                                        }`}>
                                            {item.completed && <Check size={12} />}
                                        </div>
                                        <p className={`text-sm leading-relaxed transition-colors ${
                                            item.completed ? 'text-stone-400 line-through' : 'text-stone-700'
                                        }`}>
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* GLOBAL TARGETS */}
                <div className="pt-8 border-t border-stone-200">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-stone-900">Global 2026 Targets</h2>
                            <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Real-Time Tracking</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GLOBAL_TARGETS.map((target, idx) => (
                            <div key={idx} className="bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                                <CircularProgress progress={target.progress} color={target.color} />
                                <div>
                                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">{target.label}</div>
                                    <div className="text-base font-serif font-bold text-stone-900">{target.subLabel}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        {/* BSLI SCANNER MODAL */}
        {isScannerOpen && <BSLIScannerModal onClose={() => setIsScannerOpen(false)} onUpdate={handleBsliUpdate} />}

    </div>
  );
};

// --- BSLI SCANNER COMPONENT ---

const BSLIScannerModal: React.FC<{ onClose: () => void, onUpdate: (score: BSLIScore) => void }> = ({ onClose, onUpdate }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [step, setStep] = useState<'UPLOAD' | 'PARSING' | 'VERIFY'>('UPLOAD');
    const [data, setData] = useState<BSLIInputData>({
        hrvCurrent: 42, hrvBaseline: 45, rhrCurrent: 52, rhrBaseline: 50,
        sleepDuration: 7.2, respRateStable: true, activityBalance: 'balanced', mindfulnessState: 'regulated'
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setStep('PARSING');
            setTimeout(() => {
                setData({
                    hrvCurrent: Math.floor(35 + Math.random() * 20), hrvBaseline: 45,
                    rhrCurrent: Math.floor(48 + Math.random() * 10), rhrBaseline: 50,
                    sleepDuration: Number((5.5 + Math.random() * 3).toFixed(1)), respRateStable: Math.random() > 0.3,
                    activityBalance: Math.random() > 0.5 ? 'balanced' : 'under_recovered',
                    mindfulnessState: Math.random() > 0.5 ? 'regulated' : 'reactive'
                });
                setStep('VERIFY');
            }, 2000);
        }
    };

    const calculateScore = () => {
        const total = 82; 
        onUpdate({ 
            total, status: 'Moderate', insight: 'Data processed.', 
            metrics: { hrvScore: 20, rhrScore: 20, sleepScore: 10, activityScore: 20, mindScore: 12 } 
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 animate-fade-in font-sans">
            <div className="bg-[#FDFBF7] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up text-stone-900 border border-stone-200">
                <div className="px-8 py-6 border-b border-stone-200 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-100 rounded-lg">
                            <Activity size={20} className="text-stone-700" />
                        </div>
                        <h2 className="font-serif font-bold text-xl text-stone-900">Biomarker Analysis</h2>
                    </div>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                {step === 'UPLOAD' && (
                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-8">
                         <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
                            <Activity size={32} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-bold text-stone-900">Import Health Data</h3>
                            <p className="text-stone-500 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
                                Securely upload your Oura or Whoop export to calculate your readiness score.
                            </p>
                        </div>
                        <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold shadow-lg hover:bg-stone-800 transition-all tracking-wide">
                             <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                             Select File
                        </button>
                    </div>
                )}
                
                {step === 'PARSING' && (
                     <div className="p-16 flex flex-col items-center justify-center text-center space-y-6">
                        <Loader2 size={48} className="text-stone-900 animate-spin" />
                        <h3 className="text-lg font-serif font-bold text-stone-900">Analyzing Biometrics...</h3>
                     </div>
                )}
                
                {step === 'VERIFY' && (
                    <div className="p-10 text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                             <CheckCircle2 size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-3 text-stone-900">Data Verified</h3>
                        <p className="text-stone-500 mb-8 text-sm">Biomarkers extracted successfully.</p>
                        <button onClick={calculateScore} className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all">
                            Update Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommandCenter;
