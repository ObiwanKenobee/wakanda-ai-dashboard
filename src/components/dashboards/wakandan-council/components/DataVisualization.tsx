
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Environmental', value: 35 },
  { name: 'Social', value: 30 },
  { name: 'Governance', value: 35 },
];

const COLORS = ['#9B87F5', '#0EA5E9', '#10B981'];

export const DataVisualization = () => {
  return (
    <div className="p-6 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">ESG Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
