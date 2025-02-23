
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LineChart, Sparkles, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockESGData = [
  { date: 'Jan', score: 65, prediction: 68 },
  { date: 'Feb', score: 68, prediction: 72 },
  { date: 'Mar', score: 75, prediction: 78 },
  { date: 'Apr', score: 72, prediction: 76 },
  { date: 'May', score: 80, prediction: 83 },
  { date: 'Jun', score: 85, prediction: 88 },
];

export const ESGMarketInsights = () => {
  const [timeframe, setTimeframe] = useState('6m');
  const { toast } = useToast();

  const handleGenerateInsights = () => {
    toast({
      title: "AI Analysis in Progress",
      description: "Generating market insights and predictions...",
    });
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            ESG Market Insights
          </CardTitle>
          <Button onClick={handleGenerateInsights} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generate AI Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                <Area
                  type="monotone"
                  dataKey="prediction"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.1}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Environmental Score</p>
                <ArrowUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <h4 className="text-2xl font-bold text-primary">85%</h4>
                <span className="text-sm text-green-500">+5.2%</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Social Impact</p>
                <ArrowDown className="h-4 w-4 text-red-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <h4 className="text-2xl font-bold text-primary">78%</h4>
                <span className="text-sm text-red-500">-2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
