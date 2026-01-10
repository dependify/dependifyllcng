
import React from 'react';
import { AppMode } from '../types';
import { COMPANY_NAME } from '../constants';

interface HeaderProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleSidebar: () => void;
  onClearHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode, toggleSidebar, onClearHistory }) => {
  return (
    <header className="bg-white border-b px-3 py-3 flex items-center justify-between shadow-sm z-50">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <i className="fas fa-bars text-lg"></i>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-robot text-sm"></i>
          </div>
          <div className="block">
            <h1 className="font-extrabold text-slate-900 text-[12px] leading-tight tracking-tight">{COMPANY_NAME}</h1>
            <p className="text-[9px] text-green-600 font-bold uppercase tracking-wider">Online</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setMode(AppMode.TEXT)}
            className={`p-2 px-2.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
              mode === AppMode.TEXT 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-keyboard text-xs"></i>
            <span className="text-[10px] font-black">TEXT</span>
          </button>
          <button
            onClick={() => setMode(AppMode.VOICE)}
            className={`p-2 px-2.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
              mode === AppMode.VOICE 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-microphone text-xs"></i>
            <span className="text-[10px] font-black">VOICE</span>
          </button>
        </div>

        <button
          onClick={onClearHistory}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Clear Chat History"
        >
          <i className="fas fa-trash-can text-sm"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
