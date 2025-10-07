import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Network, Wifi, Battery, Activity, Shield, Zap, Smartphone, Watch, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IoMTDeviceNetwork = () => {
  const navigate = useNavigate();
  const [networkData, setNetworkData] = useState({
    totalDevices: 2847,
    activeDevices: 2689,
    offlineDevices: 158,
    batteryAlerts: 23,
    networkHealth: 96.2
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkData(prev => ({
        totalDevices: prev.totalDevices + Math.floor(Math.random() * 3) - 1,
        activeDevices: prev.activeDevices + Math.floor(Math.random() * 5) - 2,
        offlineDevices: prev.offlineDevices + Math.floor(Math.random() * 3) - 1,
        batteryAlerts: prev.batteryAlerts + Math.floor(Math.random() * 2) - 1,
        networkHealth: parseFloat((Math.max(94, Math.min(98, prev.networkHealth + (Math.random() - 0.5) * 0.5))).toFixed(2))
      }));
      
      // Update device categories
      setDeviceCategories(prev => prev.map(category => ({
        ...category,
        count: Math.max(400, category.count + Math.floor(Math.random() * 10) - 5),
        status: parseFloat((Math.max(90, Math.min(100, category.status + (Math.random() - 0.5) * 0.5))).toFixed(2))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const Heart = Activity; // Using Activity as Heart icon placeholder

  const [deviceCategories, setDeviceCategories] = useState([
    { name: "Cardiac Monitors", count: 892, status: 98.2, icon: Heart, color: "text-red-500" },
    { name: "Blood Pressure Monitors", count: 743, status: 97.1, icon: Activity, color: "text-blue-500" },
    { name: "Pulse Oximeters", count: 654, status: 99.1, icon: Zap, color: "text-green-500" },
    { name: "Smart Wearables", count: 558, status: 94.8, icon: Watch, color: "text-purple-500" }
  ]);

  const networkMetrics = [
    { metric: "Data Throughput", value: "847 MB/s", status: "Optimal", color: "bg-success" },
    { metric: "Latency", value: "12ms", status: "Excellent", color: "bg-success" },
    { metric: "Packet Loss", value: "0.02%", status: "Minimal", color: "bg-success" },
    { metric: "Security Score", value: "98.7/100", status: "Secure", color: "bg-primary" }
  ];

  const deviceAlerts = [
    { device: "Cardiac Monitor #CM-2847", alert: "Battery Low", severity: "Medium", room: "ICU-A-12" },
    { device: "BP Monitor #BP-1234", alert: "Connection Lost", severity: "High", room: "Ward-B-08" },
    { device: "Pulse Ox #PO-5678", alert: "Calibration Required", severity: "Low", room: "Emergency-03" },
    { device: "Smart Watch #SW-9012", alert: "Sensor Malfunction", severity: "Medium", room: "Recovery-15" }
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
          <h1 className="text-3xl font-bold text-foreground">IoMT Device Network</h1>
          <p className="text-muted-foreground">Real-time monitoring of Internet of Medical Things devices</p>
        </div>
        <Badge className={`${networkData.networkHealth > 95 ? 'bg-success' : 'bg-warning'} text-black`}>
          Network Health: {networkData.networkHealth.toFixed(1)}%
        </Badge>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Network className="h-4 w-4 mr-2" />
              Total Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{networkData.totalDevices.toLocaleString()}</div>
            <Badge className="bg-primary text-black mt-2">+2.3% vs last week</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Wifi className="h-4 w-4 mr-2" />
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{networkData.activeDevices.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {((networkData.activeDevices / networkData.totalDevices) * 100).toFixed(1)}% online
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Offline Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{networkData.offlineDevices}</div>
            <div className="text-sm text-muted-foreground mt-1">Requires attention</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Battery className="h-4 w-4 mr-2" />
              Battery Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{networkData.batteryAlerts}</div>
            <div className="text-sm text-muted-foreground mt-1">Low battery warnings</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Data Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">847 MB/s</div>
            <div className="text-sm text-muted-foreground mt-1">Real-time throughput</div>
          </CardContent>
        </Card>
      </div>

      {/* Device Categories */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <span>Device Categories & Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deviceCategories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                    <h4 className="font-semibold text-foreground">{category.name}</h4>
                  </div>
                  <Badge className="bg-success text-black">{category.status.toFixed(2)}%</Badge>
                </div>
                <div className="text-lg font-bold text-foreground mb-2">{category.count} devices</div>
                <Progress value={category.status} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Performance Metrics */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-primary" />
            <span>Network Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkMetrics.map((metric, index) => (
              <div key={index} className="border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{metric.metric}</h4>
                  <Badge className={metric.color + " text-black"}>{metric.status}</Badge>
                </div>
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Alerts */}
      <Card className="bg-gradient-card border-border shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Device Alerts & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === "High" ? "bg-destructive animate-pulse" :
                    alert.severity === "Medium" ? "bg-warning" : "bg-success"
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-foreground">{alert.device}</h4>
                    <p className="text-sm text-muted-foreground">{alert.alert}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{alert.room}</div>
                    <Badge className={
                      alert.severity === "High" ? "bg-destructive text-black" :
                      alert.severity === "Medium" ? "bg-warning text-black" :
                      "bg-success text-black"
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Data Flow Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Inbound Data Rate</span>
                <span className="text-lg font-bold text-success">654 MB/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Outbound Data Rate</span>
                <span className="text-lg font-bold text-primary">193 MB/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Data Processing Time</span>
                <span className="text-lg font-bold text-warning">8.4ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Security & Compliance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Encryption Level</span>
                <span className="text-lg font-bold text-success">AES-256</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">HIPAA Compliance</span>
                <span className="text-lg font-bold text-success">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Security Incidents</span>
                <span className="text-lg font-bold text-success">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IoMTDeviceNetwork;