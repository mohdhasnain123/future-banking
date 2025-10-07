import { ArrowLeft, Bed, Users, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface BedUtilizationProps {
  onBack: () => void;
}

const BedUtilization = ({ onBack }: BedUtilizationProps) => {
  const departmentData = [
    { name: "ICU", total: 20, occupied: 18, available: 2, utilization: 90, status: "critical" },
    { name: "Emergency", total: 25, occupied: 22, available: 3, utilization: 88, status: "high" },
    { name: "General Ward", total: 80, occupied: 65, available: 15, utilization: 81, status: "optimal" },
    { name: "Cardiology", total: 30, occupied: 26, available: 4, utilization: 87, status: "high" },
    { name: "Orthopedics", total: 35, occupied: 28, available: 7, utilization: 80, status: "optimal" },
    { name: "Pediatrics", total: 25, occupied: 18, available: 7, utilization: 72, status: "optimal" },
    { name: "Maternity", total: 20, occupied: 15, available: 5, utilization: 75, status: "optimal" },
    { name: "Surgery Recovery", total: 33, occupied: 30, available: 3, utilization: 91, status: "critical" }
  ];

  const utilizationTrends = [
    { hour: "00:00", utilization: 78 },
    { hour: "04:00", utilization: 72 },
    { hour: "08:00", utilization: 85 },
    { hour: "12:00", utilization: 89 },
    { hour: "16:00", utilization: 92 },
    { hour: "20:00", utilization: 87 },
    { hour: "Now", utilization: 87 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-black';
      case 'high': return 'bg-warning text-black';
      case 'optimal': return 'bg-success text-black';
      default: return 'bg-muted text-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Clock className="h-4 w-4" />;
      case 'optimal': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const totalBeds = departmentData.reduce((sum, dept) => sum + dept.total, 0);
  const totalOccupied = departmentData.reduce((sum, dept) => sum + dept.occupied, 0);
  const totalAvailable = totalBeds - totalOccupied;
  const overallUtilization = Math.round((totalOccupied / totalBeds) * 100);

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
        <h1 className="text-3xl font-bold text-foreground">Bed Utilization Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Bed className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalBeds}</div>
            <div className="text-sm text-muted-foreground">Total Beds</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalOccupied}</div>
            <div className="text-sm text-muted-foreground">Occupied</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalAvailable}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{overallUtilization}%</div>
            <div className="text-sm text-muted-foreground">Utilization</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Bed className="h-5 w-5 text-primary" />
              <span>Department Bed Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(dept.status)}
                  <div>
                    <div className="font-medium text-foreground">{dept.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {dept.occupied}/{dept.total} beds • {dept.available} available
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{dept.utilization}%</div>
                    <Progress value={dept.utilization} className="w-16 h-2" />
                  </div>
                  <Badge className={getStatusColor(dept.status)}>
                    {dept.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Utilization Trends */}
        <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>24-Hour Utilization Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {utilizationTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded">
                  <div className="text-sm font-medium text-foreground">{trend.hour}</div>
                  <div className="flex items-center space-x-3">
                    <Progress value={trend.utilization} className="w-24 h-2" />
                    <div className="text-sm font-semibold text-foreground w-10">{trend.utilization}%</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Optimization Insights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Peak utilization occurs between 4-8 PM</li>
                <li>• ICU and Surgery Recovery need immediate attention</li>
                <li>• Pediatrics has optimal capacity for transfers</li>
                <li>• Consider discharge planning for General Ward</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BedUtilization;