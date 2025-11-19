import { useState, useEffect, useRef } from "react";
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

// --- Page imports (as in your first code)
import Index from "./pages/Index.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Goals from "./pages/Goals.tsx";
import WealthAdvisor from "./pages/WealthAdvisor.tsx";
import CabBooking from "./pages/CabBooking.tsx";
import AgentsDashboard from "./pages/AgentMesh.tsx";
import ConsentFlow from "./pages/consent.tsx";
import NotFound from "./pages/NotFound.tsx";
import BrowseArts from "./scene-2/src/pages/BrowseArts.tsx";
import NFTDetail from "./scene-2/src/pages/NFTDetail.tsx";
import PaymentMethod from "./scene-2/src/pages/PaymentMethod.tsx";
import PaymentProcessing from "./scene-2/src/pages/PaymentProcessing.tsx";
import Welcome from "./scene-2/src/pages/Welcome.tsx";

// --- Scene imports
import DestinationScene from "./scene-2/src/components/scenes/DestinationScene.tsx";
import PaymentScene, {
  PaymentStage,
} from "./scene-2/src/components/scenes/PaymentScene.tsx";
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
import HouseGoal from "./scene-2/src/pages/HouseGoal.tsx";
import ConversationLayout from "./components/ConversationLayout.tsx";
import FraudDetected from "./pages/FraudDetected.tsx";
import TravelToBank from "./scene-3/TravelToBank.tsx";
import StrategyComparison from "./pages/StrategyComparison.tsx";
import IndexNexus from "./pages/Nexus/IndexNexus.tsx";
import PortfolioNexus from "./pages/Nexus/PortfolioNexus.tsx";
import FraudDetectedNexus from "./pages/Nexus/FraudDetectedNexus.tsx";
import GoalsNexus from "./pages/Nexus/GoalsNexus.tsx";
import WealthAdvisorNexus from "./pages/Nexus/WealthAdvisorNexus.tsx";
import StrategyComparisonNexus from "./pages/Nexus/StrategyComparisonNexus.tsx";
import CabBookingNexus from "./pages/Nexus/CabBookingNexus.tsx";

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

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const videoRef4 = useRef<HTMLVideoElement>(null);
  const videoRef5 = useRef<HTMLVideoElement>(null);
  const videoRef6 = useRef<HTMLVideoElement>(null);
  const videoRef7 = useRef<HTMLVideoElement>(null);
  //const videoRef7: RefObject<HTMLVideoElement>

  const videoRefs = [
    videoRef1,
    videoRef2,
    videoRef3,
    videoRef4,
    videoRef5,
    videoRef6,
  ];

  const [videoEndedIndex, setVideoEndedIndex] = useState<number | null>(null);

  const handleVideoEnd = (index: number) => {
    console.log(`🎬  video ${index + 1} ended`);
    setVideoEndedIndex(index);
  };

  // Start voice navigation at the app level
  // const { listening, browserSupportsSpeechRecognition, transcript } =
  //   useConversationSpeechRecognition();

  const [speakingState, setSpeakingState] = useState({
    vick: false,
    dot: false,
  });

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
    console.log("useeefect 5");
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
      console.log("useeffect arrow key");
      if (speakingState.vick) {
        setStep((s) => Math.min(s + 1, 300));
        return;
      }
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
        fontFamily: "Outfit, system-ui, sans-serif",
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

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [stage, setStage] = useState<PaymentStage>("claim-verification");

  const [clockTargetTime, setClockTargetTime] = useState<
    { hours: number; minutes: number } | undefined
  >(undefined);

  return (
    <div>
      {isControlledPath && step >= 4}
      <Routes>
        <Route
          element={
            <ConversationLayout
              onSetSelectedCategory={setSelectedCategory}
              videoRefs={videoRefs}
              videoEndedIndex={videoEndedIndex}
              setSpeakingState={setSpeakingState}
              videoRef7={videoRef7}
              clockTargetTime={clockTargetTime}
              setClockTargetTime={setClockTargetTime}
            />
          }
        >
          {/* Scene-1 pages */}
          {/* <Route path="/" element={<Index clockTargetTime={clockTargetTime} setClockTargetTime={setClockTargetTime}/>} /> */}
          <Route
            path="/"
            element={
              <IndexNexus
                clockTargetTime={clockTargetTime}
                setClockTargetTime={setClockTargetTime}
              />
            }
          />

          {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          <Route path="/portfolio" element={<PortfolioNexus />} />
          {/* <Route path="/portfolio-again" element={<Portfolio />} /> */}
          <Route path="/portfolio-again" element={<PortfolioNexus />} />
          {/* <Route path="/goals" element={<Goals />} /> */}
          <Route path="/goals" element={<GoalsNexus />} />

          <Route path="/consent-for-dot" element={<ConsentFlow />} />
          {/* <Route
            path="/wealth-advisor"
            element={
              <WealthAdvisor
                videoRefs={videoRefs}
                onVideoEnd={handleVideoEnd}
                speakingState={speakingState}
              />
            }
          /> */}
          <Route
            path="/wealth-advisor"
            element={
              <WealthAdvisorNexus
                videoRefs={videoRefs}
                onVideoEnd={handleVideoEnd}
                speakingState={speakingState}
              />
            }
          />
          {/* <Route path="/strategy-comparison" element={<StrategyComparison />} /> */}
          <Route path="/strategy-comparison" element={<StrategyComparisonNexus />} />

          <Route
            path="/travel-to-bank"
            element={
              <TravelToBank onVideoEnd={handleVideoEnd} videoRef={videoRef7} />
            }
          />
          {/* <Route path="/cab-booking" element={<CabBooking />} /> */}
          <Route path="/cab-booking" element={<CabBookingNexus />} />
          <Route path="/agentmesh" element={<AgentsDashboard />} />
          {/* <Route path="/fraud-detected" element={<FraudDetected />} /> */}
          <Route path="/fraud-detected" element={<FraudDetectedNexus />} />

          {/* Scene-2 pages */}
          <Route path="/welcomeScreen" element={<Welcome />} />
          <Route path="/browse-arts" element={<BrowseArts />} />

          <Route path="/nft/:id" element={<NFTDetail />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/payment-processing" element={<PaymentProcessing />} />
          <Route path="/house-goal" element={<HouseGoal />} />
          <Route path="/destination" element={<DestinationScene />} />
          <Route path="/petinfo" element={<PetInfoScene />} />
          <Route
            path="/paymentscene"
            element={
              <PaymentScene
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                stage={stage}
                setStage={setStage}
              />
            }
          />
          <Route path="/taskdashboard" element={<TaskDashboardScene />} />
        </Route>

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
