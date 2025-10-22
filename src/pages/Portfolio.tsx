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
  Shield,
  Leaf,
  Home,
  Car,
  Heart as HeartIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import Bills from "./Bills";

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
      hour12: true,
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
      name: "Unknown Merchant - Romania",
      category: "Digital Assets-Blocked (Outside Spending Pattern)",
      amount: -850.0,
      time: "yesterday",
      icon: Bitcoin,
    },
    {
      id: "3",
      name: "Orbital Foods",
      category: "Groceries",
      amount: -150.23,
      time: "1h ago",
      icon: ShoppingCart,
    },
    {
      id: "4",
      name: "Incoming Transfer",
      category: "Project payment",
      amount: 2500.0,
      time: "3h ago",
      icon: Send,
    },
    {
      id: "5",
      name: "Mars Transit",
      category: "Transport",
      amount: -25.5,
      time: "yesterday",
      icon: Plane,
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
      <div className="relative z-10 min-h-screen p-3">
        <div className="max-w-8xl mx-auto">
          {/* Header */}

          <div className="mb-1 flex justify-between items-start text-white/90 mt-8">
            {/* Date & Time on the left */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl md:text-4xl font-bold text-white">
                Portfolio
              </h1>
              <p className="text-lg font-medium ml-4">
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

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {/* --- Net Worth small box --- */}

            <Dialog>
              <DialogTrigger asChild>
                <Card className="bg-[hsl(142,76%,36%)]/90 hover:bg-[hsl(142,76%,36%)] transition-all backdrop-blur-sm border-none cursor-pointer">
                  <CardContent className="p-5">
                    <p className="text-white/80 text-xs">Net Worth</p>

                    <div className="flex items-start justify-between">
                      <h2 className="text-2xl font-bold text-white mr-3">
                        $
                        {totalNetWorth.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h2>

                      <Badge className="bg-white/20 text-white border-none">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +$
                        {gain.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        ({changePct}%)
                      </Badge>
                    </div>

                    <p className="mt-2 text-xs text-white/80">In last 24 h</p>
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
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <asset.icon
                            className="w-5 h-5"
                            style={{ color: asset.color }}
                          />
                          <p className="text-white/70 text-xs">{asset.name}</p>
                        </div>

                        <div className="flex items-baseline justify-between">
                          <p className="text-xl font-bold text-white">
                            ${asset.amount.toLocaleString()}
                          </p>
                          <span className="text-xs text-white/80">
                            {pct.toFixed(1)}%
                          </span>
                        </div>

                        {/* Tiny allocation bar */}
                        <div className="mt-3 h-2 rounded-full bg-white/15">
                          <div
                            className="h-2 rounded-full"
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
          <div className="mt-8 mb-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insurances.map((insurance) => (
                <Dialog key={insurance.name}>
                  <DialogTrigger asChild>
                    <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:scale-105 transition-all perspective-1000 group">
                      <CardContent
                        className="p-4"
                        style={{ transform: "translateZ(8px)" }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div
                            className="p-2 rounded-lg bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm"
                            style={{ transform: "translateZ(6px)" }}
                          >
                            <insurance.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-white font-semibold text-base">
                            {insurance.name}
                          </h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mr-2">
                            {insurance.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-white/70 text-xs">
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

          <div className="grid lg:grid-cols-3 gap-6 mb-4 mt-8">
            {/* Asset Allocation */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border h-[270px] flex flex-col overflow-hidden">
              <CardHeader className="pb-1 px-4">
                <CardTitle className="text-white text-base">
                  Asset Allocation
                </CardTitle>
                <p className="text-white/60 text-xs">
                  See How Your Money Moves
                </p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between px-4 py-1">
                <div className="flex items-center justify-center py-1">
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

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-[hsl(220,70%,50%)]" />
                    <span>Equities 46%</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-[hsl(30,60%,70%)]" />
                    <span>Crypto & NFTs 24%</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 rounded-full bg-[hsl(142,76%,36%)]" />
                    <span>Digital RE 30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border h-[270px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-white text-base">Expense Categories</CardTitle>
                <p className="text-white/60 text-sm">
                  Detailed breakdown with carbon footprint
                </p>

                {/* ✅ Time Period moved here */}
                <p className="text-xs text-blue-300 mt-1">
                  Time Period:{" Jan 2025 - Oct 2025"}
                  <span className="font-semibold text-white">
                    {/* dynamic value */}
                  </span>
                </p>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto pr-5">
                <div className="space-y-4 perspective-1000">
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
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          transform: "translateZ(10px)",
                          boxShadow: `0 8px 32px ${expense.color}40`,
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Category Info */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-white font-semibold text-sm">
                                {expense.category}
                              </h3>
                              <span className="text-1xl font-semibold text-white text-sm">
                                ${expense.amount.toLocaleString()}
                              </span>
                            </div>

                            {/* ✅ Progress Bar + Carbon Footprint side by side */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              {/* Progress Bar */}
                              <div className="h-full relative h-8 bg-white/10 rounded-lg overflow-hidden">
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
                                  <span className="text-white text-xs font-medium">
                                    {(
                                      (expense.amount /
                                        expenseData.reduce(
                                          (sum, e) => sum + e.amount,
                                          0
                                        )) *
                                      100
                                    ).toFixed(1)}
                                    % of total
                                  </span>
                                </div>
                              </div>

                              {/* Carbon Footprint */}
                              <div
                                className="h-full bg-green-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-400/30 flex flex-col justify-center"
                                style={{
                                  transform: "translateZ(5px)",
                                  boxShadow:
                                    "0 4px 12px rgba(34, 197, 94, 0.2)",
                                }}
                              >
                                <div className="flex items-center gap-1 mb-1">
                                  <Leaf className="w-3 h-3 text-green-400" />
                                  <span className="text-xs text-green-300">
                                    Carbon Footprint
                                  </span>
                                  <p className="text-sm font-semibold text-white">
                                    {expense.carbonFootprint}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-white/60 text-xs mt-3 leading-relaxed">
                              {expense.details}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 3D Shadow layer */}
                      <div
                        className="absolute inset-0 rounded-xl -z-10 blur-xl opacity-50"
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

            {/* Bills */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border h-[270px] flex flex-col">
              <Bills />
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Recent Activity */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border h-[270px] flex flex-col overflow-hidden">
              <CardHeader className="pb-2 px-4">
                <CardTitle className="text-white text-base">
                  Recent Activity
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto space-y-3 px-4 py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {activities.map((activity) => (
                  <Dialog key={activity.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-white/10">
                            <activity.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${
                              activity.id === "2"
                                ? "text-red-400"
                                : "text-white"
                                
                            }`}>
                              {activity.name}
                            </p>
                            <p className="text-white/60 text-xs">
                              {activity.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-semibold ${
                              activity.id === "2"
                                ? "text-red-400"
                                : activity.amount > 0
                                ? "text-green-400"
                                : "text-white"
                            }`}
                          >
                            {activity.amount > 0 ? "+" : ""}
                            {activity.amount.toFixed(2)}
                          </p>
                          <p className="text-white/60 text-xs">
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
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border h-[270px] flex flex-col overflow-hidden">
              <CardHeader className="pb-1 px-4">
                <CardTitle className="text-white text-base">
                  5-Year Wealth Projection
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 px-4 py-1">
                <div className="relative h-[200px] w-full">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 600 200"
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
                    {[0, 60, 120, 180].map((y) => (
                      <line
                        key={y}
                        x1="50"
                        y1={200 - y}
                        x2="550"
                        y2={200 - y}
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {["0k", "60k", "120k", "180k", "240k"].map((label, i) => (
                      <text
                        key={label}
                        x="20"
                        y={200 - i * 48}
                        fill="white"
                        opacity="0.5"
                        fontSize="10"
                      >
                        {label}
                      </text>
                    ))}

                    {/* X-axis labels */}
                    {projectionData.map((data, i) => (
                      <text
                        key={data.year}
                        x={50 + (i * 500) / 5}
                        y="210"
                        fill="white"
                        opacity="0.5"
                        fontSize="10"
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
                            `${50 + (i * 500) / 5},${200 - data.value * 0.6}`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {projectionData.map((data, i) => (
                      <circle
                        key={data.year}
                        cx={50 + (i * 500) / 5}
                        cy={200 - data.value * 0.6}
                        r="4"
                        fill="hsl(142, 76%, 36%)"
                        className="cursor-pointer hover:r-6 transition-all"
                      />
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Data Source Information */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border h-[270px] flex flex-col overflow-hidden">
              <CardContent className="p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base mb-1">
                      Data Source & Security
                    </h3>
                    <p className="text-white/70 text-sm mb-2 leading-snug">
                      All portfolio data is aggregated from verified sources and
                      secured using blockchain technology. Information includes
                      real-time market data, institutional holdings, and
                      verified transactions.
                    </p>
                    <div className="flex flex-wrap gap-1 items-center">
                      <span className="px-2 py-1 bg-white/10 text-white/80 text-sm rounded-full">
                        Real-time Market Data
                      </span>
                      <span className="px-2 py-1 bg-white/10 text-white/80 text-sm rounded-full">
                        Blockchain Verified
                      </span>
                      <span className="px-2 py-1 bg-white/10 text-white/80 text-sm rounded-full">
                        Bank-Level Encryption
                      </span>
                      <span className="px-2 py-1 bg-white/10 text-white/80 text-sm rounded-full">
                        Multi-Source Aggregation
                      </span>
                      <button
                        onClick={() => navigate("/agentmesh")}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow"
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
    </div>
  );
};

export default Portfolio;
