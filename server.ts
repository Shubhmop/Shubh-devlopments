import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Secure GenAI client initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI Chatbot is running in fallback/demo mode.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI client:", error);
}

// System Instruction for Shubh AI Agent
const systemPrompt = `
You are Shubh AI, the intelligent virtual consultant and project planner for Shubh Developments.
Your objective is to help prospective clients (businesses, startups, content creators, and students) plan their new web development projects, answer questions about Shubh Developments, and guide them in configuring an approximate price quote.

Here is the authoritative information about Shubh Developments:
- **Company Name:** Shubh Developments
- **Tagline:** "Your Vision, Our Code."
- **Contact Details:** Phone / WhatsApp: +91 9557494047 (Direct Developer Line), Email: shubhmishra2090@gmail.com
- **About:** Web development company focused on modern, responsive, high-performance websites. Specialized in custom UI/UX, SEO-friendly structures, fast loading speeds, and robust user experience. Excellent client support.
- **Services & Pricing:**
  1. **Front-End Website Development:** Starting at ₹10,000. Includes responsive design, modern UI/UX, mobile + desktop optimizer, fast loading speed, SEO-friendly structure, customizable contact forms, and fluid basic animations.
  2. **Business Website:** ₹15,000 – ₹25,000. Includes multiple dynamic pages, completely custom design, contact & inquiry setups, and integrated Google Maps.
  3. **Portfolio Website:** ₹8,000 – ₹12,000. Ideal for personal branding, creators, students. Includes interactive project showcases, elegant contact forms, responsive biography sliders.
  4. **E-Commerce Website:** ₹25,000 onwards. Features a product catalog, secure shopping cart, and seamless payment gateway integrations.
- **Estimated Direct Delivery Timelines:**
  - Landing Page: 3–5 Days
  - Portfolio Website: 5–7 Days
  - Business Website: 7–14 Days
- **Key Team Qualities:** Affordable pricing, client-first support, custom handcrafted solutions, clean standards-compliant code, search-engine optimization.

**Strict Behavioral Directives:**
1. Maintain an extremely professional, polite, warm, and tech-forward persona. Speak clearly and objectively.
2. If asked about rates or timelines, quote the accurate pricing/timelines above.
3. Offer suggestions to enhance user projects, e.g., "For an E-commerce store, a shopping cart and digital wallet payments are crucial."
4. If a user asks questions unrelated to web development, design, digital marketing, or Shubh Developments, pull them back elegantly: e.g., "As Shubh AI, I'm specialized in helping you build your web presence! Let's get back to planning your dream website."
5. Encourage users to use our interactive cost estimator on the page if they want a line-by-line itemized invoice.
6. Explicitly direct users to direct-message or call Shubh Developments on WhatsApp (+91 9557494047) or click the WhatsApp trigger on the form line to lock in their customized layouts immediately.
`;

// API routes first
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chat End Point
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request. messages field is required and must be an array." });
  }

  // Fallback demo mode if Gemini API Key is missing
  if (!ai) {
    // Generate a simple rule-based mock response
    const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
    let reply = "Hello! Shubh Developments offers premium custom web development starting from ₹10,000 with a tagline 'Your Vision, Our Code.' Feel free to connect directly on WhatsApp at +91 9557494047 or email shubhmishra2090@gmail.com!";
    if (lastUserMsg.includes("price") || lastUserMsg.includes("cost") || lastUserMsg.includes("pricing")) {
      reply = "Our pricing is transparent: Portfolios start at ₹8,000, Front-End websites start at ₹10,000, Business structures start at ₹15,000, and E-Commerce platforms start at ₹25,000. Send us a WhatsApp briefing at +91 9557494047 to set up your project!";
    } else if (lastUserMsg.includes("portfolio")) {
      reply = "An elegant personal Portfolio Website starts at just ₹8,000, designed to highlight your showcase work, projects, and biography within 5–7 days. Drop us a WhatsApp text at +91 9557494047 to construct your build!";
    } else if (lastUserMsg.includes("time") || lastUserMsg.includes("days") || lastUserMsg.includes("delivery")) {
      reply = "We offer rapid turnarounds: Landing pages require 3-5 days, portfolios require 5-7 days, and full business structures require 7-14 days. We can launch even faster! Ping our engineer at +91 9557494047 to speed up your project.";
    }
    return res.json({ text: reply });
  }

  try {
    // Format message history for chat
    // Model accepts contents parameter with parts
    const formattedContents = messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ 
      error: "Failed to generate AI response.", 
      details: error.message || "Unknown error"
    });
  }
});

// Vite server setup depending on environment
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Mounting Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving precompiled clients from dist/...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Shubh Developments Server listening on http://localhost:${PORT}`);
  });
}

setupVite().catch(err => {
  console.error("Vite setup error:", err);
});
