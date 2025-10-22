import { TaskList } from "@/components/TaskList";
import { GeometricOverlay } from "@/components/GeometricOverlay";
import { Task } from "@/components/TaskCard";
import { X } from "lucide-react";
import mountainBg from "@/assets/mountain-bg.jpg";

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

interface UpdatedCalendarProps {
  isModal?: boolean;
  onClose?: () => void;
}

const UpdatedCalendar = ({
  isModal = false,
  onClose,
}: UpdatedCalendarProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Background Image and overlays as before */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mountainBg})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      <GeometricOverlay />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {isModal && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          {/* Only TaskList scrolls if needed */}
          <div className="w-full flex flex-col gap-6 items-center justify-center max-h-[80vh] overflow-y-auto">
            <TaskList tasks={mockTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedCalendar;
