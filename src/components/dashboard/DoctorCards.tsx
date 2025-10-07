import { Star, MapPin, Clock, Video, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DoctorCards = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Michael Rodriguez",
      specialty: "Neurologist", 
      rating: 4.9,
      availability: "Available Now",
      location: "Remote",
      languages: ["English", "Spanish"],
      isAiRecommended: true,
      consultationFee: "$150",
      experience: "15+ years",
    },
    {
      id: 2,
      name: "Dr. Lisa Thompson", 
      specialty: "Oncologist",
      rating: 4.8,
      availability: "Next: 2:30 PM",
      location: "In-Person",
      languages: ["English", "French"],
      isAiRecommended: false,
      consultationFee: "$200",
      experience: "12+ years",
    },
    {
      id: 3,
      name: "Dr. Ahmad Hassan",
      specialty: "Cardiologist",
      rating: 4.9,
      availability: "Available Now",
      location: "Remote",
      languages: ["English", "Arabic"],
      isAiRecommended: true, 
      consultationFee: "$175",
      experience: "20+ years",
    },
  ];

  return (
    <Card className="bg-gradient-card border-border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">Specialty Doctor Selection</CardTitle>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm text-accent font-medium">AI Powered Matching</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Badge variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer">
            Cardiology
          </Badge>
          <Badge variant="outline" className="border-border hover:bg-muted cursor-pointer">
            Neurology
          </Badge>
          <Badge variant="outline" className="border-border hover:bg-muted cursor-pointer">
            Oncology
          </Badge>
          <Badge variant="outline" className="border-border hover:bg-muted cursor-pointer">
            All Specialties
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div 
              key={doctor.id}
              className={`p-6 bg-background rounded-lg border ${
                doctor.isAiRecommended ? 'border-accent shadow-glow' : 'border-border'
              } hover:shadow-md transition-shadow relative`}
            >
              {doctor.isAiRecommended && (
                <div className="absolute -top-2 -right-2 bg-gradient-accent text-accent-foreground text-xs px-2 py-1 rounded-full shadow-sm flex items-center">
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI Match
                </div>
              )}
              
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-16 w-16 ring-2 ring-accent ring-offset-2">
                  <AvatarImage src="/placeholder.svg" alt={doctor.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-accent font-medium">{doctor.specialty}</p>
                  <p className="text-xs text-muted-foreground">{doctor.experience}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                </div>
                <Badge variant="outline" className={`${
                  doctor.availability === "Available Now" 
                    ? "bg-success text-white border-success" 
                    : "border-border"
                }`}>
                  <Clock className="mr-1 h-3 w-3" />
                  {doctor.availability}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{doctor.location}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{doctor.consultationFee}</span>
              </div>
              
              <div className="flex space-x-2 mb-4">
                {doctor.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Consult
                </Button>
                <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCards;