import React from "react";
import { BadgeCheck, ShieldAlert, Sparkles, Send, Laptop, Landmark, HeartHandshake, Eye } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function WhyChooseUs() {
  const { t, language } = useLanguage();

  const getPoints = () => {
    if (language === "hi") {
      return [
        {
          title: "वहनीय मूल्य निर्धारण",
          desc: "हमारे अनुकूलित फ़्रंटएंड टेम्पलेट्स केवल ₹10,000 से और पोर्टफ़ोलियो ₹8,000 से शुरू होते हैं, जो छोटे व्यवसायों, रचनाकारों और छात्रों को बढ़ावा देने के लिए सबसे उत्तम दरों पर उपलब्ध हैं।",
          badge: "सर्वश्रेष्ठ मूल्य",
          icon: Landmark,
        },
        {
          title: "आधुनिक UI/UX डिज़ाइन",
          desc: "कोई पुराने साधारण रीयूज़्ड लेआउट नहीं। हम सुंदर, अनुकूलित टेम्पलेट बनाते हैं जिनमें उत्कृष्ट मार्जिन, अनूठी फ़ॉन्ट पेयरिंग और शानदार रेस्पॉन्सिव स्टाइल शामिल हैं।",
          badge: "पिक्सेल परफेक्ट",
          icon: Sparkles,
        },
        {
          title: "सुपर फास्ट डिलीवरी",
          desc: "हम अपनी त्वरित समयसीमा प्रतिबद्धताओं पर अडिग हैं: लैंडिंग पृष्ठों के लिए 3-5 दिन, पोर्टफोलियो के लिए 5-7 दिन और व्यावसायिक प्लेटफार्मों के लिए 7-14 दिन।",
          badge: "त्वरित डिलीवरी",
          icon: Send,
        },
        {
          title: "मोबाइल के अनुकूल रूपरेखा",
          desc: "आपकी वेबसाइट मोबाइल उपकरणों, आईपैड और पैनोरमिक अल्ट्रा-वाइड डेस्कटॉप पर सुंदर लोड होगी और आसानी से चलेगी। पूर्ण मोबाइल टच सपोर्ट शामिल है।",
          badge: "फ्लूइड लेआउट",
          icon: Laptop,
        },
        {
          title: "सर्च इंजन अनुकूलित (SEO)",
          desc: "गूगल खोज परिणामों में टॉप रैंकिंग प्राप्त करने के लिए मानक मार्कअप, अल्ट्रा-फास्ट कंपाइलेशन, कंप्रेस्ड इमेजेस और एसईओ मेटाडेटा।",
          badge: "रैंक बूस्टर",
          icon: BadgeCheck,
        },
        {
          title: "उत्कृष्ट कस्टम सहायता",
          desc: "हम लगातार, समर्पित सहायता प्रदान करते हैं। यदि कोई त्रुटि सामने आती है या अपडेट की आवश्यकता होती है, तो हमारी उत्तरदायी टीम तुरंत काम करती है।",
          badge: "24/7 सहायता",
          icon: HeartHandshake,
        },
        {
          title: "कस्टम समाधान",
          desc: "चाहे आपको गूगल मैप्स इंटीग्रेशन की आवश्यकता हो, डायनामिक संपर्क डेटाबेस की, या एक सुरक्षित पेमेंट चेकआउट गेटवे की, हम आपके बिज़नेस के अनुसार बिल्कुल सटीक कोड तैयार करते हैं।",
          badge: "कोई सीमा नहीं",
          icon: Eye,
        },
      ];
    }

    return [
      {
        title: "Affordable Pricing",
        desc: "Our customized frontend templates start at only ₹10,000, and portfolios start at ₹8,050, creating premium visual quality at margins that support small businesses, creators, and students.",
        badge: "Best Value",
        icon: Landmark,
      },
      {
        title: "Modern UI/UX Design",
        desc: "No boring default components or reused layouts. We build beautiful, customized templates featuring rich margins, unique font pairings, and gorgeous responsive styling.",
        badge: "Pixel Perfect",
        icon: Sparkles,
      },
      {
        title: "Super Fast Delivery",
        desc: "We stand strictly behind our swift timeline commitments: 3–5 days for landing pages, 5-7 days for portfolios, and 7-14 days for business platforms, built dynamically for prompt launches.",
        badge: "Swift Delivery",
        icon: Send,
      },
      {
        title: "Mobile Responsive",
        desc: "Your website will load beautifully and navigate fluidly on mobile devices, iPads, and panoramic ultra-wide desktops alike. Full mobile touch support included.",
        badge: "Fluid Layout",
        icon: Laptop,
      },
      {
        title: "SEO Friendly",
        desc: "Built with standard syntactic markup, ultra-fast asset compilation, compressed images, and SEO metadata to rank higher on Google search recommendations.",
        badge: "Rank Booster",
        icon: BadgeCheck,
      },
      {
        title: "Outstanding Support",
        desc: "We offer persistent, dedicated post-deployment assistance. If errors surface or updates are needed, our responsive technical team handles them instantly.",
        badge: "24/7 Support",
        icon: HeartHandshake,
      },
      {
        title: "Custom Solutions",
        desc: "Whether you need Google Maps integrated, dynamic contact databases configured, or a secure customized checkout gateway, we build exactly what your business plans require.",
        badge: "No Limits",
        icon: Eye,
      },
    ];
  };

  const points = getPoints();

  return (
    <section id="why-choose-us" className="bg-[#0A0A0A] py-20 border-b border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 font-sans">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-black font-mono block">
            {t("WHY_TAG")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] font-display">
            {t("WHY_HEADING")}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t("WHY_DESC")}
          </p>
        </div>

        {/* Grid of Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {points.map((point, idx) => {
            const Icon = point.icon;
            // Make the first card span 2 cols on wide screens for a cool layout rhythm
            const extraSpan = idx === 0 ? "lg:col-span-2" : "";

            return (
              <div
                key={point.title}
                className={`group bg-[#111111] border border-white/10 rounded-none p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#141414] ${extraSpan}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 rounded-none bg-zinc-900 border border-white/10 text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-black font-mono text-zinc-400 bg-zinc-950 border border-white/10 px-2.5 py-1">
                    {point.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white uppercase tracking-tight font-display mb-2">
                  {point.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
