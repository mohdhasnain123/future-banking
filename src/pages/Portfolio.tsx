import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Bitcoin, Globe, Building2, ShoppingCart, CreditCard, Plane, Send, Heart, Coffee, ArrowLeft, Shield, Leaf, Home, Car, Briefcase, Heart as HeartIcon, TreePine, Droplet, Wind, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const assets = [
    { name: "Global Equities", amount: 85000, icon: Globe, color: "hsl(220, 70%, 50%)" },
    { name: "Crypto Assets", amount: 45000, icon: Bitcoin, color: "hsl(30, 60%, 70%)" },
    { name: "Digital Real Estate", amount: 54567, icon: Building2, color: "hsl(142, 76%, 36%)" },
  ];

  const activities: Activity[] = [
    { id: "1", name: "Cyberdyne Systems", category: "Tech Subscription", amount: -49.99, time: "2m ago", icon: CreditCard },
    { id: "2", name: "Orbital Foods", category: "Groceries", amount: -150.23, time: "1h ago", icon: ShoppingCart },
    { id: "3", name: "Incoming Transfer", category: "Project payment", amount: 2500.00, time: "3h ago", icon: Send },
    { id: "4", name: "Mars Transit", category: "Transport", amount: -25.50, time: "yesterday", icon: Plane },
    { id: "5", name: "Solana NFT Mint", category: "Digital Assets", amount: -350.00, time: "yesterday", icon: Bitcoin },
  ];

  const goals: Goal[] = [
    { name: "Buy a House", current: 35000, target: 50000, progress: 70 },
    { name: "Retire by 40", current: 30000, target: 100000, progress: 30 },
    { name: "Vacation", current: 1700, target: 2000, progress: 85 },
    { name: "Donate to Greenpeace", current: 8500, target: 10000, progress: 85 },
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

  const quarterlyExpenditure = [
    { quarter: "Q1 2025", amount: 45000 },
    { quarter: "Q2 2025", amount: 52000 },
    { quarter: "Q3 2025", amount: 48000 },
    { quarter: "Q4 2025", amount: 55000 },
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
      nextDue: "November 15, 2025"
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
      nextDue: "November 1, 2025"
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
      nextDue: "November 10, 2025"
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
      nextDue: "November 20, 2025"
    },
  ];

  const esgMetrics = [
    {
      category: "Environmental",
      icon: TreePine,
      score: 92,
      metrics: [
        { label: "Carbon Footprint", value: "15 tons CO₂/year", target: "12 tons CO₂/year" },
        { label: "Renewable Energy", value: "78%", target: "100%" },
        { label: "Waste Reduction", value: "65%", target: "80%" }
      ]
    },
    {
      category: "Social",
      icon: Heart,
      score: 88,
      metrics: [
        { label: "Community Investment", value: "$8.5K", target: "$10K" },
        { label: "Fair Trade Products", value: "82%", target: "90%" },
        { label: "Diversity Index", value: "85/100", target: "95/100" }
      ]
    },
    {
      category: "Governance",
      icon: Briefcase,
      score: 95,
      metrics: [
        { label: "Ethical Investments", value: "96%", target: "100%" },
        { label: "Transparency Score", value: "94/100", target: "100/100" },
        { label: "Compliance Rate", value: "100%", target: "100%" }
      ]
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/goals")}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/20"
              >
                My Goals
              </button>
              <div className="text-white/90">
                <h2 className="text-xl font-semibold">Tue, October 07, 2025</h2>
                <p className="text-sm">04:11 PM</p>
              </div>
            </div>
          </div>

          {/* Total Net Worth - Clickable */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="mb-8 bg-[hsl(142,76%,36%)]/90 backdrop-blur-sm border-none cursor-pointer hover:bg-[hsl(142,76%,36%)] transition-all">
                <CardContent className="p-6">
                  <p className="text-white/80 text-sm mb-2">Total Net Worth</p>
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">$184,567.89</h1>
                    <Badge className="bg-white/20 text-white border-none">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      $1234.56 (+2.1%) in last 24 h
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-background/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle>Total Net Worth Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Your total net worth has grown by 2.1% in the last 24 hours.</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Previous Value:</span>
                    <span className="font-semibold">$183,333.33</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Value:</span>
                    <span className="font-semibold">$184,567.89</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Gain:</span>
                    <span className="font-semibold">+$1,234.56</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Asset Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {assets.map((asset) => (
              <Dialog key={asset.name}>
                <DialogTrigger asChild>
                  <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:bg-glass-bg/80 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <asset.icon className="w-5 h-5" style={{ color: asset.color }} />
                        <p className="text-white/70 text-sm">{asset.name}</p>
                      </div>
                      <p className="text-2xl font-bold text-white">${asset.amount.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-background/95 backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle>{asset.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Current holdings in {asset.name.toLowerCase()}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Value:</span>
                        <span className="font-semibold">${asset.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>% of Portfolio:</span>
                        <span className="font-semibold">{((asset.amount / 184567) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Asset Allocation */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle className="text-white">Asset Allocation</CardTitle>
                <p className="text-white/60 text-sm">See How Your Money Moves</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <svg width="200" height="200" viewBox="0 0 200 200" className="cursor-pointer">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(220, 70%, 50%)" strokeWidth="30" strokeDasharray="231 500" transform="rotate(-90 100 100)" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(30, 60%, 70%)" strokeWidth="30" strokeDasharray="120 500" strokeDashoffset="-231" transform="rotate(-90 100 100)" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(142, 76%, 36%)" strokeWidth="30" strokeDasharray="150 500" strokeDashoffset="-351" transform="rotate(-90 100 100)" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-[hsl(220,70%,50%)]" />
                    <span>Equities 46%</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-[hsl(30,60%,70%)]" />
                    <span>Crypto 24%</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-3 h-3 rounded-full bg-[hsl(142,76%,36%)]" />
                    <span>Digital RE 30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Expenditure */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle className="text-white">Quarterly Expenditure</CardTitle>
                <p className="text-white/60 text-sm">Track your spending patterns</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Expenditure",
                      color: "hsl(142, 76%, 36%)",
                    },
                  }}
                  className="h-[300px] w-[550px] mt-5"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quarterlyExpenditure}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="quarter" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="amount" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <Dialog key={activity.id}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/10">
                            <activity.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{activity.name}</p>
                            <p className="text-white/60 text-sm">{activity.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${activity.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                            {activity.amount > 0 ? '+' : ''}{activity.amount.toFixed(2)}
                          </p>
                          <p className="text-white/60 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-background/95 backdrop-blur-sm">
                      <DialogHeader>
                        <DialogTitle>{activity.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Category:</span>
                            <span className="font-semibold">{activity.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span className={`font-semibold ${activity.amount > 0 ? 'text-green-600' : ''}`}>
                              ${Math.abs(activity.amount).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="font-semibold">{activity.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="font-semibold">{activity.amount > 0 ? 'Credit' : 'Debit'}</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </CardContent>
            </Card>

            {/* 5-Year Wealth Projection */}
            <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle className="text-white">5-Year Wealth Projection</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] w-[620px] mt-14">
                <div className="relative h-64">
                  <svg width="100%" height="100%" viewBox="0 0 600 250" className="overflow-visible">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
                        <stop offset="100%" stopColor="hsl(142, 60%, 45%)" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[0, 90, 180, 270].map((y) => (
                      <line key={y} x1="50" y1={250 - y} x2="550" y2={250 - y} stroke="white" strokeOpacity="0.1" strokeWidth="1" />
                    ))}
                    {/* Y-axis labels */}
                    {['0k', '90k', '180k', '270k', '360k'].map((label, i) => (
                      <text key={label} x="20" y={250 - (i * 62)} fill="white" opacity="0.5" fontSize="12">
                        {label}
                      </text>
                    ))}
                    {/* X-axis labels */}
                    {projectionData.map((data, i) => (
                      <text key={data.year} x={50 + (i * 500 / 5)} y="270" fill="white" opacity="0.5" fontSize="12" textAnchor="middle">
                        {data.year}
                      </text>
                    ))}
                    {/* Line chart */}
                    <polyline
                      points={projectionData.map((data, i) => `${50 + (i * 500 / 5)},${250 - (data.value * 0.7)}`).join(' ')}
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
                        cx={50 + (i * 500 / 5)}
                        cy={250 - (data.value * 0.7)}
                        r="5"
                        fill="hsl(142, 76%, 36%)"
                        className="cursor-pointer hover:r-7 transition-all"
                      />
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insurance Coverage Section */}
          <div className="mt-8">
            <div className="mb-6 perspective-1000">
              <h2 className="text-4xl font-bold text-white relative" style={{
                transform: 'translateZ(20px)',
                textShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
                letterSpacing: '0.05em'
              }}>
                Insurance Coverage
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary via-purple-500 to-primary mt-2" 
                style={{ transform: 'translateZ(10px)' }} />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insurances.map((insurance) => (
                <Dialog key={insurance.name}>
                  <DialogTrigger asChild>
                    <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:scale-105 transition-all perspective-1000 group">
                      <CardContent className="p-6" style={{ transform: 'translateZ(10px)' }}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm"
                            style={{ transform: 'translateZ(8px)' }}>
                            <insurance.icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {insurance.status}
                          </Badge>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">{insurance.name}</h3>
                        <div className="space-y-1 text-white/70 text-sm">
                          <p>Coverage: <span className="text-white font-semibold">{insurance.coverage}</span></p>
                          <p>Premium: <span className="text-white font-semibold">{insurance.premium}</span></p>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-background/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>{insurance.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{insurance.details}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Coverage Amount:</span>
                          <span className="font-semibold">{insurance.coverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Premium:</span>
                          <span className="font-semibold">{insurance.premium}</span>
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
                            ${(parseFloat(insurance.premium.replace(/[^0-9.]/g, '')) * 12).toFixed(0)}
                          </span>
                        </div>
                        <div className="border-t border-border pt-3 mt-3">
                          <div className="flex justify-between mb-2">
                            <span>Start Date:</span>
                            <span className="font-semibold">{insurance.startDate}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>End Date:</span>
                            <span className="font-semibold">{insurance.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next Due Date:</span>
                            <span className="font-semibold text-primary">{insurance.nextDue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* ESG Sustainability Section */}
          <div className="mt-8 mb-8">
            <div className="mb-6 perspective-1000">
              <h2 className="text-4xl font-bold text-white relative" style={{
                transform: 'translateZ(20px)',
                textShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
                letterSpacing: '0.05em'
              }}>
                ESG Sustainability
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary via-purple-500 to-primary mt-2" 
                style={{ transform: 'translateZ(10px)' }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {esgMetrics.map((category) => (
                <Dialog key={category.category}>
                  <DialogTrigger asChild>
                    <Card className="bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:scale-105 transition-all perspective-1000">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm"
                              style={{ transform: 'translateZ(8px)' }}>
                              <category.icon className="w-6 h-6 text-white" />
                            </div>
                            <CardTitle className="text-white">{category.category}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-white/70 text-sm">ESG Score</span>
                            <span className="text-white font-bold text-lg">{category.score}/100</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full transition-all"
                              style={{ width: `${category.score}%` }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          {category.metrics.slice(0, 2).map((metric) => (
                            <div key={metric.label} className="text-white/70 text-sm">
                              <span className="text-white/90">{metric.label}:</span> {metric.value}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-background/95 backdrop-blur-sm">
                    <DialogHeader>
                      <DialogTitle>{category.category} Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <span className="font-semibold">Overall Score</span>
                        <span className="text-2xl font-bold text-green-600">{category.score}/100</span>
                      </div>
                      <div className="space-y-3">
                        {category.metrics.map((metric) => (
                          <div key={metric.label} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{metric.label}</span>
                              <span className="text-muted-foreground">Target: {metric.target}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-green-600">{metric.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
          </div>

          {/* Data Source Information */}
          <Card className="mt-8 bg-glass-bg/60 backdrop-blur-md border-2 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Data Source & Security</h3>
                  <p className="text-white/70 text-sm mb-3">
                    All portfolio data is aggregated from verified sources and secured using blockchain technology. 
                    Information includes real-time market data, institutional holdings, and verified transactions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">Real-time Market Data</span>
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">Blockchain Verified</span>
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">Bank-Level Encryption</span>
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">Multi-Source Aggregation</span>
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
