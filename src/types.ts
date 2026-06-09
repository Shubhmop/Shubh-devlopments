export interface ServiceItem {
  id: string;
  title: string;
  priceRaw: number;
  priceLabel: string;
  deliveryTime: string;
  description: string;
  features: string[];
}

export interface ProjectTemplate {
  id: string;
  title: string;
  category: "portfolio" | "business" | "ecommerce" | "landing";
  description: string;
  imageSeed: string;
  techStack: string[];
  features: string[];
  liveRating: number;
}

export interface QuoteConfig {
  serviceId: string;
  pageCount: number;
  urgency: "standard" | "express" | "super";
  includeSEO: boolean;
  includePayment: boolean;
  includeContent: boolean;
  includeBranding: boolean;
}

export interface InvoiceBreakdown {
  basePrice: number;
  pagesCost: number;
  urgencyCost: number;
  addonsCost: number;
  total: number;
  days: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
  quoteDetails?: QuoteConfig & InvoiceBreakdown & { serviceName: string };
  status: "received" | "analyzing" | "proposal_ready" | "scheduled";
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
