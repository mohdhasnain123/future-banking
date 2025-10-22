import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPin, Cloud, CheckCircle2, Car, Mic } from "lucide-react";
import mountainBg from "@/assets/mountain-bg.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const CabBooking = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  // NEW: searching state
  const [isSearching, setIsSearching] = useState(false);
  const [vehicleSelectionOpen, setVehicleSelectionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cabBooked, setCabBooked] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showConfirmation") === "true") {
      handleConfirmBooking();
      // Optional: remove the query param from URL after opening the modal
      navigate("/cab-booking", { replace: true });
    } else if (params.get("vehicleSelection") === "true") {
      handleVehicleSelect(1);
      // Optional: remove the query param from URL after opening the modal
      navigate("/cab-booking", { replace: true });
    }
  }, [location.search, navigate]);

  // Keep a reference to the timeout so we can clean it up on unmount
  const timerRef = useRef<number | null>(null);
  const SEARCH_DELAY_MS = 2000; // Adjust as you like (2s = nice UX)

  const availableVehicles = [
    {
      id: 1,
      model: "Tesla Model 3",
      number: "ABC 1224",
      eta: "5 mins",
      price: "$10",
      rating: 4.9,
    },
    {
      id: 2,
      model: "Toyota Prius",
      number: "XYZ 5678",
      eta: "8 mins",
      price: "$8",
      rating: 4.7,
    },
    {
      id: 3,
      model: "Honda Civic",
      number: "LMN 9012",
      eta: "12 mins",
      price: "$7",
      rating: 4.8,
    },
  ];

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
      // Check if the cab task already exists
      const cabTaskExists = prev.some(
        (task) => task.task === "Cab arriving in 10 mins"
      );
      if (cabTaskExists) {
        return prev; // Don't add if already present
      }

      // Find the index of the item with id: 1
      const index = prev.findIndex((task) => task.id === 1);

      // Create the new task (ensure unique id)
      const newTask = {
        id: Math.max(...prev.map((t) => t.id)) + 1, // avoid ID collision
        task: "Cab arriving in 10 mins",
        time: "Now",
        completed: false,
      };

      // Insert the new task after the found index
      return [...prev.slice(0, index + 1), newTask, ...prev.slice(index + 1)];
    });
  };

  const handleConfirmBooking = () => {
    if (isSearching) return; // avoid double-trigger
    setIsSearching(true);

    // Simulate a "searching/assigning cab" delay
    timerRef.current = window.setTimeout(() => {
      setIsSearching(false); // close searching modal
      setVehicleSelectionOpen(true); // open vehicle selection
    }, SEARCH_DELAY_MS);
  };

  const handleVehicleSelect = (vehicleId: number) => {
    setSelectedVehicle(vehicleId);
    setVehicleSelectionOpen(false);
    addCabTaskIfMissing();
    setConfirmationOpen(true);
    setCabBooked(true);
  };

  // Cleanup timer on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}

          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Pet Therapy Appointment
            </h1>
            {browserSupportsSpeechRecognition && (
              <div className="flex items-center gap-2 text-sm text-white/70 ml-4">
                <Mic
                  className={`w-5 h-5 ${
                    listening ? "text-green-400 animate-pulse" : ""
                  }`}
                />
                <span>{listening ? "Listening..." : "Mic off"}</span>
              </div>
            )}
          </div>

          {/* Side by Side Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Main Card */}
            <div className="w-full md:w-[50%]">
              <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 h-full">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Pet Julie{" "}
                        <span className="text-green-400 text-sm">
                          (Crypto Insurance Verified)
                        </span>
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-white/60">Time</span>
                        <span className="text-white font-semibold text-right">
                          3:00 PM - 4:00 PM
                        </span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-white/60">Address</span>
                        <span className="text-white font-semibold text-right max-w-xs">
                          13th Street 47 W 13th St, New York, NY 10011, USA
                        </span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-white/60">
                          Time to reach the destination
                        </span>
                        <span className="text-white font-semibold">30 min</span>
                      </div>

                      <div className="flex justify-between items-start">
                        <span className="text-white/60">Weather</span>
                        <span className="text-white font-semibold flex items-center gap-2">
                          <Cloud className="w-4 h-4" />
                          90°F (Partly Cloudy)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Map */}
                  <div className="bg-gray-800/50 rounded-lg overflow-hidden h-[150px] flex items-center justify-center border border-white/10 mt-10">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Map View</p>
                      <p className="text-white/40 text-xs">
                        13th Street, New York
                      </p>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={() => handleConfirmBooking()}
                      className={`bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl transition-all ${
                        isSearching
                          ? "ring-4 ring-green-400 ring-offset-2 ring-offset-black/50"
                          : ""
                      }`}
                      size="lg"
                      disabled={isSearching}
                    >
                      {isSearching ? "Booking..." : "Confirm to book a cab"}
                      {!isSearching && (
                        <span className="ml-2 text-sm">(Approx. $10)</span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Tasks */}
            <div className="w-full md:w-[50%]">
              <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Today's Tasks
                  </h3>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          task.completed
                            ? "bg-white/5 opacity-50"
                            : "bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {task.completed && (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          )}
                          <div>
                            <p
                              className={`font-semibold ${
                                task.completed
                                  ? "text-white/50 line-through"
                                  : "text-white"
                              }`}
                            >
                              {task.task}
                            </p>
                            <p className="text-white/40 text-sm">{task.time}</p>
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

      {/* Searching Dialog (shows first) */}
      <Dialog open={isSearching} onOpenChange={() => {}}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            {/* If you have a GIF, use <img /> below. Otherwise, keep the spinner */}
            {/* <img
              src={searchingGif}
              alt="Searching for nearby cabs..."
              className="w-36 h-36 object-contain mb-4"
            /> */}
            {/* Fallback spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin mb-4" />
            <h2 className="text-xl font-semibold">
              Connecting to vehicle booking app…
            </h2>
            <p className="text-white/60 mt-2 text-sm">
              This will just take a moment.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vehicle Selection Dialog */}
      <Dialog
        open={vehicleSelectionOpen}
        onOpenChange={setVehicleSelectionOpen}
      >
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Available Vehicles
            </h2>
            <p className="text-white/60 text-center mb-6">
              Select a vehicle for 11:00 AM pickup
            </p>
            <div className="space-y-4">
              {availableVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white/5 hover:bg-white/10 rounded-lg p-6 border border-white/10 transition-all cursor-pointer"
                  onClick={() => handleVehicleSelect(vehicle.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Car className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {vehicle.model}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {vehicle.number}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {vehicle.price}
                      </p>
                      <p className="text-white/60 text-sm">
                        ⭐ {vehicle.rating}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">
                      ETA: {vehicle.eta}
                    </span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVehicleSelect(vehicle.id);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      Select for 11:00 AM
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog (shows after vehicle selection) */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-md">
          <div className="text-center py-8">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-6">
              Cab Booked Successfully!
            </h2>
            <p className="text-white/70 mb-6">
              Your vehicle will arrive at 11:00 AM
            </p>
            {selectedVehicle && (
              <div className="space-y-4 bg-white/5 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Cab Number</span>
                  <span className="text-white font-bold text-lg">
                    {
                      availableVehicles.find((v) => v.id === selectedVehicle)
                        ?.number
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Cab Model</span>
                  <span className="text-white font-bold text-lg">
                    {
                      availableVehicles.find((v) => v.id === selectedVehicle)
                        ?.model
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Pickup Time</span>
                  <span className="text-white font-bold text-lg">11:00 AM</span>
                </div>
              </div>
            )}
            <Button
              onClick={() => setConfirmationOpen(false)}
              className="mt-6 bg-primary hover:bg-primary/90 w-full"
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
