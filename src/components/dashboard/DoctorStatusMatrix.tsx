import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Brain, Bone, Eye, Stethoscope, UserCircle, Phone, Video, Mic } from "lucide-react";

interface DoctorStatusMatrixProps {
  onBack: () => void;
}

const DoctorStatusMatrix = ({ onBack }: DoctorStatusMatrixProps) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const specialties = [
    { id: "all", name: "All Specialties", icon: Stethoscope, count: 45 },
    { id: "cardiology", name: "Cardiology", icon: Heart, count: 12 },
    { id: "neurology", name: "Neurology", icon: Brain, count: 8 },
    { id: "orthopedics", name: "Orthopedics", icon: Bone, count: 15 },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye, count: 10 }
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialty: "cardiology",
      status: "available",
      location: "Cardiology Wing - Room 205",
      patients: 8,
      nextAvailable: "Now",
      device: "Apple Watch Series 9",
      lastUpdate: "2 min ago"
    },
    {
      id: 2,
      name: "Dr. James Rodriguez",
      specialty: "cardiology", 
      status: "busy",
      location: "OR-3 (Surgery in progress)",
      patients: 12,
      nextAvailable: "3:30 PM",
      device: "Samsung Galaxy Watch",
      lastUpdate: "1 min ago"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "neurology",
      status: "emergency",
      location: "ICU - Critical Care",
      patients: 6,
      nextAvailable: "Unknown",
      device: "Fitbit Sense 2",
      lastUpdate: "30 sec ago"
    },
    {
      id: 4,
      name: "Dr. Michael Thompson",
      specialty: "orthopedics",
      status: "available",
      location: "Orthopedic Clinic",
      patients: 15,
      nextAvailable: "Now",
      device: "Garmin Forerunner",
      lastUpdate: "5 min ago"
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      specialty: "ophthalmology",
      status: "offline",
      location: "Off Duty",
      patients: 0,
      nextAvailable: "Tomorrow 8 AM",
      device: "Apple Watch Ultra",
      lastUpdate: "2 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-white';
      case 'busy': return 'bg-warning text-white';
      case 'emergency': return 'bg-destructive text-white';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    return <div className={`w-3 h-3 rounded-full ${
      status === 'available' ? 'bg-success animate-pulse' :
      status === 'busy' ? 'bg-warning' :
      status === 'emergency' ? 'bg-destructive animate-pulse' :
      'bg-muted'
    }`}></div>;
  };

  const filteredDoctors = selectedSpecialty === "all" 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  const handleVoiceCommand = (command: string) => {
    setIsVoiceActive(true);
    setTimeout(() => {
      setIsVoiceActive(false);
      // Simulate voice response
      alert(`Voice command processed: "${command}"`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
              <UserCircle className="h-6 w-6 text-primary" />
              <span>Doctor Status Matrix</span>
            </h1>
            <p className="text-muted-foreground">Real-time physician availability tracking via smart devices</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleVoiceCommand("Show available cardiologists")}
            className={isVoiceActive ? "bg-destructive text-white" : ""}
          >
            <Mic className="h-4 w-4 mr-2" />
            Voice Query
          </Button>
          <Badge className="bg-success text-white">45 Doctors Online</Badge>
        </div>
      </div>

      {/* Specialty Filter */}
      <Card className="bg-gradient-card border-border shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => {
              const IconComponent = specialty.icon;
              return (
                <Button
                  key={specialty.id}
                  variant={selectedSpecialty === specialty.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty.id)}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{specialty.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {specialty.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="bg-gradient-card border-border shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIcon(doctor.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{doctor.specialty}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(doctor.status)} text-xs`}>
                  {doctor.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm font-medium text-foreground">{doctor.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Patients:</span>
                  <span className="text-sm font-medium text-foreground">{doctor.patients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next Available:</span>
                  <span className="text-sm font-medium text-foreground">{doctor.nextAvailable}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Smart Device:</span>
                  <span className="text-sm font-medium text-foreground">{doctor.device}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Update:</span>
                  <span className="text-sm font-medium text-foreground">{doctor.lastUpdate}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" disabled={doctor.status === 'offline'}>
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" disabled={doctor.status === 'offline'}>
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant="default"
                  disabled={doctor.status !== 'available'}
                  onClick={() => handleVoiceCommand(`Schedule with ${doctor.name}`)}
                >
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isVoiceActive && (
        <Card className="fixed bottom-4 right-4 bg-destructive text-white border-destructive">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 animate-pulse" />
              <span className="font-medium">Processing voice command...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorStatusMatrix;