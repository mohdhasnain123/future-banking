import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PatientAlert from "@/components/dashboard/PatientAlert";
import { useNavigate } from "react-router-dom";

const EmergencyAlert = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleViewSpecialists = () => {
    // This could navigate to a specialists page or show specialists modal
    console.log("View specialists clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <PatientAlert 
          onBack={handleBack}
          onViewSpecialists={handleViewSpecialists}
        />
      </div>
    </div>
  );
};

export default EmergencyAlert;