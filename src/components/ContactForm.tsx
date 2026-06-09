import React, { useState, useEffect } from "react";
import { Inquiry, QuoteConfig, InvoiceBreakdown } from "../types";
import { Send, BadgeCheck, FileText, Calendar, Clock, ClipboardCheck, ArrowUpRight, HelpCircle, PhoneCall, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "./Toast";
import { useLanguage } from "./LanguageContext";

interface ContactFormProps {
  attachedQuote: (QuoteConfig & InvoiceBreakdown & { serviceName: string }) | null;
  onClearQuote: () => void;
}

export default function ContactForm({ attachedQuote, onClearQuote }: ContactFormProps) {
  const { showToast } = useToast();
  const { t, language } = useLanguage();

  // Input fields state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Ticket submissions list (saved in LocalStorage)
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);
  const [activeTicket, setActiveTicket] = useState<Inquiry | null>(null);
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastRefId, setLastRefId] = useState<string>("");

  // Sync saved tickets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("shubh_developments_inquiries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInquiriesList(parsed);
        if (parsed.length > 0) {
          // Default focus to latest ticket
          setActiveTicket(parsed[parsed.length - 1]);
        }
      } catch (err) {
        console.error("Local storage sync error:", err);
      }
    }
  }, []);

  const handleClearInquiryHistory = () => {
    localStorage.removeItem("shubh_developments_inquiries");
    setInquiriesList([]);
    setActiveTicket(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const isHi = language === "hi";

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg(isHi 
        ? "त्रुटि: कृपया आगे बढ़ने के लिए नाम, ईमेल और व्हाट्सएप नंबर प्रदान करें।" 
        : "Required: Please provide Name, Email, and WhatsApp Phone number to proceed."
      );
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SD-2026-${randomSuffix}`;

    const newInquiry: Inquiry = {
      id: refCode,
      name,
      email,
      phone,
      businessName: businessName || (isHi ? "स्वतंत्र परियोजना" : "Independent Project"),
      message: message || (isHi ? "तकनीकी टीम के साथ आधुनिक वेबसाइट विनिर्देशों पर चर्चा करने के लिए तैयार।" : "Ready to discuss modern website specifications with tech team."),
      status: "received",
      date: new Date().toLocaleDateString(isHi ? "hi-IN" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      quoteDetails: attachedQuote ? { ...attachedQuote } : undefined,
    };

    const updated = [...inquiriesList, newInquiry];
    setInquiriesList(updated);
    localStorage.setItem("shubh_developments_inquiries", JSON.stringify(updated));
    
    // Trigger beautifully styled Toast Notification (Translated based on active lang!)
    showToast(
      isHi ? "ब्लूप्रिंट पंजीकृत!" : "Blueprint Registered!",
      isHi 
        ? `टिकट संदर्भ ${refCode} सफलतापूर्वक संकलित हो गया है। व्हाट्सएप/ईमेल विकल्प सक्रिय कर दिए गए हैं।` 
        : `Reference code ${refCode} has been locally compiled. Direct dispatch controls are unlocked below.`,
      "success",
      7000
    );
    
    // Set focus
    setActiveTicket(newInquiry);
    setLastRefId(refCode);
    setIsSubmitted(true);

    // Reset fields
    setName("");
    setEmail("");
    setPhone("");
    setBusinessName("");
    setMessage("");
    onClearQuote();
  };

  const getWhatsAppLink = (inquiry: Inquiry) => {
    const baseUrl = "https://wa.me/919557494047";
    let text = `Namaste Shubh Developments! I would like to submit a web project brief with the following specifications:\n\n` +
      `• *Reference Code:* ${inquiry.id}\n` +
      `• *Client Name:* ${inquiry.name}\n` +
      `• *Email:* ${inquiry.email}\n` +
      `• *WhatsApp Phone:* ${inquiry.phone}\n` +
      `• *Business Name:* ${inquiry.businessName}\n`;
    
    if (inquiry.quoteDetails) {
      text += `• *Selected Plan:* ${inquiry.quoteDetails.serviceName}\n` +
        `• *Complexity:* ${inquiry.quoteDetails.pageCount} Pages\n` +
        `• *Estimated Cost:* ₹${inquiry.quoteDetails.total.toLocaleString()}\n` +
        `• *Delivery Speed:* ${inquiry.quoteDetails.days} Days\n`;
    }
    
    text += `\n*Requirements / Message:*\n${inquiry.message}`;
    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  };

  const getEmailLink = (inquiry: Inquiry) => {
    const emailTo = "shubhmishra2090@gmail.com";
    const subject = `New Web Project Order Inbound: ${inquiry.id}`;
    let body = `Namaste Shubh Developments!\n\nI would like to submit a web project brief with the following specifications:\n\n` +
      `• Reference Code: ${inquiry.id}\n` +
      `• Client Name: ${inquiry.name}\n` +
      `• Email: ${inquiry.email}\n` +
      `• WhatsApp Phone: ${inquiry.phone}\n` +
      `• Business Name: ${inquiry.businessName}\n`;
    
    if (inquiry.quoteDetails) {
      body += `• Selected Plan: ${inquiry.quoteDetails.serviceName}\n` +
        `• Complexity: ${inquiry.quoteDetails.pageCount} Pages\n` +
        `• Estimated Cost: ₹${inquiry.quoteDetails.total.toLocaleString()}\n` +
        `• Delivery Speed: ${inquiry.quoteDetails.days} Days\n`;
    }
    
    body += `\nRequirements / Message:\n${inquiry.message}`;
    return `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const isHi = language === "hi";

  return (
    <section id="contact" className="bg-[#0A0A0A] py-20 relative border-b border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black font-mono block">
            {t("CONTACT_TAG")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] font-display">
            {t("CONTACT_HEADING")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t("CONTACT_DESC")}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start font-sans">
          
          {/* Inquiry form / success drawer (7 cols) */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-none p-6 sm:p-8 relative">
            
            {isSubmitted ? (
              // Success View - Bold & High Contrast
              <div className="space-y-6 text-center py-6">
                <div className="inline-flex p-4.5 bg-zinc-900 border border-white/20 text-white mx-auto select-none rounded-none">
                  <CheckCircle className="h-10 w-10 text-white animate-bounce" />
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter font-display">
                  {isHi ? "पूछताछ पंजीकृत हुई" : "Inquiry Registered"}
                </h3>
                
                <p className="text-zinc-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                  {isHi 
                    ? "शुभ डेवलपमेंट्स में अपनी परियोजना शुरू करने के लिए धन्यवाद। आपका अद्वितीय टिकट संदर्भ" 
                    : "Thank you for starting your project with Shubh Developments. Your unique ticket reference"}{" "}
                  <strong className="text-white bg-zinc-900 border border-white/15 px-2 py-0.5 select-all font-mono">{lastRefId}</strong>.{" "}
                  {isHi 
                    ? "हमने त्वरित संदेश एवं पुष्टिकरण आपके इनबॉक्स के लिए स्वचालित कर दिया है।" 
                    : "We have dispatching automated confirmation logs to your inbox."}
                </p>

                {/* Simulated next steps ticket info */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-5 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                  <span className="block border-b border-white/5 pb-2 text-[10px] uppercase font-black text-zinc-500 tracking-widest">
                    {isHi ? "अगला माइलस्टोन:" : "Next Milestones:"}
                  </span>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>{isHi ? "आवश्यकता विश्लेषण: 4 घंटे के भीतर" : "Req. assessment: within 4 hours"}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <FileText className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>{isHi ? "ड्राफ्ट लेआउट और मॉकअप: 24 घंटे के भीतर" : "Draft mockup review layout: within 24 hours"}</span>
                  </div>
                </div>

                {/* Direct Send via WhatsApp / Email client trigger */}
                <div className="max-w-md mx-auto pt-4 pb-2 space-y-3 font-mono">
                  <a
                    href={activeTicket ? getWhatsAppLink(activeTicket) : "https://wa.me/919557494047"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-black uppercase tracking-widest text-[11px] py-4 rounded-none transition duration-200 block text-center select-none cursor-pointer"
                  >
                    💬 {isHi ? "व्हाट्सएप पर सीधा संदेश साझा करें (+91 9557494047)" : "Direct Dispatch Order to WhatsApp (+91 9557494047)"}
                  </a>

                  <a
                    href={activeTicket ? getEmailLink(activeTicket) : "mailto:shubhmishra2090@gmail.com"}
                    className="w-full bg-white hover:bg-zinc-200 text-black border border-white/20 font-black uppercase tracking-widest text-[11px] py-4 rounded-none transition duration-200 block text-center select-none cursor-pointer animate-pulse"
                  >
                    ✉️ {isHi ? "डेवलपर को ईमेल पर विवरण भेजें (shubhmishra2090@gmail.com)" : "Dispatch Order to Developer Email (shubhmishra2090@gmail.com)"}
                  </a>

                  <span className="block text-[8px] uppercase tracking-[0.2em] font-mono text-zinc-500 text-center mt-2 font-black leading-relaxed">
                    {isHi 
                      ? "लॉन्च को सुरक्षित करने के लिए और अपने अनुमानित कोटेशन को तुरंत हमारे डेवलपर्स तक पहुंचाने हेतु ऊपर क्लिक करें" 
                      : "Click above to automatically compile and send your project blueprint & estimated quote directly to Shubh Developments"}
                  </span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center font-mono">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto bg-white text-black font-black uppercase tracking-widest text-[10px] px-6 py-3.5 rounded-none transition duration-200 cursor-pointer select-none"
                  >
                    {isHi ? "एक और संक्षिप्त विवरण प्रस्तुत करें" : "Submit Another Brief"}
                  </button>
                  <a
                    href="#home"
                    className="text-[10px] text-zinc-400 hover:text-white uppercase tracking-wider font-mono font-bold border-b border-white/20 pb-0.5"
                  >
                    {isHi ? "शीर्ष पर जाएँ" : "Back to top"}
                  </a>
                </div>
              </div>
            ) : (
              // Standard Form Input
              <form onSubmit={handleSubmit} className="space-y-6">
                <h4 className="text-lg font-black text-white uppercase tracking-tight border-b border-white/5 pb-3 mb-2 flex items-center justify-between font-display">
                  <span>{t("CONTACT_SUBMIT")}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-black text-zinc-400 font-mono">
                    {isHi ? "प्रत्यक्ष तकनीकी स्कोपिंग" : "Direct tech scoping"}
                  </span>
                </h4>

                {/* Attached cost quote highlight card */}
                {attachedQuote ? (
                  <div className="p-4 bg-zinc-900 border border-white/15 rounded-none flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] uppercase font-black tracking-widest text-zinc-500 font-mono">
                        {isHi ? "एस्टीमेटर कोट संलग्न है!" : "Estimator Quote Attached!"}
                      </span>
                      <strong className="block text-sm text-white mt-1 font-display uppercase tracking-tight font-black">
                        {attachedQuote.serviceName} ({attachedQuote.pageCount} {isHi ? "पेज" : "Pages"})
                      </strong>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {isHi ? "अनुमानित कुल" : "Invoice Total"}: ₹{attachedQuote.total.toLocaleString()} | {isHi ? "समय" : "Delivery"}: {attachedQuote.days} {isHi ? "दिन" : "Days"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onClearQuote}
                      className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white font-black hover:underline select-none cursor-pointer"
                    >
                      {isHi ? "हटाएं" : "Clear"}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-900 border border-white/5 rounded-none flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="text-xs text-zinc-400 font-mono leading-normal">
                      {isHi 
                        ? "संकेत: अपना स्वनिर्धारित बजट इनवॉइस एम्बेड करने के लिए नीचे दिए " 
                        : "HINT: Customize requirements in the "}{" "}
                      <a href="#estimator" className="text-white underline font-bold uppercase tracking-wider">
                        {isHi ? "कैल्कुलेटर" : "Calculator"}
                      </a>{" "}
                      {isHi ? "का उपयोग करें।" : "to bind your custom budget invoice automatically."}
                    </span>
                  </div>
                )}

                {/* Error message displays in-page instead of window.alert */}
                {errorMsg && (
                  <div className="p-3.5 bg-red-950/20 border border-red-500/35 text-red-300 font-mono text-xs flex items-center space-x-2.5 rounded-none">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono">
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest font-mono">
                      {isHi ? "आपका पूरा नाम *" : "Your Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isHi ? "उदा. शुभ मिश्रा" : "e.g. Shubh Mishra"}
                      className="w-full bg-zinc-900/50 text-white text-xs px-4 py-3.5 border border-white/10 rounded-none focus:outline-none focus:border-white select-all font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest font-mono">
                      {isHi ? "ईमेल पता *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-zinc-900/50 text-white text-xs px-4 py-3.5 border border-white/10 rounded-none focus:outline-none focus:border-white select-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono">
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest font-mono">
                      {isHi ? "व्हाट्सएप नंबर *" : "WhatsApp Phone *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 99999 xxxxx"
                      className="w-full bg-zinc-900/50 text-white text-xs px-4 py-3.5 border border-white/10 rounded-none focus:outline-none focus:border-white select-all font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest font-mono">
                      {isHi ? "व्यवसाय या ब्रांड नाम" : "Business or Brand Name"}
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Brand Ventures"
                      className="w-full bg-zinc-900/50 text-white text-xs px-4 py-3.5 border border-white/10 rounded-none focus:outline-none focus:border-white select-all font-mono"
                    />
                  </div>
                </div>

                {/* Message block */}
                <div className="space-y-2 font-mono">
                  <label className="block text-[9px] font-black text-zinc-400 uppercase tracking-widest font-mono">
                    {isHi ? "परियोजना आवश्यकताएं विवरण" : "Project Requirements Specifications"}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isHi 
                      ? "आप जो कुछ भी बनाना चाहते हैं उसका विवरण, अपनी पसंदीदा विशेषताएं, रंग चयन, संदर्भ वेबसाइट लिंकआदि साझा करें..." 
                      : "Describe what you plan to accomplish, favorite features, layout colors of choice, reference links..."}
                    className="w-full bg-zinc-900/50 text-white text-xs p-4 border border-white/10 rounded-none focus:outline-none focus:border-white select-all font-mono"
                  ></textarea>
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full bg-white text-black font-black uppercase tracking-widest text-[11px] py-4.5 hover:bg-zinc-200 transition-all rounded-none duration-200 cursor-pointer block text-center"
                >
                  {isHi ? "पूछताछ विवरण जमा करें" : "Submit Inquiry Brief"}
                </button>
              </form>
            )}

          </div>

          {/* Ticket tracker and contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Client active tickets tracker panel */}
            <div className="bg-[#111111] border border-white/10 rounded-none p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
                <div>
                  <h4 className="text-[10px] font-black tracking-widest uppercase font-mono text-zinc-400 flex items-center space-x-2">
                    <ClipboardCheck className="h-4 w-4" />
                    <span>{isHi ? "पूछताछ ट्रैकर" : "Inquiry Tracker"}</span>
                  </h4>
                  <p className="text-[9px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">
                    {isHi ? "स्वचालित स्थिति विज़ुअलाइज़ेशन" : "Simulated state tracking"}
                  </p>
                </div>

                {inquiriesList.length > 0 && (
                  <button
                    onClick={handleClearInquiryHistory}
                    className="p-1 rounded-none hover:bg-zinc-900 text-zinc-500 hover:text-white transition cursor-pointer"
                    title={isHi ? "इतिहास साफ करें" : "Clear history"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              {inquiriesList.length === 0 ? (
                <div className="text-center py-6 space-y-3 font-mono">
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-wide">
                    {isHi ? "कोई स्थानीय टिकट रिकॉर्ड उपलब्ध नहीं" : "Zero local logs detected"}
                  </p>
                  <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider">
                    {isHi 
                      ? "त्वरित स्थिति जांच को सक्रिय करने के लिए बाईं ओर फ़ॉर्म विवरण जमा करें।" 
                      : "Submit the invoice brief on the left to initiate real-time state visualizer."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Dropdown or list selector if multiple */}
                  {inquiriesList.length > 1 && (
                    <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-3">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{isHi ? "सक्रिय फोकस" : "Active Focus"}:</span>
                      <select
                        value={activeTicket?.id}
                        onChange={(e) => {
                          const target = inquiriesList.find((i) => i.id === e.target.value);
                          if (target) setActiveTicket(target);
                        }}
                        className="bg-zinc-900 text-white border border-white/10 px-2 py-1 focus:outline-none rounded-none text-[11px]"
                      >
                        {inquiriesList.map((itm) => (
                           <option key={itm.id} value={itm.id}>
                            {itm.id} ({itm.businessName})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Active focused ticket milestone visualizer */}
                  {activeTicket && (
                    <div className="space-y-5">
                      <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-none space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono text-white font-bold select-all">{activeTicket.id}</span>
                          <span className="text-zinc-500 font-mono text-[10px]">{activeTicket.date}</span>
                        </div>
                        <span className="block text-xs font-black uppercase text-white mt-1.5 font-display">{activeTicket.businessName}</span>
                        
                        {activeTicket.quoteDetails && (
                          <span className="block text-[11px] text-zinc-400 font-mono">
                            {isHi ? "संलग्न मूल" : "Linked"}: {activeTicket.quoteDetails.serviceName} • ₹{activeTicket.quoteDetails.total.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Timeline steps - Stark block lines theme */}
                      <div className="space-y-4 font-mono select-none">
                        {/* Step 1 */}
                        <div className="flex items-start space-x-3 text-xs">
                          <div className="h-5 w-5 border border-white bg-white text-black text-[9px] font-black flex items-center justify-center shrink-0">
                            01
                          </div>
                          <div>
                            <span className="block font-black text-white uppercase leading-tight">
                              {isHi ? "पूछताछ दर्ज की गई" : "Inquiry Registered"}
                            </span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mt-0.5">
                              {isHi ? "पूर्ण" : "COMPLETED"}
                            </span>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start space-x-3 text-xs">
                          <div className="h-5 w-5 border border-white bg-zinc-900 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                            02
                          </div>
                          <div>
                            <span className="block font-black text-white uppercase leading-tight text-white">
                              {isHi ? "इंजीनियरिंग मूल्यांकन" : "Engineering Scoping"}
                            </span>
                            <span className="text-[9px] text-zinc-400 uppercase tracking-wider block mt-0.5 animate-pulse">
                              {isHi ? "सक्रिय कार्य • विश्लेषण" : "IN PROGRESS • ANALYZING"}
                            </span>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start space-x-3 text-xs opacity-35">
                          <div className="h-5 w-5 border border-white/20 bg-transparent text-zinc-500 text-[9px] font-black flex items-center justify-center shrink-0">
                            03
                          </div>
                          <div>
                            <span className="block font-black text-zinc-400 uppercase leading-tight">
                              {isHi ? "प्रस्ताव ड्राफ्टिंग" : "Proposal drafting"}
                            </span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mt-0.5">
                              {isHi ? "लंबित स्वीकृति" : "PENDING APPROVED"}
                            </span>
                          </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-start space-x-3 text-xs opacity-35">
                          <div className="h-5 w-5 border border-white/20 bg-transparent text-zinc-500 text-[9px] font-black flex items-center justify-center shrink-0">
                            04
                          </div>
                          <div>
                            <span className="block font-black text-zinc-400 uppercase leading-tight">
                              {isHi ? "समय-सीमा फाइनल कॉल" : "Timeline Scrimmage Call"}
                            </span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-wider block mt-0.5">
                              {isHi ? "निर्धारण प्रारंभ" : "LOCK-IN SCHEDULING"}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Direct Contact Card */}
            <div className="bg-[#111111] border border-white/10 rounded-none p-5 sm:p-6 space-y-4 font-mono text-[11px]">
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-black border-b border-white/5 pb-3">
                {isHi ? "कॉर्पोरेट विवरण और स्कोप" : "Corporate Registry & Scope"}
              </h4>
              
              <div className="space-y-2.5 font-bold uppercase tracking-wider">
                <p className="text-zinc-500 flex items-start space-x-2">
                  <span className="text-zinc-400">{isHi ? "एजेंसी" : "Agency"}:</span>
                  <span className="text-white select-all">Shubh Developments</span>
                </p>
                <p className="text-zinc-500 flex items-start space-x-2">
                  <span className="text-zinc-400">{isHi ? "सेवाएं" : "Services"}:</span>
                  <span className="text-zinc-300">{isHi ? "वेबसाइट डेवलपमेंट व डिजिटल प्लेटफॉर्म्स" : "Website Development & Digital Platforms"}</span>
                </p>
                <p className="text-zinc-500 flex items-start space-x-2">
                  <span className="text-zinc-400">{isHi ? "फ़ोन/व्हाट्सएप" : "Phone/WA"}:</span>
                  <a href="https://wa.me/919557494047" target="_blank" rel="noopener noreferrer" className="text-white underline select-all hover:text-[#25D366] transition-colors">
                    +91 9557494047
                  </a>
                </p>
                <p className="text-zinc-500 flex items-start space-x-2">
                  <span className="text-zinc-400">Email:</span>
                  <a href="mailto:shubhmishra2090@gmail.com" className="text-white underline select-all">
                    shubhmishra2090@gmail.com
                  </a>
                </p>
                <p className="text-zinc-500 flex items-start space-x-2">
                  <span className="text-zinc-400">{isHi ? "मूल दर" : "Initial"}:</span>
                  <span className="text-white">{isHi ? "₹10,000 न्यूनतम प्रारंभिक पैकेज" : "₹10,000 baseline starting packages"}</span>
                </p>
              </div>

              <a href="https://wa.me/919557494047" target="_blank" rel="noopener noreferrer" className="border border-white/10 bg-zinc-900/50 p-4 rounded-none flex items-center space-x-3.5 mt-5 hover:bg-zinc-900 hover:border-white/30 transition block">
                <PhoneCall className="h-4.5 w-4.5 text-zinc-400 shrink-0" />
                <div>
                  <span className="block font-black text-white uppercase text-xs tracking-tight">
                    {isHi ? "तकनीकी संरेखण कॉल" : "Technical alignment Call"}
                  </span>
                  <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider block mt-1">
                    {isHi ? "मुफ़्त 15 मिनट का व्हाट्सएप परामर्श" : "Free 15-minute WhatsApp scoping consultation"}
                  </span>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
