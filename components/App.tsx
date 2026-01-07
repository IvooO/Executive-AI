
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import CommandCenter from './components/CommandCenter'; // New consolidated view
import ProtocolSettings from './components/ProtocolSettings';
import UserProfile from './components/UserProfile';
import { AppView, Message, ProtocolConfig } from './types';
import { initializeGemini, sendMessageToGemini, updateProtocol } from './services/geminiService';
import { compileSystemPrompt } from './utils/promptCompiler'; 
import { PRESETS } from './constants/presets'; 
import { parseAIResponse } from './utils/responseParsing';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.COMMAND); // Default to Command Center
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize with EXECUTIVE preset
  const [protocolConfig, setProtocolConfig] = useState<ProtocolConfig>(PRESETS["EXECUTIVE"]);

  useEffect(() => {
    const compiledPrompt = compileSystemPrompt(protocolConfig);
    initializeGemini(compiledPrompt);

    if (messages.length === 0) {
      setTimeout(() => {
        const greeting: Message = {
            id: 'init-1',
            role: 'model',
            content: `**${protocolConfig.authority.agentName} Active.**\nReady for morning brief?`,
            timestamp: new Date(),
            uiActions: [{ type: 'CHOICE', options: ['Morning Brief', 'Status Report', 'Skip'], id: 'init_choice' }]
        };
        setMessages([greeting]);
      }, 500);
    }
  }, []);

  const handleSendMessage = async (textOverride?: string) => {
    const contentToSend = typeof textOverride === 'string' ? textOverride : input;
    if (!contentToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: contentToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

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
    setCurrentView(AppView.CHAT);
    setIsSidebarOpen(false);
    
    const compiledPrompt = compileSystemPrompt(protocolConfig);
    updateProtocol(compiledPrompt);
    
    setTimeout(() => {
        const greeting: Message = {
            id: Date.now().toString(),
            role: 'model',
            content: `**Session Reset.**\nProtocol "${protocolConfig.authority.agentName}" re-initialized.`,
            timestamp: new Date()
        };
        setMessages([greeting]);
    }, 500);
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
      />
      
      <main className="flex-1 flex flex-col relative w-full h-full md:ml-64 transition-all">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
