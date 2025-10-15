import React, { useEffect, useRef } from "react";
import user from "./images/scene-3/hmn.png"; // Path to the room image
import backgroundImage from "./images/scene-3/Group2.png"; // Path to the background image
import userPosition from "./images/scene-3/greenPosition.png";
import welcomeUserPositionMp3 from "./audio/scene-3/positionDetected.mp3";

const UserPositionDetected = () => {
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
		// playAudio(welcomeUserPositionMp3);
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
			playAudio(welcomeUserPositionMp3);
		}
	};

	return (
		<div
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
			{/* Centered content */}
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<div
					style={{
						fontSize: 32,
						paddingBottom: 20,
						letterSpacing: 1,
						textAlign: "center",
						fontWeight: "bold",
						textShadow: "0 0 12px #00eaff44",
						marginTop: 80 // To avoid overlap with Welcome
					}}
				>
					Please remain on the platform to proceed for Authentication
				</div>

				<div
					style={{
						position: "relative",
						height: 430,
						width: 320
					}}
				>
					{/* Platform for user */}
					<div
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							backgroundImage: `url(${userPosition})`,
							backgroundSize: "contain",
							backgroundPosition: "bottom",
							backgroundRepeat: "no-repeat",
							zIndex: 1,
							filter: "drop-shadow(0 0 24px #00ff0dff) drop-shadow(0 0 8px #00f33dab)", // Glow effect
							pointerEvents: "none",
							userSelect: "none"
						}}
					/>
					{/* User standing on platform */}
					<div
						style={{
							position: "relative",
							width: "100%",
							height: "91%",
							backgroundImage: `url(${user})`,
							backgroundSize: "48%",
							backgroundPosition: "bottom",
							backgroundRepeat: "no-repeat",
							zIndex: 2
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
					Preparing for authentication..
				</div>
			</div>

			<style>
				{`
          @keyframes holo-glow {
            from { box-shadow: 0 0 32px 8px #ff0000ff, 0 0 64px 16px #ff001544; }
            to { box-shadow: 0 0 50px 24px #37fb07ff, 0 0 115px 32px #15ff0044; }
          }
        `}
			</style>
		</div>
	);
};

export default UserPositionDetected;
