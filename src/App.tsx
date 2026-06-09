/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Estimator from "./components/Estimator";
import Portfolio from "./components/Portfolio";
import WhyChooseUs from "./components/WhyChooseUs";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Chatbot from "./components/Chatbot";
import { QuoteConfig, InvoiceBreakdown } from "./types";
import { useLanguage } from "./components/LanguageContext";
import { Code2, ArrowUp, Star, Laptop, ShieldCheck, Heart, Github, Linkedin, Instagram, AtSign } from "lucide-react";
const ShubhLogo = "/shubh_logo.png";

export default function App() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("frontend");
  
  // Custom configured quote to attached to the inquiry brief
  const [attachedQuote, setAttachedQuote] = useState<
    (QuoteConfig & InvoiceBreakdown & { serviceName: string }) | null
  >(null);

  // Jump smoothly to a specific section and raise its active trigger state
  const handleScrollTo = (elementId: string) => {
    setActiveSection(elementId);
    
    // Special handling if they chose Shubh AI chatbot
    if (elementId === "assistant") {
      // Just focus or scroll, we can fallback gracefully
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Wire clicked service rate cards and templates directly into the calculator
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleScrollTo("estimator");
  };

  const handleApplyQuote = (quote: QuoteConfig & InvoiceBreakdown & { serviceName: string }) => {
    setAttachedQuote(quote);
    // Smooth scroll down to contact brief to let them lock in details
    handleScrollTo("contact");
  };

  const handleClearQuote = () => {
    setAttachedQuote(null);
  };

  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header Sticky Bar */}
      <Navbar onScrollTo={handleScrollTo} activeSection={activeSection} />

      {/* Main Section Loops */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero onScrollTo={handleScrollTo} />

        {/* Services Showcase Section */}
        <Services onSelectService={handleSelectService} />

        {/* Interactive Estimator / Cost Calculator */}
        <Estimator selectedServiceId={selectedServiceId} onApplyQuote={handleApplyQuote} />

        {/* Templates Portfolio Gallery */}
        <Portfolio onSelectPortfolioType={handleSelectService} />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Contact Input Scoper and Live Ticket Milestones */}
        <ContactForm attachedQuote={attachedQuote} onClearQuote={handleClearQuote} />

      </main>

      {/* Floating AI Consultant Assistant Onboarding Dashboard */}
      <Chatbot />

      {/* Corporate footer */}
      <footer className="bg-[#0c101a] border-t border-gray-900 pt-16 pb-8 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Mission Statement */}
            <div className="space-y-4 md:col-span-1.5">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 border border-white/10 bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src={ShubhLogo} 
                    alt="SD Logo" 
                    className="h-full w-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-sm font-extrabold text-white">Shubh Developments</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-sans pr-4">
                {isHi 
                  ? "हम व्यावसायिक, सुरक्षित, सुपर-फास्ट और रिस्पॉन्सिव वेबसाइटें बनाते हैं जो आपके ब्रांड की विश्वसनीयता स्थापित करती हैं, ग्राहकों को जोड़ती हैं और व्यापार बढ़ाने में मदद करती हैं।"
                  : "We craft modern, fast, SEO-friendly, and mobile-responsive websites that establish credibility, capture client intent, and help businesses scale."}
              </p>
              <div className="font-mono text-gray-500 uppercase tracking-widest text-[10px]">
                {isHi ? "टैगलाइन: \"आपकी सोच, हमारा कोड।\"" : 'Tagline: "Your Vision, Our Code."'}
              </div>
              
              {/* Professional Social Networks */}
              <div className="pt-2">
                <span className="block text-gray-500 font-mono text-[9px] uppercase tracking-wider mb-2">
                  {isHi ? "हमसे जुड़ें" : "Connect Professionally"}
                </span>
                <div className="flex items-center space-x-2.5">
                  <a
                    href="https://github.com/shubhmishra2090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 bg-zinc-900 border border-white/10 text-gray-450 hover:text-cyan-400 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-200"
                    title="GitHub"
                    id="social-github"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/shubhmishra2090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 bg-zinc-900 border border-white/10 text-gray-450 hover:text-cyan-400 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-200"
                    title="LinkedIn"
                    id="social-linkedin"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/shubhdev_2090/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 bg-zinc-900 border border-white/10 text-gray-450 hover:text-cyan-400 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-200"
                    title="Instagram"
                    id="social-instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.threads.com/@shubhmishra479?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 bg-zinc-900 border border-white/10 text-gray-450 hover:text-cyan-400 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-200"
                    title="Threads"
                    id="social-threads"
                  >
                    <AtSign className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Pricing Packages Links */}
            <div className="space-y-4 col-span-1 font-sans">
              <h5 className="font-mono font-bold uppercase text-gray-400 tracking-wider text-[11px]">
                {isHi ? "वेब समाधान" : "Web Solutions"}
              </h5>
              <ul className="space-y-2.5 text-gray-400">
                <li>
                  <button onClick={() => handleSelectService("frontend")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "लैंडिंग पेज (₹10k से शुरू)" : "Landing Pages (₹10k Starting)"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectService("portfolio")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "पोर्टफ़ोलियो साइट्स (₹8k+)" : "Personal Portfolios (₹8k+)"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectService("business")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "व्यावसायिक वेबसाइटें (₹15k+)" : "Business Websites (₹15k+)"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectService("ecommerce")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "ई-कॉमर्स समाधान (₹25k+)" : "E-Commerce Solutions (₹25k+)"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Navigation Links */}
            <div className="space-y-4 col-span-1 font-sans">
              <h5 className="font-mono font-bold uppercase text-gray-400 tracking-wider text-[11px]">
                {isHi ? "एजेंसी नक्शा" : "Agency Map"}
              </h5>
              <ul className="space-y-2.5 text-gray-400">
                <li>
                  <button onClick={() => handleScrollTo("home")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "मुख्य परिचय" : "Introduction"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("why-choose-us")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "हमारी ताकत" : "Key Strengths"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("estimator")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "लागत कैलकुलेटर" : "Cost Calculator"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("portfolio")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "इंटरैक्टिव डेमो" : "Interactive Demos"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo("faq")} className="hover:text-white hover:underline cursor-pointer">
                    {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Client FAQs"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Location Specs */}
            <div className="space-y-4 col-span-1 font-sans">
              <h5 className="font-mono font-bold uppercase text-gray-400 tracking-wider text-[11px]">
                {isHi ? "संचार हब" : "Communication Hub"}
              </h5>
              <ul className="space-y-3.5 text-gray-400">
                <li>
                  <span className="block text-gray-500 font-mono text-[10px] uppercase">{isHi ? "आधिकारिक मेल" : "Corporate Mail"}</span>
                  <a href="mailto:shubhmishra2090@gmail.com" className="hover:text-white hover:underline select-all text-cyan-400 font-medium font-sans">
                    shubhmishra2090@gmail.com
                  </a>
                </li>
                <li>
                  <span className="block text-gray-500 font-mono text-[10px] uppercase">{isHi ? "क्लाइंट डेस्क" : "Client Desk"}</span>
                  <span className="text-gray-300 select-all font-sans">
                    {isHi ? "वैश्विक डिजिटल टाइमज़ोन सहायता" : "Global digital timezone support"}
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal Bar */}
          <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-500 gap-4">
            <p className="font-mono text-[10px] text-center sm:text-left select-none">
              &copy; {new Date().getFullYear()} Shubh Developments. {isHi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
            </p>
            <div className="flex items-center space-x-1 font-mono text-[10px] select-none text-gray-600">
              <span>{isHi ? "निर्मित" : "Shaped with"}</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>{isHi ? "रचनाकारों, व्यवसायों और छात्रों के लिए।" : "for Creators, Businesses & Students."}</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
