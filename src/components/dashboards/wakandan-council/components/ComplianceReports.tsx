
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Pencil, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: number;
  title: string;
  content: string;
  date: string;
}

export const ComplianceReports = () => {
  const [reports, setReports] = useState<Report[]>([
    { id: 1, title: 'Q1 Compliance Review', content: 'Detailed analysis of Q1 compliance metrics', date: '2024-01-15' },
    { id: 2, title: 'ESG Standards Update', content: 'Updates to environmental standards', date: '2024-02-15' },
    { id: 3, title: 'Governance Audit', content: 'Annual governance structure audit', date: '2024-03-15' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newReport, setNewReport] = useState({ title: '', content: '' });

  const handleAdd = () => {
    if (!newReport.title || !newReport.content) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const report = {
      id: Math.max(0, ...reports.map(r => r.id)) + 1,
      ...newReport,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReports([...reports, report]);
    setNewReport({ title: '', content: '' });
    setIsAdding(false);
    toast.success("Report added successfully");
  };

  const handleEdit = (id: number) => {
    const report = reports.find(r => r.id === id);
    if (report) {
      setNewReport({ title: report.title, content: report.content });
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!newReport.title || !newReport.content) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setReports(reports.map(r => 
      r.id === editingId 
        ? { ...r, title: newReport.title, content: newReport.content }
        : r
    ));
    setNewReport({ title: '', content: '' });
    setEditingId(null);
    toast.success("Report updated successfully");
  };

  const handleDelete = (id: number) => {
    setReports(reports.filter(r => r.id !== id));
    toast.success("Report deleted successfully");
  };

  const handleView = (report: Report) => {
    toast(report.title, {
      description: report.content,
      duration: 5000,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Compliance Reports</h3>
        <Button 
          onClick={() => setIsAdding(!isAdding)} 
          variant="outline" 
          size="sm"
          className="text-primary"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      {(isAdding || editingId !== null) && (
        <div className="mb-4 space-y-4 p-4 rounded-lg bg-white/5">
          <Input
            placeholder="Report Title"
            value={newReport.title}
            onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
            className="bg-background"
          />
          <Textarea
            placeholder="Report Content"
            value={newReport.content}
            onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
            className="bg-background"
          />
          <div className="flex space-x-2">
            <Button 
              onClick={editingId !== null ? handleUpdate : handleAdd}
              variant="default"
              size="sm"
            >
              {editingId !== null ? 'Update' : 'Add'} Report
            </Button>
            <Button 
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setNewReport({ title: '', content: '' });
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
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div className="flex-1">
              <p className="text-sm font-medium">{report.title}</p>
              <p className="text-sm text-muted-foreground">
                Verified on: {report.date}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleView(report)}
              >
                <FileText className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(report.id)}
              >
                <Pencil className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(report.id)}
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
