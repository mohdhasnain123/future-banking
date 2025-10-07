import { Calendar, FileText, AlertTriangle, Bed, Users, Activity, Brain, Stethoscope, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const QuickStats = () => {
  const [stats, setStats] = useState([
    {
      title: "Upcoming Appointments",
      value: "47",
      change: "",
      icon: Calendar,
      color: "bg-gradient-primary",
      isClickable: true,
      action: "appointments"
    },
    {
      title: "Active Treatments",
      value: "156",
      change: "12 critical, 89 stable, 55 recovering",
      icon: FileText,
      color: "bg-gradient-secondary",
      isClickable: true,
      action: "treatments"
    },
    // {
    //   title: "Emergency Doctors",
    //   value: "8",
    //   change: "Available for emergency cases",
    //   icon: Users,
    //   color: "bg-destructive",
    //   isClickable: true,
    //   action: "emergencyDoctors"
    // },
    {
      title: "Bed Utilization",
      value: "87%",
      change: "234/268 beds • 12 ICU available",
      icon: Bed,
      color: "bg-gradient-accent",
      isClickable: true,
      action: "beds"
    },
    {
      title: "Staff Optimization",
      value: "94%",
      change: "87 active, 12 on-call",
      icon: Users,
      color: "bg-success",
      isClickable: true,
      action: "staff"
    },
    // {
    //   title: "AI Agent Status",
    //   value: "Online",
    //   change: "Ready to assist",
    //   icon: Brain,
    //   color: "bg-gradient-primary",
    //   isClickable: true,
    //   action: "aiAgent"
    // },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => {
        const baseValues = {
          "Upcoming Appointments": { base: 47, range: 10 },
          "Active Treatments": { base: 156, range: 15 },
          "Emergency Doctors": { base: 8, range: 4 },
          "Bed Utilization": { base: 87, range: 8 },
          "Staff Optimization": { base: 94, range: 6 }
        };
        
        const config = baseValues[stat.title as keyof typeof baseValues];
        if (!config) return stat;
        
        const variation = Math.floor(Math.random() * config.range) - Math.floor(config.range / 2);
        const newValue = Math.max(0, config.base + variation);
        
        let displayValue = newValue.toString();
        if (stat.title.includes("Utilization") || stat.title.includes("Optimization")) {
          displayValue = Math.min(100, newValue) + "%";
        }
        
        return {
          ...stat,
          value: displayValue
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (stat: any) => {
    if (stat.isClickable) {
      switch (stat.action) {
        case 'emergencyDoctors':
          const emergencyEvent = new CustomEvent('showEmergencyDoctors');
          window.dispatchEvent(emergencyEvent);
          break;
        case 'appointments':
          const appointmentsEvent = new CustomEvent('showAppointments');
          window.dispatchEvent(appointmentsEvent);
          break;
        case 'treatments':
          const treatmentsEvent = new CustomEvent('showTreatments');
          window.dispatchEvent(treatmentsEvent);
          break;
        case 'beds':
          const bedsEvent = new CustomEvent('showBedUtilization');
          window.dispatchEvent(bedsEvent);
          break;
        case 'staff':
          const staffEvent = new CustomEvent('showStaffOptimization');
          window.dispatchEvent(staffEvent);
          break;
        case 'aiAgent':
          const aiEvent = new CustomEvent('showAIAgent');
          window.dispatchEvent(aiEvent);
          break;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card 
            key={index} 
            className={`bg-gradient-card border-border shadow-md hover:shadow-lg transition-shadow ${stat.isClickable ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
            onClick={() => handleCardClick(stat)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white shadow-sm`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;