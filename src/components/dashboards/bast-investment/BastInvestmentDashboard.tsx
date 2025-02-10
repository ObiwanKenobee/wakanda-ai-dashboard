
import React from 'react';

export const BastInvestmentDashboard = () => {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Bast Investment Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placeholder components - to be implemented */}
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">ESG Market Insights</h2>
          <p className="text-muted-foreground">Coming soon: Real-time sustainability metrics</p>
        </div>
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">AI Portfolio Management</h2>
          <p className="text-muted-foreground">Coming soon: Auto-balancing ESG funds</p>
        </div>
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Trading Bots</h2>
          <p className="text-muted-foreground">Coming soon: Automated ESG trading</p>
        </div>
        <div className="p-6 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Staking & Yield</h2>
          <p className="text-muted-foreground">Coming soon: ESG-positive rewards</p>
        </div>
      </div>
    </div>
  );
};
