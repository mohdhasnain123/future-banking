import React, { useEffect, useRef } from "react";
import goodbyeImage from "./images/scene-3/managerImage.png";
import backgroundImage from "./images/scene-3/Group2.png";
import exitSpeechMp3 from "./audio/scene-3/goodBye.mp3";

const ExitScreen = () => {
	const audioRef = useRef(null);

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

	useEffect(() => {
		playAudio(exitSpeechMp3);
		// Cleanup on unmount
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
				audioRef.current = null;
			}
		};
	}, []);

	// Handle click: play audio if click is in upper half
	const handleScreenClick = (e) => {
		const y = e.clientY;
		const screenHeight = window.innerHeight;
		if (y < screenHeight / 2) {
			playAudio(exitSpeechMp3);
		}
	};

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
				fontFamily: "Poppins",
				letterSpacing: 2
			}}
		>
			{/* Animated SVG or Emoji as Hologram */}
			<div
				style={{
					width: 250,
					height: 250,
					borderRadius: "50%",
					borderWidth: "2px",
					background: "linear-gradient(135deg, #00eaff66 60%, #37fb0766 100%)",
					boxShadow: "0 0 48px #00eaff88, 0 0 96px #00eaff44",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					border: "1px solid white",
					animation: "holo-glow 2s infinite alternate",
					overflow: "hidden" // ensures the image is clipped to the circle
				}}
			>
				<img
					src={goodbyeImage}
					alt="Bank Manager"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover"
					}}
				/>
			</div>

			<div
				style={{
					fontSize: 32,
					marginBottom: 32,
					textAlign: "center",
					marginTop: "40px"
				}}
			>
				<span style={{ marginLeft: 16 }}>Thank you and goodbye, Vick.</span>
			</div>
			<div
				style={{
					fontSize: 22,
					color: "#ffffffff"
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
