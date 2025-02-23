
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockMetrics = {
  sustainability: [
    { category: "Energy", value: 85 },
    { category: "Water", value: 75 },
    { category: "Waste", value: 90 },
    { category: "Emissions", value: 82 },
  ],
  governance: [
    { category: "Transparency", value: 88 },
    { category: "Ethics", value: 92 },
    { category: "Compliance", value: 95 },
    { category: "Risk", value: 85 },
  ]
};

const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#EC4899'];

export const DataVisualization = () => {
  const [selectedMetric, setSelectedMetric] = useState('sustainability');
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "AI is analyzing the data patterns...",
    });
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI-Powered Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Select
              value={selectedMetric}
              onValueChange={setSelectedMetric}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sustainability">Sustainability Metrics</SelectItem>
                <SelectItem value="governance">Governance Metrics</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport}>Generate AI Report</Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-4">Metric Distribution</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMetrics[selectedMetric as keyof typeof mockMetrics]}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9B87F5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="text-sm font-medium mb-4">Performance Overview</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockMetrics[selectedMetric as keyof typeof mockMetrics]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockMetrics[selectedMetric as keyof typeof mockMetrics].map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
