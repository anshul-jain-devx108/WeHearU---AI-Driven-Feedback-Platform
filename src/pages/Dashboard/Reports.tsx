
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileText,
  Calendar, 
  Filter, 
  BarChart,
  RefreshCw 
} from 'lucide-react';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import { useFeedback } from '@/context/FeedbackContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { feedbacks, stats, loading, exportFeedbacks } = useFeedback();
  
  const handleExport = (format: 'csv' | 'pdf') => {
    exportFeedbacks(format);
  };

  const handleGenerateReport = () => {
    // Simulate report generation
    toast({
      title: "Report Generated",
      description: "Your custom report has been generated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">
                Generate and manage custom feedback reports
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                disabled={loading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Available Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { 
                title: "Sentiment Analysis", 
                description: "Detailed breakdown of customer sentiment trends", 
                lastGenerated: "3 days ago",
                icon: <BarChart className="h-5 w-5 text-primary" />
              },
              { 
                title: "Category Report", 
                description: "Analysis of feedback by category", 
                lastGenerated: "1 week ago",
                icon: <FileText className="h-5 w-5 text-primary" />
              },
              { 
                title: "Quarterly Summary", 
                description: "Executive summary of feedback insights", 
                lastGenerated: "1 month ago",
                icon: <FileText className="h-5 w-5 text-primary" />
              },
            ].map((report, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    {report.icon}
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Last generated: {report.lastGenerated}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={handleGenerateReport}
                    >
                      Generate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => handleExport('pdf')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Reports */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Reports generated in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      name: "Weekly Sentiment Analysis", 
                      date: "2023-04-12", 
                      format: "PDF", 
                      user: "John Doe" 
                    },
                    { 
                      name: "Monthly Category Report", 
                      date: "2023-04-10", 
                      format: "CSV", 
                      user: "Jane Smith" 
                    },
                    { 
                      name: "Product Feedback Summary", 
                      date: "2023-04-05", 
                      format: "PDF", 
                      user: "John Doe" 
                    },
                    { 
                      name: "Customer Satisfaction Report", 
                      date: "2023-04-01", 
                      format: "PDF", 
                      user: "Mark Wilson" 
                    },
                  ].map((report, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell>{report.user}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleExport(report.format.toLowerCase() as 'csv' | 'pdf')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Custom Report Builder */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create a tailored report based on specific criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Report Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Sentiment', 'Category', 'Product', 'Source'].map((type, i) => (
                      <Button key={i} variant="outline" size="sm" className="justify-start">
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Time Period</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Last Week', 'Last Month', 'Last Quarter', 'Custom'].map((period, i) => (
                      <Button key={i} variant="outline" size="sm" className="justify-start">
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Format</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['PDF', 'CSV', 'Excel', 'Google Sheet'].map((format, i) => (
                      <Button key={i} variant="outline" size="sm" className="justify-start">
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={handleGenerateReport}>Generate Custom Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
