import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  MapPin,
  Clock,
  Briefcase,
  Coffee,
  Dumbbell,
  ShoppingCart,
  Users,
  Dog,
  Calendar as CalendarIcon,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Task {
  id: string;
  title: string;
  time: string;
  location: string;
  priority: "low" | "medium" | "high";
  icon?: string;
  onClick?: string;
}

const taskIcons = {
  briefcase: Briefcase,
  coffee: Coffee,
  dumbbell: Dumbbell,
  shopping: ShoppingCart,
  meeting: Users,
  calendar: CalendarIcon,
  video: Video,
};

interface TaskCardProps {
  task: Task;
  isLast?: boolean;
}

export const TaskCard = ({ task, isLast = false }: TaskCardProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const priorityColors = {
    low: "bg-priority-low text-white",
    medium: "bg-priority-medium text-black",
    high: "bg-priority-high text-white",
  };

  // Get icon based on task title or use default
  const getTaskIcon = () => {
    const title = task.title.toLowerCase();
    if (task.icon && task.icon in taskIcons) {
      return taskIcons[task.icon as keyof typeof taskIcons];
    }
    if (title.includes("meeting") || title.includes("team")) return Users;
    if (title.includes("workout") || title.includes("gym")) return Dumbbell;
    if (title.includes("coffee") || title.includes("lunch")) return Coffee;
    if (title.includes("shopping")) return ShoppingCart;
    if (title.includes("pet")) return Dog;
    return Briefcase;
  };

  const TaskIcon = getTaskIcon();

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative pl-2 pb-1 last:pb-0">
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-0.5 w-1.5 h-1.5 rounded-full bg-timeline-dot shadow"
        style={{
          transform: "translateZ(1px)",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.15), 0 0 2px hsl(var(--timeline-dot)/0.4)",
        }}
      />

      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[2px] top-2 bottom-0 w-0.5 bg-timeline-line/30" />
      )}

      {/* 3D Task card */}
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className="w-full text-left perspective-1000"
        style={{ perspective: "1000px" }}
      >
        <div
          className={cn(
            "glass-card p-1 space-y-0.5 transition-all duration-300 animate-scale-in cursor-pointer group relative rounded-sm",
            "hover:bg-[hsl(var(--glass-bg)/0.5)]",
            isPressed ? "scale-[0.98]" : "hover:scale-[1.01]",
            isExpanded && "bg-[hsl(var(--glass-bg)/0.6)]"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isPressed
              ? "translateZ(-1px)"
              : isExpanded
              ? "translateZ(2px) rotateX(-1deg)"
              : "translateZ(0) rotateX(0deg)",
            boxShadow: isExpanded
              ? "0 4px 8px rgba(0,0,0,0.18), 0 0 4px rgba(255,255,255,0.05)"
              : "0 2px 4px rgba(0,0,0,0.10)",
          }}
        >
          {/* 3D depth layer */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-sm pointer-events-none"
            style={{ transform: "translateZ(0.5px)" }}
          />

          <div className="flex items-start justify-between gap-0.5 relative z-10">
            {/* Task Icon */}
            <div
              className="relative flex-shrink-0"
              style={{ transform: "translateZ(1.5px)" }}
            >
              <div className="absolute inset-0 bg-primary/50 blur rounded-full animate-pulse" />
              <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center border border-primary/50">
                <TaskIcon className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="space-y-0 flex-1">
              <h3 className="text-[9px] font-semibold text-white group-hover:text-glow transition-all truncate">
                {task.title}
              </h3>
              <div className="flex items-center gap-0.5 text-[8px] text-white/60">
                <MapPin className="w-2 h-2" />
                <p className="truncate">{task.location}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-0.5 text-[9px] font-medium text-white">
                <Clock className="w-2 h-2" />
                <span>{task.time}</span>
              </div>
              <Badge
                className={cn(
                  "px-1 py-0.5 font-medium capitalize shadow transition-transform text-[8px]",
                  priorityColors[task.priority],
                  isExpanded && "scale-105"
                )}
                style={{
                  transform: "translateZ(1px)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
                }}
              >
                {task.priority}
              </Badge>
            </div>
          </div>

          {/* Expand indicator */}
          <div className="flex items-center justify-center pt-0.5 relative z-10">
            <ChevronDown
              className={cn(
                "w-2 h-2 text-white/50 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div
              className="pt-0.5 border-t border-white/10 space-y-0.5 animate-fade-in relative z-10"
              style={{ transform: "translateZ(0.5px)" }}
            >
              <p className="text-[8px] text-white/70">
                Click to mark as complete or edit task details
              </p>
              <div className="flex gap-0.5">
                <button
                  className="px-1.5 py-0.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[8px] font-medium transition-all hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add complete functionality
                  }}
                >
                  Complete
                </button>
                <button
                  className="px-1.5 py-0.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[8px] font-medium transition-all hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add edit functionality
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};