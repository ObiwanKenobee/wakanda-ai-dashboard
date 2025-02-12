
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Robot, MessageSquare, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const AIMentor = () => {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Question Received",
      description: "Your AI mentor is analyzing your question...",
    });
    setQuestion("");
  };

  return (
    <Card className="p-6 rounded-lg bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Robot className="h-6 w-6 text-primary" />
          <span>AI Mentor</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Active Sessions", value: "24/7", icon: MessageSquare },
              { title: "Topics Mastered", value: "15", icon: Sparkles },
              { title: "Learning Goals", value: "8", icon: Target },
            ].map((stat) => (
              <div key={stat.title} className="col-span-1 p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{stat.title}</span>
                </div>
                <span className="text-xl font-bold">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Ask Your AI Mentor</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Type your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAskQuestion}>Ask</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Suggested Topics</h4>
            <div className="grid gap-2">
              {[
                "ESG Investment Strategies",
                "Web3 Development Best Practices",
                "Sustainable Technology Trends",
              ].map((topic) => (
                <div key={topic} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
