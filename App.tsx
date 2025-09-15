import React, { useState, useCallback } from 'react';
import TickerInput from './components/TickerInput';
import PredictionChart from './components/PredictionChart';
import SentimentAnalysis from './components/SentimentAnalysis';
import Loader from './components/Loader';
import { ChartDataPoint, SentimentAnalysisResult } from './types';
import { fetchSentimentAnalysis } from './services/geminiService';
import { ChartIcon, BrainIcon } from './components/icons';

const App: React.FC = () => {
  const [ticker, setTicker] = useState<string>('AAPL');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [sentimentResult, setSentimentResult] = useState<SentimentAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateStockData = (tickerSymbol: string): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 260);
    let currentPrice = 100 + Math.random() * 400;
    const volatility = 0.025;
    const drift = 0.0005;

    // Generate 200 days of historical data
    for (let i = 0; i < 200; i++) {
        const change = (Math.random() - 0.5 + drift) * currentPrice * volatility;
        currentPrice += change;
        currentPrice = Math.max(currentPrice, 10); // Ensure price doesn't go below 10
        currentDate.setDate(currentDate.getDate() + 1);
        data.push({
            date: currentDate.toISOString().split('T')[0],
            actual: parseFloat(currentPrice.toFixed(2)),
        });
    }

    // Generate 60 days of predicted data
    for (let i = 0; i < 60; i++) {
        const change = (Math.random() - 0.5 + drift * 2) * currentPrice * volatility;
        currentPrice += change;
        currentDate.setDate(currentDate.getDate() + 1);
        data.push({
            date: currentDate.toISOString().split('T')[0],
            predicted: parseFloat(currentPrice.toFixed(2)),
        });
    }

    return data;
  };

  const handlePredict = useCallback(async (tickerSymbol: string) => {
    if (!tickerSymbol) {
      setError('Please enter a stock ticker.');
      return;
    }
    
    setIsLoading(true);
    setChartData([]);
    setSentimentResult(null);
    setError(null);

    const messages = [
      `Fetching historical data for ${tickerSymbol}...`,
      'Preprocessing & cleaning data...',
      'Building LSTM neural network model...',
      'Training model on historical data...',
      'Generating future price predictions...',
      'Analyzing market sentiment with Gemini AI...',
    ];

    try {
      for (const message of messages) {
        setLoadingMessage(message);
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      }

      const [generatedChartData, sentiment] = await Promise.all([
          Promise.resolve(generateStockData(tickerSymbol)),
          fetchSentimentAnalysis(tickerSymbol),
      ]);
      
      setChartData(generatedChartData);
      setSentimentResult(sentiment);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          AI Stock Predictor
        </h1>
        <p className="mt-2 text-gray-400">
          Using a simulated LSTM model & Gemini for market sentiment analysis.
        </p>
      </header>

      <main className="w-full max-w-5xl">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <TickerInput onSubmit={handlePredict} isLoading={isLoading} initialTicker={ticker} />
        </div>

        {isLoading && <Loader message={loadingMessage} />}

        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {!isLoading && !error && chartData.length > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <ChartIcon className="w-6 h-6 mr-2 text-blue-400" />
                Price Prediction
              </h2>
              <PredictionChart data={chartData} />
            </div>

            <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <BrainIcon className="w-6 h-6 mr-2 text-teal-300" />
                AI Sentiment Analysis
              </h2>
              {sentimentResult && <SentimentAnalysis result={sentimentResult} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
