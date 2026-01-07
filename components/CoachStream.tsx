
import React from 'react';
import { StreamItem } from '../types';
import { Calendar, Clock, AlertCircle, CheckCircle2, Zap, Menu, MessageSquare, Anchor, Timer, Coffee, Moon } from 'lucide-react';

const STREAM_DATA: StreamItem[] = [
  {
    id: '1',
    type: 'recovery',
    title: 'Wake + Sunlight Exposure',
    description: 'Phase 5: Bio-Optimization. Reset circadian rhythm.',
    time: '06:30',
    isFuture: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'flow_sprint',
    title: '90-Min Strength / Zone 2',
    description: 'Phase 3: Execution Cycle. Record steps & CGM.',
    time: '07:00 - 08:30',
    isFuture: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'flow_sprint',
    title: 'AI Lab / Startup Sprint',
    description: 'Deep Work Block. Flow state focus.',
    time: '09:15 - 10:45',
    isFuture: true,
    priority: 'high'
  },
  {
    id: '4',
    type: 'recovery',
    title: 'Micro-Recovery',
    description: 'Box breathing or short walk. Check HRV.',
    time: '11:00 - 11:15',
    isFuture: true,
    priority: 'normal'
  },
  {
    id: '5',
    type: 'event',
    title: 'Lunch + Social Connect',
    description: 'Relationships. Connect with 1 person meaningfully.',
    time: '13:00',
    isFuture: true,
    priority: 'normal'
  },
  {
    id: '6',
    type: 'flow_sprint',
    title: 'Sailing / Personal Project',
    description: 'Career/Lifestyle Integration. Log effort.',
    time: '14:00 - 15:30',
    isFuture: true,
    priority: 'normal'
  },
  {
    id: '7',
    type: 'audit',
    title: 'Evening Review + Meditation',
    description: 'Phase 4: Data-Driven Monitoring. Identity alignment.',
    time: '19:00',
    isFuture: true,
    priority: 'high'
  },
  {
    id: '8',
    type: 'recovery',
    title: 'Wind-down',
    description: 'Circadian alignment. No blue light.',
    time: '21:00',
    isFuture: true,
    priority: 'normal'
  }
];

interface CoachStreamProps {
  onMenuClick?: () => void;
}

const CoachStream: React.FC<CoachStreamProps> = ({ onMenuClick }) => {
  const upcoming = STREAM_DATA.filter(i => i.isFuture);
  const history = STREAM_DATA.filter(i => !i.isFuture);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flow_sprint': return <Zap size={16} className="text-amber-500" />;
      case 'recovery': return <Coffee size={16} className="text-emerald-500" />;
      case 'audit': return <CheckCircle2 size={16} className="text-blue-500" />;
      case 'event': return <Anchor size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-zinc-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'flow_sprint': return 'Flow Sprint';
      case 'recovery': return 'Recovery';
      case 'audit': return 'Audit Check';
      case 'event': return 'Protocol Event';
      default: return 'Event';
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-meta-bg text-zinc-900 relative">
       <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none" />

       {/* Mobile Header */}
       <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-bold text-zinc-900 tracking-tight">Execution Cycles</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="p-6 md:p-10 max-w-4xl mx-auto relative z-10">
        <header className="mb-12">
          <h2 className="text-3xl font-semibold mb-2 flex items-center gap-3 text-zinc-900">
            Phase 3: Execution Cycles
          </h2>
          <p className="text-zinc-500 font-light">"Tight but Loose" Calendar & Flow State Management.</p>
        </header>

        {/* Upcoming Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-widest">Upcoming Blocks</h3>
            <div className="h-px bg-zinc-200 flex-1" />
          </div>
          
          <div className="space-y-6">
            {upcoming.map((item) => (
              <div key={item.id} className="relative group pl-8 md:pl-0">
                {/* Timeline Connector */}
                <div className="absolute left-[-1px] top-6 bottom-[-24px] w-[2px] bg-zinc-200 md:hidden" />

                <div className="glass-card rounded-xl p-5 hover:border-blue-300 transition-all relative z-10 flex flex-col md:flex-row gap-5 items-start bg-white shadow-sm">
                   <div className="hidden md:flex flex-col items-center gap-2 w-24 pt-1 shrink-0">
                        <span className="text-xs font-mono text-zinc-500">{item.time.split(',')[0]}</span>
                        <div className="p-2 bg-zinc-50 rounded-full border border-zinc-200">
                            {getTypeIcon(item.type)}
                        </div>
                   </div>
                   
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                            <span className="md:hidden p-1.5 bg-zinc-50 rounded-md border border-zinc-200">{getTypeIcon(item.type)}</span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{getTypeLabel(item.type)}</span>
                         </div>
                         <span className="text-xs font-mono text-zinc-500 bg-zinc-50 px-2 py-1 rounded border border-zinc-200">{item.time}</span>
                      </div>
                      <h4 className="font-medium text-lg text-zinc-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-zinc-600 leading-relaxed font-normal">{item.description}</p>
                      
                      {item.priority === 'high' && (
                        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-bold text-rose-500 uppercase tracking-wide">
                           <AlertCircle size={10} />
                           High Priority
                        </div>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div>
           <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Completed Cycles</h3>
            <div className="h-px bg-zinc-200 flex-1" />
          </div>

          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="group transition-all opacity-70 hover:opacity-100">
                <div className="bg-transparent border border-zinc-200 rounded-xl p-4 flex gap-4 items-start hover:bg-white hover:shadow-sm">
                   <div className="mt-1 opacity-50 grayscale group-hover:grayscale-0 transition-all">
                      {getTypeIcon(item.type)}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                         <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide group-hover:text-zinc-600 transition-colors">{getTypeLabel(item.type)}</span>
                         <span className="text-[10px] text-zinc-400 font-mono group-hover:text-zinc-500 transition-colors">{item.time}</span>
                      </div>
                      <h4 className="font-medium text-zinc-500 mb-1 group-hover:text-zinc-800 transition-colors">{item.title}</h4>
                      <p className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">{item.description}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoachStream;
