import { useState, useEffect, useRef } from "react";
import { DetectionStep } from "./DetectionStep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Ban,
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Transaction Initiated",
    description:
      "Purchase attempt detected at unusual location and time. System automatically flagged for review.",
    icon: <Activity />,
  },
  {
    id: 2,
    title: "Anomaly Detection",
    description:
      "ML models identified multiple red flags: location mismatch, unusual spending pattern, and velocity check failure.",
    icon: <AlertTriangle />,
  },
  {
    id: 3,
    title: "Risk Assessment",
    description:
      "Real-time risk scoring computed using behavioral analytics and fraud detection algorithms. Score: 92/100.",
    icon: <Shield />,
  },
  {
    id: 4,
    title: "Transaction Blocked",
    description:
      "Automatic block applied to prevent unauthorized charge. Card temporarily frozen for security.",
    icon: <Ban />,
  },
  {
    id: 5,
    title: "Customer Notified",
    description:
      "Push notification and SMS sent to cardholder for immediate verification and action.",
    icon: <CheckCircle />,
  },
];

export const DetectionTimeline = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setCurrentStep((prev) => prev + 1);

        // Auto-scroll to the current step
        if (stepRefs.current[currentStep] && contentRef.current) {
          stepRefs.current[currentStep]?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 2000); // Each step takes 2 seconds

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <Card className="shadow-glow border-white/20 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-hidden text-[12px]">
      <CardHeader className="flex-shrink-0 pb-1">
        <CardTitle className="text-base font-bold text-white drop-shadow-lg text-[12px]">
          Detection Timeline
        </CardTitle>
        <p className="text-white/70 text-[8px]">
          Real-time fraud detection and response flow
        </p>
      </CardHeader>
      <CardContent
        ref={contentRef}
        className="flex-1 overflow-y-auto py-1 px-1"
        style={{ paddingBottom: 16 }} // ensures last item isn't flush with bottom
      >
        <div className="space-y-0.5">
          {steps.map((step, index) => (
            <div key={step.id} ref={(el) => (stepRefs.current[index] = el)}>
              <DetectionStep
                title={step.title}
                description={step.description}
                icon={step.icon}
                status={
                  completedSteps.includes(index)
                    ? "completed"
                    : index === currentStep
                    ? "active"
                    : "pending"
                }
                delay={index * 100}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
