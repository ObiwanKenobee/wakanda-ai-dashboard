
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockData = [
  { month: 'Jan', environmental: 85, social: 75, governance: 90 },
  { month: 'Feb', environmental: 88, social: 78, governance: 92 },
  { month: 'Mar', environmental: 90, social: 82, governance: 88 },
  { month: 'Apr', environmental: 87, social: 85, governance: 91 },
  { month: 'May', environmental: 92, social: 88, governance: 94 },
  { month: 'Jun', environmental: 95, social: 90, governance: 96 },
];

export const ESGScorecard = () => {
  const [newMetric, setNewMetric] = useState({ name: '', value: '' });
  const { toast } = useToast();

  const handleAddMetric = () => {
    if (!newMetric.name || !newMetric.value) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Metric Added",
      description: "New ESG metric has been recorded",
    });
    setNewMetric({ name: '', value: '' });
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">ESG Performance Scorecard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="environmental" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="social" stroke="#6366F1" strokeWidth={2} />
                <Line type="monotone" dataKey="governance" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Environmental', value: 95, color: 'text-emerald-500' },
              { label: 'Social', value: 90, color: 'text-indigo-500' },
              { label: 'Governance', value: 96, color: 'text-amber-500' },
            ].map((score) => (
              <div key={score.label} className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-muted-foreground">{score.label}</p>
                <p className={`text-2xl font-bold ${score.color}`}>{score.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Add New ESG Metric</h4>
            <div className="flex gap-4">
              <Input
                placeholder="Metric Name"
                value={newMetric.name}
                onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Value"
                value={newMetric.value}
                onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
              />
              <Button onClick={handleAddMetric}>Add Metric</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
