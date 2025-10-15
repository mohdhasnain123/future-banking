import { TaskList } from "@/components/TaskList";
import { GeometricOverlay } from "@/components/GeometricOverlay";
import { Task } from "@/components/TaskCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import { useState, useEffect } from "react";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Call with Wealth Advisor",
    time: "11:00 AM",
    location: "Virtual Meeting",
    priority: "high",
    icon: "video",
    onClick: "/wealth-advisor",
  },
  {
    id: "2",
    title: "Pet Therapy Appointment",
    time: "3:00 PM",
    location: "At 13th Street",
    priority: "medium",
  },
  {
    id: "3",
    title: "KYC Updation",
    time: "6:00 PM",
    location: "At 13th Street",
    priority: "high",
  },
];

const UpdatedCalendar = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const dayName = date.toLocaleString("en-US", { weekday: "short" });
    return `${day} ${month} ${year}, ${dayName}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  
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
          {/* Back Button */}
          <button
            onClick={() => navigate("/goals")}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Goals</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side - Date and Time */}
            <div className="pt-8">
              <header className="relative z-10 space-y-2 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <h2 className="text-xl font-medium tracking-wide text-white/90">
                      {formatDate(currentTime)}
                    </h2>
                    <p className="text-lg text-white/70">{formatTime(currentTime)}</p>
                  </div>
                  {/* <CalendarPicker /> */}
                </div>
              </header>
            </div>
            
            {/* Right side - Tasks */}
            <div className="flex flex-col gap-6 justify-end pt-8">
              <TaskList tasks={mockTasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedCalendar;
