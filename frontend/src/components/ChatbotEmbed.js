import React, { useState } from 'react';

/**
 * ChatbotEmbed - Floating chatbot widget that embeds the voice chat app via iframe
 * Uses high z-index to ensure it appears above all other UI elements
 */
const ChatbotEmbed = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="chatbot-embed-container">
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600'
                    }`}
                style={{ zIndex: 9999 }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {isOpen ? (
                        <>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                    ) : (
                        <>
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </>
                    )}
                </svg>
                {!isOpen && (
                    <span
                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"
                    />
                )}
            </button>

            {/* Chat Window Container with Iframe */}
            <div
                className={`fixed bottom-24 right-6 w-[95vw] sm:w-[420px] h-[70vh] max-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 pointer-events-none translate-y-10'
                    }`}
                style={{ zIndex: 9998 }}
            >
                <iframe
                    src="/chatbot/index.html?embed=true"
                    title="Dependify AI Assistant"
                    className="w-full h-full border-0"
                    allow="microphone"
                />
            </div>
        </div>
    );
};

export default ChatbotEmbed;
