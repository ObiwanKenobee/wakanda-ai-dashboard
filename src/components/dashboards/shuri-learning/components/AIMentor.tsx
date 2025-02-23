
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bot, MessageSquare, Sparkles, Target, Trash2, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
  topic: string;
}

export const AIMentor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      question: "How do blockchain consensus mechanisms work?",
      answer: "Consensus mechanisms are protocols that enable network participants to agree on the valid state of the blockchain...",
      timestamp: "2024-03-15 10:30",
      topic: "Blockchain"
    },
    {
      id: 2,
      question: "What are the key ESG metrics for sustainable investing?",
      answer: "Key ESG metrics include carbon emissions, water usage, board diversity, and corporate governance structures...",
      timestamp: "2024-03-15 11:15",
      topic: "ESG"
    }
  ]);
  const [newQuestion, setNewQuestion] = useState({ text: "", topic: "" });
  const { toast } = useToast();

  const handleAskQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      });
      return;
    }

    const message: Message = {
      id: messages.length + 1,
      question: newQuestion.text,
      answer: "Processing your question...",
      timestamp: new Date().toLocaleString(),
      topic: newQuestion.topic || "General"
    };

    setMessages([message, ...messages]);
    setNewQuestion({ text: "", topic: "" });
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === message.id
          ? { ...m, answer: "Here's a detailed explanation based on the latest research and best practices..." }
          : m
      ));
      toast({
        title: "Answer Ready",
        description: "Your AI mentor has responded to your question",
      });
    }, 2000);
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
    toast({
      title: "Message Deleted",
      description: "Conversation entry has been removed",
    });
  };

  return (
    <Card className="p-6 rounded-lg bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span>AI Mentor</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Active Sessions", value: "24/7", icon: MessageSquare },
              { title: "Topics Mastered", value: "15", icon: Sparkles },
              { title: "Learning Goals", value: "8", icon: Target },
            ].map((stat) => (
              <div key={stat.title} className="col-span-1 p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{stat.title}</span>
                </div>
                <span className="text-xl font-bold">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Ask Your AI Mentor</h4>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your question..."
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Topic (optional)"
                  value={newQuestion.topic}
                  onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                />
                <Button onClick={handleAskQuestion}>
                  <Send className="h-4 w-4 mr-2" />
                  Ask
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Conversation History</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{message.topic}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.question}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{message.answer}</TableCell>
                    <TableCell>{message.timestamp}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
