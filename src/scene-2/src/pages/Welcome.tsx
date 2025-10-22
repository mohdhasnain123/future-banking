import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import backgroundImage from "@/scene-2/src/assets/background.jpg";
import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

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

      <DateTimeDisplay />
      <MapWidget />

      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-7xl font-bold text-foreground tracking-wider">
          Welcome Vick!!
        </h1>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-success hover:bg-success/90 text-success-foreground font-semibold"
            onClick={() => navigate("/browse-arts")}
          >
            Browse Arts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
