import { ArrowLeft, Users, UserCheck, Clock, Activity, Stethoscope, Heart, Brain, Bone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StaffOptimizationProps {
  onBack: () => void;
}

const StaffOptimization = ({ onBack }: StaffOptimizationProps) => {
  const staffByDepartment = [
    {
      department: "Emergency",
      doctors: { total: 8, active: 6, onCall: 2, utilization: 95 },
      nurses: { total: 24, active: 20, onCall: 4, utilization: 88 },
      status: "optimal"
    },
    {
      department: "ICU",
      doctors: { total: 6, active: 5, onCall: 1, utilization: 92 },
      nurses: { total: 18, active: 16, onCall: 2, utilization: 94 },
      status: "high"
    },
    {
      department: "Cardiology",
      doctors: { total: 10, active: 8, onCall: 2, utilization: 85 },
      nurses: { total: 15, active: 12, onCall: 3, utilization: 86 },
      status: "optimal"
    },
    {
      department: "Orthopedics",
      doctors: { total: 8, active: 6, onCall: 2, utilization: 78 },
      nurses: { total: 12, active: 9, onCall: 3, utilization: 82 },
      status: "optimal"
    },
    {
      department: "Neurology",
      doctors: { total: 7, active: 6, onCall: 1, utilization: 89 },
      nurses: { total: 14, active: 11, onCall: 3, utilization: 85 },
      status: "optimal"
    },
    {
      department: "Pediatrics",
      doctors: { total: 9, active: 7, onCall: 2, utilization: 81 },
      nurses: { total: 16, active: 13, onCall: 3, utilization: 84 },
      status: "optimal"
    }
  ];

  const shiftPatterns = [
    { shift: "Morning (6AM-2PM)", doctors: 28, nurses: 45, efficiency: 92 },
    { shift: "Afternoon (2PM-10PM)", doctors: 24, nurses: 38, efficiency: 88 },
    { shift: "Night (10PM-6AM)", doctors: 15, nurses: 25, efficiency: 85 }
  ];

  const specialistAvailability = [
    { specialty: "Cardiologist", available: 8, busy: 2, icon: Heart, color: "text-red-500" },
    { specialty: "Neurologist", available: 6, busy: 1, icon: Brain, color: "text-purple-500" },
    { specialty: "Orthopedic Surgeon", available: 6, busy: 2, icon: Bone, color: "text-blue-500" },
    { specialty: "Emergency Physician", available: 6, busy: 2, icon: Activity, color: "text-orange-500" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-black';
      case 'high': return 'bg-warning text-black';
      case 'optimal': return 'bg-success text-black';
      default: return 'bg-muted text-foreground';
    }
  };

  const totalDoctors = staffByDepartment.reduce((sum, dept) => sum + dept.doctors.total, 0);
  const activeDoctors = staffByDepartment.reduce((sum, dept) => sum + dept.doctors.active, 0);
  const totalNurses = staffByDepartment.reduce((sum, dept) => sum + dept.nurses.total, 0);
  const activeNurses = staffByDepartment.reduce((sum, dept) => sum + dept.nurses.active, 0);
  const overallUtilization = Math.round(((activeDoctors + activeNurses) / (totalDoctors + totalNurses)) * 100);

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
        <h1 className="text-3xl font-bold text-foreground">Staff Optimization Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Stethoscope className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{activeDoctors}/{totalDoctors}</div>
            <div className="text-sm text-muted-foreground">Active Doctors</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <UserCheck className="h-6 w-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{activeNurses}/{totalNurses}</div>
            <div className="text-sm text-muted-foreground">Active Nurses</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalDoctors + totalNurses - activeDoctors - activeNurses}</div>
            <div className="text-sm text-muted-foreground">On-Call Staff</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{overallUtilization}%</div>
            <div className="text-sm text-muted-foreground">Overall Utilization</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Staff Breakdown */}
        <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span>Department Staff Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {staffByDepartment.map((dept, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{dept.department}</h4>
                  <Badge className={getStatusColor(dept.status)}>
                    {dept.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Doctors</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {dept.doctors.active}/{dept.doctors.total}
                      </span>
                      <Progress value={dept.doctors.utilization} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">{dept.doctors.utilization}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Nurses</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {dept.nurses.active}/{dept.nurses.total}
                      </span>
                      <Progress value={dept.nurses.utilization} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">{dept.nurses.utilization}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Shift Patterns and Specialist Availability */}
        <div className="space-y-6">
          {/* Shift Patterns */}
          <Card className="bg-gradient-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Shift Patterns</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {shiftPatterns.map((shift, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{shift.shift}</div>
                    <div className="text-sm text-muted-foreground">
                      {shift.doctors} doctors • {shift.nurses} nurses
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={shift.efficiency} className="w-16 h-2" />
                    <span className="text-sm font-semibold text-foreground">{shift.efficiency}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Specialist Availability */}
          <Card className="bg-gradient-card border-border shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                <span>Specialist Availability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {specialistAvailability.map((specialist, index) => {
                const IconComponent = specialist.icon;
                const total = specialist.available + specialist.busy;
                const availability = Math.round((specialist.available / total) * 100);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`h-5 w-5 ${specialist.color}`} />
                      <div>
                        <div className="font-medium text-foreground">{specialist.specialty}</div>
                        <div className="text-sm text-muted-foreground">
                          {specialist.available} available • {specialist.busy} busy
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={availability} className="w-16 h-2" />
                      <span className="text-sm font-semibold text-foreground">{availability}%</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffOptimization;