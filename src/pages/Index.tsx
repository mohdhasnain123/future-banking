import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickStats from "@/components/dashboard/QuickStats";
import PatientAlert from "@/components/dashboard/PatientAlert";
import CardiacSpecialists from "@/components/dashboard/CardiacSpecialists";
import OrthopedicSpecialists from "@/components/dashboard/OrthopedicSpecialists";
import CriticalPatientsList from "@/components/dashboard/CriticalPatientsList";
import PatientOverview from "@/components/dashboard/PatientOverview";
import AIProviderAssistant from "@/components/dashboard/AIProviderAssistant";
import DoctorStatusMatrix from "@/components/dashboard/DoctorStatusMatrix";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import ActiveTreatments from "@/components/dashboard/ActiveTreatments";
import BedUtilization from "@/components/dashboard/BedUtilization";
import StaffOptimization from "@/components/dashboard/StaffOptimization";
import DoctorAvailabilityAnalytics from "@/components/dashboard/DoctorAvailabilityAnalytics";
import SupportStaffAnalytics from "@/components/dashboard/SupportStaffAnalytics";
import PatientAnalytics from "@/components/dashboard/PatientAnalytics";
import EmergencyDoctors from "@/components/dashboard/EmergencyDoctors";
import AIChatbot from "@/components/shared/AIChatbot";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'criticalPatients' | 'patientAlert' | 'specialists' | 'aiAgent' | 'doctorStatus' | 'appointments' | 'treatments' | 'beds' | 'staff' | 'emergencyDoctors'>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  // Listen for the custom events from QuickStats
  useEffect(() => {
    const handleShowCriticalPatients = () => setCurrentView('criticalPatients');
    const handleShowAIAgent = () => setCurrentView('aiAgent');
    const handleShowDoctorStatus = () => setCurrentView('doctorStatus');
    const handleShowAppointments = () => setCurrentView('appointments');
    const handleShowTreatments = () => setCurrentView('treatments');
    const handleShowBedUtilization = () => setCurrentView('beds');
    const handleShowStaffOptimization = () => setCurrentView('staff');
    const handleShowEmergencyDoctors = () => setCurrentView('emergencyDoctors');
    const handleShowNotifications = () => setCurrentView('patientAlert');

    window.addEventListener('showCriticalPatients', handleShowCriticalPatients);
    window.addEventListener('showAIAgent', handleShowAIAgent);
    window.addEventListener('showAppointments', handleShowAppointments);
    window.addEventListener('showTreatments', handleShowTreatments);
    window.addEventListener('showBedUtilization', handleShowBedUtilization);
    window.addEventListener('showStaffOptimization', handleShowStaffOptimization);
    window.addEventListener('showEmergencyDoctors', handleShowEmergencyDoctors);
    window.addEventListener('showNotifications', handleShowNotifications);

    return () => {
      window.removeEventListener('showCriticalPatients', handleShowCriticalPatients);
      window.removeEventListener('showAIAgent', handleShowAIAgent);
      window.removeEventListener('showAppointments', handleShowAppointments);
      window.removeEventListener('showTreatments', handleShowTreatments);
      window.removeEventListener('showBedUtilization', handleShowBedUtilization);
      window.removeEventListener('showStaffOptimization', handleShowStaffOptimization);
      window.removeEventListener('showEmergencyDoctors', handleShowEmergencyDoctors);
      window.removeEventListener('showNotifications', handleShowNotifications);
    };
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'criticalPatients':
        return (
          <CriticalPatientsList 
            onBack={() => setCurrentView('dashboard')}
            onSelectPatient={(patientId) => {
              setSelectedPatientId(patientId);
              setCurrentView('patientAlert');
            }}
          />
        );
      case 'patientAlert':
        return (
          <PatientAlert 
            onBack={() => setCurrentView('criticalPatients')}
            onViewSpecialists={() => setCurrentView('specialists')}
          />
        );
      case 'specialists':
        return (
          <OrthopedicSpecialists 
            onBack={() => setCurrentView('patientAlert')}
          />
        );
      case 'aiAgent':
        return (
          <AIProviderAssistant 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'doctorStatus':
        return (
          <DoctorStatusMatrix 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'appointments':
        return (
          <UpcomingAppointments 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'treatments':
        return (
          <ActiveTreatments 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'beds':
        return (
          <BedUtilization 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'staff':
        return (
          <StaffOptimization 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'emergencyDoctors':
        return (
          <EmergencyDoctors 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return (
          <>
            <QuickStats />
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8"> */}
              <PatientOverview />
            {/* </div> */}
             <div className="mt-8">
                <DoctorAvailabilityAnalytics />
              </div>
              <div className="mt-8">
                <SupportStaffAnalytics />
              </div>
            <div className="mt-8">
              <PatientAnalytics />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
      
      {/* AI Chatbot - appears on every page */}
      <AIChatbot />
    </div>
  );
};

export default Index;
