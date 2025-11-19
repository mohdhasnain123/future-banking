import { useState, useEffect } from "react";
import { CheckCircle2, Circle, LucideAudioLines, Mic } from "lucide-react";
import { formatDate, formatTime } from "@/components/utils";
import backgroundImage from "@/scene-2/src/assets/dashboard-bg.jpg";; // Ensure this path is correct

const TaskDashboardScene = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row gap-6 p-6 md:p-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Task Dashboard */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="backdrop-blur-md bg-card/50 border border-border rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Today's Tasks</h2>

            <div className="space-y-6 relative">
              {/* Task 1 - Completed */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="relative z-10 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 backdrop-blur-sm rounded-2xl p-6 border bg-muted/30 border-border/50 opacity-60">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        Call with Wealth Adviser
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        11:00 AM - 11:30AM
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Discuss about buying a house
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-muted/50 text-muted-foreground">
                      Law
                    </span>
                  </div>
                </div>
              </div>

              {/* Task 2 - Completed */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="relative z-10 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 backdrop-blur-sm rounded-2xl p-6 border bg-muted/30 border-border/50 opacity-60">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        Pet Therapy Appointment
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        3:00 PM - 4:00PM
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      At 13th Street
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-500">
                      Medium Priority
                    </span>
                  </div>
                </div>
              </div>

              {/* Task 3 - Current */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="relative z-10 mt-1">
                    <Circle
                      className="w-6 h-6 text-primary animate-pulse"
                      fill="currentColor"
                    />
                  </div>
                  <div className="flex-1 backdrop-blur-sm bg-card/80 rounded-2xl p-6 border border-primary/30 shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        KYC Updation
                      </h3>
                      <span className="text-sm text-foreground">
                        6:00 PM - 7:00PM
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      At 13th Street
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-destructive/30 text-destructive border border-destructive/50">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top right microphone status */}
      {browserSupportsSpeechRecognition && (
        <div className="absolute top-6 right-8 z-20">
          <div className="flex items-center gap-2 text-sm text-white/70 ml-4">
            {listening ? (
              <>
                <Mic className={`w-5 h-5 text-green-400 animate-pulse`} />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <LucideAudioLines className="w-5 h-5 text-blue-400" />
                <span>Dot</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Date/Time */}
      <div className="absolute top-8 left-8">
        <div className="text-xl font-light text-foreground">
          {formatDate(currentTime)}
        </div>
        <div className="text-sm text-muted-foreground">04:06 pm</div>
      </div>
    </div>
  );
};

export default TaskDashboardScene;
