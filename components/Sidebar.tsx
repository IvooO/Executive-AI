
import React from 'react';
import { LayoutDashboard, MessageSquare, Settings, LogOut, X, Zap, History, Plus, Calendar } from 'lucide-react';
import { AppView, ChatSession } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  onNewChat: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    currentView, onChangeView, onNewChat, isOpen, onClose,
    sessions, activeSessionId, onSelectSession 
}) => {
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 flex flex-col transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
  `;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div className={sidebarClasses}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-start px-6 border-b border-zinc-100">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm shrink-0">
            <Zap size={16} fill="white" />
          </div>
          <span className="ml-3 font-bold text-zinc-900 tracking-tight">Executive AI</span>
          
          {/* Mobile Close Button */}
          <button onClick={onClose} className="md:hidden ml-auto text-zinc-400">
            <X size={20} />
          </button>
        </div>

        {/* Primary Navigation */}
        <div className="py-4 space-y-1 px-3 border-b border-zinc-100">
          <SidebarItem 
            icon={<LayoutDashboard size={18} />} 
            label="Master Plan" 
            active={currentView === AppView.COMMAND}
            onClick={() => { onChangeView(AppView.COMMAND); onClose?.(); }}
          />

          <SidebarItem 
            icon={<Calendar size={18} />} 
            label="Weekly Ops" 
            active={currentView === AppView.CALENDAR}
            onClick={() => { onChangeView(AppView.CALENDAR); onClose?.(); }}
          />

          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Configuration" 
            active={currentView === AppView.SETTINGS}
            onClick={() => { onChangeView(AppView.SETTINGS); onClose?.(); }}
          />

           <button 
             onClick={onNewChat}
             className="w-full flex items-center justify-start gap-3 px-3 py-2.5 mt-2 bg-zinc-900 text-white rounded-xl shadow-sm hover:bg-black transition-all group"
           >
              <Plus size={18} />
              <span className="text-sm font-medium">New Consultation</span>
           </button>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex items-center gap-2 px-3 mb-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <History size={12} /> Recent Consults
            </div>
            
            <div className="space-y-1">
                {sessions.length === 0 && (
                    <div className="px-3 py-4 text-xs text-zinc-400 italic text-center">
                        No history available.
                    </div>
                )}
                {sessions.map((session) => (
                    <button
                        key={session.id}
                        onClick={() => { onSelectSession(session.id); onClose?.(); }}
                        className={`w-full text-left p-3 rounded-xl transition-all group ${
                            activeSessionId === session.id && currentView === AppView.CHAT
                            ? 'bg-blue-50 border-blue-100 text-blue-900'
                            : 'text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-0.5">
                            <span className={`text-sm font-medium truncate w-full ${activeSessionId === session.id && currentView === AppView.CHAT ? 'text-blue-700' : 'text-zinc-900'}`}>
                                {session.title}
                            </span>
                        </div>
                        <div className={`text-xs truncate ${activeSessionId === session.id && currentView === AppView.CHAT ? 'text-blue-400' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                            {session.preview}
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100">
           <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-zinc-600">
                    JD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate">John Doe</p>
                    <p className="text-[10px] text-zinc-400 truncate">Pro Plan Active</p>
                </div>
           </div>
        </div>
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-zinc-100 text-zinc-900 font-semibold' 
        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
    }`}
  >
    <span className={`shrink-0 ${active ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </button>
);

export default Sidebar;
