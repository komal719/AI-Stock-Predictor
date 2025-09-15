export interface ChartDataPoint {
  date: string;
  actual?: number;
  predicted?: number;
}

export type Sentiment = 'Bullish' | 'Bearish' | 'Neutral' | null;

export interface SentimentAnalysisResult {
  sentiment: Sentiment;
  explanation: string;
}
