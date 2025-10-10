import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Cloud, CheckCircle2, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
// Optional: If you have a searching GIF, uncomment the next line and add the file
// import searchingGif from "@/assets/searching.gif";

const CabBooking = () => {
  const navigate = useNavigate();

  // NEW: searching state
  const [isSearching, setIsSearching] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cabBooked, setCabBooked] = useState(false);

  // Keep a reference to the timeout so we can clean it up on unmount
  const timerRef = useRef<number | null>(null);
  const SEARCH_DELAY_MS = 2000; // Adjust as you like (2s = nice UX)

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
      setIsSearching(false);           // close searching modal
      addCabTaskIfMissing();           // update tasks
      setConfirmationOpen(true);       // open confirmation dialog
      setCabBooked(true);              // enable Audible button
    }, SEARCH_DELAY_MS);
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
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/wealth-advisor")}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="text-white/70">
              <p className="text-sm">15 July 2035, Sun</p>
              <p className="text-xs">02:00 pm</p>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Pet Therapy Appointment
          </h1>

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
                      onClick={handleConfirmBooking}
                      className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-lg rounded-xl"
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

          {/* Audible Button - only show after cab is booked */}
          {cabBooked && (
            <div className="flex justify-center">
              <Button
                onClick={() => navigate("/audiobook")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg flex items-center gap-2"
                size="lg"
              >
                <Volume2 className="w-5 h-5" />
                Audible
              </Button>
            </div>
          )}
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
            <h2 className="text-xl font-semibold">Finding nearby cabs…</h2>
            <p className="text-white/60 mt-2 text-sm">
              This will just take a moment.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog (shows after searching) */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="bg-gray-900/95 backdrop-blur-md border-2 border-white/20 text-white max-w-md">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-6">
              Cab booking is confirmed! Your cab is 10 min away
            </h2>
            <div className="space-y-4 bg-white/5 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Cab Number</span>
                <span className="text-white font-bold text-lg">A BC 1224</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Cab Model</span>
                <span className="text-white font-bold text-lg">Tesla</span>
              </div>
            </div>
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