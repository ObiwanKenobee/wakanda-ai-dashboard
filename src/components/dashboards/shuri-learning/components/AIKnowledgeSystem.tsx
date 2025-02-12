
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AIKnowledgeSystem = () => {
  const { toast } = useToast();

  const handleJoinWaitlist = () => {
    toast({
      title: "Joined Waitlist",
      description: "You'll be notified when the platform launches!",
    });
  };

  return (
    <Card className="p-6 rounded-lg bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span>AI Knowledge System</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>150+ Learning Paths</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>10k+ Community Members</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Featured Topics</h4>
            <div className="grid gap-2">
              {["Blockchain Fundamentals", "ESG Principles", "Web3 Development", "Sustainable Finance"].map((topic) => (
                <div key={topic} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span>{topic}</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleJoinWaitlist} className="w-full">
            Join Platform Waitlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
