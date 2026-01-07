
import React, { useState } from 'react';
import { User, Target, Sparkles, Map, Activity, Brain, Heart, Anchor, Briefcase, CalendarDays, RefreshCw, MessageSquare, FileText, Wallet, Church, Menu } from 'lucide-react';
import { ProtocolConfig, SixFPillar } from '../types';

interface UserProfileProps {
  onMenuClick?: () => void;
  config: ProtocolConfig;
}

const UserProfile: React.FC<UserProfileProps> = ({ onMenuClick, config }) => {
  
  const [activeQuarterIndex, setActiveQuarterIndex] = useState<number>(0);
  const activeQuarter = config.quarterlyRoadmap[activeQuarterIndex] || config.quarterlyRoadmap[0];

  const MOCK_SESSIONS = [
    { id: 1, date: "Oct 24, 2024", title: "Quarterly Review", summary: "Broken down London move timeline. Set visceral fat reduction KPIs." },
    { id: 2, date: "Oct 21, 2024", title: "Bio-Data Review", summary: "Analyzed initial CGM spikes. Adjusted diet for 10% body fat target." },
    { id: 3, date: "Oct 14, 2024", title: "Mindset Sync", summary: "Discussed barriers to daily meditation. Implemented 'habit stacking' with coffee." }
  ];

  const getPillarIcon = (pillar: SixFPillar) => {
      switch(pillar) {
          case 'FITNESS': return <Activity size={18} className="text-rose-500" />;
          case 'FUNCTION': return <Brain size={18} className="text-blue-500" />;
          case 'FAMILY': return <Heart size={18} className="text-purple-500" />;
          case 'FAITH': return <Church size={18} className="text-amber-500" />;
          case 'FINANCES': return <Wallet size={18} className="text-emerald-500" />;
          case 'FUTURE': return <Anchor size={18} className="text-zinc-500" />;
          default: return <Target size={18} className="text-zinc-500" />;
      }
  };

  const getPillarColor = (pillar: SixFPillar) => {
      switch(pillar) {
          case 'FITNESS': return "bg-rose-50 border-rose-100";
          case 'FUNCTION': return "bg-blue-50 border-blue-100";
          case 'FAMILY': return "bg-purple-50 border-purple-100";
          case 'FAITH': return "bg-amber-50 border-amber-100";
          case 'FINANCES': return "bg-emerald-50 border-emerald-100";
          default: return "bg-zinc-50 border-zinc-100";
      }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-meta-bg text-zinc-900 relative">
       {/* Background */}
       <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-white to-transparent opacity-60 pointer-events-none" />

       {/* Mobile Header */}
       <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-bold text-zinc-900 tracking-tight">User Profile</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="p-6 md:p-10 max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Header Profile Card */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-200 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden shrink-0">
                <User size={40} className="text-zinc-400" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">Protocol User</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-zinc-500">
                    <span className="flex items-center gap-1"><Map size={14} /> Target: London, UK</span>
                    <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                    <span className="text-blue-600 font-medium">Phase 2: Strategic Architecture</span>
                </div>
            </div>
        </div>

        {/* SECTION 1: 6 Fs FRAMEWORK */}
        <div>
            <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Target size={20} className="text-zinc-900" />
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900">Strategic Architecture</h2>
                        <p className="text-xs text-zinc-500">6 Fs Framework</p>
                    </div>
                </div>
                
                {/* Quarter Tabs */}
                <div className="flex bg-white rounded-lg p-1 border border-zinc-200 shadow-sm">
                    {config.quarterlyRoadmap.map((q, idx) => (
                        <button
                            key={q.quarter}
                            onClick={() => setActiveQuarterIndex(idx)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                idx === activeQuarterIndex 
                                ? 'bg-zinc-900 text-white shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                            }`}
                        >
                            {q.quarter}
                        </button>
                    ))}
                </div>
            </header>
            
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                         <h3 className="text-2xl font-serif text-zinc-900 italic mb-1">{activeQuarter.theme}</h3>
                         <p className="text-sm text-zinc-500">Reverse Engineered Vision (2026)</p>
                    </div>
                     <div className="flex flex-col md:items-end">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Key Milestones</span>
                        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                            {activeQuarter.milestones.slice(0, 3).map((m, i) => (
                                <span key={i} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase truncate max-w-[150px]">{m}</span>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 border-b border-zinc-100">
                    {activeQuarter.goals.map((goal, idx) => (
                        <div key={idx} className="p-6 hover:bg-zinc-50/50 transition-colors border-b border-zinc-100 lg:border-b-0">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${getPillarColor(goal.category)} border`}>
                                {getPillarIcon(goal.category)}
                            </div>
                            <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wide mb-4">{goal.category}</h4>
                            <ul className="space-y-3">
                                {goal.items.map((item, i) => (
                                    <li key={i} className="text-sm text-zinc-600 leading-relaxed flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* SECTION 2: EXECUTION CYCLES (WEEKLY) */}
        <div className="relative">
             <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CalendarDays size={20} className="text-zinc-900" />
                    <div>
                         <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900">Execution Cycles</h2>
                         <p className="text-xs text-zinc-500">Tight but Loose Framework</p>
                    </div>
                </div>
            </header>

            <div className="hidden lg:block bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-8 border-b border-zinc-100 bg-zinc-50/80">
                    <div className="p-4 text-[10px] font-bold uppercase text-zinc-400">Day</div>
                    <div className="col-span-2 p-4 text-[10px] font-bold uppercase text-rose-500">Body (07:00)</div>
                    <div className="col-span-2 p-4 text-[10px] font-bold uppercase text-blue-500">Mind (19:00)</div>
                    <div className="col-span-2 p-4 text-[10px] font-bold uppercase text-purple-500">Social (Variable)</div>
                    <div className="col-span-1 p-4 text-[10px] font-bold uppercase text-amber-600">Sprint (09:15)</div>
                </div>
                <div className="divide-y divide-zinc-100">
                    {config.weeklyRoutine.map((day) => (
                        <div key={day.day} className="grid grid-cols-8 hover:bg-blue-50/30 transition-colors group">
                             <div className="p-4 py-5 text-xs font-bold text-zinc-900 flex items-center">{day.day}</div>
                             <div className="col-span-2 p-4 py-5 text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-900 border-l border-zinc-50">{day.body}</div>
                             <div className="col-span-2 p-4 py-5 text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-900 border-l border-zinc-50">{day.mind}</div>
                             <div className="col-span-2 p-4 py-5 text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-900 border-l border-zinc-50">{day.social}</div>
                             <div className="col-span-1 p-4 py-5 text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-900 border-l border-zinc-50 font-medium">{day.work}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Coach Role Card */}
            <div className="mt-6 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Sparkles size={20} className="text-blue-300" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Cognitive Behavioral Executive Coaching (CBEC)</h3>
                        <div className="space-y-2 text-sm text-zinc-300 font-light">
                            <p>• <span className="font-medium text-white">Orient:</span> "Visualize the healthiest version of yourself."</p>
                            <p>• <span className="font-medium text-white">Reality Check:</span> Identify limiting thoughts ("Too tired to socialize").</p>
                            <p>• <span className="font-medium text-white">Hypothesis Testing:</span> Treat interventions as experiments.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-zinc-200">
            
            {/* SECTION 3: INTAKE DNA */}
            <div>
                 <header className="mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-zinc-900" />
                    <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900">Intake DNA</h2>
                </header>

                <div className="space-y-4">
                    {config.intakeQuestions.map((q, idx) => (
                        <div key={q.id} className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-bold bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded uppercase">
                                    {q.category}
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-900 mb-2">{q.question}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 4: SESSION ARCHIVE */}
            <div>
                 <header className="mb-6 flex items-center gap-2">
                    <MessageSquare size={20} className="text-zinc-900" />
                    <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900">Session Archive</h2>
                </header>

                <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-zinc-100">
                        {MOCK_SESSIONS.map((session) => (
                            <div key={session.id} className="p-5 hover:bg-zinc-50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">{session.title}</h3>
                                    <span className="text-xs font-mono text-zinc-400">{session.date}</span>
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                                    {session.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;
    