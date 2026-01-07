
import React from 'react';
import { Target, Flag, CalendarDays, CheckSquare, ArrowRight, Menu, Zap, Repeat, TrendingUp, AlertCircle, BarChart3, LayoutGrid } from 'lucide-react';
import { SixFPillar } from '../types';

interface StrategicGoal {
  id: string;
  pillar: SixFPillar;
  text: string;
  status: 'done' | 'track' | 'risk';
}

const VISION_GOALS: StrategicGoal[] = [
  { id: '1', pillar: 'FITNESS', text: '10% Body Fat (Bio-Optimized)', status: 'track' },
  { id: '2', pillar: 'FUNCTION', text: 'AI Lab + Successful Startup', status: 'track' },
  { id: '3', pillar: 'FAMILY', text: 'Meaningful Relationship + London Move', status: 'risk' },
  { id: '4', pillar: 'FINANCES', text: 'Startup Capital / Liquidity', status: 'track' }
];

const WEEKLY_EXECUTION: StrategicGoal[] = [
  { id: '1', pillar: 'FITNESS', text: '90-min Strength/Zone 2 x5', status: 'track' },
  { id: '2', pillar: 'FAMILY', text: '3rd Social Touchpoint (Gap Analysis)', status: 'risk' },
  { id: '3', pillar: 'FUNCTION', text: 'AI Prototype Sprint v0.1', status: 'done' }
];

