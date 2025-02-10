
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const TradingBots = () => {
  const { toast } = useToast();

  const handleBotToggle = (botName: string) => {
    toast({
      title: `${botName} Bot Status Changed`,
      description: "Trading bot settings updated successfully",
    });
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Trading Bots</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { name: "Green Energy Bot", status: "Active", profit: "+2.3%" },
            { name: "Sustainable Tech Bot", status: "Inactive", profit: "+1.8%" },
            { name: "Social Impact Bot", status: "Active", profit: "+3.1%" },
          ].map((bot) => (
            <div key={bot.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div>
                <h4 className="font-medium">{bot.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{bot.status}</Badge>
                  <span className="text-sm text-green-500">{bot.profit}</span>
                </div>
              </div>
              <Switch
                checked={bot.status === "Active"}
                onCheckedChange={() => handleBotToggle(bot.name)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
