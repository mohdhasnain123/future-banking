import { Bell, Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [notificationCount, setNotificationCount] = useState(1);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "alert-001",
      patientName: "Bob Smith",
      patientId: "PA-2035-08471",
      age: 68,
      condition: "Severe Knee Injury with Compartment Syndrome Risk",
      severity: "Critical",
      timeDetected: "4 minutes ago",
      riskScore: 89,
      location: "Downtown Fitness Center",
      vitals: {
        heartRate: "118 BPM",
        bloodPressure: "145/88",
        painLevel: "8/10"
      },
      status: "Active"
    }
  ]);
  const navigate = useNavigate();

  // Listen for reset notification count event from PatientAlert
  useEffect(() => {
    const handleAddPreAuthNotification = () => {
      // Add pre-auth approved notification
      const preAuthNotification = {
        id: "alert-002",
        patientName: "Bob Smith",
        patientId: "PA-2035-08471",
        age: 68,
        condition: "Pre-Authorization Approved",
        severity: "Info",
        timeDetected: "Just now",
        riskScore: 0,
        location: "Downtown Fitness Center",
        vitals: {
          heartRate: "N/A",
          bloodPressure: "N/A",
          painLevel: "N/A"
        },
        status: "Approved"
      };
      
      setNotifications(prev => [preAuthNotification, ...prev]);
      setNotificationCount(2); // Now we have 2 notifications
    };
    
    window.addEventListener('addPreAuthNotification', handleAddPreAuthNotification);
    return () => {
      window.removeEventListener('addPreAuthNotification', handleAddPreAuthNotification);
    };
  }, []);

  const handleNotificationClick = () => {
    // Don't reset count when opening modal - keep the current count
    setShowNotificationModal(true);
  };

  const handleAlertClick = () => {
    setShowNotificationModal(false);
    navigate('/emergency-alert');
  };

  return (
    <header className="bg-gradient-card border-b border-border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-primary text-primary-foreground p-3 rounded-lg shadow-glow">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Health Command Center</h1>
            <p className="text-muted-foreground">Quantum-Enhanced Healthcare Intelligence Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search patients, records..." 
              className="pl-10 w-64 bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className={`relative border-border hover:bg-muted ${notificationCount > 0 ? 'animate-pulse' : ''}`}
            onClick={handleNotificationClick}
          >
            <Bell className={`h-4 w-4 ${notificationCount > 0 ? 'animate-bounce' : ''}`} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </Button>
          
          <Avatar className="h-10 w-10 ring-2 ring-primary ring-offset-2">
            <AvatarImage src="/placeholder.svg" alt="Dr. Mira" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">DM</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <NotificationModal 
        open={showNotificationModal}
        onOpenChange={setShowNotificationModal}
        onAlertClick={handleAlertClick}
        notifications={notifications}
      />
    </header>
  );
};

export default DashboardHeader;