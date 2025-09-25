

# AI Stock Predictor

An AI-powered application that visualizes historical stock data, generates future price predictions, and performs market sentiment analysis using pre-computed datasets and the Google Gemini API.

## Features

-   **Interactive Chart:** Visualizes historical and predicted stock prices using Recharts.
-   **Multiple Datasets:** Allows users to select from several pre-defined stock datasets (AAPL, GOOGL, TSLA, etc.).
-   **AI Sentiment Analysis:** Uses the Gemini API to provide real-time sentiment analysis (Bullish, Bearish, Neutral) for the selected stock.
-   **Responsive UI:** Built with React and Tailwind CSS for a clean, modern, and responsive user experience.

## How to Run Locally

1.  Clone the repository.
2.  This project is set up to run in an environment like an online IDE where the `process.env.API_KEY` is pre-configured. To run it, you would need to serve the `index.html` file and ensure a valid Google Gemini API key is available in the environment.

## Technologies Used

-   React
-   TypeScript
-   Google Gemini API (`@google/genai`)
-   Tailwind CSS
-   Recharts


# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1L37hO5LogLikVGE_lfcNm1KnLDZeH-eM

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
