import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

const DoctorAvailabilityAnalytics = () => {
  const [recentActivities, setRecentActivities] = useState([
    { doctor: "Dr. Sarah Johnson", action: "Completed cardiac surgery", time: "2 min ago", specialty: "Cardiology", type: "surgery" },
    { doctor: "Dr. Michael Chen", action: "Diagnosed acute appendicitis", time: "5 min ago", specialty: "Emergency", type: "diagnosis" },
    { doctor: "Dr. Emily Rodriguez", action: "Patient consultation - Room 205", time: "8 min ago", specialty: "Orthopedics", type: "consultation" },
    { doctor: "Dr. James Wilson", action: "Updated treatment protocol", time: "12 min ago", specialty: "Internal Medicine", type: "treatment" },
    { doctor: "Dr. Lisa Thompson", action: "Emergency response - ICU", time: "15 min ago", specialty: "Critical Care", type: "emergency" }
  ]);

  const [specialtyData, setSpecialtyData] = useState([
    { specialty: "Cardiology", available: 4, busy: 1, offline: 0 },
    { specialty: "Neurology", available: 2, busy: 2, offline: 1 },
    { specialty: "Pediatrics", available: 3, busy: 2, offline: 0 },
    { specialty: "Orthopedics", available: 2, busy: 1, offline: 0 },
    { specialty: "Dermatology", available: 2, busy: 0, offline: 1 },
    { specialty: "Psychiatry", available: 1, busy: 1, offline: 1 },
    { specialty: "Emergency", available: 5, busy: 1, offline: 1 },
  ]);

  const [overallStatusData, setOverallStatusData] = useState([
    { name: "Available", value: 14, percentage: 56.0, color: "hsl(var(--chart-1))" },
    { name: "Busy", value: 7, percentage: 28.0, color: "hsl(var(--chart-2))" },
    { name: "Offline", value: 4, percentage: 16.0, color: "hsl(var(--chart-3))" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialtyData(prev => prev.map(spec => ({
        ...spec,
        available: Math.max(1, spec.available + Math.floor(Math.random() * 3) - 1),
        busy: Math.max(1, spec.busy + Math.floor(Math.random() * 3) - 1),
        offline: Math.max(1, spec.offline + Math.floor(Math.random() * 2) - 1)
      })));
    }, 8000);

    // Update recent activities
    const activityInterval = setInterval(() => {
      const activities = [
        { doctor: "Dr. Sarah Johnson", action: "Completed cardiac surgery", specialty: "Cardiology", type: "surgery" },
        { doctor: "Dr. Michael Chen", action: "Diagnosed acute appendicitis", specialty: "Emergency", type: "diagnosis" },
        { doctor: "Dr. Emily Rodriguez", action: "Patient consultation", specialty: "Orthopedics", type: "consultation" },
        { doctor: "Dr. James Wilson", action: "Updated treatment protocol", specialty: "Internal Medicine", type: "treatment" },
        { doctor: "Dr. Lisa Thompson", action: "Emergency response", specialty: "Critical Care", type: "emergency" },
        { doctor: "Dr. Robert Brown", action: "Surgery prep completed", specialty: "Orthopedics", type: "surgery" },
        { doctor: "Dr. Amanda Davis", action: "Patient discharge approved", specialty: "Internal Medicine", type: "discharge" }
      ];

      setRecentActivities(prev => {
        const newActivity = activities[Math.floor(Math.random() * activities.length)];
        const timeOptions = ["1 min ago", "2 min ago", "3 min ago", "just now"];
        return [
          { ...newActivity, time: timeOptions[Math.floor(Math.random() * timeOptions.length)] },
          ...prev.slice(0, 4)
        ];
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(activityInterval);
    };
  }, []);

  useEffect(() => {
    const totalAvailable = specialtyData.reduce((sum, spec) => sum + spec.available, 0);
    const totalBusy = specialtyData.reduce((sum, spec) => sum + spec.busy, 0);
    const totalOffline = specialtyData.reduce((sum, spec) => sum + spec.offline, 0);
    const total = totalAvailable + totalBusy + totalOffline;

    if (total > 0) {
      setOverallStatusData([
        { 
          name: "Available", 
          value: totalAvailable, 
          percentage: +((totalAvailable / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-1))" 
        },
        { 
          name: "Busy", 
          value: totalBusy, 
          percentage: +((totalBusy / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-2))" 
        },
        { 
          name: "Offline", 
          value: totalOffline, 
          percentage: +((totalOffline / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-3))" 
        },
      ]);
    }
  }, [specialtyData]);

const chartConfig = {
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))"
  },
  busy: {
    label: "Busy", 
    color: "hsl(var(--chart-2))"
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-3))"
  }
};

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Doctors by Specialty
          </CardTitle>
        </CardHeader>

        {/* Make content side-by-side on md+ screens */}
        <CardContent className="flex flex-col md:flex-row gap-16 items-stretch">
          {/* Chart area */}
          <ChartContainer
            config={chartConfig}
            className="h-64 md:h-72 flex-1 md:max-w-[65%]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={specialtyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis
                  dataKey="specialty"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="available" stackId="a" fill="hsl(var(--chart-1))" />
                <Bar dataKey="busy" stackId="a" fill="hsl(var(--chart-2))" />
                <Bar dataKey="offline" stackId="a" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend area */}
          <div className="flex-1 md:max-w-[35%] md:mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-1" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-2" />
                <span className="text-sm text-muted-foreground">Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-3" />
                <span className="text-sm text-muted-foreground">Offline</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Overall Availability Status
          </CardTitle>
        </CardHeader>

        {/* Make CardContent a flex container */}
        <CardContent className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* Chart side */}
          <ChartContainer
            config={chartConfig}
            className="h-44 sm:h-56 md:h-64 flex-1 md:max-w-[50%]"
          >
            {/* Let the chart fill the container */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {overallStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* List / legend side */}
          <div className="flex-1 md:max-w-[50%] space-y-1 md:mt-14 mt-2">
            {overallStatusData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="text-right">
                  {/* <div className="text-lg font-bold text-foreground">{item.value}</div> */}
                  <div className="text-xs text-muted-foreground">
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      </div>
      
      {/* Recent Activities */}
    <div className="mt-8">
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Recent Doctor Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'surgery' ? "bg-destructive animate-pulse" :
                    activity.type === 'consultation' ? "bg-primary" : 
                    activity.type === 'diagnosis' ? "bg-success" : "bg-warning"
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-foreground">{activity.doctor}</h4>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{activity.time}</div>
                  <div className="text-xs text-muted-foreground">{activity.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default DoctorAvailabilityAnalytics;