import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Calendar,
  PiggyBank,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import mountainBg from "@/assets/mountain-bg.jpg";
import dreamHouse from "@/assets/dream-house.jpg";

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
    ],
    cons: [
      "Monthly loan payments ($425/month)",
      "Interest costs over time (~$2,300)",
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
    ],
    cons: [
      "Lose all digital asset positions",
      "Potential capital gains tax (~$4,000)",
      "Miss future appreciation",
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

// Correct Framer Motion variants for staggered animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * custom,
      duration: 0.7,
      type: "spring",
    },
  }),
};

const StrategyComparison = () => {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: "1600px" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      {/* Content */}
      <div
        className="relative z-10 container mx-auto px-1 py-1"
        style={{
          height: "1600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "2px",
        }}
      >
        {/* Header */}
        <div className="mb-0 flex flex-col gap-0.5">
          <div className="flex items-center gap-0.5 mb-0">
            <Sparkles className="w-2 h-2 text-primary" />
            <h1 className="text-[6px] font-bold text-foreground">
              Strategy Comparison
            </h1>
          </div>
          <p className="text-muted-foreground text-[6px] mb-0">
            Comprehensive side-by-side analysis of your home purchase options
          </p>
        </div>
        {/* Dream House Goal */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-card/80 backdrop-blur-md border-border rounded-sm p-0.5">
            <CardHeader className="p-0.5">
              <CardTitle className="flex items-center gap-0.5 text-foreground">
                <img
                  src={dreamHouse}
                  alt="Dream House"
                  className="w-full h-10 object-cover rounded-sm mb-0"
                  style={{ maxHeight: "48px" }}
                />
                <div className="space-y-0.5 w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-[6px]">Dream Home Goal</span>
                    <span className="text-[6px] font-bold text-primary">
                      $50,000
                    </span>
                  </div>
                  <p className="text-[6px] text-muted-foreground font-normal mb-0">
                    Down payment needed within 6 months
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        {/* Main Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-0.5">
          {options.map((option, idx) => (
            <motion.div
              key={option.id}
              custom={idx + 1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card className="bg-card/80 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 rounded-sm p-0.5">
                <CardHeader
                  className={`bg-gradient-to-br ${option.bgGradient} border-b border-border p-0.5`}
                >
                  <CardTitle className="text-foreground">
                    <div className="flex items-center justify-between mb-0">
                      <span className="text-[6px]">{option.name}</span>
                      <span
                        className={`text-[6px] px-1 py-0.5 rounded-sm ${
                          option.riskLevel === "Low"
                            ? "bg-primary/20 text-primary"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {option.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-[6px] font-normal text-muted-foreground mt-0.5 mb-0">
                      {option.description}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0.5 pb-0 p-0.5">
                  {/* Strategy Details */}
                  <div className="mb-0">
                    <h4 className="font-semibold text-foreground mb-0 flex items-center gap-0.5 text-[6px]">
                      <PiggyBank className="w-2 h-2 text-primary" />
                      Strategy Details
                    </h4>
                    <ul className="space-y-0.5 mb-0">
                      {option.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-[6px] text-muted-foreground flex items-start gap-0.5 mb-0"
                        >
                          <CheckCircle2 className="w-1.5 h-1.5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cash Flow Breakdown */}
                  <div className="p-0.5 bg-muted/50 rounded-sm mb-0">
                    <h4 className="font-semibold text-foreground mb-0 flex items-center gap-0.5 text-[6px]">
                      <DollarSign className="w-2 h-2 text-primary" />
                      Cash Flow Analysis
                    </h4>
                    <div className="space-y-0.5 text-[6px] mb-0">
                      <div className="flex justify-between mb-0">
                        <span className="text-muted-foreground">
                          Immediate Cash:
                        </span>
                        <span className="font-semibold text-foreground">
                          ${option.cashFlow.immediate.toLocaleString()}
                        </span>
                      </div>
                      {option.cashFlow.loan > 0 && (
                        <>
                          <div className="flex justify-between mb-0">
                            <span className="text-muted-foreground">
                              Loan Amount:
                            </span>
                            <span className="font-semibold text-foreground">
                              ${option.cashFlow.loan.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between mb-0">
                            <span className="text-muted-foreground">
                              Monthly Payment:
                            </span>
                            <span className="font-semibold text-foreground">
                              ${option.cashFlow.monthlyPayment.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between pt-0.5 border-t border-border mb-0">
                        <span className="text-foreground font-medium">
                          Total Cost:
                        </span>
                        <span className="font-bold text-primary">
                          ${option.cashFlow.totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Pros */}
                  <div className="mb-0">
                    <h4 className="font-semibold text-foreground mb-0 flex items-center gap-0.5 text-[6px]">
                      <TrendingUp className="w-2 h-2 text-primary" />
                      Advantages
                    </h4>
                    <ul className="space-y-0.5 mb-0">
                      {option.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="text-[6px] text-muted-foreground flex items-start gap-0.5 mb-0"
                        >
                          <CheckCircle2 className="w-1.5 h-1.5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cons */}
                  <div className="mb-0">
                    <h4 className="font-semibold text-foreground mb-0 flex items-center gap-0.5 text-[6px]">
                      <AlertCircle className="w-2 h-2 text-destructive" />
                      Considerations
                    </h4>
                    <ul className="space-y-0.5 mb-0">
                      {option.cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="text-[6px] text-muted-foreground flex items-start gap-0.5 mb-0"
                        >
                          <AlertCircle className="w-1.5 h-1.5 text-destructive mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Time to Ready */}
                  <div className="p-0.5 bg-primary/10 rounded-sm mb-0">
                    <div className="flex items-center justify-between mb-0">
                      <span className="text-[6px] font-medium text-foreground flex items-center gap-0.5">
                        <Clock className="w-1.5 h-1.5" />
                        Time to Ready
                      </span>
                      <span className="font-bold text-primary text-[6px]">
                        {option.timeToReady}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Comparison Metrics Table */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-card/80 backdrop-blur-md border-border rounded-sm p-0.5 mb-0">
            <CardHeader className="p-0.5 mb-0">
              <CardTitle className="text-foreground flex items-center gap-0.5 text-[6px] mb-0 pb-0">
                <Sparkles className="w-2 h-2 text-primary" />
                Key Metrics Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0.5 pt-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[6px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-0.5 px-1 font-semibold text-foreground text-[6px] mb-0 pb-0">
                        Metric
                      </th>
                      <th className="text-center py-0.5 px-1 font-semibold text-foreground text-[6px] mb-0 pb-0">
                        Strategic Approach
                      </th>
                      <th className="text-center py-0.5 px-1 font-semibold text-foreground text-[6px] mb-0 pb-0">
                        Aggressive Liquidation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <tr
                          key={idx}
                          className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-0.5 px-1 mb-0 pb-0">
                            <div className="flex items-center gap-0.5 text-foreground font-medium mb-0 pb-0">
                              <Icon className="w-1.5 h-1.5 text-primary" />
                              {metric.metric}
                            </div>
                          </td>
                          <td
                            className={`text-center py-0.5 px-1 font-semibold ${
                              metric.better === 1
                                ? "text-primary"
                                : "text-muted-foreground"
                            } mb-0 pb-0`}
                          >
                            <div className="flex items-center justify-center gap-0.5 mb-0 pb-0">
                              {metric.option1}
                              {metric.better === 1 && (
                                <CheckCircle2 className="w-1.5 h-1.5 text-primary" />
                              )}
                            </div>
                          </td>
                          <td
                            className={`text-center py-0.5 px-1 font-semibold ${
                              metric.better === 2
                                ? "text-primary"
                                : "text-muted-foreground"
                            } mb-0 pb-0`}
                          >
                            <div className="flex items-center justify-center gap-0.5 mb-0 pb-0">
                              {metric.option2}
                              {metric.better === 2 && (
                                <CheckCircle2 className="w-1.5 h-1.5 text-primary" />
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
        </motion.div>
        {/* Recommendation Card */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md border-primary/50 rounded-sm p-0.5">
            <CardContent className="p-0.5 pt-0 pb-0">
              <div className="flex items-start gap-0.5">
                <Sparkles className="w-2 h-2 text-primary flex-shrink-0 mt-0" />
                <div>
                  <h3 className="font-bold text-[6px] text-foreground mb-0 pb-0">
                    Advisor Recommendation
                  </h3>
                  <p className="text-muted-foreground mb-0 pb-0 text-[6px]">
                    Based on your immediate timeline and goal to own your home
                    outright, we recommend the{" "}
                    <span className="font-semibold text-destructive">
                      Aggressive Liquidation
                    </span>{" "}
                    approach. This strategy provides immediate purchasing power
                    with no debt obligations, allowing you to secure your dream
                    home faster and save on interest costs in the long run.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StrategyComparison;
