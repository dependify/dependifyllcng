
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Blob } from '@google/genai';
import { getSystemInstruction } from '../constants';
import { INITIAL_KNOWLEDGE, CompanyKnowledge } from '../knowledgeBase';

const KB_STORAGE_KEY = 'dependify_knowledge_base';

interface VoiceInterfaceProps {
  onNewTranscription: (userText: string, botText: string) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onNewTranscription }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [playbackVolume, setPlaybackVolume] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Refs for state that needs to be accessed in closures (solving stale closure issues)
  const isConnectedRef = useRef(false);
  const sessionRef = useRef<any>(null);
  const onNewTranscriptionRef = useRef(onNewTranscription);
  const interimTranscriptRef = useRef('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionRef = useRef({ user: '', model: '' });
  
  const localRecognitionRef = useRef<any>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);
  const isStoppingRef = useRef(false);

  // Sync props and state to refs to keep stopSession stable
  useEffect(() => {
    onNewTranscriptionRef.current = onNewTranscription;
  }, [onNewTranscription]);

  useEffect(() => {
    interimTranscriptRef.current = interimTranscript;
  }, [interimTranscript]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      if (isConnectedRef.current) stopSession();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current && outputAudioContextRef.current) {
      const now = outputAudioContextRef.current.currentTime;
      gainNodeRef.current.gain.setTargetAtTime(playbackVolume, now, 0.1);
    }
  }, [playbackVolume]);

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const createBlob = (data: Float32Array, sampleRate: number): Blob => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      // Clamp values to -1 to 1 before converting to PCM
      const s = Math.max(-1, Math.min(1, data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: `audio/pcm;rate=${sampleRate}`,
    };
  };

  const stopSession = useCallback(() => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;
    isConnectedRef.current = false; // Update ref immediately

    // Cleanup Visualizer
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (analyserRef.current) {
        try { analyserRef.current.disconnect(); } catch(e) {}
        analyserRef.current = null;
    }

    // FLUSH TRANSCRIPTION: Save what we have to the main chat
    if (transcriptionRef.current.user || transcriptionRef.current.model) {
      onNewTranscriptionRef.current(transcriptionRef.current.user, transcriptionRef.current.model);
      transcriptionRef.current = { user: '', model: '' };
    }

    if (localRecognitionRef.current) {
      localRecognitionRef.current.stop();
      localRecognitionRef.current = null;
      if (interimTranscriptRef.current.trim()) {
        onNewTranscriptionRef.current(interimTranscriptRef.current.trim(), "[Offline Voice Note]");
        setInterimTranscript(''); // Trigger state update safely
      }
    }

    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }

    // Disconnect script processor to stop events
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch(e) {}
      processorRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try { audioContextRef.current.close(); } catch(e) { console.warn("Error closing input audio context", e); }
    }
    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
      try { outputAudioContextRef.current.close(); } catch(e) { console.warn("Error closing output audio context", e); }
    }
    
    setIsConnected(false);
    setIsListening(false);
    setVolume(0);
    nextStartTimeRef.current = 0;
    isStoppingRef.current = false;
  }, []); // Empty dependency array ensures stability!

  const startOfflineTranscription = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-NG';

    recognition.onstart = () => {
      setIsConnected(true);
      setIsListening(true);
      setInterimTranscript('');
      setError(null);
      isConnectedRef.current = true;
      
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        audioContextRef.current = inputCtx;
        
        // Setup Visualizer independent of recognition
        const analyser = inputCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = inputCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyserRef.current = analyser;

        const updateVisuals = () => {
          if (!analyserRef.current) return;
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setVolume(Math.min(1, avg / 50)); 
          rafRef.current = requestAnimationFrame(updateVisuals);
        };
        updateVisuals();

      }).catch(e => console.error("Mic volume meter access failed:", e));
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setInterimTranscript(prev => prev + ' ' + currentTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error', event.error);
      setError(`Transcription error: ${event.error}`);
      stopSession();
    };

    recognition.onend = () => {
      if (!isStoppingRef.current) setIsListening(false);
    };

    recognition.start();
    localRecognitionRef.current = recognition;
  };

  const handleManualSave = () => {
    if (interimTranscript.trim()) {
      onNewTranscription(interimTranscript.trim(), "[Saved Local Voice Note]");
      setInterimTranscript('');
      alert("Voice note saved to history!");
    }
  };

  const startSession = async () => {
    if (!isOnline) {
      startOfflineTranscription();
      return;
    }

    try {
      const savedKB = localStorage.getItem(KB_STORAGE_KEY);
      const currentKB: CompanyKnowledge = savedKB ? JSON.parse(savedKB) : INITIAL_KNOWLEDGE;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      if (inputCtx.state === 'suspended') await inputCtx.resume();
      if (outputCtx.state === 'suspended') await outputCtx.resume();

      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const compressor = outputCtx.createDynamicsCompressor();
      const gain = outputCtx.createGain();
      gain.gain.setValueAtTime(playbackVolume, outputCtx.currentTime);
      compressor.connect(gain);
      gain.connect(outputCtx.destination);
      
      compressorNodeRef.current = compressor;
      gainNodeRef.current = gain;

      // Enable echo cancellation and noise suppression
      const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: { 
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
          } 
      });

      // --- VISUALIZER SETUP ---
      const analyser = inputCtx.createAnalyser();
      analyser.fftSize = 256;
      const sourceVisualizer = inputCtx.createMediaStreamSource(stream);
      sourceVisualizer.connect(analyser);
      analyserRef.current = analyser;

      const updateVisuals = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const avg = sum / dataArray.length;
        setVolume(Math.min(1, avg / 40));
        rafRef.current = requestAnimationFrame(updateVisuals);
      };
      updateVisuals();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            isConnectedRef.current = true; // IMPORTANT: Update ref to prevent stale closure access
            setIsConnected(true);
            setIsListening(true);
            setError(null);
            
            const sourceAI = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              if (!isConnectedRef.current) return; // Use REF here, not state!
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData, inputCtx.sampleRate);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            
            sourceAI.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              transcriptionRef.current.model += message.serverContent.outputTranscription.text;
            } else if (message.serverContent?.inputTranscription) {
              transcriptionRef.current.user += message.serverContent.inputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              onNewTranscriptionRef.current(transcriptionRef.current.user, transcriptionRef.current.model);
              transcriptionRef.current = { user: '', model: '' };
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const outputCtx = outputAudioContextRef.current!;
              const BUFFER_DELAY = 0.05;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime + BUFFER_DELAY);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(compressorNodeRef.current || outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Session error:', e);
          },
          onclose: (e) => {
            console.log("Session closed", e);
            if (!isStoppingRef.current) {
                stopSession();
            }
          },
        },
        config: {
          responseModalities: ['AUDIO'],
          systemInstruction: getSystemInstruction(currentKB) + "\nSTRICT REQUIREMENT: Speak with a professional and friendly Nigerian accent.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start session:', err);
      setError("Microphone access denied or service unavailable.");
      setIsListening(false);
      setIsConnected(false);
      isConnectedRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (sessionRef.current) stopSession();
    };
  }, [stopSession]);

  return (
    <div className="flex-1 flex flex-col items-center p-0 overflow-hidden relative">
      {!isOnline && (
        <div className="w-full bg-amber-500 text-white py-1 px-4 text-center z-50 shadow-md">
          <p className="text-[9px] font-black uppercase tracking-widest">Offline Mode · Local Transcription Only</p>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center w-full p-6 space-y-8 min-h-0">
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full scale-150 blur-xl transition-all duration-300 ${isListening ? (isOnline ? 'bg-blue-500/10 animate-pulse' : 'bg-amber-500/10 animate-pulse') : 'opacity-0'}`}></div>
            <div 
              className="w-40 h-40 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-slate-50 relative z-10 transition-transform duration-100"
              style={{ transform: `scale(${1 + volume * 0.15})` }}
            >
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors duration-500 relative ${isListening ? (isOnline ? 'bg-blue-600' : 'bg-amber-500') : 'bg-slate-200'}`}>
                {isListening && (
                  <>
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isOnline ? 'bg-blue-400' : 'bg-amber-400'}`}></div>
                    <div className={`absolute -inset-2 rounded-full animate-pulse opacity-10 ${isOnline ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                  </>
                )}
                <i className={`fas fa-microphone text-3xl transition-all duration-300 relative z-10 ${isListening ? 'text-white' : 'text-slate-400'} ${isListening && volume > 0.05 ? 'animate-bounce' : ''}`}></i>
              </div>
            </div>
          </div>
          
          {/* Visual Volume Indicator */}
          {isListening && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <i className={`fas fa-microphone-lines text-xs ${volume > 0.05 ? 'text-green-500' : 'text-slate-400'}`}></i>
              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-75 ease-out rounded-full ${volume > 0.8 ? 'bg-red-500' : volume > 0.5 ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(100, volume * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-[240px] flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2 w-full bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter flex items-center gap-1.5">
                <i className="fas fa-volume-high text-blue-600"></i>
                AI Speaker Volume
              </span>
              <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                {Math.round(playbackVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={playbackVolume}
              onChange={(e) => setPlaybackVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
            />
          </div>
        </div>

        <div className="text-center max-w-sm w-full space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 leading-none">
              {isListening ? (isOnline ? "Assistant Listening" : "Local Recording") : "Voice Control"}
            </h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              {isConnected ? "ACTIVE SESSION" : "READY TO CONNECT"}
            </p>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-[11px] rounded-xl flex items-start gap-3 shadow-sm animate-in zoom-in-95">
              <div className="bg-red-500 p-1 rounded-full text-white shrink-0"><i className="fas fa-exclamation text-[8px]"></i></div>
              <p className="font-medium opacity-90 leading-tight">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={isConnected ? stopSession : startSession}
              className={`w-full py-4 rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${isConnected ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : isOnline ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'}`}
            >
              <i className={`fas ${isConnected ? 'fa-stop' : 'fa-microphone'}`}></i>
              <span className="whitespace-nowrap">
                {isConnected ? 'End Conversation' : (isOnline ? 'Start Voice Chat' : 'Voice Note')}
              </span>
            </button>

            {!isOnline && isConnected && interimTranscript && (
              <button
                onClick={handleManualSave}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 animate-in slide-in-from-bottom-2"
              >
                <i className="fas fa-save"></i>
                Save Note Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
