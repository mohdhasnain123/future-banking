import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import backgroundImage from "@/scene-2/src/assets/background.jpg";

export default function Welcome() {
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
}
