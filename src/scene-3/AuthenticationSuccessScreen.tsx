import React, { useRef, useEffect, useState } from "react";
import backgroundImage from "./images/scene-3/Group2.png";
import checkMark from "./images/scene-3/checkMark.svg";
import weclomeVickMp3 from "./audio/scene-3/welcomeVick.mp3";

const AuthenticationSuccessScreen = () => {
	const audioRef = useRef(null);
	const [audioPlayed, setAudioPlayed] = useState(false);

	const playAudio = (audioFile) => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			audioRef.current = null;
		}
		const audio = new window.Audio(audioFile);
		audioRef.current = audio;
		audio.play().catch(() => {});
	};

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
				audioRef.current = null;
			}
		};
	}, []);

	const handleScreenClick = (e) => {
		const y = e.clientY;
		const screenHeight = window.innerHeight;
		if (y < screenHeight / 2) {
			playAudio(weclomeVickMp3);
		}
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
				color: "#e3f2fd",
				fontFamily: "Poppins",
				letterSpacing: 2
			}}
		>
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
					zIndex: 2
				}}
			>
				{/* This div is transparent and overlays the upper half */}
			</div>
			<div
				style={{
					fontSize: 32,
					marginBottom: 32,
					textAlign: "center",
					color: "#22C55E"
				}}
			>
				<span style={{ marginLeft: 16 }}>Successfully Authenticated. You can proceed further.</span>
			</div>
			<img
				src={checkMark}
				alt="Success"
				style={{
					width: 350,
					height: 350,
					marginBottom: 32,
					animation: "pop-holo 0.5s"
				}}
			/>
			<div
				style={{
					fontWeight: "700",
					fontSize: 42,
					color: "#ffffffff"
				}}
			>
				Welcome Vick
			</div>
			<style>
				{`
        @keyframes pop-holo {
          0% { transform: scale(0.7); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}
			</style>
		</div>
	);
};

export default AuthenticationSuccessScreen;
