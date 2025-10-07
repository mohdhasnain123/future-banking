import { ArrowLeft, Star, MapPin, Clock, Video, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CardiacSpecialistsProps {
  onBack: () => void;
}

const CardiacSpecialists = ({ onBack }: CardiacSpecialistsProps) => {
  const specialists = [
    {
      id: "CS-001",
      name: "Dr. Sarah Chen",
      title: "Interventional Cardiologist",
      rating: 4.9,
      experience: "15+ years",
      location: "Remote Available",
      availability: "Available Now",
      languages: ["English", "Mandarin"],
      emergencySpecialty: "Acute MI & Cardiac Arrest",
      consultationFee: "Emergency - No Charge",
      treatmentPlan: {
        immediate: [
          "Administer 325mg Aspirin (if not allergic)",
          "Start oxygen therapy (2-4L/min via nasal cannula)", 
          "Establish IV access for emergency medications",
          "Prepare for immediate ECG and cardiac enzymes"
        ],
        diagnostic: [
          "12-lead ECG within 2 minutes",
          "Chest X-ray to rule out complications",
          "Troponin levels every 6 hours x3",
          "Echocardiogram for wall motion assessment"
        ],
        treatment: [
          "Dual antiplatelet therapy (Aspirin + Clopidogrel)",
          "Beta-blocker (Metoprolol 25mg BID if stable)",
          "ACE inhibitor after stabilization",
          "High-intensity statin therapy"
        ],
        monitoring: [
          "Continuous cardiac monitoring for 48 hours",
          "Blood pressure monitoring q15min initially",
          "Hourly neurological assessments",
          "Daily weights and fluid balance"
        ]
      },
      isAiRecommended: true
    },
    {
      id: "CS-002", 
      name: "Dr. Michael Torres",
      title: "Emergency Cardiologist",
      rating: 4.8,
      experience: "12+ years",
      location: "In-Person + Remote",
      availability: "Available in 5 minutes",
      languages: ["English", "Spanish"],
      emergencySpecialty: "Cardiac Emergency Response",
      consultationFee: "Emergency - No Charge",
      treatmentPlan: {
        immediate: [
          "Activate emergency cardiac team protocol",
          "Administer sublingual nitroglycerin if chest pain",
          "Morphine 2-4mg IV for severe pain",
          "Consider thrombolytic therapy if indicated"
        ],
        diagnostic: [
          "Point-of-care troponin test",
          "Bedside echocardiogram",
          "CT angiogram if PE suspected", 
          "Arterial blood gas analysis"
        ],
        treatment: [
          "Percutaneous coronary intervention (PCI) prep",
          "Heparin anticoagulation protocol",
          "Inotropic support if cardiogenic shock",
          "Emergency cardiac catheterization"
        ],
        monitoring: [
          "Hemodynamic monitoring with Swan-Ganz",
          "Continuous arterial pressure monitoring",
          "Central venous pressure monitoring",
          "Cardiac output measurements"
        ]
      },
      isAiRecommended: true
    },
    {
      id: "CS-003",
      name: "Dr. Jennifer Park", 
      title: "Cardiac Intensive Care Specialist",
      rating: 4.7,
      experience: "18+ years",
      location: "Remote Available",
      availability: "Available Now",
      languages: ["English", "Korean"],
      emergencySpecialty: "Critical Care Cardiology",
      consultationFee: "Emergency - No Charge",
      treatmentPlan: {
        immediate: [
          "Assess for immediate defibrillation needs",
          "Establish advanced airway if indicated",
          "Rapid sequence intubation protocol ready",
          "Emergency pacing pads placement"
        ],
        diagnostic: [
          "Portable chest X-ray",
          "Blood type and crossmatch preparation",
          "Comprehensive metabolic panel",
          "Coagulation studies (PT/PTT/INR)"
        ],
        treatment: [
          "Vasopressor therapy if hypotensive",
          "Mechanical ventilation if respiratory failure",
          "Intra-aortic balloon pump consideration",
          "ECMO evaluation for cardiogenic shock"
        ],
        monitoring: [
          "Multi-parameter monitoring",
          "Neurological status every 30 minutes",
          "Urine output monitoring (goal >0.5ml/kg/hr)",
          "Core temperature monitoring"
        ]
      },
      isAiRecommended: false
    }
  ];

  const renderTreatmentPlan = (plan: any) => {
    const sections = [
      { title: "Immediate Actions", items: plan.immediate, icon: AlertCircle, color: "text-destructive" },
      { title: "Diagnostic Protocol", items: plan.diagnostic, icon: CheckCircle, color: "text-primary" },
      { title: "Treatment Plan", items: plan.treatment, icon: CheckCircle, color: "text-success" },
      { title: "Monitoring Protocol", items: plan.monitoring, icon: Clock, color: "text-warning" }
    ];

    return (
      <div className="space-y-4">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h4 className={`font-semibold mb-2 flex items-center space-x-2 ${section.color}`}>
              <section.icon className="h-4 w-4" />
              <span>{section.title}</span>
            </h4>
            <div className="space-y-1 ml-6">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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
            <h1 className="text-2xl font-bold text-foreground">Emergency Cardiac Specialists</h1>
            <p className="text-muted-foreground">Immediate consultation for Bob Smith's cardiac emergency</p>
          </div>
        </div>
        <Badge className="bg-destructive text-destructive-foreground">
          EMERGENCY RESPONSE
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
                <span className="text-sm text-foreground">Dr. Sarah Chen completed emergency consultation</span>
              </div>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Dr. Michael Torres reviewed cardiac protocol</span>
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground">Emergency team activated for cardiac event</span>
              </div>
              <span className="text-xs text-muted-foreground">8 min ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialists List */}
      <div className="space-y-6">
        {specialists.map((specialist, index) => (
          <Card key={specialist.id} className={`bg-gradient-card border-border shadow-lg ${specialist.isAiRecommended ? 'ring-2 ring-primary/20 shadow-primary/10' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-lg">
                    {specialist.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-semibold text-foreground">{specialist.name}</h3>
                      {specialist.isAiRecommended && (
                        <Badge className="bg-primary text-primary-foreground text-xs">AI MATCH</Badge>
                      )}
                    </div>
                    <p className="text-primary font-medium mb-1">{specialist.title}</p>
                    <p className="text-sm text-accent font-medium mb-2">{specialist.emergencySpecialty}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning fill-current" />
                        <span>{specialist.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{specialist.experience}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{specialist.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className="bg-success text-success-foreground mb-2">
                    {specialist.availability}
                  </Badge>
                  <p className="text-sm font-medium text-foreground">{specialist.consultationFee}</p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                      <Video className="mr-1 h-3 w-3" />
                      Connect Now
                    </Button>
                    <Button size="sm" variant="outline" className="border-border">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Separator className="mb-4" />
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Emergency Treatment Protocol</span>
                </h4>
                {renderTreatmentPlan(specialist.treatmentPlan)}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Languages:</p>
                  <div className="flex space-x-2">
                    {specialist.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="border-border text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Emergency Consult
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardiacSpecialists;