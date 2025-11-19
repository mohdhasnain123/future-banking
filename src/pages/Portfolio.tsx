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
import { Progress } from "@/components/ui/progress";
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
  LucideAudioLines,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import Bills from "./Bills";
import { formatDate, formatTime } from "@/components/utils";

// --- Interfaces ---
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

const Portfolio = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedNetWorth, setAnimatedNetWorth] = useState(0);
  const [animatedAssets, setAnimatedAssets] = useState<number[]>([0, 0, 0]);
  const [assetProgress, setAssetProgress] = useState<number[]>([0, 0, 0]);
  const [expenseProgress, setExpenseProgress] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);
  const [animatedGraphData, setAnimatedGraphData] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);

  // --- CARD VISIBILITY LOGIC ---
  const CARD_COUNT = 14;
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    Array(CARD_COUNT).fill(false)
  );

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        if (current >= CARD_COUNT) {
          clearInterval(interval);
          return prev;
        }
        const updated = [...prev];
        updated[current] = true;
        current += 1;
        return updated;
      });
    }, 350);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = totalNetWorth / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setAnimatedNetWorth(totalNetWorth);
        clearInterval(timer);
      } else {
        setAnimatedNetWorth(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAnimatedAssets((prev) =>
        top3Assets.map((asset, idx) => {
          const target = asset.amount;
          const current = prev[idx] ?? 0;
          const increment = (target - current) / (steps - step + 1);
          return Math.min(current + increment, target);
        })
      );
      if (step >= steps) {
        // Snap to target values after animation
        setAnimatedAssets(top3Assets.map((asset) => asset.amount));
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setAssetProgress((prev) =>
        top3Assets.map((asset, idx) => {
          const target = (asset.amount / totalNetWorth) * 100;
          const current = prev[idx] ?? 0;
          const increment = (target - current) / (steps - step + 1);
          return Math.min(current + increment, target);
        })
      );
      if (step >= steps) {
        // Snap to target values after animation
        setAssetProgress(
          top3Assets.map((asset) => (asset.amount / totalNetWorth) * 100)
        );
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const maxExpense = Math.max(...expenseData.map((e) => e.amount));
    const timer = setInterval(() => {
      setExpenseProgress((prev) =>
        expenseData.slice(0, 5).map((expense, idx) => {
          const target = (expense.amount / maxExpense) * 100;
          const current = prev[idx] || 0;
          const increment = (target - current) / (steps / 10);
          return Math.min(current + increment, target);
        })
      );
    }, duration / steps);
    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 3000;
    const steps = 60;
    const timer = setInterval(() => {
      setAnimatedGraphData((prev) =>
        projectionData.map((data, idx) => {
          const target = data.value;
          const current = prev[idx] || 0;
          const increment = (target - current) / (steps / 10);
          return Math.min(current + increment, target);
        })
      );
    }, duration / steps);
    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  // --- Data ---
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
      time: "30m ago",
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
      time: "30 minutes ago",
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
      timeline: "Jan 2035 - Oct 2035",
      carbonFootprint: "2.3 tons CO₂",
    },
    {
      category: "Apparel",
      amount: 8500,
      details: "Clothing, shoes, and accessories from premium brands",
      color: "hsl(220, 70%, 50%)",
      timeline: "Jan 2035 - Oct 2035",
      carbonFootprint: "1.8 tons CO₂",
    },
    {
      category: "Electronics",
      amount: 15000,
      details: "Latest tech gadgets, smartphones, and home electronics",
      color: "hsl(30, 60%, 70%)",
      timeline: "Jan 2035 - Oct 2035",
      carbonFootprint: "3.5 tons CO₂",
    },
    {
      category: "Entertainment",
      amount: 6500,
      details: "Movies, concerts, subscriptions, and leisure activities",
      color: "hsl(280, 65%, 60%)",
      timeline: "Jan 2035 - Oct 2035",
      carbonFootprint: "0.9 tons CO₂",
    },
    {
      category: "Healthcare",
      amount: 9000,
      details: "Medical expenses, prescriptions, and wellness programs",
      color: "hsl(10, 80%, 60%)",
      timeline: "Jan 2035 - Oct 2035",
      carbonFootprint: "1.2 tons CO₂",
    },
    {
      category: "Transportation",
      amount: 7500,
      details: "Fuel, maintenance, public transport, and ride-sharing",
      color: "hsl(180, 55%, 45%)",
      timeline: "Jan 2035 - Oct 2035",
      carbonFootprint: "4.1 tons CO₂",
    },
    {
      category: "Education",
      amount: 11000,
      details: "Online courses, books, workshops, and certifications",
      color: "hsl(45, 85%, 55%)",
      timeline: "Jan 2035 - Oct 2035",
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
      nextDue: "November 15, 2035",
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
      nextDue: "November 1, 2035",
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
      nextDue: "November 10, 2035",
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
      nextDue: "November 20, 2035",
    },
  ];

  const totalNetWorth = 184567.89;
  const gain = 1234.56;
  const previousValue = totalNetWorth - gain;
  const changePct = ((gain / previousValue) * 100).toFixed(1);

  const top3Assets = [...assets]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  let cardIndex = 0;

  // --- Helper for Asset Allocation Pie Labels ---
  const assetPieLabels = [
    {
      label: "Equities",
      pct: ((top3Assets[0].amount / totalNetWorth) * 100).toFixed(1),
      color: top3Assets[0].color,
      icon: Globe,
    },
    {
      label: "Crypto & NFTs",
      pct: ((top3Assets[1].amount / totalNetWorth) * 100).toFixed(1),
      color: top3Assets[1].color,
      icon: Bitcoin,
    },
    {
      label: "Digital RE",
      pct: ((top3Assets[2].amount / totalNetWorth) * 100).toFixed(1),
      color: top3Assets[2].color,
      icon: Building2,
    },
  ];

  return (
    <div className="h-[1600px] relative overflow-hidden text-[11px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full overflow-hidden p-1">
        <div className="max-w-[1920px] mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="mb-1 flex justify-between items-start text-white/90">
            <div className="flex items-center justify-between mb-0.5">
              <h1 className="text-xs font-bold text-white">Portfolio</h1>
              <p className="text-[10px] font-medium ml-1">
                {formatTime("8:00 AM", 15)} | {formatDate(currentTime)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-1 mb-1">
            {/* Net Worth */}
            <Dialog>
              <DialogTrigger asChild>
                <Card
                  className={`bg-[hsl(142,76%,36%)]/90 hover:bg-[hsl(142,76%,36%)] transition-all backdrop-blur-sm border-none cursor-pointer transform hover:scale-[1.02] ${
                    visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
                  }`}
                  style={{ minHeight: 48, maxHeight: 54 }}
                >
                  <CardContent className="p-0.5">
                    <p className="text-white/80 text-[7px] mb-0.5">Net Worth</p>
                    <div className="flex items-start justify-between">
                      <h2 className="text-[10px] font-semibold text-white mr-1">
                        $
                        {animatedNetWorth.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h2>
                      <Badge className="bg-white/20 text-white border-none text-[7px] px-0.5 py-0 animate-pulse">
                        <TrendingUp className="w-2 h-2 mr-0.5" />
                        +$
                        {gain.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        ({changePct}%)
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-[7px] text-white/80">
                      In last 24 h
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              {/* ...DialogContent remains unchanged... */}
            </Dialog>
            {(() => {
              cardIndex++;
              return null;
            })()}

            {/* 3 Asset Allocation boxes */}
            {top3Assets.map((asset, idx) => {
              const thisIndex = cardIndex;
              cardIndex++;
              const displayAmount = animatedAssets[idx] || 0;
              const pct = (displayAmount / totalNetWorth) * 100;
              const animatedPct = assetProgress[idx] || 0;
              return (
                <Dialog key={asset.name}>
                  <DialogTrigger asChild>
                    <Card
                      className={`bg-glass-bg/60 hover:bg-glass-bg/80 transition-all backdrop-blur-md border-glass-border cursor-pointer group hover:scale-[1.02] duration-300 ${
                        visibleCards[thisIndex]
                          ? "animate-fade-in"
                          : "opacity-0"
                      }`}
                      style={{ minHeight: 48, maxHeight: 54 }}
                    >
                      <CardContent className="p-0.5">
                        <div className="flex items-center gap-0.5 mb-0.5">
                          <asset.icon
                            className="w-2 h-2 group-hover:scale-110 transition-transform group-hover:rotate-12"
                            style={{ color: asset.color }}
                          />
                          <p className="text-white/70 text-[7px]">
                            {asset.name}
                          </p>
                        </div>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <p className="text-[10px] font-semibold text-white">
                            $
                            {displayAmount.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <span className="text-[7px] text-white/80 font-semibold">
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={animatedPct}
                          className="h-0.5 bg-white/20 [&>*]:bg-green-600"
                        />
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-background/95 backdrop-blur-sm text-xs">
                    <DialogHeader>
                      <DialogTitle className="text-white font-semibold text-sm">
                        {asset.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground">
                        Current holdings in {asset.name.toLowerCase()}
                      </p>
                      <div className="space-y-0.5">
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
          <div className="mb-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
              {insurances.map((insurance, idx) => {
                const thisIndex = cardIndex;
                cardIndex++;
                return (
                  <Dialog key={insurance.name}>
                    <DialogTrigger asChild>
                      <Card
                        className={`bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:scale-[1.03] transition-all perspective-1000 group ${
                          visibleCards[thisIndex]
                            ? "animate-fade-in"
                            : "opacity-0"
                        }`}
                        style={{ minHeight: 55, maxHeight: 60 }}
                      >
                        <CardContent
                          className="p-1"
                          style={{ transform: "translateZ(8px)" }}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <div
                              className="p-0.5 rounded-lg bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm"
                              style={{ transform: "translateZ(6px)" }}
                            >
                              <insurance.icon className="w-3 h-3 text-white" />
                            </div>
                            <h3 className="text-white font-semibold text-[10px] flex-1 mx-1">
                              {insurance.name}
                            </h3>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[8px] px-1 py-0">
                              {insurance.status}
                            </Badge>
                          </div>
                          <div className="space-y-0.5 text-white/70 text-[8px]">
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
                    <DialogContent className="bg-background/95 backdrop-blur-sm text-xs">
                      <DialogHeader>
                        <DialogTitle className="text-white font-semibold text-sm">
                          {insurance.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground">
                          {insurance.details}
                        </p>
                        <div className="space-y-1">
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
                          <div className="border-t border-border pt-1 mt-1">
                            <div className="flex justify-between mb-0.5">
                              <span>Start Date:</span>
                              <span className="font-semibold">
                                {insurance.startDate}
                              </span>
                            </div>
                            <div className="flex justify-between mb-0.5">
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
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-1 mb-1 ">
            {/* Asset Allocation */}
            <Card
              className={`bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col overflow-hidden h-[110px] ${
                visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ minHeight: "90px", maxHeight: "110px" }}
            >
              <CardHeader className="pb-0.5 px-1 pt-0.5">
                <CardTitle className="text-white font-semibold text-[10px]">
                  Asset Allocation
                </CardTitle>
                <p className="text-white/60 text-[8px]">
                  See How Your Money Moves
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-row items-center justify-between px-1 py-0.5">
                <div className="flex flex-col justify-center gap-1 h-full flex-1">
                  {assetPieLabels.map((item, i) => (
                    <div key={item.label} className="flex items-center gap-1">
                      <item.icon
                        className="w-2.5 h-2.5"
                        style={{ color: item.color }}
                      />
                      <span
                        className="font-semibold text-white text-[9px]"
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-bold text-white text-[9px]"
                        style={{ color: item.color }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="relative flex-shrink-0"
                  style={{ width: 38, height: 38 }}
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 230 230"
                    className="cursor-pointer"
                  >
                    <circle
                      cx="115"
                      cy="115"
                      r="95"
                      fill="none"
                      stroke="hsl(220, 70%, 50%)"
                      strokeWidth="13"
                      strokeDasharray="285 700"
                      transform="rotate(-90 115 115)"
                    />
                    <circle
                      cx="115"
                      cy="115"
                      r="95"
                      fill="none"
                      stroke="hsl(30, 60%, 70%)"
                      strokeWidth="13"
                      strokeDasharray="148 700"
                      strokeDashoffset="-285"
                      transform="rotate(-90 115 115)"
                    />
                    <circle
                      cx="115"
                      cy="115"
                      r="95"
                      fill="none"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth="13"
                      strokeDasharray="190 700"
                      strokeDashoffset="-433"
                      transform="rotate(-90 115 115)"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
            {(() => {
              cardIndex++;
              return null;
            })()}

            {/* Expense Categories */}
            <Card
              className={`bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col overflow-hidden h-[110px] ${
                visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <CardHeader className="pb-0.5 px-0.5 pt-0.5">
                <CardTitle className="text-white font-semibold text-[9px]">
                  Expense Categories
                </CardTitle>
                <p className="text-white/60 text-[6px]">Jan 2035 - Oct 2035</p>
              </CardHeader>
              <CardContent className="px-0.5 py-0.5 space-y-0.5 overflow-y-auto">
                {expenseData.slice(0, 3).map((expense, index) => {
                  const progressValue = expenseProgress[index] || 0;
                  const totalPercentage = (
                    (expense.amount /
                      expenseData.reduce((sum, e) => sum + e.amount, 0)) *
                    100
                  ).toFixed(1);
                  return (
                    <div
                      key={expense.category}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-0.5 border border-white/10 hover:border-white/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-white font-semibold text-[8px]">
                          {expense.category}
                        </h3>
                        <span className="text-[8px] font-semibold text-white">
                          ${expense.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden mb-0.5">
                        <div
                          className="h-full transition-all duration-300 rounded-full bg-green-600"
                          style={{ width: `${progressValue}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-[6px] font-medium drop-shadow-md">
                            {totalPercentage}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Leaf className="w-1.5 h-1.5 text-green-400" />
                        <span className="text-[6px] text-green-300">
                          {expense.carbonFootprint}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            {(() => {
              cardIndex++;
              return null;
            })()}

            {/* Bills */}
            <Card
              className={`bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col overflow-hidden h-[110px] ${
                visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <Bills />
            </Card>
            {(() => {
              cardIndex++;
              return null;
            })()}
          </div>

          <div className="grid lg:grid-cols-3 gap-1">
            {/* Recent Activity */}
            <Card
              className={`bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col overflow-hidden ${
                visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                minHeight: "90px",
                maxHeight: "110px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardHeader className="pb-0.5 px-1 pt-0.5">
                <CardTitle className="text-white font-semibold text-[10px]">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-0.5 px-1 py-0.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent max-h-[70px]">
                {activities.slice(0, 3).map((activity) => (
                  <Dialog key={activity.id}>
                    <DialogTrigger asChild>
                      <div
                        className={`flex items-center justify-between p-0.5 rounded-lg hover:bg-white/5 cursor-pointer transition-all ${
                          activity.id === "2"
                            ? "bg-red-500/10 border border-red-500/30 animate-pulse"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className={`p-0.5 rounded-lg ${
                              activity.id === "2"
                                ? "bg-red-500/20"
                                : "bg-white/10"
                            }`}
                          >
                            <activity.icon
                              className={`w-2.5 h-2.5 ${
                                activity.id === "2"
                                  ? "text-red-400"
                                  : "text-white"
                              }`}
                            />
                          </div>
                          <div>
                            <p
                              className={`text-[9px] font-medium ${
                                activity.id === "2"
                                  ? "text-red-400 font-bold"
                                  : "text-white"
                              }`}
                            >
                              {activity.name}
                            </p>
                            <p
                              className={`text-[8px] ${
                                activity.id === "2"
                                  ? "text-red-400/80 font-semibold"
                                  : "text-white/60"
                              }`}
                            >
                              {activity.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-[9px] font-semibold ${
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
                          <p className="text-[8px] text-white/60">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-background/95 backdrop-blur-sm text-xs">
                      <DialogHeader>
                        <DialogTitle className="text-white font-semibold text-sm">
                          {activity.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-0.5 text-[10px]">
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
            {(() => {
              cardIndex++;
              return null;
            })()}

            {/* 5-Year Wealth Projection */}
            <Card
              className={`bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col overflow-hidden ${
                visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <CardHeader className="pb-0.5 px-1 pt-0.5">
                <CardTitle className="text-white font-semibold text-[10px]">
                  5-Year Wealth Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-1 py-0.5">
                <div className="relative h-full w-full">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 110 40"
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
                    {[0, 10, 20, 30].map((y) => (
                      <line
                        key={y}
                        x1="10"
                        y1={40 - y}
                        x2="100"
                        y2={40 - y}
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                    ))}
                    {["0k", "60k", "120k", "180k"].map((label, i) => (
                      <text
                        key={label}
                        x="2"
                        y={40 - i * 10}
                        fill="white"
                        opacity="0.5"
                        fontSize="5"
                      >
                        {label}
                      </text>
                    ))}
                    {projectionData.map((data, i) => (
                      <text
                        key={data.year}
                        x={10 + (i * 90) / 5}
                        y="44"
                        fill="white"
                        opacity="0.5"
                        fontSize="5"
                        textAnchor="middle"
                      >
                        {data.year}
                      </text>
                    ))}
                    <polyline
                      points={animatedGraphData
                        .map(
                          (value, i) =>
                            `${10 + (i * 90) / 5},${40 - value * 0.11}`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {animatedGraphData.map((value, i) => (
                      <circle
                        key={projectionData[i].year}
                        cx={10 + (i * 90) / 5}
                        cy={40 - value * 0.11}
                        r="1.2"
                        fill="hsl(142, 76%, 36%)"
                        className="cursor-pointer hover:r-2 transition-all"
                      />
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
            {(() => {
              cardIndex++;
              return null;
            })()}

            {/* Data Source Information */}
            <Card
              className={`bg-glass-bg/60 backdrop-blur-md border-glass-border flex flex-col overflow-hidden ${
                visibleCards[cardIndex] ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                minHeight: "90px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent className="p-1 overflow-hidden">
                <div className="flex items-start gap-1">
                  <div className="bg-blue-500/20 p-0.5 rounded-lg">
                    <Shield className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-[10px] mb-0.5">
                      Data Source & Security
                    </h3>
                    <p className="text-white/80 text-[8px] mb-0.5 leading-snug">
                      All portfolio data is aggregated from verified sources and
                      secured using blockchain technology.
                    </p>
                    <div className="flex flex-wrap gap-0.5 items-center mb-0.5">
                      <span className="px-1 py-0.5 bg-white/10 text-white/80 text-[8px] rounded-full font-semibold">
                        Real-time Market Data
                      </span>
                      <span className="px-1 py-0.5 bg-white/10 text-white/80 text-[8px] rounded-full font-semibold">
                        Blockchain Verified
                      </span>
                      <span className="px-1 py-0.5 bg-white/10 text-white/80 text-[8px] rounded-full font-semibold">
                        Bank-Level Encryption
                      </span>
                      <button
                        onClick={() => navigate("/agentmesh")}
                        className="px-1.5 py-0.5 text-[8px] bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow font-semibold"
                      >
                        Agentic Mesh
                      </button>
                    </div>
                    <div className="mt-0.5 pt-0.5 border-t border-white/10">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-0.5">
                          <span className="text-white/70 text-[8px]">
                            Last Sync:
                          </span>
                          <span className="text-white font-bold text-[8px]">
                            {formatTime(currentTime.toLocaleTimeString(), 15)}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <span className="text-white/70 text-[8px]">
                            Data Providers:
                          </span>
                          <span className="text-white font-bold text-[8px]">
                            OpenBank, Chainlink
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <span className="text-white/70 text-[8px]">
                            Security Features:
                          </span>
                          <span className="text-white font-bold text-[8px]">
                            Multi-factor Auth, End-to-End Encryption, AI Fraud
                            Detection
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <span className="text-white/70 text-[8px]">
                            Support:
                          </span>
                          <span className="text-white font-bold text-[8px]">
                            support@yourbank.com
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {(() => {
              cardIndex++;
              return null;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
