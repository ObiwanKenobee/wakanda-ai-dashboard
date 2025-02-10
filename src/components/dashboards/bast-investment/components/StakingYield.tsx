
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export const StakingYield = () => {
  const { toast } = useToast();

  const handleStake = () => {
    toast({
      title: "Staking Successful",
      description: "Your assets have been staked successfully",
    });
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Staking & Yield</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { asset: "Green Bonds", apy: "8.5%", progress: 75 },
            { asset: "Carbon Credits", apy: "12.3%", progress: 60 },
            { asset: "Impact Tokens", apy: "10.1%", progress: 45 },
          ].map((stake) => (
            <div key={stake.asset} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{stake.asset}</h4>
                <span className="text-primary font-bold">{stake.apy} APY</span>
              </div>
              <Progress value={stake.progress} className="h-2" />
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStake}
                >
                  Stake
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
