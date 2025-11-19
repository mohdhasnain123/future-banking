import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import kioskBg from "./images/scene-3/kiosk-bg-futuristic.jpg";

// Bank logos
import bank1Logo from "./images/scene-3/banks/bankLogo1.png";
import bank2Logo from "./images/scene-3/banks/bankLogo2.png";
import bank3Logo from "./images/scene-3/banks/bankLogo3.png";
import bank4Logo from "./images/scene-3/banks/bankLogo4.png";
import bank5Logo from "./images/scene-3/banks/bankLogo5.png";

// Audio files
import welcomeMp3 from "./audio/scene-3/bankselect-welcome.mp3";
import notRecognizedMp3 from "./audio/scene-3/bankNotRecog.mp3";

// Lucide icons for listening indicator
import { Mic, MicOff } from "lucide-react";

const banks = [
  { id: 1, name: "First National Bank", img: bank1Logo },
  { id: 2, name: "City Savings", img: bank5Logo },
  { id: 3, name: "Metro Credit Union", img: bank3Logo },
  { id: 4, name: "Interstate Finance Bank", img: bank4Logo },
  { id: 5, name: "Future Bank", img: bank2Logo },
];

SpeechRecognition.stopListening();
SpeechRecognition.abortListening();

const BankSelectionScreen = ({ onBankSelected, onExit }: any) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [hasStartedListening, setHasStartedListening] = useState(false);
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
  const [isManuallyListening, setIsManuallyListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Play audio helper
  const playAudio = (audioFile: string, onEnd?: () => void) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    const audio = new window.Audio(audioFile);
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
    const found = banks.find(
      (b) =>
        transcriptLower.includes(b.name.toLowerCase()) ||
        b.name.toLowerCase().includes(transcriptLower)
    );
    if (found) {
      setSelected(found.id);
      setConfirming(true);
      setTimeout(() => {
        setConfirming(false);
        if (onBankSelected) onBankSelected(found);
      }, 1200);
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    } else {
      playAudio(notRecognizedMp3, () => {
        if (!confirming && !selected && isManuallyListening) {
          SpeechRecognition.startListening({
            continuous: false,
            language: "en-US",
          });
        }
      });
    }
    resetTranscript();
  }, [
    finalTranscript,
    confirming,
    selected,
    isManuallyListening,
    onBankSelected,
    resetTranscript,
  ]);

  // Restart listening if not confirming/selected and user has manually started
  useEffect(() => {
    if (
      hasStartedListening &&
      isManuallyListening &&
      !listening &&
      !confirming &&
      !selected
    ) {
      const timer = setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    listening,
    confirming,
    selected,
    hasStartedListening,
    isManuallyListening,
  ]);

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

  useEffect(() => {
    const audio = new Audio(welcomeMp3);
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => {
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-US",
      });
      setHasStartedListening(true);
      setIsManuallyListening(true);
    };
  }, []);

  // Handle upper/lower half click
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

  const handleTileClick = (bank: (typeof banks)[0]) => {
    setSelected(bank.id);
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      if (onBankSelected) onBankSelected(bank);
    }, 1200);
    SpeechRecognition.abortListening();
    setIsManuallyListening(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white">
        Your browser does not support speech recognition.
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onClick={handleScreenClick}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${kioskBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
						linear-gradient(rgba(0, 234, 255, 0.3) 1px, transparent 1px),
						linear-gradient(90deg, rgba(0, 234, 255, 0.3) 1px, transparent 1px)
					`,
            backgroundSize: "50px 50px",
            animation: "grid-flow 20s linear infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-bold text-6xl mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-shimmer">
            WELCOME
          </h1>
          <p className="text-3xl font-semibold text-white/90 tracking-wide">
            Please Select Your Bank
          </p>
          <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-glow" />
        </div>

        {/* Bank Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl w-full animate-stagger-fade-in">
          {banks.map((bank, index) => (
            <div
              key={bank.id}
              tabIndex={0}
              aria-selected={selected === bank.id}
              onClick={(e) => {
                e.stopPropagation();
                if (!confirming) handleTileClick(bank);
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !confirming) {
                  handleTileClick(bank);
                }
              }}
              className={`
								group relative w-full aspect-square
								backdrop-blur-md rounded-2xl
								flex flex-col items-center justify-center
								transition-all duration-300 cursor-pointer
								${confirming ? "cursor-not-allowed" : "hover:scale-105"}
								${
                  selected === bank.id
                    ? "bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,234,255,0.6)]"
                    : "bg-white/10 border border-cyan-400/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,234,255,0.2)]"
                }
							`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Glow effect */}
              {selected === bank.id && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 animate-pulse-glow" />
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4">
                {/* Logo */}
                <div
                  className={`
									w-16 h-16 rounded-full flex items-center justify-center mb-4
									bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm
									${selected === bank.id ? "ring-2 ring-cyan-400 animate-pulse" : ""}
								`}
                >
                  <img
                    src={bank.img}
                    alt={`${bank.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Bank Name */}
                <div className="text-center">
                  <span className="text-white font-semibold text-sm leading-tight tracking-wide">
                    {bank.name}
                  </span>
                </div>
              </div>

              {/* Hover gradient border */}
              <div
                className={`
								absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
								bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 -z-10 blur-xl
								${selected === bank.id ? "opacity-100" : ""}
							`}
              />
            </div>
          ))}
        </div>

        {/* Confirmation Message */}
        {selected && confirming && (
          <div
            aria-live="polite"
            className="mt-8 text-2xl font-semibold text-green-400 animate-pulse"
            style={{ textShadow: "0 0 20px rgba(55, 251, 7, 0.8)" }}
          >
            ✓ Confirming selection...
          </div>
        )}
      </div>

      {/* Listening Indicator - top right corner */}
      {browserSupportsSpeechRecognition && (
        <div
          className={`
					fixed top-6 right-6 px-6 py-3 rounded-full
					backdrop-blur-md border transition-all duration-300
					${
            listening
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(0,234,255,0.5)]"
              : "bg-white/10 border-white/20 text-white/60"
          }
				`}
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

      <style>{`
				@keyframes grid-flow {
					0% { transform: translateY(0); }
					100% { transform: translateY(50px); }
				}
			`}</style>
    </div>
  );
};

export default BankSelectionScreen;
