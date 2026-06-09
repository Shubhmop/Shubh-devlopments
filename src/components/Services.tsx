import React from "react";
import { ServiceItem } from "../types";
import { Monitor, CreditCard, User, LineChart, Check, Calendar, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    priceRaw: 8000,
    priceLabel: "₹8,000 – ₹12,000",
    deliveryTime: "5–7 Days",
    features: [
      "Personal Branding Setup",
      "Interactive Project Showcase",
      "Dynamic Resume & About sliders",
      "Responsive Contact Section",
      "Clean CSS Slide Animations",
      "Mobile Touch Optimization",
    ],
    description: "Designed for artists, students, creators, and freelancers looking to highlight their personal brand and visual works.",
  },
  {
    id: "frontend",
    title: "Front-End Website Development",
    priceRaw: 10000,
    priceLabel: "₹10,000 Starting",
    deliveryTime: "3–5 Days",
    features: [
      "Responsive Design (Mobile & Desktop)",
      "Modern Custom UI/UX Styles",
      "Super Fast Loading Speeds",
      "SEO-Friendly Markup Structure",
      "Working Contact / Inquiry Forms",
      "Fluid SVG & Web Animations",
    ],
    description: "Elegant single-page websites and high-converting landing pages built on modern responsive visual standards.",
  },
  {
    id: "business",
    title: "Business Website",
    priceRaw: 15000,
    priceLabel: "₹15,000 – ₹25,000",
    deliveryTime: "7–14 Days",
    features: [
      "Multiple Dynamic Pages",
      "Custom Crafted Visual Design",
      "Multi-purpose Contact & Booking Forms",
      "Google Maps API Integrations",
      "Client CMS / Dashboard setups",
      "Standard Content Backups",
    ],
    description: "Fully featured multi-page corporate sites to convey credibility, capture inquiries, and integrate tools.",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    priceRaw: 25000,
    priceLabel: "₹25,000+",
    deliveryTime: "10–18 Days",
    features: [
      "Fully Responsive Catalog",
      "Interactive Shopping Cart System",
      "Payment Gateway Integrations",
      "Secure Admin Inventory Control",
      "Order Notification Dispatchers",
      "SSL Security Configurations",
    ],
    description: "Comprehensive digital stores optimized for fast catalogs, seamless checkout, and solid transaction workflows.",
  },
];

export default function Services({ onSelectService }: ServicesProps) {
  const { t, language } = useLanguage();

  const getTranslatedServices = (): ServiceItem[] => {
    return servicesData.map((service) => {
      const idUpper = service.id.toUpperCase();
      
      // Dynamic feature mapping
      const translatedFeatures = service.features.map((_, idx) => {
        const featureKey = `${idUpper}_F${idx + 1}`;
        return t(featureKey);
      });

      // Price label in Hindi format
      let priceLabel = service.priceLabel;
      if (language === "hi") {
        if (service.id === "portfolio") priceLabel = "₹8,000 – ₹12,000";
        else if (service.id === "frontend") priceLabel = "₹10,000 से शुरू";
        else if (service.id === "business") priceLabel = "₹15,000 – ₹25,000";
        else if (service.id === "ecommerce") priceLabel = "₹25,000+";
      }

      // Delivery time in Hindi format
      let deliveryTimeStr = service.deliveryTime;
      if (language === "hi") {
        if (service.id === "portfolio") deliveryTimeStr = "5–7 दिन";
        else if (service.id === "frontend") deliveryTimeStr = "3–5 दिन";
        else if (service.id === "business") deliveryTimeStr = "7–14 दिन";
        else if (service.id === "ecommerce") deliveryTimeStr = "10–18 दिन";
      }

      return {
        ...service,
        title: t(`${idUpper}_TITLE`),
        description: t(`${idUpper}_DESC`),
        features: translatedFeatures,
        priceLabel,
        deliveryTime: deliveryTimeStr,
      };
    });
  };

  const translatedServices = getTranslatedServices();

  return (
    <section id="services" className="bg-[#0A0A0A] py-20 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Exact theme format */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black font-mono block">
            {t("SERVICES_TAG")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] font-display">
            {t("SERVICES_HEADING_1")} <br />
            {t("SERVICES_HEADING_2")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans">
            {t("SERVICES_DESC")}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {translatedServices.map((service) => {
            const isPopular = service.id === "frontend";

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between bg-[#111111] border rounded-none p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isPopular
                    ? "border-white shadow-2xl ring-1 ring-white/10"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <span className="absolute -top-3.5 right-6 text-[9px] font-black tracking-widest uppercase bg-white text-black px-3 py-1 border border-white">
                    {t("SERVICES_POPULAR")}
                  </span>
                )}

                {/* Service Metadata */}
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1 font-display">
                    {service.title}
                  </h3>
                  
                  {/* Price Label */}
                  <div className="my-4 pb-2 border-b border-white/5">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tighter font-mono">
                      {service.priceLabel}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed min-h-[4rem]">
                    {service.description}
                  </p>

                  {/* Delivery Time Accent - Stark Box */}
                  <div className="flex items-center space-x-2 bg-zinc-900/50 border border-white/10 rounded-none px-3 py-2.5 mb-6">
                    <Calendar className="h-4 w-4 text-zinc-400 font-bold" />
                    <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-mono">
                      {t("SERVICES_DELIVERY")}: <strong className="text-white select-all">{service.deliveryTime}</strong>
                    </span>
                  </div>

                  {/* Features Bullets List */}
                  <div className="space-y-3.5 border-t border-white/10 pt-5">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="p-0.5 border border-white/25 mt-0.5 shrink-0 bg-transparent">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-xs text-zinc-400 leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action - Links back into the Quote Estimator */}
                <div className="mt-8">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className={`w-full flex items-center justify-center space-x-1.5 py-4 px-4 text-[10px] font-black uppercase tracking-widest transition duration-200 cursor-pointer ${
                      isPopular
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-zinc-900 text-white border border-white/20 hover:bg-zinc-800"
                    }`}
                  >
                    <span>{t("SERVICES_SELECT")}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
