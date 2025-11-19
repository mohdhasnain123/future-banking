import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Database,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import dreamHouse from "@/assets/dream-house.jpg";
import { formatDate, formatTime } from "@/components/utils";

import video1 from "@/assets/videos/wealth_advisor_1.mp4";
import video2 from "@/assets/videos/wealth_advisor_2.mp4";
import video3 from "@/assets/videos/wealth_advisor_3.mp4";
import video4 from "@/assets/videos/wealth_advisor_4.mp4";
import video5 from "@/assets/videos/wealth_advisor_5.mp4";
import video6 from "@/assets/videos/wealth_advisor_6.mp4";

interface WealthAdvisorProps {
  videoRefs: React.RefObject<HTMLVideoElement>[];
  onVideoEnd: (index: number) => void;
  speakingState: {
    vick: boolean;
    dot: boolean;
  };
}

const WealthAdvisor: React.FC<WealthAdvisorProps> = ({
  videoRefs,
  onVideoEnd,
  speakingState,
}) => {
  const navigate = useNavigate();
  const [strategicOpen, setStrategicOpen] = useState(false);
  const [aggressiveOpen, setAggressiveOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [conversationStep, setConversationStep] = useState(0);
  const [preloadedVideos, setPreloadedVideos] = useState<HTMLVideoElement[]>(
    []
  );

  const videos = [video1, video2, video3, video4, video5, video6];
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { vick, dot } = speakingState;

  //console.log("speaking state =", speakingState);

  // Step-by-step highlighting effect for data flow
  useEffect(() => {
    const highlightSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 9 steps total
    const stepDuration = 10000 / highlightSteps.length; // ~1.1s per step

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < highlightSteps.length) {
        setHighlightIndex(highlightSteps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setHighlightIndex(-1);
        setIsProcessing(false);
        setShowButtons(true);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // 🧠 Preload next video in background
  useEffect(() => {
    if (conversationStep < videos.length - 1) {
      const nextVideo = document.createElement("video");
      nextVideo.src = videos[conversationStep + 1];
      nextVideo.preload = "auto";
      nextVideo.load();
      setPreloadedVideos((prev) => [...prev, nextVideo]);
    }
  }, [conversationStep]);

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

  const DIALOG_AUTO_CLOSE_MS = 10000;

  // Auto-close Strategic Dialog
  useEffect(() => {
    if (strategicOpen) {
      const timer = setTimeout(
        () => setStrategicOpen(false),
        DIALOG_AUTO_CLOSE_MS
      );
      return () => clearTimeout(timer);
    }
  }, [strategicOpen]);

  // Auto-close Aggressive Dialog
  useEffect(() => {
    if (aggressiveOpen) {
      const timer = setTimeout(
        () => setAggressiveOpen(false),
        DIALOG_AUTO_CLOSE_MS
      );
      return () => clearTimeout(timer);
    }
  }, [aggressiveOpen]);

  // Auto-close Comparison Dialog
  useEffect(() => {
    if (comparisonOpen) {
      const timer = setTimeout(
        () => setComparisonOpen(false),
        DIALOG_AUTO_CLOSE_MS
      );
      return () => clearTimeout(timer);
    }
  }, [comparisonOpen]);

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

  const handleVideoEnded = (index: number) => {
    onVideoEnd(index); // send index to App
    if (index < videos.length - 1) {
      setConversationStep(index + 1); // show next video
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden max-w-8xl mx-auto w-full h-screen flex flex-col mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Header Section */}
      <div className="w-full z-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm pt-4 pb-2">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
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
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="relative z-10 flex-1 px-4 py-4">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 h-full">
          {/* Left Column: Portfolio Management + House Image */}
          <div className="flex flex-col gap-4 h-full">
            {/* Top Half: Vick's Portfolio Data Management (now includes asset info) */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 border-b-2 border-b-primary p-3 flex-1 overflow-y-auto">
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
                      <div
                        className={`bg-blue-600/30 border border-blue-400 rounded p-1 transition-all duration-300 ${
                          highlightIndex === i
                            ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-black/50 scale-110"
                            : ""
                        }`}
                      >
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
                  <div
                    className={`bg-primary/40 border-2 border-primary rounded-lg p-3 shadow-lg shadow-primary/50 transition-all duration-300 ${
                      highlightIndex === 5
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-black/50 scale-110"
                        : ""
                    }`}
                  >
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

                {/* Blockchain Layer with horizontal arrows */}
                <div className="flex justify-center items-center gap-2 mb-1">
                  <div className="flex-1 flex justify-end">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                  </div>
                  <div
                    className={`bg-purple-600/40 border-2 border-purple-400 rounded-lg p-3 shadow-lg shadow-purple-500/50 transition-all duration-300 ${
                      highlightIndex === 6
                        ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-black/50 scale-110"
                        : ""
                    }`}
                  >
                    <div className="text-white text-xs font-bold text-center">
                      🔗 Blockchain Layer
                    </div>
                    <div className="text-white/80 text-xs text-center">
                      Immutable Records
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
                  </div>
                </div>
                <div className="flex justify-center mb-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-purple-600 to-pink-600"></div>
                </div>

                {/* AI Wealth Manager - with processing animation */}
                <div className="flex justify-center mb-1">
                  <div
                    className={`bg-pink-600/40 border-2 border-pink-400 rounded-lg p-3 shadow-lg shadow-pink-500/50 transition-all duration-300 ${
                      highlightIndex === 7
                        ? "ring-2 ring-pink-400 ring-offset-2 ring-offset-black/50 scale-110"
                        : ""
                    } ${isProcessing ? "animate-pulse" : ""}`}
                  >
                    <div className="text-white text-xs font-bold text-center">
                      🤖 AI Wealth Manager
                    </div>
                    <div className="text-white/80 text-xs text-center">
                      Intelligence Engine
                      {highlightIndex === 7 && <span className="ml-1">⚡</span>}
                    </div>
                  </div>
                </div>

                {/* Arrow from AI to outputs */}
                <div className="flex justify-center mb-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-pink-600 to-green-500"></div>
                </div>

                {/* Bottom Layer - Analytics Outputs (moved to separate row) */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { icon: "📊", label: "Cash Flow", sub: "Analysis" },
                    { icon: "🛡️", label: "Risk", sub: "Profiling" },
                  ].map((output, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`bg-green-600/30 border border-green-400 rounded p-2 transition-all duration-300 ${
                          highlightIndex === 8
                            ? "ring-2 ring-green-400 ring-offset-2 ring-offset-black/50 scale-110"
                            : ""
                        }`}
                      >
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

              <div className="bg-black/30 rounded-lg p-3 border border-primary/30">
                <h4 className="text-white text-xs font-bold mb-2 flex items-center gap-1">
                  <PiggyBank className="w-3 h-3" />
                  Current Asset Allocation
                </h4>

                {/* Make all info appear in a single horizontal row */}
                <div className="flex justify-between items-center text-center gap-3">
                  <div className="flex flex-col items-center">
                    <Bitcoin className="w-4 h-4 text-orange-400 mb-0.5" />
                    <p className="text-xs font-bold text-white">
                      ${currentAssets.crypto.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-xs">Crypto</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <Building2 className="w-4 h-4 text-blue-400 mb-0.5" />
                    <p className="text-xs font-bold text-white">
                      ${currentAssets.digitalRealEstate.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-xs">Real Estate</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <DollarSign className="w-4 h-4 text-green-400 mb-0.5" />
                    <p className="text-xs font-bold text-white">
                      ${currentAssets.savings.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-xs">Savings</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <TrendingUp className="w-4 h-4 text-purple-400 mb-0.5" />
                    <p className="text-xs font-bold text-white">
                      ${currentAssets.total.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-xs">Total</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bottom: Dream Home Image with action buttons */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 relative flex-1">
              <CardContent className="p-0 h-full">
                {/* Action Buttons - appear after processing */}
                {showButtons && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 animate-in fade-in slide-in-from-right duration-500">
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
                )}
                {/* Dream Home Image */}
                <div className="relative rounded-lg overflow-hidden h-full">
                  <img
                    src={dreamHouse}
                    alt="Your Dream House"
                    className="w-full h-full object-cover"
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

          {/* Right Column: Secure Data Access + Home Goals + Video */}
          <div className="flex flex-col gap-4 h-full">
            {/* Top Row: Secure Data Access and Home Goals */}
            <div className="grid grid-cols-2 gap-4">
              {/* Secure Data Access */}
              <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    Secure Data Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/20 p-1 rounded-lg">
                      <Shield className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-0.5 text-xs">
                        Blockchain-Protected
                      </p>
                      <p className="text-white/70 text-xs">
                        Time-bound read access
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

              {/* Buy a House Goal */}
              <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2 text-sm">
                    <Home className="w-4 h-4 text-primary" />
                    Buy a House
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-white/60 text-xs">Target Amount</p>
                    <p className="text-white text-lg font-bold">
                      ${houseGoal.target.toLocaleString()}
                    </p>
                  </div>
                  <Progress value={70} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Saved</span>
                    <span className="text-green-400 font-bold">
                      $35,000 (70%)
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Target Date</span>
                    <span className="text-white">Dec, 2046</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Remaining</span>
                    <span className="text-white">$15,000</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Call - Takes Remaining Space */}
            <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 flex-1">
              <CardContent className="p-2 h-full">
                <div className="flex flex-col w-full h-full gap-2">
                  {/* Pat's Video - Main participant */}
                  <div
                    className={`relative flex-[0.65] bg-black/40 rounded-lg overflow-hidden transition-all duration-300
                    ${
                      isVideoPlaying
                        ? "shadow-[0_0_20px_6px_rgba(200,21,100,1)]"
                        : ""
                    }
                  `}
                  >
                    <AnimatePresence mode="wait">
                      <motion.video
                        key={conversationStep}
                        ref={videoRefs[conversationStep]}
                        src={videos[conversationStep]}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0 }}
                        style={{
                          objectPosition: "57% center",
                        }}
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                        onEnded={() => {
                          setIsVideoPlaying(false);
                          handleVideoEnded(conversationStep);
                        }}
                      />
                    </AnimatePresence>

                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded">
                      <p className="text-white font-semibold text-sm">Pat</p>
                      <p className="text-white/70 text-xs">Wealth Advisor</p>
                    </div>
                  </div>

                  {/* Audio-only Participants: Vick & Dot */}
                  <div className="w-full grid grid-cols-2 gap-2">
                    {/* Vick */}
                    <div className="relative flex flex-col items-center justify-center h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/30 backdrop-blur-sm">
                      <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center mb-1.5 border-2 border-primary/50">
                        <span className="text-white font-bold text-lg">V</span>
                      </div>
                      <p className="text-white font-semibold text-sm">Vick</p>

                      {vick && (
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-white/60 text-xs">Audio</span>
                        </div>
                      )}
                    </div>

                    {/* Dot */}
                    {/* <div className="relative flex flex-col items-center justify-center h-24 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg border border-primary/30 backdrop-blur-sm">
                      <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center mb-1.5 border-2 border-secondary/50">
                        {dot && (
                          //<div className="absolute bottom-2 flex gap-1">
                          <div className="flex gap-1 items-end justify-end">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: ["0.4rem", "1.2rem", "0.4rem"],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                                className="w-1 bg-green-400 rounded-full"
                              />
                            ))}
                          </div>
                        )}
                        <span className="text-white font-bold text-lg">D</span>
                      </div>
                      <p className="text-white font-semibold text-sm">Dot</p>
                    </div> */}
                    <div className="relative flex flex-col items-center justify-center h-24 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg border border-primary/30 backdrop-blur-sm">
                      <div className="relative w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center mb-1.5 border-2 border-secondary/50">
                        {/* Waveform - positioned to the LEFT of the circle, vertically centered */}
                        {dot && (
                          <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex gap-1 items-end">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: ["0.4rem", "1.2rem", "0.4rem"],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                                className="w-1 bg-green-400 rounded-full"
                              />
                            ))}
                          </div>
                        )}
                        <span className="text-white font-bold text-lg">D</span>
                      </div>
                      <p className="text-white font-semibold text-sm">Dot</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Option Comparison
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-white/70">
              Compare both strategies side by side to make an informed decision
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white font-semibold">
                      Metric
                    </th>
                    <th className="text-center py-3 px-4 text-white font-semibold">
                      Strategic Approach
                    </th>
                    <th className="text-center py-3 px-4 text-white font-semibold">
                      Aggressive Liquidation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMetrics.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="py-3 px-4 text-white/80">{item.metric}</td>
                      <td
                        className={`py-3 px-4 text-center ${
                          item.better === 1
                            ? "text-green-400 font-semibold"
                            : "text-white/70"
                        }`}
                      >
                        {item.option1}
                        {item.better === 1 && (
                          <CheckCircle2 className="inline w-4 h-4 ml-2" />
                        )}
                      </td>
                      <td
                        className={`py-3 px-4 text-center ${
                          item.better === 2
                            ? "text-green-400 font-semibold"
                            : "text-white/70"
                        }`}
                      >
                        {item.option2}
                        {item.better === 2 && (
                          <CheckCircle2 className="inline w-4 h-4 ml-2" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="text-green-400">Strategic Approach</span>
                </h4>
                <p className="text-white/70 text-sm">
                  Best for maintaining diversification and long-term wealth
                  building while achieving your house goal.
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="text-red-400">Aggressive Liquidation</span>
                </h4>
                <p className="text-white/70 text-sm">
                  Best for immediate debt-free ownership with maximum short-term
                  liquidity and no ongoing obligations.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WealthAdvisor;
