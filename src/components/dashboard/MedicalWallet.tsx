import { Shield, Clock, Eye, Upload, Link2, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const MedicalWallet = () => {
  const walletData = {
    patientId: "WALLET-8A3F9B2D",
    lastUpdated: "2 hours ago",
    blockchainHash: "0xA7B3...9D2F",
    recordCount: 23,
    activeShares: 3,
  };

  const accessGrants = [
    {
      specialist: "Dr. Michael Rodriguez",
      specialty: "Neurologist",
      accessType: "Full Records",
      timeRemaining: 36,
      totalTime: 48,
      status: "Active",
    },
    {
      specialist: "Dr. Lisa Thompson", 
      specialty: "Oncologist",
      accessType: "Lab Results Only",
      timeRemaining: 12,
      totalTime: 24,
      status: "Expiring Soon",
    },
    {
      specialist: "Dr. Ahmad Hassan",
      specialty: "Cardiologist", 
      accessType: "Diagnostic Images",
      timeRemaining: 72,
      totalTime: 72,
      status: "Active",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-white";
      case "Expiring Soon": return "bg-warning text-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center">
            <Shield className="mr-3 h-6 w-6 text-accent" />
            Medical Record Wallet
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Hash className="h-4 w-4" />
            <span className="font-mono">{walletData.blockchainHash}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-background rounded-lg border border-border">
            <p className="text-2xl font-bold text-foreground">{walletData.recordCount}</p>
            <p className="text-xs text-muted-foreground">Total Records</p>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border border-border">
            <p className="text-2xl font-bold text-accent">{walletData.activeShares}</p>
            <p className="text-xs text-muted-foreground">Active Shares</p>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border border-border">
            <p className="text-sm font-semibold text-foreground">Verified</p>
            <p className="text-xs text-success">Blockchain Secured</p>
          </div>
          <div className="text-center p-3 bg-background rounded-lg border border-border">
            <p className="text-sm font-semibold text-muted-foreground">Updated</p>
            <p className="text-xs text-muted-foreground">{walletData.lastUpdated}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Time-Based Access Control</h3>
            <Button className="bg-gradient-accent text-accent-foreground hover:opacity-90">
              <Link2 className="mr-2 h-4 w-4" />
              Grant Access
            </Button>
          </div>
          
          <div className="space-y-4">
            {accessGrants.map((grant, index) => (
              <div 
                key={index}
                className="p-4 bg-background rounded-lg border border-border hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{grant.specialist}</h4>
                    <p className="text-sm text-accent">{grant.specialty}</p>
                    <p className="text-xs text-muted-foreground">{grant.accessType}</p>
                  </div>
                  <Badge className={`${getStatusColor(grant.status)} shadow-sm`}>
                    {grant.status}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Time Remaining</span>
                    <span className="font-medium text-foreground">
                      {grant.timeRemaining}h of {grant.totalTime}h
                    </span>
                  </div>
                  <Progress 
                    value={(grant.timeRemaining / grant.totalTime) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                    <Eye className="mr-2 h-3 w-3" />
                    View Access Log
                  </Button>
                  <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                    <Clock className="mr-2 h-3 w-3" />
                    Extend Time
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">Record Management</h4>
              <p className="text-sm text-muted-foreground">Upload new diagnostics or sync existing records</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-border hover:bg-muted">
                <Upload className="mr-2 h-4 w-4" />
                Upload Records
              </Button>
              <Button className="bg-gradient-secondary text-secondary-foreground hover:opacity-90">
                <Link2 className="mr-2 h-4 w-4" />
                Sync Devices
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalWallet;