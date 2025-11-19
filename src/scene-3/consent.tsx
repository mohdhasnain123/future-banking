import { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import consentPromptMp3 from "./audio/scene-3/consent.mp3";
import consentBCIMp3 from "./audio/scene-3/consentBCI.mp3";
import { Mic, MicOff } from "lucide-react";

const ConsentScreen = ({ onAgree, onDecline }) => {
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState(null);
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
    setAudioSrc(audioFile);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        if (onEnd) {
          audioRef.current.onended = onEnd;
        } else {
          audioRef.current.onended = null;
        }
      }
    }, 50);
  };

  // Handle speech recognition results
  useEffect(() => {
    if (!finalTranscript) return;
    const transcriptLower = finalTranscript.toLowerCase();
    if (
      transcriptLower.includes("agree") ||
      transcriptLower.includes("proceed") ||
      transcriptLower.includes("ok") ||
      transcriptLower.includes("yes")
    ) {
      playAudio(consentBCIMp3, () => {
        setTimeout(() => {
          onAgree();
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
    setAudioSrc(consentPromptMp3);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        audioRef.current.onended = () => {
          SpeechRecognition.startListening({
            continuous: true,
            language: "en-US",
          });
          setIsManuallyListening(true);
          setHasPlayedWelcome(true);
        };
      }
    }, 100);

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
      {/* Audio element */}
      <audio ref={audioRef} src={audioSrc} />
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap"
        rel="stylesheet"
      />
      <div
        className="consent-bg"
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          fontFamily: "Outfit, system-ui, sans-serif",
          color: "#e3f2fd",
          letterSpacing: 1,
          position: "fixed",
          zIndex: 1000,
          padding: 0,
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
              <span>Listening...</span>
            </div>
          ) : (
            <div className="mic-off">
              <MicOff className="mic-icon" />
              <span>Mic off</span>
            </div>
          )}
        </div>

        <div
          className="header"
          style={{
            width: "100%",
            textAlign: "center",
            padding: "40px 10px 0 10px",
            boxSizing: "border-box",
            zIndex: 2,
          }}
        >
          <div
            className="consent-heading"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#e3f2fd",
              marginBottom: 8,
              fontFamily: "Outfit, system-ui, sans-serif",
              letterSpacing: 3,
              textShadow: "0 0 24px #00eaff, 0 0 48px #37fb07",
            }}
          >
            Consent Required
          </div>
          <div
            className="consent-subheading"
            style={{
              fontSize: "1.15rem",
              color: "#fff",
              marginBottom: 0,
              fontWeight: "bold",
              fontFamily: "Outfit, system-ui, sans-serif",
              textShadow: "0 0 8px #00eaff44",
            }}
          >
            Do you consent to brain-computer mapping to securely authenticate
            your bank login?
          </div>
        </div>
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <div
            className="dialog-box glass-panel"
            style={{
              background: "rgba(34, 34, 68, 0.7)",
              borderRadius: 32,
              boxShadow: "0 0 32px 8px #00eaff55, 0 0 64px 16px #37fb0755",
              border: "2px solid #00eaff",
              padding: "48px 32px",
              width: "760px", // Increased width here
              maxWidth: "98vw",
              minHeight: "320px",
              color: "#e3f2fd",
              textAlign: "center",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backdropFilter: "blur(10px)",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <ul
              style={{
                fontFamily: "Outfit, system-ui, sans-serif",
                fontSize: "1.15rem",
                fontWeight: "500",
                color: "#fff",
                textAlign: "center",
                lineHeight: "1.7",
                listStyleType: "none",
                listStylePosition: "inside",
                width: "100%",
                margin: "0 0 18px 0",
                padding: 0,
              }}
            >
              <li style={{ marginBottom: 8, position: "relative" }}>
                <span className="neon-dot"></span>
                Your brainwave patterns will be used for secure authentication.
              </li>
              <li style={{ marginBottom: 8, position: "relative" }}>
                <span className="neon-dot"></span>
                Data is processed securely and never shared with third parties.
              </li>
              <li style={{ position: "relative" }}>
                <span className="neon-dot"></span>
                You can withdraw consent at any time.
              </li>
            </ul>
            <div
              style={{
                fontSize: "1.2rem",
                color: "#00eaff",
                marginBottom: 12,
                paddingTop: "38px",
                fontWeight: "bold",
                fontFamily: "Outfit, system-ui, sans-serif",
                textShadow: "0 0 8px #00eaff44",
              }}
            >
              <span role="img" aria-label="audio"></span> Please confirm your
              consent
            </div>
            <div
              className="button-row"
              style={{
                display: "flex",
                gap: 24,
                marginTop: 8,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button className="futuristic-btn success" onClick={onAgree}>
                Agree
              </button>
              <button className="futuristic-btn danger" onClick={onDecline}>
                Decline
              </button>
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: "1rem",
                color: "#b0eaff",
                paddingTop: "10px",
                fontFamily: "Outfit, system-ui, sans-serif",
              }}
            >
              <a
                href="."
                style={{
                  color: "#00eaff",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                View Privacy Policy
              </a>
            </div>
          </div>
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
        .futuristic-btn.danger {
          background: linear-gradient(90deg, #ff1744 0%, #00eaff 100%);
        }
        .futuristic-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 0 32px #00eaff, 0 0 64px #37fb07;
        }
        .neon-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 12px;
          background: linear-gradient(135deg, #00eaff 60%, #37fb07 100%);
          box-shadow: 0 0 8px #00eaff88;
          vertical-align: middle;
          animation: holo-glow 2s infinite alternate;
        }
        @keyframes holo-glow {
          0% { opacity: 0.7; }
          100% { opacity: 1; box-shadow: 0 0 16px #00eaff, 0 0 32px #37fb07; }
        }
        .mic-indicator {
          position: fixed;
          top: 32px;
          right: 40px;
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          border-radius: 999px;
          font-family: 'Orbitron', Inter, Arial, sans-serif;
          font-size: 1.1rem;
          backdrop-filter: blur(8px);
          box-shadow: 0 0 16px #00eaff44;
          border: 2px solid #00eaff55;
          background: rgba(34, 34, 68, 0.7);
          letter-spacing: 2px;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .mic-on {
          color: #00eaff;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: pulseGlow 1.2s infinite alternate;
        }
        .mic-off {
          color: #aaa;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mic-icon {
          width: 24px;
          height: 24px;
          display: inline-block;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 8px #00eaff; }
          100% { box-shadow: 0 0 24px #00eaff; }
        }
        @media (max-width: 900px) {
          .dialog-box {
            width: 98vw !important;
            max-width: 98vw !important;
            min-width: unset !important;
            padding: 18px 4vw !important;
            height: auto !important;
            max-height: 95vh !important;
          }
          .button-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .header {
            padding-top: 16px !important;
          }
          .mic-indicator {
            top: 16px !important;
            right: 10px !important;
            padding: 8px 12px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default ConsentScreen;
