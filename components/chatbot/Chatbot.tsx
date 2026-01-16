import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatIcon from '../../assets/ChatIcon';
import { generateSystemInstruction } from '../../constants';
import { useStatistics } from '../../hooks/useStatistics';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "How do I book a session?",
  "Tell me about the mission.",
  "What subjects do you offer?",
  "Who is on the team?",
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: statistics } = useStatistics();

  const startNewChat = () => {
    if (process.env.API_KEY) {
      const systemInstruction = generateSystemInstruction(statistics);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction,
        },
      });
      setChat(chatSession);
    }
  };

  // Initialize chat on mount and when statistics update
  useEffect(() => {
    startNewChat();
  }, [statistics]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  const sendMessage = async (text: string) => {
    if (!text.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
        const responseStream = await chat.sendMessageStream({ message: text });
        
        let fullResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of responseStream) {
            fullResponse += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = fullResponse;
                return newMessages;
            });
        }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputValue('');
    startNewChat();
  };

  return (
    <>
      {/* Chatbot Window */}
      <div className={`fixed bottom-20 right-4 sm:right-6 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[600px] bg-navy-light rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="flex items-center justify-between p-4 bg-navy rounded-t-2xl border-b border-navy-light/50">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            LTG AI Assistant
          </h3>
          <div className="flex items-center space-x-1">
             <button 
                onClick={handleClearChat} 
                className="p-2 text-accent hover:text-white rounded-full hover:bg-navy-light/50 transition-colors"
                title="Clear conversation"
                aria-label="Clear conversation"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 text-accent hover:text-white rounded-full hover:bg-navy-light/50 transition-colors" aria-label="Close chat">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <img src="/assets/LTGlogo.png" alt="LTG Logo" className="w-16 h-16 mb-4 opacity-50"/>
                    <p className="text-accent mb-8 text-sm sm:text-base">Hi, I'm Adam! Ask me about tutoring, our mission, or how to book a session. ✨</p>
                    
                    <div className="w-full space-y-2">
                        {SUGGESTED_QUESTIONS.map((question, idx) => (
                            <button
                                key={idx}
                                onClick={() => sendMessage(question)}
                                className="w-full bg-navy/40 hover:bg-navy-light border border-navy-light/50 hover:border-accent text-accent hover:text-white py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${msg.role === 'user' ? 'bg-accent text-navy rounded-br-none' : 'bg-navy text-white rounded-bl-none'}`}>
                        <div className="prose prose-sm prose-invert prose-p:my-1 text-inherit">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                        </div>
                    </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-navy text-white rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-2 shadow-md">
                            <span className="h-2 w-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-accent rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
                </div>
            )}
        </div>

        <form onSubmit={handleFormSubmit} className="p-4 border-t border-navy bg-navy-light/50 rounded-b-2xl">
          <div className="flex items-center bg-navy rounded-full shadow-inner border border-navy-light/30">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 w-full bg-transparent text-white px-5 py-3 rounded-full focus:outline-none placeholder-gray-400 text-sm"
              aria-label="Chat input"
              disabled={isLoading || !chat}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim() || !chat} className="p-2 mr-2 text-accent rounded-full hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Send message">
                <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 sm:right-6 bg-accent text-navy p-4 rounded-full shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-light focus:ring-white transform transition-transform hover:scale-110 z-50"
        aria-label="Toggle chat"
      >
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
            <ChatIcon className="h-6 w-6" />
        )}
      </button>
    </>
  );
};

export default Chatbot;