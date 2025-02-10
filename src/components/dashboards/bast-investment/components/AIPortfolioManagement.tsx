
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const portfolioData = [
  { asset: 'Green Energy', allocation: 35 },
  { asset: 'Clean Water', allocation: 25 },
  { asset: 'Sustainable Tech', allocation: 20 },
  { asset: 'Social Impact', allocation: 20 },
];

export const AIPortfolioManagement = () => {
  const { toast } = useToast();

  const handleRebalance = () => {
    toast({
      title: "Portfolio Rebalancing",
      description: "AI is optimizing your portfolio allocation...",
    });
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI Portfolio Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioData}>
                <XAxis dataKey="asset" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="allocation" fill="#9B87F5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <h4 className="text-2xl font-bold text-primary">$124,500</h4>
            </div>
            <Button onClick={handleRebalance}>
              Auto-Balance Portfolio
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
