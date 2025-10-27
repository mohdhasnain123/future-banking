import { TaskList } from "@/components/TaskList";
import { Task } from "@/components/TaskCard";

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
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
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
