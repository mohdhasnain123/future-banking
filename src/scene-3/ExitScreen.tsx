import { useRef, useEffect, useState } from "react";
import backgroundImage from "./images/scene-3/Group2.png";
import goodByeVideo from "./videos/scene-3/RelationshipManagerVideo6.mp4";

const ExitScreen = () => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Play video on mount
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    // Pause video on unmount
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  // Toggle play/pause on video container click
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Styles for the hologram circle, with conditional glow
  const hologramStyle = {
    width: 250,
    height: 250,
    borderRadius: "50%",
    borderWidth: "2px",
    background: "linear-gradient(135deg, #00eaff66 60%, #37fb0766 100%)",
    boxShadow: isVideoPlaying
      ? "0 0 24px 4px #00eaff99, 0 0 4px 2px #00eaffcc"
      : "0 0 48px #00eaff88, 0 0 96px #00eaff44",
    border: isVideoPlaying ? "2px solid #00eaff" : "1px solid white",
    transition: "box-shadow 0.2s, border 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "holo-glow 2s infinite alternate",
    overflow: "hidden",
    cursor: "pointer",
  };

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
        color: "#ffffffff",
        fontFamily: "Outfit, system-ui, sans-serif",
        letterSpacing: 2,
      }}
    >
      {/* Hologram Video */}
      <div
        style={hologramStyle}
        onClick={handleVideoClick}
        title="Click to pause/play video"
      >
        <video
          ref={videoRef}
          src={goodByeVideo}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "72% center",
            userSelect: "none",
            backgroundColor: "rgba(175, 220, 255, 0.20)",
            pointerEvents: "auto",
          }}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          onEnded={() => setIsVideoPlaying(false)}
          aria-label="Relationship Manager"
        />
      </div>

      <div
        style={{
          fontSize: 32,
          marginBottom: 32,
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <span style={{ marginLeft: 16 }}>Thank you and goodbye, Vick.</span>
      </div>
      <div
        style={{
          fontSize: 22,
          color: "#ffffffff",
        }}
      >
        Session ended.
      </div>
      <style>
        {`
          @keyframes holo-glow-exit {
            from { box-shadow: 0 0 32px 8px #00eaff, 0 0 64px 16px #00eaff44; }
            to { box-shadow: 0 0 64px 24px #37fb07, 0 0 128px 32px #37fb0744; }
          }
        `}
      </style>
    </div>
  );
};

export default ExitScreen;
