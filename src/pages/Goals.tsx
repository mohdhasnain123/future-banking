import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  Plane,
  Sprout,
  Cat,
  Plus,
  Minus,
  Mic,
  LucideAudioLines,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import mountainBg from "@/assets/mountain-bg.jpg";
import UpdatedCalendar from "./UpdatedCalendar";
import { formatDate, formatTime } from "@/components/utils";

interface Goal {
  id: string;
  name: string;
  icon: any;
  target: number;
  saved: number;
  percentage: number;
  targetDate: string;
  remaining: number;
  color: string;
}

const Goals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [amount, setAmount] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showCalendar") === "true") {
      setShowCalendarModal(true);
      // Optional: remove the query param from URL after opening the modal
      navigate("/goals", { replace: true });
    }
    if (params.get("showSelectedGoal") === "true") {
      setSelectedGoal({
        id: "1",
        name: "Buy a House",
        icon: Home,
        target: 50000,
        saved: 35000,
        percentage: 70,
        targetDate: "Dec, 2046",
        remaining: 15000,
        color: "hsl(142, 76%, 36%)",
      });
      // Optional: remove the query param from URL after opening the modal
      navigate("/goals", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [glowingIndex, setGlowingIndex] = useState(0);
  const [glowStopped, setGlowStopped] = useState(false);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Buy a House",
      icon: Home,
      target: 50000,
      saved: 35000,
      percentage: 70,
      targetDate: "Dec, 2046",
      remaining: 15000,
      color: "hsl(142, 76%, 36%)",
    },
    {
      id: "2",
      name: "Retire by 40",
      icon: Plane,
      target: 100000,
      saved: 30000,
      percentage: 30,
      targetDate: "July, 2055",
      remaining: 70000,
      color: "hsl(45, 90%, 65%)",
    },
    {
      id: "3",
      name: "Vacation",
      icon: Plane,
      target: 2000,
      saved: 1700,
      percentage: 85,
      targetDate: "Dec, 2045",
      remaining: 300,
      color: "hsl(142, 76%, 36%)",
    },
    {
      id: "4",
      name: "Donate to Greenpeace",
      icon: Sprout,
      target: 10000,
      saved: 8500,
      percentage: 85,
      targetDate: "Dec, 2045",
      remaining: 1500,
      color: "hsl(142, 76%, 36%)",
    },
    {
      id: "5",
      name: "Pet cafe",
      icon: Cat,
      target: 20000,
      saved: 3000,
      percentage: 15,
      targetDate: "Dec, 2045",
      remaining: 17000,
      color: "hsl(0, 70%, 60%)",
    },
  ]);

  useEffect(() => {
    if (!selectedGoal && !glowStopped) {
      if (glowingIndex < goals.length - 1) {
        const interval = setInterval(() => {
          setGlowingIndex((prev) => prev + 1);
        }, 1500);
        return () => clearInterval(interval);
      } else if (glowingIndex === goals.length - 1) {
        // After last card, wait, then reset to first and stop cycling
        const timeout = setTimeout(() => {
          setGlowingIndex(0);
          setGlowStopped(true); // Stop further cycling
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }
  }, [selectedGoal, glowingIndex, goals.length, glowStopped]);

  useEffect(() => {
    if (selectedGoal) {
      setGlowStopped(false);
    }
  }, [selectedGoal]);

  // Optionally, also reset when goals list changes
  useEffect(() => {
    setGlowingIndex(0);
    setGlowStopped(false);
  }, [goals.length]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showCalendar") === "true") {
      setShowCalendarModal(true);
      navigate("/goals", { replace: true });
    }
    if (params.get("showSelectedGoal") === "true") {
      setSelectedGoal({
        id: "1",
        name: "Buy a House",
        icon: Home,
        target: 50000,
        saved: 35000,
        percentage: 70,
        targetDate: "Dec, 2046",
        remaining: 15000,
        color: "hsl(142, 76%, 36%)",
      });
      navigate("/goals", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddFunds = () => {
    if (!selectedGoal || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        variant: "destructive",
      });
      return;
    }

    const amountToAdd = parseFloat(amount);
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === selectedGoal.id) {
          const newSaved = Math.min(goal.saved + amountToAdd, goal.target);
          const newPercentage = Math.round((newSaved / goal.target) * 100);
          const newRemaining = goal.target - newSaved;
          return {
            ...goal,
            saved: newSaved,
            percentage: newPercentage,
            remaining: newRemaining,
          };
        }
        return goal;
      })
    );

    toast({
      title: "Funds Added",
      description: `Successfully added $${amountToAdd.toLocaleString()} to ${
        selectedGoal.name
      }`,
    });
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!selectedGoal || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }

    const amountToWithdraw = parseFloat(amount);
    if (amountToWithdraw > selectedGoal.saved) {
      toast({
        title: "Insufficient Funds",
        description: "You cannot withdraw more than the saved amount.",
        variant: "destructive",
      });
      return;
    }

    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === selectedGoal.id) {
          const newSaved = goal.saved - amountToWithdraw;
          const newPercentage = Math.round((newSaved / goal.target) * 100);
          const newRemaining = goal.target - newSaved;
          return {
            ...goal,
            saved: newSaved,
            percentage: newPercentage,
            remaining: newRemaining,
          };
        }
        return goal;
      })
    );

    toast({
      title: "Funds Withdrawn",
      description: `Successfully withdrawn $${amountToWithdraw.toLocaleString()} from ${
        selectedGoal.name
      }`,
    });
    setAmount("");
  };

  const [animatedProgress, setAnimatedProgress] = useState(goals.map(() => 0));

  useEffect(() => {
    // Animate each progress bar to its percentage
    let animationFrame;
    let start;

    function animate(time) {
      if (!start) start = time;
      const progress = Math.min((time - start) / 800, 1); // 800ms animation

      setAnimatedProgress(
        goals.map((goal, i) => {
          return Math.floor(goal.percentage * progress);
        })
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setAnimatedProgress(goals.map((goal) => goal.percentage));
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [goals]);

  return (
    <div className="min-h-screen max-h-[1600px] relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen max-h-[1600px] overflow-y-auto p-4">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-2xl md:text-xl font-bold text-white mb-2">
                  My Goals
                </h1>
                <div className="mt-1 text-white/90">
                  <p className="text-base font-medium text-sm">
                    {formatTime("8:00 AM", 30)} | {formatDate(currentTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[900px] overflow-y-auto">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const isGlowing = selectedGoal
                ? selectedGoal.id === goal.id
                : index === glowingIndex;
              return (
                <Card
                  key={goal.id}
                  className={`bg-glass-bg/60 backdrop-blur-md border-2 cursor-pointer hover:bg-glass-bg/80 transition-all duration-300 ${
                    isGlowing
                      ? "animate-glow-border rounded-lg"
                      : "border border-white/10 rounded-lg"
                  }`}
                  style={
                    isGlowing
                      ? {
                          boxShadow:
                            "0 0 20px 5px #e4e3eeff, 0 0 20px 5px #d7deebff",
                        }
                      : {}
                  }
                  onClick={() => setSelectedGoal(goal)}
                >
                  <CardContent className="p-2 space-y-1">
                    {/* Goal Header */}
                    <div className="flex items-center gap-2">
                      <Icon className="w-3 h-3 text-white" />
                      <h3 className="text-sm font-semibold text-white">
                        {goal.name}
                      </h3>
                    </div>

                    {/* Target Amount */}
                    <div>
                      <p className="text-xs font-bold text-white">
                        ${goal.target.toLocaleString()}
                      </p>
                      <p className="text-white/50 text-xs">target</p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <span
                          className="text-xs font-medium"
                          style={{ color: goal.color }}
                        >
                          ${goal.saved.toLocaleString()} saved so far
                        </span>
                        <span className="text-xs font-medium text-white">
                          {animatedProgress[index]}%
                        </span>
                      </div>
                      <Progress
                        value={animatedProgress[index]}
                        className="h-1"
                        style={{
                          // @ts-ignore
                          "--progress-color": goal.color,
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-white/60">
                        <span>Target</span>
                        <span className="text-white/90">{goal.targetDate}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Remaining</span>
                        <span className="text-white/90">
                          ${goal.remaining.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Goal Details Modal */}
      <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
        <DialogContent className="bg-background/95 backdrop-blur-sm max-w-md max-h-[90vh] overflow-y-auto">
          {selectedGoal && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <selectedGoal.icon className="w-6 h-6" />
                  <DialogTitle>{selectedGoal.name}</DialogTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  Manage your goal progress and make contributions
                </p>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Progress Overview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Progress Overview
                    </h4>
                    <span className="text-green-600 font-bold text-base">
                      {selectedGoal.percentage}%
                    </span>
                  </div>
                  <Progress value={selectedGoal.percentage} className="h-2" />
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Saved
                      </p>
                      <p className="text-green-600 font-semibold text-sm">
                        ${selectedGoal.saved.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Remaining
                      </p>
                      <p className="font-semibold text-sm">
                        ${selectedGoal.remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Target Details */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                  <h4 className="text-xs font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Target Details
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Target Amount
                      </p>
                      <p className="font-semibold text-sm">
                        ${selectedGoal.target.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Target Date
                      </p>
                      <p className="font-semibold text-sm">
                        {selectedGoal.targetDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Updated Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-2 overflow-y-auto bg-transparent border-none shadow-none rounded-2xl">
          <div className="h-[80vh] flex items-center justify-center">
            <UpdatedCalendar
              isModal={true}
              onClose={() => setShowCalendarModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;
