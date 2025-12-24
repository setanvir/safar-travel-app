
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askSafarArchitect(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `
          You are a Senior Software Architect specializing in the SAFAR Travel Platform.
          The platform architecture is:
          - Backend: Kotlin, Spring Boot 3.x, Microservices.
          - Frontend: Kotlin Multiplatform (KMP), Compose Multiplatform.
          - Databases: MySQL (JPA), Redis, Elasticsearch.
          - Dev: Docker, Kubernetes.
          
          Respond in high-quality technical detail. Use Markdown.
          If asked for code, provide clean Kotlin code adhering to Spring Boot best practices.
        `,
        temperature: 0.7,
      },
    });
    return response.text || "I am unable to provide architectural guidance at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the architecture engine.";
  }
}
