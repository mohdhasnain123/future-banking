import React, { useRef, useEffect, useState } from "react";
import backgroundImage from "./images/scene-3/Group2.png";
import checkMark from "./images/scene-3/checkMark.svg";
import weclomeVickMp3 from "./audio/scene-3/welcomeVick.mp3";

const AuthenticationSuccessScreen = () => {
  const audioRef = useRef(null);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showWave, setShowWave] = useState(false);

  // Auto-play audio on mount
  useEffect(() => {
    const audio = new Audio(weclomeVickMp3);
    audioRef.current = audio;
    audio
      .play()
      .then(() => {
        setShowWave(true);
        setAudioPlayed(true);
        setTimeout(() => setShowWave(false), 2000);
      })
      .catch(() => {});

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
          audioRef.current
            .play()
            .then(() => {
              setShowWave(true);
              setTimeout(() => setShowWave(false), 2000);
            })
            .catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
    }
  };

  const authenticationTime = new Date().toLocaleTimeString();

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
        overflow: "hidden",
      }}
    >
      {/* Animated Particles Overlay */}
      <div className="futuristic-particles"></div>

      {/* Upper half clickable area */}
      <div
        onClick={handleScreenClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "50vh",
          cursor: audioPlayed ? "default" : "pointer",
          zIndex: 2,
        }}
      />

      {/* Futuristic Glass Panel */}
      <div
        style={{
          background: "rgba(34, 34, 68, 0.7)",
          borderRadius: "32px",
          boxShadow: "0 0 32px 8px #22C55E55, 0 0 64px 16px #0ea5e955",
          border: "2px solid #22C55E",
          padding: "48px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(8px)",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginBottom: 24,
            textAlign: "center",
            color: "#22C55E",
            textShadow: "0 0 8px #22C55E, 0 0 24px #0ea5e9",
          }}
        >
          <span style={{ marginLeft: 16 }}>
            Successfully Authenticated.
            <br />
            You can proceed further.
          </span>
        </div>
        <div style={{ position: "relative", marginBottom: 24 }}>
          <img
            src={checkMark}
            alt="Success"
            style={{
              width: 180,
              height: 180,
              marginBottom: 8,
              animation: "pop-holo 0.5s",
              filter:
                "drop-shadow(0 0 24px #22C55E) drop-shadow(0 0 48px #0ea5e9)",
            }}
          />
          {/* Sound wave animation */}
          {showWave && (
            <div className="sound-wave">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="wave-bar"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            fontWeight: "700",
            fontSize: 42,
            color: "#fff",
            textShadow: "0 0 16px #22C55E, 0 0 32px #0ea5e9",
          }}
        >
          Welcome Vick
        </div>
        {/* Futuristic Status Panel */}
        <div
          style={{
            marginTop: 32,
            padding: "20px 32px",
            borderRadius: "24px",
            background: "rgba(20, 20, 40, 0.6)",
            boxShadow: "0 0 16px #0ea5e9",
            color: "#e3f2fd",
            fontSize: 18,
            width: "100%",
            maxWidth: 400,
            textAlign: "left",
            border: "1px solid #22C55E",
          }}
        >
          <div>
            <strong>User ID:</strong> VIC-2024-001
          </div>
          <div>
            <strong>Authentication Time:</strong> {authenticationTime}
          </div>
          <div>
            <strong>Next Step:</strong> Access your dashboard or explore new
            features.
          </div>
        </div>
      </div>
      {/* CSS for particles and wave */}
      <style>
        {`
          @keyframes pop-holo {
            0% { transform: scale(0.7); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
          .futuristic-particles {
            position: absolute;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            pointer-events: none;
            z-index: 1;
            background: radial-gradient(circle at 20% 30%, #22C55E22 0%, #0ea5e911 80%, transparent 100%);
            animation: particles-move 8s infinite linear alternate;
          }
          @keyframes particles-move {
            0% { background-position: 0 0; }
            100% { background-position: 100px 80px; }
          }
          .sound-wave {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 4px;
            height: 24px;
            z-index: 10;
          }
          .wave-bar {
            width: 6px;
            height: 100%;
            background: linear-gradient(180deg, #22C55E 0%, #0ea5e9 100%);
            border-radius: 4px;
            animation: waveAnim 1.2s infinite;
          }
          @keyframes waveAnim {
            0%, 100% { height: 12px; opacity: 0.7; }
            50% { height: 24px; opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default AuthenticationSuccessScreen;
