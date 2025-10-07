import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const PatientAnalytics = () => {
  const [patientData, setPatientData] = useState([
    { category: "ICU", inhouse: 12, opd: 0 },
    { category: "Emergency", inhouse: 8, opd: 15 },
    { category: "Cardiology", inhouse: 6, opd: 25 },
    { category: "Neurology", inhouse: 4, opd: 18 },
    { category: "Pediatrics", inhouse: 5, opd: 22 },
    { category: "Orthopedics", inhouse: 3, opd: 20 },
  ]);

  const [overallPatientStatus, setOverallPatientStatus] = useState([
    { name: "In-house", value: 38, percentage: 32.2, color: "hsl(var(--chart-1))" },
    { name: "OPD", value: 80, percentage: 67.8, color: "hsl(var(--chart-2))" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatientData(prev => prev.map(dept => ({
        ...dept,
        inhouse: Math.max(1, dept.inhouse + Math.floor(Math.random() * 4) - 2),
        opd: Math.max(1, dept.opd + Math.floor(Math.random() * 6) - 3)
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalInhouse = patientData.reduce((sum, dept) => sum + dept.inhouse, 0);
    const totalOpd = patientData.reduce((sum, dept) => sum + dept.opd, 0);
    const total = totalInhouse + totalOpd;

    if (total > 0) {
      setOverallPatientStatus([
        { 
          name: "In-house", 
          value: totalInhouse, 
          percentage: +((totalInhouse / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-1))" 
        },
        { 
          name: "OPD", 
          value: totalOpd, 
          percentage: +((totalOpd / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-2))" 
        },
      ]);
    }
  }, [patientData]);

const handleChartClick = (data: any, category?: string) => {
  console.log("Patient chart clicked:", data, category);
  // Here you can add navigation or modal logic
};

const chartConfig = {
  inhouse: {
    label: "In-house",
    color: "hsl(var(--chart-1))"
  },
  opd: {
    label: "OPD", 
    color: "hsl(var(--chart-2))"
  }
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Active Patients by Department */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Active Patients by Department
          </CardTitle>
        </CardHeader>

        {/* Side-by-side layout */}
        <CardContent className="flex-1 flex flex-col md:flex-row gap-8 items-start">
          {/* Chart area */}
          <ChartContainer
            config={chartConfig}
            className="flex-1 md:max-w-[65%] min-h-[260px]"
          >
            {/* Use aspect to keep height tidy without extra bottom space */}
            <ResponsiveContainer width="100%" aspect={2}>
              <BarChart
                data={patientData}
                onClick={(data) => handleChartClick(data, "patients")}
                // Reduce bottom margin; rely on XAxis height for rotated labels
                margin={{ top: 12, right: 20, left: 12, bottom: 8 }}
              >
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  height={48} // 44–52 works well for -45°
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="inhouse"
                  fill="hsl(var(--chart-1))"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "inhouse")}
                />
                <Bar
                  dataKey="opd"
                  fill="hsl(var(--chart-2))"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "opd")}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend area */}
          <div className="flex-1 md:max-w-[35%] md:mt-10 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-1" />
                <span className="text-sm text-muted-foreground">In-house</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-2" />
                <span className="text-sm text-muted-foreground">OPD</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Distribution */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Patient Distribution
          </CardTitle>
        </CardHeader>

        {/* Side-by-side layout */}
        <CardContent className="flex-1 flex flex-col md:flex-row gap-8 items-start">
          {/* Pie chart side */}
          <ChartContainer
            config={chartConfig}
            className="flex-1 md:max-w-[50%] h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                margin={{ top: 12, right: 12, bottom: 12, left: 12 }}
                onClick={(data) => handleChartClick(data, "patient-distribution")}
              >
                <Pie
                  data={overallPatientStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "pie-slice")}
                >
                  {overallPatientStatus.map((entry, index) => (
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
            {overallPatientStatus.map((item) => (
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

export default PatientAnalytics;