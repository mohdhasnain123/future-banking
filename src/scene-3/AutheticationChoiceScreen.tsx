import { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import authChoiceMp3 from "./audio/scene-3/authChoice.mp3";
import authChoiceSelectedMp3 from "./audio/scene-3/authChoiceSelected.mp3";
import { Mic, MicOff } from "lucide-react";

const AuthenticationChoiceScreen = ({ onBCISelect }) => {
  const audioRef = useRef(null);
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
  const [isManuallyListening, setIsManuallyListening] = useState(false);

  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Play audio helper
  const playAudio = (audioFile, onEnd) => {
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
    if (
      transcriptLower.includes("proceed") ||
      transcriptLower.includes("bci") ||
      transcriptLower.includes("brain mapping")
    ) {
      playAudio(authChoiceSelectedMp3, () => {
        setTimeout(() => {
          onBCISelect();
        }, 250);
      });
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    }
    resetTranscript();
    // eslint-disable-next-line
  }, [finalTranscript]);

  // Restart listening if not listening and user has manually started
  useEffect(() => {
    if (isManuallyListening && !listening) {
      const timer = setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [listening, isManuallyListening]);

  // Auto-play audio on mount
  useEffect(() => {
    const audio = new Audio(authChoiceMp3);
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
      setIsManuallyListening(true);
      setHasPlayedWelcome(true);
    };

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

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="auth-choice-bg"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          color: "#e3f2fd",
          fontFamily: "Outfit, system-ui, sans-serif",
          letterSpacing: 2,
          overflow: "hidden",
        }}
        onClick={handleScreenClick}
      >
        {/* Particle overlay */}
        <div className="particle-overlay"></div>

        {/* MIC indicator top right */}
        <div className="mic-indicator">
          {listening ? (
            <div className="mic-on">
              <Mic className="mic-icon" />
              <span className="mic-text">Listening...</span>
            </div>
          ) : (
            <div className="mic-off">
              <MicOff className="mic-icon" />
              <span className="mic-text">Mic off</span>
            </div>
          )}
        </div>

        <h1
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 50,
            fontWeight: 700,
            color: "#00eaff",
            zIndex: 2,
            margin: 0,
            letterSpacing: 4,
            fontFamily: "Outfit, system-ui, sans-serif",
            textShadow: "0 0 24px #00eaff, 0 0 48px #37fb07",
            animation: "quantum-glow 2s infinite alternate",
          }}
        >
          Choose Authentication Method
        </h1>

        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 50,
            zIndex: 2,
          }}
        >
          {/* BOX START */}
          <div
            className="glass-panel"
            style={{
              background: "rgba(34, 34, 68, 0.7)",
              borderRadius: 32,
              border: "2px solid #00eaff55",
              boxShadow: "0 0 32px 8px #00eaff55, 0 0 64px 16px #37fb0755",
              padding: "48px 44px 60px 44px",
              minWidth: 420,
              maxWidth: 760,
              width: "760px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 260,
              position: "relative",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Instruction */}
            <div
              style={{
                fontSize: 22,
                letterSpacing: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Outfit, system-ui, sans-serif",
                textShadow: "0 0 12px #00eaff44",
                marginBottom: 48,
                color: "#e3f2fd",
              }}
            >
              Please select your preferred authentication method
            </div>

            <div style={{ flexGrow: 1 }} />

            {/* Buttons */}
            <div
              className="method-row"
              style={{
                display: "flex",
                gap: 40,
                marginBottom: 0,
                justifyContent: "center",
                width: "100%",
                flexWrap: "nowrap",
              }}
            >
              {/* BCI Authentication Button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "320px",
                  minWidth: "220px",
                }}
              >
                <button
                  onClick={onBCISelect}
                  className="futuristic-btn success"
                  style={{
                    width: "100%",
                    height: 60,
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Outfit, system-ui, sans-serif",
                    letterSpacing: 2,
                    cursor: "pointer",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    padding: "10px 16px",
                    lineHeight: "1.2",
                  }}
                  aria-label="BCI Authentication"
                >
                  BCI Authentication
                </button>
                <span style={{ height: 22, display: "block" }}></span>
              </div>

              {/* Biometric Chip Authentication Button (Disabled) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "320px",
                  minWidth: "220px",
                }}
              >
                <button
                  disabled
                  className="futuristic-btn disabled"
                  style={{
                    width: "100%",
                    height: 60,
                    fontSize: 15,
                    fontWeight: "bold",
                    fontFamily: "Outfit, system-ui, sans-serif",
                    letterSpacing: 2,
                    cursor: "not-allowed",
                    opacity: 0.6,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    padding: "10px 10px",
                    lineHeight: "1.15",
                  }}
                  aria-label="Biometric Chip Authentication (Disabled)"
                  aria-disabled="true"
                >
                  Biometric Chip Authentication
                </button>
                <span
                  style={{
                    color: "#ff6666",
                    fontSize: 16,
                    marginTop: 8,
                    textShadow: "0 0 4px #000",
                    textAlign: "center",
                    width: "100%",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  Currently unavailable
                </span>
              </div>
            </div>
          </div>
          {/* BOX END */}
        </div>
      </div>
      <style>{`
				@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap');
				.particle-overlay {
					position: absolute;
					top: 0; left: 0;
					width: 100vw; height: 100vh;
					pointer-events: none;
					z-index: 1;
					background: radial-gradient(circle at 20% 30%, #00eaff22 0%, #37fb0711 80%, transparent 100%);
					animation: particles-move 8s infinite linear alternate;
				}
				@keyframes particles-move {
					0% { background-position: 0 0; }
					100% { background-position: 100px 80px; }
				}
				.glass-panel {
					background: rgba(34, 34, 68, 0.7);
					border-radius: 32px;
					box-shadow: 0 0 32px 8px #00eaff55, 0 0 64px 16px #37fb0755;
					border: 2px solid #00eaff;
					backdrop-filter: blur(8px);
					position: relative;
					z-index: 3;
				}
				.futuristic-btn {
					background: linear-gradient(90deg, #00eaff 0%, #37fb07 100%);
					color: #fff;
					border: none;
					border-radius: 18px;
					padding: 14px 38px;
					font-size: 1.15rem;
					font-weight: bold;
					cursor: pointer;
					box-shadow: 0 0 16px #00eaff88, 0 0 32px #37fb0744;
					transition: transform 0.2s, box-shadow 0.2s;
					letter-spacing: 2px;
					font-family: 'Orbitron', Inter, 'Poppins', Arial, sans-serif;
				}
				.futuristic-btn.success {
					background: linear-gradient(90deg, #37fb07 0%, #00eaff 100%);
				}
				.futuristic-btn.disabled {
					background: linear-gradient(90deg, #888 0%, #aaa 100%);
					color: #ccc;
					cursor: not-allowed;
					opacity: 0.6;
					box-shadow: 0 0 8px #88888844;
				}
				.futuristic-btn:hover:not(:disabled) {
					transform: scale(1.07);
					box-shadow: 0 0 32px #00eaff, 0 0 64px #37fb07;
				}
				.mic-indicator {
					position: fixed;
					top: 18px;
					right: 18px;
					z-index: 1001;
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 6px 14px;
					border-radius: 999px;
					font-family: 'Orbitron', Inter, Arial, sans-serif;
					font-size: 0.98rem;
					backdrop-filter: blur(8px);
					box-shadow: 0 0 12px #00eaff44;
					border: 2px solid #00eaff55;
					background: rgba(34, 34, 68, 0.7);
					letter-spacing: 2px;
					transition: background 0.2s, box-shadow 0.2s;
				}
				.mic-on {
					color: #00eaff;
					display: flex;
					align-items: center;
					gap: 6px;
					animation: pulseGlow 1.2s infinite alternate;
				}
				.mic-off {
					color: #aaa;
					display: flex;
					align-items: center;
					gap: 6px;
				}
				.mic-icon {
					width: 18px;
					height: 18px;
					display: inline-block;
				}
				.mic-text {
					font-size: 0.96rem;
					font-weight: 500;
					letter-spacing: 1px;
					color: #e3f2fd;
					opacity: 0.8;
				}
				@keyframes pulseGlow {
					0% { box-shadow: 0 0 8px #00eaff; }
					100% { box-shadow: 0 0 24px #00eaff; }
				}
				@keyframes quantum-glow {
					0% { text-shadow: 0 0 24px #00eaff, 0 0 48px #37fb07; }
					50% { text-shadow: 0 0 48px #00eaff, 0 0 96px #37fb07; }
					100% { text-shadow: 0 0 24px #00eaff, 0 0 48px #37fb07; }
				}
				@media (max-width: 900px) {
					.glass-panel {
						width: 98vw !important;
						max-width: 98vw !important;
						min-width: unset !important;
						padding: 18px 4vw !important;
						height: auto !important;
						max-height: 95vh !important;
					}
					.method-row {
						flex-direction: column !important;
						gap: 20px !important;
					}
					.mic-indicator {
						top: 8px !important;
						right: 8px !important;
						padding: 5px 8px !important;
						font-size: 0.92rem !important;
					}
				}
			`}</style>
    </>
  );
};

export default AuthenticationChoiceScreen;
