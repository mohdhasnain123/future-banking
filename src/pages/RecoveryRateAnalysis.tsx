import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Activity, Clock, Target, Users, Heart, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoveryRateAnalysis = () => {
  const navigate = useNavigate();
  const [recoveryMetrics, setRecoveryMetrics] = useState([
    { category: "Cardiac Surgery", rate: 94.20, trend: "+2.10%", patients: 342, avgDays: 8.50 },
    { category: "Orthopedic Surgery", rate: 96.80, trend: "+3.20%", patients: 289, avgDays: 6.20 },
    { category: "Emergency Medicine", rate: 91.50, trend: "+1.80%", patients: 578, avgDays: 3.10 },
    { category: "ICU Recovery", rate: 87.30, trend: "+4.50%", patients: 156, avgDays: 12.80 }
  ]);

  // Live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRecoveryMetrics(prev => prev.map(metric => ({
        ...metric,
        rate: parseFloat((Math.max(80, Math.min(98, metric.rate + (Math.random() - 0.5) * 1))).toFixed(2)),
        patients: metric.patients + Math.floor(Math.random() * 5) - 2,
        avgDays: parseFloat((Math.max(2, metric.avgDays + (Math.random() - 0.5) * 0.5)).toFixed(2)),
        trend: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 5 + 0.5).toFixed(2)}%`
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const outcomeData = [
    { outcome: "Full Recovery", percentage: 78.5, color: "bg-success", count: 1247 },
    { outcome: "Partial Recovery", percentage: 15.2, color: "bg-warning", count: 241 },
    { outcome: "Complications", percentage: 4.8, color: "bg-destructive", count: 76 },
    { outcome: "Under Treatment", percentage: 1.5, color: "bg-primary", count: 24 }
  ];

  const timelineData = [
    { period: "0-24 hours", recovery: 45.2, complications: 8.1 },
    { period: "1-3 days", recovery: 72.8, complications: 5.3 },
    { period: "4-7 days", recovery: 89.1, complications: 3.2 },
    { period: "1-2 weeks", recovery: 94.7, complications: 2.1 },
    { period: "2+ weeks", recovery: 97.2, complications: 1.8 }
  ];

  const riskFactors = [
    { factor: "Age >65", impact: "High", percentage: 68.3, mitigation: "Enhanced monitoring protocol" },
    { factor: "Diabetes", impact: "Medium", percentage: 34.7, mitigation: "Blood sugar management" },
    { factor: "Hypertension", impact: "Medium", percentage: 56.2, mitigation: "BP control protocol" },
    { factor: "Smoking History", impact: "High", percentage: 28.9, mitigation: "Pulmonary rehabilitation" }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recovery Rate Analysis</h1>
          <p className="text-muted-foreground">Comprehensive patient recovery and outcome analytics</p>
        </div>
        <Badge className="bg-success text-black">
          Overall Rate: 94.1%
        </Badge>
      </div>

      {/* Recovery Metrics by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recoveryMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-card border-border shadow-glow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.category}</CardTitle>
                <Badge className="bg-success text-black">
                  {metric.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-foreground">{metric.rate.toFixed(2)}%</div>
                <Progress value={metric.rate} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Patients:</span>
                    <span className="font-semibold text-foreground ml-1">{metric.patients}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg Days:</span>
                    <span className="font-semibold text-primary ml-1">{metric.avgDays.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Outcome Distribution */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Patient Outcomes Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {outcomeData.map((outcome, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{outcome.outcome}</h4>
                  <Badge className={outcome.color + " text-black"}>
                    {outcome.count}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">{outcome.percentage}%</div>
                <Progress value={outcome.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Timeline Analysis */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recovery Timeline Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineData.map((timeline, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{timeline.period}</h4>
                    <p className="text-sm text-muted-foreground">Recovery Period</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{timeline.recovery}%</div>
                    <div className="text-xs text-muted-foreground">Recovery Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-destructive">{timeline.complications}%</div>
                    <div className="text-xs text-muted-foreground">Complications</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factor Analysis */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span>Risk Factor Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-foreground">{risk.factor}</h4>
                    <Badge className={
                      risk.impact === "High" ? "bg-destructive text-black" :
                      risk.impact === "Medium" ? "bg-warning text-black" :
                      "bg-success text-black"
                    }>
                      {risk.impact} Impact
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-primary">{risk.percentage}%</div>
                </div>
                <div className="mb-2">
                  <Progress value={risk.percentage} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">Mitigation: {risk.mitigation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Predictive Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Projected Recovery Rate</span>
                <span className="text-lg font-bold text-success">95.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Risk of Complications</span>
                <span className="text-lg font-bold text-warning">4.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Readmission Risk</span>
                <span className="text-lg font-bold text-destructive">2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Resource Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Optimal Staffing Level</span>
                <span className="text-lg font-bold text-foreground">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bed Utilization</span>
                <span className="text-lg font-bold text-primary">91.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cost per Recovery</span>
                <span className="text-lg font-bold text-success">$8,450</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecoveryRateAnalysis;