import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Upload,
  FileText,
  File,
  CheckCircle,
  AlertCircle,
  X,
  Cloud,
  Database,
  Brain,
  Loader2,
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  processingSteps?: Array<{
    step: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    service: string;
  }>;
}

const DocumentUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (fileList: File[]) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    fileList.forEach(file => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: `${file.name} is not a supported file type. Please upload PDF, DOCX, or TXT files.`,
          variant: 'destructive',
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: 'File Too Large',
          description: `${file.name} exceeds the 10MB limit.`,
          variant: 'destructive',
        });
        return;
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
      };

      setFiles(prev => [...prev, uploadedFile]);
      simulateUploadProcess(uploadedFile.id);
    });
  };

  const simulateUploadProcess = async (fileId: string) => {
    const processingSteps = [
      { step: 'Uploading file', status: 'processing' as const, service: 'File Storage' },
      { step: 'Text extraction', status: 'pending' as const, service: 'Document Processing' },
      { step: 'Content chunking', status: 'pending' as const, service: 'Text Segmentation' },
      { step: 'Indexing to Discovery', status: 'pending' as const, service: 'IBM Watson Discovery' },
    ];

    // Update file with processing steps
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, status: 'processing', processingSteps: [...processingSteps] }
        : file
    ));

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, progress } : file
      ));
    }

    // Simulate processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
      
      setFiles(prev => prev.map(file => {
        if (file.id === fileId && file.processingSteps) {
          const updatedSteps = [...file.processingSteps];
          if (i > 0) updatedSteps[i - 1].status = 'completed';
          updatedSteps[i].status = 'processing';
          return { ...file, processingSteps: updatedSteps };
        }
        return file;
      }));
    }

    // Complete final step
    await new Promise(resolve => setTimeout(resolve, 500));
    setFiles(prev => prev.map(file => {
      if (file.id === fileId && file.processingSteps) {
        const updatedSteps = [...file.processingSteps];
        updatedSteps[updatedSteps.length - 1].status = 'completed';
        return { ...file, status: 'completed', processingSteps: updatedSteps };
      }
      return file;
    }));

    toast({
      title: 'Upload Complete',
      description: `${files.find(f => f.id === fileId)?.name} has been successfully processed and indexed.`,
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-6 w-6 text-destructive" />;
    if (type.includes('word')) return <File className="h-6 w-6 text-primary" />;
    return <File className="h-6 w-6 text-muted-foreground" />;
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Document Upload</h1>
        <p className="text-muted-foreground mt-1">
          Upload your documents for AI-powered analysis and retrieval
        </p>
      </div>

      {/* Upload Area */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Cloud className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Drop files here or click to browse</h3>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOCX, and TXT files (max 10MB each)
                </p>
              </div>
              <Button className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
              <Input
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>

          {/* File Processing Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-sm">Watson Discovery</p>
                <p className="text-xs text-muted-foreground">Document indexing & search</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Brain className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-sm">watsonx.ai Granite</p>
                <p className="text-xs text-muted-foreground">Content summarization</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Cloud className="h-6 w-6 text-warning" />
              <div>
                <p className="font-medium text-sm">AWS Titan Text</p>
                <p className="text-xs text-muted-foreground">Answer generation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          file.status === 'completed' ? 'default' :
                          file.status === 'failed' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {file.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      disabled={file.status === 'processing'}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {file.status === 'uploading' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  )}

                  {file.processingSteps && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Processing Pipeline:</p>
                      {file.processingSteps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          {getStepIcon(step.status)}
                          <span className="flex-1">{step.step}</span>
                          <Badge variant="outline" className="text-xs">
                            {step.service}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;