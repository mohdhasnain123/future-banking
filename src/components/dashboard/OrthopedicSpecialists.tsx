import { ArrowLeft, Star, MapPin, Clock, Video, MessageSquare, CheckCircle, AlertCircle, Bone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrthopedicSpecialistsProps {
  onBack: () => void;
}

const OrthopedicSpecialists = ({ onBack }: OrthopedicSpecialistsProps) => {
  const specialists = [
    {
      id: "OS-001",
      name: "Dr. Michael Thompson",
      title: "Orthopedic Trauma Surgeon",
      rating: 4.9,
      experience: "18+ years",
      location: "Remote Available",
      availability: "Available Now",
      emergencyProtocol: "Compartment Syndrome Specialist",
      aiRecommendation: "BEST MATCH",
      treatmentPlan: {
        immediateActions: [
          "Emergency fasciotomy assessment",
          "Compartment pressure monitoring",
          "Pain management with regional anesthesia",
          "Vascular status evaluation"
        ],
        diagnostics: [
          "Urgent MRI with contrast",
          "Doppler ultrasound",
          "Compartment pressure measurement",
          "Complete blood panel with coagulation studies"
        ],
        treatment: [
          "Immediate surgical decompression if indicated",
          "External fixation for fracture stabilization",
          "Anti-inflammatory protocol",
          "DVT prophylaxis initiation"
        ],
        monitoring: [
          "Hourly neurovascular assessments",
          "Pain level monitoring",
          "Wound inspection every 2 hours",
          "Range of motion assessment"
        ]
      }
    },
    {
      id: "OS-002", 
      name: "Dr. Jennifer Martinez",
      title: "Sports Medicine & Orthopedic Surgeon",
      rating: 4.8,
      experience: "12+ years",
      location: "Springfield General - OR 3",
      availability: "Available in 15 min",
      emergencyProtocol: "Knee Trauma Specialist",
      aiRecommendation: "RECOMMENDED",
      treatmentPlan: {
        immediateActions: [
          "RICE protocol implementation",
          "Immobilization and elevation",
          "Ice therapy application",
          "Urgent orthopedic consultation"
        ],
        diagnostics: [
          "X-ray bilateral knees",
          "CT scan if fracture suspected",
          "Arthroscopy evaluation",
          "Ligament stress testing"
        ],
        treatment: [
          "Arthroscopic repair if indicated",
          "Meniscal tear assessment",
          "ACL/PCL evaluation",
          "Physical therapy planning"
        ],
        monitoring: [
          "Range of motion tracking",
          "Swelling assessment",
          "Stability testing",
          "Recovery milestone tracking"
        ]
      }
    },
    {
      id: "OS-003",
      name: "Dr. Robert Kim",
      title: "Joint Reconstruction Specialist", 
      rating: 4.7,
      experience: "20+ years",
      location: "Virtual Consultation",
      availability: "Available Now",
      emergencyProtocol: "Complex Fracture Management",
      aiRecommendation: "AVAILABLE",
      treatmentPlan: {
        immediateActions: [
          "Joint alignment assessment",
          "Fracture reduction techniques",
          "Hardware placement evaluation",
          "Soft tissue damage assessment"
        ],
        diagnostics: [
          "3D CT reconstruction",
          "Bone density scanning",
          "Joint fluid analysis",
          "Inflammatory marker testing"
        ],
        treatment: [
          "Open reduction internal fixation",
          "Joint replacement consideration",
          "Bone grafting if needed",
          "Rehabilitation protocol"
        ],
        monitoring: [
          "Hardware integrity checks",
          "Bone healing progression",
          "Joint function assessment",
          "Complication surveillance"
        ]
      }
    }
  ];

  const renderTreatmentPlan = (plan: any) => (
    <div className="space-y-4 mt-4">
      <div>
        <h4 className="font-semibold text-foreground mb-2 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 text-destructive" />
          Immediate Actions
        </h4>
        <ul className="space-y-1">
          {plan.immediateActions.map((action: string, index: number) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-success" />
              {action}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-foreground mb-2 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          Diagnostics Required
        </h4>
        <ul className="space-y-1">
          {plan.diagnostics.map((diagnostic: string, index: number) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-primary" />
              {diagnostic}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-2 flex items-center">
          <Bone className="h-4 w-4 mr-2 text-secondary" />
          Treatment Plan
        </h4>
        <ul className="space-y-1">
          {plan.treatment.map((treatment: string, index: number) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-secondary" />
              {treatment}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-2 flex items-center">
          <Video className="h-4 w-4 mr-2 text-accent" />
          Monitoring Protocol
        </h4>
        <ul className="space-y-1">
          {plan.monitoring.map((monitor: string, index: number) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-accent" />
              {monitor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Alert
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orthopedic Specialists</h1>
            <p className="text-muted-foreground">Available for emergency consultation</p>
          </div>
        </div>
        <Badge className="bg-destructive text-white text-lg px-4 py-2 animate-pulse">
          EMERGENCY ACTIVE
        </Badge>
      </div>

      {/* Recent Activities */}
      <Card className="bg-gradient-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Dr. Thompson reviewed knee trauma protocol</span>
              </div>
              <span className="text-xs text-muted-foreground">1 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Emergency orthopedic consultation requested</span>
              </div>
              <span className="text-xs text-muted-foreground">3 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Dr. Martinez updated treatment protocols</span>
              </div>
              <span className="text-xs text-muted-foreground">6 min ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {specialists.map((specialist) => (
          <Card key={specialist.id} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{specialist.name}</CardTitle>
                      <p className="text-muted-foreground">{specialist.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{specialist.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{specialist.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{specialist.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <Badge className={
                    specialist.aiRecommendation === "BEST MATCH" 
                      ? "bg-success text-white"
                      : specialist.aiRecommendation === "RECOMMENDED"
                      ? "bg-primary text-white" 
                      : "bg-muted text-foreground"
                  }>
                    {specialist.aiRecommendation}
                  </Badge>
                  <div>
                    <Badge className="bg-success text-white">
                      {specialist.availability}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-primary">{specialist.emergencyProtocol}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Button className="flex-1">
                    <Video className="h-4 w-4 mr-2" />
                    Connect Video
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Emergency Consult
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    Emergency Treatment Protocol - Knee Trauma
                  </h3>
                  {renderTreatmentPlan(specialist.treatmentPlan)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrthopedicSpecialists;