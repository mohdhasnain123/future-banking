import { ArrowLeft, Activity, Clock, User, Heart, Brain, Bone, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ActiveTreatmentsProps {
  onBack: () => void;
}

const ActiveTreatments = ({ onBack }: ActiveTreatmentsProps) => {
  const treatments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      treatmentType: "Cardiac Rehabilitation",
      doctor: "Dr. Emily Smith",
      startDate: "2024-01-15",
      progress: 75,
      status: "stable",
      department: "Cardiology",
      nextSession: "Tomorrow 10:00 AM",
      icon: Heart,
      priority: "medium"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      treatmentType: "Post-Surgery Recovery",
      doctor: "Dr. Robert Wilson",
      startDate: "2024-01-20",
      progress: 60,
      status: "recovering",
      department: "Orthopedics",
      nextSession: "Today 2:00 PM",
      icon: Bone,
      priority: "high"
    },
    {
      id: 3,
      patientName: "Emma Davis",
      treatmentType: "Neurological Therapy",
      doctor: "Dr. Lisa Martinez",
      startDate: "2024-01-10",
      progress: 40,
      status: "critical",
      department: "Neurology",
      nextSession: "Today 4:30 PM",
      icon: Brain,
      priority: "critical"
    },
    {
      id: 4,
      patientName: "James Wilson",
      treatmentType: "Emergency Stabilization",
      doctor: "Dr. David Thompson",
      startDate: "2024-01-25",
      progress: 85,
      status: "stable",
      department: "Emergency",
      nextSession: "Ongoing",
      icon: Activity,
      priority: "critical"
    },
    {
      id: 5,
      patientName: "Maria Rodriguez",
      treatmentType: "Pediatric Care",
      doctor: "Dr. Jennifer Lee",
      startDate: "2024-01-18",
      progress: 90,
      status: "recovering",
      department: "Pediatrics",
      nextSession: "Friday 11:00 AM",
      icon: Heart,
      priority: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-success text-black';
      case 'recovering': return 'bg-warning text-black';
      case 'critical': return 'bg-destructive text-black';
      default: return 'bg-muted text-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'critical') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (priority === 'high') return <Clock className="h-4 w-4 text-warning" />;
    return <CheckCircle className="h-4 w-4 text-success" />;
  };

  const summaryStats = [
    { label: "Total Active", value: "156", color: "text-primary" },
    { label: "Critical", value: "12", color: "text-destructive" },
    { label: "Stable", value: "89", color: "text-success" },
    { label: "Recovering", value: "55", color: "text-warning" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Active Treatments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-border">
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {treatments.map((treatment) => {
          const IconComponent = treatment.icon;
          return (
            <Card key={treatment.id} className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getPriorityIcon(treatment.priority)}
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{treatment.patientName}</h3>
                      <p className="text-sm text-muted-foreground">{treatment.treatmentType}</p>
                      <p className="text-sm text-accent">{treatment.doctor} • {treatment.department}</p>
                      <p className="text-xs text-muted-foreground">Started: {treatment.startDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center min-w-[120px]">
                      <div className="text-sm text-muted-foreground mb-1">Progress</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={treatment.progress} className="w-16 h-2" />
                        <span className="text-sm font-medium text-foreground">{treatment.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Next Session</div>
                      <div className="text-sm font-medium text-foreground">{treatment.nextSession}</div>
                    </div>
                    
                    <Badge className={getStatusColor(treatment.status)}>
                      {treatment.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveTreatments;