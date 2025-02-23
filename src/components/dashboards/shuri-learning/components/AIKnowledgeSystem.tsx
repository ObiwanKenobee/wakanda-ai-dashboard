
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Users, Star, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LearningPath {
  id: number;
  title: string;
  progress: number;
  enrolled: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}

export const AIKnowledgeSystem = () => {
  const [paths, setPaths] = useState<LearningPath[]>([
    {
      id: 1,
      title: "Blockchain Fundamentals",
      progress: 75,
      enrolled: 1250,
      difficulty: "Beginner",
      rating: 4.8
    },
    {
      id: 2,
      title: "ESG Principles",
      progress: 45,
      enrolled: 980,
      difficulty: "Intermediate",
      rating: 4.9
    },
    {
      id: 3,
      title: "Web3 Development",
      progress: 30,
      enrolled: 750,
      difficulty: "Advanced",
      rating: 4.7
    },
    {
      id: 4,
      title: "Sustainable Finance",
      progress: 60,
      enrolled: 1100,
      difficulty: "Intermediate",
      rating: 4.6
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPath, setNewPath] = useState({ title: "", difficulty: "Beginner" as const });
  const { toast } = useToast();

  const handleAddPath = () => {
    if (!newPath.title) {
      toast({
        title: "Error",
        description: "Please enter a path title",
        variant: "destructive",
      });
      return;
    }

    const path: LearningPath = {
      id: paths.length + 1,
      title: newPath.title,
      progress: 0,
      enrolled: 0,
      difficulty: newPath.difficulty,
      rating: 0
    };

    setPaths([...paths, path]);
    setNewPath({ title: "", difficulty: "Beginner" });
    toast({
      title: "Success",
      description: "New learning path created",
    });
  };

  const handleDeletePath = (id: number) => {
    setPaths(paths.filter(p => p.id !== id));
    toast({
      title: "Deleted",
      description: "Learning path removed",
    });
  };

  const filteredPaths = paths.filter(path =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6 rounded-lg bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span>AI Knowledge System</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
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

          <div className="flex gap-4">
            <Input
              placeholder="Search learning paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <Input
              placeholder="New path title..."
              value={newPath.title}
              onChange={(e) => setNewPath({ ...newPath, title: e.target.value })}
            />
            <Button onClick={handleAddPath}>
              <Plus className="h-4 w-4 mr-2" />
              Add Path
            </Button>
          </div>

          <div className="space-y-4">
            {filteredPaths.map((path) => (
              <div key={path.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{path.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{path.difficulty}</Badge>
                      <span>{path.enrolled} enrolled</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {path.rating}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePath(path.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={path.progress} className="h-2" />
                <span className="text-sm text-muted-foreground mt-2">
                  {path.progress}% complete
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
