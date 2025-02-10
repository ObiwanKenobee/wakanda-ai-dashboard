
import React from 'react';
import { ESGMarketInsights } from './components/ESGMarketInsights';
import { AIPortfolioManagement } from './components/AIPortfolioManagement';
import { TradingBots } from './components/TradingBots';
import { StakingYield } from './components/StakingYield';

export const BastInvestmentDashboard = () => {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Bast Investment Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ESGMarketInsights />
        <AIPortfolioManagement />
        <TradingBots />
        <StakingYield />
      </div>
    </div>
  );
};
