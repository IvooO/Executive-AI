
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import CommandCenter from './components/CommandCenter'; 
import WeeklyOverview from './components/WeeklyOverview'; // New Component
import ProtocolSettings from './components/ProtocolSettings';
import UserProfile from './components/UserProfile';
import { AppView, Message, ProtocolConfig, ChatSession } from './types';
import { initializeGemini, sendMessageToGemini, updateProtocol } from './services/geminiService';
import { compileSystemPrompt } from './utils/promptCompiler'; 
import { PRESETS } from './constants/presets'; 
import { parseAIResponse } from './utils/responseParsing';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.COMMAND);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Session State
  const [sessions, setSessions] = useState<ChatSession[]>([
      {
          id: 'mock-session-1',
          title: 'Q1 Strategy Review',
          preview: 'Analyzing visceral fat metrics...',
          updatedAt: new Date(Date.now() - 86400000), // Yesterday
          messages: [
              { id: 'm1', role: 'model', content: 'Ready for Q1 Strategy Review.', timestamp: new Date() },
              { id: 'm2', role: 'user', content: 'Lets review the visceral fat metrics.', timestamp: new Date() }
          ]
      }
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Initialize with EXECUTIVE preset
  const [protocolConfig, setProtocolConfig] = useState<ProtocolConfig>(PRESETS["EXECUTIVE"]);

  useEffect(() => {
    const compiledPrompt = compileSystemPrompt(protocolConfig);
    initializeGemini(compiledPrompt);
  }, []);

  // Effect to sync current messages to the active session
  useEffect(() => {
    if (messages.length === 0) return;

    if (activeSessionId) {
        setSessions(prev => {
            const index = prev.findIndex(s => s.id === activeSessionId);
            if (index === -1) return prev;

            const updatedSessions = [...prev];
            updatedSessions[index] = {
                ...updatedSessions[index],
                messages: messages,
                preview: messages[messages.length - 1].content.substring(0, 40) + "...",
                updatedAt: new Date()
            };
            // Move active to top
            const active = updatedSessions.splice(index, 1)[0];
            updatedSessions.unshift(active);
            return updatedSessions;
        });
    } else {
        // We have messages but no ID (e.g. first message of new chat)
        const newId = Date.now().toString();
        const newSession: ChatSession = {
            id: newId,
            title: messages[0].role === 'user' ? messages[0].content.substring(0, 30) : 'New Consultation',
            preview: messages[messages.length - 1].content.substring(0, 40) + "...",
            updatedAt: new Date(),
            messages: messages
        };
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newId);
    }
  }, [messages]);

  const handleSendMessage = async (textOverride?: string) => {
    const contentToSend = typeof textOverride === 'string' ? textOverride : input;
    if (!contentToSend.trim()) return;

    // 1. Optimistic User Update
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: contentToSend,
      timestamp: new Date()
    };
    
    let currentSessionId = activeSessionId;
    if (!currentSessionId) {
        currentSessionId = Date.now().toString();
        setActiveSessionId(currentSessionId);
        
        const initialSession: ChatSession = {
            id: currentSessionId,
            title: contentToSend.substring(0, 30),
            preview: 'Typing...',
            updatedAt: new Date(),
            messages: [userMsg] 
        };
        setSessions(prev => [initialSession, ...prev]);
    }

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 2. AI Call
    const rawResponse = await sendMessageToGemini(contentToSend);
    const { content: parsedContent, uiActions } = parseAIResponse(rawResponse);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: parsedContent,
      timestamp: new Date(),
      uiActions: uiActions
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveSessionId(null);
    setCurrentView(AppView.CHAT);
    setIsSidebarOpen(false);
    
    const compiledPrompt = compileSystemPrompt(protocolConfig);
    updateProtocol(compiledPrompt);
    
    setTimeout(() => {
        const greeting: Message = {
            id: Date.now().toString(),
            role: 'model',
            content: `**${protocolConfig.authority.agentName} Active.**\nReady for morning brief?`,
            timestamp: new Date(),
            uiActions: [{ type: 'CHOICE', options: ['Morning Brief', 'Status Report', 'Skip'], id: 'init_choice' }]
        };
        setMessages([greeting]);
    }, 500);
  };

  const handleSelectSession = (sessionId: string) => {
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
          setMessages(session.messages);
          setActiveSessionId(sessionId);
          setCurrentView(AppView.CHAT);
      }
  };

  const handleSaveProtocol = (newConfig: ProtocolConfig) => {
      setProtocolConfig(newConfig);
      const compiledPrompt = compileSystemPrompt(newConfig);
      updateProtocol(compiledPrompt);
      setCurrentView(AppView.COMMAND); 
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.SETTINGS:
        return (
            <ProtocolSettings 
                config={protocolConfig}
                onSave={handleSaveProtocol}
                onMenuClick={() => setIsSidebarOpen(true)} 
            />
        );
      case AppView.CHAT:
        return (
          <ChatInterface 
            messages={messages} 
            input={input} 
            setInput={setInput} 
            onSend={() => handleSendMessage()}
            isTyping={isTyping}
            onMenuClick={() => setIsSidebarOpen(true)}
            onOptionSelect={handleSendMessage}
          />
        );
      case AppView.COMMAND:
        return (
            <CommandCenter 
                config={protocolConfig} 
                onNavigateToChat={() => setCurrentView(AppView.CHAT)}
                onNavigateToSettings={() => setCurrentView(AppView.SETTINGS)}
            />
        );
      case AppView.CALENDAR:
        return (
            <WeeklyOverview 
                config={protocolConfig} 
                onMenuClick={() => setIsSidebarOpen(true)} 
            />
        );
      default:
        return <CommandCenter 
            config={protocolConfig} 
            onNavigateToChat={() => setCurrentView(AppView.CHAT)}
            onNavigateToSettings={() => setCurrentView(AppView.SETTINGS)}
        />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
      
      {/* Mobile Header for Sidebar Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
           <button 
             onClick={() => setIsSidebarOpen(true)} 
             className="bg-white p-2 rounded-full shadow-md border border-zinc-200 text-zinc-600"
            >
             <Menu size={20} />
           </button>
      </div>

      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
      />
      
      <main className="flex-1 flex flex-col relative w-full h-full md:ml-64 transition-all">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
