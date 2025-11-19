import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "./RiskBadge";
import { AlertCircle, CreditCard, MapPin, Clock } from "lucide-react";

interface Transaction {
  id: string;
  amount: string;
  merchant: string;
  location: string;
  time: string;
  cardLast4: string;
  riskScore: number;
  fraudType?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const getRiskLevel = (score: number): "high" | "medium" | "low" => {
    if (score >= 80) return "high";
    if (score >= 50) return "medium";
    return "low";
  };

  return (
    <Card className="shadow-glow border-white/20 animate-fade-in bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-hidden text-[11px]">
      <CardHeader className="pb-0.5 flex-shrink-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-[13px] font-bold text-white drop-shadow-lg">
            Suspicious Transaction Detected
          </CardTitle>
          <RiskBadge level={getRiskLevel(transaction.riskScore)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 overflow-y-auto flex-1 px-2 py-1">
        <div className="flex items-center justify-between p-1.5 bg-destructive/10 backdrop-blur-sm rounded-lg border border-destructive/30">
          <div>
            <p className="text-[9px] text-white/70">Amount</p>
            <p className="text-base font-bold text-white drop-shadow-lg">
              {transaction.amount}
            </p>
          </div>
          <AlertCircle className="w-4 h-4 text-destructive drop-shadow-lg" />
        </div>

        {transaction.fraudType && (
          <div className="p-1 bg-warning/10 backdrop-blur-sm rounded-lg border border-warning/30">
            <p className="text-[9px] text-white/70 mb-0.5">Fraud Type</p>
            <p className="text-[10px] font-semibold text-white">
              {transaction.fraudType}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-0.5 text-white/70">
              <CreditCard className="w-2.5 h-2.5" />
              <p className="text-[9px]">Card</p>
            </div>
            <p className="font-semibold text-[10px] text-white">
              •••• {transaction.cardLast4}
            </p>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-0.5 text-white/70">
              <Clock className="w-2.5 h-2.5" />
              <p className="text-[9px]">Time</p>
            </div>
            <p className="font-semibold text-[10px] text-white">
              {transaction.time}
            </p>
          </div>

          <div className="space-y-0.5 col-span-2">
            <div className="flex items-center gap-0.5 text-white/70">
              <MapPin className="w-2.5 h-2.5" />
              <p className="text-[9px]">Merchant & Location</p>
            </div>
            <p className="font-semibold text-[10px] text-white">
              {transaction.merchant}, {transaction.location}
            </p>
          </div>
        </div>

        <div className="pt-0.5">
          <div className="flex justify-between items-center mb-0.5">
            <p className="text-[9px] font-medium text-white/70">Risk Score</p>
            <p className="text-[9px] font-bold text-destructive drop-shadow-lg">
              {transaction.riskScore}%
            </p>
          </div>
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-1 overflow-hidden border border-white/20">
            <div
              className="h-full bg-gradient-alert transition-all duration-1000 ease-out shadow-glow"
              style={{ width: `${transaction.riskScore}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
