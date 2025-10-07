import { ArrowLeft, UserCheck, Stethoscope, Clock, Star, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EmergencyDoctorsProps {
  onBack: () => void;
}

const EmergencyDoctors = ({ onBack }: EmergencyDoctorsProps) => {
  const emergencyDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      specialty: "Orthopedic Surgery",
      status: "Available",
      location: "OR 3",
      experience: "15 years",
      rating: 4.9,
      responseTime: "< 2 min",
      currentCases: 0
    },
    {
      id: "2", 
      name: "Dr. Marcus Rodriguez",
      specialty: "Emergency Medicine",
      status: "Available",
      location: "ER Bay 2",
      experience: "12 years",
      rating: 4.8,
      responseTime: "< 1 min",
      currentCases: 1
    },
    {
      id: "3",
      name: "Dr. Jennifer Kim",
      specialty: "Trauma Surgery",
      status: "In Surgery",
      location: "OR 1",
      experience: "18 years",
      rating: 4.9,
      responseTime: "~ 15 min",
      currentCases: 2
    },
    {
      id: "4",
      name: "Dr. Ahmed Hassan",
      specialty: "Neurology",
      status: "Available",
      location: "Neuro Wing",
      experience: "10 years", 
      rating: 4.7,
      responseTime: "< 3 min",
      currentCases: 0
    },
    {
      id: "5",
      name: "Dr. Lisa Thompson",
      specialty: "Cardiac Surgery",
      status: "On Call",
      location: "Home",
      experience: "20 years",
      rating: 4.9,
      responseTime: "~ 10 min",
      currentCases: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-success-foreground text-black";
      case "In Surgery":
        return "bg-warning text-warning-foreground text-black";
      case "On Call":
        return "bg-warning text-info-foreground text-black";
      default:
        return "bg-muted text-muted-foreground text-black";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onBack}
          className="border-border hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Emergency Doctors</h2>
          <p className="text-muted-foreground">Available medical specialists for emergency cases</p>
        </div>
      </div>

      <div className="grid gap-4">
        {emergencyDoctors.map((doctor) => (
          <Card key={doctor.id} className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2">
                    <AvatarImage src="/placeholder.svg" alt={doctor.name} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                      <Badge className={getStatusColor(doctor.status)}>
                        {doctor.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">{doctor.specialty}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-foreground">{doctor.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-foreground">Response: {doctor.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-primary" />
                        <span className="text-foreground">Cases: {doctor.currentCases}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      Location: {doctor.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="default"
                    size="sm"
                    className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                    disabled={doctor.status === "In Surgery"}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-muted"
                    disabled={doctor.status === "In Surgery"}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyDoctors;