
import React from 'react';
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Trophy, Bot } from "lucide-react";
import { AIKnowledgeSystem } from './components/AIKnowledgeSystem';
import { GamificationHub } from './components/GamificationHub';
import { AIMentor } from './components/AIMentor';

export const ShuriLearningDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gradient">Shuri Learning Hub</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Active Courses</span>
          </div>
          <div className="text-2xl font-bold">24</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Learning Hours</span>
          </div>
          <div className="text-2xl font-bold">156</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Achievements</span>
          </div>
          <div className="text-2xl font-bold">15</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Sessions</span>
          </div>
          <div className="text-2xl font-bold">42</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AIKnowledgeSystem />
        <GamificationHub />
      </div>
      
      <div className="grid gap-4">
        <AIMentor />
      </div>
    </div>
  );
};
