import React from 'react';
import type { SentimentAnalysisResult } from '../types';

interface SentimentAnalysisProps {
  result: SentimentAnalysisResult;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ result }) => {
  const { sentiment, explanation } = result;

  const sentimentColorClasses = {
    Bullish: 'bg-green-500/20 text-green-300 border-green-500',
    Bearish: 'bg-red-500/20 text-red-300 border-red-500',
    Neutral: 'bg-gray-500/20 text-gray-300 border-gray-500',
  };
  
  const sentimentClasses = sentiment ? sentimentColorClasses[sentiment] : sentimentColorClasses['Neutral'];

  return (
    <div className="space-y-4">
      <div>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${sentimentClasses}`}>
          {sentiment}
        </span>
      </div>
      <p className="text-gray-300 leading-relaxed">
        {explanation}
      </p>
    </div>
  );
};

export default SentimentAnalysis;
