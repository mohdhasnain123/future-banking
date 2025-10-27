import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
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
  Database,
  Mic,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import dreamHouse from "@/assets/dream-house.jpg";
import { formatDate, formatTime } from "@/components/utils";

const WealthAdvisor = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const navigate = useNavigate();
  const [strategicOpen, setStrategicOpen] = useState(false);
  const [aggressiveOpen, setAggressiveOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showStrategic") === "true") {
      setStrategicOpen(true);
      navigate("/wealth-advisor", { replace: true });
    } else if (params.get("showAggressive") === "true") {
      setAggressiveOpen(true);
      navigate("/wealth-advisor", { replace: true });
    } else if (params.get("showComparison") === "true") {
      setComparisonOpen(true);
      navigate("/wealth-advisor", { replace: true });
    }
  }, [location.search, navigate]);

  const currentAssets = {
    crypto: 25000,
    digitalRealEstate: 18000,
    savings: 12000,
    total: 55000,
  };

  const houseGoal = {
    target: 50000,
    downPayment: 50000,
    timeframe: "6 months",
  };

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
      color: "hsl(142, 76%, 36%)",
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
      color: "hsl(0, 70%, 60%)",
    },
  ];

  const comparisonMetrics = [
    {
      metric: "Total Cost",
      option1: "$52,300",
      option2: "$51,000",
      better: 2,
    },
    {
      metric: "Asset Retention",
      option1: "40% retained",
      option2: "0% retained",
      better: 1,
    },
    {
      metric: "Monthly Burden",
      option1: "$425/month",
      option2: "$0/month",
      better: 2,
    },
    {
      metric: "Tax Impact",
      option1: "~$1,500",
      option2: "~$4,000",
      better: 1,
    },
    {
      metric: "Time to Ready",
      option1: "2 weeks",
      option2: "1 week",
      better: 2,
    },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden max-w-8xl mx-auto w-full h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Top Section: Fixed Height */}
      <div
        className="w-full z-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
        style={{ height: "400px" }}
      >
        <div className="p-2 pb-1 h-full flex flex-col justify-center w-full">
          {/* Header */}
          <div className="mt-16">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h1 className="text-4xl md:text-4xl font-bold text-white">
                    Wealth Advisor Consultation
                  </h1>
                  <p className="text-lg font-medium ml-8">
                    {formatTime("8:00 AM", 180)} | {formatDate(currentTime)}
                  </p>
                </div>
                <p className="text-white/70 text-lg">
                  Strategic planning for your dream home purchase
                </p>
              </div>
              <div className="flex flex-col items-end gap-4">
                {browserSupportsSpeechRecognition && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Mic
                      className={`w-5 h-5 ${
                        listening ? "text-green-400 animate-pulse" : ""
                      }`}
                    />
                    <span>{listening ? "Listening..." : "Mic off"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video Call, Secure Data Access & Dream Home - Horizontal Layout */}
          <div className="grid grid-cols-4 gap-4 mt-10 w-full">
            {/* Video Call */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 col-span-1">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black/40 rounded-lg overflow-hidden">
                  <video
                    className="w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="text-white font-semibold text-sm">
                      Sarah Chen, CFP
                    </p>
                    <p className="text-white/70 text-xs">
                      Senior Wealth Advisor
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Info */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-primary/30 col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4 text-primary" />
                  Secure Data Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/20 p-1.5 rounded-lg">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-0.5 text-sm">
                      Blockchain-Protected Records
                    </p>
                    <p className="text-white/70 text-xs">
                      Your financial records are shared via blockchain wallet
                      with time-bound read access only
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-orange-500/20 p-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-0.5 text-sm">
                      Time-Limited Access
                    </p>
                    <p className="text-white/70 text-xs">
                      Access expires in 24 hours after consultation
                    </p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-2 border border-white/10">
                  <p className="text-white/60 text-xs mb-0.5">Access Token</p>
                  <p className="text-white text-xs font-mono break-all">
                    0x7a250d...F2488D
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified & Encrypted</span>
                </div>
              </CardContent>
            </Card>

            {/* Dream Home Image */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 col-span-2 relative">
              <CardContent className="p-0">
                {/* Action Buttons - Top Right */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <Button
                    onClick={() => setStrategicOpen(true)}
                    className={`bg-black border border-green-400 hover:bg-green-700/20 hover:border-green-500 text-green-400 hover:text-green-500 px-3 py-1 text-sm rounded-lg transition-all ${
                      strategicOpen
                        ? "ring-2 ring-green-300 ring-offset-1 ring-offset-black/50"
                        : ""
                    }`}
                    size="sm"
                  >
                    Strategic
                  </Button>
                  <Button
                    onClick={() => setAggressiveOpen(true)}
                    className={`bg-black border border-green-400 hover:bg-green-700/20 hover:border-green-500 text-green-400 hover:text-green-500 px-3 py-1 text-sm rounded-lg transition-all ${
                      aggressiveOpen
                        ? "ring-2 ring-green-300 ring-offset-1 ring-offset-black/50"
                        : ""
                    }`}
                    size="sm"
                  >
                    Aggressive
                  </Button>
                  <Button
                    onClick={() => setComparisonOpen(true)}
                    className={`bg-black border border-green-400 hover:bg-green-700/20 hover:border-green-500 text-green-400 hover:text-green-500 px-3 py-1 text-sm rounded-lg transition-all ${
                      comparisonOpen
                        ? "ring-2 ring-green-300 ring-offset-1 ring-offset-black/50"
                        : ""
                    }`}
                    size="sm"
                  >
                    Comparison
                  </Button>
                </div>
                {/* Dream Home Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={dreamHouse}
                    alt="Your Dream House"
                    className="w-full h-[250px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <h3 className="text-white font-bold text-sm mb-0.5">
                      Your Dream Home
                    </h3>
                    <p className="text-primary text-lg font-bold">
                      ${houseGoal.target.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-xs">Down Payment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section: Fills Remaining Space, Not Scrollable, Stretched */}
      <div className="relative z-10 flex-1 flex flex-col w-full mt-20">
        <div className="px-2 pt-2 h-full flex flex-col justify-between w-full">
          {/* Current Assets & Portfolio Data Management - Horizontal Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 w-full">
            {/* Right Column: Vick's Portfolio Data Management */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-3">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1">
                <Database className="h-4 w-4 text-primary" />
                Vick's Portfolio Data Management
              </h3>
              <div className="bg-black/30 rounded-lg p-3 border border-primary/30">
                {/* Top Layer - Data Sources */}
                <div className="flex justify-around items-center mb-1">
                  {[
                    {
                      icon: "🏦",
                      label: "Bank",
                      sub: "Balance",
                    },
                    {
                      icon: "💳",
                      label: "Cards",
                      sub: "History",
                    },
                    { icon: "📈", label: "Investment", sub: "Data" },
                    { icon: "🎯", label: "Retirement", sub: "Tracking" },
                    { icon: "💎", label: "Alt Assets", sub: "Crypto" },
                  ].map((source, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="bg-blue-600/30 border border-blue-400 rounded p-1">
                        <div className="text-lg mb-0.5">{source.icon}</div>
                        <div className="text-white text-xs font-semibold text-center">
                          {source.label}
                        </div>
                        <div className="text-white/70 text-xs text-center">
                          {source.sub}
                        </div>
                      </div>
                      <div className="w-0.5 h-3 bg-gradient-to-b from-blue-400 to-purple-500"></div>
                    </div>
                  ))}
                </div>

                {/* Middle Layer - Account Aggregator */}
                <div className="flex justify-center">
                  <div className="bg-primary/40 border-2 border-primary rounded-lg p-3 shadow-lg shadow-primary/50">
                    <div className="text-white text-xs font-bold text-center">
                      Account Aggregator
                    </div>
                    <div className="text-white/80 text-xs text-center">
                      Open API Gateway
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-purple-500 to-purple-600"></div>
                </div>

                {/* Blockchain Layer */}
                <div className="flex justify-center mb-1">
                  <div className="bg-purple-600/40 border-2 border-purple-400 rounded-lg p-3 shadow-lg shadow-purple-500/50">
                    <div className="text-white text-xs font-bold text-center">
                      🔗 Blockchain Layer
                    </div>
                    <div className="text-white/80 text-xs text-center">
                      Immutable Records
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-purple-600 to-pink-600"></div>
                </div>

                {/* AI Wealth Manager */}
                <div className="flex justify-center mb-1">
                  <div className="bg-pink-600/40 border-2 border-pink-400 rounded-lg p-3 shadow-lg shadow-pink-500/50">
                    <div className="text-white text-xs font-bold text-center">
                      🤖 AI Wealth Manager
                    </div>
                    <div className="text-white/80 text-xs text-center">
                      Intelligence Engine
                    </div>
                  </div>
                </div>

                {/* Bottom Layer - Analytics Outputs */}
                <div className="flex justify-around items-center">
                  {[
                    { icon: "📊", label: "Cash Flow", sub: "Analysis" },
                    { icon: "🛡️", label: "Risk", sub: "Profiling" },
                    { icon: "📈", label: "Portfolio", sub: "Performance" },
                    { icon: "⚡", label: "Real-time", sub: "Insights" },
                  ].map((output, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-0.5 h-3 bg-gradient-to-b from-pink-600 to-green-500 mb-1"></div>
                      <div className="bg-green-600/30 border border-green-400 rounded p-2">
                        <div className="text-lg mb-0.5">{output.icon}</div>
                        <div className="text-white text-xs font-semibold text-center">
                          {output.label}
                        </div>
                        <div className="text-white/70 text-xs text-center">
                          {output.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            {/* Left Column: Current Assets + Buttons */}
            <div className="flex flex-col gap-4">
              {/* Current Assets Overview */}
              <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 flex-1 flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <PiggyBank className="w-8 h-8" />
                    Current Asset Position
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4 flex gap-6 flex-1">
                  {/* Left Side - Current Assets */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="text-center">
                        <Bitcoin className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-white">
                          ${currentAssets.crypto.toLocaleString()}
                        </p>
                        <p className="text-white/60 text-xs">Crypto Assets</p>
                      </div>
                      <div className="text-center">
                        <Building2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-white">
                          ${currentAssets.digitalRealEstate.toLocaleString()}
                        </p>
                        <p className="text-white/60 text-xs">
                          Digital Real Estate
                        </p>
                      </div>
                      <div className="text-center">
                        <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-white">
                          ${currentAssets.savings.toLocaleString()}
                        </p>
                        <p className="text-white/60 text-xs">Savings</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-white">
                          ${currentAssets.total.toLocaleString()}
                        </p>
                        <p className="text-white/60 text-xs">Total Assets</p>
                      </div>
                    </div>
                    <Progress
                      value={(currentAssets.total / houseGoal.target) * 100}
                      className="h-2"
                    />
                    <p className="text-center text-white/70 mt-2 text-xs">
                      You have{" "}
                      {Math.round((currentAssets.total / houseGoal.target) * 100)}
                      % of the required down payment
                    </p>
                  </div>

                  {/* Right Side - Wealth Projection Graph */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-white text-xs font-semibold mb-3">Wealth Projection Over Years</h4>
                    <svg viewBox="0 0 300 150" className="w-full h-full">
                      {/* Grid lines */}
                      <line x1="40" y1="10" x2="40" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <line x1="40" y1="130" x2="290" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      
                      {/* Y-axis labels */}
                      <text x="5" y="15" fill="rgba(255,255,255,0.6)" fontSize="8">$100k</text>
                      <text x="10" y="55" fill="rgba(255,255,255,0.6)" fontSize="8">$75k</text>
                      <text x="10" y="95" fill="rgba(255,255,255,0.6)" fontSize="8">$50k</text>
                      <text x="10" y="135" fill="rgba(255,255,255,0.6)" fontSize="8">$25k</text>
                      
                      {/* X-axis labels */}
                      <text x="35" y="145" fill="rgba(255,255,255,0.6)" fontSize="8">2024</text>
                      <text x="95" y="145" fill="rgba(255,255,255,0.6)" fontSize="8">2025</text>
                      <text x="155" y="145" fill="rgba(255,255,255,0.6)" fontSize="8">2026</text>
                      <text x="215" y="145" fill="rgba(255,255,255,0.6)" fontSize="8">2027</text>
                      <text x="270" y="145" fill="rgba(255,255,255,0.6)" fontSize="8">2028</text>
                      
                      {/* Line graph - wealth projection */}
                      <polyline
                        points="40,80 100,65 160,55 220,35 280,20"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                      />
                      
                      {/* Data points */}
                      <circle cx="40" cy="80" r="3" fill="#22c55e" />
                      <circle cx="100" cy="65" r="3" fill="#22c55e" />
                      <circle cx="160" cy="55" r="3" fill="#22c55e" />
                      <circle cx="220" cy="35" r="3" fill="#22c55e" />
                      <circle cx="280" cy="20" r="3" fill="#22c55e" />
                      
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area fill under line */}
                      <polygon
                        points="40,80 100,65 160,55 220,35 280,20 280,130 40,130"
                        fill="url(#areaGradient)"
                        opacity="0.2"
                      />
                      
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Dialog */}
      <Dialog open={strategicOpen} onOpenChange={setStrategicOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {options[0].name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-white/70">{options[0].description}</p>

            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                {options[0].riskLevel} Risk
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {options[0].timeToReady}
              </span>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Strategy Breakdown
              </h4>
              <ul className="space-y-2">
                {options[0].details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-white/70 text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Immediate Cash</span>
                <span className="text-green-400 font-semibold">
                  ${options[0].cashFlow.immediate.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Loan Amount</span>
                <span className="text-orange-400 font-semibold">
                  ${options[0].cashFlow.loan.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Monthly Payment</span>
                <span className="text-white font-semibold">
                  ${options[0].cashFlow.monthlyPayment}/mo
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                <span className="text-white/60">Total Cost</span>
                <span className="text-white font-bold">
                  ${options[0].cashFlow.totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Advantages
              </h4>
              <ul className="space-y-1">
                {options[0].pros.map((pro, idx) => (
                  <li
                    key={idx}
                    className="text-green-400/80 text-sm flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                Considerations
              </h4>
              <ul className="space-y-1">
                {options[0].cons.map((con, idx) => (
                  <li
                    key={idx}
                    className="text-red-400/80 text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Aggressive Dialog */}
      <Dialog open={aggressiveOpen} onOpenChange={setAggressiveOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {options[1].name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-white/70">{options[1].description}</p>

            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                {options[1].riskLevel} Risk
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {options[1].timeToReady}
              </span>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Strategy Breakdown
              </h4>
              <ul className="space-y-2">
                {options[1].details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-white/70 text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black/20 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Immediate Cash</span>
                <span className="text-green-400 font-semibold">
                  ${options[1].cashFlow.immediate.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                <span className="text-white/60">Total Cost</span>
                <span className="text-white font-bold">
                  ${options[1].cashFlow.totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Advantages
              </h4>
              <ul className="space-y-1">
                {options[1].pros.map((pro, idx) => (
                  <li
                    key={idx}
                    className="text-green-400/80 text-sm flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                Considerations
              </h4>
              <ul className="space-y-1">
                {options[1].cons.map((con, idx) => (
                  <li
                    key={idx}
                    className="text-red-400/80 text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comparison Dialog */}
      <Dialog open={comparisonOpen} onOpenChange={setComparisonOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Side-by-Side Comparison
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white/80">
                      Metric
                    </th>
                    <th className="text-left py-3 px-4 text-white/80">
                      Conservative
                    </th>
                    <th className="text-left py-3 px-4 text-white/80">
                      Aggressive
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMetrics.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      <td className="py-3 px-4 text-white font-semibold">
                        {row.metric}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          row.better === 1
                            ? "text-green-400 font-semibold"
                            : "text-white/70"
                        }`}
                      >
                        {row.option1}
                        {row.better === 1 && (
                          <CheckCircle2 className="inline w-4 h-4 ml-2" />
                        )}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          row.better === 2
                            ? "text-green-400 font-semibold"
                            : "text-white/70"
                        }`}
                      >
                        {row.option2}
                        {row.better === 2 && (
                          <CheckCircle2 className="inline w-4 h-4 ml-2" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WealthAdvisor;
