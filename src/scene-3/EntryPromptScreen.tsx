import React, { useEffect, useRef } from "react";
import backgroundImage from "./images/scene-3/Group2.png";
import userPosition from "./images/scene-3/Group1.png";
import entryPromptMp3 from "./audio/scene-3/entryPrompt.mp3";

const EntryPromptScreen = () => {
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
		// playAudio(entryPromptMp3);
		// Cleanup on unmount
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
			playAudio(entryPromptMp3);
		}
	};

	return (
		<div
			role="main"
			onClick={handleScreenClick}
			style={{
				height: "100vh",
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				position: "relative",
				color: "#e3f2fd",
				fontFamily: "Poppins",
				letterSpacing: 2,
				textShadow: "0 0 8px #00eaff, 0 0 16px #00eaff"
			}}
		>
			{/* Welcome at the very top */}
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
					textShadow: "0 0 3px #00eaff, 0 0 2px #00eaff44",
					zIndex: 2,
					margin: 0,
					letterSpacing: 2
				}}
			>
				Welcome
			</h1>

			{/* Centered content */}
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					paddingTop: 100 // Ensures content doesn't overlap with Welcome
				}}
			>
				<div
					style={{
						fontSize: 28,
						paddingBottom: 20,
						letterSpacing: 1,
						textAlign: "center",
						fontWeight: "bold",
						textShadow: "0 0 12px #00eaff44"
					}}
				>
					Experience the power of Omni-Channel Banking.
					<br />
					Please walk to the highlighted platform to proceed further.
				</div>

				<div
					style={{
						position: "relative",
						height: 360,
						width: 320,
						maxWidth: "90vw"
					}}
				>
					{/* Platform for user */}
					<img
						src={userPosition}
						alt="Platform"
						style={{
							position: "absolute",
							left: 0,
							bottom: 0,
							width: "100%",
							height: "auto",
							zIndex: 1,
							filter: "drop-shadow(0 0 24px #00eaff) drop-shadow(0 0 8px #00eaff)",
							pointerEvents: "none",
							userSelect: "none",
							animation: "holo-glow 1.5s alternate infinite"
						}}
					/>
				</div>

				<div
					style={{
						fontSize: 22,
						marginTop: 24,
						color: "#00eaff",
						textShadow: "0 0 8px #00eaff"
					}}
				>
					Awaiting user position
				</div>
			</div>

			<style>
				{`
          @keyframes holo-glow {
            from { filter: drop-shadow(0 0 24px #00eaff) drop-shadow(0 0 8px #00eaff); }
            to { filter: drop-shadow(0 0 48px #00eaff) drop-shadow(0 0 24px #00eaff); }
          }
        `}
			</style>
		</div>
	);
};

export default EntryPromptScreen;
