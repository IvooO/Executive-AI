
import React, { useState } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, X, Clock, Check, 
  Menu, MoreHorizontal, ArrowRight 
} from 'lucide-react';
import { ProtocolConfig } from '../types';

interface WeeklyOverviewProps {
  config: ProtocolConfig;
  onMenuClick?: () => void;
}

interface CalendarEvent {
    id: string;
    day: string;
    time: string;
    title: string;
    category: 'BODY' | 'MIND' | 'SOCIAL' | 'WORK';
    status: 'pending' | 'completed' | 'missed';
    description?: string;
}

const MOCK_SCHEDULE: CalendarEvent[] = [
    // MONDAY
    { id: '1', day: 'Mon', time: '06:00', title: 'Meditation + Hydrate', category: 'MIND', status: 'pending', description: '10 mins unguided. Drink 500ml water immediately.' },
    { id: '2', day: 'Mon', time: '07:00', title: 'Strength A (Legs/Push)', category: 'BODY', status: 'pending' },
    { id: '3', day: 'Mon', time: '09:00', title: 'Lab AI: Team Sync', category: 'WORK', status: 'pending' },
    { id: '4', day: 'Mon', time: '14:00', title: 'Deep Work: Leadership', category: 'WORK', status: 'pending' },
    { id: '5', day: 'Mon', time: '19:00', title: 'Low Carb Dinner', category: 'BODY', status: 'pending' },

    // TUESDAY
    { id: '6', day: 'Tue', time: '06:00', title: 'Meditation', category: 'MIND', status: 'pending' },
    { id: '7', day: 'Tue', time: '06:30', title: 'Zone 2 Run (60m)', category: 'BODY', status: 'pending' },
    { id: '8', day: 'Tue', time: '18:00', title: 'Startup MVP Review', category: 'WORK', status: 'pending' },
    { id: '9', day: 'Tue', time: '20:00', title: 'Connection: Dinner Date', category: 'SOCIAL', status: 'missed' },

    // WEDNESDAY
    { id: '10', day: 'Wed', time: '06:00', title: 'Meditation', category: 'MIND', status: 'pending' },
    { id: '11', day: 'Wed', time: '07:00', title: 'Strength B (Pull/Hinge)', category: 'BODY', status: 'pending' },
    { id: '12', day: 'Wed', time: '12:00', title: 'Friend Lunch', category: 'SOCIAL', status: 'pending' },
    { id: '13', day: 'Wed', time: '20:00', title: 'London Logistics', category: 'WORK', status: 'pending' },

    // THURSDAY
    { id: '14', day: 'Thu', time: '06:00', title: 'Meditation', category: 'MIND', status: 'pending' },
    { id: '15', day: 'Thu', time: '06:30', title: 'Zone 2 Run (60m)', category: 'BODY', status: 'pending' },
    { id: '16', day: 'Thu', time: '10:00', title: 'Lab: AI Tool Demo', category: 'WORK', status: 'pending' },
    { id: '17', day: 'Thu', time: '19:00', title: 'Startup Co-founder Call', category: 'WORK', status: 'pending' },

    // FRIDAY
    { id: '18', day: 'Fri', time: '06:00', title: 'Meditation', category: 'MIND', status: 'pending' },
    { id: '19', day: 'Fri', time: '07:00', title: 'Strength C (Full Body)', category: 'BODY', status: 'pending' },
    { id: '20', day: 'Fri', time: '16:00', title: 'Weekly Review', category: 'MIND', status: 'pending' },
    { id: '21', day: 'Fri', time: '19:00', title: 'Rest & Recovery', category: 'BODY', status: 'pending' },

    // SATURDAY
    { id: '22', day: 'Sat', time: '07:00', title: 'Long Run (16km)', category: 'BODY', status: 'pending' },
    { id: '23', day: 'Sat', time: '14:00', title: 'Sailing Club Visit', category: 'SOCIAL', status: 'pending' },
    { id: '24', day: 'Sat', time: '19:00', title: 'Social Event', category: 'SOCIAL', status: 'missed' },

    // SUNDAY
    { id: '25', day: 'Sun', time: '08:00', title: 'Active Recovery / Yoga', category: 'BODY', status: 'pending' },
    { id: '26', day: 'Sun', time: '10:00', title: 'Sailing Study', category: 'WORK', status: 'pending' },
    { id: '27', day: 'Sun', time: '16:00', title: 'Meal Prep', category: 'BODY', status: 'pending' },
    { id: '28', day: 'Sun', time: '20:00', title: 'Early Sleep', category: 'BODY', status: 'pending' },
];

