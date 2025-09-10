import { GoogleGenAI } from "@google/genai";
import type { GenerateImagesResponse, GenerateContentResponse } from "@google/genai";
import type { AspectRatio } from "../types";

const parseAndThrowEnhancedError = (error: unknown) => {
    console.error("Gemini Service Error:", error);
    if (error instanceof Error) {
        let message = error.message;
        // The service might return a JSON string with error details in the message.
        try {
            const jsonMatch = message.match(/\[\d{3}\]\s*({.*})/);
            if (jsonMatch && jsonMatch[1]) {
                 const errorObj = JSON.parse(jsonMatch[1]);
                 message = errorObj.error.message || message;
            }
        } catch (e) { /* Not a JSON error string, continue with original message */ }

        message = message.toLowerCase();

        if (message.includes('api key not valid')) {
            throw new Error('The API key is invalid. Please check your key and try again.');
        }
        if (message.includes('permission denied') || message.includes('origin')) {
            throw new Error('API request blocked. Your API key may have domain restrictions. Please check your Google Cloud Console to ensure your domain is whitelisted.');
        }
        if (message.includes('quota')) {
            throw new Error('You have exceeded your API quota. Please check your usage limits in your Google Cloud account.');
        }
         if (message.includes('billing')) {
            throw new Error('This model requires a project with active billing. Please ensure billing is enabled for your Google Cloud project.');
        }
    }
    throw new Error("Failed to communicate with the AI service. The service may be busy or the prompt may have been blocked.");
}

export const enhancePrompt = async (
  currentPrompt: string,
  apiKey: string
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("API Key is missing. Please set your Gemini API key.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are a creative assistant for a professional photographer. 
Your task is to enhance a user's initial idea into a rich, detailed prompt for an AI image generator. 
Add professional photography details like lighting, lens effects, camera angles, wardrobe, emotion, and background. 
If the initial prompt is empty, generate a creative model photography concept from scratch. 
Respond only with the enhanced prompt text, without any preamble or explanation.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: currentPrompt || 'Generate a creative model photography concept from scratch.',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
            topP: 0.9,
        }
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("The AI model did not return any text.");
    }
    return text.trim();

  } catch (error) {
    parseAndThrowEnhancedError(error);
    return ""; // Unreachable
  }
};

export const generateImage = async (
  prompt: string,
  aspectRatio: AspectRatio,
  model: string,
  apiKey: string
): Promise<string[]> => {
    try {
        if (!apiKey) {
            throw new Error("API Key is missing. Please set your Gemini API key.");
        }
        if (!prompt) {
            throw new Error("Prompt cannot be empty.");
        }
        
        const ai = new GoogleGenAI({ apiKey });

        if (model !== 'imagen-4.0-generate-001') {
            throw new Error(`Unsupported model for image generation: ${model}`);
        }

        const response: GenerateImagesResponse = await ai.models.generateImages({
            model: model,
            prompt: prompt,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/png',
                aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
        }
        
        throw new Error("The AI model did not return any valid images.");

    } catch (error) {
        parseAndThrowEnhancedError(error);
        // This line is unreachable due to the throw above, but satisfies TypeScript's need for a return path.
        return []; 
    }
};
