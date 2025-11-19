import { useState, useEffect } from "react";
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
import { Home, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import dreamHouseImage from "@/assets/dream-house.jpg";

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

const HouseGoal = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [amount, setAmount] = useState("");
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // Current state of the goal
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

  // Previous state for comparison
  const [previousGoal] = useState<Goal>({
    id: "1",
    name: "Buy a House",
    icon: Home,
    target: 50000,
    saved: 35000,
    percentage: 70,
    targetDate: "Dec, 2046",
    remaining: 15000,
  });

  useEffect(() => {
    // Animate the progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setAnimatedPercentage(progress);
      if (progress >= goal.percentage) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [goal.percentage]);

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
      description: `Successfully added $${amountToAdd.toLocaleString()} to ${
        goal.name
      }`,
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
      description: `Successfully withdrawn $${amountToWithdraw.toLocaleString()} from ${
        goal.name
      }`,
    });
    setAmount("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image */}
      <div
        className="w-1/2 h-screen bg-cover bg-center fixed"
        style={{ backgroundImage: `url(${dreamHouseImage})` }}
      />

      {/* Right Side: Content */}
      <div className="w-1/2 ml-auto overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="sticky top-0 bg-background z-20 p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
                  House Savings Goal
                </h1>
              </div>
            </div>
          </div>

          {/* Goal Card */}
          <div className="max-w-3xl mx-auto p-4">
            <Card 
              className="bg-card/60 backdrop-blur-sm border-border shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setShowDetails(true)}
            >
              <CardContent className="p-6 space-y-4">
                {/* Goal Header */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                    <Home className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {goal.name}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Your path to homeownership
                    </p>
                  </div>
                </div>

                {/* Target Amount */}
                <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                  <p className="text-4xl font-bold text-foreground">
                    ${goal.target.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Target Amount
                  </p>
                </div>

                {/* Progress Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Previous Data */}
                  <div className="space-y-2 border-r border-border pr-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Previous
                    </h3>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Saved
                      </p>
                      <p className="text-lg font-bold text-muted-foreground">
                        ${previousGoal.saved.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Progress
                      </p>
                      <p className="text-xl font-bold text-muted-foreground">
                        {previousGoal.percentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Remaining
                      </p>
                      <p className="text-lg font-bold text-muted-foreground">
                        ${previousGoal.remaining.toLocaleString()}
                      </p>
                    </div>
                    <Progress value={previousGoal.percentage} className="h-2 opacity-50" />
                  </div>

                  {/* Current Data */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Updated
                    </h3>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Saved
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ${goal.saved.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Progress
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {animatedPercentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Remaining
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ${goal.remaining.toLocaleString()}
                      </p>
                    </div>
                    <Progress value={animatedPercentage} className="h-3" />
                  </div>
                </div>

                {/* Target Date */}
                <div className="bg-secondary/30 rounded-lg p-3 border border-border mt-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Target Date
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {goal.targetDate}
                  </p>
                </div>
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
                  <p className="text-xs text-muted-foreground mb-1">
                    Remaining
                  </p>
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
                  <p className="font-semibold text-foreground">
                    {goal.targetDate}
                  </p>
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