import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    NAV_SERVICES: "Services",
    NAV_CALCULATOR: "Calculator",
    NAV_PORTFOLIO: "Portfolio",
    NAV_WHY_US: "Why Us",
    NAV_FAQ: "FAQ",
    NAV_CONTACT: "Contact Brief",
    NAV_GET_QUOTE: "Get a Quote",
    LOGO_TAGLINE: "Your Vision, Our Code.",

    // Hero
    HERO_BADGE: "Your Vision, Our Code.",
    HERO_TITLE_1: "Professional",
    HERO_TITLE_2: "Websites",
    HERO_TITLE_3: "That Help Your",
    HERO_TITLE_4: "Business Grow",
    HERO_DESC: "Custom-designed websites starting from just ₹10,000. Fast, modern, responsive, and built to impress your customers and convert visitors into clients.",
    HERO_STARTING: "Starting ₹10,000",
    HERO_DAYS: "Portfolios from 5 Days",
    HERO_HANDCRAFTED: "handcrafted Custom solutions",
    HERO_PREVIEW_DEMO: "Template Demo",
    HERO_PREVIEW_TITLE: "Sleek, Fast & SEO Optimized",
    HERO_CLIENTS: "Happy Clients",
    HERO_DELIVERY: "Fast Delivery",
    HERO_UNIQUE: "Unique ideas?",
    HERO_ASK: "Ask For Info",
    VIEW_TEMPLATES: "View Templates",

    // Services
    SERVICES_TAG: "01. SERVICES & PRICING",
    SERVICES_HEADING_1: "Transparent Pricing",
    SERVICES_HEADING_2: "For Your Visual Projects",
    SERVICES_DESC: "We list our rates transparently, matching business websites, responsive frontends, and e-commerce setups with clear delivery timelines.",
    SERVICES_POPULAR: "Popular Choice",
    SERVICES_DELIVERY: "Delivery Time",
    SERVICES_SELECT: "Select Details",
    SERVICES_DAYS: "Days",
    
    // Service Items Detailed
    PORTFOLIO_TITLE: "Portfolio Website",
    PORTFOLIO_DESC: "Designed for artists, students, creators, and freelancers looking to highlight their personal brand and visual works.",
    PORTFOLIO_F1: "Personal Branding Setup",
    PORTFOLIO_F2: "Interactive Project Showcase",
    PORTFOLIO_F3: "Dynamic Resume & About sliders",
    PORTFOLIO_F4: "Responsive Contact Section",
    PORTFOLIO_F5: "Clean CSS Slide Animations",
    PORTFOLIO_F6: "Mobile Touch Optimization",

    FRONTEND_TITLE: "Front-End Website Development",
    FRONTEND_DESC: "Elegant single-page websites and high-converting landing pages built on modern responsive visual standards.",
    FRONTEND_F1: "Responsive Design (Mobile & Desktop)",
    FRONTEND_F2: "Modern Custom UI/UX Styles",
    FRONTEND_F3: "Super Fast Loading Speeds",
    FRONTEND_F4: "SEO-Friendly Markup Structure",
    FRONTEND_F5: "Working Contact / Inquiry Forms",
    FRONTEND_F6: "Fluid SVG & Web Animations",

    BUSINESS_TITLE: "Business Website",
    BUSINESS_DESC: "Fully featured multi-page corporate sites to convey credibility, capture inquiries, and integrate tools.",
    BUSINESS_F1: "Multiple Dynamic Pages",
    BUSINESS_F2: "Custom Crafted Visual Design",
    BUSINESS_F3: "Multi-purpose Contact & Booking Forms",
    BUSINESS_F4: "Google Maps API Integrations",
    BUSINESS_F5: "Client CMS / Dashboard setups",
    BUSINESS_F6: "Standard Content Backups",

    ECOMMERCE_TITLE: "E-Commerce Website",
    ECOMMERCE_DESC: "Comprehensive digital stores optimized for fast catalogs, seamless checkout, and solid transaction workflows.",
    ECOMMERCE_F1: "Fully Responsive Catalog",
    ECOMMERCE_F2: "Interactive Shopping Cart System",
    ECOMMERCE_F3: "Payment Gateway Integrations",
    ECOMMERCE_F4: "Secure Admin Inventory Control",
    ECOMMERCE_F5: "Order Notification Dispatchers",
    ECOMMERCE_F6: "SSL Security Configurations",

    // Estimator
    ESTIMATOR_TAG: "02. COST ESTIMATOR & PLANNER",
    ESTIMATOR_HEADING: "Calculate Your Investment",
    ESTIMATOR_DESC: "Customize your package. Add additional pages, custom CMS, fast delivery, or hosting to instantly see the project blueprint cost breakups.",
    ESTIMATOR_CHOOSE: "Choose Base Project Type",
    ESTIMATOR_CUSTOM_PAGES: "Additional Custom Pages",
    ESTIMATOR_ADDONS: "Add-On Core Features",
    ESTIMATOR_ADD_SEO: "Search Engine Optimization Suite (₹1,500)",
    ESTIMATOR_ADD_PAYMENT: "E-Commerce Secure Checkout (₹4,000)",
    ESTIMATOR_ADD_CONTENT: "Custom Professional Copywriting (₹2,500)",
    ESTIMATOR_ADD_BRANDING: "Identity & Visual Branding (₹3,500)",
    ESTIMATOR_SPEED: "Speed delivery options",
    ESTIMATOR_SPEED_STANDARD: "Standard Dispatch (Included)",
    ESTIMATOR_SPEED_EXPRESS: "Express 3-Day Delivery (+₹3,000)",
    ESTIMATOR_SPEED_SUPER: "Super-Urgent Overnight Delivery (+₹5,500)",
    ESTIMATOR_APPLY: "Apply This Blueprint To Brief",
    ESTIMATOR_RESET: "Reset Calculations",
    ESTIMATOR_BREAKDOWN: "Cost Breakdown",
    ESTIMATOR_BREAK_BASE: "Base Web Solution",
    ESTIMATOR_BREAK_PAGES: "Page extensions",
    ESTIMATOR_BREAK_URGENCY: "Express delivery premium",
    ESTIMATOR_BREAK_ADDONS: "Engineered core features",
    ESTIMATOR_BREAK_TOTAL: "Total Estimated Amount",
    ESTIMATOR_BREAK_TIME: "Estimated Build Time",

    // Why Choose Us
    WHY_TAG: "03. THE QUALITY DIFFERENCE",
    WHY_HEADING: "Why Choose Shubh Developments?",
    WHY_DESC: "We don't build generic bloated templates. We build highly optimized, secure, lightning fast digital experiences that place your goals first.",
    WHY_F1_TITLE: "Light-Speed Performance",
    WHY_F1_DESC: "Our custom code architectures score 95+ on Google PageSpeed Insights, ensuring zero visitors leave due to sluggish load times.",
    WHY_F2_TITLE: "Built For Discoverability",
    WHY_F2_DESC: "Modern structured metadata, proper index tags, and semantically logical HTML formats designed to elevate search keywords.",
    WHY_F3_TITLE: "Mobile-First Fluidity",
    WHY_F3_DESC: "Over 60% of web traffic originates from hand-held viewports. Our designs adapt beautifully and behave flawlessly on touchscreens.",

    // FAQ
    FAQ_TAG: "04. FREQUENT QUESTIONS",
    FAQ_HEADING: "Curated Answers",
    FAQ_DESC: "Have other questions about our custom engineering pipelines or milestone registries? Unpack the quick guidelines below.",

    // Contact
    CONTACT_TAG: "05. READY TO ACCELERATE?",
    CONTACT_HEADING: "Configure Your Inquiry",
    CONTACT_DESC: "Submit your details to compile a formal project prospectus. Active tickets can review real-time estimations and options directly.",
    CONTACT_FIELD_NAME: "Your Name",
    CONTACT_FIELD_EMAIL: "Your Email Address",
    CONTACT_FIELD_SERVICE: "Select Targeted Solution",
    CONTACT_FIELD_MESSAGE: "Describe your goal & specifications",
    CONTACT_BUTTON_SUBMIT: "Lock & Dispatch Inquiry Solution",
    CONTACT_FORM_SUCCESS: "Blueprint Registered!",
    CONTACT_FORM_SUCCESS_DESC: "Reference code {refCode} has been locally compiled. Direct dispatch controls are unlocked below.",
    CONTACT_TICKETS_HEADING: "Your Actionable Inquiry Tickets",
    CONTACT_NO_TICKETS: "No submitted tickets yet. Complete the form above to deploy a local inquiry register.",
    CONTACT_CLEARED_QUOTE: "Clear Attached Quote",

    // Chatbot
    BOT_TITLE: "Shubh Developments AI Assistant",
    BOT_PLACEHOLDER: "Ask anything about Shubh Developments..."
  },
  hi: {
    // Navigation
    NAV_SERVICES: "सेवाएं",
    NAV_CALCULATOR: "कैलकुलेटर",
    NAV_PORTFOLIO: "पोर्टफोलियो",
    NAV_WHY_US: "हमारे साथ क्यों",
    NAV_FAQ: "सामान्य प्रश्न",
    NAV_CONTACT: "संपर्क विवरण",
    NAV_GET_QUOTE: "कोट प्राप्त करें",
    LOGO_TAGLINE: "आपकी सोच, हमारा कोड।",

    // Hero
    HERO_BADGE: "आपकी सोच, हमारा कोड।",
    HERO_TITLE_1: "पेशेवर",
    HERO_TITLE_2: "वेबसाइटें",
    HERO_TITLE_3: "जो आपके",
    HERO_TITLE_4: "सर्वोत्तम विकास में सहायक हों",
    HERO_DESC: "विशेष रूप से डिजाइन की गई वेबसाइटें केवल ₹10,000 से शुरू। तेज़, आधुनिक, रेस्पॉन्सिव और आपके विज़िटर्स को ग्राहकों में परिवर्तित करने के लिए डिज़ाइन की गई।",
    HERO_STARTING: "शुरुआती मूल्य ₹10,000",
    HERO_DAYS: "पोर्टफोलियो केवल 5 दिनों में",
    HERO_HANDCRAFTED: "हस्तनिर्मित कस्टम समाधान",
    HERO_PREVIEW_DEMO: "टेम्पलेट डेमो",
    HERO_PREVIEW_TITLE: "चिकना, तेज़ और एसईओ अनुकूलित",
    HERO_CLIENTS: "खुश ग्राहक",
    HERO_DELIVERY: "तेज़ डिलीवरी",
    HERO_UNIQUE: "अनोखे विचार हैं?",
    HERO_ASK: "जानकारी पूछें",
    VIEW_TEMPLATES: "टेम्पलेट्स देखें",

    // Services
    SERVICES_TAG: "01. सेवाएं और मूल्य",
    SERVICES_HEADING_1: "पारदर्शी मूल्य निर्धारण",
    SERVICES_HEADING_2: "आपके प्रोजेक्ट्स के लिए",
    SERVICES_DESC: "हम स्पष्ट वितरण समयसीमा के साथ अपनी दरों को पारदर्शी रूप से दर्ज करते हैं, जिससे आप सही योजना और बजट चुन सकें।",
    SERVICES_POPULAR: "लोकप्रिय विकल्प",
    SERVICES_DELIVERY: "वितरण समय",
    SERVICES_SELECT: "विवरण चुनें",
    SERVICES_DAYS: "दिन",

    // Service Items Detailed
    PORTFOLIO_TITLE: "पोर्टफोलियो वेबसाइट",
    PORTFOLIO_DESC: "कलाकारों, छात्रों, रचनाकारों और फ्रीलांसरों के लिए जो अपने व्यक्तिगत ब्रांड और काम को दुनिया के सामने लाना चाहते हैं।",
    PORTFOLIO_F1: "व्यक्तिगत ब्रांडिंग सेटअप",
    PORTFOLIO_F2: "इंटरैक्टिव प्रोजेक्ट शोकेस",
    PORTFOLIO_F3: "डायनामिक रेज़्यूमे और अबाउट स्लाइडर",
    PORTFOLIO_F4: "उत्तरदायी संपर्क अनुभाग",
    PORTFOLIO_F5: "तैयार सीएसएस एनीमेशन",
    PORTFOLIO_F6: "मोबाइल टच अनुकूलन",

    FRONTEND_TITLE: "फ्रंट-एंड वेबसाइट डेवलपमेंट",
    FRONTEND_DESC: "आधुनिक कला मानकों पर बनी सुंदर सिंगल-पेज वेबसाइटें और अधिक कन्वर्शन वाले लैंडिंग पेज।",
    FRONTEND_F1: "मोबाइल और डेस्कटॉप के अनुकूल",
    FRONTEND_F2: "आधुनिक कस्टम यूआई/यूएक्स शैली",
    FRONTEND_F3: "सुपर फास्ट लोडिंग गति",
    FRONTEND_F4: "एसईओ-अनुकूल कोडिंग संरचना",
    FRONTEND_F5: "काम करने वाला संपर्क/पूछताछ फॉर्म",
    FRONTEND_F6: "सुंदर वेब एनिमेशन",

    BUSINESS_TITLE: "व्यावसायिक वेबसाइट",
    BUSINESS_DESC: "आपके बिज़नेस की विश्वसनीयता को बढ़ावा देने, पूछताछ प्राप्त करने और बुकिंग इंटीग्रेट करने के लिए पूरी तरह से तैयार मल्टी-पेज कॉर्पोरेट साइटें।",
    BUSINESS_F1: "अनेक गतिशील पृष्ठ (मल्टी-पेज)",
    BUSINESS_F2: "कस्टम तैयार विज़ुअल डिज़ाइन",
    BUSINESS_F3: "बहुउद्देशीय संपर्क और बुकिंग फॉर्म",
    BUSINESS_F4: "गूगल मैप्स एपीआई एकीकरण",
    BUSINESS_F5: "क्लाइंट सीएमएस / डैशबोर्ड सेटअप",
    BUSINESS_F6: "सुरक्षित बैकअप समाधान",

    ECOMMERCE_TITLE: "ई-कॉमर्स वेबसाइट",
    ECOMMERCE_DESC: "तेज़ कैटलॉग, आसान चेकआउट और पूरी तरह सुरक्षित लेनदेन वर्कफ़्लो के साथ बने बेहतरीन डिजिटल स्टोर।",
    ECOMMERCE_F1: "पूरी तरह उत्तरदायी कैटलॉग",
    ECOMMERCE_F2: "इंटरैक्टिव शॉपिंग कार्ट प्रणाली",
    ECOMMERCE_F3: "सुरक्षित पेमेंट गेटवे एकीकरण",
    ECOMMERCE_F4: "आसान एडमिन इन्वेंटरी कंट्रोल",
    ECOMMERCE_F5: "ऑर्डर बुकिंग सूचना डिस्पैचर्स",
    ECOMMERCE_F6: "एसएसएल सुरक्षा विन्यास",

    // Estimator
    ESTIMATOR_TAG: "02. लागत अनुमानक और योजनाकार",
    ESTIMATOR_HEADING: "अपनी लागत का अनुमान लगाएं",
    ESTIMATOR_DESC: "अपने पैकेज को कस्टमाइज़ करें। तुरंत प्रोजेक्ट का पूरा मूल्य विवरण देखने के लिए अतिरिक्त पेज, कस्टम सीएमएस, तेज़ डिलीवरी, या होस्टिंग जोड़ें।",
    ESTIMATOR_CHOOSE: "मूल परियोजना प्रकार चुनें",
    ESTIMATOR_CUSTOM_PAGES: "अतिरिक्त कस्टम पेज",
    ESTIMATOR_ADDONS: "ऐड-ऑन मुख्य विशेषताएं",
    ESTIMATOR_ADD_SEO: "उन्नत सर्च इंजन ऑप्टिमाइजेशन (SEO) सुइट (₹1,500)",
    ESTIMATOR_ADD_PAYMENT: "सुरक्षित ई-कॉमर्स चेकआउट गेटवे (₹4,000)",
    ESTIMATOR_ADD_CONTENT: "पेशेवर कंटेंट राइटिंग / कंटेंट कॉपी (₹2,500)",
    ESTIMATOR_ADD_BRANDING: "ब्रांडिंग, लोगो और विज़ुअल पहचान (₹3,500)",
    ESTIMATOR_SPEED: "डिलीवरी की समय सीमा",
    ESTIMATOR_SPEED_STANDARD: "मानक वितरण (शामिल)",
    ESTIMATOR_SPEED_EXPRESS: "एक्सप्रेस 3-दिन सेवा (+₹3,000)",
    ESTIMATOR_SPEED_SUPER: "अति-त्वरित ओवरनाइट डिलीवरी (+₹5,500)",
    ESTIMATOR_APPLY: "इस ब्लूप्रिंट को संपर्क फ़ॉर्म में जोड़ें",
    ESTIMATOR_RESET: "कैलकुलेशन रीसेट करें",
    ESTIMATOR_BREAKDOWN: "लागत का पूर्ण विवरण",
    ESTIMATOR_BREAK_BASE: "बेस वेब समाधान लागत",
    ESTIMATOR_BREAK_PAGES: "पेज एक्सटेंशन शुल्क",
    ESTIMATOR_BREAK_URGENCY: "त्वरित कार्य अतिरिक्त शुल्क",
    ESTIMATOR_BREAK_ADDONS: "चुनी गई अतिरिक्त विशेषताएं",
    ESTIMATOR_BREAK_TOTAL: "कुल अनुमानित निवेश",
    ESTIMATOR_BREAK_TIME: "अनुमानित निर्माण समय",

    // Why Choose Us
    WHY_TAG: "03. बेजोड़ गुणवत्ता का अंतर",
    WHY_HEADING: "शुभ डेवलपमेंट्स को ही क्यों चुनें?",
    WHY_DESC: "हम कोई साधारण तैयार पुराना टेम्पलेट नहीं बेचते। हम सुरक्षा और सुपरफास्ट स्पीड के साथ उच्च स्तरीय कस्टम कोडिंग डिज़ाइन प्रदान करते हैं जो आपके बिजनेस लक्ष्यों को प्राप्त कराता है।",
    WHY_F1_TITLE: "बिजली जैसी तेज़ गति",
    WHY_F1_DESC: "हमारे कस्टम कोड आर्किटेक्चर गूगल पेजस्पीड टेस्ट में 95+ स्कोर करते हैं, जिससे कोई भी ग्राहक आपकी साइट की धीमी गति से तंग आकर वापस नहीं जाता।",
    WHY_F2_TITLE: "सर्च इंजन फ्रेंडली",
    WHY_F2_DESC: "गूगल खोज परिणामों में सबसे ऊपर आने के लिए आधुनिक मेटाडेटा, इंडेक्स टैग और बेहतरीन कोडिंग मानकों का पूरा उपयोग।",
    WHY_F3_TITLE: "मोबाइल के अनुकूल रूपरेखा",
    WHY_F3_DESC: "60% से अधिक इंटरनेट ट्रैफ़िक मोबाइल उपकरणों से आता है। हमारे बेहतरीन लेआउट्स हर मोबाइल स्क्रीन पर शानदार और त्रुटिहीन दिखते हैं।",

    // FAQ
    FAQ_TAG: "04. अक्सर पूछे जाने वाले प्रश्न",
    FAQ_HEADING: "पूछे गए कुछ आवश्यक जवाब",
    FAQ_DESC: "हमारे कस्टम कोडिंग पाइपलाइनों या कार्य प्रणालियों के बारे में कोई अन्य विषय जानना चाहते हैं? नीचे दी गई जानकारी को पढ़ें।",

    // Contact
    CONTACT_TAG: "05. आगे बढ़ने को तैयार हैं?",
    CONTACT_HEADING: "अपनी पूछताछ दर्ज करें",
    CONTACT_DESC: "एक पूर्ण प्रोजेक्ट विवरणिका दर्ज करने के लिए अपनी पूछताछ साझा करें। आप अपनी कोटेशन आवश्यकताओं की लाइव समीक्षा नीचे तुरंत कर सकते हैं।",
    CONTACT_FIELD_NAME: "आपका नाम",
    CONTACT_FIELD_EMAIL: "आपका ईमेल पता",
    CONTACT_FIELD_SERVICE: "प्रोजेक्ट का प्रकार चुनें",
    CONTACT_FIELD_MESSAGE: "अपने प्रोजेक्ट के बारे में या लक्ष्यों का वर्णन करें",
    CONTACT_BUTTON_SUBMIT: "पूछताछ सुरक्षित करें और भेजें",
    CONTACT_FORM_SUCCESS: "सफलतापूर्वक दर्ज किया गया!",
    CONTACT_FORM_SUCCESS_DESC: "प्रोजेक्ट संदर्भ संख्या {refCode} सफलतापूर्वक सहेजी गई है। आप अपनी पूछताछ नीचे दी गई सूची में देख सकते हैं।",
    CONTACT_TICKETS_HEADING: "आपके सक्रिय पूछताछ रजिस्टर",
    CONTACT_NO_TICKETS: "अभी तक कोई पूछताछ दर्ज नहीं हुई है। अपनी आवश्यकता सबमिट करने के लिए ऊपर दिए गए फॉर्म को भरें।",
    CONTACT_CLEARED_QUOTE: "संलग्न कोट खाली करें",

    // Chatbot
    BOT_TITLE: "शुभ डेवलपमेंट्स एआई सहायक",
    BOT_PLACEHOLDER: "शुभ डेवलपमेंट्स के बारे में कुछ भी पूछें..."
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("shubh_developments_lang");
    return (saved === "hi" || saved === "en") ? (saved as Language) : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("shubh_developments_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  const isHindi = language === "hi";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
};
