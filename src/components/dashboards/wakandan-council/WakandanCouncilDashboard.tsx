
import { Card } from "@/components/ui/card";
import { ChartBar, LineChart, Shield, Vote } from "lucide-react";
import { ESGScorecard } from "./components/ESGScorecard";
import { GovernanceFeed } from "./components/GovernanceFeed";
import { ComplianceReports } from "./components/ComplianceReports";
import { DataVisualization } from "./components/DataVisualization";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const WakandanCouncilDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient">AI Wakandan Council Dashboard</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/shuri-learning">
            <Button variant="outline" size="sm" className="text-xs">
              Learn Governance
            </Button>
          </Link>
          <Link to="/bast-investment">
            <Button variant="outline" size="sm" className="text-xs">
              View Investments
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <ChartBar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">ESG Score</span>
          </div>
          <div className="text-2xl font-bold">92.5</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <Vote className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Active Proposals</span>
          </div>
          <div className="text-2xl font-bold">24</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Compliance Rate</span>
          </div>
          <div className="text-2xl font-bold">98.2%</div>
        </Card>
        <Card className="p-4 glass-panel">
          <div className="flex items-center space-x-2">
            <LineChart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Sustainability Index</span>
          </div>
          <div className="text-2xl font-bold">89.7</div>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ESGScorecard />
        <GovernanceFeed />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <ComplianceReports />
        <DataVisualization />
      </div>
    </div>
  );
};
