import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  Plane,
  Sprout,
  Cat,
  ArrowLeft,
  Plus,
  Minus,
  Calendar,
  Mic,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import mountainBg from "@/assets/mountain-bg.jpg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import UpdatedCalendar from "./UpdatedCalendar";

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

const Goals = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [amount, setAmount] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const commands = useMemo(
    () => [
      {
        command: /updated calendar/i,
        callback: () => {
          setShowCalendarModal(true);
          toast({
            title: "Opening Calendar",
            description: "Voice command recognized: Updated Calendar",
          });
        },
      },
    ],
    []
  );

  const { transcript } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return;
    }
    SpeechRecognition.startListening({ continuous: true });
    return () => SpeechRecognition.stopListening();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  My Goals
                </h1>
                <p className="text-white/70 text-lg">
                  Track your financial objectives and celebrate your progress
                </p>
                <div className="mt-4 text-white/90">
                  <p className="text-lg font-medium">
                    {formatTime(currentTime)} | {formatDate(currentTime)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                {browserSupportsSpeechRecognition && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Mic
                      className={`w-5 h-5 ${
                        listening ? "text-green-400 animate-pulse" : ""
                      }`}
                    />
                    <span>{listening ? "Listening..." : "Mic off"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <Card
                  key={goal.id}
                  className="bg-glass-bg/60 backdrop-blur-md border-glass-border cursor-pointer hover:bg-glass-bg/80 transition-all"
                  onClick={() => setSelectedGoal(goal)}
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Goal Header */}
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-white" />
                      <h3 className="text-xl font-semibold text-white">
                        {goal.name}
                      </h3>
                    </div>

                    {/* Target Amount */}
                    <div>
                      <p className="text-3xl font-bold text-white">
                        ${goal.target.toLocaleString()}
                      </p>
                      <p className="text-white/50 text-sm">target</p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span
                          className="text-sm font-medium"
                          style={{ color: goal.color }}
                        >
                          ${goal.saved.toLocaleString()} saved so far
                        </span>
                        <span className="text-sm font-medium text-white">
                          {goal.percentage}%
                        </span>
                      </div>
                      <Progress
                        value={goal.percentage}
                        className="h-2"
                        style={{
                          // @ts-ignore
                          "--progress-color": goal.color,
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-1 text-sm">
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
        <DialogContent className="bg-background/95 backdrop-blur-sm max-w-md">
          {selectedGoal && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <selectedGoal.icon className="w-6 h-6" />
                  <DialogTitle>{selectedGoal.name}</DialogTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage your goal progress and make contributions
                </p>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Progress Overview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Progress Overview
                    </h4>
                    <span className="text-green-600 font-bold text-lg">
                      {selectedGoal.percentage}%
                    </span>
                  </div>
                  <Progress value={selectedGoal.percentage} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Saved
                      </p>
                      <p className="text-green-600 font-semibold">
                        ${selectedGoal.saved.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Remaining
                      </p>
                      <p className="font-semibold">
                        ${selectedGoal.remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Target Details */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Target Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Target Amount
                      </p>
                      <p className="font-semibold">
                        ${selectedGoal.target.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Target Date
                      </p>
                      <p className="font-semibold">{selectedGoal.targetDate}</p>
                    </div>
                  </div>
                </div>

                {/* Make a Contribution */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Make a Contribution
                  </h4>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-green-500/30 focus:border-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleAddFunds}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                    <Button
                      onClick={handleWithdraw}
                      variant="outline"
                      className="border-border hover:bg-accent"
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Updated Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
          <div className="h-[95vh] overflow-auto">
            <UpdatedCalendar />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;
