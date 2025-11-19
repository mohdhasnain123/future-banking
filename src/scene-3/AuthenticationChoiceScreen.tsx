import React, { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import authChoiceMp3 from "../audio/scene-3/authChoice.mp3";
import authChoiceSelectedMp3 from "../audio/scene-3/authChoiceSelected.mp3";

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
        }, 250); // Shorter delay, since audio.onended will be called after audio finishes
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

  // Handle upper/lower half click
  const handleScreenClick = (e) => {
    const y = e.clientY;
    const windowHeight = window.innerHeight;
    if (y < windowHeight / 2) {
      // Upper half: Play welcome and start listening
      if (!hasPlayedWelcome) {
        playAudio(authChoiceMp3, () => {
          SpeechRecognition.startListening({
            continuous: true,
            language: "en-US",
          });
          setIsManuallyListening(true);
        });
        setHasPlayedWelcome(true);
      } else if (!listening) {
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
        setIsManuallyListening(true);
      }
    } else {
      // Lower half: Stop listening
      SpeechRecognition.stopListening();
      setIsManuallyListening(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#e3f2fd",
        fontFamily: "Outfit, system-ui, sans-serif",
        letterSpacing: 2,
      }}
      onClick={handleScreenClick}
    >
      <h1
        style={{
          position: "absolute",
          top: 32,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 50,
          fontWeight: 700,
          color: "#ffffffff",
          zIndex: 2,
          margin: 0,
          letterSpacing: 2,
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
        }}
      >
        {/* BOX START */}
        <div
          style={{
            background: "rgba(175, 220, 255, 0.20)",
            borderRadius: 24,
            border: "1px solid #00eaff88",
            boxShadow: "0 8px 40px #00eaff33, 0 1.5px 8px #000a",
            padding: "48px 44px 60px 44px",
            minWidth: 420,
            maxWidth: 460,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: 220,
            position: "relative",
          }}
        >
          {/* Instruction */}
          <div
            style={{
              fontSize: 18,
              letterSpacing: 1,
              textAlign: "center",
              fontWeight: "bold",
              textShadow: "0 0 12px #00eaff44",
              marginBottom: 48,
            }}
          >
            Please select your preferred authentication method
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* Buttons */}
          <div style={{ display: "flex", gap: 40, marginBottom: 0 }}>
            {/* BCI Authentication Button */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                onClick={onBCISelect}
                style={{
                  width: 200,
                  height: 60,
                  background: "linear-gradient(90deg, #06c222ff 0%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  outline: "none",
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
              }}
            >
              <button
                disabled
                style={{
                  width: 200,
                  height: 60,
                  background: " #888 ",
                  color: "#ccc",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: "bold",
                  cursor: "not-allowed",
                  opacity: 0.6,
                  boxShadow: "0 0 8px #88888844",
                  outline: "none",
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
                }}
              >
                Currently unavailable
              </span>
            </div>
          </div>
        </div>
        {/* BOX END */}
      </div>
      {/* Listening indicator */}
      <div
        style={{
          position: "fixed",
          left: 10,
          bottom: 20,
          color: listening ? "#00eaff" : "#aaa",
          background: "rgba(0,0,0,0.5)",
          padding: "8px 18px",
          borderRadius: 16,
          fontSize: 10,
          fontFamily: "Outfit, system-ui, sans-serif",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        {listening ? "Listening" : "Not listening"}
      </div>
    </div>
  );
};

export default AuthenticationChoiceScreen;
