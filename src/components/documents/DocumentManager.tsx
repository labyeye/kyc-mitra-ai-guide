import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  File, 
  Download, 
  Trash2, 
  Eye, 
  Calendar,
  Database,
  Filter,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  status: 'indexed' | 'processing' | 'failed';
  chunks: number;
  lastQueried?: Date;
  queryCount: number;
}

const DocumentManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock documents data
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'KYC_Guidelines_2024.pdf',
      type: 'application/pdf',
      size: 2456789,
      uploadDate: new Date('2024-01-15'),
      status: 'indexed',
      chunks: 24,
      lastQueried: new Date('2024-01-20'),
      queryCount: 15,
    },
    {
      id: '2',
      name: 'Compliance_Rules.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 1234567,
      uploadDate: new Date('2024-01-14'),
      status: 'indexed',
      chunks: 18,
      lastQueried: new Date('2024-01-19'),
      queryCount: 8,
    },
    {
      id: '3',
      name: 'Regulatory_Updates.txt',
      type: 'text/plain',
      size: 567890,
      uploadDate: new Date('2024-01-13'),
      status: 'indexed',
      chunks: 12,
      lastQueried: new Date('2024-01-18'),
      queryCount: 3,
    },
    {
      id: '4',
      name: 'Risk_Assessment_Framework.pdf',
      type: 'application/pdf',
      size: 3456789,
      uploadDate: new Date('2024-01-12'),
      status: 'processing',
      chunks: 0,
      queryCount: 0,
    },
    {
      id: '5',
      name: 'Customer_Verification_Manual.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 2123456,
      uploadDate: new Date('2024-01-11'),
      status: 'failed',
      chunks: 0,
      queryCount: 0,
    },
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-5 w-5 text-destructive" />;
    if (type.includes('word')) return <File className="h-5 w-5 text-primary" />;
    return <File className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'indexed':
        return <Badge className="bg-accent text-accent-foreground">Indexed</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const stats = {
    total: documents.length,
    indexed: documents.filter(d => d.status === 'indexed').length,
    processing: documents.filter(d => d.status === 'processing').length,
    totalChunks: documents.reduce((sum, doc) => sum + doc.chunks, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage your uploaded documents and their indexing status
          </p>
        </div>
        <Button>
          <Database className="mr-2 h-4 w-4" />
          Reindex All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Indexed</p>
                <p className="text-2xl font-bold text-accent">{stats.indexed}</p>
              </div>
              <Database className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-warning">{stats.processing}</p>
              </div>
              <Database className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Text Chunks</p>
                <p className="text-2xl font-bold">{stats.totalChunks}</p>
              </div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'indexed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('indexed')}
                size="sm"
              >
                Indexed
              </Button>
              <Button
                variant={filterStatus === 'processing' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('processing')}
                size="sm"
              >
                Processing
              </Button>
              <Button
                variant={filterStatus === 'failed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('failed')}
                size="sm"
              >
                Failed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {getFileIcon(document.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{document.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(document.size)}</span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(document.uploadDate)}
                      </span>
                      {document.status === 'indexed' && (
                        <>
                          <span>{document.chunks} chunks</span>
                          <span>{document.queryCount} queries</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(document.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      {document.status === 'failed' && (
                        <DropdownMenuItem>
                          <Database className="mr-2 h-4 w-4" />
                          Retry Indexing
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;