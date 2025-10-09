import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mountainBg from "@/assets/mountain-bg.jpg";
import audiobookCover from "@/assets/audiobook.png";

const Audiobook = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={() => navigate("/cab-booking")}
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

          {/* Audiobook Player */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Book Cover */}
            <div className="w-full max-w-sm aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-2 border-white/20">
              <img 
                src={audiobookCover} 
                alt="Great Tales from English History by Robert Lacey" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Waveform Visualization */}
            <div className="w-full max-w-2xl h-24 flex items-center justify-center gap-1 px-8">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                    opacity: isPlaying ? 0.8 : 0.4,
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => {}}
              >
                <SkipBack className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-20 h-20 rounded-full bg-white hover:bg-white/90 text-black"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => {}}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>

            {/* Book Info */}
            <div className="text-center mt-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Great Tales from English History
              </h2>
              <p className="text-white/60 text-lg">Robert Lacey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audiobook;
