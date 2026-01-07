import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;
let currentSystemInstruction: string = "";

export const initializeGemini = (systemInstruction: string) => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found");
    return;
  }
  
  try {
    console.log("Initializing Gemini with Protocol:", systemInstruction.substring(0, 50) + "...");
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    currentSystemInstruction = systemInstruction;
    chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction: currentSystemInstruction,
            temperature: 0.7, 
        }
    });
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
  }
};

export const updateProtocol = (newInstruction: string) => {
    // Force re-initialization with new instructions
    initializeGemini(newInstruction);
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // If not initialized, we can't really send without instructions, 
    // but we'll try to init with the last known or empty if needed, 
    // though App.tsx should handle init.
    return "Error: Protocol Engine not initialized. Please refresh.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Attempt to recover session
    if (ai && currentSystemInstruction) {
        chatSession = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: currentSystemInstruction,
                temperature: 0.7, 
            }
        });
        // Retry once
        try {
             const retryResponse = await chatSession.sendMessage({ message });
             return retryResponse.text || "";
        } catch (retryError) {
             return "Protocol interruption detected. Please try again.";
        }
    }
    return "Connection error.";
  }
};