import { ArrowLeft, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CriticalPatientsListProps {
  onBack: () => void;
  onSelectPatient: (patientId: string) => void;
}

const CriticalPatientsList = ({
  onBack,
  onSelectPatient,
}: CriticalPatientsListProps) => {
  const criticalPatients = [
    {
      id: "PA-2035-08471",
      name: "Bob Smith",
      age: 58,
      condition: "Severe Knee Injury with Compartment Syndrome Risk",
      severity: "CRITICAL",
      timeDetected: "2 minutes ago",
      vitals: {
        heartRate: "118 BPM",
        bloodPressure: "145/88",
        oxygen: "96%",
      },
      riskScore: 89,
    },
    // {
    //   id: "PA-2024-002",
    //   name: "Sarah Williams",
    //   age: 45,
    //   condition: "Severe Respiratory Distress",
    //   severity: "CRITICAL",
    //   timeDetected: "5 minutes ago",
    //   vitals: {
    //     heartRate: "134 BPM",
    //     bloodPressure: "95/60",
    //     oxygen: "78%"
    //   },
    //   riskScore: 92
    // },
    // {
    //   id: "PA-2024-003",
    //   name: "Michael Chen",
    //   age: 67,
    //   condition: "Stroke Alert",
    //   severity: "CRITICAL",
    //   timeDetected: "8 minutes ago",
    //   vitals: {
    //     heartRate: "98 BPM",
    //     bloodPressure: "220/110",
    //     oxygen: "94%"
    //   },
    //   riskScore: 88
    // }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-warning text-warning-foreground";
    }
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
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <span>Critical Patient Alerts</span>
            </h1>
            <p className="text-muted-foreground">
              Patients requiring immediate medical attention
            </p>
          </div>
        </div>
        <Badge className="bg-destructive text-destructive-foreground text-sm px-3 py-1">
          {criticalPatients.length} Active Alerts
        </Badge>
      </div>

      {/* Critical Patients List */}
      <div className="grid grid-cols-1 gap-4">
        {criticalPatients.map((patient) => (
          <Card
            key={patient.id}
            className="bg-gradient-card border-destructive/20 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
            onClick={() => onSelectPatient(patient.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Age: {patient.age} • ID: {patient.id}
                      </p>
                    </div>
                    <Badge
                      className={`${getSeverityColor(
                        patient.severity
                      )} text-xs`}
                    >
                      {patient.severity}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-destructive mb-1">
                      {patient.condition}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Detected {patient.timeDetected}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Heart Rate</p>
                      <p className="font-semibold text-foreground">
                        {patient.vitals.heartRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Blood Pressure</p>
                      <p className="font-semibold text-foreground">
                        {patient.vitals.bloodPressure}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">SpO2</p>
                      <p className="font-semibold text-foreground">
                        {patient.vitals.oxygen}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-6 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <TrendingUp className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">
                      Risk Score
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-destructive">
                    {patient.riskScore}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CriticalPatientsList;
