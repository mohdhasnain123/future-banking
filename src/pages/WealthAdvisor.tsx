import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Bitcoin, 
  Building2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  PiggyBank,
  Shield,
  Clock,
  Car
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import dreamHouse from "@/assets/dream-house.jpg";

const WealthAdvisor = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentAssets = {
    crypto: 25000,
    digitalRealEstate: 18000,
    savings: 12000,
    total: 55000
  };

  const houseGoal = {
    target: 50000,
    downPayment: 50000,
    timeframe: "6 months"
  };

  const options = [
    {
      id: 1,
      name: "Conservative Approach",
      description: "Gradual liquidation with minimal market risk",
      strategy: "Partial Liquidation",
      details: [
        "Liquidate 60% of crypto assets ($15,000)",
        "Keep digital real estate as collateral",
        "Use existing savings ($12,000)",
        "Small personal loan ($23,000) at 4.5% APR"
      ],
      pros: [
        "Maintain most digital asset exposure",
        "Lower immediate tax burden",
        "Flexible repayment terms",
        "Keep appreciation potential"
      ],
      cons: [
        "Monthly loan payments ($425/month)",
        "Interest costs over time (~$2,300)",
        "Longer debt commitment (5 years)"
      ],
      cashFlow: {
        immediate: 27000,
        loan: 23000,
        monthlyPayment: 425,
        totalCost: 52300
      },
      riskLevel: "Low",
      timeToReady: "2 weeks",
      color: "hsl(142, 76%, 36%)"
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
        "No loan needed"
      ],
      pros: [
        "No debt or interest payments",
        "Immediate purchasing power",
        "Full ownership from day one",
        "No monthly obligations"
      ],
      cons: [
        "Lose all digital asset positions",
        "Potential capital gains tax (~$4,000)",
        "Miss future appreciation",
        "Reduced portfolio diversification"
      ],
      cashFlow: {
        immediate: 55000,
        loan: 0,
        monthlyPayment: 0,
        totalCost: 51000
      },
      riskLevel: "High",
      timeToReady: "1 week",
      color: "hsl(0, 70%, 60%)"
    }
  ];

  const comparisonMetrics = [
    {
      metric: "Total Cost",
      option1: "$52,300",
      option2: "$51,000",
      better: 2
    },
    {
      metric: "Asset Retention",
      option1: "40% retained",
      option2: "0% retained",
      better: 1
    },
    {
      metric: "Monthly Burden",
      option1: "$425/month",
      option2: "$0/month",
      better: 2
    },
    {
      metric: "Tax Impact",
      option1: "~$1,500",
      option2: "~$4,000",
      better: 1
    },
    {
      metric: "Time to Ready",
      option1: "2 weeks",
      option2: "1 week",
      better: 2
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Fixed Header Section - Non-scrollable */}
        <div className="sticky top-0 z-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm p-8 pb-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigate("/updated-calendar")}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Calendar</span>
                </button>
                <Button
                  onClick={() => navigate("/cab-booking", { state: { wealthAdvisorCompleted: true } })}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  Cab Booking
                </Button>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Wealth Advisor Consultation</h1>
              <p className="text-white/70 text-lg">Strategic planning for your dream home purchase</p>
            </div>

            {/* Wealth Advisor Video & Blockchain Info - Non-scrollable */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Video Call */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black/40 rounded-lg overflow-hidden">
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="text-white font-semibold">Sarah Chen, CFP</p>
                    <p className="text-white/70 text-sm">Senior Wealth Advisor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Info */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Secure Data Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Blockchain-Protected Records</p>
                    <p className="text-white/70 text-sm">Your financial records are shared via blockchain wallet with time-bound read access only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Time-Limited Access</p>
                    <p className="text-white/70 text-sm">Access expires in 24 hours after consultation</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                  <p className="text-white/60 text-xs mb-1">Access Token</p>
                  <p className="text-white text-sm font-mono break-all">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</p>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified & Encrypted</span>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 pt-0">
          <div className="max-w-7xl mx-auto">
          {/* Dream House Image */}
          <div className="mb-8 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <img 
              src={dreamHouse} 
              alt="Your Dream House" 
              className="w-full h-[400px] object-cover"
            />
            <div className="bg-glass-bg/80 backdrop-blur-md p-6 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Your Dream Home</h2>
                  <p className="text-white/70">Modern luxury residence with premium amenities</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">${houseGoal.target.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">Down Payment Required</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Assets Overview */}
          <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PiggyBank className="w-6 h-6" />
                Current Asset Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <Bitcoin className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">${currentAssets.crypto.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">Crypto Assets</p>
                </div>
                <div className="text-center">
                  <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">${currentAssets.digitalRealEstate.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">Digital Real Estate</p>
                </div>
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">${currentAssets.savings.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">Savings</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">${currentAssets.total.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">Total Assets</p>
                </div>
              </div>
              <Progress value={(currentAssets.total / houseGoal.target) * 100} className="h-3" />
              <p className="text-center text-white/70 mt-2">
                You have {Math.round((currentAssets.total / houseGoal.target) * 100)}% of the required down payment
              </p>
            </CardContent>
          </Card>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {options.map((option) => (
              <Card
                key={option.id}
                className={`bg-glass-bg/80 backdrop-blur-md border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedOption === option.id 
                    ? 'border-primary shadow-2xl shadow-primary/30' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white mb-2">{option.name}</CardTitle>
                      <p className="text-white/60 text-sm">{option.description}</p>
                    </div>
                    {selectedOption === option.id && (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      option.riskLevel === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {option.riskLevel} Risk
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {option.timeToReady}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Strategy Details */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Strategy Breakdown
                    </h4>
                    <ul className="space-y-2">
                      {option.details.map((detail, idx) => (
                        <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cash Flow */}
                  <div className="bg-black/20 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Immediate Cash</span>
                      <span className="text-green-400 font-semibold">${option.cashFlow.immediate.toLocaleString()}</span>
                    </div>
                    {option.cashFlow.loan > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Loan Amount</span>
                          <span className="text-orange-400 font-semibold">${option.cashFlow.loan.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Monthly Payment</span>
                          <span className="text-white font-semibold">${option.cashFlow.monthlyPayment}/mo</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                      <span className="text-white/60">Total Cost</span>
                      <span className="text-white font-bold">${option.cashFlow.totalCost.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pros */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Advantages
                    </h4>
                    <ul className="space-y-1">
                      {option.pros.map((pro, idx) => (
                        <li key={idx} className="text-green-400/80 text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      Considerations
                    </h4>
                    <ul className="space-y-1">
                      {option.cons.map((con, idx) => (
                        <li key={idx} className="text-red-400/80 text-sm flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Side-by-Side Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/70 py-3 px-4">Metric</th>
                      <th className="text-center text-white/70 py-3 px-4">Conservative</th>
                      <th className="text-center text-white/70 py-3 px-4">Aggressive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonMetrics.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="text-white py-4 px-4 font-medium">{row.metric}</td>
                        <td className={`text-center py-4 px-4 ${row.better === 1 ? 'text-green-400 font-semibold' : 'text-white/70'}`}>
                          {row.option1}
                          {row.better === 1 && <span className="ml-2">✓</span>}
                        </td>
                        <td className={`text-center py-4 px-4 ${row.better === 2 ? 'text-green-400 font-semibold' : 'text-white/70'}`}>
                          {row.option2}
                          {row.better === 2 && <span className="ml-2">✓</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Action Button */}
          {selectedOption && (
            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={() => {
                  // This would typically proceed to next steps
                  alert(`You selected: ${options.find(o => o.id === selectedOption)?.name}`);
                }}
              >
                Proceed with {options.find(o => o.id === selectedOption)?.name}
              </Button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthAdvisor;
