import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "StudyBee", version: "2026.1" });
  });

  // AI Doubt Solver API
  app.post("/api/ai/doubt-solver", async (req, res) => {
    try {
      const { question, history, language = "English", imageBase64, board = "CBSE", className = "Class 10", subject = "Science" } = req.body;
      
      if (!question && !imageBase64) {
        return res.status(400).json({ error: "Question or image is required." });
      }

      const ai = getGenAIClient();
      if (!ai) {
        // High quality educational fallback if API key is pending
        const isTamil = language === "Tamil";
        const fallbackMsg = isTamil
          ? `வணக்கம்! **StudyBee AI Tutor** இங்கு உள்ளது. 

🎯 **தலைப்பு:** ${question || "பாடக் கேள்வி"} (${subject} - ${className} | ${board})

1. **முக்கிய கருத்தாக்கம் (Key Concept):**
   ${subject} பாடத்தின் இந்த வினா மாணவர்களுக்கு மிகவும் முக்கியமானது. அடிப்படை விதியை புரிந்து கொண்டால் மிக எளிதாக பதிலளிக்கலாம்.

2. **படி-படியாக விளக்கம் (Step-by-Step Explanation):**
   - **படி 1:** கொடுக்கப்பட்ட வினாவை தெளிவாகப் பகுப்பாய்வு செய்க.
   - **படி 2:** தொடர்புடைய சூத்திரம் (Formula) / விதியை எழுதுக.
   - **படி 3:** சரியான அலகுகளுடன் (Units) கணக்கீட்டை பூர்த்தி செய்க.

💡 **நினைவில் கொள்க (Pro Tip):** 
தேர்வில் தெளிவான வரைபடம் (Diagram) மற்றும் தலைப்புகளுடன் பதிலளித்தால் முழு மதிப்பெண்கள் பெறலாம்!`
          : `Hello! I'm your **StudyBee AI Tutor** 🐝.

🎯 **Topic Breakdown:** ${question || "Question Analysis"} (*${subject} — ${className} | ${board}*)

### 1. Key Concept & Principle
Understanding the fundamental rule behind this problem makes it intuitive and easy to solve!

### 2. Step-by-Step Solution:
- **Step 1:** Identify the given values and what we need to calculate/explain.
- **Step 2:** Apply the fundamental formula/theorem relevant to **${subject}**.
- **Step 3:** Substitute parameters carefully and state the final result with standard units.

💡 **Exam Tip:** Draw neat diagrams where applicable and highlight key terms to secure top grades!`;

        return res.json({ text: fallbackMsg, isDemoFallback: true });
      }

      const isTamil = language === "Tamil";
      const systemInstruction = `You are StudyBee AI Tutor 🐝, an enthusiastic, highly expert tutor for students from Class 1 to Class 12 following ${board}, CBSE, State Board (Tamil Nadu), and ICSE curricula.
Preferred Output Language: ${language} ${isTamil ? '(Respond primarily in clear, grammatically correct Tamil script with English terms in brackets where helpful)' : '(Respond in clear, inspiring English with friendly emojis and structured markdown)'}.

Structure your output nicely with:
- 🎯 Key Concept
- 📚 Step-by-Step Explanation / Math Derivation / Examples
- 💡 Pro Exam Tip / Quick Memory Trick

Keep explanations age-appropriate for ${className} (${subject}).`;

      const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

      if (imageBase64) {
        // Strip data prefix if present
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64
          }
        });
      }

      const fullPrompt = `${question ? `Student Question: "${question}"\n` : ''}Subject: ${subject}, Class: ${className}, Board: ${board}. Language preference: ${language}`;
      parts.push({ text: fullPrompt });

      // Build chat context or contents
      let contents: any = parts;
      if (history && Array.isArray(history) && history.length > 0 && !imageBase64) {
        contents = [
          ...history.map(h => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.text }]
          })),
          { role: 'user', parts }
        ];
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text || "I have analyzed your doubt! Keep learning!" });

    } catch (err: any) {
      console.error("Error in Doubt Solver API:", err);
      return res.status(500).json({ error: "Failed to generate AI response.", details: err.message });
    }
  });

  // AI Lesson Summary API
  app.post("/api/ai/summary", async (req, res) => {
    try {
      const { topic, lessonTitle, language = "English" } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        return res.json({
          summary: `### 📌 Quick AI Summary: ${lessonTitle || topic}
- **Core Theme:** Fundamental concepts of ${topic || lessonTitle} tailored for high school mastery.
- **Key Takeaway 1:** Master the underlying principles and terminology.
- **Key Takeaway 2:** Practice numerical examples and diagram labels.
- **Memory Trick:** Remember key formulas using acronyms!`,
          keyTerms: ["Hypothesis", "Formula Derivation", "Unit Conversions", "Core Axiom"],
          reviewQuestions: [
            "What is the primary definition of this topic?",
            "How does this principle apply in daily real-world scenarios?",
            "What common mistake should you avoid during exams?"
          ]
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Provide a concise, highly structured AI summary for the lesson "${lessonTitle || topic}". Language: ${language}.
Format as JSON with keys:
- "summary": markdown string with 3 bullet takeaways
- "keyTerms": array of 4 key technical terms with short definitions
- "reviewQuestions": array of 3 quick self-test questions`,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.error("Error in Summary API:", err);
      return res.status(500).json({ error: "Failed to generate summary." });
    }
  });

  // Vite Middleware in Dev Mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`StudyBee Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
