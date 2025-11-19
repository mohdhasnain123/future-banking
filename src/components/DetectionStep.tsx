import { Check, Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface DetectionStepProps {
  title: string;
  description: string;
  icon: ReactNode;
  status: "pending" | "active" | "completed";
  delay: number;
}

export const DetectionStep = ({
  title,
  description,
  icon,
  status,
  delay,
}: DetectionStepProps) => {
  const isVisible = status !== "pending";

  return (
    <div
      className={`relative flex gap-2 transition-all duration-500 ${
        isVisible ? "opacity-100 animate-slide-in" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border
          ${
            status === "completed"
              ? "bg-success/30 shadow-glow border-success/50"
              : status === "active"
              ? "bg-primary/30 shadow-glow animate-pulse-glow border-primary/50"
              : "bg-white/10 border-white/20"
          }`}
        >
          {status === "completed" ? (
            <Check className="w-4 h-4 text-white drop-shadow-lg" />
          ) : status === "active" ? (
            <Loader2 className="w-4 h-4 text-white animate-spin drop-shadow-lg" />
          ) : (
            <div className="w-4 h-4 text-white/50">{icon}</div>
          )}
        </div>
        <div className="w-0.5 flex-1 bg-white/20 mt-1" />
      </div>

      <div className="flex-1 pb-2">
        <h3
          className={`font-semibold text-[9px] mb-0.5 drop-shadow-md ${
            status === "completed" ? "text-success" : "text-white"
          }`}
        >
          {title}
        </h3>
        <p className="text-white/70 text-[8px] leading-snug">{description}</p>
        {status === "active" && (
          <div className="mt-1 flex items-center gap-1 text-white text-[11px] font-medium backdrop-blur-sm">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
};
