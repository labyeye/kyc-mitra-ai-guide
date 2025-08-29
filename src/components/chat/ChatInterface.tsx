import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  sources?: Array<{
    name: string;
    page?: number;
    confidence: number;
  }>;
  processingSteps?: Array<{
    step: string;
    status: 'pending' | 'completed' | 'processing';
    service: string;
  }>;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to KYC Mitra! I can help you find information from your uploaded documents using advanced GenAI RAG technology. Ask me anything about your KYC documents, compliance requirements, or regulatory guidelines.',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateRAGPipeline = async (query: string) => {
    const initialSteps = [
      { step: 'Analyzing query', status: 'processing', service: 'Natural Language Processing' },
      { step: 'Searching documents', status: 'pending', service: 'IBM Watson Discovery' },
      { step: 'Summarizing findings', status: 'pending', service: 'IBM watsonx.ai Granite' },
      { step: 'Generating response', status: 'pending', service: 'AWS Titan Text' },
    ] as Array<{step: string; status: 'pending' | 'completed' | 'processing'; service: string}>;

    // Add processing message
    const processingMessage: Message = {
      id: Date.now().toString() + '_processing',
      type: 'ai',
      content: 'Processing your query through the RAG pipeline...',
      timestamp: new Date(),
      processingSteps: [...initialSteps],
    };

    setMessages(prev => [...prev, processingMessage]);

    // Simulate step-by-step processing
    for (let i = 0; i < initialSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      
      setMessages(prev => prev.map(msg => {
        if (msg.id === processingMessage.id && msg.processingSteps) {
          const updatedSteps = [...msg.processingSteps];
          if (i > 0) updatedSteps[i - 1].status = 'completed';
          updatedSteps[i].status = 'processing';
          return { ...msg, processingSteps: updatedSteps };
        }
        return msg;
      }));
    }

    // Complete final step
    await new Promise(resolve => setTimeout(resolve, 600));
    setMessages(prev => prev.map(msg => {
      if (msg.id === processingMessage.id && msg.processingSteps) {
        const updatedSteps = [...msg.processingSteps];
        updatedSteps[updatedSteps.length - 1].status = 'completed';
        return { ...msg, processingSteps: updatedSteps };
      }
      return msg;
    }));

    // Generate final response
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockSources = [
      { name: 'KYC_Guidelines_2024.pdf', page: 12, confidence: 0.94 },
      { name: 'Compliance_Rules.docx', page: 8, confidence: 0.87 },
      { name: 'Regulatory_Updates.txt', confidence: 0.82 },
    ];

    const responses = [
      "Based on the latest KYC guidelines from 2024, customer verification requires a minimum of two forms of identification: a government-issued photo ID and proof of address dated within the last 3 months. Additionally, enhanced due diligence is required for high-risk customers, which includes source of funds verification and ongoing monitoring.",
      "According to the compliance documentation, the customer onboarding process must include risk assessment scoring using the following criteria: geographic risk (25%), product risk (35%), customer type risk (25%), and delivery channel risk (15%). All scores above 70 require enhanced due diligence procedures.",
      "The regulatory framework mandates that all KYC documentation must be updated every 24 months for standard customers and every 12 months for high-risk clients. Digital verification methods are accepted, but must include liveness detection and document authenticity verification through approved third-party services."
    ];

    const finalMessage: Message = {
      id: Date.now().toString() + '_final',
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      sources: mockSources,
    };

    // Remove processing message and add final response
    setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id).concat(finalMessage));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      await simulateRAGPipeline(inputMessage);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        type: 'system',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Powered by IBM Watson Discovery, watsonx.ai Granite & AWS Titan
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type !== 'user' && (
                <div className={`p-2 rounded-lg ${
                  message.type === 'ai' ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  {message.type === 'ai' ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              )}
              
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-first' : ''}`}>
                <Card className={`${
                  message.type === 'user' 
                    ? 'bg-user-background border-user-border' 
                    : message.type === 'ai'
                    ? 'bg-ai-background border-ai-border'
                    : 'bg-muted'
                }`}>
                  <CardContent className="p-4">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    
                    {/* Processing Steps */}
                    {message.processingSteps && (
                      <div className="mt-4 space-y-2">
                        {message.processingSteps.map((step, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            {getStepIcon(step.status)}
                            <span className="flex-1">{step.step}</span>
                            <Badge variant="outline" className="text-xs">
                              {step.service}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Sources */}
                    {message.sources && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                        {message.sources.map((source, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 rounded p-2">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium">{source.name}</span>
                              {source.page && (
                                <span className="text-xs text-muted-foreground">
                                  (Page {source.page})
                                </span>
                              )}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(source.confidence * 100)}% match
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {message.type === 'user' && (
                <div className="p-2 rounded-lg bg-secondary">
                  <User className="h-5 w-5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="flex space-x-2 max-w-4xl mx-auto">
          <Input
            placeholder="Ask me anything about your KYC documents..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isProcessing}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isProcessing}
            className="shadow-primary"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;