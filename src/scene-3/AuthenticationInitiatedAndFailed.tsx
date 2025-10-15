import React, { useEffect, useState, useRef } from "react";
import user from "./images/scene-3/Frame1.png";
import backgroundImage from "./images/scene-3/Group2.png";
import userGreenPosition from "./images/scene-3/greenPosition.png";
import userRedPosition from "./images/scene-3/redPosition.png";

const speak = (text) => {
	if ("speechSynthesis" in window) {
		window.speechSynthesis.cancel();
		const utter = new window.SpeechSynthesisUtterance(text);
		utter.lang = "en-US";
		window.speechSynthesis.speak(utter);
	}
};

const AuthenticationInitiationScreen = () => {
	const [scanning, setScanning] = useState(true);
	const [failed, setFailed] = useState(false);
	const hasSpoken = useRef(false);

	useEffect(() => {
		if (!hasSpoken.current) {
			speak("Initiating Biometric Authentication, please remain in your position");
		}
		hasSpoken.current = true;
		const timer = setTimeout(() => {
			setScanning(false);
			setFailed(true);
			speak("Authentication Failed, We will proceed with BCI Authentication");
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

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
				fontFamily: "Orbitron, Arial, sans-serif",
				letterSpacing: 2,
				textShadow: "0 0 8px #00eaff, 0 0 16px #00eaff"
			}}
		>
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center", // Always center
					gap: failed ? 22 : 0, // Add a small gap when failed
					minHeight: 600
				}}
			>
				{scanning && (
					<div
						style={{
							fontSize: 32,
							paddingBottom: scanning ? 20 : 60,
							letterSpacing: 1,
							textAlign: "center",
							fontWeight: "bold",
							textShadow: "0 0 12px #01282cf3",
							marginTop: scanning ? 80 : 120,
							zIndex: 3,
							transition: "margin 1.2s, padding 1.2s"
						}}
					>
						Proceeding with Biometric Authentication
					</div>
				)}

				{/* User and Platform Container */}
				<div
					style={{
						position: "relative",
						height: 430,
						width: 320,
						transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
						transform: scanning ? "scale(1)" : "scale(1.3)"
					}}
				>
					{/* Scanning Beam Animation (only during scanning) */}
					{scanning && (
						<div
							style={{
								position: "relative",
								left: "20%",
								width: "60%",
								height: "4px",
								background:
									"linear-gradient(to right,rgba(255, 255, 255, 0) 0%,rgba(0, 252, 240, 1) 50%,rgba(255, 255, 255, 0) 100%)",
								animation: "scan-beam 2s linear infinite, beam-glow 1.2s ease-in-out infinite",
								filter: "blur(1px)",
								zIndex: 3
							}}
						/>
					)}
					{/* Platform for user */}
					<div
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							backgroundImage: scanning ? `url(${userGreenPosition})` : `url(${userRedPosition})`,
							backgroundSize: "contain",
							backgroundPosition: "bottom",
							backgroundRepeat: "no-repeat",
							bottom: scanning ? 0 : 50, // fixed: use 0 instead of "none"
							zIndex: 1,
							filter: scanning
								? "none"
								: "drop-shadow(0 0 24px #ae0000ff) drop-shadow(0 0 8px #ff00009d)",
							pointerEvents: "none",
							userSelect: "none",
							transition: "bottom 1.2s, filter 1.2s"
						}}
					/>
					{/* User standing on platform */}
					<div
						style={{
							position: "relative",
							width: "100%",

							height: scanning ? "92%" : "93%",
							bottom: scanning ? 0 : 50, // fixed: use 0 instead of "none"
							backgroundImage: `url(${user})`,
							backgroundSize: "90%",
							backgroundPosition: "bottom",
							backgroundRepeat: "no-repeat",
							zIndex: 2,
							transition: "bottom 1.2s"
						}}
					/>
				</div>

				{scanning && (
					<div
						style={{
							fontSize: 22,
							marginTop: 24,
							color: "#00eaff",
							textShadow: "0 0 8px #00eaff"
						}}
					>
						Please hold still for Biometric Authentication
					</div>
				)}

				{failed && (
					<div
						role="alert"
						style={{
							borderRadius: 14,
							background: "rgba(30,0,20,0.85)",
							boxShadow: "0 0 12px #ff1744, 0 0 24px #ff174488",
							border: "2px solid #ff1744",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "40%",
							height: "20%"
						}}
					>
						<div
							style={{
								padding: "18px",
								fontSize: 22,
								color: "#ff1744",
								fontWeight: "bold",
								textShadow: "0 0 12px #ff1744, 0 0 24px #ff174488",
								marginBottom: 12,
								textAlign: "center"
							}}
						>
							<span
								role="img"
								aria-label="cross"
								style={{ fontSize: 28, verticalAlign: "middle", marginRight: 8 }}
							>
								❌
							</span>
							Biometric chip authentication failed!
						</div>
						<div
							style={{
								fontSize: 18,
								color: "#ff5252",
								marginBottom: 18,
								textAlign: "center"
							}}
						>
							We couldn't authenticate you using the biometric chip.
							<br />
							Switching to <b>"BCI Authentication"</b>.
						</div>
					</div>
				)}
			</div>

			<style>
				{`
          @keyframes scan-beam {
            0% { top: 20px; }
            50% { top: 375px; }
            100% { top:20px; }
          }
        `}
			</style>
		</div>
	);
};

export default AuthenticationInitiationScreen;
