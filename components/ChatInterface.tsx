
import React, { useRef, useEffect, useState } from 'react';
import { Message, UIAction } from '../types';
import { Send, Mic, Sparkles, Menu, Command, ChevronDown, Check, SlidersHorizontal, MousePointerClick } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  onSend: (text?: string) => void;
  isTyping: boolean;
  onMenuClick?: () => void;
  onOptionSelect: (val: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, input, setInput, onSend, isTyping, onMenuClick, onOptionSelect }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-meta-bg">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-subtle-glow opacity-60 pointer-events-none" />

      {/* Header Mobile Only */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-semibold text-zinc-900 tracking-tight">Mentor AI</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500 hover:text-zinc-900">
            <Menu size={24} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 py-6 md:py-10 space-y-8 pb-40 scroll-smooth">
        {messages.length === 0 && (
           <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-zinc-200 shadow-lg shadow-blue-500/10">
                  <Sparkles size={32} className="text-meta-accent" />
              </div>
              <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-zinc-900">System Ready.</h3>
                  <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed">
                    Accessing 2026 Master Plan data. <br/> Biomarkers loaded.
                  </p>
              </div>
           </div>
        )}
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full animate-slide-up flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[90%] md:max-w-[75%] lg:max-w-[65%] ${
                msg.role === 'user' 
                  ? 'bg-meta-accent text-white rounded-2xl rounded-tr-sm px-6 py-4 shadow-lg shadow-blue-500/20' 
                  : 'text-zinc-800 pr-8'
              }`}
            >
              {msg.role === 'model' && (
                  <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-widest">Mentor</span>
                  </div>
              )}
              <div className={`text-[15px] md:text-base leading-7 whitespace-pre-wrap ${msg.role === 'model' ? 'font-normal' : 'font-normal'}`}>
                  {msg.content}
              </div>
            </div>

            {/* UI Action Widgets - Multi-Widget Form Support */}
            {msg.uiActions && msg.uiActions.length > 0 && (
                <div className="mt-4 max-w-[95%] md:max-w-[85%] lg:max-w-[75%] animate-fade-in pl-2">
                    <InteractionForm 
                        actions={msg.uiActions} 
                        onCommit={onOptionSelect} 
                    />
                </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start w-full animate-fade-in">
             <div className="flex items-center gap-3 px-4 py-2">
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-20">
        <div className="max-w-4xl mx-auto relative">
          <div className="relative flex items-end glass-panel rounded-2xl shadow-xl shadow-zinc-200/50 transition-all focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 overflow-hidden bg-white border border-zinc-200">
            <button className="p-4 text-zinc-400 hover:text-zinc-800 transition-colors h-full flex items-center justify-center">
              <Mic size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your reflection or query..."
              className="flex-1 bg-transparent text-zinc-900 placeholder-zinc-400 p-4 pl-0 max-h-40 min-h-[60px] resize-none focus:outline-none scrollbar-hide text-base"
              rows={1}
            />
            <div className="flex items-center gap-2 pr-3 pb-3">
                <button 
                onClick={() => onSend()}
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-lg transition-all duration-300 ${
                    input.trim() && !isTyping 
                    ? 'bg-meta-accent text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 scale-100' 
                    : 'bg-zinc-100 text-zinc-400 scale-95'
                }`}
                >
                <Send size={18} />
                </button>
            </div>
          </div>
          <div className="flex justify-center mt-3 gap-6 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                  <Command size={10} />
                  <span>Enter to send</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Secure Environment</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MULTI-WIDGET FORM COMPONENT ---
const InteractionForm: React.FC<{ actions: UIAction[], onCommit: (val: string) => void }> = ({ actions, onCommit }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    // If only 1 simple choice action, behave like a standard quick reply (no submit button needed)
    const isSingleChoice = actions.length === 1 && actions[0].type === 'CHOICE';

    const handleUpdate = (id: string, val: string) => {
        setFormData(prev => ({ ...prev, [id]: val }));
        
        // Immediate commit for single choice
        if (isSingleChoice) {
             onCommit(val);
             setSubmitted(true);
        }
    };

    const handleSubmit = () => {
        // Construct report
        const report = actions.map(a => {
            const val = formData[a.id || ''] || 'Skipped';
            return `${a.label || 'Input'}: ${val}`;
        }).join(' | ');
        onCommit(report);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg inline-flex items-center gap-2 text-sm text-zinc-500">
                <Check size={14} className="text-emerald-500" />
                Response Logged
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 bg-white/50 p-4 rounded-xl border border-zinc-100 shadow-sm">
            {actions.map((action, idx) => (
                <div key={action.id || idx} className="space-y-2">
                    
                    {/* SLIDER RENDER */}
                    {action.type === 'SLIDER' && (
                        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                             <div className="flex justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal size={14} className="text-zinc-400" />
                                    <span className="text-sm font-bold text-zinc-700">{action.label || 'Value'}</span>
                                </div>
                                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 rounded">
                                    {formData[action.id || ''] || Math.floor(((action.min||0) + (action.max||10))/2)}
                                </span>
                            </div>
                            <input 
                                type="range" 
                                min={action.min} 
                                max={action.max} 
                                // Default to mid if not set
                                value={formData[action.id || ''] || Math.floor(((action.min||0) + (action.max||10))/2)}
                                onChange={(e) => handleUpdate(action.id || '', e.target.value)}
                                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between px-1">
                                <span className="text-[10px] text-zinc-400">{action.min}</span>
                                <span className="text-[10px] text-zinc-400">{action.max}</span>
                            </div>
                        </div>
                    )}

                    {/* CHOICE RENDER */}
                    {action.type === 'CHOICE' && action.options && (
                        <div>
                             {!isSingleChoice && action.label && <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">{action.label}</div>}
                             <div className="flex flex-wrap gap-2">
                                {action.options.map(opt => {
                                    const isSelected = formData[action.id || ''] === opt;
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => handleUpdate(action.id || '', opt)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all active:scale-95 border ${
                                                isSelected 
                                                ? 'bg-zinc-900 text-white border-zinc-900' 
                                                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    );
                                })}
                             </div>
                        </div>
                    )}

                    {/* SELECT RENDER */}
                    {action.type === 'SELECT' && action.options && (
                        <div className="bg-white p-3 rounded-xl border border-zinc-200 shadow-sm w-full md:w-fit min-w-[200px]">
                            {action.label && <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">{action.label}</div>}
                            <div className="relative">
                                <select 
                                    onChange={(e) => handleUpdate(action.id || '', e.target.value)}
                                    className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm rounded-lg p-2.5 pr-8 focus:ring-blue-500 focus:border-blue-500 block outline-none"
                                    value={formData[action.id || ''] || ""}
                                >
                                    <option value="" disabled>Select option...</option>
                                    {action.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ))}

            {/* Submit Button for Forms (Multiple widgets) */}
            {!isSingleChoice && (
                <div className="pt-2">
                    <button 
                        onClick={handleSubmit}
                        className="w-full py-3 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={16} /> Submit Protocol Report
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
