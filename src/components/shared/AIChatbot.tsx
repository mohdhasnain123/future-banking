import { useState } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI medical assistant. I can help you with patient information, hospital operations, and clinical decision support. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses = {
    'patient': 'I can help you find patient information, medical records, or schedule appointments. What specific patient details do you need?',
    'bed': 'Current bed utilization is at 87%. ICU has 2 beds available, General Ward has 15 beds available. Would you like detailed department breakdown?',
    'staff': 'Staff optimization is at 94%. 87 staff members are currently active with 12 on-call. Emergency department is at optimal capacity.',
    'critical': 'There are currently 1 critical alerts requiring immediate attention.',
    'appointment': 'Next appointment is Dr. Smith at 9:00 AM. There are 47 total appointments scheduled today. Would you like to view the full schedule?',
    'medication': 'I can assist with medication interactions, dosage calculations, or prescription management. What medication information do you need?',
    'lab': 'Latest lab results show 156 pending tests, 89 completed today. Critical values flagged for 3 patients requiring immediate review.',
    'discharge': 'Discharge planning is available for 12 patients. Average length of stay is currently 4.2 days. Would you like the discharge readiness report?'
  };

  const getAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowercaseMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses for common queries
    if (lowercaseMessage.includes('help')) {
      return 'I can assist with: Patient records, Bed management, Staff scheduling, Critical alerts, Appointments, Medications, Lab results, and Discharge planning. What would you like to know about?';
    }
    
    if (lowercaseMessage.includes('thank')) {
      return 'You\'re welcome! I\'m here 24/7 to assist with any medical or operational questions.';
    }
    
    return 'I understand you\'re asking about "' + userMessage + '". Could you provide more specific details? I can help with patient care, hospital operations, clinical decisions, and administrative tasks.';
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-gradient-card border-border shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Bot className="h-5 w-5 text-primary" />
              <span>AI Medical Assistant</span>
              <div className="ml-auto w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isUser && <Bot className="h-4 w-4 mt-0.5 text-primary" />}
                        {message.isUser && <User className="h-4 w-4 mt-0.5" />}
                        <div className="text-sm">{message.content}</div>
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about patients, beds, staff..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-1 mt-2">
                {['Patient Info', 'Bed Status', 'Critical Alerts', 'Staff Status'].map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6"
                    onClick={() => setInputMessage(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;