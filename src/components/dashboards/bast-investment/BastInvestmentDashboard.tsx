
import React from 'react';
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Wallet, LineChart } from "lucide-react";
import { ESGMarketInsights } from './components/ESGMarketInsights';
import { AIPortfolioManagement } from './components/AIPortfolioManagement';
import { TradingBots } from './components/TradingBots';
import { StakingYield } from './components/StakingYield';

export const BastInvestmentDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient">Bast Investment Suite</h2>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Total Portfolio</span>
          </div>
          <div className="text-2xl font-bold">$124,500</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Monthly Return</span>
          </div>
          <div className="text-2xl font-bold">+12.4%</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Active Bots</span>
          </div>
          <div className="text-2xl font-bold">8</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <LineChart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">ESG Score</span>
          </div>
          <div className="text-2xl font-bold">92.5</div>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ESGMarketInsights />
        <AIPortfolioManagement />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <TradingBots />
        <StakingYield />
      </div>
    </div>
  );
};
