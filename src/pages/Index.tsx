
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, Brain, Bot, Search, Plus, Trash2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Initiative {
  id: number;
  name: string;
  progress: number;
  status: 'Active' | 'Pending' | 'Completed';
  impact: number;
}

const initialData = [
  { name: 'Jan', value: 400, ai: 300 },
  { name: 'Feb', value: 300, ai: 400 },
  { name: 'Mar', value: 600, ai: 500 },
  { name: 'Apr', value: 800, ai: 700 },
  { name: 'May', value: 500, ai: 600 },
];

const pieData = [
  { name: 'ESG', value: 35 },
  { name: 'Innovation', value: 30 },
  { name: 'Community', value: 20 },
  { name: 'Research', value: 15 },
];

const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#EC4899'];

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [initiatives, setInitiatives] = useState<Initiative[]>([
    { id: 1, name: "AI Governance Framework", progress: 75, status: "Active", impact: 85 },
    { id: 2, name: "Sustainable Tech Innovation", progress: 60, status: "Active", impact: 92 },
    { id: 3, name: "Community Development", progress: 45, status: "Pending", impact: 78 }
  ]);
  const [newInitiative, setNewInitiative] = useState("");
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleAddInitiative = () => {
    if (!newInitiative.trim()) {
      toast({
        title: "Error",
        description: "Please enter an initiative name",
        variant: "destructive"
      });
      return;
    }

    const initiative: Initiative = {
      id: initiatives.length + 1,
      name: newInitiative,
      progress: 0,
      status: "Pending",
      impact: 0
    };

    setInitiatives([...initiatives, initiative]);
    setNewInitiative("");
    toast({
      title: "Success",
      description: "New initiative added successfully"
    });
  };

  const handleDeleteInitiative = (id: number) => {
    setInitiatives(initiatives.filter(i => i.id !== id));
    toast({
      title: "Deleted",
      description: "Initiative removed successfully"
    });
  };

  const updateProgress = (id: number) => {
    setInitiatives(initiatives.map(i =>
      i.id === id ? { ...i, progress: Math.min(i.progress + 10, 100) } : i
    ));
    toast({
      title: "Progress Updated",
      description: "Initiative progress has been updated"
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Guardian-IO
            <span className="text-primary"> Wakanda AI</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Advanced AI-powered platform for sustainable and decentralized governance
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Activity className="w-6 h-6" />, title: "ESG Score", value: "92.5" },
            { icon: <TrendingUp className="w-6 h-6" />, title: "Growth Rate", value: "+24.8%" },
            { icon: <Users className="w-6 h-6" />, title: "Active Users", value: "12.5K" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-panel rounded-xl p-6 flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="p-6 glass-panel">
            <h3 className="text-xl font-semibold mb-4">Performance Analytics</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={initialData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#9B87F5" />
                  <Line type="monotone" dataKey="ai" stroke="#10B981" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 glass-panel">
            <h3 className="text-xl font-semibold mb-4">Resource Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Strategic Initiatives</h3>
            <div className="flex gap-4">
              <Input
                placeholder="New Initiative Name"
                value={newInitiative}
                onChange={(e) => setNewInitiative(e.target.value)}
                className="w-64"
              />
              <Button onClick={handleAddInitiative}>
                <Plus className="h-4 w-4 mr-2" />
                Add Initiative
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {initiatives.map((initiative) => (
              <div key={initiative.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{initiative.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        initiative.status === 'Active' ? 'default' :
                        initiative.status === 'Completed' ? 'secondary' : 'outline'
                      }>{initiative.status}</Badge>
                      <span className="text-sm text-muted-foreground">Impact Score: {initiative.impact}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateProgress(initiative.id)}>
                      Update Progress
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteInitiative(initiative.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Progress value={initiative.progress} className="h-2" />
                <span className="text-sm text-muted-foreground mt-2">
                  Progress: {initiative.progress}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
