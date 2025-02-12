
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Coin, Medal, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export const GamificationHub = () => {
  const { toast } = useToast();

  const handleClaimReward = () => {
    toast({
      title: "Reward Claimed",
      description: "Your NFT reward has been sent to your wallet!",
    });
  };

  return (
    <Card className="p-6 rounded-lg bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span>Gamification Hub</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              <Coin className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-medium">SHURI Tokens</p>
                <p className="text-sm text-muted-foreground">Current Balance</p>
              </div>
            </div>
            <span className="text-2xl font-bold">1,250</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Level Progress</span>
                <span className="text-sm font-medium">Level 5</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "NFTs Earned", value: "3", icon: Medal },
                { title: "Available Rewards", value: "5", icon: Gift },
              ].map((stat) => (
                <div key={stat.title} className="p-4 rounded-lg bg-white/5">
                  <stat.icon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleClaimReward} className="w-full">
            Claim Next Reward
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
