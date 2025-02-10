
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 87 },
  { month: 'Mar', score: 89 },
  { month: 'Apr', score: 86 },
  { month: 'May', score: 90 },
  { month: 'Jun', score: 92 },
];

export const ESGScorecard = () => {
  return (
    <div className="p-6 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">ESG Performance Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="#9B87F5" 
            strokeWidth={2}
            dot={{ fill: '#9B87F5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