const DAYS = [
    { name: 'MON', date: '05', focus: 'Strength & Lab AI' },
    { name: 'TUE', date: '06', focus: 'Zone 2 & MVP' },
    { name: 'WED', date: '07', focus: 'Strength & Strategy' },
    { name: 'THU', date: '08', focus: 'Zone 2 & Lab' },
    { name: 'FRI', date: '09', focus: 'Strength & Weekly Close' },
    { name: 'SAT', date: '10', focus: 'Marathon Prep' },
    { name: 'SUN', date: '11', focus: 'Recovery & Prep' },
];

const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ config, onMenuClick }) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const getEventsForDay = (dayName: string) => {
        // Simple string matching for prototype
        return MOCK_SCHEDULE.filter(e => e.day.toUpperCase().startsWith(dayName));
    };

    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'BODY': return 'bg-emerald-50 text-emerald-800 border-emerald-100';
            case 'MIND': return 'bg-purple-50 text-purple-800 border-purple-100';
            case 'WORK': return 'bg-blue-50 text-blue-800 border-blue-100';
            case 'SOCIAL': return 'bg-rose-50 text-rose-800 border-rose-100';
            default: return 'bg-zinc-50 text-zinc-800 border-zinc-100';
        }
    };

    return (
        <div className="flex-1 h-full overflow-y-auto bg-[#F9F7F2] text-stone-900 font-sans relative">
             {/* Header */}
             <div className="p-6 md:p-8 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-[#F9F7F2]/95 backdrop-blur-sm z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onMenuClick} className="md:hidden text-stone-500">
                        <Menu size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Week of Jan 05, 2026</span>
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-stone-900">Weekly Operations</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-stone-200 shadow-sm">
                    <button className="px-4 py-1.5 text-xs font-bold text-stone-400 hover:text-stone-900 transition-colors">QUARTERLY</button>
                    <button className="px-4 py-1.5 text-xs font-bold bg-stone-900 text-white rounded shadow-sm">WEEKLY OPS</button>
                </div>
             </div>

             {/* Grid */}
             <div className="p-4 md:p-8 overflow-x-auto">
                 <div className="min-w-[1000px] grid grid-cols-7 gap-4">
                     {DAYS.map((day) => (
                         <div key={day.name} className="flex flex-col gap-4">
                             {/* Day Header */}
                             <div className="bg-[#131b2e] rounded-xl p-4 text-center text-white shadow-md border border-[#1e293b]">
                                 <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">{day.name}</div>
                                 <div className="text-3xl font-serif font-bold mb-2">{day.date}</div>
                                 <div className="text-[10px] font-medium text-emerald-400 truncate px-1">{day.focus}</div>
                             </div>

                             {/* Events */}
                             <div className="space-y-2">
                                 {getEventsForDay(day.name).map((event) => (
                                     <button 
                                        key={event.id}
                                        onClick={() => setSelectedEvent(event)}
                                        className={`w-full text-left p-3 rounded-lg border shadow-sm hover:shadow-md transition-all group relative overflow-hidden bg-[#131b2e] border-[#1e293b] hover:border-stone-600`}
                                     >
                                        {event.status === 'missed' && <div className="absolute top-0 right-0 w-2 h-2 m-2 rounded-full bg-rose-500" />}
                                        <div className="text-[10px] font-mono text-stone-500 mb-1">{event.time}</div>
                                        <div className="text-xs font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                                            {event.title}
                                        </div>
                                     </button>
                                 ))}
                                 
                                 {/* Add Slot Button (Visual only) */}
                                 <button className="w-full py-2 rounded-lg border border-dashed border-stone-300 text-stone-400 hover:border-stone-400 hover:text-stone-500 flex items-center justify-center transition-colors">
                                     <div className="w-1 h-1 rounded-full bg-current" />
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Task Detail Modal */}
             {selectedEvent && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                     <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-slide-up border border-stone-200">
                         <div className="p-6">
                             <div className="flex justify-between items-start mb-6">
                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(selectedEvent.category)}`}>
                                     {selectedEvent.category}
                                 </span>
                                 <button onClick={() => setSelectedEvent(null)} className="text-stone-400 hover:text-stone-800">
                                     <X size={20} />
                                 </button>
                             </div>
                             
                             <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{selectedEvent.title}</h3>
                             
                             <div className="flex items-center gap-2 text-sm text-stone-500 mb-6 font-mono">
                                 <Clock size={14} />
                                 {selectedEvent.day} at {selectedEvent.time}
                             </div>

                             <p className="text-sm text-stone-600 leading-relaxed mb-8">
                                 {selectedEvent.description || "No detailed description provided for this task. Execute as planned."}
                             </p>

                             <div className="flex gap-3">
                                 <button onClick={() => setSelectedEvent(null)} className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl font-bold text-sm transition-colors">
                                     Close
                                 </button>
                                 <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2">
                                     <Check size={16} /> Complete
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default WeeklyOverview;
