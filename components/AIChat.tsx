
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_INSTRUCTION = `
You are the "MonsoonBeads Atelier Assistant", an expert jewelry consultant for a luxury brand inspired by the monsoon rain. 
Your tone is elegant, calm, sophisticated, and helpful. 
The brand aesthetic is "wet-glass", "monsoon mist", and "handcrafted luxury".

Your goal is to help customers:
1. Choose the right bead collection based on their mood (e.g., "Mist Drop" for clarity, "Storm Grey" for resilience, "Rain Gold" for hope).
2. Suggest jewelry combinations.
3. Explain the craftsmanship (hand-polished, water-like surface tension).

Do not be overly salesy. Be like a museum curator or high-end fashion consultant.
Keep responses concise (under 50 words) unless asked for a detailed story.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to the Atelier. I can assist you in finding the perfect piece of rain-inspired luxury. How may I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = ai.models.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, the rain is heavy today and my connection is faint. Please try again momentarily." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white/95 backdrop-blur-xl shadow-2xl rounded-sm overflow-hidden z-50 border border-monsoon-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-monsoon-900 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-monsoon-200" />
                <span className="text-white font-serif tracking-wide">Atelier Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-monsoon-300 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-monsoon-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-sm text-sm font-sans leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-monsoon-800 text-white shadow-md' 
                      : 'bg-white border border-monsoon-100 text-monsoon-800 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-monsoon-100 p-3 rounded-sm shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-monsoon-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-monsoon-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-monsoon-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-monsoon-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about our collections..."
                  className="w-full bg-monsoon-50 border-none text-monsoon-900 placeholder-monsoon-400 text-sm py-3 pl-4 pr-10 rounded-sm focus:ring-1 focus:ring-monsoon-300 outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-1.5 text-monsoon-500 hover:text-monsoon-900 disabled:opacity-50 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-monsoon-900 text-white rounded-full shadow-lg shadow-monsoon-900/20 z-50 hover:bg-monsoon-800 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
};

export default AIChat;
