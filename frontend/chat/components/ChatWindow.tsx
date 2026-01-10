
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';
import { getSystemInstruction } from '../constants';
import { INITIAL_KNOWLEDGE, CompanyKnowledge } from '../knowledgeBase';

const KB_STORAGE_KEY = 'dependify_knowledge_base';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (role: 'user' | 'model', text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages or streaming content changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, streamingMessage]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading || streamingMessage !== null) return;

    const userText = inputText.trim();
    setInputText('');
    onSendMessage('user', userText);
    setIsLoading(true);

    try {
      // Get latest knowledge base from storage or defaults
      const savedKB = localStorage.getItem(KB_STORAGE_KEY);
      const currentKB: CompanyKnowledge = savedKB ? JSON.parse(savedKB) : INITIAL_KNOWLEDGE;
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `Context History: ${JSON.stringify(messages.slice(-10))}` }] },
          { role: 'user', parts: [{ text: userText }] }
        ],
        config: {
          systemInstruction: getSystemInstruction(currentKB),
          tools: [{ googleSearch: {} }]
        }
      });

      let fullResponse = '';
      setIsLoading(false); 
      setStreamingMessage('');

      for await (const chunk of responseStream) {
        const textChunk = (chunk as GenerateContentResponse).text;
        if (textChunk) {
          fullResponse += textChunk;
          setStreamingMessage(fullResponse);
        }
      }

      if (fullResponse) {
        onSendMessage('model', fullResponse);
      } else {
        onSendMessage('model', "I'm sorry, I couldn't generate a response. Please try again.");
      }
      
    } catch (error) {
      console.error("Chat error:", error);
      onSendMessage('model', "I'm having trouble connecting. Please check your connection and try again!");
    } finally {
      setIsLoading(false);
      setStreamingMessage(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-50"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`
              max-w-[85%] rounded-2xl p-3 shadow-sm relative group
              ${msg.role === 'user' 
                ? 'bg-blue-700 text-white rounded-br-none' 
                : 'bg-white text-slate-900 border border-slate-300 rounded-bl-none'}
            `}>
              {msg.role === 'model' && (
                <button
                  onClick={() => handleCopy(msg.text, msg.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-blue-300 hover:text-blue-600 z-10"
                  title="Copy to clipboard"
                >
                  <i className={`fas ${copiedId === msg.id ? 'fa-check text-green-500' : 'fa-copy text-[10px]'}`}></i>
                </button>
              )}
              
              <p className="text-[13px] whitespace-pre-wrap leading-relaxed font-semibold">{msg.text}</p>
              <span className={`text-[9px] mt-1 block font-bold text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {streamingMessage !== null && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="max-w-[85%] rounded-2xl p-3 shadow-sm bg-white text-slate-900 border border-slate-300 rounded-bl-none">
              <p className="text-[13px] whitespace-pre-wrap leading-relaxed font-semibold">
                {streamingMessage}
                <span className="inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse align-middle"></span>
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col gap-1">
              <div className="bg-white border border-slate-300 rounded-2xl p-3 flex gap-1.5 shadow-sm items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-duration:0.8s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></span>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">
                Dependify AI is typing...
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading || streamingMessage !== null}
            placeholder={isLoading ? "Thinking..." : streamingMessage !== null ? "AI is responding..." : "Type your message here..."}
            className="flex-1 bg-white border-2 border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 transition-colors placeholder-slate-500 disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading || streamingMessage !== null}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-90"
            aria-label="Send Message"
          >
            {isLoading || streamingMessage !== null ? (
              <i className="fas fa-spinner fa-spin text-sm"></i>
            ) : (
              <i className="fas fa-paper-plane text-sm"></i>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
