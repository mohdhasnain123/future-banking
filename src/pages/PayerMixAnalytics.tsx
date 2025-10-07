import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Users, FileText, CreditCard, Building2, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PayerMixAnalytics = () => {
  const navigate = useNavigate();
  const [payerData, setPayerData] = useState([
    { name: "Medicare", percentage: 35.00, amount: "$2.1M", color: "bg-primary", trend: "+5.20%" },
    { name: "Private Insurance", percentage: 40.00, amount: "$2.8M", color: "bg-secondary", trend: "+8.10%" },
    { name: "Medicaid", percentage: 15.00, amount: "$890K", color: "bg-accent", trend: "-2.30%" },
    { name: "Self-Pay", percentage: 10.00, amount: "$650K", color: "bg-warning", trend: "+12.50%" }
  ]);

  // Live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPayerData(prev => prev.map(payer => ({
        ...payer,
        percentage: parseFloat((Math.max(5, Math.min(50, payer.percentage + (Math.random() - 0.5) * 2))).toFixed(2)),
        amount: `$${(parseFloat(payer.amount.replace(/[$MK]/g, '')) + (Math.random() - 0.5) * 100).toFixed(1)}${payer.amount.includes('M') ? 'M' : 'K'}`,
        trend: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 10 + 1).toFixed(2)}%`
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const reimbursementTrends = [
    { quarter: "Q4 2024", medicare: 92.5, private: 96.8, medicaid: 78.2, selfPay: 45.3 },
    { quarter: "Q3 2024", medicare: 91.2, private: 95.1, medicaid: 76.8, selfPay: 42.1 },
    { quarter: "Q2 2024", medicare: 89.8, private: 94.3, medicaid: 75.1, selfPay: 38.9 }
  ];

  const contractMetrics = [
    { payer: "BlueCross BlueShield", contractValue: "$1.2M", renewalDate: "Dec 2024", status: "Active", riskLevel: "Low" },
    { payer: "Aetna Healthcare", contractValue: "$890K", renewalDate: "Mar 2025", status: "Renewal Due", riskLevel: "Medium" },
    { payer: "UnitedHealth", contractValue: "$1.5M", renewalDate: "Jun 2025", status: "Active", riskLevel: "Low" },
    { payer: "Humana", contractValue: "$650K", renewalDate: "Sep 2025", status: "Under Review", riskLevel: "High" }
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
          <h1 className="text-3xl font-bold text-foreground">Payer Mix Analytics</h1>
          <p className="text-muted-foreground">Comprehensive payer distribution and reimbursement analysis</p>
        </div>
        <Badge className="bg-primary text-primary-foreground">
          Last Updated: 2 min ago
        </Badge>
      </div>

      {/* Main Payer Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {payerData.map((payer, index) => (
          <Card key={index} className="bg-gradient-card border-border shadow-glow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{payer.name}</CardTitle>
                <Badge className={`${payer.color} text-black`}>
                  {payer.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold text-foreground">{payer.percentage.toFixed(2)}%</div>
                <Progress value={payer.percentage} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="text-lg font-semibold text-primary">{payer.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reimbursement Rate Trends */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Reimbursement Rate Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reimbursementTrends.map((trend, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{trend.quarter}</h4>
                  <Badge variant="outline">Quarterly Report</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{trend.medicare}%</div>
                    <div className="text-xs text-muted-foreground">Medicare</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary">{trend.private}%</div>
                    <div className="text-xs text-muted-foreground">Private</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{trend.medicaid}%</div>
                    <div className="text-xs text-muted-foreground">Medicaid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-warning">{trend.selfPay}%</div>
                    <div className="text-xs text-muted-foreground">Self-Pay</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contract Management */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Contract Management & Risk Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contractMetrics.map((contract, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{contract.payer}</h4>
                    <p className="text-sm text-muted-foreground">Renewal: {contract.renewalDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{contract.contractValue}</div>
                    <Badge className={
                      contract.status === "Active" ? "bg-success text-black" :
                      contract.status === "Renewal Due" ? "bg-warning text-black" :
                      "bg-destructive text-black"
                    }>
                      {contract.status}
                    </Badge>
                  </div>
                  <Badge className={
                    contract.riskLevel === "Low" ? "bg-success/20 text-success" :
                    contract.riskLevel === "Medium" ? "bg-warning/20 text-warning" :
                    "bg-destructive/20 text-destructive"
                  }>
                    {contract.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Impact Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>Revenue Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Potential Revenue Increase</span>
                <span className="text-lg font-bold text-success">+$420K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Claims Denial Rate</span>
                <span className="text-lg font-bold text-destructive">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Collection Time</span>
                <span className="text-lg font-bold text-warning">28 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Patient Demographics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Age</span>
                <span className="text-lg font-bold text-foreground">64.5 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Chronic Conditions</span>
                <span className="text-lg font-bold text-foreground">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">High-Risk Patients</span>
                <span className="text-lg font-bold text-destructive">24%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayerMixAnalytics;