import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Calendar,
  PiggyBank,
  Shield,
  Clock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import dreamHouse from "@/assets/dream-house.jpg";

const StrategyComparison = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      name: "Strategic Approach",
      description: "Gradual liquidation with minimal market risk",
      strategy: "Partial Liquidation",
      details: [
        "Liquidate 60% of crypto assets ($15,000)",
        "Keep digital real estate as collateral",
        "Use existing savings ($12,000)",
        "Small personal loan ($23,000) at 4.5% APR",
      ],
      pros: [
        "Maintain most digital asset exposure",
        "Lower immediate tax burden",
        "Flexible repayment terms",
        "Keep appreciation potential",
      ],
      cons: [
        "Monthly loan payments ($425/month)",
        "Interest costs over time (~$2,300)",
        "Longer debt commitment (5 years)",
      ],
      cashFlow: {
        immediate: 27000,
        loan: 23000,
        monthlyPayment: 425,
        totalCost: 52300,
      },
      riskLevel: "Low",
      timeToReady: "2 weeks",
      color: "hsl(var(--primary))",
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      id: 2,
      name: "Aggressive Liquidation",
      description: "Full asset conversion for immediate purchase",
      strategy: "Complete Liquidation",
      details: [
        "Liquidate 100% of crypto assets ($25,000)",
        "Sell all digital real estate ($18,000)",
        "Use all savings ($12,000)",
        "No loan needed",
      ],
      pros: [
        "No debt or interest payments",
        "Immediate purchasing power",
        "Full ownership from day one",
        "No monthly obligations",
      ],
      cons: [
        "Lose all digital asset positions",
        "Potential capital gains tax (~$4,000)",
        "Miss future appreciation",
        "Reduced portfolio diversification",
      ],
      cashFlow: {
        immediate: 55000,
        loan: 0,
        monthlyPayment: 0,
        totalCost: 51000,
      },
      riskLevel: "High",
      timeToReady: "1 week",
      color: "hsl(var(--destructive))",
      bgGradient: "from-destructive/20 to-destructive/5",
    },
  ];

  const comparisonMetrics = [
    {
      metric: "Total Cost",
      option1: "$52,300",
      option2: "$51,000",
      better: 2,
      icon: DollarSign,
    },
    {
      metric: "Asset Retention",
      option1: "40% retained",
      option2: "0% retained",
      better: 1,
      icon: TrendingUp,
    },
    {
      metric: "Monthly Burden",
      option1: "$425/month",
      option2: "$0/month",
      better: 2,
      icon: Calendar,
    },
    {
      metric: "Tax Impact",
      option1: "~$1,500",
      option2: "~$4,000",
      better: 1,
      icon: Shield,
    },
    {
      metric: "Time to Ready",
      option1: "2 weeks",
      option2: "1 week",
      better: 2,
      icon: Clock,
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 h-full overflow-hidden">
        {/* Header */}
        <div className="mb-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/wealth-advisor")}
            className="mb-2 text-foreground/80 hover:text-foreground h-8 text-sm"
          >
            <ArrowLeft className="mr-2 h-3 w-3" />
            Back to Wealth Advisor
          </Button>
          
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Strategy Comparison</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Side-by-side analysis of your home purchase options
          </p>
        </div>

        {/* Dream House Goal */}
        <Card className="mb-3 bg-card/80 backdrop-blur-md border-border">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-3 text-foreground">
              <img src={dreamHouse} alt="Dream House" className="w-24 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-base">Dream Home Goal</span>
                  <span className="text-xl font-bold text-primary">$50,000</span>
                </div>
                <p className="text-xs text-muted-foreground font-normal">
                  Down payment needed within 6 months
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Main Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-3 mb-3 h-[calc(100vh-280px)]">
          {options.map((option) => (
            <Card
              key={option.id}
              className="bg-card/80 backdrop-blur-md border-2 border-border hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <CardHeader className={`bg-gradient-to-br ${option.bgGradient} border-b border-border p-3`}>
                <CardTitle className="text-foreground text-base">
                  <div className="flex items-center justify-between mb-1">
                    <span>{option.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        option.riskLevel === "Low"
                          ? "bg-primary/20 text-primary"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {option.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-xs font-normal text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-3 pb-3 space-y-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {/* Strategy Details */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1 text-sm">
                    <PiggyBank className="h-3 w-3 text-primary" />
                    Strategy Details
                  </h4>
                  <ul className="space-y-1">
                    {option.details.map((detail, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cash Flow Breakdown */}
                <div className="p-2 bg-muted/50 rounded-lg space-y-1">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1 text-sm">
                    <DollarSign className="h-3 w-3 text-primary" />
                    Cash Flow
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Immediate Cash:</span>
                      <span className="font-semibold text-foreground">
                        ${option.cashFlow.immediate.toLocaleString()}
                      </span>
                    </div>
                    {option.cashFlow.loan > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Loan Amount:</span>
                          <span className="font-semibold text-foreground">
                            ${option.cashFlow.loan.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Payment:</span>
                          <span className="font-semibold text-foreground">
                            ${option.cashFlow.monthlyPayment.toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between pt-1 border-t border-border">
                      <span className="text-foreground font-medium">Total Cost:</span>
                      <span className="font-bold text-primary">
                        ${option.cashFlow.totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pros */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1 text-sm">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    Advantages
                  </h4>
                  <ul className="space-y-1">
                    {option.pros.map((pro, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1 text-sm">
                    <AlertCircle className="h-3 w-3 text-destructive" />
                    Considerations
                  </h4>
                  <ul className="space-y-1">
                    {option.cons.map((con, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <AlertCircle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Time to Ready */}
                <div className="p-2 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Time to Ready
                    </span>
                    <span className="font-bold text-primary text-xs">{option.timeToReady}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Metrics Table & Recommendation */}
        <div className="grid md:grid-cols-2 gap-3">
          <Card className="bg-card/80 backdrop-blur-md border-border overflow-hidden flex flex-col">
            <CardHeader className="p-3">
              <CardTitle className="text-foreground flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 font-semibold text-foreground text-xs">Metric</th>
                      <th className="text-center py-2 px-2 font-semibold text-foreground text-xs">
                        Strategic
                      </th>
                      <th className="text-center py-2 px-2 font-semibold text-foreground text-xs">
                        Aggressive
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-2 px-2">
                            <div className="flex items-center gap-1 text-foreground font-medium text-xs">
                              <Icon className="h-3 w-3 text-primary" />
                              {metric.metric}
                            </div>
                          </td>
                          <td
                            className={`text-center py-2 px-2 font-semibold text-xs ${
                              metric.better === 1 ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              {metric.option1}
                              {metric.better === 1 && (
                                <CheckCircle2 className="h-3 w-3 text-primary" />
                              )}
                            </div>
                          </td>
                          <td
                            className={`text-center py-2 px-2 font-semibold text-xs ${
                              metric.better === 2 ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              {metric.option2}
                              {metric.better === 2 && (
                                <CheckCircle2 className="h-3 w-3 text-primary" />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Card */}
          <Card className="bg-gradient-to-br from-destructive/20 to-destructive/5 backdrop-blur-md border-destructive/50 overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <div className="flex items-start gap-3 h-full">
                <Sparkles className="h-5 w-5 text-destructive flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-base text-foreground mb-2">
                    Advisor Recommendation
                  </h3>
                  <p className="text-muted-foreground mb-3 text-xs">
                    Based on your immediate timeline and goal to own your home outright, we recommend the{" "}
                    <span className="font-semibold text-destructive">Aggressive Liquidation</span> approach. This strategy provides immediate purchasing power with no debt obligations, allowing you to secure your dream home faster and save on interest costs in the long run.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => navigate("/wealth-advisor?showAggressive=true")}
                      size="sm"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      View Aggressive Details
                    </Button>
                    <Button
                      onClick={() => navigate("/wealth-advisor?showStrategic=true")}
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted"
                    >
                      View Strategic Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StrategyComparison;
