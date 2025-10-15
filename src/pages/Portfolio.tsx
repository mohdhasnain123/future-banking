import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Bitcoin,
  Globe,
  Building2,
  ShoppingCart,
  CreditCard,
  Plane,
  Mic,
  Send,
  Heart,
  Coffee,
  ArrowLeft,
  Shield,
  Leaf,
  Home,
  Car,
  Briefcase,
  Heart as HeartIcon,
  TreePine,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";

interface Activity {
  id: string;
  name: string;
  category: string;
  amount: number;
  time: string;
  icon: any;
}

interface Goal {
  name: string;
  current: number;
  target: number;
  progress: number;
}

const Portfolio = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const assets = [
    {
      name: "Global Equities",
      amount: 85000,
      icon: Globe,
      color: "hsl(220, 70%, 50%)",
    },
    {
      name: "Crypto & NFTs",
      amount: 45000,
      icon: Bitcoin,
      color: "hsl(30, 60%, 70%)",
    },
    {
      name: "Digital Real Estate",
      amount: 54567,
      icon: Building2,
      color: "hsl(142, 76%, 36%)",
    },
  ];

  const activities: Activity[] = [
    {
      id: "1",
      name: "Cyberdyne Systems",
      category: "Tech Subscription",
      amount: -49.99,
      time: "2m ago",
      icon: CreditCard,
    },
    {
      id: "2",
      name: "Orbital Foods",
      category: "Groceries",
      amount: -150.23,
      time: "1h ago",
      icon: ShoppingCart,
    },
    {
      id: "3",
      name: "Incoming Transfer",
      category: "Project payment",
      amount: 2500.0,
      time: "3h ago",
      icon: Send,
    },
    {
      id: "4",
      name: "Mars Transit",
      category: "Transport",
      amount: -25.5,
      time: "yesterday",
      icon: Plane,
    },
    {
      id: "5",
      name: "Solana NFT Mint",
      category: "Digital Assets",
      amount: -350.0,
      time: "yesterday",
      icon: Bitcoin,
    },
  ];

  const goals: Goal[] = [
    { name: "Buy a House", current: 35000, target: 50000, progress: 70 },
    { name: "Retire by 40", current: 30000, target: 100000, progress: 30 },
    { name: "Vacation", current: 1700, target: 2000, progress: 85 },
    {
      name: "Donate to Greenpeace",
      current: 8500,
      target: 10000,
      progress: 85,
    },
    { name: "Pet Cafe", current: 3000, target: 20000, progress: 15 },
  ];

  const projectionData = [
    { year: 2035, value: 180 },
    { year: 2036, value: 200 },
    { year: 2037, value: 240 },
    { year: 2038, value: 280 },
    { year: 2039, value: 320 },
    { year: 2040, value: 360 },
  ];

  const expenseData = [
    {
      category: "Grocery",
      amount: 12000,
      details: "Monthly grocery shopping at organic markets and supermarkets",
      color: "hsl(142, 76%, 36%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "2.3 tons CO₂",
    },
    {
      category: "Apparel",
      amount: 8500,
      details: "Clothing, shoes, and accessories from premium brands",
      color: "hsl(220, 70%, 50%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "1.8 tons CO₂",
    },
    {
      category: "Electronics",
      amount: 15000,
      details: "Latest tech gadgets, smartphones, and home electronics",
      color: "hsl(30, 60%, 70%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "3.5 tons CO₂",
    },
    {
      category: "Entertainment",
      amount: 6500,
      details: "Movies, concerts, subscriptions, and leisure activities",
      color: "hsl(280, 65%, 60%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "0.9 tons CO₂",
    },
    {
      category: "Healthcare",
      amount: 9000,
      details: "Medical expenses, prescriptions, and wellness programs",
      color: "hsl(10, 80%, 60%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "1.2 tons CO₂",
    },
    {
      category: "Transportation",
      amount: 7500,
      details: "Fuel, maintenance, public transport, and ride-sharing",
      color: "hsl(180, 55%, 45%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "4.1 tons CO₂",
    },
    {
      category: "Education",
      amount: 11000,
      details: "Online courses, books, workshops, and certifications",
      color: "hsl(45, 85%, 55%)",
      timeline: "Jan 2025 - Oct 2025",
      carbonFootprint: "0.7 tons CO₂",
    },
  ];

  const insurances = [
    {
      name: "Life Insurance",
      coverage: "$500,000",
      premium: "$89/month",
      icon: HeartIcon,
      status: "Active",
      details: "Comprehensive coverage for your family's future security",
      startDate: "January 15, 2023",
      endDate: "January 15, 2043",
      nextDue: "November 15, 2025",
    },
    {
      name: "Health Insurance",
      coverage: "$2M",
      premium: "$320/month",
      icon: Shield,
      status: "Active",
      details: "Premium health coverage with global network access",
      startDate: "March 1, 2024",
      endDate: "March 1, 2029",
      nextDue: "November 1, 2025",
    },
    {
      name: "Home Insurance",
      coverage: "$750,000",
      premium: "$125/month",
      icon: Home,
      status: "Active",
      details: "Full property protection including natural disasters",
      startDate: "June 10, 2022",
      endDate: "June 10, 2032",
      nextDue: "November 10, 2025",
    },
    {
      name: "Auto Insurance",
      coverage: "$150,000",
      premium: "$95/month",
      icon: Car,
      status: "Active",
      details: "Comprehensive auto coverage with roadside assistance",
      startDate: "February 20, 2023",
      endDate: "February 20, 2026",
      nextDue: "November 20, 2025",
    },
  ];

  const totalNetWorth = 184567.89;
  const gain = 1234.56;
  const previousValue = totalNetWorth - gain;
  const changePct = ((gain / previousValue) * 100).toFixed(1);

  // Helper: pick top 3 assets by amount (or replace with the specific 3 you want)
  const top3Assets = [...assets]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 h-screen overflow-hidden p-3">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}

          <div className="mb-2 flex justify-between items-start text-white/90">
            {/* Date & Time on the left */}
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Portfolio
              </h1>

              <p className="text-sm font-medium">
                {formatTime(currentTime)} | {formatDate(currentTime)}
              </p>
            </div>

            {/* Mic status on the right */}
            {browserSupportsSpeechRecognition && (
              <div className="flex items-center gap-2 text-sm text-white/70 mt-2">
                <Mic
                  className={`w-5 h-5 ${
                    listening ? "text-green-400 animate-pulse" : ""
                  }`}
                />
                <span>{listening ? "Listening..." : "Mic off"}</span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-2 mb-2">
            {/* --- Net Worth small box --- */}

            <Dialog>
              <DialogTrigger asChild>
                <Card className="bg-[hsl(142,76%,36%)]/90 hover:bg-[hsl(142,76%,36%)] transition-all backdrop-blur-sm border-none cursor-pointer">
                  <CardContent className="p-3">
                    <p className="text-white/80 text-[10px] mb-0.5">Net Worth</p>

                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-bold text-white mr-2">
                        $
                        {totalNetWorth.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h2>

                      <Badge className="bg-white/20 text-white border-none text-[10px] px-1.5 py-0.5">
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                        +{changePct}%
                      </Badge>
                    </div>

                    <p className="mt-1 text-[10px] text-white/80">In last 24 h</p>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Net Worth dialog content */}
              <DialogContent className="bg-background/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Total Net Worth Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your total net worth has grown by {changePct}% in the last
                    24 hours.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Previous Value:</span>
                      <span className="font-semibold">
                        $
                        {previousValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span className="font-semibold">
                        $
                        {totalNetWorth.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Gain:</span>
                      <span className="font-semibold">
                        +$
                        {gain.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* --- 3 Asset Allocation boxes --- */}
            {top3Assets.map((asset) => {
              const pct = (asset.amount / totalNetWorth) * 100;
              return (
                <Dialog key={asset.name}>
                  <DialogTrigger asChild>
                    <Card className="bg-glass-bg/60 hover:bg-glass-bg/80 transition-all backdrop-blur-md border-glass-border cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <asset.icon
                            className="w-4 h-4"
                            style={{ color: asset.color }}
                          />
                          <p className="text-white/70 text-[10px]">{asset.name}</p>
                        </div>

                        <div className="flex items-baseline justify-between">
                          <p className="text-base font-bold text-white">
                            ${asset.amount.toLocaleString()}
                          </p>
                          <span className="text-[10px] text-white/80">
                            {pct.toFixed(1)}%
                          </span>
                        </div>

                        {/* Tiny allocation bar */}
                        <div className="mt-2 h-1.5 rounded-full bg-white/15">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(100, pct)}%`,
                              backgroundColor:
                                asset.color || "rgba(255,255,255,0.9)",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  {/* Asset dialog content */}
                  <DialogContent className="bg-background/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>{asset.name}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Current holdings in {asset.name.toLowerCase()}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Value:</span>
                          <span className="font-semibold">
                            ${asset.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>% of Portfolio:</span>
                          <span className="font-semibold">
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          {/* Insurance Coverage Section */}
          <div className="mb-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
              {insurances.map((insurance) => (
                <Dialog key={insurance.name}>
                  <DialogTrigger asChild>
                    <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:scale-105 transition-all perspective-1000 group">
                      <CardContent
                        className="p-2"
                        style={{ transform: "translateZ(8px)" }}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <div
                            className="p-1.5 rounded-lg bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm"
                            style={{ transform: "translateZ(6px)" }}
                          >
                            <insurance.icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <h3 className="text-white font-semibold text-xs">
                            {insurance.name}
                          </h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[9px] px-1 py-0">
                            {insurance.status}
                          </Badge>
                        </div>

                        <div className="space-y-0.5 text-white/70 text-[10px]">
                          <p>
                            Coverage:{" "}
                            <span className="text-white font-semibold">
                              {insurance.coverage}
                            </span>
                          </p>
                          <p>
                            Premium:{" "}
                            <span className="text-white font-semibold">
                              {insurance.premium}
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  {/* Dialog Content remains same */}
                  <DialogContent className="bg-background/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>{insurance.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {insurance.details}
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Coverage Amount:</span>
                          <span className="font-semibold">
                            {insurance.coverage}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Premium:</span>
                          <span className="font-semibold">
                            {insurance.premium}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {insurance.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Cost:</span>
                          <span className="font-semibold">
                            $
                            {(
                              parseFloat(
                                insurance.premium.replace(/[^0-9.]/g, "")
                              ) * 12
                            ).toFixed(0)}
                          </span>
                        </div>
                        <div className="border-t border-border pt-3 mt-3">
                          <div className="flex justify-between mb-2">
                            <span>Start Date:</span>
                            <span className="font-semibold">
                              {insurance.startDate}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>End Date:</span>
                            <span className="font-semibold">
                              {insurance.endDate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next Due Date:</span>
                            <span className="font-semibold text-primary">
                              {insurance.nextDue}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-2 mb-2 flex-1 min-h-0">
            {/* Asset Allocation */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col h-full">
              <CardHeader className="pb-1 px-3 pt-2">
                <CardTitle className="text-white text-sm">
                  Asset Allocation
                </CardTitle>
                <p className="text-white/60 text-[10px]">
                  See How Your Money Moves
                </p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-center px-3 py-1">
                <div className="flex items-center justify-center py-2">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 200 200"
                    className="cursor-pointer"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="hsl(220, 70%, 50%)"
                      strokeWidth="30"
                      strokeDasharray="231 500"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="hsl(30, 60%, 70%)"
                      strokeWidth="30"
                      strokeDasharray="120 500"
                      strokeDashoffset="-231"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth="30"
                      strokeDasharray="150 500"
                      strokeDashoffset="-351"
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-[hsl(220,70%,50%)]" />
                    <span>Equities 46%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-[hsl(30,60%,70%)]" />
                    <span>Crypto & NFTs 24%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-[hsl(142,76%,36%)]" />
                    <span>Digital RE 30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col h-full">
              <CardHeader className="pb-1 px-3 pt-2">
                <CardTitle className="text-white text-sm">Expense Categories</CardTitle>
                <p className="text-white/60 text-[10px]">
                  Detailed breakdown with carbon footprint
                </p>

                {/* ✅ Time Period moved here */}
                <p className="text-[9px] text-blue-300 mt-0.5">
                  Time Period:{" Jan 2025 - Oct 2025"}
                  <span className="font-semibold text-white">
                    {/* dynamic value */}
                  </span>
                </p>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto pr-1 px-3 py-1">
                <div className="space-y-1.5 perspective-1000">
                  {expenseData.map((expense, index) => (
                    <div
                      key={expense.category}
                      className="relative group"
                      style={{
                        transform: `translateZ(${index * 2}px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* 3D Card Container */}
                      <div
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/30 transition-all duration-300"
                        style={{
                          transform: "translateZ(10px)",
                          boxShadow: `0 4px 16px ${expense.color}40`,
                        }}
                      >
                        <div className="flex items-start gap-2">
                          {/* Category Info */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <h3 className="text-white font-semibold text-xs">
                                {expense.category}
                              </h3>
                              <span className="text-xs font-bold text-white">
                                ${expense.amount.toLocaleString()}
                              </span>
                            </div>

                            {/* ✅ Progress Bar + Carbon Footprint side by side */}
                            <div className="grid grid-cols-2 gap-2 mb-1.5">
                              {/* Progress Bar */}
                              <div className="h-full relative h-5 bg-white/10 rounded overflow-hidden">
                                <div
                                  className="absolute inset-0 rounded-lg transition-all duration-500"
                                  style={{
                                    width: `${
                                      (expense.amount /
                                        Math.max(
                                          ...expenseData.map((e) => e.amount)
                                        )) *
                                      100
                                    }%`,
                                    background: `linear-gradient(135deg, ${expense.color}, ${expense.color}dd)`,
                                    boxShadow: `inset 0 2px 8px rgba(255,255,255,0.2), 0 4px 16px ${expense.color}60`,
                                  }}
                                >
                                  <div
                                    className="absolute inset-0"
                                    style={{
                                      background: `linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                                    }}
                                  />
                                </div>
                                <div className="relative z-10 flex items-center justify-center h-full">
                                  <span className="text-white text-[9px] font-medium">
                                    {(
                                      (expense.amount /
                                        expenseData.reduce(
                                          (sum, e) => sum + e.amount,
                                          0
                                        )) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </div>
                              </div>

                              {/* Carbon Footprint */}
                              <div
                                className="h-full bg-green-500/20 backdrop-blur-sm rounded p-1.5 border border-green-400/30 flex items-center justify-center"
                                style={{
                                  transform: "translateZ(5px)",
                                  boxShadow:
                                    "0 2px 8px rgba(34, 197, 94, 0.2)",
                                }}
                              >
                                <div className="flex items-center gap-0.5">
                                  <Leaf className="w-2.5 h-2.5 text-green-400" />
                                  <p className="text-[9px] font-semibold text-white">
                                    {expense.carbonFootprint}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-white/60 text-[9px] leading-relaxed">
                              {expense.details}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 3D Shadow layer */}
                      <div
                        className="absolute inset-0 rounded-lg -z-10 blur-lg opacity-30"
                        style={{
                          background: expense.color,
                          transform: "translateZ(-10px) scale(0.95)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-2 mb-2">
            {/* Recent Activity */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border">
              <CardHeader className="pb-1 px-3 pt-2">
                <CardTitle className="text-white text-sm">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 px-3 py-1">
                {activities.map((activity) => (
                  <Dialog key={activity.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded bg-white/10">
                            <activity.icon className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <p className="text-white text-[10px] font-medium">
                              {activity.name}
                            </p>
                            <p className="text-white/60 text-[9px]">
                              {activity.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-[10px] font-semibold ${
                              activity.amount > 0
                                ? "text-green-400"
                                : "text-white"
                            }`}
                          >
                            {activity.amount > 0 ? "+" : ""}
                            {activity.amount.toFixed(2)}
                          </p>
                          <p className="text-white/60 text-[9px]">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-background/95 backdrop-blur-sm">
                      <DialogHeader>
                        <DialogTitle>{activity.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-semibold">
                            {activity.category}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span
                            className={`font-semibold ${
                              activity.amount > 0 ? "text-green-600" : ""
                            }`}
                          >
                            ${Math.abs(activity.amount).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-semibold">{activity.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-semibold">
                            {activity.amount > 0 ? "Credit" : "Debit"}
                          </span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>

            {/* 5-Year Wealth Projection */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border">
              <CardHeader className="pb-1 px-3 pt-2">
                <CardTitle className="text-white text-sm">
                  5-Year Wealth Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 py-1">
                <div className="relative h-[120px] w-full">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 600 150"
                    className="overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
                        <stop offset="100%" stopColor="hsl(142, 60%, 45%)" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 50, 100].map((y) => (
                      <line
                        key={y}
                        x1="40"
                        y1={130 - y}
                        x2="560"
                        y2={130 - y}
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {["0k", "180k", "360k"].map((label, i) => (
                      <text
                        key={label}
                        x="10"
                        y={135 - i * 50}
                        fill="white"
                        opacity="0.5"
                        fontSize="8"
                      >
                        {label}
                      </text>
                    ))}

                    {/* X-axis labels */}
                    {projectionData.map((data, i) => (
                      <text
                        key={data.year}
                        x={40 + (i * 520) / 5}
                        y="145"
                        fill="white"
                        opacity="0.5"
                        fontSize="8"
                        textAnchor="middle"
                      >
                        {data.year}
                      </text>
                    ))}

                    {/* Line chart */}
                    <polyline
                      points={projectionData
                        .map(
                          (data, i) =>
                            `${40 + (i * 520) / 5},${130 - data.value * 0.35}`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {projectionData.map((data, i) => (
                      <circle
                        key={data.year}
                        cx={40 + (i * 520) / 5}
                        cy={130 - data.value * 0.35}
                        r="2.5"
                        fill="hsl(142, 76%, 36%)"
                        className="cursor-pointer transition-all"
                      />
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Source Information */}
          <Card className="bg-glass-bg/60 backdrop-blur-md border border-white/10">
            <CardContent className="p-2">
              <div className="flex items-start gap-2">
                <div className="bg-blue-500/20 p-1.5 rounded">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-xs mb-1">
                    Data Source & Security
                  </h3>
                  <p className="text-white/70 text-[9px] mb-1.5">
                    All portfolio data is aggregated from verified sources and
                    secured using blockchain technology.
                  </p>
                  <div className="flex flex-wrap gap-1 items-center">
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[8px] rounded-full">
                      Real-time Market Data
                    </span>
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[8px] rounded-full">
                      Blockchain Verified
                    </span>
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[8px] rounded-full">
                      Bank-Level Encryption
                    </span>
                    <button
                      onClick={() => navigate("/agentmesh")}
                      className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded text-[9px] hover:from-blue-600 hover:to-purple-700 transition-all"
                    >
                      Agentic Mesh
                    </button>
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

export default Portfolio;
