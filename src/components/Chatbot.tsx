import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, Zap, ArrowRight } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial_welcome",
      sender: "bot",
      text: "Namaste! I am Shubh AI, client consultant for Shubh Developments. How can I assist you with your web project plans today? Feel free to ask about our pricing packages, delivery times, or technology integrations!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Suggested questions list
  const suggestedPrompts = [
    { label: "💰 Starting rates?", prompt: "What are your starting pricing packages for websites?" },
    { label: "⚡ Landing page time?", prompt: "How fast can you deliver a Frontend/Landing Page website?" },
    { label: "🛍️ E-Commerce features?", prompt: "What features are included in Shubh Developments' E-Commerce systems?" },
    { label: "🌍 Do you do SEO?", prompt: "Is search engine optimization (SEO) included in your developments?" },
  ];

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    // Clear buffer holding user input
    if (textToSend === inputText) {
      setInputText("");
    }

    // Append User Message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setErrorText(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Service returned an error status");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.text || "I was unable to calculate an response. Let's try phrasing it differently!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("AI Assistant network error:", err);
      // Nice context-specific error bubble
      setErrorText("Oops, the secure chat gateway could not be completed. I will retry in a fallback demo model.");
      
      // Fallback demo reply logic
      let demoReply = "I am Shubh AI. Shubh Developments is ready to build your custom website. You can lock in custom portfolios (from ₹8,000) or business systems (from ₹15,000) directly on WhatsApp (+91 9557494047) or email shubhmishra2090@gmail.com! How can I assist you right now?";
      const lowerText = text.toLowerCase();
      if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("starting")) {
        demoReply = "Shubh Developments offers fully transparent pricing options: Portfolios start at ₹8,000, Front-End websites start at ₹10,000, Business structures start at ₹15,000, and fully custom E-Commerce solutions start at ₹25,000. Text us directly on WhatsApp at +91 9557494047 to lock in your discount budget!";
      } else if (lowerText.includes("time") || lowerText.includes("days") || lowerText.includes("delivery")) {
        demoReply = "We prioritized lightning-fast launches: Landing & Front-End layouts are engineered in 3-5 days, portfolios require 5-7 days, and intensive platforms 7-14 days. Express modes are available! Direct-message us at +91 9557494047 to speed up your project.";
      } else if (lowerText.includes("seo") || lowerText.includes("google")) {
        demoReply = "Yes indeed! Search optimization structural design, asset minification/compression, standard meta configurations, and localized SEO setups come fully included with all Shubh Developments products.";
      }

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "bot",
            text: demoReply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsLoading(false);
      }, 850);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Bubble (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center space-x-2.5 bg-white text-black border border-black p-4 sm:px-5 sm:py-4 rounded-none shadow-2xl hover:bg-zinc-200 transition-all duration-200 cursor-pointer"
        >
          {isOpen ? (
            <X className="h-5 w-5 text-black" />
          ) : (
            <>
              <div className="relative">
                <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.15em] font-black">Consult Shubh AI</span>
            </>
          )}
        </button>
      </div>

      {/* Expanded Interactive Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[92%] sm:w-[410px] h-[520px] bg-[#111111] border border-white/10 rounded-none overflow-hidden shadow-2xl flex flex-col justify-between font-mono">
          
          {/* Header Panel */}
          <div className="bg-zinc-950 border-b border-white/10 p-4.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-zinc-900 border border-white/15 text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-black uppercase text-white tracking-widest">Shubh AI Agent</span>
                  <span className="text-[8px] uppercase tracking-wider font-black text-black bg-white px-1.5 py-0.5 border border-white">
                    LIVE
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">Scoping Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Logs Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/10">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  {/* Avatar */}
                  {!isUser && (
                    <div className="p-1.5 rounded-none bg-zinc-900 border border-white/10 text-white shrink-0">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div>
                    {/* Speech box */}
                    <div
                      className={`p-3.5 rounded-none text-[12px] leading-relaxed select-text ${
                        isUser
                          ? "bg-white text-black font-black"
                          : "bg-zinc-900 border border-white/10 text-zinc-300"
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>

                    {/* Timestamp */}
                    <span className="block text-[8px] text-zinc-500 font-mono mt-1 px-1 tracking-wider uppercase">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader state */}
            {isLoading && (
              <div className="flex items-start gap-2.5 max-w-[70%] mr-auto">
                <div className="p-1.5 bg-zinc-900 border border-white/10 text-white shrink-0 select-none">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-zinc-905 border border-white/10 p-3.5 rounded-none flex space-x-1.5 items-center">
                  <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce"></div>
                  <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            {/* Error state */}
            {errorText && (
              <div className="flex items-center space-x-2 p-2 bg-zinc-950 border border-white/10 rounded-none text-zinc-400 text-[10px]">
                <AlertCircle className="h-3.5 w-3.5 text-white shrink-0" />
                <span className="truncate uppercase tracking-wider">{errorText}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Links Bar */}
          <div className="p-3 border-t border-white/10 bg-zinc-950 shrink-0">
            <span className="block text-[8px] uppercase font-black text-zinc-500 tracking-widest mb-1.5 pl-1 font-mono">
              Suggested Scopes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isLoading}
                  className="text-[9px] uppercase tracking-wider font-bold bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white px-2 py-1 transition duration-150 cursor-pointer disabled:opacity-40 select-none"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Typing input block */}
          <div className="p-4 border-t border-white/10 bg-zinc-950 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
              placeholder="Type message..."
              disabled={isLoading}
              className="flex-1 bg-zinc-900 text-white text-xs px-4 py-3 rounded-none border border-white/10 focus:outline-none focus:border-white select-all font-mono"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-white text-black hover:bg-zinc-200 shadow transition duration-200 cursor-pointer disabled:opacity-40 rounded-none"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* Branded strip */}
          <div className="bg-white text-black text-[7px] uppercase font-black tracking-[0.3em] text-center py-1 select-none font-mono">
            SHUBH DEVELOPMENTS DESIGN TEAM PROTOCAL
          </div>

        </div>
      )}
    </>
  );
}
