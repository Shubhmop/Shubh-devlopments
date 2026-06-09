import React, { useState } from "react";
import { 
  X, Monitor, Smartphone, Linkedin, Github, Globe, AtSign, FileText, 
  Sparkles, Check, ArrowRight, User, Terminal, Briefcase, PlusCircle, ExternalLink, Moon, Sun, Palette
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnidWrooksPreviewProps {
  onClose: () => void;
  onApplyLayout: () => void;
}

type PreviewColor = "purple" | "cyan" | "emerald" | "amber";
type CategoryView = "home" | "about" | "projects" | "contact" | "resume";

export default function AnidWrooksPreview({ onClose, onApplyLayout }: AnidWrooksPreviewProps) {
  // Simulator frame states
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [themeColor, setThemeColor] = useState<PreviewColor>("purple");
  const [activeTab, setActiveTab] = useState<CategoryView>("home");
  
  // Custom contact message inside simulated template
  const [simulatedName, setSimulatedName] = useState<string>("");
  const [simulatedEmail, setSimulatedEmail] = useState<string>("");
  const [simulatedMsg, setSimulatedMsg] = useState<string>("");
  const [formSent, setFormSent] = useState<boolean>(false);

  // Resume view state
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Styling helper for dynamic colors
  const getColorClasses = (color: PreviewColor) => {
    switch (color) {
      case "cyan":
        return {
          glow: "from-cyan-500/40 via-blue-500/20 to-transparent",
          text: "text-cyan-400",
          border: "border-cyan-400",
          borderMuted: "border-cyan-500/30",
          bg: "bg-cyan-950",
          accent: "text-cyan-400 hover:bg-cyan-400 hover:text-black",
          pill: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
          textOutline: "[-webkit-text-stroke:1px_rgba(6,182,212,0.4)]",
          bullet: "bg-cyan-400"
        };
      case "emerald":
        return {
          glow: "from-emerald-500/40 via-teal-500/20 to-transparent",
          text: "text-emerald-400",
          border: "border-emerald-400",
          borderMuted: "border-emerald-500/30",
          bg: "bg-emerald-950",
          accent: "text-emerald-400 hover:bg-emerald-400 hover:text-black",
          pill: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
          textOutline: "[-webkit-text-stroke:1px_rgba(16,185,129,0.4)]",
          bullet: "bg-emerald-400"
        };
      case "amber":
        return {
          glow: "from-amber-500/40 via-orange-500/20 to-transparent",
          text: "text-amber-400",
          border: "border-amber-400",
          borderMuted: "border-amber-500/30",
          bg: "bg-amber-950",
          accent: "text-amber-400 hover:bg-amber-400 hover:text-black",
          pill: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
          textOutline: "[-webkit-text-stroke:1px_rgba(245,158,11,0.4)]",
          bullet: "bg-amber-400"
        };
      case "purple":
      default:
        return {
          glow: "from-purple-600/40 via-indigo-600/20 to-transparent",
          text: "text-purple-400",
          border: "border-purple-400",
          borderMuted: "border-purple-500/30",
          bg: "bg-purple-950",
          accent: "text-purple-400 hover:bg-purple-400 hover:text-black",
          pill: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
          textOutline: "[-webkit-text-stroke:1px_rgba(168,85,247,0.4)]",
          bullet: "bg-purple-400"
        };
    }
  };

  const styleSet = getColorClasses(themeColor);

  const mockProjects = [
    {
      title: "Synthetix Finance Terminal",
      desc: "An ultra-performant trade terminal using real-time WebSockets, WebGL visualizers, and customizable client-side dashboard grids.",
      role: "Lead Front-End Arch",
      year: "2025",
      tags: ["React 19", "Tailwind v4", "D3.js", "WebSockets"]
    },
    {
      title: "Lumina AI Studio Pro",
      desc: "Decentralized machine-learning workflow manager featuring node canvas graphs, prompt-state history timelines, and quick-download JSON configurations.",
      role: "UX & Core Interface Developer",
      year: "2026",
      tags: ["TypeScript", "Canvas Core", "Web3 API", "Tailwind"]
    },
    {
      title: "Vesper Design Tokens CLI",
      desc: "Fast open-source compiler tool translating Design Token JSON specs directly into compliant CSS, TS, and Tailwind configurations.",
      role: "Creator / Maintainer",
      year: "2025",
      tags: ["Node.js", "AST Parser", "Rollup", "Tailwind Config"]
    }
  ];

  const handleSendSimulatedMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (simulatedName && simulatedEmail) {
      setFormSent(true);
      setTimeout(() => {
        setFormSent(false);
        setSimulatedName("");
        setSimulatedEmail("");
        setSimulatedMsg("");
      }, 5000);
    }
  };

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col justify-start overflow-y-auto px-4 py-8 sm:p-8 font-sans">
      
      {/* Top Controller Panel - Static Agency Bar */}
      <div className="max-w-6xl w-full mx-auto bg-zinc-900 border border-white/15 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 select-none">
        
        {/* Brand/Instructions */}
        <div className="flex items-center space-x-3.5">
          <div className="h-4.5 w-4.5 bg-white shrink-0"></div>
          <div>
            <span className="block text-[10px] uppercase font-mono text-zinc-400 font-extrabold tracking-widest leading-none">
              Shubh Developments Live Preview
            </span>
            <span className="text-white text-sm font-black uppercase tracking-tight font-display mt-0.5 block">
              Anid Wrooks Portfolio - (Aura Style)
            </span>
          </div>
        </div>

        {/* Toolbar Center controls (viewport & color selectors) */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          
          {/* Viewport Toggles */}
          <div className="flex bg-black border border-white/10 p-1">
            <button
              onClick={() => setViewport("desktop")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-[10px] font-bold uppercase transition ${
                viewport === "desktop" ? "bg-white text-black font-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-[10px] font-bold uppercase transition ${
                viewport === "mobile" ? "bg-white text-black font-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Mobile (380px)</span>
            </button>
          </div>

          {/* Color Presets */}
          <div className="flex items-center space-x-2 bg-[#1A1A1A] px-3 py-2 border border-white/15">
            <Palette className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[9px] uppercase font-black text-zinc-400 tracking-wider">Aura Preset:</span>
            <div className="flex items-center space-x-1.5 pl-1">
              {(["purple", "cyan", "emerald", "amber"] as PreviewColor[]).map((col) => (
                <button
                  key={col}
                  onClick={() => setThemeColor(col)}
                  className={`h-4.5 w-4.5 border transition cursor-pointer ${
                    col === "purple" ? "bg-purple-500" :
                    col === "cyan" ? "bg-cyan-500" :
                    col === "emerald" ? "bg-emerald-500" : "bg-amber-500"
                  } ${themeColor === col ? "border-white scale-110" : "border-transparent opacity-85 hover:opacity-100"}`}
                  title={`${col} Theme`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bind Quote Actions & Close Control */}
        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={onApplyLayout}
            className="flex-grow sm:flex-initial bg-white text-black text-xs font-black uppercase tracking-widest px-5 py-3.5 hover:bg-zinc-200 transition select-none cursor-pointer text-center"
          >
            Apply Layout to Quote
          </button>
          
          <button
            onClick={onClose}
            className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 select-none cursor-pointer"
            title="Exit Simulator"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>

      {/* Simulated Device Sandbox Viewport wrapper */}
      <div className="flex-grow flex items-center justify-center py-6 select-none bg-[#0a0a0d] border border-white/10 relative overflow-hidden">
        
        {/* Aesthetic Visual Decors */}
        <div className="absolute top-4 left-6 text-[8px] tracking-[0.25em] font-mono text-zinc-650 opacity-15 whitespace-nowrap hidden lg:block uppercase font-bold">
          LIVE CLIENT ACCELERATOR RUNTIME // SHUBH DEVELOPMENTS
        </div>

        {/* Device Frame */}
        <div 
          className={`relative bg-[#050508] transition-all duration-300 overflow-hidden ${
            viewport === "desktop" 
              ? "w-full max-w-5xl h-[560px] border border-white/15 shadow-2x-strong rounded-none" 
              : "w-[360px] h-[580px] border-4 border-zinc-800 shadow-2xl rounded-[32px] overflow-y-auto shrink-0 relative"
          }`}
        >
          {/* Header representation inside simulator */}
          {viewport === "desktop" ? (
            <div className="bg-[#0b0c10] border-b border-white/10 py-3 px-4 flex items-center justify-between font-mono text-xs select-none">
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500/80 block"></span>
                <span className="h-2 w-2 rounded-full bg-yellow-500/80 block"></span>
                <span className="h-2 w-2 rounded-full bg-green-500/80 block"></span>
              </div>
              
              <div className="bg-black/40 border border-white/5 text-[9px] uppercase tracking-wider px-6 py-1.5 text-zinc-400 text-center select-all">
                https://shubhdhvs.com/live/anid-wrooks-aurapf
              </div>

              <div className="text-[9px] font-black text-white px-2 py-0.5 bg-zinc-900 border border-white/10 text-[10px]">
                Aura Config: Active
              </div>
            </div>
          ) : (
            // Mobile notch aesthetic
            <div className="absolute top-0 inset-x-0 h-6 bg-black z-50 flex items-center justify-center select-none">
              <div className="w-[120px] h-3.5 bg-zinc-800 rounded-b-xl"></div>
            </div>
          )}

          {/* SIMULATED WEB COMPONENT LAYOUT WORKSPACES */}
          <div className="relative h-full w-full bg-[#050505] overflow-y-auto select-none pt-4 pb-12 text-zinc-100 font-sans">
            
            {/* Soft Ambient Radial Background Glow (Reacting to selected preset) */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] md:h-[450px] md:w-[450px] rounded-full blur-[100px] bg-gradient-to-r ${styleSet.glow} opacity-60 z-0 pointer-events-none transition-all duration-700`}></div>

            {/* Simulated Navigation Menu Bar */}
            <header className="relative z-20 max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              {/* Logo Anid */}
              <button 
                onClick={() => setActiveTab("home")}
                className="text-white text-lg font-black tracking-tight font-display hover:opacity-80 transition cursor-pointer uppercase flex items-center space-x-1"
              >
                <span className="h-3 w-3 bg-white mr-1 flex-shrink-0"></span>
                <span>Anid</span>
              </button>

              {/* Navigation Items (Interactive) */}
              <nav className="flex items-center space-x-4 md:space-x-8 text-[11px] font-black uppercase tracking-widest font-mono select-none">
                <button 
                  onClick={() => setActiveTab("about")}
                  className={`cursor-pointer transition hover:text-white ${activeTab === "about" ? styleSet.text : "text-zinc-400"}`}
                >
                  About Us
                </button>
                <button 
                  onClick={() => setActiveTab("projects")}
                  className={`cursor-pointer transition hover:text-white ${activeTab === "projects" ? styleSet.text : "text-zinc-400"}`}
                >
                  Projects
                </button>
                <button 
                  onClick={() => setActiveTab("contact")}
                  className={`cursor-pointer transition hover:text-white ${activeTab === "contact" ? styleSet.text : "text-zinc-400"}`}
                >
                  Contact
                </button>
              </nav>
            </header>

            {/* Dynamic Interactive Panel Body */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 mt-4 md:mt-8 select-none">
              
              <AnimatePresence mode="wait">
                {activeTab === "home" && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 md:pt-10 select-none pb-12"
                  >
                    {/* Left Typography Block */}
                    <div className="order-2 lg:order-1 lg:col-span-4 mt-6 lg:mt-0 space-y-4 text-center lg:text-left">
                      <div className="space-y-1">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold tracking-[0.25em]">
                          Hello, I'm
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tighter leading-none uppercase font-display">
                          Anid <br className="hidden lg:inline" /> Wrooks
                        </h1>
                      </div>

                      <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-sm mx-auto lg:mx-0">
                        Crafting highly stylized, immersive interactive systems and front-end solutions that elevate brands visual stories.
                      </p>

                      {/* Interactive Trigger to go details */}
                      <div className="pt-3">
                        <button
                          onClick={() => setActiveTab("about")}
                          className={`inline-flex items-center space-x-2 border text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 bg-black transition duration-200 ${styleSet.accent} cursor-pointer ${styleSet.borderMuted}`}
                        >
                          <span>Explore Story</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Social Grid (Left side in desktop, horizontal below on mobile) */}
                      <div className="flex lg:flex-col items-center justify-center lg:justify-start lg:items-start gap-3.5 pt-6 text-zinc-500 h-full lg:absolute lg:left-6 lg:bottom-12 z-20">
                        <a href="#linkedin" className="hover:text-white transition" title="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                        <a href="#github" className="hover:text-white transition" title="GitHub"><Github className="h-4 w-4" /></a>
                        <a href="#dribbble" className="hover:text-white transition" title="Dribbble"><Globe className="h-4 w-4" /></a>
                        <a href="#producthunt" className="hover:text-white transition" title="Product Hunt"><AtSign className="h-4 w-4" /></a>
                      </div>
                    </div>

                    {/* Center Headshot Photo Sphere */}
                    <div className="order-1 lg:order-2 lg:col-span-4 flex justify-center relative select-none">
                      
                      {/* Purple/Accent Circle Ambient Glow base */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${styleSet.glow} rounded-full blur-2xl scale-125 opacity-70 z-0`}></div>

                      {/* Profile Image card exactly matching image layout borders */}
                      <div className="h-44 w-44 md:h-[280px] md:w-[280px] bg-zinc-950 border border-white/10 rounded-full overflow-hidden relative z-10 transition duration-300 hover:scale-[1.03] select-none shadow-2xl flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                          alt="Anid Wrooks Portrait"
                          className="h-full w-full object-cover rounded-full pointer-events-none grayscale hover:grayscale-0 transition duration-500 select-none scale-[1.12]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Tech indicator badge */}
                      <div className="absolute -bottom-3 bg-zinc-900 border border-white/15 px-3.5 py-1 z-20 select-none shadow-lg">
                        <span className={`text-[8px] font-bold uppercase tracking-widest font-mono flex items-center space-x-1.5 ${styleSet.text}`}>
                          <Sparkles className="h-2.5 w-2.5 fill-current animate-pulse" />
                          <span>Open for Scouting</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Typography Block */}
                    <div className="order-3 lg:col-span-4 space-y-4 text-center lg:text-right flex flex-col items-center lg:items-end">
                      <div className="space-y-0 text-center lg:text-right">
                        <span className="text-zinc-550 font-mono text-[10px] uppercase font-bold tracking-[0.25em]">
                          Creative
                        </span>
                        
                        {/* Designer stacked outline title layout */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none uppercase tracking-tighter text-white font-display select-none">
                          <span className={`block text-[transparent] bg-clip-text bg-gradient-to-r from-zinc-700 via-purple-300/30 to-zinc-800 [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] leading-none ${styleSet.textOutline}`}>
                            Developer
                          </span>
                          <span className="block text-white leading-[0.9]">
                            & Designer
                          </span>
                        </h2>
                      </div>

                      <p className="text-zinc-550 text-[10px] leading-relaxed uppercase tracking-wider font-mono max-w-xs block mt-2">
                        BASED IN BENGALURU, IN // CURRENT TIME: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} UTC / IST ZONE
                      </p>

                      {/* Lower Right resume button exactly representing the UI spec */}
                      <div className="lg:absolute lg:right-6 lg:bottom-12 z-20 pt-6 lg:pt-0">
                        <button
                          onClick={() => setActiveTab("resume")}
                          className="flex items-center space-x-1.5 group font-mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition cursor-pointer"
                        >
                          <span>RESUME</span>
                          <FileText className={`h-4.5 w-4.5 p-0.5 border text-zinc-450 border-white/10 bg-zinc-950 group-hover:border-white transition-all`} />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                )}

                {/* About Section */}
                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    className="py-6 max-w-xl mx-auto space-y-6 select-none font-sans"
                  >
                    <div className="flex items-center space-x-2 text-zinc-500 font-mono text-[9px] uppercase tracking-widest font-black">
                      <User className="h-3.5 w-3.5" />
                      <span>About Anid Wrooks</span>
                    </div>

                    <h3 className="text-2xl font-black uppercase text-white font-display tracking-tight leading-none leading-relaxed">
                      "I craft elegant interactive systems bridging beautiful styling and absolute execution"
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                      With over 5 years of industry partnership in creative media labs and early-stage startup systems, I specialize in building custom, responsive layouts using React, Tailwind CSS, high performance animations, and D3 vector engines.
                    </p>

                    {/* Stack Pill Box Grid */}
                    <div className="space-y-3 pt-2">
                      <span className="block text-[9px] uppercase font-mono tracking-widest text-zinc-500 font-black">
                        Technical Core stack:
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                        {["TypeScript", "React 19", "Vite Compiler", "Tailwind CSS", "motion", "Canvas GFX", "GraphQL", "BEM Standards"].map((stk) => (
                          <span key={stk} className={`px-2.5 py-1 ${styleSet.pill} uppercase tracking-wider font-bold`}>
                            {stk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center space-x-5 select-none font-mono">
                      <button
                        onClick={() => setActiveTab("projects")}
                        className={`text-[10px] font-extrabold uppercase tracking-widest bg-white text-black px-5 py-3 rounded-none hover:bg-zinc-200 transition cursor-pointer font-sans`}
                      >
                        View Projects Stack
                      </button>
                      <button
                        onClick={() => setActiveTab("contact")}
                        className="text-[10px] text-zinc-400 hover:text-white uppercase tracking-wider font-bold border-b border-white/25 pb-0.5"
                      >
                        Secure Proposal Brief
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Projects Section */}
                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="py-4 select-none font-sans"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <span className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase font-black">
                        Project Repository ({mockProjects.length} Entries)
                      </span>
                      <span className="text-[9px] text-zinc-550 uppercase tracking-widest font-mono">
                        Tap any preview to expand codes
                      </span>
                    </div>

                    {/* Responsive Simulated Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mockProjects.map((p, idx) => (
                        <div
                          key={idx}
                          className="bg-[#0e0e12] border border-white/10 rounded-none p-4 hover:border-white/20 hover:bg-[#121217] transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-555 font-bold">
                              {p.year} / {p.role}
                            </span>
                            <span className={`h-1.5 w-1.5 rounded-full ${styleSet.bullet}`}></span>
                          </div>
                          
                          <h4 className="text-sm font-black text-white uppercase tracking-tight font-display mb-2">{p.title}</h4>
                          <p className="text-zinc-400 text-[11px] leading-relaxed mb-4 min-h-[3.5rem]">{p.desc}</p>
                          
                          <div className="flex flex-wrap gap-1">
                            {p.tags.map((tag) => (
                              <span key={tag} className="text-[8px] font-mono uppercase px-1.5 py-0.5 bg-black/60 text-zinc-400 border border-white/5 tracking-wider font-bold">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 text-center select-none font-sans">
                      <button
                        onClick={() => setActiveTab("contact")}
                        className={`inline-flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest border border-white/30 px-6 py-3.5 hover:bg-white hover:text-black transition-all cursor-pointer`}
                      >
                        <span>Collaborate on a custom app</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Contact Section */}
                {activeTab === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="py-4 max-w-md mx-auto select-none font-sans"
                  >
                    <div className="bg-[#0e0e12] border border-white/10 p-5 sm:p-6 space-y-4">
                      <div className="border-b border-white/5 pb-3">
                        <span className="text-zinc-550 font-mono text-[9px] uppercase tracking-widest font-black block">
                          Secure Gateway Connection
                        </span>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-display mt-0.5">
                          Initiate Scrive Workspace
                        </h3>
                      </div>

                      {formSent ? (
                        <div className="p-4 bg-zinc-950/80 border border-white/15 text-center py-8 space-y-3 font-mono">
                          <div className="h-2 w-2 bg-white mx-auto animate-ping rounded-full mb-2"></div>
                          <span className="block text-white text-xs font-black uppercase tracking-wider">
                            Packet Compiled Successfully
                          </span>
                          <p className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-widest max-w-[280px] mx-auto">
                            This is a fully reactive UI demonstration model. In the live website, this dispatches real-time API integrations straight to Anid's Slack!
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSendSimulatedMsg} className="space-y-4 text-xs font-mono">
                          <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold block">
                              Name
                            </label>
                            <input
                              type="text"
                              required
                              value={simulatedName}
                              onChange={(e) => setViewport("desktop") /* avoid typing bugs */ || setSimulatedName(e.target.value)}
                              placeholder="e.g. Alexis Ray"
                              className="w-full bg-black text-white px-3 py-2 border border-white/10 rounded-none focus:outline-none focus:border-white text-xs select-all"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold block">
                              Email Address
                            </label>
                            <input
                              type="email"
                              required
                              value={simulatedEmail}
                              onChange={(e) => setSimulatedEmail(e.target.value)}
                              placeholder="e.g. client@agency.com"
                              className="w-full bg-black text-white px-3 py-2 border border-white/10 rounded-none focus:outline-none focus:border-white text-xs select-all"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold block">
                              Brief Specifications (Optional)
                            </label>
                            <textarea
                              rows={2}
                              value={simulatedMsg}
                              onChange={(e) => setSimulatedMsg(e.target.value)}
                              placeholder="Design or engineering scope highlights..."
                              className="w-full bg-black text-white px-3 py-2 border border-white/10 rounded-none focus:outline-none focus:border-white text-xs select-all"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-white text-black font-black uppercase tracking-widest text-[10px] py-3 hover:bg-zinc-200 transition duration-150 cursor-pointer text-center"
                          >
                            Send Simulated Brief
                          </button>
                        </form>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Resume Modal View */}
                {activeTab === "resume" && (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="py-4 max-w-xl mx-auto select-none font-mono"
                  >
                    <div className="bg-[#0e0e12] border border-white/10 p-5 sm:p-6 space-y-6">
                      
                      <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-2">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">
                            PDF EXPORT DRAFTING
                          </span>
                          <h3 className="text-base font-black text-white uppercase tracking-tight font-display">
                            Anid_Wrooks_Resume.pdf (Active)
                          </h3>
                        </div>

                        <button
                          onClick={handleSimulateDownload}
                          className={`text-[9px] font-black tracking-widest uppercase bg-zinc-950 border border-white/15 hover:border-white px-3 py-1.5 text-zinc-300 transition-all cursor-pointer`}
                        >
                          {downloadSuccess ? "✓ EXPORTED" : "↓ EXPORT PDF"}
                        </button>
                      </div>

                      {downloadSuccess && (
                        <div className="p-2 bg-zinc-900 border border-white/10 text-[10px] text-zinc-300 text-center animate-pulse">
                          PDF successfully drafted. Simulated download trigger complete.
                        </div>
                      )}

                      {/* Resume details list */}
                      <div className="space-y-4 text-xs">
                        <div className="space-y-1">
                          <span className="block text-zinc-500 text-[9px] uppercase font-black">Experience Highlight:</span>
                          <div className="flex justify-between text-white font-bold">
                            <span>Sr. Interactive Engineer @ Lucid Labs</span>
                            <span>2024 - Present</span>
                          </div>
                          <p className="text-zinc-400 text-[11px] leading-relaxed">
                            Established core layout models and design patterns scaled across 40+ high performance micro sites, gaining 30M+ organic visual impressions.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-white font-bold">
                            <span>Front-End UI Developer @ Vesper Labs</span>
                            <span>2021 - 2024</span>
                          </div>
                          <p className="text-zinc-400 text-[11px] leading-relaxed">
                            Crafted modern React interfaces, integrated direct Stripe checkout gateways, managed custom Vite configurations, and reduced loading latencies by 42%.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="block text-zinc-500 text-[9px] uppercase font-black">Awards & Competencies:</span>
                          <div className="flex flex-wrap gap-2 text-[10px]">
                            <span>• Awwwards Site of the Day (Nominee)</span>
                            <span>• Certified Tailwind v4 Core Practitioner</span>
                            <span>• Hackathon Interface Winner (Aether Engine)</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex justify-end">
                        <button
                          onClick={() => setActiveTab("home")}
                          className="text-[10px] text-zinc-400 hover:text-white uppercase tracking-widest font-black"
                        >
                          Back to Home
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

      {/* Frame Status Metadata Footer for Shubh System */}
      <div className="max-w-6xl w-full mx-auto p-4 bg-zinc-900 border-t-0 border border-white/15 flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-wide text-zinc-400 font-mono select-none">
        <div className="flex items-center space-x-2">
          <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
          <span>Aura Engine compiling successfully</span>
        </div>
        
        <span className="hidden sm:inline text-[10px] text-zinc-500 uppercase font-black">
          Layout Specs: Width Auto // height scale // 100% responsive check
        </span>

        <button
          onClick={onApplyLayout}
          className="text-white hover:underline mt-2 sm:mt-0 font-extrabold uppercase tracking-widest text-[10px]"
        >
          Select layout and close
        </button>
      </div>

    </div>
  );
}