const PILLARS: {key: SixFPillar, label: string, color: string}[] = [
    { key: 'FAMILY', label: 'Family/Social', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { key: 'FINANCES', label: 'Finances', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { key: 'FUNCTION', label: 'Function/Work', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { key: 'FAITH', label: 'Faith/Mind', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { key: 'FITNESS', label: 'Fitness/Body', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    { key: 'FUTURE', label: 'Future Vision', color: 'bg-zinc-100 text-zinc-700 border-zinc-200' },
];

interface MasterPlanProps {
  onMenuClick?: () => void;
}

const MasterPlan: React.FC<MasterPlanProps> = ({ onMenuClick }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-meta-bg text-zinc-900 relative">
      <div className="absolute top-0 left-0 right-0 h-64 bg-subtle-glow opacity-60 pointer-events-none" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-bold text-zinc-900 tracking-tight">Strategic Architecture</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        
        {/* Phase 1: Diagnostic Audit Status */}
        <div className="mb-10">
           <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-zinc-900 rounded-md border border-zinc-700 shadow-sm">
                        <LayoutGrid size={16} className="text-white" />
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                        Phase 1: 360° Diagnostic Audit (6 Fs)
                    </h2>
               </div>
               <span className="text-xs font-mono text-zinc-400">Review Cycle: Friday</span>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {PILLARS.map(p => (
                    <div key={p.key} className={`p-3 rounded-xl border ${p.color} bg-opacity-50 flex flex-col items-center text-center justify-center gap-1 transition-transform hover:scale-105 cursor-default`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Pillar</span>
                        <span className="font-semibold text-sm">{p.label.split(' ')[0]}</span>
                    </div>
                ))}
           </div>
        </div>

        {/* Phase 4: Discipline Loop (Feedback) */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-rose-500 bg-white shadow-sm">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Repeat size={80} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-100 uppercase tracking-wide">Gap Analysis</span>
                    <span className="text-[10px] text-zinc-400 font-mono">FITNESS DEVIATION</span>
                </div>
                <h3 className="font-medium text-xl text-zinc-900 mb-2">Visceral Fat Stall</h3>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed font-normal max-w-sm">
                    Cortisol is inhibiting fat loss. You are "powering through" startup stress rather than recovering.
                    <span className="block mt-2 text-zinc-900 font-medium">Correction: Prioritize sleep > late night work.</span>
                </p>
                <button className="bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Adjust Plan</button>
            </div>

            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group border-l-4 border-l-purple-500 bg-white shadow-sm">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={80} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100 uppercase tracking-wide">Hypothesis Testing</span>
                    <span className="text-[10px] text-zinc-400 font-mono">RELATIONSHIP GUARDRAIL</span>
                </div>
                <h3 className="font-medium text-xl text-zinc-900 mb-2">Isolation Detected</h3>
                <p className="text-sm text-zinc-600 mb-6 leading-relaxed font-normal max-w-sm">
                    You haven't had a deep conversation in 5 days. 
                    <span className="block mt-2 text-zinc-900 font-medium">Task: One real conversation today. No performance.</span>
                </p>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
                    View Data <ArrowRight size={14} />
                </button>
            </div>
        </div>

        <div className="h-px bg-zinc-200 w-full mb-10" />

        {/* Phase 2: Strategic Life Architecture */}
        <header className="mb-8">
          <h2 className="text-3xl font-semibold mb-2 flex items-center gap-3 text-zinc-900">
            <Target size={28} className="text-zinc-900" />
            Strategic Architecture
          </h2>
          <p className="text-zinc-500 font-light">Systems Thinking & Reverse Engineering</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Vision Column */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-zinc-500 mb-2 pl-1">
                <Flag size={14} />
                <span className="text-xs font-bold tracking-widest uppercase">Ideal Future Vision</span>
             </div>
             <div className="glass-card rounded-2xl p-1 h-full bg-white shadow-sm">
                <div className="space-y-1 p-2">
                   {VISION_GOALS.map(goal => (
                      <GoalCard key={goal.id} item={goal} />
                   ))}
                </div>
             </div>
          </div>

          {/* Current Execution Column */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-zinc-500 mb-2 pl-1">
                <CheckSquare size={14} />
                <span className="text-xs font-bold tracking-widest uppercase">Execution Cycle (Sprint)</span>
             </div>
             <div className="glass-card rounded-2xl p-5 h-full border-blue-200 shadow-sm bg-blue-50/50">
                <div className="flex justify-between items-center mb-6">
                   <p className="text-sm text-zinc-500 font-medium">Sprint 3 <span className="text-zinc-400 font-normal">/ Q1</span></p>
                   <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">In Flow</span>
                </div>
                <div className="space-y-2">
                   {WEEKLY_EXECUTION.map(goal => (
                      <GoalCard key={goal.id} item={goal} isCheckable />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoalCard: React.FC<{ item: StrategicGoal, isCheckable?: boolean, transparent?: boolean }> = ({ item, isCheckable, transparent }) => {
   const statusColor = item.status === 'done' ? 'text-emerald-500' : item.status === 'risk' ? 'text-rose-500' : 'text-blue-500';
   const icon = item.status === 'done' ? <TrendingUp size={14} /> : item.status === 'risk' ? <AlertCircle size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />;
   
   const getPillarLabel = (p: SixFPillar) => {
       const map: Record<string, string> = { FITNESS: 'FIT', FAMILY: 'FAM', FINANCES: 'FIN', FUNCTION: 'WRK', FAITH: 'MND', FUTURE: 'VIS' };
       return map[p] || p;
   }

   return (
      <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${transparent ? '' : 'hover:bg-zinc-50'}`}>
         {/* Pillar Tag */}
         <div className="w-8 h-8 rounded flex items-center justify-center bg-zinc-100 text-[10px] font-bold text-zinc-400 border border-zinc-200 shrink-0">
             {getPillarLabel(item.pillar)}
         </div>

         <div className="flex-1">
            <p className={`text-sm transition-colors leading-relaxed ${item.status === 'done' ? 'text-zinc-400 line-through' : 'text-zinc-600 group-hover:text-zinc-900 font-normal'}`}>
               {item.text}
            </p>
         </div>

         <div className={`${statusColor}`}>
            {isCheckable ? (
               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${item.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-300 hover:border-zinc-400 bg-white'}`}>
                  {item.status === 'done' && <CheckSquare size={10} />}
               </div>
            ) : icon}
         </div>
      </div>
   );
}

export default MasterPlan;
