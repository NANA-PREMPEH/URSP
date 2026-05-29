import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw, Layers } from "lucide-react";
import { ChatMessage } from "../types";

export default function URSPChatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "model",
      text: "Hello! Amphi! I am your **URSP AI Advisor**representing the Ubuntu Rising Scholars Program founded by Festus Cobena Ainoo. \n\nHow can I help you today? You can ask about Graduate Assistantships, target universities, Statement of Purpose outline reviews, or F-1 Visa guidance!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorWord, setErrorWord] = useState<string>("");

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chat bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    setErrorWord("");
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputText("");
    setIsLoading(true);

    try {
      // Assemble history up to last 4 messages for context (keeping payloads small)
      const chatHistory = messages.slice(-4).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory
        })
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || data?.message || "Guidance endpoint offline.");
      }

      const modelMsg: ChatMessage = {
        id: `msg-model-${Date.now()}`,
        role: "model",
        text: data.text || "I was unable to retrieve a response. Please review spelling.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      setErrorWord("Could not coordinate counseling session. Check .env.local and restart npm run dev.");
      const errorMsg: ChatMessage = {
        id: `msg-model-err-${Date.now()}`,
        role: "model",
        text: `### Connection Error\n\nI couldn't contact my advisor brain.\n\n**Setup fix:** Add \`OPENROUTER_API_KEY\` to \`.env.local\`. If you still have \`GEMINI_API_KEY\`, replace it and restart \`npm run dev\`.\n\n*Error details: ${err.message || "Unknown error"}*`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (qText: string) => {
    handleSendMessage(qText);
  };

  const resetConversation = () => {
    if (window.confirm("Initialize fresh conversation history?")) {
      setMessages([
        {
          id: "msg-it",
          role: "model",
          text: "Hello! I am your **URSP AI Advisor**. How can I assist with your graduate study, funding, or admissions journey today?",
          timestamp: new Date()
        }
      ]);
      setErrorWord("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="floating-chatbot-workspace">
      
      {/* 1. Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="toggle-advisor-chat"
          className="bg-slate-950 text-white rounded-full p-4 hover:scale-105 active:scale-95 shadow-2xl transition-all border border-indigo-500/20 group flex items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="h-6 w-6 text-indigo-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider pr-1 hidden sm:inline">
            URSP AI Advisor
          </span>
          <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping absolute top-0.5 right-0.5" />
        </button>
      )}

      {/* 2. Floating Chat Window Box */}
      {isOpen && (
        <div 
          className="bg-white border border-slate-250 w-[350px] sm:w-[420px] h-[550px] rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          id="advisor-chat-window"
        >
          {/* Header of Chat */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-indigo-500/10">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm tracking-tight">URSP AI Advisor</h4>
                <p className="text-[10px] font-mono font-medium text-indigo-400 uppercase tracking-widest">
                  Active Mentoring Agent
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={resetConversation}
                title="Reset history"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                id="reset-chat-btn"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                id="close-chat-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages container workspace */}
          <div className="flex-1 bg-slate-50/70 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm shadow-xs ${
                    m.role === "user"
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none leading-relaxed"
                  }`}
                >
                  {/* Human-looking structured lines */}
                  {m.text.split("\n").map((chunk, cIdx) => {
                    const cleanChunk = chunk.replace(/\*\*/g, "");
                    if (chunk.startsWith("### ")) {
                      return <h5 key={cIdx} className="font-bold text-slate-900 text-xs sm:text-sm mt-3 mb-1">{chunk.replace("### ", "")}</h5>;
                    }
                    if (chunk.startsWith("- ")) {
                      return (
                        <div key={cIdx} className="flex gap-1.5 text-xs text-slate-700 pl-1 py-0.5">
                          <span className="text-indigo-600">•</span>
                          <span>{chunk.substring(2)}</span>
                        </div>
                      );
                    }
                    return <p key={cIdx} className={cleanChunk ? "my-1" : "my-2"}>{cleanChunk}</p>;
                  })}
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
                  {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-2 max-w-[80%] rounded-tl-none shadow-xs">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">Advisor analyzing...</span>
                </div>
              </div>
            )}

            {/* Empty point at bottom */}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Guidance buttons suggestions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-slate-100 bg-white grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-705">
              <button
                onClick={() => handleQuickQuestion("What are the prerequisites for Cohort III?")}
                className="text-left bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-900 transition-colors leading-snug cursor-pointer"
              >
                🎒 Pre-requisites for Cohort III?
              </button>
              <button
                onClick={() => handleQuickQuestion("How do I request a TOEFL English test waiver?")}
                className="text-left bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-900 transition-colors leading-snug cursor-pointer"
              >
                📝 Request TOEFL waived?
              </button>
              <button
                onClick={() => handleQuickQuestion("What is a Graduate Assistantship, and how is it free?")}
                className="text-left bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-900 transition-colors leading-snug cursor-pointer"
              >
                🎓 Graduate Assistantships explained?
              </button>
              <button
                onClick={() => handleQuickQuestion("How did Festus Ainoo achieve 100% funding?")}
                className="text-left bg-slate-50 border border-slate-200 rounded-lg p-2 hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-900 transition-colors leading-snug cursor-pointer"
              >
                🇬🇭 Founder&apos;s educational career?
              </button>
            </div>
          )}

          {/* Input control field footer */}
          <div className="p-4 bg-white border-t border-slate-150 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about fully funded studies..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
              id="advisor-input-text"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              id="send-chat-message-btn"
              className="p-3 bg-slate-950 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer shrink-0"
              disabled={isLoading || !inputText.trim()}
            >
              <Send className="h-4.5 w-4.5 text-indigo-400" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
