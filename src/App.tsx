import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

// --- Page imports (as in your first code)
import Index from "./pages/Index.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Goals from "./pages/Goals.tsx";
import WealthAdvisor from "./pages/WealthAdvisor.tsx";
import CabBooking from "./pages/CabBooking.tsx";
import Bills from "./pages/Bills.tsx";
import AgentsDashboard from "./pages/agents.tsx";
import NotFound from "./pages/NotFound.tsx";
import BrowseArts from "./scene-2/src/pages/BrowseArts.tsx";
import NFTDetail from "./scene-2/src/pages/NFTDetail.tsx";
import PaymentMethod from "./scene-2/src/pages/PaymentMethod.tsx";
import PaymentProcessing from "./scene-2/src/pages/PaymentProcessing.tsx";
import Welcome from "./scene-2/src/pages/Welcome.tsx";

// --- Scene imports
import DestinationScene from "./scene-2/src/components/scenes/DestinationScene.tsx";
import PaymentScene from "./scene-2/src/components/scenes/PaymentScene.tsx";
import PetInfoScene from "./scene-2/src/components/scenes/PetInfoScene.tsx";
import TaskDashboardScene from "./scene-2/src/components/scenes/TaskDashboardScene.tsx";

// --- Scene-3 imports (from your second code, adjust paths as needed)
import EntryPromptScreen from "./scene-3/EntryPromptScreen.tsx";
import AuthenticationSuccessScreen from "./scene-3/AuthenticationSuccessScreen.tsx";
import UserPositionDetected from "./scene-3/UserPositionDetected.tsx";
import MappingInterfaceScreen from "./scene-3/MappingInterfaceScreen.tsx";
import HolographicBankManagerScreen from "./scene-3/HolographicBankManagerScreen.tsx";
import KYCUpdateScreen from "./scene-3/KYCUpdateScreen.tsx";
import ExitScreen from "./scene-3/ExitScreen.tsx";
import useElapsedTimer, { formatTime } from "./scene-3/elapsedTimer.tsx";
import QuantumAuthScreen from "./scene-3/QuantumAuthScreen.tsx";
import BankSelectionScreen from "./scene-3/BankSelectionScreen.tsx";
import ConsentScreen from "./scene-3/consent.tsx";
import AuthenticationChoiceScreen from "./scene-3/AutheticationChoiceScreen.tsx";
import { useVoiceNavigation } from "@/components/utils";

// --- Controlled step path logic
const controlledStepPaths = [
  "/bank-select", // 1
  "/quantum-auth", // 2
  "/platform", // 3
  "/position", // 4
  "/auth-init", // 5
  "/consent", // 6
  "/mapping", // 7
  "/auth-success", // 8
  "/manager", // 9
  "/kyc", // 10
  "/exit", // 11
];

