import React, { useEffect, useState, useRef } from "react";
import user from "./images/scene-3/Frame1.png";
import backgroundImage from "./images/scene-3/Group2.png";
import userGreenPosition from "./images/scene-3/greenPosition.png";
import userRedPosition from "./images/scene-3/redPosition.png";
import { Mic, MicOff } from "lucide-react";

const speak = (text) => {
	if ("speechSynthesis" in window) {
		window.speechSynthesis.cancel();
		const utter = new window.SpeechSynthesisUtterance(text);
		utter.lang = "en-US";
		window.speechSynthesis.speak(utter);
	}
};

const AuthenticationInitiationScreen = ({ listening = false }) => {
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
		<>
			{/* Fonts */}
			<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
			<div
				role="main"
				className="relative h-screen w-full overflow-hidden"
				style={{
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					fontFamily: "Outfit, system-ui, sans-serif",
					color: "#e3f2fd"
				}}
			>
				{/* Particle overlay */}
				<div className="particle-overlay"></div>

				{/* MIC indicator top right */}
				<div className="mic-indicator">
					{listening ? (
						<div className="mic-on">
							<Mic className="mic-icon" />
							<span>Listening...</span>
						</div>
					) : (
						<div className="mic-off">
							<MicOff className="mic-icon" />
							<span>Mic off</span>
						</div>
					)}
				</div>

				{/* Animated background overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-[#1a2236]/60 via-[#1a2236]/40 to-[#1a2236]/80 pointer-events-none" />

				{/* Scanline effect */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					<div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scanline" />
				</div>

				{/* Grid overlay */}
				<div 
					className="absolute inset-0 pointer-events-none opacity-10"
					style={{
						backgroundImage: `
							linear-gradient(rgba(0,234,255,0.3) 1px, transparent 1px),
							linear-gradient(90deg, rgba(0,234,255,0.3) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px'
					}}
				/>

				{/* Welcome at the very top */}
				<h1 className="absolute top-8 left-0 w-full text-center text-5xl font-bold z-10 m-0 tracking-wider animate-quantum-glow"
					style={{
						fontFamily: "Outfit, system-ui, sans-serif",
						color: "#00eaff",
						textShadow: "0 0 24px #00eaff, 0 0 48px #37fb07",
						letterSpacing: "4px"
					}}
				>
					Authentication
				</h1>

				{/* Centered content */}
				<div className="h-full flex flex-col items-center justify-center pt-24 relative z-10">
					{/* Holographic card container */}
					<div className="relative mb-8 px-8 py-6 rounded-2xl glass-panel"
						style={{
							fontFamily: "Outfit, system-ui, sans-serif",
							width: "480px",
							maxWidth: "98vw",
							border: "2px solid #00eaff55",
							boxShadow: "0 0 32px 8px #00eaff55, 0 0 64px 16px #37fb0755",
							background: "rgba(34, 34, 68, 0.7)",
							backdropFilter: "blur(10px)"
						}}
					>
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-green-400/10 pointer-events-none" />
						<div className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none"
							style={{
								background: 'linear-gradient(90deg, transparent, #00eaff1a, transparent)',
								backgroundSize: '200% 100%'
							}}
						/>
						<div className="relative text-2xl text-center font-bold tracking-wide"
							style={{
								fontFamily: "Outfit, system-ui, sans-serif"
							}}
						>
							{scanning ? (
								<span className="text-primary animate-quantum-pulse" style={{ color: "#00eaff" }}>
									Proceeding with Biometric Authentication
								</span>
							) : (
								<span className="text-red-500 animate-quantum-pulse" style={{ color: "#ff1744" }}>
									Biometric chip authentication failed!
								</span>
							)}
							<br />
							{scanning ? (
								<span className="text-foreground/90 text-xl mt-2 inline-block" style={{ color: "#e3f2fd" }}>
									Please hold still for Biometric Authentication
								</span>
							) : (
								<span className="text-red-400 text-xl mt-2 inline-block" style={{ color: "#ff7f7f" }}>
									We couldn't authenticate you using the biometric chip.<br />
									Switching to <b style={{ color: "#00eaff" }}>"BCI Authentication"</b>.
								</span>
							)}
						</div>
					</div>

					{/* Platform container */}
					<div className="relative h-[430px] w-[320px] max-w-[90vw]">
						{/* Glow rings */}
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<div className={`absolute w-[280px] h-[280px] rounded-full border-2 ${scanning ? "border-cyan-400/40" : "border-red-500/40"} animate-quantum-pulse`}
								style={{ animationDuration: '3s' }}
							/>
							<div className={`absolute w-[240px] h-[240px] rounded-full border-2 ${scanning ? "border-green-400/30" : "border-red-500/30"} animate-quantum-pulse`}
								style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
							/>
						</div>

						{/* Scanning Beam Animation (only during scanning) */}
						{scanning && (
							<div
								className="absolute left-[20%] w-[60%] h-1 z-30 pointer-events-none"
								style={{
									background:
										"linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(0,252,240,1) 50%,rgba(255,255,255,0) 100%)",
									animation: "scan-beam 2s linear infinite, beam-glow 1.2s ease-in-out infinite",
									filter: "blur(1px)",
									top: "20px"
								}}
							/>
						)}

						{/* Platform for user */}
						<img
							src={scanning ? userGreenPosition : userRedPosition}
							alt="Platform"
							className={`absolute left-0 bottom-0 w-full h-auto z-10 pointer-events-none select-none animate-quantum-glow`}
							style={{
								filter: scanning
									? 'drop-shadow(0 0 24px #00ff0dff) drop-shadow(0 0 8px #00f33dab)'
									: 'drop-shadow(0 0 24px #ae0000ff) drop-shadow(0 0 8px #ff00009d)'
							}}
						/>

						{/* User standing on platform */}
						<img
							src={user}
							alt="User"
							className="absolute left-1/2 bottom-0 z-20 pointer-events-none select-none"
							style={{
								transform: "translateX(-50%)",
								width: scanning ? "48%" : "50%",
								height: scanning ? "92%" : "93%",
								objectFit: "contain"
							}}
						/>

						{/* Holographic projection lines */}
						<div className="absolute inset-0 pointer-events-none">
							{[...Array(8)].map((_, i) => (
								<div
									key={i}
									className={`absolute bottom-0 left-1/2 w-px h-full origin-bottom ${scanning ? "bg-gradient-to-t from-cyan-400/50 to-transparent" : "bg-gradient-to-t from-red-500/50 to-transparent"}`}
									style={{
										transform: `rotate(${i * 45}deg)`,
										animation: 'quantum-pulse 3s ease-in-out infinite',
										animationDelay: `${i * 0.2}s`
									}}
								/>
							))}
						</div>
					</div>

					{/* Status indicator */}
					<div className="mt-8 relative">
						<div className={`absolute inset-0 blur-xl ${scanning ? "bg-cyan-400/30" : "bg-red-500/30"} rounded-full`} />
						<div className={`relative flex items-center gap-3 px-6 py-3 rounded-full border ${scanning ? "border-cyan-400/50 bg-white/10" : "border-red-500/50 bg-red-950/50"} backdrop-blur-sm`}>
							<div className={`w-2 h-2 rounded-full ${scanning ? "bg-cyan-400" : "bg-red-500"} animate-quantum-pulse`} />
							<span className={`text-xl font-semibold tracking-wider ${scanning ? "text-cyan-400" : "text-red-500"}`}>
								{scanning ? "Scanning for biometric authentication..." : "Authentication failed, switching to BCI"}
							</span>
						</div>
					</div>

					{/* Failure Alert (extra prominent card) */}
					{failed && (
						<div
							role="alert"
							className="mt-8 px-8 py-6 rounded-2xl backdrop-blur-md bg-red-950/80 border border-red-500 shadow-[0_0_30px_hsl(var(--primary)/0.3)] flex flex-col items-center w-[340px] max-w-[90vw]"
							style={{
								fontFamily: "Outfit, system-ui, sans-serif"
							}}
						>
							<div className="text-2xl font-bold text-red-500 mb-2 text-center">
								<span role="img" aria-label="cross" className="text-3xl mr-2 align-middle">❌</span>
								Biometric chip authentication failed!
							</div>
							<div className="text-red-400 text-lg text-center">
								We couldn't authenticate you using the biometric chip.<br />
								Switching to <b style={{ color: "#00eaff" }}>"BCI Authentication"</b>.
							</div>
						</div>
					)}
				</div>

				<style>{`
					@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;700&family=Poppins:wght@500;700&display=swap');
					.particle-overlay {
						position: absolute;
						top: 0; left: 0;
						width: 100vw; height: 100vh;
						pointer-events: none;
						z-index: 1;
						background: radial-gradient(circle at 20% 30%, #00eaff22 0%, #37fb0711 80%, transparent 100%);
						animation: particles-move 8s infinite linear alternate;
					}
					@keyframes particles-move {
						0% { background-position: 0 0; }
						100% { background-position: 100px 80px; }
					}
					.glass-panel {
						background: rgba(34, 34, 68, 0.7);
						border-radius: 32px;
						box-shadow: 0 0 32px 8px #00eaff55, 0 0 64px 16px #37fb0755;
						border: 2px solid #00eaff;
						backdrop-filter: blur(8px);
						position: relative;
						z-index: 3;
					}
					.mic-indicator {
						position: fixed;
						top: 32px;
						right: 40px;
						z-index: 1001;
						display: flex;
						align-items: center;
						gap: 10px;
						padding: 10px 22px;
						border-radius: 999px;
						font-family: 'Orbitron', Inter, Arial, sans-serif;
						font-size: 1.1rem;
						backdrop-filter: blur(8px);
						box-shadow: 0 0 16px #00eaff44;
						border: 2px solid #00eaff55;
						background: rgba(34, 34, 68, 0.7);
						letter-spacing: 2px;
						transition: background 0.2s, box-shadow 0.2s;
					}
					.mic-on {
						color: #00eaff;
						display: flex;
						align-items: center;
						gap: 10px;
						animation: pulseGlow 1.2s infinite alternate;
					}
					.mic-off {
						color: #aaa;
						display: flex;
						align-items: center;
						gap: 10px;
					}
					.mic-icon {
						width: 24px;
						height: 24px;
						display: inline-block;
					}
					@keyframes pulseGlow {
						0% { box-shadow: 0 0 8px #00eaff; }
						100% { box-shadow: 0 0 24px #00eaff; }
					}
					@keyframes scan-beam {
						0% { top: 20px; }
						50% { top: 375px; }
						100% { top:20px; }
					}
					@keyframes quantum-pulse {
						0%, 100% { opacity: 0.7; }
						50% { opacity: 1; }
					}
					@keyframes quantum-glow {
						0% { text-shadow: 0 0 24px #00eaff, 0 0 48px #37fb07; }
						50% { text-shadow: 0 0 48px #00eaff, 0 0 96px #37fb07; }
						100% { text-shadow: 0 0 24px #00eaff, 0 0 48px #37fb07; }
					}
					@media (max-width: 900px) {
						.glass-panel {
							width: 98vw !important;
							max-width: 98vw !important;
							min-width: unset !important;
							padding: 18px 4vw !important;
							height: auto !important;
							max-height: 95vh !important;
						}
						.mic-indicator {
							top: 16px !important;
							right: 10px !important;
							padding: 8px 12px !important;
							font-size: 1rem !important;
						}
					}
				`}</style>
			</div>
		</>
	);
};

export default AuthenticationInitiationScreen;