import { Header } from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import { GeometricOverlay } from "@/components/GeometricOverlay";
import { Task } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Pet Therapy Appointment",
    time: "3:00 PM",
    location: "At 13th Street",
    priority: "medium",
  },
  {
    id: "2",
    title: "KYC Updation",
    time: "6:00 PM",
    location: "At 13th Street",
    priority: "high",
  },
];

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mountainBg})`,
        }}
      />
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      
      {/* Geometric Overlay */}
      <GeometricOverlay />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen p-8 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side - Header */}
            <div className="pt-8">
              <Header userName="Vick" />
              <div className="mt-8">
                <Button 
                  onClick={() => navigate("/portfolio")}
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all"
                  size="lg"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Right side - Tasks */}
            <div className="flex justify-end pt-8">
              <TaskList tasks={mockTasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
