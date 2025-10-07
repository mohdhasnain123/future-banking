import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Bot, Zap, Target, Users, MessageSquare, TrendingUp, Activity, ArrowLeft, Network } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgenticMeshDiagram from "@/components/dashboard/AgenticMeshDiagram";

const AIAgentMatrix = () => {
  const navigate = useNavigate();
  const [agentStats, setAgentStats] = useState({
    totalAgents: 47,
    activeAgents: 43,
    totalInteractions: 12847,
    successRate: 94.80
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStats(prev => ({
        totalAgents: prev.totalAgents + Math.floor(Math.random() * 2),
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 3) - 1,
        totalInteractions: prev.totalInteractions + Math.floor(Math.random() * 10) + 5,
        successRate: parseFloat((Math.max(92, Math.min(98, prev.successRate + (Math.random() - 0.5) * 0.5))).toFixed(2))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const aiAgents = [
    { 
      name: "MedAssist Pro", 
      type: "Diagnostic Support", 
      status: "Active", 
      accuracy: 96.8, 
      interactions: 2847, 
      specialty: "Cardiology",
      icon: Brain,
      color: "text-red-500"
    },
    { 
      name: "TherapyBot", 
      type: "Treatment Planning", 
      status: "Active", 
      accuracy: 94.2, 
      interactions: 1932, 
      specialty: "Orthopedics",
      icon: Bot,
      color: "text-blue-500"
    },
    { 
      name: "DrugInteract AI", 
      type: "Medication Safety", 
      status: "Active", 
      accuracy: 98.1, 
      interactions: 3421, 
      specialty: "Pharmacy",
      icon: Zap,
      color: "text-green-500"
    },
    { 
      name: "SurgicalGuide", 
      type: "Surgical Planning", 
      status: "Training", 
      accuracy: 91.7, 
      interactions: 756, 
      specialty: "Surgery",
      icon: Target,
      color: "text-purple-500"
    }
  ];

  const performanceMetrics = [
    { metric: "Response Time", value: "0.23s", target: "<0.5s", status: "Excellent" },
    { metric: "Accuracy Rate", value: "94.8%", target: ">90%", status: "Excellent" },
    { metric: "Learning Rate", value: "12.3%", target: ">10%", status: "Good" },
    { metric: "Resource Usage", value: "67%", target: "<80%", status: "Optimal" }
  ];

  const agentCapabilities = [
    {
      capability: "Natural Language Processing",
      agents: 47,
      proficiency: 96.2,
      applications: ["Patient Communication", "Medical Record Analysis", "Report Generation"]
    },
    {
      capability: "Computer Vision",
      agents: 23,
      proficiency: 94.1,
      applications: ["Medical Imaging", "Wound Assessment", "Surgical Guidance"]
    },
    {
      capability: "Predictive Analytics",
      agents: 31,
      proficiency: 92.7,
      applications: ["Risk Assessment", "Outcome Prediction", "Resource Planning"]
    },
    {
      capability: "Decision Support",
      agents: 39,
      proficiency: 95.3,
      applications: ["Treatment Recommendations", "Diagnosis Assistance", "Care Protocols"]
    }
  ];

  const taskQueue = [
    { task: "Cardiac Risk Assessment - Patient #4829", priority: "High", agent: "MedAssist Pro", eta: "2 min" },
    { task: "Drug Interaction Check - Prescription #7421", priority: "Medium", agent: "DrugInteract AI", eta: "1 min" },
    { task: "Orthopedic Treatment Plan - Patient #3847", priority: "High", agent: "TherapyBot", eta: "4 min" },
    { task: "Surgical Schedule Optimization", priority: "Low", agent: "SurgicalGuide", eta: "15 min" }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Agent Matrix</h1>
          <p className="text-muted-foreground">Comprehensive AI agent performance and management dashboard</p>
        </div>
        <Badge className="bg-primary text-black">
          {agentStats.activeAgents}/{agentStats.totalAgents} Active
        </Badge>
      </div>

      {/* Agent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Total Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{agentStats.totalAgents}</div>
            <Badge className="bg-primary text-black mt-2">+4 this month</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{agentStats.activeAgents}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {((agentStats.activeAgents / agentStats.totalAgents) * 100).toFixed(1)}% uptime
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Total Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{agentStats.totalInteractions.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">+127 today</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{agentStats.successRate.toFixed(2)}%</div>
            <div className="text-sm text-muted-foreground mt-1">Above target</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Agent Status */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Agent Status & Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAgents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <agent.icon className={`h-5 w-5 ${agent.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{agent.type} • {agent.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{agent.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{agent.interactions}</div>
                    <div className="text-xs text-muted-foreground">Interactions</div>
                  </div>
                  <Badge className={
                    agent.status === "Active" ? "bg-success text-black" :
                    agent.status === "Training" ? "bg-warning text-black" :
                    "bg-muted text-foreground"
                  }>
                    {agent.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{metric.metric}</h4>
                  <Badge className={
                    metric.status === "Excellent" ? "bg-success text-black" :
                    metric.status === "Good" ? "bg-primary text-black" :
                    "bg-warning text-black"
                  }>
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">Target: {metric.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Capabilities */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Agent Capabilities & Applications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {agentCapabilities.map((capability, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{capability.capability}</h4>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-muted-foreground">{capability.agents} agents</div>
                    <Badge className="bg-primary text-black">{capability.proficiency}%</Badge>
                  </div>
                </div>
                <Progress value={capability.proficiency} className="h-2 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {capability.applications.map((app, appIndex) => (
                    <Badge key={appIndex} variant="outline" className="text-xs">
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Task Queue */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Current Task Queue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskQueue.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === "High" ? "bg-destructive animate-pulse" :
                    task.priority === "Medium" ? "bg-warning" : "bg-success"
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-foreground">{task.task}</h4>
                    <p className="text-sm text-muted-foreground">Assigned to: {task.agent}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">ETA: {task.eta}</div>
                    <Badge className={
                      task.priority === "High" ? "bg-destructive text-black" :
                      task.priority === "Medium" ? "bg-warning text-black" :
                      "bg-success text-black"
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agentic Mesh Diagram */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-primary" />
            <span>Agentic Mesh Network</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Interactive visualization of AI agent interconnections and collaborative workflows
          </p>
        </CardHeader>
        <CardContent>
          <AgenticMeshDiagram />
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentMatrix;