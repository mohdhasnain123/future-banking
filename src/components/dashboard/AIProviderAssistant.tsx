import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, MicOff, Brain, MessageSquare, Volume2 } from "lucide-react";

interface AIProviderAssistantProps {
  onBack: () => void;
}

const AIProviderAssistant = ({ onBack }: AIProviderAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: "user",
      message: "Show me cardiac specialists available now",
      timestamp: "2 min ago"
    },
    {
      id: 2,
      type: "ai",
      message: "I found 4 cardiac specialists currently available. Dr. Sarah Mitchell (Interventional Cardiology) is free until 3 PM, Dr. James Rodriguez (Electrophysiology) has a 30-min slot at 2:15 PM...",
      timestamp: "2 min ago"
    }
  ]);

  const quickActions = [
    { title: "Schedule Emergency Surgery", command: "Book OR for cardiac emergency" },
    { title: "Find Specialist", command: "Show available cardiologists" },
    { title: "Patient Status", command: "Update on Bob Smith" },
    { title: "Resource Check", command: "ICU bed availability" }
  ];

  const aiCapabilities = [
    { name: "Voice Navigation", status: "Active", description: "Natural language commands" },
    { name: "Quantum Scheduling", status: "Online", description: "AI-optimized resource allocation" },
    { name: "Blockchain Access", status: "Secure", description: "Patient record retrieval" },
    { name: "Emergency Response", status: "Standby", description: "Critical alert management" }
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentQuery("Show me Bob Smith's current vitals");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleQuickAction = (command: string) => {
    setCurrentQuery(command);
    // Simulate AI response
    const newConversation = [
      ...conversations,
      {
        id: conversations.length + 1,
        type: "user" as const,
        message: command,
        timestamp: "now"
      },
      {
        id: conversations.length + 2,
        type: "ai" as const,
        message: `Processing your request: "${command}". I'll provide the most current information available.`,
        timestamp: "now"
      }
    ];
    setConversations(newConversation);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span>Provider AI Assistant</span>
            </h1>
            <p className="text-muted-foreground">Voice-activated healthcare management</p>
          </div>
        </div>
        <Badge className="bg-success text-black">Online & Ready</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Interface */}
        <Card className="lg:col-span-2 bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>AI Conversation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Conversation History */}
            <div className="h-80 overflow-y-auto mb-4 space-y-3 p-4 bg-muted rounded-lg">
              {conversations.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Controls */}
            <div className="flex items-center space-x-2">
              <Input
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                placeholder="Ask AI assistant or use voice command..."
                className="flex-1"
              />
              <Button
                size="icon"
                variant={isListening ? "destructive" : "default"}
                onClick={handleVoiceToggle}
                className="shrink-0"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button size="icon" variant="outline">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            {isListening && (
              <div className="mt-2 p-2 bg-destructive/10 rounded-lg">
                <p className="text-sm text-destructive font-medium">🎤 Listening... Speak your command</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Capabilities & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleQuickAction(action.command)}
                >
                  <div>
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.command}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI System Status */}
          <Card className="bg-gradient-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground">AI System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <div className="font-medium text-foreground">{capability.name}</div>
                    <div className="text-xs text-muted-foreground">{capability.description}</div>
                  </div>
                  <Badge className={`text-xs ${
                    capability.status === 'Active' || capability.status === 'Online' ? 'bg-success' :
                    capability.status === 'Secure' ? 'bg-primary' : 'bg-warning'
                  } text-black`}>
                    {capability.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIProviderAssistant;