import { TaskCard, Task } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <div
      className="glass-panel p-8 max-w-2xl w-full animate-fade-in relative"
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
      }}
    >
      {/* Futuristic 3D Header */}
      <div
        className="relative mb-8 perspective-1000 group"
        style={{ perspective: "1000px" }}
      >
        {/* Animated scan lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"
            style={{ top: "20%", animationDelay: "0s" }}
          />
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"
            style={{ top: "60%", animationDelay: "1s" }}
          />
        </div>

        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(15px)",
          }}
        >
          {/* Holographic glow layers */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 blur-xl rounded-lg animate-pulse"
            style={{ transform: "translateZ(-10px)" }}
          />
          <div
            className="absolute inset-0 bg-white/10 blur-sm rounded-lg"
            style={{ transform: "translateZ(-5px)" }}
          />

          <h2
            className="text-4xl font-bold text-white relative"
            style={{
              letterSpacing: "0.05em",
            }}
          >
            TODAY'S TASKS
          </h2>

          {/* Corner accents */}
          <div
            className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary"
            style={{ transform: "translateZ(5px)" }}
          />
          <div
            className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary"
            style={{ transform: "translateZ(5px)" }}
          />
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary"
            style={{ transform: "translateZ(5px)" }}
          />
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary"
            style={{ transform: "translateZ(5px)" }}
          />
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
