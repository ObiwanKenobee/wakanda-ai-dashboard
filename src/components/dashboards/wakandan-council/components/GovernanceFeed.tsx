
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: 'Active' | 'Pending' | 'Completed';
}

export const GovernanceFeed = () => {
  const [proposals, setProposals] = useState<Proposal[]>([
    { id: 1, title: 'ESG Metrics Update', description: 'Update sustainability metrics for Q2 2024', status: 'Active' },
    { id: 2, title: 'Carbon Offset', description: 'Implement carbon offset tracking system', status: 'Pending' },
    { id: 3, title: 'Governance Update', description: 'Review and update governance policies', status: 'Active' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProposal, setNewProposal] = useState({ title: '', description: '' });

  const handleAdd = () => {
    if (!newProposal.title || !newProposal.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const proposal = {
      id: Math.max(0, ...proposals.map(p => p.id)) + 1,
      ...newProposal,
      status: 'Pending' as const
    };
    
    setProposals([...proposals, proposal]);
    setNewProposal({ title: '', description: '' });
    setIsAdding(false);
    toast.success("Proposal added successfully");
  };

  const handleEdit = (id: number) => {
    const proposal = proposals.find(p => p.id === id);
    if (proposal) {
      setNewProposal({ title: proposal.title, description: proposal.description });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!newProposal.title || !newProposal.description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setProposals(proposals.map(p => 
      p.id === editingId 
        ? { ...p, title: newProposal.title, description: newProposal.description }
        : p
    ));
    setNewProposal({ title: '', description: '' });
    setEditingId(null);
    toast.success("Proposal updated successfully");
  };

  const handleDelete = (id: number) => {
    setProposals(proposals.filter(p => p.id !== id));
    toast.success("Proposal deleted successfully");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Live Governance Feed</h3>
        <Button 
          onClick={() => setIsAdding(!isAdding)} 
          variant="outline" 
          size="sm"
          className="text-primary"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {(isAdding || editingId !== null) && (
        <div className="mb-4 space-y-4 p-4 rounded-lg bg-white/5">
          <Input
            placeholder="Proposal Title"
            value={newProposal.title}
            onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
            className="bg-background"
          />
          <Textarea
            placeholder="Proposal Description"
            value={newProposal.description}
            onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
            className="bg-background"
          />
          <div className="flex space-x-2">
            <Button 
              onClick={editingId !== null ? handleUpdate : handleAdd}
              variant="default"
              size="sm"
            >
              {editingId !== null ? 'Update' : 'Add'} Proposal
            </Button>
            <Button 
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setNewProposal({ title: '', description: '' });
              }}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="flex items-start justify-between p-4 rounded-lg bg-white/5">
            <div className="flex-1">
              <p className="text-sm font-medium">{proposal.title}</p>
              <p className="text-sm text-muted-foreground">
                {proposal.description}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                proposal.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                proposal.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {proposal.status}
              </span>
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(proposal.id)}
              >
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(proposal.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
