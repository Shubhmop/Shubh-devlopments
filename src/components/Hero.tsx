import React from "react";
import { Sparkles, ArrowRight, Monitor, Rocket, Users, ShieldCheck, ExternalLink } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden bg-[#0A0A0A] pt-12 pb-20 md:pt-20 md:pb-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content (7 columns) - Massive Typographical Focus */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge - Stark & Clean */}
            <div className="inline-flex items-center space-x-2 border border-white/20 bg-zinc-900 px-3.5 py-1.5 text-white select-none">
              <span className="text-[10px] font-black tracking-[0.25em] text-zinc-300 uppercase font-mono">
                {t("HERO_BADGE")}
              </span>
            </div>

            {/* Main Headline (Stark uppercase layout) */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.88] text-white font-display">
              {t("HERO_TITLE_1")} <br className="hidden sm:inline" />
              {t("HERO_TITLE_2")} <br />
              <span className="text-zinc-600 block sm:inline">{t("HERO_TITLE_3")} </span> <br className="hidden sm:inline" />
              {t("HERO_TITLE_4")}
            </h1>

            {/* Subheading */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {t("HERO_DESC")}
            </p>

            {/* Direct CTAs - Blocky High Contrast Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onScrollTo("estimator")}
                className="w-full sm:w-auto bg-white text-black font-black text-xs uppercase tracking-widest px-8 py-4.5 hover:bg-zinc-200 transition-all duration-200 cursor-pointer text-center"
              >
                {t("NAV_GET_QUOTE")}
              </button>

              <button
                onClick={() => onScrollTo("portfolio")}
                className="w-full sm:w-auto border border-white/20 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 hover:bg-white/10 transition-all duration-200 cursor-pointer text-center"
              >
                {t("VIEW_TEMPLATES")}
              </button>
            </div>

            {/* Secondary Highlight Details with stark status circles */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-6 text-[10px] uppercase tracking-wider text-zinc-500 font-mono font-bold">
              <span className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-white"></span>
                <span>{t("HERO_STARTING")}</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-white"></span>
                <span>{t("HERO_DAYS")}</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-white"></span>
                <span>{t("HERO_HANDCRAFTED")}</span>
              </span>
            </div>
          </div>

          {/* Visual Showcase (5 columns) - Styled in stark dark panel */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="bg-[#111111] border border-white/10 rounded-none p-6 shadow-2xl relative">
              
              {/* Header representing a browser layout */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 select-none">
                <div className="flex space-x-1.5">
                  <div className="h-2 w-2 bg-zinc-700 rounded-full"></div>
                  <div className="h-2 w-2 bg-zinc-700 rounded-full"></div>
                  <div className="h-2 w-2 bg-zinc-700 rounded-full"></div>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 bg-[#0A0A0A] px-3 py-1 border border-white/5 uppercase tracking-wider">
                  https://shubhdhvs.com/live-preview
                </div>
                <div className="h-3 w-3"></div>
              </div>

              {/* Simulated Service Feature Dashboard */}
              <div className="space-y-4">
                <div className="p-4 bg-[#0A0A0A] border border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{t("HERO_PREVIEW_DEMO")}</span>
                      <h4 className="text-sm font-bold text-white mt-1 uppercase tracking-tight">{t("HERO_PREVIEW_TITLE")}</h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-white border border-white/15 font-mono font-bold">₹10,000+</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <span className="text-[9px] bg-zinc-900 text-zinc-400 border border-white/5 px-2 py-0.5 font-mono uppercase">React</span>
                    <span className="text-[9px] bg-zinc-900 text-zinc-400 border border-white/5 px-2 py-0.5 font-mono uppercase">Tailwind</span>
                    <span className="text-[9px] bg-zinc-900 text-zinc-400 border border-white/5 px-2 py-0.5 font-mono uppercase">SEO Standard</span>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0A0A0A] border border-white/10 text-center">
                    <span className="block text-2xl font-black text-white font-mono">50+</span>
                    <span className="text-[9px] text-[#888] uppercase tracking-widest font-mono font-bold block mt-1">{t("HERO_CLIENTS")}</span>
                  </div>
                  <div className="p-4 bg-[#0A0A0A] border border-white/10 text-center">
                    <span className="block text-2xl font-black text-white font-mono">3-5 Days</span>
                    <span className="text-[9px] text-[#888] uppercase tracking-widest font-mono font-bold block mt-1">{t("HERO_DELIVERY")}</span>
                  </div>
                </div>

                {/* AI banner highlight */}
                <div className="p-3 bg-[#0A0A0A] border border-white/15 flex items-center justify-between font-sans">
                  <div className="flex items-center space-x-2.5">
                    <span className="h-1.5 w-1.5 bg-white"></span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{t("HERO_UNIQUE")}</span>
                  </div>
                  <button 
                    onClick={() => onScrollTo("contact")}
                    className="text-[10px] text-white font-bold uppercase tracking-wider hover:underline flex items-center space-x-1 cursor-pointer font-sans"
                  >
                    <span>{t("HERO_ASK")}</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Vertical Rail Text Decor (Exactly from UI Specs) */}
      <div className="absolute right-4 top-0 h-full hidden xl:flex items-center pointer-events-none select-none">
        <div className="[writing-mode:vertical-rl] text-[10px] tracking-[0.5em] uppercase text-zinc-800 font-bold select-none whitespace-nowrap">
          MODERN — RESPONSIVE — PERFORMANCE — SEO — SUPPORT
        </div>
      </div>
    </section>
  );
}
