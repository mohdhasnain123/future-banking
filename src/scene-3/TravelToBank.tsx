import { useState, useRef } from "react";
import { RefObject } from "react";
import { MapWidget } from "../scene-2/src/components/MapWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTimeDisplay } from "../scene-2/src/components/DateTimeDisplay";
import backgroundImage from "@/scene-2/src/assets/background.jpg";
import video1 from "@/assets/videos/Main_VIdeo.mp4";

interface TravelBankProps {
  videoRef: RefObject<HTMLVideoElement>;
  onVideoEnd: (index: number) => void;
}
const TravelToBank: React.FC<TravelBankProps> = ({ videoRef, onVideoEnd }) => {
  // const [conversationStep, setConversationStep] = useState(0);
  // const [isActive, setIsVideoActive] = useState(false);

  // const videoRef1 = useRef(null);
  // const videoRef2 = useRef(null);
  // const videoRef3 = useRef(null);
  //let videoRef = useRef(null);

  // const handlePlayPause = () => {
  //   console.log("handlePlayPause video=", conversationStep);

  //   if (videoRef.current.paused) {
  //     //Check if the video is paused
  //     videoRef.current.play(); // Play the video

  //     setIsVideoActive(true);
  //   } else {
  //     videoRef.current.pause(); // Pause the video
  //     setIsVideoActive(true);
  //   }
  // };

  const handleVideoEnded = () => {
    console.log("travel video end");
    onVideoEnd(7); // send index to App
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
                <video
                  ref={videoRef}
                  src={video1}
                  className="w-full h-full object-cover"
                  //onClick={handlePlayPause}
                  onEnded={handleVideoEnded}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelToBank;
