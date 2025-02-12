
import React from 'react';
import { AIKnowledgeSystem } from './components/AIKnowledgeSystem';
import { SustainabilityReports } from './components/SustainabilityReports';
import { GamificationHub } from './components/GamificationHub';
import { AIMentor } from './components/AIMentor';

export const ShuriLearningDashboard = () => {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Shuri Learning Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIKnowledgeSystem />
        <SustainabilityReports />
        <GamificationHub />
        <AIMentor />
      </div>
    </div>
  );
};
