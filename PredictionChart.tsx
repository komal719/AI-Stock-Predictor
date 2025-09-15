import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';

interface PredictionChartProps {
  data: ChartDataPoint[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2C2C" />
          <XAxis dataKey="date" stroke="#A0A0A0" tick={{ fontSize: 12 }} />
          <YAxis stroke="#A0A0A0" tick={{ fontSize: 12 }} domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E1E1E',
              borderColor: '#2C2C2C',
              color: '#E0E0E0',
            }}
            labelStyle={{ color: '#A0A0A0' }}
          />
          <Legend wrapperStyle={{ color: '#E0E0E0' }} />
          <Line type="monotone" dataKey="actual" name="Actual Price" stroke="#2563eb" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="predicted" name="Predicted Price" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
