
import React, { useState, useEffect } from 'react';
import { Message, AppMode } from './types';
import { COMPANY_NAME } from './constants';
import ChatWindow from './components/ChatWindow';
import VoiceInterface from './components/VoiceInterface';
import Header from './components/Header';
import LandingContent from './components/LandingContent';

const STORAGE_KEY = 'dependify_chat_history';

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'model',
  text: "Welcome to Dependify LLC! How can our technology experts assist you today?",
  timestamp: new Date()
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
    return [INITIAL_MESSAGE];
  });

  const [mode, setMode] = useState<AppMode>(AppMode.TEXT);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessage = (role: 'user' | 'model', text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      role,
      text,
      timestamp: new Date()
    }]);
  };

  const clearHistory = () => {
    if (window.confirm("Clear conversation history?")) {
      setMessages([INITIAL_MESSAGE]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Check if running in embed mode
  const isEmbed = new URLSearchParams(window.location.search).get('embed') === 'true';

  useEffect(() => {
    if (isEmbed) {
      setIsOpen(true);
    }
  }, [isEmbed]);

  return (
    <div className={`chatbot-widget-container ${isEmbed ? 'h-full w-full' : ''}`}>
      {/* Floating Toggle Button */}
      {!isEmbed && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-[9999] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600'}`}
        >
          <i className={`fas ${isOpen ? 'fa-xmark' : 'fa-comment-dots'} text-white text-2xl`}></i>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>
      )}

      {/* Main Chat Container - Increased height to 85vh and max-height to 850px */}
      <div className={`
        ${isEmbed ? 'relative w-full h-full' : `fixed bottom-24 right-6 z-[9998] w-[95vw] sm:w-[450px] h-[85vh] max-h-[850px] transition-all duration-500 ease-out origin-bottom-right transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 pointer-events-none translate-y-10'}`}
        bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden
      `}>
        <Header
          mode={mode}
          setMode={setMode}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          onClearHistory={clearHistory}
        />

        <div className="flex-1 flex overflow-hidden relative">
          {/* Internal Sidebar for Info/Config */}
          <div className={`
            absolute inset-0 z-40 bg-white transform transition-transform duration-300 shadow-xl
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <LandingContent />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white/80 rounded-full"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 flex flex-col bg-slate-50">
            {mode === AppMode.TEXT ? (
              <ChatWindow messages={messages} onSendMessage={addMessage} />
            ) : (
              <VoiceInterface onNewTranscription={(userText, botText) => {
                if (userText) addMessage('user', userText);
                if (botText) addMessage('model', botText);
              }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
