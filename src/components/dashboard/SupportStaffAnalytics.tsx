import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const SupportStaffAnalytics = () => {
  const [staffData, setStaffData] = useState([
    { category: "ICU Nurses", available: 8, busy: 4, offline: 2 },
    { category: "General Nurses", available: 12, busy: 6, offline: 3 },
    { category: "Technicians", available: 6, busy: 2, offline: 1 },
    { category: "Pharmacists", available: 3, busy: 1, offline: 0 },
    { category: "Lab Staff", available: 5, busy: 3, offline: 1 },
    { category: "Admin Staff", available: 4, busy: 2, offline: 1 },
  ]);

  const [overallStaffStatus, setOverallStaffStatus] = useState([
    { name: "Available", value: 38, percentage: 61.3, color: "hsl(var(--chart-1))" },
    { name: "Busy", value: 18, percentage: 29.0, color: "hsl(var(--chart-2))" },
    { name: "Offline", value: 6, percentage: 9.7, color: "hsl(var(--chart-3))" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStaffData(prev => prev.map(staff => ({
        ...staff,
        available: Math.max(1, staff.available + Math.floor(Math.random() * 3) - 1),
        busy: Math.max(1, staff.busy + Math.floor(Math.random() * 3) - 1),
        offline: Math.max(1, staff.offline + Math.floor(Math.random() * 2) - 1)
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalAvailable = staffData.reduce((sum, staff) => sum + staff.available, 0);
    const totalBusy = staffData.reduce((sum, staff) => sum + staff.busy, 0);
    const totalOffline = staffData.reduce((sum, staff) => sum + staff.offline, 0);
    const total = totalAvailable + totalBusy + totalOffline;

    if (total > 0) {
      setOverallStaffStatus([
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
  }, [staffData]);

const handleChartClick = (data: any, category?: string) => {
  console.log("Chart clicked:", data, category);
  // Here you can add navigation or modal logic
};

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Support Staff by Category */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Support Staff by Category
          </CardTitle>
        </CardHeader>

        {/* Side-by-side content */}
        <CardContent className="flex-1 flex flex-col md:flex-row gap-8 items-start">
          {/* Chart area */}
          <ChartContainer
            config={chartConfig}
            className="flex-1 md:max-w-[65%] min-h-[260px]"
          >
            {/* Use aspect to avoid forced tall height */}
            <ResponsiveContainer width="100%" aspect={2}>
              <BarChart
                data={staffData}
                onClick={(data) => handleChartClick(data, "staff")}
                // Reduce bottom margin; rely on XAxis height for label space
                margin={{ top: 12, right: 20, left: 12, bottom: 8 }}
              >
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  height={48}               // 44–52 works well for -45°
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="available"
                  stackId="a"
                  fill="hsl(var(--chart-1))"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "available")}
                />
                <Bar
                  dataKey="busy"
                  stackId="a"
                  fill="hsl(var(--chart-2))"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "busy")}
                />
                <Bar
                  dataKey="offline"
                  stackId="a"
                  fill="hsl(var(--chart-3))"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "offline")}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend area */}
          <div className="flex-1 md:max-w-[35%] md:mt-10 mt-2">
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

      {/* Staff Availability Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Staff Availability Overview
          </CardTitle>
        </CardHeader>

        {/* Side-by-side content */}
        <CardContent className="flex-1 flex flex-col md:flex-row gap-8 items-start">
          {/* Chart side */}
          <ChartContainer
            config={chartConfig}
            className="flex-1 md:max-w-[50%] h-64"
          >
            {/* Fill the container for consistent sizing */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={(data) => handleChartClick(data, "staff-overview")}>
                <Pie
                  data={overallStaffStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "pie-slice")}
                >
                  {overallStaffStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="chart-interactive"
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend / list side */}
          <div className="flex-1 md:max-w-[50%] space-y-2 mt-12">
            {overallStaffStatus.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 bg-muted/30 rounded-lg"
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

  );
};

export default SupportStaffAnalytics;