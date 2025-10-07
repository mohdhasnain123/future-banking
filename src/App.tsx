import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import PayerMixAnalytics from "./pages/PayerMixAnalytics";
import RecoveryRateAnalysis from "./pages/RecoveryRateAnalysis";
import IoMTDeviceNetwork from "./pages/IoMTDeviceNetwork";
import AIAgentMatrix from "./pages/AIAgentMatrix";
import EmergencyAlert from "./pages/EmergencyAlert";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                  <SidebarTrigger className="mr-4" />
                </div>
              </div>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/payer-mix" element={<PayerMixAnalytics />} />
                <Route path="/recovery-rate" element={<RecoveryRateAnalysis />} />
                <Route path="/iomt-network" element={<IoMTDeviceNetwork />} />
                <Route path="/ai-agent-matrix" element={<AIAgentMatrix />} />
                <Route path="/emergency-alert" element={<EmergencyAlert />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
