import React from "react";
import { Hammer, Sparkles, PhoneCall, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";
const ShubhLogo = "/shubh_logo.png";

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
  activeSection: string;
}

export default function Navbar({ onScrollTo, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { id: "services", label: t("NAV_SERVICES") },
    { id: "estimator", label: t("NAV_CALCULATOR") },
    { id: "portfolio", label: t("NAV_PORTFOLIO") },
    { id: "why-choose-us", label: t("NAV_WHY_US") },
    { id: "faq", label: t("NAV_FAQ") },
    { id: "contact", label: t("NAV_CONTACT") },
  ];

  const LanguageSelector = () => (
    <div className="flex items-center space-x-1.5 bg-zinc-900 border border-white/10 p-0.5 rounded-none" id="lang-selector">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
          language === "en" ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300"
        }`}
        title="Switch to English"
        id="lang-en"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hi")}
        className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
          language === "hi" ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300"
        }`}
        title="हिंदी में बदलें"
        id="lang-hi"
      >
        हिं
      </button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Info */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => onScrollTo("home")}>
            <div className="h-10 w-10 border border-white/20 bg-zinc-900 flex items-center justify-center overflow-hidden">
              <img 
                src={ShubhLogo} 
                alt="SD Logo" 
                className="h-full w-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-black tracking-tighter uppercase text-white">Shubh</span>
                <span className="text-lg font-light tracking-tight text-zinc-400">Developments</span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-mono">{t("LOGO_TAGLINE")}</p>
            </div>
          </div>

          {/* Desktop Navigation Links (Bold, minimal, high tracking) */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer hover:text-white ${
                  activeSection === item.id ? "text-white border-b border-white pb-0.5" : "text-zinc-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick CTA and Language Toggle */}
          <div className="hidden sm:flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => onScrollTo("contact")}
              className="bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-6 py-3 hover:bg-zinc-200 transition-all cursor-pointer"
            >
              {t("NAV_GET_QUOTE")}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <div className="sm:hidden">
              <LanguageSelector />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onScrollTo(item.id);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between px-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 font-mono flex items-center gap-1.5">
                <Globe className="h-3 w-3" /> Language / भाषा
              </span>
              <LanguageSelector />
            </div>
            <button
              onClick={() => {
                onScrollTo("contact");
                setIsOpen(false);
              }}
              className="w-full bg-white text-black text-xs font-black uppercase tracking-widest py-3 hover:bg-zinc-200 transition-all"
            >
              {t("NAV_GET_QUOTE")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
