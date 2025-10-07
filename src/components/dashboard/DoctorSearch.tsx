import { Search, Filter, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DoctorSearch = () => {
  const recentDoctors = [
    {
      id: "DR-001",
      name: "Dr. Michael Rodriguez",
      specialty: "Neurologist",
      rating: 4.9,
      lastConsultation: "2 weeks ago",
      status: "Available Today",
      location: "Remote Available"
    },
    {
      id: "DR-002", 
      name: "Dr. Lisa Thompson",
      specialty: "Oncologist",
      rating: 4.8,
      lastConsultation: "1 month ago",
      status: "Next Available: Tomorrow",
      location: "In-Person Only"
    },
    {
      id: "DR-003",
      name: "Dr. Ahmad Hassan",
      specialty: "Cardiologist", 
      rating: 4.9,
      lastConsultation: "3 days ago",
      status: "Available Now",
      location: "Remote & In-Person"
    },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes("Available Now")) return "bg-success text-white";
    if (status.includes("Available Today")) return "bg-success text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="bg-gradient-card border-border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">Find Specialty Doctors</CardTitle>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            New Search
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by specialty, doctor name, condition..." 
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
          <Button variant="outline" className="border-border hover:bg-muted">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recentDoctors.map((doctor) => (
            <div 
              key={doctor.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold">
                  {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-accent font-medium">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground">{doctor.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Last: {doctor.lastConsultation}</p>
                </div>
                <Badge className={`${getStatusColor(doctor.status)} shadow-sm`}>
                  {doctor.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorSearch;