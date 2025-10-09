import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown, MapPin, Clock, Briefcase, Coffee, Dumbbell, ShoppingCart, Users, Calendar as CalendarIcon, Video } from "lucide-react";
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
    if (title.includes('meeting') || title.includes('team')) return Users;
    if (title.includes('workout') || title.includes('gym')) return Dumbbell;
    if (title.includes('coffee') || title.includes('lunch')) return Coffee;
    if (title.includes('shopping')) return ShoppingCart;
    return Briefcase;
  };

  const TaskIcon = getTaskIcon();

  const handleClick = () => {
    if (task.onClick) {
      navigate(task.onClick);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline dot - now 3D */}
      <div 
        className="absolute left-0 top-2 w-3 h-3 rounded-full bg-timeline-dot shadow-lg shadow-timeline-dot/50"
        style={{
          transform: "translateZ(5px)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3), 0 0 10px hsl(var(--timeline-dot)/0.5)"
        }}
      />
      
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-timeline-line/30" />
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
            "glass-card p-6 space-y-3 transition-all duration-300 animate-scale-in cursor-pointer group relative",
            "hover:bg-[hsl(var(--glass-bg)/0.5)]",
            isPressed ? "scale-[0.98]" : "hover:scale-[1.02]",
            isExpanded && "bg-[hsl(var(--glass-bg)/0.6)]"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isPressed 
              ? "translateZ(-5px)" 
              : isExpanded 
                ? "translateZ(10px) rotateX(-2deg)" 
                : "translateZ(0) rotateX(0deg)",
            boxShadow: isExpanded
              ? "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)"
              : "0 10px 20px rgba(0,0,0,0.3)"
          }}
        >
          {/* 3D depth layer */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"
            style={{ transform: "translateZ(2px)" }}
          />

          <div className="flex items-start justify-between gap-4 relative z-10">
            {/* Task Icon with futuristic glow */}
            <div 
              className="relative flex-shrink-0"
              style={{ transform: "translateZ(8px)" }}
            >
              <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full animate-pulse" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center border border-primary/50">
                <TaskIcon className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-glow transition-all">
                {task.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" />
                <p>{task.location}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 text-lg font-medium text-white">
                <Clock className="w-5 h-5" />
                <span>{task.time}</span>
              </div>
              <Badge
                className={cn(
                  "px-3 py-1 font-medium capitalize shadow-lg transition-transform",
                  priorityColors[task.priority],
                  isExpanded && "scale-110"
                )}
                style={{
                  transform: "translateZ(5px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
                }}
              >
                {task.priority} Priority
              </Badge>
            </div>
          </div>

          {/* Expand indicator */}
          <div className="flex items-center justify-center pt-2 relative z-10">
            <ChevronDown 
              className={cn(
                "w-5 h-5 text-white/50 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div 
              className="pt-4 border-t border-white/10 space-y-2 animate-fade-in relative z-10"
              style={{ transform: "translateZ(3px)" }}
            >
              <p className="text-sm text-white/70">
                Click to mark as complete or edit task details
              </p>
              <div className="flex gap-2">
                <button 
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add complete functionality
                  }}
                >
                  Complete
                </button>
                <button 
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all hover:scale-105"
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
