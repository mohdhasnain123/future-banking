import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Activity, Heart, Brain, DollarSign, Clock, Wifi, Shield, Zap, MonitorSpeaker } from "lucide-react";

const PatientOverview = () => {
  // Comprehensive provider analytics
  const [utilizationMetrics, setUtilizationMetrics] = useState({
    patientVolume: 1247,
    bedOccupancy: 87,
    avgStayDays: 4.2,
    physicianProductivity: 94,
    resourceUtilization: 89
  });

  const [payerMixData, setPayerMixData] = useState([
    { type: "Medicare", percentage: 75, revenue: "$2.1M", members: 105, color: "bg-gradient-primary" },
    { type: "Private Insurance", percentage: 86, revenue: "$3.2M", members: 85, color: "bg-gradient-secondary" },
    { type: "Medicaid", percentage: 83, revenue: "$890K", members: 55, color: "bg-gradient-accent" },
    { type: "Self-Pay", percentage: 64, revenue: "$320K", members: 19, color: "bg-warning" }
  ]);

  const [recoveryRates, setRecoveryRates] = useState([
    { specialty: "Cardiology", rate: 94, patients: 156, trend: "up" },
    { specialty: "Orthopedics", rate: 89, patients: 234, trend: "up" },
    { specialty: "Neurology", rate: 91, patients: 87, trend: "stable" },
    { specialty: "Oncology", rate: 86, patients: 145, trend: "down" }
  ]);

  const [iotDevices, setIotDevices] = useState([
    { name: "Smart Monitors", total: 156, percentage: 90, status: "online", lastSync: "2 min ago" },
    { name: "Wearable Sensors", total: 234, percentage: 85, status: "online", lastSync: "1 min ago" },
    { name: "Ambulance Fleet", total: 12, percentage: 93,status: "online", lastSync: "30 sec ago" },
    { name: "AI Diagnostics", total: 8, percentage: 86, status: "processing", lastSync: "Live" }
  ]);

  const [aiAgentMatrix, setAiAgentMatrix] = useState([
    { type: "Speciality AI", count: 156, function: "Patient Monitoring", status: "active" },
    { type: "Finance AI", count: 4, function: "Claims Processing", status: "active" },
    { type: "Scheduler AI", count: 1, function: "Resource Optimization", status: "active" },
    { type: "Coordinator AI", count: 8, function: "Critical Alert System", status: "standby" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update utilization metrics
      setUtilizationMetrics(prev => ({
        patientVolume: Math.max(1000, prev.patientVolume + Math.floor(Math.random() * 20) - 10),
        bedOccupancy: Math.max(70, Math.min(95, prev.bedOccupancy + Math.floor(Math.random() * 6) - 3)),
        avgStayDays: Math.max(3, Math.min(6, +(prev.avgStayDays + (Math.random() * 0.4 - 0.2)).toFixed(1))),
        physicianProductivity: Math.max(85, Math.min(98, prev.physicianProductivity + Math.floor(Math.random() * 4) - 2)),
        resourceUtilization: Math.max(80, Math.min(95, prev.resourceUtilization + Math.floor(Math.random() * 6) - 3))
      }));

      // Update payer mix data
      setPayerMixData(prev => prev.map(payer => {
        const newPercentage = Math.max(80, Math.min(90, payer.percentage + Math.floor(Math.random() * 4) - 2));

        // Extract numeric value from revenue string (e.g., "$2.1M" → 2.1)
        const revenueValue = parseFloat(payer.revenue.replace(/[^0-9.]/g, ""));
        const revenueUnit = payer.revenue.includes("M") ? "M" : payer.revenue.includes("K") ? "K" : "";

        // Increase revenue proportionally to percentage change
        const updatedRevenueValue = revenueValue * (newPercentage / payer.percentage);

        return {
          ...payer,
          percentage: newPercentage,
          revenue: `$${updatedRevenueValue.toFixed(2)}${revenueUnit}`
        };
      }));


      // Update recovery rates
      setRecoveryRates(prev => prev.map(rate => ({
        ...rate,
        rate: Math.max(80, Math.min(98, rate.rate + Math.floor(Math.random() * 4) - 2)),
        patients: Math.max(50, rate.patients + Math.floor(Math.random() * 10) - 5)
      })));

      // Update IoT devices
      setIotDevices(prev => prev.map(device => ({
        ...device,
        total: Math.max(5, device.total + Math.floor(Math.random() * 6) - 3),
        percentage: Math.max(80, Math.min(100, device.percentage + Math.floor(Math.random() * 4) - 2))
      })));

      // Update AI agent matrix
      setAiAgentMatrix(prev => prev.map(agent => ({
        ...agent,
        count: Math.max(1, agent.count + Math.floor(Math.random() * 4) - 2)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Utilization & Productivity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-md">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{utilizationMetrics.patientVolume}</div>
            <div className="text-xs text-muted-foreground">Patient Volume</div>
          </CardContent>
        </Card>
        {/* <Card className="bg-gradient-card border-border shadow-md">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{utilizationMetrics.bedOccupancy}%</div>
            <div className="text-xs text-muted-foreground">Bed Occupancy</div>
          </CardContent>
        </Card> */}
        <Card className="bg-gradient-card border-border shadow-md">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{utilizationMetrics.avgStayDays}</div>
            <div className="text-xs text-muted-foreground">Avg Stay (Days)</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border shadow-md">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{utilizationMetrics.physicianProductivity}%</div>
            <div className="text-xs text-muted-foreground">Physician RVUs</div>
          </CardContent>
        </Card>
        {/* <Card className="bg-gradient-card border-border shadow-md">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{utilizationMetrics.resourceUtilization}%</div>
            <div className="text-xs text-muted-foreground">Resource Usage</div>
          </CardContent>
        </Card> */}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
        {/* Payer Mix Analytics */}
        {/* <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>Payer Mix Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {payerMixData.map((payer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${payer.color}`}></div>
                  <div>
                    <div className="font-medium text-foreground">{payer.type}</div>
                    <div className="text-sm text-muted-foreground">Revenue - {payer.revenue}</div>
                    <div className="text-sm text-muted-foreground">Members - {payer.members}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{payer.percentage}%</div>
                  <Progress value={payer.percentage} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}

        {/* Recovery Rate by Specialty */}
        {/* <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Heart className="h-5 w-5 text-primary" />
              <span>Recovery Rate Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recoveryRates.map((specialty, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium text-foreground">{specialty.specialty}</div>
                  <div className="text-sm text-muted-foreground">{specialty.patients} patients</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{specialty.rate}%</div>
                    <div className={`text-xs ${specialty.trend === 'up' ? 'text-success' : specialty.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {specialty.trend === 'up' ? '↗' : specialty.trend === 'down' ? '↘' : '→'} {specialty.trend}
                    </div>
                  </div>
                  <Progress value={specialty.rate} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}
      {/* </div> */}

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
        {/* IoMT Connected Devices */}
        {/* <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Wifi className="h-5 w-5 text-primary" />
              <span>IoMT Device Network</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {iotDevices.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-success' : device.status === 'processing' ? 'bg-warning animate-pulse' : 'bg-muted'}`}></div>
                  <div>
                    <div className="font-medium text-foreground">{device.name}</div>
                    <div className="text-sm text-muted-foreground">{device.total} total</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{device.percentage}%</div>
                  <Progress value={device.percentage} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}

        {/* AI Agent Matrix */}
        {/* <Card className="bg-gradient-card border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI Agent Matrix</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiAgentMatrix.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-accent/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <MonitorSpeaker className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{agent.type}</div>
                    <div className="text-sm text-muted-foreground">{agent.function}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{agent.count}</div>
                  <Badge className={`${agent.status === 'active' ? 'bg-success' : 'bg-warning'} text-black text-xs`}>
                    {agent.count}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}
      {/* </div> */}
    </div>
  );
};

export default PatientOverview;