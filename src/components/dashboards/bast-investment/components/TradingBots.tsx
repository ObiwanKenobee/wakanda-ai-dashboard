
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bot, Settings, Plus, Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TradingBot {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  profit: string;
  trades: number;
  winRate: number;
}

export const TradingBots = () => {
  const [bots, setBots] = useState<TradingBot[]>([
    { id: 1, name: "Green Energy Bot", status: "Active", profit: "+2.3%", trades: 145, winRate: 68 },
    { id: 2, name: "Sustainable Tech Bot", status: "Inactive", profit: "+1.8%", trades: 89, winRate: 72 },
    { id: 3, name: "Social Impact Bot", status: "Active", profit: "+3.1%", trades: 234, winRate: 65 },
  ]);
  const [newBot, setNewBot] = useState('');
  const { toast } = useToast();

  const handleAddBot = () => {
    if (!newBot.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a bot name",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...bots.map(b => b.id)) + 1;
    setBots([...bots, {
      id: newId,
      name: newBot,
      status: "Inactive",
      profit: "0.0%",
      trades: 0,
      winRate: 0
    }]);
    setNewBot('');
    toast({
      title: "Bot Added",
      description: "New trading bot has been created",
    });
  };

  const handleBotToggle = (id: number) => {
    setBots(bots.map(bot => 
      bot.id === id ? { ...bot, status: bot.status === "Active" ? "Inactive" : "Active" } : bot
    ));
    toast({
      title: "Bot Status Changed",
      description: "Trading bot settings updated successfully",
    });
  };

  const handleDeleteBot = (id: number) => {
    setBots(bots.filter(bot => bot.id !== id));
    toast({
      title: "Bot Deleted",
      description: "Trading bot has been removed",
    });
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Trading Bots
          </CardTitle>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="New Bot Name"
              value={newBot}
              onChange={(e) => setNewBot(e.target.value)}
            />
            <Button onClick={handleAddBot}>
              <Plus className="h-4 w-4 mr-2" />
              Add Bot
            </Button>
          </div>

          {bots.map((bot) => (
            <div key={bot.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{bot.name}</h4>
                  <Badge variant={bot.status === "Active" ? "default" : "secondary"}>
                    {bot.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="text-green-500">{bot.profit}</span>
                  <span>{bot.trades} trades</span>
                  <span>{bot.winRate}% win rate</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {bot.status === "Active" && (
                  <AlertCircle className="h-4 w-4 text-green-500" />
                )}
                <Switch
                  checked={bot.status === "Active"}
                  onCheckedChange={() => handleBotToggle(bot.id)}
                />
                <Button variant="ghost" size="icon" onClick={() => handleDeleteBot(bot.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
