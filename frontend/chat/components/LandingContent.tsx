
import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_KNOWLEDGE, CompanyKnowledge, Service } from '../knowledgeBase';

const STORAGE_KEY = 'dependify_knowledge_base';
const ADMIN_KEY = 'dependify_admin_pass';
const DEFAULT_PASS = 'admin123';

const LandingContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'edit' | 'integrate'>('info');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  // Diagnostic state
  const [micTestActive, setMicTestActive] = useState(false);
  const [testVolume, setTestVolume] = useState(0);
  const testRafRef = useRef<number>();
  const testContextRef = useRef<AudioContext>();
  
  const [data, setData] = useState<CompanyKnowledge>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load landing content:", e);
      }
    }
    return INITIAL_KNOWLEDGE;
  });

  const getStoredPassword = () => localStorage.getItem(ADMIN_KEY) || DEFAULT_PASS;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === getStoredPassword()) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setActiveTab('info');
    stopMicTest();
  };

  const handleChangePassword = () => {
    if (newPassword.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }
    localStorage.setItem(ADMIN_KEY, newPassword);
    setNewPassword('');
    alert("Password updated successfully!");
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert("Knowledge Base updated! The AI will now use this information.");
    setActiveTab('info');
  };

  const handleReset = () => {
    if (window.confirm("Reset all content to defaults?")) {
      setData(INITIAL_KNOWLEDGE);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_KNOWLEDGE));
      setActiveTab('info');
    }
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const newServices = [...data.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setData({ ...data, services: newServices });
  };

  const stopMicTest = () => {
    if (testContextRef.current) {
        testContextRef.current.close();
        testContextRef.current = undefined;
    }
    if (testRafRef.current) {
        cancelAnimationFrame(testRafRef.current);
        testRafRef.current = undefined;
    }
    setMicTestActive(false);
    setTestVolume(0);
  };

  const toggleMicTest = async () => {
    if (micTestActive) {
      stopMicTest();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        testContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        
        const loop = () => {
             const data = new Uint8Array(analyser.frequencyBinCount);
             analyser.getByteFrequencyData(data);
             let sum = 0; 
             data.forEach(v => sum += v);
             const avg = sum / data.length;
             setTestVolume(Math.min(1, avg / 50)); 
             testRafRef.current = requestAnimationFrame(loop);
        }
        loop();
        setMicTestActive(true);
      } catch (e: any) {
        alert("Could not access microphone: " + e.message);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopMicTest();
  }, []);

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto relative">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeTab === 'info' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            OVERVIEW
          </button>
          <button 
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeTab === 'edit' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            EDIT
          </button>
          <button 
            onClick={() => setActiveTab('integrate')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeTab === 'integrate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            DEPLOY
          </button>
        </div>
      </div>

      <div className="p-6 pb-12 flex-1">
        {activeTab === 'info' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{data.tagline}</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{data.mission}</p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="h-[1px] flex-1 bg-slate-100"></span>
                SOLUTIONS
                <span className="h-[1px] flex-1 bg-slate-100"></span>
              </h3>
              <div className="space-y-6">
                {data.services.map((service, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100">
                      <i className={`fas ${service.icon} text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{service.title}</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden">
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Support</p>
              <p className="text-xs text-slate-300 mb-4">{data.email}</p>
              <a href={data.url} target="_blank" className="block w-full text-center bg-white text-slate-900 py-3 rounded-xl text-[10px] font-black hover:bg-blue-50 transition-all">VISIT WEBSITE</a>
            </div>
          </div>
        )}

        {(activeTab === 'edit' || activeTab === 'integrate') && !isAuthenticated && (
          <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
              <i className="fas fa-lock text-2xl"></i>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Admin Gateway</h3>
              <p className="text-xs text-slate-500 mt-1">Enter your password to manage the chatbot</p>
            </div>
            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input 
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className={`w-full bg-slate-50 border ${loginError ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all`}
                autoFocus
              />
              {loginError && <p className="text-[10px] text-red-500 font-bold text-center">Incorrect password. Please try again.</p>}
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black shadow-lg">UNLOCK ACCESS</button>
            </form>
            <p className="text-[9px] text-slate-400 italic">Default password is 'admin123'</p>
          </div>
        )}

        {activeTab === 'edit' && isAuthenticated && (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration</h3>
              <button onClick={handleLogout} className="text-[9px] font-black text-red-500 uppercase hover:underline">Log Out</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Hero Tagline</label>
                <input 
                  value={data.tagline} 
                  onChange={e => setData({...data, tagline: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Mission Statement</label>
                <textarea 
                  value={data.mission} 
                  onChange={e => setData({...data, mission: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[9px] font-black text-slate-400 uppercase block">Edit Services</label>
              {data.services.map((s, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <input 
                    value={s.title} 
                    onChange={e => updateService(i, 'title', e.target.value)}
                    className="w-full text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1"
                  />
                  <textarea 
                    value={s.description} 
                    onChange={e => updateService(i, 'description', e.target.value)}
                    className="w-full text-[11px] bg-white border border-slate-200 rounded-lg px-2 py-1"
                    rows={2}
                  />
                </div>
              ))}
            </div>
            
            {/* System Diagnostics Panel */}
            <div className="pt-4 border-t space-y-4">
               <label className="text-[9px] font-black text-slate-400 uppercase block">System Diagnostics</label>
               <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <i className="fas fa-stethoscope text-slate-400"></i>
                     <span className="text-xs font-bold text-slate-700">Microphone Test</span>
                   </div>
                   <button 
                     onClick={toggleMicTest}
                     className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${micTestActive ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-600'}`}
                   >
                     {micTestActive ? 'STOP TEST' : 'START TEST'}
                   </button>
                 </div>
                 
                 <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                   <div 
                      className={`h-full transition-all duration-75 ${testVolume > 0.8 ? 'bg-red-500' : testVolume > 0.4 ? 'bg-amber-500' : 'bg-green-500'}`}
                      style={{ width: `${testVolume * 100}%` }}
                   ></div>
                 </div>
                 <p className="text-[9px] text-slate-400 mt-2">
                   Use this to verify if your browser and hardware are correctly capturing audio. If this bar moves but the chatbot doesn't, it is a connection issue.
                 </p>
               </div>
            </div>

            <div className="pt-4 border-t space-y-4">
              <label className="text-[9px] font-black text-slate-400 uppercase block">Security Settings</label>
              <div className="flex gap-2">
                <input 
                  type="password"
                  placeholder="New password..."
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-500 outline-none"
                />
                <button onClick={handleChangePassword} className="bg-slate-900 text-white px-4 rounded-xl text-[9px] font-black">UPDATE</button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button onClick={handleReset} className="flex-1 py-3 rounded-xl bg-red-50 text-red-600 text-[10px] font-black border border-red-100">RESET</button>
              <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black shadow-lg shadow-blue-600/20">SAVE CHANGES</button>
            </div>
          </div>
        )}

        {activeTab === 'integrate' && isAuthenticated && (
          <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
             <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deployment</h3>
              <button onClick={handleLogout} className="text-[9px] font-black text-red-500 uppercase hover:underline">Log Out</button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <h3 className="text-[11px] font-black text-blue-700 uppercase mb-2">Monolith Integration</h3>
              <p className="text-xs text-blue-600 leading-relaxed font-medium">
                To add this chatbot to your monolithic app (Django, PHP, Laravel, etc.), simply copy your built files to your static folder and use the iframe below.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Method 1: Iframe (Recommended)</label>
                <div className="bg-slate-900 rounded-xl p-3 font-mono text-[10px] text-blue-300 break-all select-all cursor-copy">
                  {`<iframe src="/static/chatbot/index.html" style="position:fixed; bottom:20px; right:20px; width:450px; height:80vh; border:none; z-index:9999;"></iframe>`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto p-4 border-t bg-slate-50/50 flex flex-col items-center">
        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">&copy; {new Date().getFullYear()} {data.companyName}</p>
      </div>
    </div>
  );
};

export default LandingContent;
