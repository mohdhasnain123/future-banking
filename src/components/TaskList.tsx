import { Clock } from "./Clock";
import { TaskCard, Task } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  showClock?: boolean;
  clockTargetTime?: { hours: number; minutes: number };
}

export const TaskList = ({
  tasks,
  showClock = false,
  clockTargetTime,
}: TaskListProps) => {
  return (
    <div
      className="glass-panel p-2 max-w-xs w-full animate-fade-in relative"
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
      }}
    >
      {/* Futuristic 3D Header */}
      <div
        className="relative mb-2 perspective-1000 group"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(8px)",
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 blur rounded animate-pulse"
            style={{ transform: "translateZ(-5px)" }}
          />
          <h2
            className="text-base font-bold text-white relative mb-1 text-center"
            style={{
              letterSpacing: "0.04em",
            }}
          >
            TODAY'S TASKS
          </h2>
          {showClock && <Clock targetTime={clockTargetTime} />}
        </div>
      </div>

      <div className="space-y-0">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            isLast={index === tasks.length - 1}
          />
        ))}
      </div>
    </div>
  );
};