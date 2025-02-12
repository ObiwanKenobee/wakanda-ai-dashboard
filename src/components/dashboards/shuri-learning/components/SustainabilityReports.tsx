
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 70 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 73 },
  { month: 'May', score: 80 },
  { month: 'Jun', score: 85 },
];

export const SustainabilityReports = () => {
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your AI-powered ESG report is being generated...",
    });
  };

  return (
    <Card className="p-6 rounded-lg bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span>Sustainability Reports</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#9B87F5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">ESG Score</span>
              </div>
              <span className="text-2xl font-bold">85/100</span>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Areas to Improve</span>
              </div>
              <span className="text-2xl font-bold">3</span>
            </div>
          </div>

          <Button onClick={handleGenerateReport} className="w-full">
            Generate AI Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
