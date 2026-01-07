import React from 'react';
import { CoreIdentity, IdentityEvidence } from '../types';
import { Shield, Sparkles, Menu, CheckCircle2, Quote, Anchor, Layers } from 'lucide-react';

const MOCK_CORE: CoreIdentity = {
  statement: "I am an athlete, a leader, and a connector who thrives on the water.",
  daysActive: 12,
  confidenceScore: 65
};

const EVIDENCE: IdentityEvidence[] = [
  {
    id: '1',
    title: 'Zone 2 Adherence',
    date: 'Yesterday',
    category: 'health',
    type: 'action',
    description: 'Chose 45min Zone 2 run over high-stress interval work.'
  },
  {
    id: '2',
    title: 'Sailing Research',
    date: '2 Days ago',
    category: 'social',
    type: 'action',
    description: 'Contacted broker regarding Class A Catamaran.'
  },
  {
    id: '3',
    title: 'Identity Language',
    date: 'Today',
    category: 'mindset',
    type: 'language_shift',
    description: 'Referred to London as "future home" rather than "maybe".'
  }
];

interface IdentityEngineProps {
  onMenuClick?: () => void;
}

const IdentityEngine: React.FC<IdentityEngineProps> = ({ onMenuClick }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-meta-bg text-zinc-900 relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-bold text-zinc-900 tracking-tight">Identity</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <header className="mb-12 text-center relative">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 border border-zinc-200 shadow-sm shadow-purple-500/10">
            <Layers size={24} className="text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-3 text-zinc-900 tracking-tight">
            Identity Architecture
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-normal">Construction of the 2026 Archetype.</p>
        </header>

        {/* Core Identity Card */}
        <div className="relative group mb-16">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl opacity-50 group-hover:opacity-70 blur transition duration-500"></div>
            <div className="relative bg-white border border-zinc-100 p-8 md:p-12 rounded-3xl text-center shadow-xl shadow-zinc-200/50">
            
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-6">Core Narrative (Q1)</h3>
                <p className="text-2xl md:text-4xl font-serif italic text-zinc-900 leading-relaxed mb-10 antialiased">
                    "{MOCK_CORE.statement}"
                </p>

                <div className="flex justify-center items-center gap-12">
                    <div className="text-center">
                    <div className="text-3xl font-light text-zinc-900 mb-1">{MOCK_CORE.daysActive}</div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Days in Q1</div>
                    </div>
                    <div className="w-px bg-zinc-200 h-12" />
                    <div className="text-center">
                    <div className="text-3xl font-light text-blue-600 mb-1">{MOCK_CORE.confidenceScore}%</div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Integrity Score</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Evidence Grid */}
        <div className="mb-8">
           <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4">
             <h3 className="font-medium text-lg flex items-center gap-2 text-zinc-900">
               <Shield size={18} className="text-emerald-500" />
               Evidence of Change
             </h3>
             <span className="text-xs text-zinc-400 font-mono">LAST 7 DAYS</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVIDENCE.map((item) => (
                <div key={item.id} className="glass-card p-6 rounded-2xl hover:bg-zinc-50 transition-all duration-300 group bg-white shadow-sm border border-zinc-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-xl ${
                      item.type === 'language_shift' ? 'bg-purple-100 text-purple-600 border border-purple-200' :
                      item.title.includes('Sailing') ? 'bg-blue-100 text-blue-600 border border-blue-200' :
                      'bg-emerald-100 text-emerald-600 border border-emerald-200'
                    }`}>
                      {item.type === 'language_shift' ? <Quote size={18} /> : 
                       item.title.includes('Sailing') ? <Anchor size={18} /> : <CheckCircle2 size={18} />}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono uppercase">{item.date}</span>
                  </div>
                  
                  <h4 className="font-medium text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityEngine;