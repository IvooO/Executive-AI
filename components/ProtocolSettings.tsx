
import React, { useState } from 'react';
import { 
  Save, Target, Layout, Bot, Sparkles, FileText, Calendar, Flag
} from 'lucide-react';
import { ProtocolConfig, QuarterlyConfig } from '../types';

interface ProtocolSettingsProps {
  onMenuClick?: () => void;
  config: ProtocolConfig;
  onSave: (config: ProtocolConfig) => void;
}

type SettingsTab = 'GOALS' | 'BEHAVIOR' | 'QUARTERLY' | 'MILESTONES';

const ProtocolSettings: React.FC<ProtocolSettingsProps> = ({ onMenuClick, config, onSave }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('GOALS');
  const [localConfig, setLocalConfig] = useState<ProtocolConfig>(config);
  
  const handleSave = () => {
      onSave(localConfig);
  };

  const updateAuthority = (key: string, value: string) => {
      setLocalConfig(prev => ({
          ...prev,
          authority: { ...prev.authority, [key]: value }
      }));
  };

  // Helper for Quarter Updates (Targeting Q1/Index 0 for now)
  const currentQuarterIdx = 0;
  const currentQuarter = localConfig.quarterlyRoadmap[currentQuarterIdx];

  const updateQuarterly = (updates: Partial<QuarterlyConfig>) => {
      const newRoadmap = [...localConfig.quarterlyRoadmap];
      newRoadmap[currentQuarterIdx] = { ...newRoadmap[currentQuarterIdx], ...updates };
      setLocalConfig({ ...localConfig, quarterlyRoadmap: newRoadmap });
  };

  const updateGoalItems = (categoryIndex: number, text: string) => {
      const items = text.split('\n').filter(i => i.trim() !== '');
      const newGoals = [...currentQuarter.goals];
      newGoals[categoryIndex] = { ...newGoals[categoryIndex], items };
      updateQuarterly({ goals: newGoals });
  };

  const updateMilestones = (text: string) => {
      const milestones = text.split('\n').filter(i => i.trim() !== '');
      updateQuarterly({ milestones });
  };

  return (
    <div className="flex-1 h-full overflow-hidden bg-[#F9F9F9] text-zinc-900 flex flex-col md:flex-row font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-full md:w-64 bg-white border-r border-zinc-200 flex-shrink-0 flex flex-col shadow-sm z-20">
          <div className="p-5 flex items-center gap-3 border-b border-zinc-100">
             <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-md">
                <Layout size={16} fill="white" className="text-zinc-900" />
             </div>
             <div>
                <h2 className="text-sm font-bold tracking-tight text-zinc-900 leading-tight">Protocol Dev</h2>
                <p className="text-[10px] text-zinc-500 font-medium">Prompt Engineering</p>
             </div>
          </div>
          
          <div className="p-3 space-y-1 mt-2 overflow-y-auto">
              <SidebarItem 
                active={activeTab === 'GOALS'} 
                onClick={() => setActiveTab('GOALS')} 
                icon={<Target size={18} />} 
                label="Strategic Goals" 
              />
              <SidebarItem 
                active={activeTab === 'BEHAVIOR'} 
                onClick={() => setActiveTab('BEHAVIOR')} 
                icon={<Bot size={18} />} 
                label="Agent Behavior" 
              />
              <div className="my-2 border-t border-zinc-100" />
              <SidebarItem 
                active={activeTab === 'QUARTERLY'} 
                onClick={() => setActiveTab('QUARTERLY')} 
                icon={<Calendar size={18} />} 
                label="Quarterly Roadmap" 
              />
              <SidebarItem 
                active={activeTab === 'MILESTONES'} 
                onClick={() => setActiveTab('MILESTONES')} 
                icon={<Flag size={18} />} 
                label="Key Milestones" 
              />
          </div>
          
          <div className="mt-auto p-4 border-t border-zinc-100">
             <button 
                onClick={handleSave}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
             >
                <Save size={16} /> Save Protocol
             </button>
          </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto relative bg-zinc-50">
        <div className="max-w-4xl mx-auto p-6 md:p-10 pb-20 h-full flex flex-col">
            
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">
                    {activeTab === 'GOALS' && 'Strategic Architecture'}
                    {activeTab === 'BEHAVIOR' && 'Agent Persona & Rules'}
                    {activeTab === 'QUARTERLY' && 'Quarterly Roadmap'}
                    {activeTab === 'MILESTONES' && 'Key Milestones'}
                </h1>
                <p className="text-zinc-500 text-sm mt-1">
                    {activeTab === 'GOALS' && 'Paste your entire strategic context, vision, and yearly goals here.'}
                    {activeTab === 'BEHAVIOR' && 'Define the system instructions, tone, and interaction rules here.'}
                    {activeTab === 'QUARTERLY' && `Detailed tactical goals for ${currentQuarter.quarter}.`}
                    {activeTab === 'MILESTONES' && `Critical checkpoints for ${currentQuarter.quarter}.`}
                </p>
            </header>

            <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden relative">
                
                {activeTab === 'GOALS' && (
                    <div className="flex-1 flex flex-col">
                        <div className="bg-zinc-50/50 border-b border-zinc-100 px-4 py-2 flex items-center justify-between">
                             <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                <FileText size={14} /> Context Prompt
                             </div>
                             <span className="text-[10px] text-zinc-400">Markdown Supported</span>
                        </div>
                        <textarea 
                            value={localConfig.yearlyVision}
                            onChange={(e) => setLocalConfig({...localConfig, yearlyVision: e.target.value})}
                            className="flex-1 w-full p-6 bg-white text-zinc-800 font-mono text-sm leading-relaxed outline-none resize-none"
                            placeholder="e.g. === 2026 VISION ===&#10;By end of 2026, I will have..."
                        />
                    </div>
                )}

                {activeTab === 'BEHAVIOR' && (
                    <div className="flex-1 flex flex-col">
                        <div className="bg-zinc-50/50 border-b border-zinc-100 px-4 py-2 flex items-center justify-between">
                             <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                <Sparkles size={14} className="text-purple-500" /> System Instruction
                             </div>
                             <span className="text-[10px] text-zinc-400">Master Prompt</span>
                        </div>
                        <textarea 
                            value={localConfig.authority.customSystemPrompt}
                            onChange={(e) => updateAuthority('customSystemPrompt', e.target.value)}
                            className="flex-1 w-full p-6 bg-zinc-900 text-zinc-100 font-mono text-sm leading-relaxed outline-none resize-none"
                            placeholder="You are a calm, stoic executive coach..."
                        />
                    </div>
                )}

                {activeTab === 'QUARTERLY' && (
                     <div className="flex-1 flex flex-col overflow-y-auto">
                        <div className="bg-zinc-50/50 border-b border-zinc-100 px-6 py-4">
                             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Quarter Theme</label>
                             <input 
                                type="text"
                                value={currentQuarter.theme}
                                onChange={(e) => updateQuarterly({ theme: e.target.value })}
                                className="w-full text-lg font-serif italic bg-transparent border-b border-zinc-300 focus:border-zinc-900 outline-none pb-1"
                             />
                        </div>
                        <div className="p-6 space-y-6">
                            {currentQuarter.goals.map((goal, idx) => (
                                <div key={idx}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-zinc-100 text-zinc-600`}>
                                            {goal.category}
                                        </span>
                                    </div>
                                    <textarea 
                                        value={goal.items.join('\n')}
                                        onChange={(e) => updateGoalItems(idx, e.target.value)}
                                        className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500/10"
                                        placeholder="Add goals (one per line)..."
                                    />
                                </div>
                            ))}
                        </div>
                     </div>
                )}

                {activeTab === 'MILESTONES' && (
                    <div className="flex-1 flex flex-col">
                        <div className="bg-zinc-50/50 border-b border-zinc-100 px-4 py-2 flex items-center justify-between">
                             <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                <Flag size={14} className="text-blue-500" /> Critical Checkpoints
                             </div>
                             <span className="text-[10px] text-zinc-400">One per line</span>
                        </div>
                        <textarea 
                            value={currentQuarter.milestones.join('\n')}
                            onChange={(e) => updateMilestones(e.target.value)}
                            className="flex-1 w-full p-6 bg-white text-zinc-800 font-mono text-sm leading-relaxed outline-none resize-none"
                            placeholder="e.g. Launch MVP&#10;Run Marathon"
                        />
                    </div>
                )}
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-xs text-zinc-400">
                    Changes take effect on next chat session.
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ active, onClick, icon, label }: any) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            active 
            ? 'bg-zinc-100 text-zinc-900 font-bold shadow-sm' 
            : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
        }`}
    >
        <span className={active ? 'text-zinc-900' : 'text-zinc-400'}>{icon}</span>
        <span className="text-sm text-left">{label}</span>
    </button>
);

export default ProtocolSettings;
