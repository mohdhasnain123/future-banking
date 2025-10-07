import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  User2, 
  Users, 
  Calendar, 
  TrendingUp, 
  Brain, 
  Heart, 
  User, 
  Shield, 
  Activity, 
  MonitorSpeaker,
  Network
} from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: string;
  color: string;
  description: string;
  x: number;
  y: number;
  connections: string[];
}

const AgenticMeshDiagram = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const agents: AgentNode[] = [
    // Central Agent
    {
      id: 'central',
      name: 'Agent Hub',
      icon: Network,
      category: 'Core',
      color: 'hsl(var(--foreground))',
      description: 'Central coordination hub for all AI agents',
      x: 50,
      y: 50,
      connections: ['doctor', 'nurse', 'coordinator', 'appointment', 'resource', 'patient', 'virtual', 'referral', 'family', 'population']
    },
    // Clinical Agents (Blue - Top)
    {
      id: 'doctor',
      name: 'Doctor Agent',
      icon: Stethoscope,
      category: 'Clinical',
      color: 'hsl(var(--primary))',
      description: 'AI-powered diagnostic and treatment support',
      x: 25,
      y: 20,
      connections: ['central', 'nurse', 'patient']
    },
    {
      id: 'nurse',
      name: 'Nursing Agent',
      icon: User2,
      category: 'Clinical',
      color: 'hsl(var(--primary))',
      description: 'Patient care monitoring and support',
      x: 10,
      y: 40,
      connections: ['central', 'doctor', 'patient']
    },
    {
      id: 'virtual',
      name: 'Virtual Health',
      icon: MonitorSpeaker,
      category: 'Clinical', 
      color: 'hsl(var(--primary))',
      description: 'Telemedicine and remote care coordination',
      x: 10,
      y: 60,
      connections: ['central', 'patient', 'family']
    },
    // Operational Agents (Orange - Right)
    {
      id: 'coordinator',
      name: 'Coordinator Agent',
      icon: Users,
      category: 'Operational',
      color: 'hsl(var(--accent))',
      description: 'Healthcare team coordination and workflow',
      x: 50,
      y: 15,
      connections: ['central', 'appointment', 'resource']
    },
    {
      id: 'appointment',
      name: 'Appointment Agent',
      icon: Calendar,
      category: 'Operational',
      color: 'hsl(var(--accent))',
      description: 'Scheduling and appointment management',
      x: 75,
      y: 25,
      connections: ['central', 'coordinator', 'patient']
    },
    {
      id: 'resource',
      name: 'Resource Agent',
      icon: TrendingUp,
      category: 'Operational',
      color: 'hsl(var(--accent))',
      description: 'Resource allocation and optimization',
      x: 90,
      y: 40,
      connections: ['central', 'coordinator', 'appointment']
    },
    {
      id: 'allocation',
      name: 'Resource Allocation',
      icon: Activity,
      category: 'Operational',
      color: 'hsl(var(--accent))',
      description: 'Dynamic resource and capacity planning',
      x: 90,
      y: 60,
      connections: ['central', 'resource']
    },
    // Patient Agents (Green - Bottom)
    {
      id: 'patient',
      name: 'Patient Agent',
      icon: User,
      category: 'Patient',
      color: 'hsl(var(--success))',
      description: 'Personalized patient care and communication',
      x: 50,
      y: 85,
      connections: ['central', 'doctor', 'family', 'virtual']
    },
    {
      id: 'family',
      name: 'Family Care Agent',
      icon: Heart,
      category: 'Patient',
      color: 'hsl(var(--success))',
      description: 'Family communication and care coordination',
      x: 75,
      y: 75,
      connections: ['central', 'patient', 'virtual']
    },
    // System Agents (Purple - Left)
    {
      id: 'referral',
      name: 'Referral Agent',
      icon: Brain,
      category: 'System',
      color: 'hsl(var(--secondary))',
      description: 'Specialist referrals and care transitions',
      x: 25,
      y: 75,
      connections: ['central', 'doctor', 'appointment']
    },
    {
      id: 'population',
      name: 'Population Health Agent',
      icon: Shield,
      category: 'System',
      color: 'hsl(var(--secondary))',
      description: 'Population health monitoring and analytics',
      x: 90,
      y: 80,
      connections: ['central', 'patient', 'family']
    }
  ];

  const categoryColors = {
    'Clinical': 'hsl(var(--primary))',
    'Operational': 'hsl(var(--accent))',
    'Patient': 'hsl(var(--success))',
    'System': 'hsl(var(--secondary))',
    'Core': 'hsl(var(--foreground))'
  };

  const getConnectionOpacity = (agentId: string) => {
    if (!selectedAgent) return 0.2;
    return selectedAgent === agentId || agents.find(a => a.id === selectedAgent)?.connections.includes(agentId) ? 0.6 : 0.1;
  };

  const getAgentOpacity = (agentId: string) => {
    if (!selectedAgent) return 1;
    return selectedAgent === agentId || agents.find(a => a.id === selectedAgent)?.connections.includes(agentId) ? 1 : 0.3;
  };

  return (
    <div className="w-full space-y-4">
      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: color }}
            />
            <span className="text-foreground font-medium">{category.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Main Diagram */}
      <div className="relative w-full h-[600px] bg-gradient-to-br from-background to-background/50 rounded-xl border border-border overflow-hidden">
        <svg className="w-full h-full">
          {/* Connection Lines */}
          {agents.map(agent => 
            agent.connections.map(connectionId => {
              const connectedAgent = agents.find(a => a.id === connectionId);
              if (!connectedAgent) return null;
              
              return (
                <line
                  key={`${agent.id}-${connectionId}`}
                  x1={`${agent.x}%`}
                  y1={`${agent.y}%`}
                  x2={`${connectedAgent.x}%`}
                  y2={`${connectedAgent.y}%`}
                  stroke={agent.color}
                  strokeWidth="2"
                  opacity={getConnectionOpacity(agent.id)}
                  className="transition-all duration-300"
                  strokeDasharray={animationPhase % 2 === 0 ? "5,5" : "10,2"}
                />
              );
            })
          )}

          {/* Agent Nodes */}
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            const isSelected = selectedAgent === agent.id;
            const isConnected = selectedAgent && agents.find(a => a.id === selectedAgent)?.connections.includes(agent.id);
            
            return (
              <g key={agent.id}>
                {/* Glow effect for selected/connected agents */}
                {(isSelected || isConnected) && (
                  <circle
                    cx={`${agent.x}%`}
                    cy={`${agent.y}%`}
                    r="35"
                    fill={agent.color}
                    opacity="0.2"
                    className="animate-pulse"
                  />
                )}
                
                {/* Agent Circle */}
                <circle
                  cx={`${agent.x}%`}
                  cy={`${agent.y}%`}
                  r={agent.id === 'central' ? "25" : "20"}
                  fill={agent.color}
                  opacity={getAgentOpacity(agent.id)}
                  className="cursor-pointer transition-all duration-300 hover:r-25"
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 10px currentColor)' : 'none',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    transformOrigin: `${agent.x}% ${agent.y}%`
                  }}
                />
                
                {/* Agent Icon */}
                <foreignObject
                  x={`calc(${agent.x}% - 12px)`}
                  y={`calc(${agent.y}% - 12px)`}
                  width="24"
                  height="24"
                  className="pointer-events-none"
                >
                  <IconComponent 
                    className="w-6 h-6 text-white" 
                    style={{ opacity: getAgentOpacity(agent.id) }}
                  />
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Agent Labels */}
        {agents.map((agent) => (
          <div
            key={`label-${agent.id}`}
            className="absolute text-xs font-medium text-foreground text-center pointer-events-none transition-opacity duration-300"
            style={{
              left: `calc(${agent.x}% - 40px)`,
              top: `calc(${agent.y}% + 30px)`,
              width: '80px',
              opacity: getAgentOpacity(agent.id)
            }}
          >
            {agent.name}
          </div>
        ))}

        {/* Selected Agent Info Panel */}
        {selectedAgent && (
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 max-w-xs shadow-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: agents.find(a => a.id === selectedAgent)?.color }}
                />
                <h3 className="font-semibold text-foreground">
                  {agents.find(a => a.id === selectedAgent)?.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {agents.find(a => a.id === selectedAgent)?.description}
              </p>
              <div className="text-xs">
                <span className="text-muted-foreground">Category: </span>
                <span className="font-medium text-foreground">
                  {agents.find(a => a.id === selectedAgent)?.category}
                </span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Connections: </span>
                <span className="font-medium text-foreground">
                  {agents.find(a => a.id === selectedAgent)?.connections.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Click on any agent node to explore its connections and details
        </p>
      </div>
    </div>
  );
};

export default AgenticMeshDiagram;