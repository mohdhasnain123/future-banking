import { CheckCircle2, Circle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "@/scene-2/src/assets/background.jpg"; // Ensure this path is correct

const TaskDashboardScene = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row gap-6 p-6 md:p-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
                      <h3 className="text-lg font-semibold text-foreground">Call with Wealth Adviser</h3>
                      <span className="text-sm text-muted-foreground">11:00 AM - 11:30AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Discuss about buying a house</p>
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
                      <h3 className="text-lg font-semibold text-foreground">Pet Therapy Appointment</h3>
                      <span className="text-sm text-muted-foreground">3:00 PM - 4:00PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">At 13th Street</p>
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
                    <Circle className="w-6 h-6 text-primary animate-pulse" fill="currentColor" />
                  </div>
                  <div className="flex-1 backdrop-blur-sm bg-card/80 rounded-2xl p-6 border border-primary/30 shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-foreground">KYC Updation</h3>
                      <span className="text-sm text-foreground">6:00 PM - 7:00PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">At 13th Street</p>
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

      {/* Date/Time */}
      <div className="absolute top-8 left-8">
        <div className="text-xl font-light text-foreground">15 July 2035, Sun</div>
        <div className="text-sm text-muted-foreground">04:06 pm</div>
      </div>

      {/* Back Arrow at Bottom Left */}
      <button
        className="absolute bottom-8 left-8 z-30 bg-card/80 border border-border rounded-full p-2 shadow-lg hover:bg-card/90 transition"
        onClick={() => navigate('/paymentscene')}
        aria-label="Go back to payment scene"
      >
        <ArrowLeft className="w-6 h-6 text-muted-foreground" />
      </button>
    </div>
  );
};

export default TaskDashboardScene;