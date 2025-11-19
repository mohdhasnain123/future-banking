import {
  BarChart3,
  Shield,
  Leaf,
  Bot,
  Users,
  Building2,
  ArrowRight,
  Zap,
  Brain,
  Database,
  MessageSquare,
} from "lucide-react";
import mountainBg from "@/assets/mountain-bg.jpg";

const AgentCollaborationView = () => (
  <div className="space-y-0">
    {/* Header Section */}
    <div className="glass-card-strong rounded-sm p-0.5 relative overflow-hidden stagger-fade-in stagger-1">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/20" />
      <div className="absolute inset-0 shimmer" />
      <div className="relative z-10">
        <h2 className="text-[7px] font-bold text-white flex items-center gap-0.5">
          <Bot className="w-2 h-2 text-cyan-400 pulse-glow" />
          Agent Collaboration Architecture
        </h2>
        <p className="text-indigo-200 text-[6px] leading-tight">
          How your personal AI agent orchestrates with backend services
        </p>
      </div>
    </div>

    <div className="glass-card rounded-sm p-0.5 stagger-fade-in stagger-2">
      {/* User Layer */}
      <div className="flex justify-center mb-0">
        <div className="glass-card-strong rounded-sm p-0.5 text-white shadow-2xl border border-cyan-400/30">
          <Users className="w-2 h-2 mx-auto mb-0.5 text-cyan-400" />
          <p className="font-bold text-[6px] text-center">You</p>
          <p className="text-[6px] text-center text-cyan-200 leading-tight">
            Natural Language Query
          </p>
        </div>
      </div>

      {/* Animated Arrow */}
      <div className="flex justify-center mb-0">
        <ArrowRight className="w-2 h-2 text-cyan-400 rotate-90" />
      </div>

      {/* Personal Agent Layer */}
      <div className="flex justify-center mb-0">
        <div className="glass-card-strong rounded-sm p-0.5 text-white shadow-2xl min-w-[70px] border border-purple-400/40">
          <Bot className="w-2 h-2 mx-auto mb-0.5 text-purple-400" />
          <p className="font-bold text-center text-[6px] mb-0.5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Personal AI Agent
          </p>
          <div className="glass-card rounded-sm p-0.5 text-[6px] space-y-0.5 border border-white/20">
            <div className="flex items-center gap-0.5">
              <Brain className="w-1.5 h-1.5 text-pink-400" />
              <span className="text-white/90">Intent Recognition</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Zap className="w-1.5 h-1.5 text-yellow-400" />
              <span className="text-white/90">Task Orchestration</span>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageSquare className="w-1.5 h-1.5 text-cyan-400" />
              <span className="text-white/90">Context Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Arrow */}
      <div className="flex justify-center mb-0">
        <ArrowRight className="w-2 h-2 text-purple-400 rotate-90" />
      </div>

      {/* Agent Orchestra Layer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
        {/* Bank Agent */}
        <div className="glass-card-strong rounded-sm p-0.5 text-white shadow-xl border border-blue-400/30 group cursor-pointer stagger-fade-in stagger-1 mb-0">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-sm p-0.5 mb-0.5">
            <Building2 className="w-1.5 h-1.5 mx-auto text-blue-400" />
          </div>
          <p className="font-bold text-center text-[6px] mb-0.5">Bank Agent</p>
          <div className="space-y-0.5 text-[6px]">
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-blue-400/20">
              Accounts
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-blue-400/20">
              Transactions
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-blue-400/20">
              Loans
            </div>
          </div>
        </div>
        {/* Insurance Agent */}
        <div className="glass-card-strong rounded-sm p-0.5 text-white shadow-xl border border-green-400/30 group cursor-pointer stagger-fade-in stagger-2 mb-0">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-sm p-0.5 mb-0.5">
            <Shield className="w-1.5 h-1.5 mx-auto text-green-400" />
          </div>
          <p className="font-bold text-center text-[6px] mb-0.5">
            Insurance Agent
          </p>
          <div className="space-y-0.5 text-[6px]">
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-green-400/20">
              Policies
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-green-400/20">
              Claims
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-green-400/20">
              Coverage
            </div>
          </div>
        </div>
        {/* Sustainability Agent */}
        <div className="glass-card-strong rounded-sm p-0.5 text-white shadow-xl border border-emerald-400/30 group cursor-pointer stagger-fade-in stagger-3 mb-0">
          <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-sm p-0.5 mb-0.5">
            <Leaf className="w-2 h-2 mx-auto text-emerald-400" />
          </div>
          <p className="font-bold text-center text-[6px] mb-0.5">
            Sustainability Agent
          </p>
          <div className="space-y-0.5 text-[6px]">
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-emerald-400/20">
              Carbon Score
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-emerald-400/20">
              ESG Data
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-emerald-400/20">
              Green Options
            </div>
          </div>
        </div>
        {/* Investment Agent */}
        <div className="glass-card-strong rounded-sm p-0.5 text-white shadow-xl border border-purple-400/30 group cursor-pointer stagger-fade-in stagger-4 mb-0">
          <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-sm p-0.5 mb-0.5">
            <BarChart3 className="w-1.5 h-1.5 mx-auto text-purple-400" />
          </div>
          <p className="font-bold text-center text-[6px] mb-0.5">
            Investment Agent
          </p>
          <div className="space-y-0.5 text-[6px]">
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-purple-400/20">
              Portfolio
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-purple-400/20">
              Analytics
            </div>
            <div className="glass-card rounded-sm px-0.5 py-0.5 border border-purple-400/20">
              Advice
            </div>
          </div>
        </div>
      </div>

      {/* Animated Arrow */}
      <div className="flex justify-center mb-0">
        <ArrowRight className="w-2 h-2 text-blue-400 rotate-90" />
      </div>

      {/* Backend Systems */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <div className="glass-card rounded-sm p-0.5 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-sm p-0.5 mb-0.5">
            <Database className="w-1.5 h-1.5 text-cyan-400 mx-auto" />
          </div>
          <p className="text-center text-[6px] font-bold text-white">
            Core Banking
          </p>
          <p className="text-center text-[6px] text-white/70">Legacy Systems</p>
        </div>
        <div className="glass-card rounded-sm p-0.5 border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-sm p-0.5 mb-0.5">
            <Database className="w-1.5 h-1.5 text-green-400 mx-auto" />
          </div>
          <p className="text-center text-[6px] font-bold text-white mb-0.5">
            Insurance DB
          </p>
          <p className="text-center text-[6px] text-white/70">Policy Data</p>
        </div>
        <div className="glass-card rounded-sm p-0.5 border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-sm p-0.5 mb-0.5">
            <Database className="w-1.5 h-1.5 text-emerald-400 mx-auto" />
          </div>
          <p className="text-center text-[6px] font-bold text-white mb-0.5">
            ESG Platform
          </p>
          <p className="text-center text-[6px] text-white/70">
            Sustainability Metrics
          </p>
        </div>
      </div>
    </div>

    {/* Example Flow */}
    <div className="glass-card-strong rounded-sm p-0.5 border border-amber-400/40 relative overflow-hidden stagger-fade-in stagger-3">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10" />
      <div className="absolute top-0 right-0 w-4 h-4 bg-amber-400/10 rounded-full blur" />
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-orange-400/10 rounded-full blur" />

      <div className="relative z-10">
        <h3 className="font-bold text-white text-[6px] mb-0 flex items-center gap-0.5">
          <Zap className="w-2 h-2 text-amber-400 pulse-glow" />
          Example: "Show me my carbon footprint and suggest green investments"
        </h3>
        <div className="space-y-0 text-[6px] text-white/90">
          <div className="flex items-start gap-0.5 glass-card rounded-sm p-0.5 border border-amber-400/20 group">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-black rounded-full w-3 h-3 flex items-center justify-center flex-shrink-0 font-bold text-[6px] shadow-lg">
              1
            </div>
            <p>
              <strong className="text-amber-400">Personal Agent</strong> parses
              intent: carbon footprint analysis + investment recommendations
            </p>
          </div>
          <div className="flex items-start gap-0.5 glass-card rounded-sm p-0.5 border border-amber-400/20 group">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-black rounded-full w-3 h-3 flex items-center justify-center flex-shrink-0 font-bold text-[6px] shadow-lg">
              2
            </div>
            <p>
              <strong className="text-emerald-400">Sustainability Agent</strong>{" "}
              fetches your transaction history and calculates carbon emissions
            </p>
          </div>
          <div className="flex items-start gap-0.5 glass-card rounded-sm p-0.5 border border-amber-400/20 group">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-black rounded-full w-3 h-3 flex items-center justify-center flex-shrink-0 font-bold text-[6px] shadow-lg">
              3
            </div>
            <p>
              <strong className="text-blue-400">Bank Agent</strong> retrieves
              available investment products with ESG ratings
            </p>
          </div>
          <div className="flex items-start gap-0.5 glass-card rounded-sm p-0.5 border border-amber-400/20 group">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-black rounded-full w-3 h-3 flex items-center justify-center flex-shrink-0 font-bold text-[6px] shadow-lg">
              4
            </div>
            <p>
              <strong className="text-purple-400">Investment Agent</strong>{" "}
              analyzes portfolio fit and risk alignment
            </p>
          </div>
          <div className="flex items-start gap-0.5 glass-card rounded-sm p-0.5 border border-amber-400/20 group">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-black rounded-full w-3 h-3 flex items-center justify-center flex-shrink-0 font-bold text-[6px] shadow-lg">
              5
            </div>
            <p>
              <strong className="text-pink-400">Personal Agent</strong>{" "}
              synthesizes insights and presents unified response
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AgentsDashboard = () => {
  return (
    <div className="h-full relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-60 float" />
        <div
          className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-40 float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-50 float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-60 float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-1">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
          <AgentCollaborationView />
        </div>
      </div>
    </div>
  );
};

export default AgentsDashboard;