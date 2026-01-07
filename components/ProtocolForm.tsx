import React, { useState } from 'react';
import { Menu, Zap, Heart, Brain, Activity, Check, AlertCircle } from 'lucide-react';

interface ProtocolFormProps {
  onMenuClick?: () => void;
  onSubmit?: () => void;
}

const ProtocolForm: React.FC<ProtocolFormProps> = ({ onMenuClick, onSubmit }) => {
  const [energy, setEnergy] = useState(5);
  const [mood, setMood] = useState('');
  const [body, setBody] = useState('');
  const [social, setSocial] = useState<boolean | null>(null);

  const handleSubmit = () => {
    // Logic to save to Supabase would go here
    if (onSubmit) onSubmit();
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-meta-bg text-zinc-900 relative">
      <div className="absolute top-0 left-0 right-0 h-64 bg-subtle-glow opacity-60 pointer-events-none" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-bold text-zinc-900 tracking-tight">Daily Protocol</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        
        <header className="mb-8">
            <h2 className="text-3xl font-semibold mb-2 text-zinc-900">Protocol Check-in</h2>
            <p className="text-zinc-500 font-light">Phase 1: Baseline Intelligence & Deviations.</p>
        </header>

        {/* Identity Reinforcement / Goals Context */}
        <div className="mb-10 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">North Star Targets</h3>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-rose-500"><Activity size={16} /></div>
                    <div>
                        <p className="text-sm font-medium text-zinc-900">Physiology</p>
                        <p className="text-xs text-zinc-500">Eliminate visceral fat & manage cortisol spikes.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-500"><Brain size={16} /></div>
                    <div>
                        <p className="text-sm font-medium text-zinc-900">Function</p>
                        <p className="text-xs text-zinc-500">Build the Startup (High autonomy, high signal).</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-500"><Heart size={16} /></div>
                    <div>
                        <p className="text-sm font-medium text-zinc-900">Connection</p>
                        <p className="text-xs text-zinc-500">Love & Meaning. Prioritize deep conversation.</p>
                    </div>
                </div>
            </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            
            {/* Energy Slider */}
            <div className="glass-card bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
                <div className="flex justify-between items-center mb-6">
                    <label className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                        <Zap size={16} className="text-amber-500" />
                        Energy Baseline
                    </label>
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{energy}/10</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={energy} 
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-2 text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                    <span>Lethargic</span>
                    <span>Neutral</span>
                    <span>Peak Flow</span>
                </div>
            </div>

            {/* Mood & Body Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">Mood / Mindset</label>
                    <textarea 
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="Anxious, Focused, Avoidant?"
                        className="w-full h-24 p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none placeholder-zinc-400"
                    />
                </div>
                <div className="glass-card bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">Body / Physiology</label>
                    <textarea 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Soreness, Inflammation, Readiness?"
                        className="w-full h-24 p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none placeholder-zinc-400"
                    />
                </div>
            </div>

            {/* Social Guardrail - Critical for User */}
            <div className="glass-card bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                 <label className="block text-sm font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                    <Heart size={16} className="text-purple-500" />
                    Social Exposure Guardrail
                 </label>
                 <p className="text-xs text-zinc-500 mb-6">Did you have a meaningful social connection yesterday?</p>
                 
                 <div className="flex gap-4">
                    <button 
                        type="button"
                        onClick={() => setSocial(true)}
                        className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${social === true ? 'bg-purple-50 border-purple-200 text-purple-700 font-medium' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
                    >
                        <Check size={16} /> Yes
                    </button>
                    <button 
                        type="button"
                        onClick={() => setSocial(false)}
                        className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${social === false ? 'bg-rose-50 border-rose-200 text-rose-700 font-medium' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}
                    >
                        <AlertCircle size={16} /> No (Isolation)
                    </button>
                 </div>
            </div>

            <button type="submit" className="w-full py-4 bg-zinc-900 text-white rounded-xl font-medium shadow-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                Log Protocol Data
            </button>

        </form>
      </div>
    </div>
  );
};

export default ProtocolForm;