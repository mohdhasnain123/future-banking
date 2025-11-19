import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPin, Cloud, CheckCircle2, Navigation } from "lucide-react";
import mountainBg from "@/assets/mountain-bg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate, formatTime } from "@/components/utils";
import mapImage from "@/scene-2/src/assets/map.png";

const CabBooking = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cabBooked, setCabBooked] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showConfirmation") === "true") {
      handleConfirmBooking();
      navigate("/cab-booking", { replace: true });
    }
  }, [location.search, navigate]);

  const timerRef = useRef<number | null>(null);
  const SEARCH_DELAY_MS = 2000;

  const availableVehicle = {
    id: 1,
    model: "Tesla Model 3",
    number: "ABC 1224",
    eta: "5 mins",
    price: "$50",
    rating: 4.9,
  };

  const todaysTasks = [
    {
      id: 1,
      task: "Wealth Advisor Consultation",
      time: "11:00 AM",
      completed: true,
    },
    {
      id: 2,
      task: "Pet Therapy Appointment",
      time: "3:00 PM",
      completed: false,
    },
    {
      id: 3,
      task: "KYC Update",
      time: "6:00 PM",
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(todaysTasks);

  const addCabTaskIfMissing = () => {
    setTasks((prev) => {
      const cabTaskExists = prev.some(
        (task) => task.task === "Cab arriving in 5 mins"
      );
      if (cabTaskExists) {
        return prev;
      }
      const index = prev.findIndex((task) => task.id === 1);
      const newTask = {
        id: Math.max(...prev.map((t) => t.id)) + 1,
        task: "Cab arriving in 5 mins",
        time: "Now",
        completed: false,
      };
      return [...prev.slice(0, index + 1), newTask, ...prev.slice(index + 1)];
    });
  };

  const handleConfirmBooking = () => {
    if (isSearching) return;
    setIsSearching(true);
    timerRef.current = window.setTimeout(() => {
      setIsSearching(false);
      setSelectedVehicle(availableVehicle.id);
      addCabTaskIfMissing();
      setConfirmationOpen(true);
      setCabBooked(true);
    }, SEARCH_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 min-h-screen p-3">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-sm font-bold text-white">
              Pet Therapy Appointment
            </h1>
            <p className="text-xs font-medium">
              {formatTime("8:00 AM", 360)} | {formatDate(currentTime)}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 mb-2 mt-2">
            {/* Left Card: Pet Therapy Details */}
            <div className="w-full md:w-[50%]">
              <Card className="bg-glass-bg/80 backdrop-blur-md border border-white/20 h-full rounded-md">
                <CardContent className="p-2">
                  <div className="space-y-2">
                    <div>
                      <h2 className="text-sm font-bold text-white mb-1">
                        Pet Julie{" "}
                        <span className="text-green-400 text-xs">
                          (Crypto Insurance Verified)
                        </span>
                      </h2>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-white/60 text-xs">Time</span>
                        <span className="text-white font-semibold text-right text-xs">
                          3:00 PM - 4:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-white/60 text-xs">Address</span>
                        <span className="text-white font-semibold text-right max-w-xs text-xs">
                          13th Street 47 W 13th St, New York, NY 10011, USA
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-white/60 text-xs">
                          Time to reach the destination
                        </span>
                        <span className="text-white font-semibold text-xs">
                          30 min
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-white/60 text-xs">Weather</span>
                        <span className="text-white font-semibold flex items-center gap-1 text-xs">
                          <Cloud className="w-3 h-3" />
                          90°F (Partly Cloudy)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Map/Card */}
                  <div className="bg-gray-800/50 rounded-md overflow-hidden h-20 flex items-center justify-center border border-white/10 mt-2 relative">
                    {cabBooked ? (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <img
                          src={mapImage}
                          alt="Navigation Map"
                          className="w-full h-full object-cover absolute inset-0"
                          style={{ zIndex: 1 }}
                        />
                        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                          <div className="bg-primary rounded-full p-1 shadow-lg">
                            <Navigation className="w-3 h-3 text-primary-foreground rotate-45" />
                          </div>
                          <span className="bg-card/95 px-2 py-0.5 rounded-full text-xs border border-border mt-1">
                            Current Location
                          </span>
                        </div>
                        <div className="absolute bottom-2 right-2 text-right z-10">
                          <div className="text-sm font-bold text-white mb-1">
                            5 min
                          </div>
                          <div className="text-xs text-white/60">
                            1 mile remaining
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center w-full">
                        <MapPin className="w-6 h-6 text-primary mx-auto mb-1" />
                        <p className="text-white/60 text-xs">Map View</p>
                        <p className="text-white/40 text-xs">
                          13th Street, New York
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Book Cab Button */}
                  {!cabBooked && (
                    <div className="mt-2 flex justify-center">
                      <Button
                        onClick={() => handleConfirmBooking()}
                        className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md transition-all ${
                          isSearching
                            ? "ring-2 ring-green-400 ring-offset-1 ring-offset-black/50"
                            : ""
                        }`}
                        size="sm"
                        disabled={isSearching}
                      >
                        {isSearching ? "Booking..." : "Confirm to book a cab"}
                        {!isSearching && (
                          <span className="ml-2 text-xs">(Approx. $50)</span>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Card: Today's Tasks */}
            <div className="w-full md:w-[50%]">
              <Card className="bg-glass-bg/80 backdrop-blur-md border border-white/20 h-full rounded-md">
                <CardContent className="p-2">
                  <h3 className="text-sm font-bold text-white mb-2">
                    Today's Tasks
                  </h3>
                  <div className="space-y-1">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          task.completed
                            ? "bg-white/5 opacity-50"
                            : "bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {task.completed && (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          )}
                          <div>
                            <p
                              className={`font-semibold text-sm mb-0 ${
                                task.completed
                                  ? "text-white/50 line-through"
                                  : "text-white"
                              }`}
                            >
                              {task.task}
                            </p>
                            <p className="text-white/40 text-xs mb-0">
                              {task.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isSearching} onOpenChange={() => {}}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border border-white/20 text-white max-w-sm p-2 rounded-md">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mb-2" />
            <h2 className="text-sm font-semibold mb-1">
              Connecting to vehicle booking app…
            </h2>
            <p className="text-white/60 mt-1 text-xs">
              This will just take a moment.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border border-white/20 text-white max-w-xs p-1 rounded-sm">
          <div className="text-center py-1">
            <div className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <h2 className="text-base font-bold mb-1">
              Cab Booked Successfully!
            </h2>
            <p className="text-white/70 mb-1 text-xs">
              Your vehicle will arrive at 02:00 PM
            </p>
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 rounded-sm px-1 py-0.5 mb-1">
              <div className="flex items-center justify-between mb-0">
                <p className="text-cyan-400 font-semibold text-xs flex items-center gap-1 mb-0">
                  <span className="text-sm">⚡</span>
                  Crypto Payment Processed
                </p>
                <p className="text-white font-bold text-xs mb-0">$50.00</p>
              </div>
              <p className="text-white/60 text-xs mb-0">
                Auto-deducted from Crypto Wallet • Blockchain Verified
              </p>
              <div className="flex items-center gap-1 mt-0 text-xs text-white/50">
                <span>🔐 Instant Settlement</span>
                <span>•</span>
                <span>💎 Zero Gas Fees</span>
                <span>•</span>
                <span>🌐 Smart Contract</span>
              </div>
            </div>

            {selectedVehicle && (
              <div className="relative space-y-1 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-sm p-1 border border-white/30 shadow-sm overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-purple-500/10 rounded-full blur-2xl"></div>

                <div className="relative flex justify-between items-center pb-1 border-b border-white/20">
                  <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">
                    Vehicle Assignment
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium bg-emerald-400/10 px-1 py-0.5 rounded-sm border border-emerald-400/30">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>
                    Live
                  </span>
                </div>

                <div className="relative space-y-1">
                  <div className="flex justify-between items-center py-0.5 group">
                    <span className="text-white/60 text-xs font-medium">
                      Cab Number
                    </span>
                    <span className="text-white font-bold text-sm tracking-wider bg-gradient-to-r from-white/20 to-white/10 px-2 py-0.5 rounded-sm border border-white/30 shadow-sm transform group-hover:scale-105 transition-transform">
                      {availableVehicle.number}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 group">
                    <span className="text-white/60 text-xs font-medium">
                      Cab Model
                    </span>
                    <span className="text-white font-bold text-xs bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 px-2 py-0.5 rounded-sm border border-cyan-400/40 shadow-sm transform group-hover:scale-105 transition-transform">
                      ⚡ {availableVehicle.model}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 group">
                    <span className="text-white/60 text-xs font-medium">
                      Pickup Time
                    </span>
                    <span className="text-white font-bold text-sm bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 px-2 py-0.5 rounded-sm border border-purple-400/40 shadow-sm animate-pulse transform group-hover:scale-105 transition-transform">
                      🕐 02:00 PM
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => setConfirmationOpen(false)}
              className="mt-1 bg-primary hover:bg-primary/90 w-full text-xs py-1 rounded-sm"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CabBooking;
