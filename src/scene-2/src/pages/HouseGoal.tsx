import { useState } from "react";
import { Card, CardContent } from "@/scene-2/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/scene-2/src/components/ui/button";
import { Input } from "@/scene-2/src/components/ui/input";
import { Progress } from "@/scene-2/src/components/ui/progress";
import { Home, Plus, Minus, Mic } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import backgroundImage from "@/scene-2/src/assets/background.jpg";

interface Goal {
  id: string;
  name: string;
  icon: any;
  target: number;
  saved: number;
  percentage: number;
  targetDate: string;
  remaining: number;
}

const HouseGoal = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [amount, setAmount] = useState("");

  const [goal, setGoal] = useState<Goal>({
    id: "1",
    name: "Buy a House",
    icon: Home,
    target: 50000,
    saved: 35200,
    percentage: 70.4,
    targetDate: "Dec, 2046",
    remaining: 14800,
  });

  const handleAddFunds = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        variant: "destructive",
      });
      return;
    }

    const amountToAdd = parseFloat(amount);
    setGoal((prevGoal) => {
      const newSaved = Math.min(prevGoal.saved + amountToAdd, prevGoal.target);
      const newPercentage = (newSaved / prevGoal.target) * 100;
      const newRemaining = prevGoal.target - newSaved;
      return {
        ...prevGoal,
        saved: newSaved,
        percentage: parseFloat(newPercentage.toFixed(1)),
        remaining: newRemaining,
      };
    });

    toast({
      title: "Funds Added",
      description: `Successfully added $${amountToAdd.toLocaleString()} to ${goal.name}`,
    });
    setAmount("");
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }

    const amountToWithdraw = parseFloat(amount);
    if (amountToWithdraw > goal.saved) {
      toast({
        title: "Insufficient Funds",
        description: "You cannot withdraw more than the saved amount.",
        variant: "destructive",
      });
      return;
    }

    setGoal((prevGoal) => {
      const newSaved = prevGoal.saved - amountToWithdraw;
      const newPercentage = (newSaved / prevGoal.target) * 100;
      const newRemaining = prevGoal.target - newSaved;
      return {
        ...prevGoal,
        saved: newSaved,
        percentage: parseFloat(newPercentage.toFixed(1)),
        remaining: newRemaining,
      };
    });

    toast({
      title: "Funds Withdrawn",
      description: `Successfully withdrawn $${amountToWithdraw.toLocaleString()} from ${goal.name}`,
    });
    setAmount("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
                  House Savings Goal
                </h1>
                <p className="text-muted-foreground text-lg">
                  Track your progress towards your dream home
                </p>
              </div>
              {browserSupportsSpeechRecognition && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mic
                    className={`w-5 h-5 ${
                      listening ? "text-primary animate-pulse" : ""
                    }`}
                  />
                  <span>{listening ? "Listening..." : "Mic off"}</span>
                </div>
              )}
            </div>
          </div>

          {/* Goal Card */}
          <div className="max-w-2xl mx-auto">
            <Card
              className="bg-card/60 backdrop-blur-sm border-border hover:bg-card/80 transition-all cursor-pointer shadow-lg"
              onClick={() => setShowDetails(true)}
            >
              <CardContent className="p-8 space-y-6">
                {/* Goal Header */}
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/20 border border-primary/30">
                    <Home className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">
                      {goal.name}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Your path to homeownership
                    </p>
                  </div>
                </div>

                {/* Target Amount */}
                <div className="bg-secondary/50 rounded-lg p-6 border border-border">
                  <p className="text-5xl font-bold text-foreground">
                    ${goal.target.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Target Amount
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Progress
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ${goal.saved.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">saved so far</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-foreground">
                        {goal.percentage}%
                      </p>
                      <p className="text-xs text-muted-foreground">complete</p>
                    </div>
                  </div>
                  <Progress value={goal.percentage} className="h-3" />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Target Date
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {goal.targetDate}
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Remaining
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      ${goal.remaining.toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground pt-4">
                  Click to manage contributions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Goal Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-background/95 backdrop-blur-sm max-w-md border-border">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6 text-primary" />
              <DialogTitle className="text-foreground">{goal.name}</DialogTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage your goal progress and make contributions
            </p>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Progress Overview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Progress Overview
                </h4>
                <span className="text-primary font-bold text-lg">
                  {goal.percentage}%
                </span>
              </div>
              <Progress value={goal.percentage} className="h-3" />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Saved</p>
                  <p className="text-primary font-semibold">
                    ${goal.saved.toLocaleString()}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                  <p className="text-foreground font-semibold">
                    ${goal.remaining.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Target Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-border">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Target Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Target Amount
                  </p>
                  <p className="font-semibold text-foreground">
                    ${goal.target.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Target Date
                  </p>
                  <p className="font-semibold text-foreground">{goal.targetDate}</p>
                </div>
              </div>
            </div>

            {/* Make a Contribution */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
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
                  className="border-primary/30 focus:border-primary bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleAddFunds}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HouseGoal;
