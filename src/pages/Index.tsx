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

const Index = ({
  clockTargetTime,
  setClockTargetTime,
}) => {
  return (
    <div className="h-full relative overflow-hidden">
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
      <div className="relative z-10 h-full p-2 md:p-3 lg:p-4">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-2 lg:gap-3 items-start h-full">
            {/* Left side - Header */}
            <div className="pt-2">
              <Header userName="Vick" />
            </div>

            {/* Right side - Tasks */}
            <div className="flex flex-col items-end pt-2">
              <TaskList
                tasks={mockTasks}
                showClock={true}
                clockTargetTime={clockTargetTime}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;