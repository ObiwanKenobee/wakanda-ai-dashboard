
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bot, Shuffle, TrendingUp, ChartBar, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Asset {
  id: number;
  name: string;
  allocation: number;
  performance: number;
  risk: 'Low' | 'Medium' | 'High';
}

const initialAssets: Asset[] = [
  { id: 1, name: 'Green Energy', allocation: 35, performance: 12.5, risk: 'Medium' },
  { id: 2, name: 'Clean Water', allocation: 25, performance: 8.3, risk: 'Low' },
  { id: 3, name: 'Sustainable Tech', allocation: 20, performance: 15.7, risk: 'High' },
  { id: 4, name: 'Social Impact', allocation: 20, performance: 10.2, risk: 'Medium' },
];

export const AIPortfolioManagement = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [newAsset, setNewAsset] = useState({ name: '', allocation: '' });
  const { toast } = useToast();

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.allocation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const allocation = parseInt(newAsset.allocation);
    if (isNaN(allocation) || allocation <= 0 || allocation > 100) {
      toast({
        title: "Invalid Allocation",
        description: "Allocation must be between 1 and 100",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...assets.map(a => a.id)) + 1;
    setAssets([...assets, {
      id: newId,
      name: newAsset.name,
      allocation: allocation,
      performance: Math.random() * 20,
      risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High'
    }]);
    setNewAsset({ name: '', allocation: '' });
    toast({
      title: "Asset Added",
      description: "New asset has been added to your portfolio",
    });
  };

  const handleRebalance = () => {
    toast({
      title: "Portfolio Rebalancing",
      description: "AI is optimizing your portfolio allocation...",
    });
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter(a => a.id !== id));
    toast({
      title: "Asset Removed",
      description: "Asset has been removed from your portfolio",
    });
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Portfolio Management
          </CardTitle>
          <Button onClick={handleRebalance} className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            Auto-Balance
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assets}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="allocation" fill="#9B87F5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-sm text-muted-foreground">Portfolio Return</p>
              </div>
              <h4 className="text-2xl font-bold text-primary mt-2">+12.4%</h4>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <ChartBar className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
              <h4 className="text-2xl font-bold text-primary mt-2">$124,500</h4>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Asset Name"
              value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
            />
            <Input
              placeholder="Allocation %"
              type="number"
              value={newAsset.allocation}
              onChange={(e) => setNewAsset({ ...newAsset, allocation: e.target.value })}
            />
            <Button onClick={handleAddAsset}>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.allocation}%</TableCell>
                  <TableCell className={asset.performance > 0 ? 'text-green-500' : 'text-red-500'}>
                    {asset.performance > 0 ? '+' : ''}{asset.performance.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      asset.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                      asset.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {asset.risk}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAsset(asset.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
