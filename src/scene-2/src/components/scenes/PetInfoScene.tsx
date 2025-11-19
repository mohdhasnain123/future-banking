import { useState, useEffect } from "react";
import dogVideo from "@/scene-2/src/assets/dogVideo.mp4";
import { LucideAudioLines, Mic } from "lucide-react";
import { formatDate, formatTime } from "@/components/utils";
import backgroundImage from "@/scene-2/src/assets/dashboard-bg.jpg";;

const PetInfoScene = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row gap-6 p-6 md:p-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Pet Info Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="backdrop-blur-md bg-card/50 border border-border rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2">
              Pet Julie{" "}
              <span className="text-primary text-lg">(Insurance Verified)</span>
            </h2>

            <p className="text-muted-foreground mb-8">
              Julie, the Golden Retriever mix, is a heartwarming blend of
              loyalty, playfulness, and golden charm.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Breed</span>
                  <span className="text-foreground font-medium">
                    Golden Retriever Mix
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Age</span>
                  <span className="text-foreground font-medium">2 year</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">
                    Last Vet Check-up
                  </span>
                  <span className="text-foreground font-medium">
                    Oct 26, 2034
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Rabies</span>
                  <span className="text-foreground font-medium">
                    Due Oct 2034
                  </span>
                </div>
              </div>

              <div className="bg-card/30 rounded-2xl p-6 backdrop-blur-sm border border-border/30">
                <div className="w-full aspect-square bg-muted/20 rounded-xl mb-4 overflow-hidden">
                  <video
                    src={dogVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">5 min</div>
                  <div className="text-xs text-muted-foreground">1 mile</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  She's house-trained and knows basic commands like sit and stay
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  Julie recently snapped at a child and now aggressively lunges
                  at strangers on walks. These concerning behaviours indicate a
                  need for a certified therapist to assess triggers and
                  determine a safe path forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date/Time */}
      <div className="absolute top-8 left-8">
        <div className="text-xl font-light text-foreground">
          {formatDate(currentTime)}
        </div>
        <div className="text-sm text-muted-foreground">02:45 pm</div>
      </div>

      {/* Top right microphone status */}
      {browserSupportsSpeechRecognition && (
        <div className="absolute top-6 right-8 z-20">
          <div className="flex items-center gap-2 text-sm text-white/70 ml-4">
            {listening ? (
              <>
                <Mic className={`w-5 h-5 text-green-400 animate-pulse`} />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <LucideAudioLines className="w-5 h-5 text-blue-400" />
                <span>Dot</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PetInfoScene;
