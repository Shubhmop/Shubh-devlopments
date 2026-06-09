import React, { useState, useEffect } from "react";
import { QuoteConfig, InvoiceBreakdown, ServiceItem } from "../types";
import { servicesData } from "./Services";
import { PocketIcon, Calculator, Sliders, Info, ArrowRight, ShieldCheck, CheckSquare, Square, Check, RefreshCw } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface EstimatorProps {
  selectedServiceId: string;
  onApplyQuote: (quote: QuoteConfig & InvoiceBreakdown & { serviceName: string }) => void;
}

export default function Estimator({ selectedServiceId, onApplyQuote }: EstimatorProps) {
  const { t, language } = useLanguage();

  // Config state
  const [serviceId, setServiceId] = useState<string>("frontend");
  const [pageCount, setPageCount] = useState<number>(1);
  const [urgency, setUrgency] = useState<"standard" | "express" | "super">("standard");
  const [includeSEO, setIncludeSEO] = useState<boolean>(false);
  const [includePayment, setIncludePayment] = useState<boolean>(false);
  const [includeContent, setIncludeContent] = useState<boolean>(false);
  const [includeBranding, setIncludeBranding] = useState<boolean>(false);

  // Sync selected service if changed from outside
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
      // Sensible defaults depending on service
      if (selectedServiceId === "portfolio") setPageCount(1);
      else if (selectedServiceId === "frontend") setPageCount(2);
      else if (selectedServiceId === "business") setPageCount(5);
      else if (selectedServiceId === "ecommerce") {
        setPageCount(6);
        setIncludePayment(true);
      }
    }
  }, [selectedServiceId]);

  // Pricing math constants
  const PAGE_PRICE = 1200;
  const SEO_PRICE = 1500;
  const PAYMENT_PRICE = 4000;
  const CONTENT_PRICE = 2500;
  const BRANDING_PRICE = 3500;

  // Real-time calculations
  const [breakdown, setBreakdown] = useState<InvoiceBreakdown>({
    basePrice: 10000,
    pagesCost: 0,
    urgencyCost: 0,
    addonsCost: 0,
    total: 10000,
    days: 5,
  });

  const activeService = servicesData.find((s) => s.id === serviceId) || servicesData[1];

  const calculateInvoice = () => {
    const basePrice = activeService.priceRaw;

    // Base pages threshold included in starting package
    let includedPages = 1;
    if (serviceId === "business") includedPages = 5;
    else if (serviceId === "ecommerce") includedPages = 5;
    else if (serviceId === "frontend") includedPages = 1;

    const extraPages = Math.max(0, pageCount - includedPages);
    const pagesCost = extraPages * PAGE_PRICE;

    // Urgency premiums
    let urgencyCost = 0;
    if (urgency === "express") urgencyCost = 3000;
    else if (urgency === "super") urgencyCost = 5500;

    // Addons cost
    let addonsCost = 0;
    if (includeSEO) addonsCost += SEO_PRICE;
    if (includePayment) addonsCost += PAYMENT_PRICE;
    if (includeContent) addonsCost += CONTENT_PRICE;
    if (includeBranding) addonsCost += BRANDING_PRICE;

    const total = basePrice + pagesCost + urgencyCost + addonsCost;

    // Days deduction math
    let days = 5;
    if (serviceId === "portfolio") days = 5;
    else if (serviceId === "frontend") days = 3;
    else if (serviceId === "business") days = 10;
    else if (serviceId === "ecommerce") days = 12;

    // Days scaling
    days = days + Math.floor(extraPages * 0.5);

    if (urgency === "express") {
      days = Math.max(2, Math.floor(days * 0.65));
    } else if (urgency === "super") {
      days = Math.max(1, Math.floor(days * 0.45));
    }

    setBreakdown({
      basePrice,
      pagesCost,
      urgencyCost,
      addonsCost,
      total,
      days,
    });
  };

  // Re-calculate on config changes
  useEffect(() => {
    calculateInvoice();
  }, [serviceId, pageCount, urgency, includeSEO, includePayment, includeContent, includeBranding]);

  const handleApply = () => {
    const translatedName = t(`${serviceId.toUpperCase()}_TITLE`);
    onApplyQuote({
      serviceId,
      pageCount,
      urgency,
      includeSEO,
      includePayment,
      includeContent,
      includeBranding,
      ...breakdown,
      serviceName: translatedName,
    });
  };

  const handleReset = () => {
    setServiceId("frontend");
    setPageCount(1);
    setUrgency("standard");
    setIncludeSEO(false);
    setIncludePayment(false);
    setIncludeContent(false);
    setIncludeBranding(false);
  };

  return (
    <section id="estimator" className="bg-[#0A0A0A] py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black font-mono block">
            {t("ESTIMATOR_TAG")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] font-display">
            {t("ESTIMATOR_HEADING")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t("ESTIMATOR_DESC")}
          </p>
        </div>

        {/* Dynamic Calculator Interactive Box */}
        <div className="bg-[#111111] border border-white/10 rounded-none overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 font-sans">
          
          {/* Controls Input Side (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-white/10">
            
            {/* 1. Base Project Selection */}
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono">
                1. {t("ESTIMATOR_CHOOSE")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {servicesData.map((s) => {
                  const title = t(`${s.id.toUpperCase()}_TITLE`);
                  
                  // Localize price labels inside calculator
                  let priceLabel = s.priceLabel;
                  if (language === "hi") {
                    if (s.id === "portfolio") priceLabel = "₹8,000 – ₹12,000";
                    else if (s.id === "frontend") priceLabel = "₹10,000 से";
                    else if (s.id === "business") priceLabel = "₹15,000 – ₹25,000";
                    else if (s.id === "ecommerce") priceLabel = "₹25,000+";
                  }

                  return (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={`flex flex-col text-left p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                        serviceId === s.id
                          ? "bg-zinc-900 border-white text-white"
                          : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <span className="text-sm font-black uppercase tracking-tight font-display">
                        {title}
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 font-mono">
                        {language === "hi" ? "शुरुआती" : "Starting"} {priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Custom Pages */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono">
                  2. {t("ESTIMATOR_CUSTOM_PAGES")}
                </label>
                <span className="text-xs font-bold text-white font-mono select-none px-3 py-1 bg-zinc-900 border border-white/15">
                  {pageCount} {language === "hi" ? (pageCount === 1 ? "पेज" : "पेज") : (pageCount === 1 ? "Page" : "Pages")}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {serviceId === "business" || serviceId === "ecommerce"
                  ? (language === "hi" 
                      ? "मानक व्यावसायिक और कॉर्पोरेट साइटों में 5 पेज शामिल हैं। अतिरिक्त पेजों के लिए +₹1,200/पेज शुल्क देय है।" 
                      : "Standard corporate and store builds include 5 pages. Each additional custom page is +₹1,200.")
                  : (language === "hi" 
                      ? "स्टार्टर पैकेज में 1 मुख्य पेज शामिल है। अतिरिक्त सहायक पेजों के लिए +₹1,200/पेज शुल्क देय है।" 
                      : "Includes 1 clean layout page by default. Additional sections or detailed page layouts are +₹1,200/page.")}
              </p>

              <div className="flex items-center space-x-4 pt-1">
                <button
                  type="button"
                  onClick={() => setPageCount(Math.max(1, pageCount - 1))}
                  className="p-2.5 rounded-none bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer select-none font-mono font-bold"
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pageCount}
                  onChange={(e) => setPageCount(parseInt(e.target.value) || 1)}
                  className="w-full accent-white h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setPageCount(Math.min(20, pageCount + 1))}
                  className="p-2.5 rounded-none bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer select-none font-mono font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* 3. Urgency Speed Selection */}
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono">
                3. {t("ESTIMATOR_SPEED")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <button
                  onClick={() => setUrgency("standard")}
                  className={`flex flex-col text-left p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                    urgency === "standard"
                      ? "bg-zinc-900 border-white text-white"
                      : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <span className="text-[9px] font-black tracking-wider uppercase text-zinc-500 font-mono">
                    {language === "hi" ? "स्टैंडर्ड" : "Standard"}
                  </span>
                  <span className="text-white font-black text-xs md:text-sm mt-1 uppercase">
                    {language === "hi" ? "सामान्य सेवा" : "Normal Rate"}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1 font-mono">
                    {language === "hi" ? "नियमित समय" : "Regular delivery"}
                  </span>
                </button>

                <button
                  onClick={() => setUrgency("express")}
                  className={`flex flex-col text-left p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                    urgency === "express"
                      ? "bg-zinc-900 border-zinc-400 text-white"
                      : "bg-transparent border-white/10 text-zinc-400 hover:border-zinc-400/30"
                  }`}
                >
                  <span className="text-[9px] font-black tracking-wider uppercase text-zinc-400 font-mono">
                    {language === "hi" ? "एक्सप्रेस" : "Express"}
                  </span>
                  <span className="text-white font-black text-xs md:text-sm mt-1 uppercase">+ ₹3,000</span>
                  <span className="text-[10px] text-zinc-400 mt-1 font-mono">
                    {language === "hi" ? "35% तेज़ डिलीवरी" : "35% Faster delivery"}
                  </span>
                </button>

                <button
                  onClick={() => setUrgency("super")}
                  className={`flex flex-col text-left p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                    urgency === "super"
                      ? "bg-zinc-900 border-zinc-200 text-white"
                      : "bg-transparent border-white/10 text-zinc-400 hover:border-zinc-200/30"
                  }`}
                >
                  <span className="text-[9px] font-black tracking-wider uppercase text-zinc-400 font-mono">
                    {language === "hi" ? "सुपर फास्ट" : "Super Express"}
                  </span>
                  <span className="text-white font-black text-xs md:text-sm mt-1 uppercase">+ ₹5,500</span>
                  <span className="text-[10px] text-zinc-400 mt-1 font-mono">
                    {language === "hi" ? "अति-त्वरित वितरण" : "55% Speedy launch"}
                  </span>
                </button>
              </div>
            </div>

            {/* 4. Technical Integration Add-ons */}
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono">
                4. {t("ESTIMATOR_ADDONS")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* SEO */}
                <button
                  onClick={() => setIncludeSEO(!includeSEO)}
                  className={`flex items-center space-x-3 text-left p-3.5 rounded-none border transition duration-200 cursor-pointer select-none ${
                    includeSEO ? "bg-zinc-900 border-white text-white" : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <div className="shrink-0 text-white">
                    {includeSEO ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-zinc-600" />}
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-tight">
                      {language === "hi" ? "उन्नत SEO सिलाई" : "Advanced SEO Tuning"}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">+ ₹1,500</span>
                  </div>
                </button>

                {/* Payment Gateway */}
                <button
                  onClick={() => setIncludePayment(!includePayment)}
                  className={`flex items-center space-x-3 text-left p-3.5 rounded-none border transition duration-200 cursor-pointer select-none ${
                    includePayment ? "bg-zinc-900 border-white text-white" : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <div className="shrink-0 text-white">
                    {includePayment ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-zinc-600" />}
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-tight">
                      {language === "hi" ? "सुरक्षित पेमेंट गेटवे" : "Payment Gateways"}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">+ ₹4,000</span>
                  </div>
                </button>

                {/* Copywriting */}
                <button
                  onClick={() => setIncludeContent(!includeContent)}
                  className={`flex items-center space-x-3 text-left p-3.5 rounded-none border transition duration-200 cursor-pointer select-none ${
                    includeContent ? "bg-zinc-900 border-white text-white" : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <div className="shrink-0 text-white">
                    {includeContent ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-zinc-600" />}
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-tight">
                      {language === "hi" ? "पेशेवर कंटेंट राइटिंग" : "Copywriting Desk"}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">+ ₹2,500</span>
                  </div>
                </button>

                {/* Branding Design */}
                <button
                  onClick={() => setIncludeBranding(!includeBranding)}
                  className={`flex items-center space-x-3 text-left p-3.5 rounded-none border transition duration-200 cursor-pointer select-none ${
                    includeBranding ? "bg-zinc-900 border-white text-white" : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <div className="shrink-0 text-white">
                    {includeBranding ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-zinc-600" />}
                  </div>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-tight">
                      {language === "hi" ? "ब्रांड किट और लोगो" : "Brand Kit & Logo"}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">+ ₹3,500</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Checkout Invoice / Pricing Side (5 cols) */}
          <div className="lg:col-span-5 bg-[#171717] p-6 sm:p-8 flex flex-col justify-between relative">
            <div>
              {/* Box Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold flex items-center space-x-2">
                  <Calculator className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{t("ESTIMATOR_BREAKDOWN")}</span>
                </h4>
                <button
                  onClick={handleReset}
                  className="text-[10px] uppercase tracking-wider text-zinc-500 hover:text-white flex items-center space-x-1 cursor-pointer font-bold font-mono"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{language === "hi" ? "रीसेट करें" : "Reset"}</span>
                </button>
              </div>

              {/* Line items invoice breakdown */}
              <div className="space-y-4 text-xs tracking-wide mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span className="uppercase text-[11px]">{t("ESTIMATOR_BREAK_BASE")}: {t(`${serviceId.toUpperCase()}_TITLE`)}</span>
                  <span className="text-white font-mono font-bold">₹{breakdown.basePrice.toLocaleString()}</span>
                </div>

                {breakdown.pagesCost > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span className="uppercase text-[11px]">{t("ESTIMATOR_BREAK_PAGES")} (+{Math.max(0, pageCount - (serviceId === "business" || serviceId === "ecommerce" ? 5 : 1))})</span>
                    <span className="text-white font-mono font-bold">₹{breakdown.pagesCost.toLocaleString()}</span>
                  </div>
                )}

                {breakdown.urgencyCost > 0 && (
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-zinc-400 uppercase text-[11px]">{t("ESTIMATOR_BREAK_URGENCY")}</span>
                    <span className="text-white font-mono font-bold">₹{breakdown.urgencyCost.toLocaleString()}</span>
                  </div>
                )}

                {breakdown.addonsCost > 0 && (
                  <div className="flex justify-between text-zinc-400 border-b border-dashed border-white/10 pb-3">
                    <span className="uppercase text-[11px]">{t("ESTIMATOR_BREAK_ADDONS")}</span>
                    <span className="text-white font-mono font-bold">+₹{breakdown.addonsCost.toLocaleString()}</span>
                  </div>
                )}

                {/* Sublist of toggled integrations */}
                <div className="space-y-2 pl-3 pt-1">
                  {includeSEO && (
                    <div className="text-[11px] text-zinc-400 flex items-center space-x-1.5 font-mono">
                      <span className="h-1 w-1 bg-white"></span>
                      <span>{language === "hi" ? "उन्नत सर्च इंजन अनुकूलन" : "Advanced SEO tuning"}</span>
                    </div>
                  )}
                  {includePayment && (
                    <div className="text-[11px] text-zinc-400 flex items-center space-x-1.5 font-mono">
                      <span className="h-1 w-1 bg-white"></span>
                      <span>{language === "hi" ? "पेमेंट एपीआई एकीकरण" : "Payment APIs gateway"}</span>
                    </div>
                  )}
                  {includeContent && (
                    <div className="text-[11px] text-zinc-400 flex items-center space-x-1.5 font-mono">
                      <span className="h-1 w-1 bg-white flex-shrink-0"></span>
                      <span>{language === "hi" ? "वेबसाइट कंटेंट और कॉपी" : "Copywriting brand content"}</span>
                    </div>
                  )}
                  {includeBranding && (
                    <div className="text-[11px] text-zinc-400 flex items-center space-x-1.5 font-mono">
                      <span className="h-1 w-1 bg-white flex-shrink-0"></span>
                      <span>{language === "hi" ? "ब्रांड लोगो और डिज़ाइन" : "Brand aesthetic kit"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Window display */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-4 flex items-center justify-between mb-8">
                <div>
                  <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-mono font-bold">{t("ESTIMATOR_BREAK_TIME")}</span>
                  <span className="text-base font-black text-white uppercase tracking-tight">
                    {breakdown.days} {language === "hi" ? "कार्य दिवस" : (breakdown.days === 1 ? "Business Day" : "Business Days")}
                  </span>
                </div>
                <span className="text-[9px] px-2 py-1 bg-zinc-900 text-white border border-white/10 uppercase tracking-widest font-mono font-bold">
                  {urgency === "standard" ? (language === "hi" ? "मानक गति" : "STD SPEED") : urgency === "express" ? (language === "hi" ? "एक्सप्रेस" : "EXPRESS") : (language === "hi" ? "सुपर फास्ट" : "PRO PRIORITY")}
                </span>
              </div>
            </div>

            {/* Total and CTA - block bold buttons */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-black font-mono">{t("ESTIMATOR_BREAK_TOTAL")}</span>
                <span className="text-xl sm:text-2xl font-black text-white font-mono bg-[#0A0A0A] px-4 py-2 border border-white/10 rounded-none">
                  ₹{breakdown.total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-white text-black font-black uppercase tracking-widest text-xs py-4.5 hover:bg-zinc-200 transition-all rounded-none duration-200 cursor-pointer block text-center"
              >
                {t("ESTIMATOR_APPLY")}
              </button>

              <div className="flex items-center justify-center space-x-1.5 mt-4 text-[10px] text-zinc-500 uppercase font-mono font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-400 font-bold" />
                <span>{language === "hi" ? "कोई प्रतिबद्धता नहीं। कोटेशन बिल्कुल मुफ्त है।" : "Zero obligations. Quote is free to bind."}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
