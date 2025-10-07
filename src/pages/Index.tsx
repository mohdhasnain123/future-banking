import { Header } from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import { GeometricOverlay } from "@/components/GeometricOverlay";
import { Task } from "@/components/TaskCard";
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
