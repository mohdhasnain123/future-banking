import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import quantumBg from "./images/scene-3/quantum-auth-bg.jpg";
import glassDoorImg from "./images/scene-3/chipGreen.png";
import chipScannerImg from "./images/scene-3/blueChip1.png";

// Import audio files
import welcomeMp3 from "./audio/scene-3/qsk1.mp3";
import scanningMp3 from "./audio/scene-3/qsk2.mp3";
import successMp3 from "./audio/scene-3/qsk3.mp3";
import failureMp3 from "./audio/scene-3/qsk3.mp3";

// Lucide icons
import { Mic, MicOff } from "lucide-react";

// Simulate chip scan authentication
const authenticateChip = () => {
  return true;
};

interface QuantumAuthScreenProps {
  selectedBank?: {
    name: string;
  };
}

const QuantumAuthScreen: React.FC<QuantumAuthScreenProps> = ({ selectedBank }) => {
  const bankName = selectedBank ? selectedBank.name : "Your Bank";
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "failure">("idle");
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
  const [isManuallyListening, setIsManuallyListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { finalTranscript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Play audio helper
  const playAudio = (audioFile: string, onEnd?: () => void) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    const audio = new Audio(audioFile);
    audioRef.current = audio;
    if (onEnd) {
      audio.onended = onEnd;
    }
    audio.play().catch(() => {});
  };

  // Handle speech recognition results
  useEffect(() => {
    if (!finalTranscript) return;
    const transcriptLower = finalTranscript.toLowerCase();
    if (
      (transcriptLower.includes("proceed") ||
        transcriptLower.includes("scan") ||
        transcriptLower.includes("ok")) &&
      status === "idle"
    ) {
      handleScan();
    }
    resetTranscript();
  }, [finalTranscript, status, resetTranscript]);

  // Restart listening if needed
  useEffect(() => {
    if (isManuallyListening && !listening && status === "idle") {
      const timer = setTimeout(() => {
        SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [listening, status, isManuallyListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      SpeechRecognition.abortListening();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  
// Auto-play welcome audio on mount
useEffect(() => {
  const audio = new Audio(welcomeMp3);
  audioRef.current = audio;
  audio.play().catch(() => {});
  audio.onended = () => {
    // After welcome audio ends, start listening
    SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
    setIsManuallyListening(true);
    setHasPlayedWelcome(true);
  };
}, []);

// Handle screen click
const handleScreenClick = (e: React.MouseEvent) => {
  const y = e.clientY;
  const windowHeight = window.innerHeight;

  if (y < windowHeight / 2) {
    // Upper half: Pause or resume audio
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }
};


  const handleScan = () => {
    setStatus("scanning");
    playAudio(scanningMp3, () => {});
    setTimeout(() => {
      const success = authenticateChip();
      if (success) {
        setStatus("success");
        playAudio(successMp3, () => {});
      } else {
        setStatus("failure");
        playAudio(failureMp3, () => {});
      }
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    }, 3000);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus("idle");
    setHasPlayedWelcome(false);
    setIsManuallyListening(false);
    resetTranscript();
  };

  // Mic indicator click handler
  const handleMicIndicatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== "idle") return;
    if (listening) {
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
      setIsManuallyListening(true);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center text-destructive">
          Your browser does not support speech recognition.
        </div>
      </div>
    );
  }

  return (
    <div
      role="main"
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${quantumBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleScreenClick}
    >
      {/* Quantum Grid Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,234,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,234,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-particle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scanline" />
      </div>

      {/* Header */}
      <header className="absolute top-8 left-0 right-0 z-10">
        <h1
          className="text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
          style={{
            color: "#00fff7", // Fixed bright cyan color for readability
            textShadow: "0 0 16px #00fff7, 0 0 32px #0ff", // Glow effect for futuristic look
            letterSpacing: "2px",
          }}
        >
          {bankName} Quantum-Safe Authentication
        </h1>
        <div className="flex justify-center mt-2">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <div className="h-full flex flex-col items-center justify-center pt-24 px-4">
        {(status === "idle" || status === "scanning") && (
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            {/* Holographic Card Container */}
            <div
              className="relative backdrop-blur-xl bg-card/30 border border-primary/30 rounded-3xl p-12 shadow-2xl"
              style={{
                boxShadow: "0 0 40px hsl(var(--quantum-cyan) / 0.2), inset 0 0 20px hsl(var(--quantum-cyan) / 0.05)",
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-3xl" />

              {/* Chip Scanner with colored scanning box */}
              <div className="relative mb-8 flex justify-center">
                <div
                  className="relative"
                  style={{
                    width: "220px",
                    height: "300px",
                    borderRadius: "24px",
                    boxShadow: status === "scanning"
                      ? "0 0 40px 10px #00fff7, 0 0 80px 20px #006aff"
                      : "0 0 20px 4px #00fff7",
                    border: status === "scanning" ? "4px solid #00fff7" : "2px solid #00fff7",
                    background: status === "scanning"
                      ? "linear-gradient(135deg, rgba(0,255,247,0.15) 0%, rgba(0,106,255,0.10) 100%)"
                      : "rgba(0,255,247,0.08)",
                    transition: "box-shadow 0.5s, border 0.5s, background 0.5s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={chipScannerImg}
                    alt="Quantum Chip Scanner"
                    className="w-48 h-64 object-contain"
                  />
                  {status === "scanning" && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Animated border effect */}
                      <div className="absolute inset-0 rounded-[24px] border-4 border-cyan-400 animate-quantum-border-glow" />
                      {/* Scanline */}
                      <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline" />
                    </div>
                  )}
                </div>
              </div>

              {/* Instruction Text */}
              <div className="text-center mb-8 space-y-2">
                <p className="text-2xl text-foreground font-medium tracking-wide">
                  Please scan your{" "}
                  <span className="text-primary font-bold drop-shadow-[0_0_10px_hsl(var(--quantum-cyan))]">
                    Quantum-Safe key
                  </span>
                </p>
                <p className="text-lg text-muted-foreground">to authenticate your identity</p>
              </div>

              {/* Scan Button - FUTURISTIC HIGHLIGHTED */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScan();
                  }}
                  disabled={status === "scanning"}
                  className="relative group px-10 py-4 text-xl font-bold tracking-wider rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(90deg, #00fff7 0%, #006aff 100%)",
                    color: status === "scanning" ? "#fff" : "#101010", // White text when scanning
                    boxShadow: "0 0 32px #00fff7, 0 0 16px #006aff",
                    border: "2px solid #00fff7",
                    textShadow: status === "scanning"
                      ? "0 0 12px #00fff7, 0 0 8px #006aff"
                      : "0 0 8px #00fff7, 0 0 4px #006aff",
                  }}
                >
                  {status === "scanning" ? (
                    <span
                      className="relative z-10 px-8 py-2 rounded-lg"
                      style={{
                        background: "linear-gradient(90deg, #00fff7 0%, #006aff 100%)",
                        boxShadow: "0 0 24px #00fff7, 0 0 8px #006aff",
                        color: "#fff",
                        textShadow: "0 0 12px #00fff7, 0 0 8px #006aff",
                        fontWeight: "bold",
                        letterSpacing: "2px",
                        fontSize: "1.25rem",
                        display: "inline-block",
                        animation: "scanningPulse 1.2s infinite alternate",
                      }}
                    >
                      SCANNING...
                    </span>
                  ) : (
                    <span className="relative z-10">
                      SCAN CHIP
                    </span>
                  )}
                  {status !== "scanning" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-scale-in">
            {/* Success Message */}
            <div className="flex items-center gap-4 mb-8 text-3xl font-bold text-center">
              <span
                className="bg-gradient-to-r from-[hsl(var(--quantum-green))] to-primary bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 20px hsl(var(--quantum-green) / 0.5)",
                }}
              >
                Authentication Successful
              </span>
              <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  stroke="hsl(var(--quantum-green))"
                  strokeWidth="3"
                  opacity="0.2"
                />
                <path
                  d="M12 24 L20 32 L36 16"
                  fill="none"
                  stroke="hsl(var(--quantum-green))"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="48"
                  strokeDashoffset="48"
                  className="animate-tick-draw"
                />
              </svg>
            </div>

            {/* Door Animation */}
            <div className="relative mb-8">
              <div
                className="absolute inset-0 blur-2xl opacity-50"
                style={{
                  background: "radial-gradient(circle, hsl(var(--quantum-green) / 0.4), transparent 70%)",
                }}
              />
              <img
                src={glassDoorImg}
                alt="Access Granted - Door Opening"
                className="relative w-[500px] h-auto animate-door-slide"
                style={{
                  filter: "drop-shadow(0 10px 30px hsl(var(--quantum-green) / 0.3))",
                }}
              />
            </div>

            {/* Futuristic Access Instructions Box - solid background for readability */}
            <div
              className="relative px-10 py-8 rounded-2xl backdrop-blur-xl"
              style={{
                background: "rgba(0,34,51,0.85)", // Solid semi-transparent dark blue
                border: "2px solid #00fff7",
                overflow: "hidden",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <p
                className="text-3xl font-extrabold text-center mb-2"
                style={{
                  color: "#b3eaff",
                  textShadow: "0 0 4px #00fff7, 0 0 2px #006aff",
                  fontFamily: "Outfit, system-ui, sans-serif",
                  letterSpacing: "2px",
                  marginBottom: "0.5rem",
                }}
              >
                Please walk through the door
              </p>
              <p
                className="text-lg text-center font-semibold"
                style={{
                  color: "#b3eaff",
                  textShadow: "0 0 4px #00fff7, 0 0 2px #006aff",
                  fontFamily: "Outfit, system-ui, sans-serif",
                  letterSpacing: "1px",
                }}
              >
                to the secured quantum space
              </p>
            </div>
          </div>
        )}

        {status === "failure" && (
          <div className="flex flex-col items-center animate-scale-in">
            <div
              className="backdrop-blur-xl bg-destructive/10 border-2 border-destructive/50 rounded-3xl p-12 max-w-xl"
              style={{
                boxShadow: "0 0 40px hsl(var(--destructive) / 0.3)",
              }}
            >
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-destructive/50 rounded-full animate-quantum-pulse" />
                  <svg width="80" height="80" viewBox="0 0 80 80" className="relative">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="4"
                      opacity="0.3"
                    />
                    <path
                      d="M30 30 L50 50 M50 30 L30 50"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              <h2
                className="text-4xl font-bold text-destructive text-center mb-4"
                style={{
                  textShadow: "0 0 15px hsl(var(--destructive) / 0.5)",
                }}
              >
                ACCESS DENIED
              </h2>

              <p className="text-xl text-foreground text-center mb-2">Authentication failed</p>
              <p className="text-lg text-muted-foreground text-center mb-8">
                Please try scanning your Quantum-Safe chip again
              </p>

              {/* Retry Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleRetry}
                  className="relative group px-10 py-4 text-xl font-bold tracking-wider rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #00fff7, #006aff)", // Same futuristic gradient
                    color: "#101010",
                    boxShadow: "0 0 32px #00fff7, 0 0 16px #006aff",
                    border: "2px solid #00fff7",
                    textShadow: "0 0 8px #00fff7, 0 0 4px #006aff",
                  }}
                >
                  <span className="relative z-10">RETRY SCAN</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Listening Indicator - TOP RIGHT CORNER */}
      {browserSupportsSpeechRecognition && (
        <div
          className={`
            fixed top-6 right-6 px-6 py-3 rounded-full
            backdrop-blur-md border transition-all duration-300 cursor-pointer select-none z-50
            ${listening 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(0,234,255,0.5)]' 
              : 'bg-white/10 border-white/20 text-white/60'
            }
          `}
          onClick={handleMicIndicatorClick}
          title={listening ? "Stop Listening" : "Start Listening"}
        >
          <div className="flex items-center gap-2 text-sm">
            {listening ? (
              <>
                <Mic className="w-5 h-5 text-green-400 animate-pulse" />
                <span>Listening...</span>
              </>
            ) : (
              <>
                <MicOff className="w-5 h-5 text-red-400" />
                <span>Mic off</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Custom animation for glowing lines and scanning box */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes quantum-border-glow {
          0%, 100% { box-shadow: 0 0 40px 10px #00fff7, 0 0 80px 20px #006aff; opacity: 1; }
          50% { box-shadow: 0 0 80px 20px #00fff7, 0 0 120px 40px #006aff; opacity: 0.7; }
        }
        .animate-quantum-border-glow {
          animation: quantum-border-glow 1.5s infinite alternate;
        }
        @keyframes scanline {
          0% { transform: translateY(-50%) scaleX(0.5); opacity: 0.6; }
          50% { transform: translateY(-50%) scaleX(1); opacity: 1; }
          100% { transform: translateY(-50%) scaleX(0.5); opacity: 0.6; }
        }
        .animate-scanline {
          animation: scanline 1.2s infinite;
        }
        @keyframes scanningPulse {
          0% { box-shadow: 0 0 24px #00fff7, 0 0 8px #006aff; }
          100% { box-shadow: 0 0 40px #00fff7, 0 0 16px #006aff; }
        }
      `}</style>
    </div>
  );
};

export default QuantumAuthScreen;