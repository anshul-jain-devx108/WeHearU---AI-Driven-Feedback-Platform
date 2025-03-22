
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown, 
  Download, 
  Filter, 
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Flag,
  Archive
} from 'lucide-react';
import { type Feedback } from '@/context/FeedbackContext';
import { format } from 'date-fns';

interface FeedbackTableProps {
  feedbacks: Feedback[];
  loading: boolean;
  onExport: (format: 'csv' | 'pdf') => Promise<void>;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ 
  feedbacks, 
  loading,
  onExport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

  // Get sentiment badge color and text
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Negative</Badge>;
      case 'neutral':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Neutral</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Table controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Feedback</DropdownMenuItem>
              <DropdownMenuItem>Positive</DropdownMenuItem>
              <DropdownMenuItem>Negative</DropdownMenuItem>
              <DropdownMenuItem>Neutral</DropdownMenuItem>
              <DropdownMenuItem>High Priority</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                <span>Export</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button variant="ghost" className="flex h-8 p-0 items-center text-muted-foreground font-medium">
                  <span>Date</span>
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead className="w-[100px]">
                <Button variant="ghost" className="flex h-8 p-0 items-center text-muted-foreground font-medium">
                  <span>Sentiment</span>
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[80px] text-center">Score</TableHead>
              <TableHead className="w-[120px]">Source</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedFeedbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No feedback found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedFeedbacks.map((feedback) => (
                <TableRow key={feedback.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-sm">
                    {format(new Date(feedback.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm line-clamp-2" title={feedback.text}>
                      {feedback.text}
                    </div>
                    <div className="flex items-center mt-1 gap-2">
                      <Badge variant="outline" className="text-xs">
                        {feedback.product}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {feedback.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getSentimentBadge(feedback.sentiment)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div 
                      className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                        feedback.score >= 70 
                          ? 'bg-green-100 text-green-800' 
                          : feedback.score <= 40 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {feedback.score}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{feedback.source}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Flag as Important</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Archive className="mr-2 h-4 w-4" />
                          <span>Archive</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredFeedbacks.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show the first page, last page, and pages around the current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              // Show ellipsis for gaps
              if (
                (pageNumber === 2 && currentPage > 3) ||
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return <PaginationItem key={pageNumber}>...</PaginationItem>;
              }
              
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FeedbackTable;
