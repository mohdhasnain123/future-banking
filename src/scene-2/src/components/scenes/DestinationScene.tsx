import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, ZoomIn, ArrowLeft, ArrowRight, Mic } from "lucide-react";
import mapImage from "@/scene-2/src/assets/map.png";
import backgroundImage from "@/scene-2/src/assets/background.jpg";

const DestinationScene = ({
  listening,
  browserSupportsSpeechRecognition,
  transcript
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
  transcript?: string;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMapClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row gap-6 p-6 md:p-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Map Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="backdrop-blur-md bg-card/50 border border-border rounded-3xl overflow-hidden shadow-2xl">
            <div
              className="relative h-[500px] cursor-pointer overflow-hidden"
              onClick={handleMapClick}
            >
              <img
                src={mapImage}
                alt="Navigation Map"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
              />

              {/* Current Location Marker (Car) */}
              <div className="absolute top-[35%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-3 bg-primary/30 rounded-full animate-ping" />
                  <div className="relative bg-primary rounded-full p-2 shadow-lg">
                    <Navigation className="w-5 h-5 text-primary-foreground fill-primary-foreground rotate-45" />
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-card/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-border">
                  Current Location
                </div>
              </div>

              {/* Route Path (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient
                    id="routeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.4"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M 40% 35% Q 45% 45%, 70% 60%"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>

              {/* Traffic Indicators (visible when zoomed) */}
              {isZoomed && (
                <>
                  <div className="absolute top-[45%] left-[50%] bg-green-500/80 backdrop-blur-sm px-2 py-1 rounded text-xs animate-fade-in">
                    Clear
                  </div>
                  <div className="absolute top-[52%] left-[58%] bg-yellow-500/80 backdrop-blur-sm px-2 py-1 rounded text-xs animate-fade-in">
                    Moderate
                  </div>
                  <div className="absolute top-[48%] left-[45%] text-xs text-muted-foreground/70 animate-fade-in">
                    Main St
                  </div>
                  <div className="absolute top-[55%] right-[38%] text-xs text-muted-foreground/70 animate-fade-in">
                    Oak Ave
                  </div>
                </>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

              {/* Zoom Hint */}
              <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-muted-foreground border border-border flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                {isZoomed
                  ? "Click to zoom out"
                  : "Click to see traffic details"}
              </div>
            </div>

            <div className="p-8 text-center border-t border-border/50 bg-card/80">
              <div className="text-6xl font-bold text-foreground mb-2">
                5 min
              </div>
              <div className="text-2xl text-muted-foreground">
                1 mile remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date/Time */}
      <div className="absolute top-8 left-24">
        <div className="text-xl font-light text-foreground">
          15 July 2035, Sun
        </div>
        <div className="text-sm text-muted-foreground">02:40 pm</div>
      </div>

      {/* Top right microphone status */}
      {browserSupportsSpeechRecognition && (
        <div className="absolute top-6 right-8 z-20">
          <div className="flex items-center gap-2 text-sm text-white/70 ml-4">
            <Mic
              className={`w-5 h-5 ${
                listening ? "text-green-400 animate-pulse" : ""
              }`}
            />
            <span>{listening ? "Listening..." : "Mic off"}</span>
          </div>
        </div>
      )}

      {/* Voice status indicator and transcript for debugging */}
      {browserSupportsSpeechRecognition && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 bg-background/80 px-4 py-2 rounded shadow">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${listening ? "bg-success" : "bg-destructive"}`}></span>
            <span className="text-xs text-muted-foreground">
              Voice Command: Say "petinfo" to go to Pet Info screen
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Transcript: {transcript}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationScene;