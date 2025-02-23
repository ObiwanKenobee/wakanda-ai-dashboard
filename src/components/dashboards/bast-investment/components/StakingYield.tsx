
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CoinsIcon, Plus, Trash2, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StakeAsset {
  id: number;
  asset: string;
  apy: string;
  progress: number;
  stakedAmount: number;
}

export const StakingYield = () => {
  const [stakes, setStakes] = useState<StakeAsset[]>([
    { id: 1, asset: "Green Bonds", apy: "8.5%", progress: 75, stakedAmount: 5000 },
    { id: 2, asset: "Carbon Credits", apy: "12.3%", progress: 60, stakedAmount: 3000 },
    { id: 3, asset: "Impact Tokens", apy: "10.1%", progress: 45, stakedAmount: 2500 },
  ]);
  const [newStake, setNewStake] = useState({ asset: '', apy: '' });
  const { toast } = useToast();

  const handleAddStake = () => {
    if (!newStake.asset || !newStake.apy) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...stakes.map(s => s.id)) + 1;
    setStakes([...stakes, {
      id: newId,
      asset: newStake.asset,
      apy: `${newStake.apy}%`,
      progress: 0,
      stakedAmount: 0
    }]);
    setNewStake({ asset: '', apy: '' });
    toast({
      title: "Stake Added",
      description: "New staking opportunity has been added",
    });
  };

  const handleStake = (id: number) => {
    setStakes(stakes.map(stake =>
      stake.id === id ? { ...stake, progress: Math.min(stake.progress + 25, 100) } : stake
    ));
    toast({
      title: "Staking Successful",
      description: "Your assets have been staked successfully",
    });
  };

  const handleDeleteStake = (id: number) => {
    setStakes(stakes.filter(stake => stake.id !== id));
    toast({
      title: "Stake Removed",
      description: "Staking opportunity has been removed",
    });
  };

  const totalStaked = stakes.reduce((acc, stake) => acc + stake.stakedAmount, 0);
  const averageAPY = (stakes.reduce((acc, stake) => acc + parseFloat(stake.apy), 0) / stakes.length).toFixed(1);

  return (
    <Card className="p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <CoinsIcon className="h-5 w-5 text-primary" />
            Staking & Yield
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-muted-foreground">Total Staked Value</p>
              <h4 className="text-2xl font-bold text-primary">${totalStaked.toLocaleString()}</h4>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-muted-foreground">Average APY</p>
              <h4 className="text-2xl font-bold text-primary">{averageAPY}%</h4>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Asset Name"
              value={newStake.asset}
              onChange={(e) => setNewStake({ ...newStake, asset: e.target.value })}
            />
            <Input
              placeholder="APY %"
              type="number"
              value={newStake.apy}
              onChange={(e) => setNewStake({ ...newStake, apy: e.target.value })}
            />
            <Button onClick={handleAddStake}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-4">
            {stakes.map((stake) => (
              <div key={stake.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{stake.asset}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">{stake.apy} APY</span>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStake(stake.id)}
                    >
                      Stake
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteStake(stake.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Progress value={stake.progress} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  Progress: {stake.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
