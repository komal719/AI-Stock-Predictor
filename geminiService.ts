import { GoogleGenAI, Type } from "@google/genai";
import type { SentimentAnalysisResult } from '../types';

// Ensure you have your API_KEY in environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sentimentSchema = {
    type: Type.OBJECT,
    properties: {
        sentiment: {
            type: Type.STRING,
            description: "The overall market sentiment for the stock. Must be one of: 'Bullish', 'Bearish', or 'Neutral'.",
            enum: ["Bullish", "Bearish", "Neutral"]
        },
        explanation: {
            type: Type.STRING,
            description: "A concise, one-paragraph explanation for the sentiment analysis, summarizing key factors."
        }
    },
    required: ["sentiment", "explanation"]
};

export const fetchSentimentAnalysis = async (ticker: string): Promise<SentimentAnalysisResult> => {
    try {
        const prompt = `Perform a detailed market sentiment analysis for the stock ticker: ${ticker}. 
        Consider recent news, market trends, and technical indicators. 
        Based on your analysis, classify the sentiment as "Bullish", "Bearish", or "Neutral". 
        Provide a single paragraph explaining your reasoning.
        Do not include any introductory phrases like "Here is the JSON".`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: sentimentSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (!result.sentiment || !result.explanation) {
            throw new Error("Invalid response format from AI.");
        }

        return result as SentimentAnalysisResult;

    } catch (error) {
        console.error("Error fetching sentiment analysis:", error);
        throw new Error(`Failed to get sentiment analysis for ${ticker}. The ticker might be invalid or there was a network issue.`);
    }
};
