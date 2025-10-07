import { ArrowLeft, Calendar, Clock, User, MapPin, Phone, Video, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UpcomingAppointmentsProps {
  onBack: () => void;
}

const UpcomingAppointments = ({ onBack }: UpcomingAppointmentsProps) => {
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      doctorName: "Dr. Emily Smith",
      specialty: "Cardiology",
      time: "9:00 AM",
      date: "Today",
      type: "In-Person",
      room: "Room 205",
      status: "confirmed",
      urgency: "routine",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      doctorName: "Dr. Robert Wilson",
      specialty: "Orthopedics",
      time: "10:30 AM",
      date: "Today",
      type: "Video Call",
      room: "Virtual Room 3",
      status: "waiting",
      urgency: "urgent",
      phone: "+1 (555) 987-6543"
    },
    {
      id: 3,
      patientName: "Emma Davis",
      doctorName: "Dr. Lisa Martinez",
      specialty: "Neurology",
      time: "2:15 PM",
      date: "Today",
      type: "In-Person",
      room: "Room 312",
      status: "confirmed",
      urgency: "routine",
      phone: "+1 (555) 456-7890"
    },
    {
      id: 4,
      patientName: "James Wilson",
      doctorName: "Dr. David Thompson",
      specialty: "Emergency Medicine",
      time: "3:45 PM",
      date: "Today",
      type: "In-Person",
      room: "ER Bay 2",
      status: "critical",
      urgency: "critical",
      phone: "+1 (555) 321-9876"
    },
    {
      id: 5,
      patientName: "Maria Rodriguez",
      doctorName: "Dr. Jennifer Lee",
      specialty: "Pediatrics",
      time: "11:00 AM",
      date: "Tomorrow",
      type: "In-Person",
      room: "Room 108",
      status: "confirmed",
      urgency: "routine",
      phone: "+1 (555) 654-3210"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-black';
      case 'waiting': return 'bg-warning text-black';
      case 'critical': return 'bg-destructive text-black';
      default: return 'bg-muted text-foreground';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    return urgency === 'critical' ? <AlertCircle className="h-4 w-4 text-destructive" /> : null;
  };

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
        <h1 className="text-3xl font-bold text-foreground">Upcoming Appointments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">47</div>
            <div className="text-sm text-muted-foreground">Total Appointments</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Waiting Patients</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Video className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-sm text-muted-foreground">Virtual Appointments</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getUrgencyIcon(appointment.urgency)}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{appointment.patientName}</h3>
                    <p className="text-sm text-muted-foreground">with {appointment.doctorName}</p>
                    <p className="text-sm text-accent">{appointment.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{appointment.date}</div>
                    <div className="text-lg font-bold text-primary">{appointment.time}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      {appointment.type === 'Video Call' ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                      {appointment.room}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      {appointment.phone}
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;