import { Bell, AlertTriangle, Clock, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAlertClick: () => void;
  notifications: any[];
}

const NotificationModal = ({ open, onOpenChange, onAlertClick, notifications }: NotificationModalProps) => {
  const handleEmergencyDetailsClick = () => {
    // Don't reset notification count - keep it as is
    onAlertClick();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-info text-info-foreground';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-card border-l border-border">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Emergency Notifications</span>
            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
              {notifications.length} Active
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Real-time alerts from AI patient monitoring system
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {notifications.map((alert) => (
            <Card key={alert.id} className="border-destructive/20 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
                    <span className="text-foreground">{alert.patientName}</span>
                  </CardTitle>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{alert.timeDetected}</span>
                  <span>•</span>
                  <span>Risk: {alert.riskScore}%</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Patient ID:</span>
                    <span className="font-medium text-foreground">{alert.patientId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium text-foreground">{alert.age} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-foreground">{alert.location}</span>
                  </div>
                </div>

                <div className="p-3 bg-background rounded-lg border border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Condition:</p>
                  <p className="text-sm text-muted-foreground">{alert.condition}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <Heart className="h-3 w-3 mx-auto mb-1 text-destructive" />
                    <div className="font-medium text-foreground">{alert.vitals?.heartRate || 'N/A'}</div>
                    <div className="text-muted-foreground">HR</div>
                  </div>
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <div className="font-medium text-foreground">{alert.vitals?.bloodPressure || 'N/A'}</div>
                    <div className="text-muted-foreground">BP</div>
                  </div>
                  <div className="p-2 bg-background rounded border border-border text-center">
                    <div className="font-medium text-foreground">{alert.vitals?.painLevel || 'N/A'}</div>
                    <div className="text-muted-foreground">Pain</div>
                  </div>
                </div>

                <Button 
                  onClick={handleEmergencyDetailsClick}
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  View Emergency Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-background rounded-lg border border-border">
          <p className="text-sm text-muted-foreground text-center">
            Powered by AI Patient Monitoring • Real-time Analytics
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationModal;