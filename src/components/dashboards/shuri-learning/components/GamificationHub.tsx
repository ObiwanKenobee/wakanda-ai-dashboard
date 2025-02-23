
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trophy, Coins, Medal, Gift, Plus, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  progress: number;
  unlocked: boolean;
}

export const GamificationHub = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "Blockchain Pioneer",
      description: "Complete 5 blockchain courses",
      points: 500,
      progress: 80,
      unlocked: false
    },
    {
      id: 2,
      title: "ESG Champion",
      description: "Achieve perfect scores in ESG assessments",
      points: 1000,
      progress: 65,
      unlocked: false
    },
    {
      id: 3,
      title: "Community Leader",
      description: "Help 50 other learners",
      points: 750,
      progress: 90,
      unlocked: true
    }
  ]);
  const [newAchievement, setNewAchievement] = useState({ title: "", points: "" });
  const { toast } = useToast();

  const handleAddAchievement = () => {
    if (!newAchievement.title || !newAchievement.points) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const achievement: Achievement = {
      id: achievements.length + 1,
      title: newAchievement.title,
      description: "New achievement description",
      points: parseInt(newAchievement.points),
      progress: 0,
      unlocked: false
    };

    setAchievements([...achievements, achievement]);
    setNewAchievement({ title: "", points: "" });
    toast({
      title: "Success",
      description: "New achievement added",
    });
  };

  const handleUnlockAchievement = (id: number) => {
    setAchievements(achievements.map(a =>
      a.id === id ? { ...a, unlocked: true, progress: 100 } : a
    ));
    toast({
      title: "Achievement Unlocked!",
      description: "Congratulations on your progress!",
    });
  };

  const handleDeleteAchievement = (id: number) => {
    setAchievements(achievements.filter(a => a.id !== id));
    toast({
      title: "Deleted",
      description: "Achievement removed",
    });
  };

  const totalPoints = achievements.reduce((sum, a) => sum + (a.unlocked ? a.points : 0), 0);
  const level = Math.floor(totalPoints / 1000) + 1;

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
              <Coins className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-medium">SHURI Points</p>
                <p className="text-sm text-muted-foreground">Current Balance</p>
              </div>
            </div>
            <span className="text-2xl font-bold">{totalPoints}</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Level Progress</span>
                <span className="text-sm font-medium">Level {level}</span>
              </div>
              <Progress value={totalPoints % 1000 / 10} className="h-2" />
            </div>

            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Achievement Title"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              />
              <Input
                placeholder="Points"
                type="number"
                value={newAchievement.points}
                onChange={(e) => setNewAchievement({ ...newAchievement, points: e.target.value })}
              />
              <Button onClick={handleAddAchievement}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      {achievement.points} pts
                    </Badge>
                  </div>
                  <Progress value={achievement.progress} className="h-2 mb-2" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      Progress: {achievement.progress}%
                    </span>
                    <div className="flex gap-2">
                      {!achievement.unlocked && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnlockAchievement(achievement.id)}
                        >
                          Unlock
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAchievement(achievement.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
