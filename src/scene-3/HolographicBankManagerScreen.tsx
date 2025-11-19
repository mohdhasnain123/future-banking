import { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import welcomeVideo from "./videos/scene-3/RelationshipManagerVideo1.mp4";
import welcomeBackVideo from "./videos/scene-3/RelationshipManagerVideo5.mp4";
import openingKycVideo from "./videos/scene-3/RelationshipManagerVideo4.mp4";
import whatShouldIDoVideo from "./videos/scene-3/RelationshipManagerVideo2.mp4";
import dot1 from "./audio/scene-3/dot1.mp3";
import dot2 from "./audio/scene-3/dot2.mp3";
import { Mic, MicOff, LucideAudioLines } from "lucide-react";

// Conversation steps template
const getConversationSteps = (cameFromKYC) => [
  {
    type: "manager",
    video: cameFromKYC ? welcomeBackVideo : welcomeVideo,
    text: "How can I help you?",
  },
  {
    type: "vick",
    prompt: "Dot, is anything else required other than KYC?",
    keyword: "other",
  },
  {
    type: "dot",
    mp3: dot1,
    text: "hmm.. let me check. Sarah, what are the different things you can help us with?",
  },
  {
    type: "manager",
    video: whatShouldIDoVideo,
    text: "You can update your K.Y.C, check account details, view recent transactions, or contact customer support. What would you like to do?",
  },
  { type: "dot", mp3: dot2, text: "ok.., then only KYC update is required" },
  {
    type: "vick",
    prompt: "Sarah, please go for KYC update",
    keyword: "update",
  },
  {
    type: "manager",
    video: openingKycVideo,
    text: "Sure, preparing for KYC update...",
  },
  { type: "navigate", to: "kyc" },
];

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

const INITIAL_CONVERSATION = [
  { sender: "manager", text: "How can I help you?" },
];

const HolographicBankManagerScreen = ({
  onOptionSelect,
  onExit,
  selectedBank,
  cameFromKYC,
}) => {
  // Conversation step state
  const [step, setStep] = useState(0);
  const [conversation, setConversation] = useState(INITIAL_CONVERSATION);

  // UI states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mp3Paused, setMp3Paused] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const scrollBoxRef = useRef(null);

  // Speech recognition
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  // Conversation steps (dynamic based on cameFromKYC)
  const conversationSteps = getConversationSteps(cameFromKYC);
  const currentStep = conversationSteps[step];
  const [playedStep, setPlayedStep] = useState({ video: null, mp3: null });

  // Scroll to bottom when conversation updates
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  // Play video when manager step
  useEffect(() => {
    if (
      currentStep?.type === "manager" &&
      videoRef.current &&
      playedStep.video !== step
    ) {
      videoRef.current.src = currentStep.video;
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
      setVideoPaused(false);
      setPlayedStep((prev) => ({ ...prev, video: step }));
      SpeechRecognition.stopListening();
      setConversation((prev) => [
        ...prev,
        { sender: "manager", text: currentStep.text },
      ]);
    }
    // Pause video if paused
    if (videoRef.current) {
      if (videoPaused) videoRef.current.pause();
      // Don't call play() here, only on click or step change
    }
    // eslint-disable-next-line
  }, [step, videoPaused, currentStep?.video]);

  // Play mp3 when dot step
  useEffect(() => {
    if (
      currentStep?.type === "dot" &&
      audioRef.current &&
      playedStep.mp3 !== step
    ) {
      audioRef.current.src = currentStep.mp3;
      audioRef.current.play().catch(() => {});
      setIsAudioPlaying(true);
      setMp3Paused(false);
      setPlayedStep((prev) => ({ ...prev, mp3: step }));
      SpeechRecognition.stopListening();
      setConversation((prev) => [
        ...prev,
        { sender: "dot", text: currentStep.text },
      ]);
    }
    // Pause mp3 if paused
    if (audioRef.current) {
      if (mp3Paused) audioRef.current.pause();
      // Don't call play() here, only on click or step change
    }
    // eslint-disable-next-line
  }, [step, mp3Paused, currentStep?.mp3]);

  // Speech recognition ON only for Vick's turn
  useEffect(() => {
    if (currentStep?.type === "vick") {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
      setConversation((prev) => [
        ...prev,
        { sender: "user", text: currentStep.prompt },
      ]);
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
    }
    // eslint-disable-next-line
  }, [step]);

  // Next step on video end
  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    setStep((s) => Math.min(s + 1, conversationSteps.length - 1));
  };

  // Next step on mp3 end
  const handleAudioEnd = () => {
    setIsAudioPlaying(false);
    setStep((s) => Math.min(s + 1, conversationSteps.length - 1));
  };

  // Next step on Vick's keyword
  useEffect(() => {
    if (
      currentStep?.type === "vick" &&
      transcript &&
      currentStep.keyword &&
      transcript.toLowerCase().includes(currentStep.keyword.toLowerCase())
    ) {
      setStep((s) => Math.min(s + 1, conversationSteps.length - 1));
      SpeechRecognition.stopListening();
      resetTranscript();
    }
    // eslint-disable-next-line
  }, [transcript, currentStep]);

  // Handle navigation step
  useEffect(() => {
    if (currentStep?.type === "navigate") {
      if (onOptionSelect) onOptionSelect(currentStep.to);
    }
  }, [currentStep, onOptionSelect]);

  const handleVideoClick = () => {
    // Disable video controls if mp3 is playing
    if (isAudioPlaying) return;
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPaused(false);
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPaused(true);
      setIsVideoPlaying(false);
    }
  };

  const handleMp3Click = () => {
    // Disable mp3 controls if video is playing
    if (isVideoPlaying) return;
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setMp3Paused(false);
      setIsAudioPlaying(true);
    } else {
      audioRef.current.pause();
      setMp3Paused(true);
      setIsAudioPlaying(false);
    }
  };

  // Mic status: ON only for Vick's turn and not playing video/mp3
  const micActive =
    currentStep?.type === "vick" &&
    !isVideoPlaying &&
    !isAudioPlaying &&
    !videoPaused &&
    !mp3Paused;

  useEffect(() => {
    if (listening && transcript) {
      console.log("Speech captured at manager:", transcript);
    }
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div
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
        fontFamily: "Outfit, system-ui, sans-serif",
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
        {/* <div
          style={{
            padding: "10px 22px",
            color: "#ffffffff",
            fontSize: 42,
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          Welcome Vick
        </div> */}
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
            fontFamily: "Outfit, system-ui, sans-serif",
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
          width: 640,
          maxHeight: "calc(100vh - 150px)",
        }}
      >
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
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 80,
          width: "55vw",
          height: "73vh",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: isVideoPlaying
            ? "0 0 24px 4px #00eaff99, 0 0 4px 2px #00eaffcc"
            : undefined,
          border: isVideoPlaying ? "2px solid #00eaff" : undefined,
          transition: "box-shadow 0.2s, border 0.2s",
          zIndex: 2,
          cursor: isAudioPlaying ? "not-allowed" : "pointer", // <-- disables video click when mp3 is playing
        }}
        onClick={handleVideoClick}
        title={
          isAudioPlaying
            ? "Cannot pause/resume video while DOT is speaking"
            : undefined
        }
      >
        <video
          ref={videoRef}
          id="manager-video"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "90% center",
            filter: "drop-shadow(0 0 32px #00eaff88)",
            userSelect: "none",
            border: "1px solid #00eaff",
            borderRadius: "15px",
            backgroundColor: "rgba(175, 220, 255, 0.20)",
            pointerEvents: "auto",
          }}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          onEnded={handleVideoEnd}
          aria-label="Relationship Manager"
          playsInline
          muted={false}
        />
      </div>

      {/* DOT Attendee Box (mp3 play/pause) */}
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 50,
          width: "55vw",
          minWidth: 220,
          height: 80,
          background: "linear-gradient(135deg, #2e2e2e 60%, #00eaff33 100%)",
          border: "2px solid #00eaff",
          borderRadius: 16,
          boxShadow: isAudioPlaying
            ? "0 0 24px 4px #00eaff99, 0 0 4px 2px #00eaffcc"
            : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "18px 24px",
          zIndex: 3,
          cursor: isVideoPlaying
            ? "not-allowed"
            : currentStep?.type === "dot"
            ? "pointer"
            : "default",
        }}
        onClick={
          isVideoPlaying
            ? undefined
            : currentStep?.type === "dot"
            ? handleMp3Click
            : undefined
        }
        title={
          isVideoPlaying
            ? "Cannot pause/resume DOT while video is playing"
            : currentStep?.type === "dot"
            ? mp3Paused
              ? "Resume DOT voice"
              : "Pause DOT voice"
            : undefined
        }
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: isAudioPlaying
              ? "radial-gradient(circle, #00eaff 80%, #0df283 100%)"
              : "radial-gradient(circle, #00eaff 60%, #222 100%)",
            boxShadow: isAudioPlaying
              ? "0 0 32px 8px #00eaffcc, 0 0 16px 4px #0df283cc"
              : "0 0 16px #00eaff88",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#fff",
            fontWeight: "bold",
            transition: "box-shadow 0.2s, background 0.2s",
          }}
        >
          <LucideAudioLines size={30} color="#fff" strokeWidth={2.5} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#00eaff", fontWeight: "bold", fontSize: 18 }}>
            DOT AI Assistant
          </span>
          <span style={{ color: "#0df283cc", fontSize: 12, marginTop: 1 }}>
            Online...
          </span>
        </div>
      </div>

      {/* Audio element for mp3 */}
      <audio ref={audioRef} onEnded={handleAudioEnd} />

      {/* Bank Relationship Manager Header */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 100,
          fontSize: 15,
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
          top: 175,
          left: 100,
          width: 250,
          background: "linear-gradient(135deg, #00eaff33 0%, #37fb0733 100%)",
          border: "2px solid #00eaff",
          borderRadius: 16,
          padding: "10px",
          zIndex: 1002,
          boxShadow: "0 0 32px #00eaff44",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "#00eaff",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Bank ID Card
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 12,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#00eaff" }}>Name:</span>
            <span style={{ fontWeight: "bold" }}>Sarah Anderson</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#00eaff" }}>Account ID:</span>
            <span style={{ fontWeight: "bold" }}>BA-2025-4567</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#00eaff" }}>Account Type:</span>
            <span style={{ fontWeight: "bold" }}>Premium</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#00eaff" }}>Member Since:</span>
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

      {/* Mic status */}
      <div
        className={`
					fixed top-6 right-6 px-6 py-3 rounded-full
					backdrop-blur-md border transition-all duration-300
					${
            micActive
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(0,234,255,0.5)]"
              : "bg-white/10 border-white/20 text-white/60"
          }
				`}
      >
        <div className="flex items-center gap-2 text-sm">
          {micActive ? (
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
    </div>
  );
};

export default HolographicBankManagerScreen;
