import { useState, useEffect } from "react";
import { TransactionCard } from "@/components/TransactionCard";
import { DetectionTimeline } from "@/components/DetectionTimeline";
import { Shield } from "lucide-react";
import backgroundImage from "@/assets/mountain-bg.jpg";
import { formatDate, formatTime } from "@/components/utils";

const FraudDetected = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mockTransaction = {
    id: "TXN-2035-891234",
    amount: "-$850.00",
    merchant: "Unknown Merchant - Romania",
    location: "Romania",
    time: "30m ago",
    cardLast4: "4892",
    riskScore: 95,
    fraudType: "Digital Assets-Blocked (Outside Spending Pattern)",
  };

  return (
    <div className="h-[540px] relative overflow-hidden flex flex-col text-[10px]">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 backdrop-blur-[2px]" />

      <div className="container mx-auto px-1 py-1 max-w-2xl relative z-10 flex flex-col h-full overflow-hidden">
        {/* Header Bar: Date/Time left */}
        <div className="flex justify-between items-center mb-1 mt-0.5">
          <div className="flex items-center">
            <span className="text-[9px] font-medium text-white/90">
              {formatTime("7:45 AM", 0)} | {formatDate(currentTime)}
            </span>
          </div>
        </div>

        {/* Main Header */}
        <header className="mb-1 animate-fade-in flex-shrink-0">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="p-1 bg-primary/20 backdrop-blur-xl rounded-xl shadow-glow border border-primary/30">
              <Shield className="w-3 h-3 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-base font-bold text-white drop-shadow-lg">
              Fraud Detection System
            </h1>
          </div>
          <p className="text-white/80 text-[8px] ml-[2.2rem] drop-shadow-md">
            Advanced AI-powered security monitoring and threat response
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-1 flex-1 overflow-hidden min-h-0">
          <div className="flex flex-col overflow-hidden min-h-0">
            <TransactionCard transaction={mockTransaction} />
          </div>
          <div className="flex flex-col overflow-hidden min-h-0">
            <DetectionTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetected;
