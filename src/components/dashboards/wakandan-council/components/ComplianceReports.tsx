
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: number;
  title: string;
  content: string;
  date: string;
  status: 'Compliant' | 'Non-Compliant' | 'Under Review';
}

export const ComplianceReports = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: "Q1 ESG Compliance",
      content: "Quarterly review of ESG metrics and compliance status",
      date: "2024-03-15",
      status: "Compliant"
    },
    {
      id: 2,
      title: "Carbon Footprint Assessment",
      content: "Annual carbon emissions and reduction strategies",
      date: "2024-03-10",
      status: "Under Review"
    }
  ]);
  const [newReport, setNewReport] = useState({ title: '', content: '' });
  const { toast } = useToast();

  const handleAddReport = () => {
    if (!newReport.title || !newReport.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const report: Report = {
      id: reports.length + 1,
      title: newReport.title,
      content: newReport.content,
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review'
    };

    setReports([...reports, report]);
    setNewReport({ title: '', content: '' });
    toast({
      title: "Success",
      description: "New compliance report added",
    });
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter(r => r.id !== id));
    toast({
      title: "Deleted",
      description: "Report has been removed",
    });
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Compliance Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Add New Report</h4>
            <div className="space-y-4">
              <Input
                placeholder="Report Title"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
              />
              <Textarea
                placeholder="Report Content"
                value={newReport.content}
                onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
              />
              <Button onClick={handleAddReport}>
                <Plus className="h-4 w-4 mr-2" />
                Add Report
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'Compliant' ? 'bg-green-500/20 text-green-400' :
                      report.status === 'Non-Compliant' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReport(report.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