const pathToControlledStep = {};
controlledStepPaths.forEach((path, idx) => {
  pathToControlledStep[path] = idx + 1;
});

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Start voice navigation at the app level
  const { listening, browserSupportsSpeechRecognition } = useVoiceNavigation();

  // Controlled path logic
  const isControlledPath = controlledStepPaths.includes(location.pathname);
  const initialStep = isControlledPath
    ? pathToControlledStep[location.pathname] || 1
    : null;
  const [step, setStep] = useState(initialStep);
  const [selectedBank, setSelectedBank] = useState(null);
  const [cameFromKYC, setCameFromKYC] = useState(null);

  // Timer logic for controlled paths
  const [elapsed] = useElapsedTimer(
    isControlledPath && (step < 4 || step === 11)
  );

  // Keep URL in sync with step, only for controlled paths
  useEffect(() => {
    if (isControlledPath && step !== null) {
      const path = controlledStepPaths[step - 1];
      if (location.pathname !== path) {
        navigate(path, { replace: true });
      }
    }
    // eslint-disable-next-line
  }, [step, isControlledPath]);

  // Update step if user navigates via browser controls, only for controlled paths
  useEffect(() => {
    if (isControlledPath) {
      const newStep = pathToControlledStep[location.pathname] || 1;
      if (newStep !== step) setStep(newStep);
    }
    // eslint-disable-next-line
  }, [location.pathname, isControlledPath]);

  // Keyboard navigation, only for controlled paths
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isControlledPath) return;
      if (e.key === "ArrowRight") {
        setStep((prev) => Math.min(prev + 1, controlledStepPaths.length));
      } else if (e.key === "ArrowLeft") {
        setStep((prev) => Math.max(prev - 1, 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isControlledPath]);

  // Timer bar
  const timerBar = (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 30,
        background: "rgba(10,24,61,0.6)",
        color: "#00eaff",
        padding: "8px 18px",
        borderRadius: 18,
        fontFamily: "Orbitron, Arial, sans-serif",
        fontWeight: 600,
        letterSpacing: 1,
        boxShadow: "0 0 12px #00eaff44",
        fontSize: 18,
        zIndex: 1000,
      }}
    >
      ⌛ {formatTime(elapsed)}
      {step === 11 && (
        <span
          style={{
            color: "#ff1744",
            marginLeft: 10,
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          (Paused)
        </span>
      )}
    </div>
  );

  return (
    <div>
      {isControlledPath && step >= 4 && timerBar}
      <Routes>
        {/* Scene-1 pages */}
        <Route
          path="/"
          element={
            <Index
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route
          path="/portfolio"
          element={
            <Portfolio
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route
          path="/goals"
          element={
            <Goals
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route
          path="/wealth-advisor"
          element={
            <WealthAdvisor
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route
          path="/cab-booking"
          element={
            <CabBooking
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route
          path="/bills"
          element={
            <Bills
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route path="/agentmesh" element={<AgentsDashboard />} />

          {/* Scene-2 pages */}
        <Route path="/welcomeScreen" element={<Welcome />} />
        <Route path="/index" element={<Index />} />
        <Route
          path="/browse-arts"
          element={
            <BrowseArts
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          }
        />
        <Route path="/nft/:id" element={<NFTDetail />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="/destination" element={<DestinationScene />} />
        <Route path="/petinfo" element={<PetInfoScene />} />
        <Route path="/paymentscene" element={<PaymentScene />} />
        <Route path="/taskdashboard" element={<TaskDashboardScene />} />

        {/* Scene-3 controlled screens */}
        <Route
          path="/bank-select"
          element={
            <BankSelectionScreen
              onBankSelected={(bank) => {
                setSelectedBank(bank);
                setStep(2);
              }}
              onExit={undefined}
            />
          }
        />
        <Route
          path="/quantum-auth"
          element={<QuantumAuthScreen selectedBank={selectedBank} />}
        />
        <Route path="/platform" element={<EntryPromptScreen />} />
        <Route path="/position" element={<UserPositionDetected />} />
        <Route
          path="/auth-init"
          element={
            <AuthenticationChoiceScreen onBCISelect={() => setStep(6)} />
          }
        />
        <Route
          path="/consent"
          element={
            <ConsentScreen onAgree={() => setStep(7)} onDecline={undefined} />
          }
        />
        <Route
          path="/mapping"
          element={<MappingInterfaceScreen onComplete={() => setStep(8)} />}
        />
        <Route path="/auth-success" element={<AuthenticationSuccessScreen />} />
        <Route
          path="/manager"
          element={
            <HolographicBankManagerScreen
              selectedBank={selectedBank}
              cameFromKYC={cameFromKYC}
              onOptionSelect={(optionId) => {
                if (optionId === "kyc") setStep(10);
              }}
              onExit={() => setStep(11)}
            />
          }
        />
        <Route
          path="/kyc"
          element={
            <KYCUpdateScreen
              onExit={() => setStep(11)}
              onMainMenu={() => {
                setCameFromKYC(true);
                setStep(9);
              }}
            />
          }
        />
        <Route path="/exit" element={<ExitScreen />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
