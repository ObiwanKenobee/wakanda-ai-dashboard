
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: 'Active' | 'Pending' | 'Completed';
  votes: number;
  comments: number;
}

export const GovernanceFeed = () => {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Carbon Neutrality Initiative",
      description: "Proposal to achieve carbon neutrality by 2025",
      status: "Active",
      votes: 156,
      comments: 23
    },
    {
      id: 2,
      title: "Sustainable Supply Chain",
      description: "Implementation of blockchain-based supply chain tracking",
      status: "Pending",
      votes: 89,
      comments: 15
    }
  ]);
  const [newProposal, setNewProposal] = useState({ title: '', description: '' });
  const { toast } = useToast();

  const handleAddProposal = () => {
    if (!newProposal.title || !newProposal.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const proposal: Proposal = {
      id: proposals.length + 1,
      title: newProposal.title,
      description: newProposal.description,
      status: 'Pending',
      votes: 0,
      comments: 0
    };

    setProposals([...proposals, proposal]);
    setNewProposal({ title: '', description: '' });
    toast({
      title: "Success",
      description: "New proposal has been created",
    });
  };

  const handleDeleteProposal = (id: number) => {
    setProposals(proposals.filter(p => p.id !== id));
    toast({
      title: "Deleted",
      description: "Proposal has been removed",
    });
  };

  const handleVote = (id: number) => {
    setProposals(proposals.map(p => 
      p.id === id ? { ...p, votes: p.votes + 1 } : p
    ));
    toast({
      title: "Vote Recorded",
      description: "Your vote has been counted",
    });
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Governance Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Create New Proposal</h4>
            <div className="space-y-4">
              <Input
                placeholder="Proposal Title"
                value={newProposal.title}
                onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
              />
              <Textarea
                placeholder="Proposal Description"
                value={newProposal.description}
                onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
              />
              <Button onClick={handleAddProposal}>Submit Proposal</Button>
            </div>
          </div>

          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{proposal.title}</h4>
                      <p className="text-sm text-muted-foreground">{proposal.description}</p>
                    </div>
                    <Badge variant={
                      proposal.status === 'Active' ? 'default' :
                      proposal.status === 'Pending' ? 'secondary' : 'outline'
                    }>{proposal.status}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" onClick={() => handleVote(proposal.id)}>
                        <Users className="h-4 w-4 mr-2" />
                        {proposal.votes} Votes
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {proposal.comments} Comments
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProposal(proposal.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
