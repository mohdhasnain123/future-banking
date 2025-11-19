import { useEffect, useRef } from "react";
import user from "./images/scene-3/hmn.png"; // Path to the user image
import backgroundImage from "./images/scene-3/Group2.png"; // Path to the background image
import userPosition from "./images/scene-3/greenPosition.png";
import welcomeUserPositionMp3 from "./audio/scene-3/positionDetected.mp3";

const UserPositionDetected = () => {
  const audioRef = useRef(null);

  // Auto-play audio on mount
  useEffect(() => {
    const audio = new Audio(welcomeUserPositionMp3);
    audioRef.current = audio;
    audio.play().catch(() => {});

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // Handle screen click
  const handleScreenClick = (e) => {
    const y = e.clientY;
    const screenHeight = window.innerHeight;

    if (y < screenHeight / 2) {
      // Upper half: Pause or resume audio
      if (audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
    }
    // Lower half: No extra logic unless you want to add something later
  };

  return (
    <div
      role="main"
      onClick={handleScreenClick}
      className="relative h-screen w-full overflow-hidden bg-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80 pointer-events-none" />

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-particle-float opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scanline" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
						linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
						linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
					`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Welcome at the very top */}
      <h1 className="absolute top-8 left-0 w-full text-center text-5xl font-bold text-primary z-10 m-0 tracking-wider animate-quantum-glow">
        Welcome
      </h1>

      {/* Centered content */}
      <div className="h-full flex flex-col items-center justify-center pt-24 relative z-10">
        {/* Holographic card container */}
        <div className="relative mb-8 px-8 py-6 rounded-2xl backdrop-blur-md bg-card/30 border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
          <div
            className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
              backgroundSize: "200% 100%",
            }}
          />

          <div className="relative text-2xl text-center font-bold text-foreground tracking-wide">
            <span className="text-primary animate-quantum-pulse">
              Please remain on the platform to proceed for Authentication
            </span>
            <br />
            <span className="text-foreground/90 text-xl mt-2 inline-block">
              Preparing for authentication..
            </span>
          </div>
        </div>

        {/* Platform container */}
        <div className="relative h-[430px] w-[320px] max-w-[90vw]">
          {/* Glow rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-[280px] h-[280px] rounded-full border-2 border-primary/40 animate-quantum-pulse"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute w-[240px] h-[240px] rounded-full border-2 border-accent/30 animate-quantum-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
            />
          </div>

          {/* Platform for user */}
          <img
            src={userPosition}
            alt="Platform"
            className="absolute left-0 bottom-0 w-full h-auto z-10 pointer-events-none select-none animate-quantum-glow"
            style={{
              filter:
                "drop-shadow(0 0 24px #00ff0dff) drop-shadow(0 0 8px #00f33dab)",
            }}
          />

          {/* User standing on platform */}
          <img
            src={user}
            alt="User"
            className="absolute left-1/2 bottom-0 z-20 pointer-events-none select-none"
            style={{
              transform: "translateX(-50%)",
              width: "48%",
              height: "91%",
              objectFit: "contain",
            }}
          />

          {/* Holographic projection lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-1/2 w-px h-full origin-bottom bg-gradient-to-t from-primary/50 to-transparent"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  animation: "quantum-pulse 3s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-8 relative">
          <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
          <div className="relative flex items-center gap-3 px-6 py-3 rounded-full border border-primary/50 bg-card/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-quantum-pulse" />
            <span className="text-xl text-primary font-semibold tracking-wider">
              Preparing for authentication..
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPositionDetected;
