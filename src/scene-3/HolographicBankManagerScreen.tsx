import React, { useEffect, useRef, useState, useMemo } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Import your video files - PLACEHOLDER: Replace with actual video paths
// Temporary placeholder strings until videos are uploaded
const welcomeVideo = "";
const welcomeBackVideo = "";
const openingKycVideo = "";
const exitingVideo = "";
const whoAreYouVideo = "";
const noImmediateActionVideo = "";
const whatShouldIDoVideo = "";
const immediateActionVideo = "";

const options = [
  {
    id: "kyc",
    label: "KYC Update",
    icon: <AssignmentIndIcon fontSize="large" />,
  },
  {
    id: "support",
    label: "Customer Support",
    icon: <SupportAgentIcon fontSize="large" />,
  },
];

// Helper: Play video and call onEnd when finished
const playVideo = (videoElement: HTMLVideoElement | null, videoSrc: string, onEnd?: () => void) => {
  if (!videoElement || !videoSrc) {
    if (onEnd) onEnd();
    return;
  }
  videoElement.src = videoSrc;
  videoElement.onended = () => {
    if (onEnd) onEnd();
  };
  videoElement.play().catch(err => console.error("Video play error:", err));
};

const HolographicBankManagerScreen = ({
  onOptionSelect,
  onExit,
  selectedBank,
  cameFromKYC,
}) => {
  const [conversation, setConversation] = useState([
    { sender: "manager", text: "Hi! What can I help you with?" },
  ]);
  const [welcomePlayed, setWelcomePlayed] = useState(false);
  const scrollBoxRef = useRef(null);
  const listeningRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    transcript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const conversationPatterns = useMemo(
    () => [
      {
        pattern: /who are you/i,
        response: selectedBank
          ? `I'm your relationship manager of ${selectedBank.name}, I'm here to help you!`
          : "I'm your relationship manager, I'm here to help you!",
        video: whoAreYouVideo,
      },
      {
        pattern: /what should i do/i,
        response:
          "You can update your K.Y.C, check account details, view recent transactions, or contact customer support. What would you like to do?",
        video: whatShouldIDoVideo,
      },
      {
        pattern: /immediate action/i,
        response: cameFromKYC
          ? "No immediate actions is required as of now."
          : "An immediate action is needed. Please update your K Y C as your biometric has been compromised for unknown reasons",
        video: cameFromKYC ? noImmediateActionVideo : immediateActionVideo,
      },
    ],
    [selectedBank, cameFromKYC]
  );

  // Scroll to bottom when conversation updates
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  // Handle finalTranscript changes (process only when user finishes speaking)
  useEffect(() => {
    if (!finalTranscript || !finalTranscript.trim()) return;

    const userText = finalTranscript.trim().toLowerCase();
    setConversation((prev) => [...prev, { sender: "user", text: userText }]);
    resetTranscript();

    // KYC command
    if (userText.includes("kyc")) {
      setConversation((prev) => [
        ...prev,
        { sender: "manager", text: "Sure, preparing for KYC update..." },
      ]);
      playVideo(videoRef.current, openingKycVideo, () => {
        SpeechRecognition.stopListening();
        listeningRef.current = false;
        if (onOptionSelect) onOptionSelect("kyc");
      });
      return;
    }

    // Exit command
    if (userText.includes("exit")) {
      setConversation((prev) => [
        ...prev,
        { sender: "manager", text: "Exiting..." },
      ]);
      playVideo(videoRef.current, exitingVideo, () => {
        SpeechRecognition.stopListening();
        listeningRef.current = false;
        if (onExit) onExit();
      });
      return;
    }

    // Pattern matching
    for (const patternObj of conversationPatterns) {
      if (patternObj.pattern.test(userText)) {
        const responseText = patternObj.response;
        setConversation((prev) => [
          ...prev,
          { sender: "manager", text: responseText },
        ]);
        playVideo(videoRef.current, patternObj.video, () => {
          if (listeningRef.current) {
            SpeechRecognition.startListening({
              continuous: true,
              language: "en-US",
              interimResults: true,
            });
          }
        });
        return;
      }
    }

    // Unknown command
    setConversation((prev) => [
      ...prev,
      {
        sender: "manager",
        text: "Sorry, I didn't understand. Please try again.",
      },
    ]);
    if (listeningRef.current) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
        interimResults: true,
      });
    }
  }, [
    finalTranscript,
    resetTranscript,
    onOptionSelect,
    onExit,
    conversationPatterns,
  ]);

  // Auto-restart listening if it stops and user hasn't stopped it
  useEffect(() => {
    if (!listening && listeningRef.current) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
        interimResults: true,
      });
    }
  }, [listening]);

  const startListening = () => {
    listeningRef.current = true;
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
      interimResults: true,
    });
  };

  const stopListening = () => {
    listeningRef.current = false;
    SpeechRecognition.stopListening();
  };

  const handleScreenClick = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.closest("button") ||
      e.target.closest(".MuiSvgIcon-root")
    )
      return;

    const y = e.clientY;
    const screenHeight = window.innerHeight;
    if (y < screenHeight / 2) {
      if (!listening) {
        if (!welcomePlayed) {
          setWelcomePlayed(true);
          if (cameFromKYC) {
            playVideo(videoRef.current, welcomeBackVideo, () => startListening());
          } else {
            playVideo(videoRef.current, welcomeVideo, () => startListening());
          }
        } else {
          startListening();
        }
      }
    } else {
      stopListening();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div
      onClick={handleScreenClick}
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#e3f2fd",
        fontFamily: "Poppins",
        letterSpacing: 2,
        position: "relative",
      }}
    >
      {/* Top-left welcome */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "10px 22px",
            color: "#ffffffff",
            fontSize: 42,
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          Welcome, Vick
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          left: "45%",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: 70,
          zIndex: 5,
        }}
      ></div>

      {/* Bank Name */}
      {selectedBank && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "10px 22px",
            zIndex: 10,
          }}
        >
          <span
            style={{ color: "#f3f3f3ff", fontWeight: "bold", fontSize: 20 }}
          >
            {selectedBank.name}
          </span>
        </div>
      )}

      {!cameFromKYC && (
        <div
          style={{
            position: "absolute",
            top: selectedBank ? 43 : 20,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontFamily: "Poppins",
            color: "#ff1744",
            fontWeight: "bold",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            zIndex: 5,
            width: "100vw",
            padding: "10px 20px",
          }}
        >
          <WarningAmberIcon
            style={{ marginRight: 7, color: "#ff1744", fontSize: 29 }}
          />{" "}
          Immediate action needed: Biometric chip seems to be compromised.
          Please update your KYC.
        </div>
      )}

      {/* Right Side Vertical Stack - All 4 Sections */}
      <div
        style={{
          position: "fixed",
          top: 130,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 1001,
          width: 800,
          maxHeight: "calc(100vh - 150px)",
        }}
      >
        {/* KYC Update and Customer Support Buttons */}
        {options.map((opt) => {
          const isKYC = opt.id === "kyc";
          return (
            <button
              key={opt.id}
              onClick={(e) => {
                e.stopPropagation();
                if (onOptionSelect) onOptionSelect(opt.id);
              }}
              style={{
                width: "100%",
                minHeight: 100,
                background:
                  isKYC && !cameFromKYC
                    ? "linear-gradient(135deg, #ff174433 60%, #ff525233 100%)"
                    : "linear-gradient(135deg, #00eaff33 60%, #37fb0733 100%)",
                border:
                  isKYC && !cameFromKYC
                    ? "3px solid #ff1744"
                    : "1px solid #00eaff",
                borderRadius: 16,
                boxShadow:
                  isKYC && !cameFromKYC
                    ? "0 0 2px #ff1744cc"
                    : "0 0 32px #00eaff44",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 18,
                color: isKYC && !cameFromKYC ? "#ff1744" : "#e7e7e7ff",
                fontWeight: "bold",
                transition: "all 0.2s",
              }}
              className={isKYC && !cameFromKYC ? "kyc-glow" : ""}
            >
              <div style={{ marginBottom: 8, color: "inherit" }}>
                {opt.icon}
              </div>
              {opt.label}
            </button>
          );
        })}

        {/* Account Details Section */}
        <div
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #00eaff22 0%, #37fb0722 100%)",
            border: "1px solid #00eaff",
            borderRadius: 16,
            padding: "16px",
            boxShadow: "0 0 24px #00eaff33",
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "#00eaff",
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Account Details
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 13,
              color: "#fff",
            }}
          >
            <div>
              <div style={{ color: "#b0eaff", marginBottom: 6, fontSize: 12 }}>
                Net Worth
              </div>
              <div
                style={{ fontWeight: "bold", fontSize: 22, color: "#00ff26ff" }}
              >
                $184,567.89
              </div>
              <div style={{ fontSize: 11, color: "#b0eaff", marginTop: 2 }}>
                +$1,234.56 (0.7%) in 24h
              </div>
            </div>

            <div
              style={{ height: 1, background: "#00eaff33", margin: "6px 0" }}
            ></div>

            <div>
              <div
                style={{
                  color: "#b0eaff",
                  marginBottom: 8,
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Assets Allocation
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 0",
                  }}
                >
                  <span>Global Equities</span>
                  <span style={{ fontWeight: "bold", fontSize: 14 }}>
                    $85,000
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 0",
                  }}
                >
                  <span>Crypto & NFTs</span>
                  <span style={{ fontWeight: "bold", fontSize: 14 }}>
                    $45,000
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 0",
                  }}
                >
                  <span>Digital Real Estate</span>
                  <span style={{ fontWeight: "bold", fontSize: 14 }}>
                    $54,567
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #00eaff22 0%, #37fb0722 100%)",
            border: "1px solid #00eaff",
            borderRadius: 16,
            padding: "16px",
            boxShadow: "0 0 24px #00eaff33",
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "#00eaff",
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Recent Activity
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 13,
              color: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #00eaff22",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  Cyberdyne Systems
                </div>
                <div style={{ fontSize: 11, color: "#b0eaff", marginTop: 2 }}>
                  Tech Subscription • 2m ago
                </div>
              </div>
              <div
                style={{ color: "#ff1744", fontWeight: "bold", fontSize: 14 }}
              >
                -$49.99
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #00eaff22",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  Orbital Foods
                </div>
                <div style={{ fontSize: 11, color: "#b0eaff", marginTop: 2 }}>
                  Groceries • 1h ago
                </div>
              </div>
              <div
                style={{ color: "#ff1744", fontWeight: "bold", fontSize: 14 }}
              >
                -$150.23
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>
                  Incoming Transfer
                </div>
                <div style={{ fontSize: 11, color: "#b0eaff", marginTop: 2 }}>
                  Project payment • 3h ago
                </div>
              </div>
              <div
                style={{ color: "#00ff26ff", fontWeight: "bold", fontSize: 14 }}
              >
                +$2,500.00
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Video */}
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          bottom: 20,
          left: 80,
          width: "35vw",
          height: "87vh",
          objectFit: "cover",
          zIndex: 1,
          filter: "drop-shadow(0 0 32px #00eaff88)",
          userSelect: "none",
          pointerEvents: "none",
          border: "1px solid #00eaff",
          borderRadius: "15px",
          backgroundColor: "rgba(175, 220, 255, 0.20)",
        }}
        aria-label="Relationship Manager"
        playsInline
        muted={false}
      />

      {/* Bank Relationship Manager Header */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 100,
          fontSize: 24,
          color: "#00eaff",
          fontWeight: "bold",
          textShadow: "0 0 16px #00eaff, 0 0 32px #00eaff44",
          zIndex: 1002,
        }}
      >
        Bank Relationship Manager
      </div>

      {/* Bank ID Card - Inside Manager Image */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 100,
          width: 340,
          background: "linear-gradient(135deg, #00eaff33 0%, #37fb0733 100%)",
          border: "2px solid #00eaff",
          borderRadius: 16,
          padding: "16px",
          zIndex: 1002,
          boxShadow: "0 0 32px #00eaff44",
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "#00eaff",
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Bank ID Card
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 13,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#b0eaff" }}>Name:</span>
            <span style={{ fontWeight: "bold" }}>Rem Anderson</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#b0eaff" }}>Account ID:</span>
            <span style={{ fontWeight: "bold" }}>BA-2025-4567</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#b0eaff" }}>Account Type:</span>
            <span style={{ fontWeight: "bold" }}>Premium</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#b0eaff" }}>Member Since:</span>
            <span style={{ fontWeight: "bold" }}>January 2020</span>
          </div>
          {selectedBank && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#b0eaff" }}>Bank:</span>
              <span style={{ fontWeight: "bold" }}>{selectedBank.name}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onExit}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          display: "flex",
          alignItems: "center",
          background: "#034165ff",
          color: "#f8f8f8ff",
          textShadow: "0 0 16px #00eaff44",
          border: "2px solid red",
          borderRadius: 8,
          padding: "8px 20px",
          fontSize: 16,
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 0 12px #ff174488,0 0 64px #ff174488",
          letterSpacing: 1,
        }}
      >
        ⏻
      </button>

      {/* Listening indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 200,
          fontSize: 12,
          color: listening ? "#00eaff" : "#aaa",
          background: "rgba(0,0,0,0.6)",
          padding: "6px 16px",
          borderRadius: 8,
          zIndex: 1002,
          fontWeight: "bold",
          border: `1px solid ${listening ? "#00eaff" : "#aaa"}`,
        }}
      >
        {listening ? "🎤 Listening" : "🎤 Not Listening"}
      </div>
    </div>
  );
};

export default HolographicBankManagerScreen;
