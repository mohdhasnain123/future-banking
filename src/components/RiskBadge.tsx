import { Badge } from "@/components/ui/badge";

interface RiskBadgeProps {
  level: "high" | "medium" | "low" | "resolved";
  label?: string;
}

export const RiskBadge = ({ level, label }: RiskBadgeProps) => {
  const variants = {
    high: "bg-gradient-alert text-destructive-foreground shadow-soft",
    medium: "bg-gradient-to-r from-warning/90 to-warning text-warning-foreground shadow-soft",
    low: "bg-secondary text-secondary-foreground",
    resolved: "bg-gradient-success text-success-foreground shadow-soft",
  };

  const defaultLabels = {
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
    resolved: "Resolved",
  };

  return (
    <Badge className={`${variants[level]} px-3 py-1 font-semibold`}>
      {label || defaultLabels[level]}
    </Badge>
  );
};
