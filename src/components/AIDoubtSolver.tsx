import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, LanguageType } from '../types';
import { Bot, Send, Mic, Image, Languages, Trash2, Plus, Sparkles, Volume2, Paperclip, User, CornerDownLeft, Check, Copy } from 'lucide-react';

interface AIDoubtSolverProps {
  initialPrompt?: string;
  language: LanguageType;
  board?: string;
  className?: string;
  onLanguageChange: (lang: LanguageType) => void;
}

export const AIDoubtSolver: React.FC<AIDoubtSolverProps> = ({
  initialPrompt,
  language,
  board = 'CBSE',
  className = 'Class 10',
  onLanguageChange
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: language === 'Tamil'
        ? `வணக்கம்! நான் **StudyBee AI Tutor** 🐝. 

நீங்கள் ${board} / ${className} மாணவர் என்பதால், கணிதம், அறிவியல், தமிழ் மற்றும் ஆங்கிலப் பாடங்களின் எந்த சந்தேகத்தையும் கேட்கலாம்!

📸 பாடப் புத்தகப் படத்தை பதிவேற்றலாம் அல்லது 🎤 குரல் வழியாகவும் கேட்கலாம்.`
        : `Hello! I'm your **StudyBee AI Tutor** 🐝. 

I'm ready to solve any doubt for **${board} — ${className}** across Mathematics, Physics, Chemistry, Biology, Tamil, and English!

Feel free to type your doubt, 📸 upload a photo of your textbook question, or 🎤 speak via voice.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chatHistoryList, setChatHistoryList] = useState([
    'Real Numbers & Euclid Lemma',
    'Chemical Reactions Balance',
    'Tamil Grammar Rules',
    'Newton Laws of Motion'
  ]);
  const [activeHistory, setActiveHistory] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedImage(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Voice Input Simulation / Speech Recognition
  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Check if browser SpeechRecognition is available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'Tamil' ? 'ta-IN' : 'en-US';
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputQuestion(prev => (prev ? prev + ' ' + transcript : transcript));
          setIsRecording(false);
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.start();
      } else {
        setTimeout(() => {
          setInputQuestion(prev => (prev ? prev + ' Explain Euclid Division Lemma with example' : 'Explain Euclid Division Lemma with example'));
          setIsRecording(false);
        }, 2000);
      }
    }
  };

  // Text-To-Speech Output
  const speakResponse = (textToSpeak: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = textToSpeak.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language === 'Tamil' ? 'ta-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Send Doubt to Gemini API Backend
  const handleSendDoubt = async () => {
    if (!inputQuestion.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputQuestion,
      imageUrl: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQ = inputQuestion;
    const currentImg = selectedImage;

    setInputQuestion('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ,
          imageBase64: currentImg,
          language,
          board,
          className,
          subject: 'General Science & Maths'
        })
      });

      const data = await res.json();
      const aiText = data.text || "I have analyzed your doubt! Keep learning!";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: language === 'Tamil'
          ? "மன்னிக்கவும், இணைப்பில் சிறு தாமதம் ஏற்பட்டுள்ளது. மீண்டும் முயற்சிக்கவும்."
          : "Sorry, I had trouble connecting. Please try asking again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
      <div className="bg-white rounded-[22px] border border-slate-200/80 shadow-soft overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[720px] max-h-[800px]">
        
        {/* Left Sidebar: Chat History & Topics */}
        <div className="lg:col-span-3 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 flex flex-col justify-between hidden lg:flex">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] flex items-center justify-center text-white text-sm">
                  🐝
                </div>
                <span className="font-poppins font-bold text-white text-sm">AI Doubt Solver</span>
              </div>

              <button
                onClick={() => {
                  setMessages([]);
                  setInputQuestion('');
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="New Chat"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Language Switcher Button in Sidebar */}
            <div className="mb-4 p-3 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 font-inter">Language:</span>
              <button
                onClick={() => onLanguageChange(language === 'English' ? 'Tamil' : 'English')}
                className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white text-[10px] font-bold font-poppins cursor-pointer"
              >
                {language === 'Tamil' ? 'தமிழ்' : 'English'}
              </button>
            </div>

            {/* History List */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-2">
                Recent Doubt Chats
              </div>
              {chatHistoryList.map((hist, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveHistory(idx)}
                  className={`p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center justify-between ${
                    activeHistory === idx ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{hist}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-inter">
            Powered by Gemini 3.6 Flash • StudyBee 2026
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="lg:col-span-9 flex flex-col justify-between bg-[#F8FAFC]">
          
          {/* Header */}
          <div className="p-4 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🐝
              </div>
              <div>
                <h3 className="text-sm font-bold font-poppins text-slate-900 flex items-center space-x-2">
                  <span>StudyBee AI Tutor</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[11px] text-slate-500 font-inter">
                  {board} • {className} • {language} Mode
                </p>
              </div>
            </div>

            {/* Language Switcher for Mobile */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onLanguageChange(language === 'English' ? 'Tamil' : 'English')}
                className="lg:hidden px-3 py-1.5 rounded-full bg-indigo-50 text-[#6D5EF7] border border-indigo-100 text-xs font-bold font-poppins"
              >
                {language === 'Tamil' ? 'தமிழ்' : 'English'}
              </button>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser ? 'bg-slate-900 text-white' : 'bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white shadow-sm'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : '🐝'}
                  </div>

                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-[20px] p-4 text-xs sm:text-sm font-inter leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-soft'
                  }`}>
                    {msg.imageUrl && (
                      <div className="mb-3 rounded-xl overflow-hidden max-h-48 border border-white/20">
                        <img src={msg.imageUrl} alt="Uploaded doubt" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="whitespace-pre-line font-inter">{msg.text}</div>

                    {!isUser && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => speakResponse(msg.text)}
                            className="hover:text-[#6D5EF7] transition-colors p-1"
                            title="Read Aloud"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(msg.text)}
                            className="hover:text-[#6D5EF7] transition-colors p-1"
                            title="Copy text"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white flex items-center justify-center text-xs">
                  🐝
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center space-x-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#6D5EF7] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#8B7CFF] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs text-slate-500 font-inter ml-1">StudyBee AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-slate-200/80">
            {selectedImage && (
              <div className="mb-3 relative inline-block">
                <img src={selectedImage} alt="Selected" className="h-16 rounded-xl border border-indigo-300" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-[22px] border border-slate-200 focus-within:border-[#6D5EF7] focus-within:bg-white transition-all">
              
              {/* Image Upload Button */}
              <label className="p-2.5 rounded-xl hover:bg-slate-200/80 text-slate-600 transition-colors cursor-pointer" title="Upload Question Image">
                <Image className="w-5 h-5 text-indigo-600" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {/* Voice Microphone Button */}
              <button
                onClick={toggleVoiceRecording}
                className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                  isRecording ? 'bg-rose-500 text-white animate-pulse' : 'hover:bg-slate-200/80 text-slate-600'
                }`}
                title="Voice Dictation"
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Input Field */}
              <input
                type="text"
                placeholder={
                  language === 'Tamil'
                    ? 'உங்கள் பாடச் சந்தேகத்தைக் கேட்கவும்...'
                    : 'Ask your doubt (e.g., Solve 2x + 3 = 11 or explain Photosynthesis)...'
                }
                value={inputQuestion}
                onChange={e => setInputQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendDoubt()}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm focus:outline-none text-slate-800 font-inter px-2"
              />

              {/* Submit Button */}
              <button
                onClick={handleSendDoubt}
                disabled={!inputQuestion.trim() && !selectedImage}
                className="p-3 rounded-2xl bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
