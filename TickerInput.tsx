import React, { useState } from 'react';

interface TickerInputProps {
  onSubmit: (ticker: string) => void;
  isLoading: boolean;
  initialTicker: string;
}

const TickerInput: React.FC<TickerInputProps> = ({ onSubmit, isLoading, initialTicker }) => {
  const [ticker, setTicker] = useState(initialTicker);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ticker.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-auto flex-grow">
        <label htmlFor="ticker" className="sr-only">Stock Ticker</label>
        <input
          id="ticker"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="e.g., AAPL, GOOGL"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? 'Analyzing...' : 'Predict'}
      </button>
    </form>
  );
};

export default TickerInput;
