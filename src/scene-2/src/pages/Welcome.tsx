import { useState, useRef } from "react";
import { MapWidget } from "../components/MapWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import backgroundImage from "@/scene-2/src/assets/background.jpg";
import video1 from "@/assets/videos/Main_VIdeo.mp4";

const Welcome = () => {
  const [conversationStep, setConversationStep] = useState(0);
  const [isActive, setIsVideoActive] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  let videoRef = useRef(null);

  const handlePlayPause = () => {
    console.log("handlePlayPause video=", conversationStep);

    if (conversationStep === 0) {
      videoRef = videoRef1;
    } else if (conversationStep === 2) {
      videoRef = videoRef2;
    } else {
      videoRef = videoRef3;
    }
    if (videoRef.current.paused) {
      //Check if the video is paused
      videoRef.current.play(); // Play the video

      setIsVideoActive(true);
    } else {
      videoRef.current.pause(); // Pause the video
      setIsVideoActive(true);
    }
  };

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
          <Card className="bg-glass-bg/80 backdrop-blur-md border-2 border-white/20 flex-1">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-black/40 rounded-lg overflow-hidden">
                {/* <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src="../assets/videos/Pat_1a.mp4"
                      type="video/mp4"
                    />
                  </video> */}
                <video
                  ref={videoRef1}
                  src={video1}
                  className="w-full h-full object-cover"
                  autoPlay
                  onClick={handlePlayPause}
                  onEnded={() => setConversationStep((idx) => idx + 1)}
                />
                {/* <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <p className="text-white font-semibold text-sm">
                    Sarah Chen, CFP
                  </p>
                  <p className="text-white/70 text-xs">Senior Wealth Advisor</p>
                </div> */}
              </div>
            </CardContent>
          </Card>
          {/* <Button
            size="lg"
            className="text-lg px-8 py-6 bg-success hover:bg-success/90 text-success-foreground font-semibold"
            onClick={() => navigate("/browse-arts")}
          >
            Browse Arts
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
