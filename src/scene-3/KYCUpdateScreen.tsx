
import { useEffect, useState, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import eyeScan from "./images/scene-3/retinaScan.jpeg";
import palmScan from "./images/scene-3/palmScan.jpeg";
import dnaScan from "./images/scene-3/dnaScan.png";
import backgroundImage from "./images/scene-3/Group2.png";
import tickImage from "./images/scene-3/checkMark.svg";
// Import your mp3 audio files
import getReadyRetina from "./audio/scene-3/getReadyForRetina.mp3";
import getReadyPalm from "./audio/scene-3/getReadyForPalm.mp3";
import getReadyDna from "./audio/scene-3/geReadyForDNA.mp3";
import lookAtCamera from "./audio/scene-3/lookAtCamera.mp3";
import placePalm from "./audio/scene-3/placeYourPalm.mp3";
import useSwab from "./audio/scene-3/UseTheSwab.mp3";
import dataCaptured from "./audio/scene-3/proceedWithKYC.mp3";
import canIHelp from "./audio/scene-3/AnythingElse.mp3";
import { Mic, MicOff } from "lucide-react";

// Play mp3 audio utility
const playAudio = (audioFile) => {
  if (!audioFile) return;
  const audio = new window.Audio(audioFile);
  audio.play();
};

const steps = [
  {
    id: "retina",
    title: "Retina Scan",
    instruction: "Look at the camera for retina scan.",
    audio: lookAtCamera,
    getReadyAudio: getReadyRetina,
    visual: (
      <div>
        <img src={eyeScan} alt="Retina Scan" style={{ width: 220, borderRadius: 16, margin: 16 }} />
        <div>Retina Scan</div>
      </div>
    ),
  },
  {
    id: "palm",
    title: "Palm Scan",
    instruction: "Place your palm on the scanner.",
    audio: placePalm,
    getReadyAudio: getReadyPalm,
    visual: (
      <div>
        <img src={palmScan} alt="Palm Scan" style={{ width: 220, borderRadius: 16, margin: 16 }} />
        <div>Palm Scan</div>
      </div>
    ),
  },
  {
    id: "dna",
    title: "DNA Collection",
    instruction: "Please use the swab provided and place it in the DNA scanner.",
    audio: useSwab,
    getReadyAudio: getReadyDna,
    visual: (
      <div>
        <img src={dnaScan} alt="DNA Collection" style={{ width: 220, borderRadius: 16, margin: 16 }} />
        <div>DNA Collection</div>
      </div>
    ),
  },
];

const KYCUpdateScreen = ({ onMainMenu, onExit }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progressing, setProgressing] = useState(false);
  const [preparing, setPreparing] = useState(true); //this is made true to directly go to preparing state
  const [countdown, setCountdown] = useState(4);
  const [, setShowTick] = useState(false);
  const [kycUpdating, setKycUpdating] = useState(false);
  const [kycUpdateTick, setKycUpdateTick] = useState(false);
  const [kycUpdated, setKycUpdated] = useState(false);
  const [started, setStarted] = useState(true); //this is made true to directly go to starting state
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const kycTimerRef = useRef(null);
  const tickTimerRef = useRef(null);

  // react-speech-recognition
  const { listening, transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Start process handler
  const handleStart = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    setStarted(true);
    setPreparing(true);
    setStepIndex(0);
    setCountdown(4);
    resetTranscript();
    // playAudio(steps[0].getReadyAudio);
  };

  // Prepare phase
  useEffect(() => {
    if (!started) return;
    if (stepIndex < steps.length && preparing) {
      setCountdown(4);
      playAudio(steps[stepIndex].getReadyAudio); // Play "Get ready for..." mp3
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownRef.current);
            setPreparing(false);
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownRef.current);
    }
  }, [stepIndex, preparing, started]);

  // Progress phase
  useEffect(() => {
    if (!started) return;
    if (stepIndex < steps.length && !preparing) {
      const audioTimeout = setTimeout(() => {
        playAudio(steps[stepIndex].audio); // Play instruction mp3
      }, 300); // small delay
      setProgressing(true);
      timerRef.current = setTimeout(() => {
        setProgressing(false);
        setStepIndex((prev) => prev + 1);
        setPreparing(true);
      }, 7000); // 7 seconds
      return () => {
        clearTimeout(timerRef.current);
        clearTimeout(audioTimeout);
      };
    }
    if (stepIndex === steps.length) {
      setProgressing(false);
    }
  }, [stepIndex, preparing, started]);

  // Confirmation step: listen for voice commands
  useEffect(() => {
    if (!started) return;
    if (
      stepIndex === steps.length &&
      !kycUpdating &&
      !kycUpdateTick &&
      !kycUpdated
    ) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else if (!kycUpdated) {
      SpeechRecognition.stopListening();
    }
  }, [stepIndex, kycUpdating, kycUpdateTick, kycUpdated, started]);

  // Start listening on final screen (Main Menu/Exit)
  useEffect(() => {
    if (kycUpdated) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [kycUpdated]);

  // Handle transcript for confirmation and final screen
  useEffect(() => {
    // Confirmation step
    if (
      stepIndex === steps.length &&
      !kycUpdating &&
      !kycUpdateTick &&
      !kycUpdated
    ) {
      const lower = transcript.trim().toLowerCase();
      if (
        lower.includes("yes") ||
        lower.includes("proceed") ||
        lower.includes("ok")
      ) {
        handleConfirm();
        resetTranscript();
      } else if (
        lower.includes("no") ||
        lower.includes("reinitiate") ||
        lower.includes("restart")
      ) {
        handleChange();
        resetTranscript();
      }
    }
    // Final screen: handle exit/main menu
    if (kycUpdated) {
      const lower = transcript.trim().toLowerCase();
      if (lower.includes("exit")) {
        if (typeof onExit === "function") onExit();
        resetTranscript();
      } else if (lower.includes("main menu") || lower.includes("menu")) {
        if (typeof onMainMenu === "function") onMainMenu();
        resetTranscript();
      }
    }
    // eslint-disable-next-line
  }, [transcript, kycUpdated]);

  const handleConfirm = () => {
    setShowTick(true);
    setKycUpdating(true);
    // SpeechRecognition.stopListening(); // <-- REMOVE THIS LINE
    // Start KYC update progress bar (3 seconds)
    kycTimerRef.current = setTimeout(() => {
      setKycUpdating(false);
      setKycUpdateTick(true);
      // Show tick after progress bar
      // After 1s, hide tick and show confirmation question
      tickTimerRef.current = setTimeout(() => {
        setKycUpdateTick(false);
        setKycUpdated(true);
        playAudio(canIHelp); // Play "Can I help you with anything else?"
      }, 1000);
    }, 3000);
    // Hide tick after 2 seconds (optional, for button tick)
    setTimeout(() => setShowTick(false), 2000);
  };

  const handleChange = () => {
    setStepIndex(0); // Restart from the beginning
    setPreparing(true);
    setCountdown(4);
    setShowTick(false);
    setKycUpdating(false);
    setKycUpdated(false);
    setKycUpdateTick(false);
    setStarted(true);
    resetTranscript();
    // SpeechRecognition.stopListening(); // <-- REMOVE THIS LINE
  };

  // Play "Data Captured! Should I proceed with KYC Update?" mp3
  useEffect(() => {
    if (
      stepIndex === steps.length &&
      !kycUpdating &&
      !kycUpdateTick &&
      !kycUpdated &&
      started
    ) {
      playAudio(dataCaptured);
    }
  }, [stepIndex, kycUpdating, kycUpdateTick, kycUpdated, started]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(countdownRef.current);
      clearTimeout(kycTimerRef.current);
      clearTimeout(tickTimerRef.current);
      SpeechRecognition.stopListening();
    };
  }, []);

  // --- NEW: Click handler for listening toggle ---
  const handleScreenClick = (e) => {
    // Only allow toggling during confirmation step or final screen
    if (
      !(
        (started && stepIndex === steps.length && !kycUpdating && !kycUpdateTick && !kycUpdated) ||
        kycUpdated
      )
    ) {
      return;
    }
    const y = e.clientY;
    const screenHeight = window.innerHeight;
    if (y < screenHeight / 2) {
      if (!listening) {
        SpeechRecognition.startListening({ continuous: true, language: "en-US" });
      }
    } else {
      if (listening && !kycUpdated) { // Don't stop listening on final screen
        SpeechRecognition.stopListening();
      }
    }
  };
  // ------------------------------------------------

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
        color: "#ffffffff",
        fontFamily: "Outfit, system-ui, sans-serif",
        letterSpacing: 2,
        position: "relative",
      }}
    >
      {/* Start Button */}
      {/* {!started && (
        <button
          onClick={handleStart}
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15, 205, 219, 0.15)",
            color: "#fff",

            border: "1px solid #00eaffbf",
            borderRadius: 18,
            padding: "14px 38px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 10px #00eaffbf",
          }}
        >
          Start KYC
        </button>
      )} */}

      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          marginBottom: 106,
          color: "#ffffffff",
        }}
      >
        KYC Portal
      </div>
      {/* Step visuals and instructions */}
      {started &&
        stepIndex < steps.length &&
        !kycUpdating &&
        !kycUpdateTick &&
        !kycUpdated && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            {steps[stepIndex].visual}
            {/* Prepare phase */}
            {preparing ? (
              <div
                style={{
                  fontSize: 22,
                  margin: "24px 0 10px 0",
                  color: "#ffeb3b",
                  textShadow: "0 0 8px #ffeb3b",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Prepare for {steps[stepIndex].title} <br />
                <span style={{ fontSize: 36, color: "#fff" }}>{countdown}</span>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 24,
                    margin: "24px 0 10px 0",
                    color: "#b0eaff",
                    textShadow: "none",
                  }}
                >
                  {steps[stepIndex].instruction}
                </div>
                {progressing && (
                  <div style={{ margin: "18px 0" }}>
                    {/* Futuristic Progress Animation with 7s progress bar */}
                    <div className="futuristic-spinner">
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                      <div className="spinner-dot"></div>
                    </div>
                    <div
                      style={{
                        color: "#00eaff",
                        marginTop: 8,
                        fontSize: 16,
                        letterSpacing: 1,
                      }}
                    >
                      Recognizing...
                    </div>
                    <div style={{ marginTop: 16, width: 120 }}>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fg" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

      {/* Confirmation step */}
      {started &&
        stepIndex === steps.length &&
        !kycUpdating &&
        !kycUpdateTick &&
        !kycUpdated && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "rgba(175, 220, 255, 0.20)",
                borderRadius: 24,
                border: "1px solid #00eaff",
                padding: "48px 44px 60px 44px",
                minWidth: 420,
                maxWidth: 400,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 200,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  color: "#ffffffff",
                  marginBottom: 18,
                  textAlign: "center",
                }}
              >
                Data Captured! Should I proceed with KYC update?
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                <button
                  onClick={handleConfirm}
                  style={{
                    background: "#06c222ff",
                    color: "#ffffffff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 24px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: 8,
                    minWidth: 170,
                  }}
                >
                  Proceed
                </button>
                <button
                  onClick={handleChange}
                  style={{
                    background: "#0342b7ff",
                    color: "#ffffffff",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 24px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: 8,
                    minWidth: 100,
                  }}
                >
                  Re-initiate KYC
                </button>
              </div>
            </div>
          </div>
        )}
      {/* KYC Updating Progress Bar */}
      {kycUpdating && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#00eaff",
              marginBottom: 24,
              textShadow: "0 0 8px #00eaff",
            }}
          >
            Updating KYC Data...
          </div>
          <div style={{ width: 220 }}>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fg kyc-update-bar"
                style={{
                  animation: "progress-bar-anim-kyc 3s linear forwards",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Green glowing tick after KYC update */}
      {kycUpdateTick && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <img
              src={tickImage}
              alt="KYC Updated"
              style={{
                width: 200,
                height: 200,
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#37fb07",
            }}
          >
            KYC Updated Successfully!
          </div>
        </div>
      )}

      {/* Final screen: Can I help you with anything else? */}
      {kycUpdated && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          <div
            style={{
              background: "rgba(175, 220, 255, 0.20)",
              borderRadius: 24,
              border: "1px solid #00eaff",
              padding: "48px 44px 60px 44px",
              minWidth: 420,
              maxWidth: 430,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 200,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#ffffffff",
                marginBottom: 28,
              }}
            >
              Can I help you with anything else?
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: "30px" }}>
              <button
                onClick={onMainMenu}
                style={{
                  background: "#0250e1ff",
                  color: "#ffffffff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: 8,
                  minWidth: 80,
                }}
              >
                Main Menu
              </button>
              <button
                onClick={onExit}
                style={{
                  background: "#ff1744",
                  color: "#ffffffff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginBottom: 8,
                  minWidth: 130,
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

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

      <style>
        {`
                .futuristic-spinner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                }
                .spinner-dot {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #00eaff 60%, #37fb07 100%);
                    box-shadow: 0 0 16px #00eaff88;
                    animation: spinner-bounce 1.2s infinite alternate;
                }
                .spinner-dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .spinner-dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes spinner-bounce {
                    0% { transform: translateY(0); opacity: 0.7; }
                    100% { transform: translateY(-18px); opacity: 1; }
                }
                .progress-bar-bg {
                    width: 100%;
                    height: 8px;
                    background: #1a2a44;
                    border-radius: 6px;
                    overflow: hidden;
                    box-shadow: 0 0 8px #00eaff44;
                }
                .progress-bar-fg {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, #00eaff 60%, #37fb07 100%);
                    animation: progress-bar-anim 7s linear forwards;
                }
                .kyc-update-bar {
                    animation: progress-bar-anim-kyc 3s linear forwards;
                }
                @keyframes progress-bar-anim {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @keyframes progress-bar-anim-kyc {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .tick-anim {
                    stroke-dasharray: 36;
                    stroke-dashoffset: 36;
                    animation: tick-draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }
                @keyframes tick-draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .tick-pop {
                    animation: tick-pop-anim 0.7s cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
                    transform: scale(0.2);
                    opacity: 0;
                }
                @keyframes tick-pop-anim {
                    0% {
                        transform: scale(0.2);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                    80% {
                        transform: scale(0.95);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                `}
      </style>
    </div>
  );
};

export default KYCUpdateScreen;
