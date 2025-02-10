
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mockESGData = [
  { date: 'Jan', score: 65 },
  { date: 'Feb', score: 68 },
  { date: 'Mar', score: 75 },
  { date: 'Apr', score: 72 },
  { date: 'May', score: 80 },
  { date: 'Jun', score: 85 },
];

export const ESGMarketInsights = () => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">ESG Market Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockESGData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#9B87F5"
                  fill="#9B87F5"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-muted-foreground">Environmental Score</p>
              <h4 className="text-2xl font-bold text-primary">85%</h4>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-muted-foreground">Social Impact</p>
              <h4 className="text-2xl font-bold text-primary">78%</h4>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
