import React, { useState } from "react";
import { ProjectTemplate } from "../types";
import { Filter, Star, Eye, Laptop, Smartphone, Laptop2, Sparkles, Code, Check, ExternalLink } from "lucide-react";
import AnidWrooksPreview from "./AnidWrooksPreview";

interface PortfolioProps {
  onSelectPortfolioType: (serviceId: string) => void;
}

export const portfolioTemplates: ProjectTemplate[] = [
  {
    id: "p5",
    title: "Anid Wrooks - Aura Portfolio",
    category: "portfolio",
    description: "The viral, high-converting premium typography developer layout. Centers an interactive headshot surrounded by gorgeous CSS ambient portal lighting.",
    imageSeed: "anid_wrooks_dark_glow",
    techStack: ["React 19", "Tailwind CSS", "motion", "Radial Aurora BG"],
    features: ["Aura Glow Lighting", "Dynamic Resume Drawer", "Interactive Project Overlays", "Live Mock Site Preview"],
    liveRating: 4.9,
  },
  {
    id: "p1",
    title: "Aether Studio Gallery",
    category: "portfolio",
    description: "Immersive typographic layout built for digital creatives, showcasing high-resolution visual blocks and organic biography sliders.",
    imageSeed: "minimalist_creative_portfolio",
    techStack: ["React 19", "Tailwind 4", "motion", "Lucide Icons"],
    features: ["Dynamic Project Zoom", "Staggered Entrance Animations", "Working email form"],
    liveRating: 4.9,
  },
  {
    id: "p2",
    title: "PulseFit Wellness landing",
    category: "landing",
    description: "Sleek fitness app landing page featuring fluid scroll-tied layouts, dynamic class tables, and instant membership calculators.",
    imageSeed: "gym_saas_landing",
    techStack: ["React 19", "Tailwind CSS", "Unsplash CDNs", "SEO Markup"],
    features: ["Smooth-scroll sections", "Membership cost tools", "Mobile touch panels"],
    liveRating: 4.8,
  },
  {
    id: "p3",
    title: "Nourish Fresh Grocery Hub",
    category: "ecommerce",
    description: "Clean organic grocer multi-page boutique store equipped with client-side shopping carts, product reviews, and rapid payment templates.",
    imageSeed: "organic_grocer_store",
    techStack: ["Vite", "Tailwind CSS", "Local Cart Memory", "Stripe Presets"],
    features: ["Interactive Shopping Shelf", "Dynamic invoice receipt generator", "Full filters"],
    liveRating: 5.0,
  },
  {
    id: "p4",
    title: "LegalEase Corporate Advisors",
    category: "business",
    description: "Professional consultant landing page with calendar appointment bookings, team biography sliders, and embedded Google Maps platforms.",
    imageSeed: "consultant_business_platform",
    techStack: ["React", "Lucide", "Google Maps Grounding", "SEO Meta tags"],
    features: ["Booking schedule widgets", "Corporate Maps directions", "Working service panels"],
    liveRating: 4.7,
  },
];

export default function Portfolio({ onSelectPortfolioType }: PortfolioProps) {
  const [filter, setFilter] = useState<string>("all");
  const [showAnidPreview, setShowAnidPreview] = useState<boolean>(false);

  const filteredTemplates = filter === "all"
    ? portfolioTemplates
    : portfolioTemplates.filter((t) => t.category === filter);

  // Convert categories to map to service IDs
  const getServiceIdForCategory = (cat: string): string => {
    if (cat === "portfolio") return "portfolio";
    if (cat === "ecommerce") return "ecommerce";
    if (cat === "business") return "business";
    return "frontend"; // landings and others fallback to frontend
  };

  return (
    <section id="portfolio" className="bg-[#0A0A0A] py-20 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black font-mono block">
              03. THE LIVE SHOWCASE
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] font-display">
              Responsive Template Designs
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Filter through layout frameworks built by Shubh Developments. Click 
              <strong className="text-white font-medium select-all"> "Apply Layout to Quote" </strong> to load its corresponding service rules straight into the cost calculator!
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider uppercase font-black">
            {["all", "portfolio", "landing", "business", "ecommerce"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 rounded-none border transition duration-150 cursor-pointer ${
                  filter === cat
                    ? "bg-white border-white text-black font-black"
                    : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                {cat === "all" ? "Show All" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTemplates.map((project) => {
            const mappedServiceId = getServiceIdForCategory(project.category);

            return (
              <div
                key={project.id}
                className="group bg-[#111111] border border-white/10 rounded-none overflow-hidden shadow-lg transition-all duration-300 hover:border-white/25"
              >
                {/* Visual Thumbnail Banner */}
                <div className="relative h-44 bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden border-b border-white/10">
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1.5 font-mono text-[10px] font-bold text-white tracking-widest bg-[#111111] border border-white/10 px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-zinc-300 fill-zinc-300" />
                    <span>{project.liveRating}</span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[9px] uppercase font-black tracking-widest font-mono text-zinc-400 bg-zinc-900 border border-white/10 px-2.5 py-1">
                      {project.category}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase font-display leading-tight">{project.title}</h3>
                  </div>
                </div>

                {/* Info and attributes body */}
                <div className="p-6 space-y-6">
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Core Features list and technical tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/5">
                    <div className="space-y-2.5">
                      <span className="block text-[9px] uppercase font-black text-zinc-500 font-mono tracking-widest">Installed Features:</span>
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-zinc-300">
                          <span className="h-1.5 w-1.5 bg-white shrink-0"></span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      <span className="block text-[9px] uppercase font-black text-zinc-500 font-mono tracking-widest">Selected Stack:</span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] border border-white/10 text-zinc-400 bg-transparent px-2 py-0.5 font-mono uppercase tracking-wider font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick CTAs */}
                  <div className="pt-5 border-t border-white/10 flex flex-col gap-3">
                    {project.imageSeed === "anid_wrooks_dark_glow" && (
                      <button
                        onClick={() => setShowAnidPreview(true)}
                        className="w-full text-center bg-purple-650 hover:bg-purple-600 text-white font-black uppercase text-[10px] tracking-widest py-3.5 hover:scale-[1.01] transition-all rounded-none cursor-pointer border border-purple-500/30 relative group overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>⚡ Launch Interactive Demo</span>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-white/10 to-purple-500/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      </button>
                    )}

                    <div className="flex items-center justify-between gap-4 w-full">
                      <button
                        onClick={() => onSelectPortfolioType(mappedServiceId)}
                        className="flex-grow text-center bg-white text-black font-black uppercase text-[10px] tracking-widest py-3.5 hover:bg-zinc-200 transition-all rounded-none cursor-pointer"
                      >
                        Apply Layout to Quote
                      </button>
                      
                      <a
                        href="#estimator"
                        className="text-[10px] text-zinc-400 hover:text-white uppercase tracking-wider font-mono font-bold border-b border-white/20 pb-0.5 shrink-0"
                      >
                        Rate Calculator
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Immersive interactive template sandboxed developer tool */}
        {showAnidPreview && (
          <AnidWrooksPreview
            onClose={() => setShowAnidPreview(false)}
            onApplyLayout={() => {
              onSelectPortfolioType("portfolio");
              setShowAnidPreview(false);
            }}
          />
        )}

      </div>
    </section>
  );
}
