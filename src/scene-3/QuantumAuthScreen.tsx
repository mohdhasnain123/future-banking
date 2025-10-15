import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import backgroundImage from "./images/scene-3/kioskBg.png";
import glassDoorImg from "./images/scene-3/chipGreen.png";
import chipScannerImg from "./images/scene-3/blueChip1.png";

// Import audio files
import welcomeMp3 from "./audio/scene-3/qsk1.mp3";
import scanningMp3 from "./audio/scene-3/qsk2.mp3";
import successMp3 from "./audio/scene-3/qsk3.mp3";
import failureMp3 from "./audio/scene-3/qsk3.mp3";

// Simulate chip scan authentication (replace with real logic)
const authenticateChip = () => {
	// For demo, randomly succeed or fail
	return true;
};

const QuantumAuthScreen = ({ selectedBank }) => {
	const bankName = selectedBank ? selectedBank.name : "Your Bank";
	const [status, setStatus] = useState("idle"); // idle | scanning | success | failure
	const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
	const [isManuallyListening, setIsManuallyListening] = useState(false);
	const audioRef = useRef(null);

	// SpeechRecognition hook
	const { finalTranscript, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition();

	// Play audio helper
	const playAudio = (audioFile, onEnd) => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			audioRef.current = null;
		}
		const audio = new window.Audio(audioFile);
		audioRef.current = audio;
		if (onEnd) {
			audio.onended = onEnd;
		}
		audio.play().catch(() => {});
	};

	// Handle speech recognition results
	useEffect(() => {
		if (!finalTranscript) return;
		const transcriptLower = finalTranscript.toLowerCase();
		console.log(transcriptLower);
		if (
			(transcriptLower.includes("proceed") ||
				transcriptLower.includes("scan") ||
				transcriptLower.includes("ok")) &&
			status === "idle"
		) {
			handleScan();
		}
		resetTranscript();
		// eslint-disable-next-line
	}, [finalTranscript]);

	// Restart listening if not confirming/selected and user has manually started
	useEffect(() => {
		if (isManuallyListening && !listening && status === "idle") {
			const timer = setTimeout(() => {
				SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
			}, 500);
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line
	}, [listening, status, isManuallyListening]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			SpeechRecognition.abortListening();
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
		};
	}, []);

	// Handle upper/lower half click
	const handleScreenClick = (e) => {
		const y = e.clientY;
		const windowHeight = window.innerHeight;
		if (y < windowHeight / 2) {
			// Upper half: Play welcome and start listening
			if (!hasPlayedWelcome && status === "idle") {
				playAudio(welcomeMp3, () => {
					SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
					setIsManuallyListening(true);
				});
				setHasPlayedWelcome(true);
			} else if (!listening && status === "idle") {
				SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
				setIsManuallyListening(true);
			}
		} else {
			// Lower half: Stop listening
			SpeechRecognition.stopListening();
			setIsManuallyListening(false);
		}
	};

	const handleScan = () => {
		setStatus("scanning");
		playAudio(scanningMp3, () => {});
		setTimeout(() => {
			const success = authenticateChip();
			if (success) {
				setStatus("success");
				playAudio(successMp3, () => {});
			} else {
				setStatus("failure");
				playAudio(failureMp3, () => {});
			}
			SpeechRecognition.stopListening();
			setIsManuallyListening(false);
		}, 3000); // Simulate scan delay
	};

	const handleRetry = () => {
		setStatus("idle");
		setHasPlayedWelcome(false);
		setIsManuallyListening(false);
		resetTranscript();
	};

	if (!browserSupportsSpeechRecognition) {
		return <div>Your browser does not support speech recognition.</div>;
	}

	return (
		<div
			role="main"
			style={{
				height: "100vh",
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				position: "relative",
				color: "#ffffffff",
				fontFamily: "Poppins",
				letterSpacing: 2
			}}
			onClick={handleScreenClick}
		>
			<h1
				style={{
					position: "absolute",
					top: 32,
					left: 0,
					width: "100%",
					textAlign: "center",
					fontSize: 46,
					fontWeight: 700,
					color: "#ffffffff",
					zIndex: 2,
					margin: 0,
					letterSpacing: 2
				}}
			>
				{bankName} Quantum-Safe Authentication
			</h1>

			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					paddingTop: 100
				}}
			>
				{(status === "idle" || status === "scanning") && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: 32
						}}
					>
						<img
							src={chipScannerImg}
							alt="Chip/Card Scanner"
							style={{
								width: "15vw",
								height: "30vh",
								marginBottom: 24,
								animation:
									status === "scanning" ? "chip-scan-blink 1.2s infinite alternate" : undefined
							}}
						/>
						<div style={{ fontSize: 24, marginBottom: 24, textAlign: "center" }}>
							Please scan your <span style={{ color: "#00eaff" }}>Quantum-Safe key</span> to
							authenticate.
						</div>

						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								handleScan();
							}}
							disabled={status === "scanning"}
							style={{
								fontSize: 20,
								padding: "10px 32px",
								borderRadius: 8,
								border: "none",
								background: "#00eaff",
								color: "#001f2f",
								fontWeight: "bold",
								cursor: status === "scanning" ? "not-allowed" : "pointer",
								boxShadow: "0 0 8px #00eaff44"
							}}
						>
							{status === "scanning" ? "Scanning..." : "Scan Chip"}
						</button>
					</div>
				)}

				{status === "success" && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: 24
						}}
					>
						{/* Success text and animated tick */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								fontSize: 28,
								color: "#00ffb0",
								textShadow: "0 0 12px #00eaff",
								fontWeight: "bold",
								marginBottom: 16
							}}
						>
							Authentication Successful
							{/* Animated green tick on the right */}
							<svg
								width="36"
								height="36"
								viewBox="0 0 36 36"
								style={{ marginLeft: 10, display: "block" }}
							>
								<circle
									cx="18"
									cy="18"
									r="16"
									fill="none"
									stroke="#00ffb0"
									strokeWidth="3"
									opacity="0.15"
								/>
								<path
									d="M10 19 L16 25 L26 13"
									fill="none"
									stroke="#00ffb0"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
									style={{
										strokeDasharray: 32,
										strokeDashoffset: 32,
										animation: "tick-appear 0.5s 0.2s forwards"
									}}
								/>
							</svg>
						</div>
						<img
							src={glassDoorImg}
							alt="Glass Door Opening"
							style={{
								width: 500,
								height: "auto",
								marginBottom: 24,
								animation: "door-slide 1.5s forwards"
							}}
						/>
						<div
							style={{ fontSize: 22, color: "#e3f2fd", textAlign: "center", marginBottom: "50px" }}
						>
							Please walk through the door
							<br />
							to the secured space.
						</div>
					</div>
				)}
				{status === "failure" && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: 24,
							background: "rgba(34,0,0,0.7)",
							padding: 32,
							borderRadius: 16,
							boxShadow: "0 0 24px #ff003344"
						}}
					>
						<div
							style={{
								fontSize: 28,
								color: "#ff0033",
								textShadow: "0 0 12px #ff0033",
								fontWeight: "bold",
								marginBottom: 16
							}}
						>
							❌ Access Denied
						</div>
						<div style={{ fontSize: 22, color: "#e3f2fd", marginBottom: 24 }}>
							Authentication failed.
							<br />
							Please try scanning your Quantum-Safe chip again.
						</div>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleRetry();
							}}
							style={{
								fontSize: 20,
								padding: "10px 32px",
								borderRadius: 8,
								border: "none",
								background: "#00eaff",
								color: "#001f2f",
								fontWeight: "bold",
								cursor: "pointer",
								boxShadow: "0 0 8px #00eaff44"
							}}
						>
							Retry
						</button>
					</div>
				)}
			</div>
			{/* Listening indicator */}
			<div
				style={{
					position: "fixed",
					left: 10,
					bottom: 20,
					color: listening ? "#00eaff" : "#aaa",
					background: "rgba(0,0,0,0.5)",
					padding: "8px 18px",
					borderRadius: 16,
					fontSize: 10,
					fontFamily: "Poppins",
					zIndex: 1000,
					pointerEvents: "none"
				}}
			>
				{listening ? "Listening" : "Not listening"}
			</div>
			<style>
				{`
    @keyframes door-slide {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-20px); opacity: 1; }
    }
    @keyframes chip-scan-blink {
      0% { filter: brightness(1); }
      100% { filter: brightness(2); }
    }
    @keyframes tick-appear {
      to {
        stroke-dashoffset: 0;
      }
    }
  `}
			</style>
		</div>
	);
};

export default QuantumAuthScreen;
