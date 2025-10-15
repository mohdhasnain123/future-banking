import React from "react";
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
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";

const AgentsDashboard = () => {
  const navigate = useNavigate();

  const AgentCollaborationView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Agent Collaboration Architecture
        </h2>
        <p className="text-indigo-100">
          How your personal AI agent orchestrates with backend services
        </p>
      </div>

      <div className="bg-glass-bg/60 backdrop-blur-md border-glass-border rounded-xl p-6">
        {/* User Layer */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-center">You</p>
            <p className="text-xs text-center text-blue-100">
              Natural Language Query
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowRight className="w-6 h-6 text-white/40 rotate-90" />
        </div>

        {/* Personal Agent Layer */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg min-w-64">
            <Bot className="w-10 h-10 mx-auto mb-3" />
            <p className="font-bold text-center text-lg mb-2">
              Personal AI Agent
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm space-y-1">
              <div className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                <span>Intent Recognition</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>Task Orchestration</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                <span>Context Management</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowRight className="w-6 h-6 text-white/40 rotate-90" />
        </div>

        {/* Agent Orchestra Layer */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow">
            <Building2 className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-center text-sm">Bank Agent</p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="bg-white/20 rounded px-2 py-1">Accounts</div>
              <div className="bg-white/20 rounded px-2 py-1">Transactions</div>
              <div className="bg-white/20 rounded px-2 py-1">Loans</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl p-4 text-white shadow">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-center text-sm">Insurance Agent</p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="bg-white/20 rounded px-2 py-1">Policies</div>
              <div className="bg-white/20 rounded px-2 py-1">Claims</div>
              <div className="bg-white/20 rounded px-2 py-1">Coverage</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl p-4 text-white shadow">
            <Leaf className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-center text-sm">
              Sustainability Agent
            </p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="bg-white/20 rounded px-2 py-1">Carbon Score</div>
              <div className="bg-white/20 rounded px-2 py-1">ESG Data</div>
              <div className="bg-white/20 rounded px-2 py-1">Green Options</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl p-4 text-white shadow">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold text-center text-sm">
              Investment Agent
            </p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="bg-white/20 rounded px-2 py-1">Portfolio</div>
              <div className="bg-white/20 rounded px-2 py-1">Analytics</div>
              <div className="bg-white/20 rounded px-2 py-1">Advice</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <ArrowRight className="w-6 h-6 text-white/40 rotate-90" />
        </div>

        {/* Backend Systems */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Database className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-center text-sm font-medium text-white">
              Core Banking
            </p>
            <p className="text-center text-xs text-white/60 mt-1">
              Legacy Systems
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Database className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-center text-sm font-medium text-white">
              Insurance DB
            </p>
            <p className="text-center text-xs text-white/60 mt-1">
              Policy Data
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <Database className="w-6 h-6 text-white mx-auto mb-2" />
            <p className="text-center text-sm font-medium text-white">
              ESG Platform
            </p>
            <p className="text-center text-xs text-white/60 mt-1">
              Sustainability Metrics
            </p>
          </div>
        </div>
      </div>

      {/* Example Flow */}
      <div className="bg-gradient-to-br from-amber-500/30 to-orange-500/30 backdrop-blur-md rounded-xl p-6 border border-amber-400/30">
        <h3 className="font-bold text-white mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-amber-400" />
          Example: "Show me my carbon footprint and suggest green investments"
        </h3>
        <div className="space-y-3 text-sm text-white/90">
          <div className="flex items-start">
            <div className="bg-amber-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs font-bold">
              1
            </div>
            <p>
              <strong className="text-white">Personal Agent</strong> parses intent: carbon footprint
              analysis + investment recommendations
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-amber-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs font-bold">
              2
            </div>
            <p>
              <strong className="text-white">Sustainability Agent</strong> fetches your transaction
              history and calculates carbon emissions
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-amber-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs font-bold">
              3
            </div>
            <p>
              <strong className="text-white">Bank Agent</strong> retrieves available investment
              products with ESG ratings
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-amber-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs font-bold">
              4
            </div>
            <p>
              <strong className="text-white">Investment Agent</strong> analyzes portfolio fit and risk
              alignment
            </p>
          </div>
          <div className="flex items-start">
            <div className="bg-amber-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs font-bold">
              5
            </div>
            <p>
              <strong className="text-white">Personal Agent</strong> synthesizes insights and presents
              unified response
            </p>
          </div>
        </div>
      </div>
    </div>
  );

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
              onClick={() => navigate("/portfolio")}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
            <h1 className="text-4xl font-bold text-white"
                style={{
                  textShadow:
                    "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)",
                  letterSpacing: "0.05em",
                }}
            >
              Agentic Mesh Architecture
            </h1>
          </div>

          <AgentCollaborationView />
        </div>
      </div>
    </div>
  );
};

export default AgentsDashboard;
