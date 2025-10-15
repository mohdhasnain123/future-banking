import React, { useEffect, useRef, useState, useMemo } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import managerImage from "./images/scene-3/managerImage.png";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Import your audio files
import welcomeAudio from "./audio/scene-3/managerWelcome.mp3";
import welcomeBackAudio from "./audio/scene-3/WelcomeBack.mp3";
import openingKycAudio from "./audio/scene-3/selectKycUpdate.mp3";
import exitingAudio from "./audio/scene-3/exiting.mp3";
import whoAreYouAudio from "./audio/scene-3/managerWho.mp3";
import noImmediateActionAudio from "./audio/scene-3/NoImmediate.mp3";
import whatShouldIDoAudio from "./audio/scene-3/managerWhatToDo.mp3";
import immediateActionAudio from "./audio/scene-3/immediateAction.mp3";

const options = [
	{ id: "kyc", label: "KYC Update", icon: <AssignmentIndIcon fontSize="large" /> },
	{ id: "details", label: "Account Details", icon: <AccountBalanceIcon fontSize="large" /> },
	{ id: "transactions", label: "Recent Transactions", icon: <ReceiptLongIcon fontSize="large" /> },
	{ id: "support", label: "Customer Support", icon: <SupportAgentIcon fontSize="large" /> }
];

// Helper: Play audio and call onEnd when finished
const playAudio = (audioSrc, onEnd) => {
	if (!audioSrc) {
		if (onEnd) onEnd();
		return;
	}
	const audio = new window.Audio(audioSrc);
	audio.onended = onEnd;
	audio.play();
	return audio;
};

const HolographicBankManagerScreen = ({ onOptionSelect, onExit, selectedBank, cameFromKYC }) => {
	const [conversation, setConversation] = useState([
		{ sender: "manager", text: "Hi! What can I help you with?" }
	]);
	const [welcomePlayed, setWelcomePlayed] = useState(false);
	const scrollBoxRef = useRef(null);
	const listeningRef = useRef(false);

	const {
		transcript,
		finalTranscript,
		resetTranscript,
		listening,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	const conversationPatterns = useMemo(
		() => [
			{
				pattern: /who are you/i,
				response: selectedBank
					? `I'm your relationship manager of ${selectedBank.name}, I'm here to help you!`
					: "I'm your relationship manager, I'm here to help you!",
				audio: whoAreYouAudio
			},
			{
				pattern: /what should i do/i,
				response:
					"You can update your K.Y.C, check account details, view recent transactions, or contact customer support. What would you like to do?",
				audio: whatShouldIDoAudio
			},
			{
				pattern: /immediate action/i,
				response: cameFromKYC
					? "No immediate actions is required as of now."
					: "An immediate action is needed. Please update your K Y C as your biometric has been compromised for unknown reasons",
				audio: cameFromKYC ? noImmediateActionAudio : immediateActionAudio
			}
		],
		[selectedBank, cameFromKYC]
	);

	// Scroll to bottom when conversation updates
	useEffect(() => {
		if (scrollBoxRef.current) {
			scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
		}
	}, [conversation]);

	// Handle finalTranscript changes (process only when user finishes speaking)
	useEffect(() => {
		if (!finalTranscript || !finalTranscript.trim()) return;

		const userText = finalTranscript.trim().toLowerCase();
		setConversation((prev) => [...prev, { sender: "user", text: userText }]);
		resetTranscript();

		// KYC command
		if (userText.includes("kyc")) {
			setConversation((prev) => [
				...prev,
				{ sender: "manager", text: "Sure, preparing for KYC update..." }
			]);
			playAudio(openingKycAudio, () => {
				SpeechRecognition.stopListening();
				listeningRef.current = false;
				if (onOptionSelect) onOptionSelect("kyc");
			});
			return;
		}

		// Exit command
		if (userText.includes("exit")) {
			setConversation((prev) => [...prev, { sender: "manager", text: "Exiting..." }]);
			playAudio(exitingAudio, () => {
				SpeechRecognition.stopListening();
				listeningRef.current = false;
				if (onExit) onExit();
			});
			return;
		}

		// Pattern matching
		for (const patternObj of conversationPatterns) {
			if (patternObj.pattern.test(userText)) {
				const responseText = patternObj.response;
				setConversation((prev) => [...prev, { sender: "manager", text: responseText }]);
				playAudio(patternObj.audio, () => {
					if (listeningRef.current) {
						SpeechRecognition.startListening({
							continuous: true,
							language: "en-US",
							interimResults: true
						});
					}
				});
				return;
			}
		}

		// Unknown command
		setConversation((prev) => [
			...prev,
			{ sender: "manager", text: "Sorry, I didn't understand. Please try again." }
		]);
		if (listeningRef.current) {
			SpeechRecognition.startListening({
				continuous: true,
				language: "en-US",
				interimResults: true
			});
		}
	}, [finalTranscript, resetTranscript, onOptionSelect, onExit, conversationPatterns]);

	// Auto-restart listening if it stops and user hasn't stopped it
	useEffect(() => {
		if (!listening && listeningRef.current) {
			SpeechRecognition.startListening({
				continuous: true,
				language: "en-US",
				interimResults: true
			});
		}
	}, [listening]);

	const startListening = () => {
		listeningRef.current = true;
		SpeechRecognition.startListening({ continuous: true, language: "en-US", interimResults: true });
	};

	const stopListening = () => {
		listeningRef.current = false;
		SpeechRecognition.stopListening();
	};

	const handleScreenClick = (e) => {
		if (
			e.target.tagName === "BUTTON" ||
			e.target.closest("button") ||
			e.target.closest(".MuiSvgIcon-root")
		)
			return;

		const y = e.clientY;
		const screenHeight = window.innerHeight;
		if (y < screenHeight / 2) {
			if (!listening) {
				if (!welcomePlayed) {
					setWelcomePlayed(true);
					if (cameFromKYC) {
						playAudio(welcomeBackAudio, () => startListening());
					} else {
						playAudio(welcomeAudio, () => startListening());
					}
				} else {
					startListening();
				}
			}
		} else {
			stopListening();
		}
	};

	if (!browserSupportsSpeechRecognition) {
		return <div>Your browser does not support speech recognition.</div>;
	}

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
				color: "#e3f2fd",
				fontFamily: "Poppins",
				letterSpacing: 2,
				position: "relative"
			}}
		>
			{/* Top-left welcome */}
			<div
				style={{
					position: "absolute",
					top: 10,
					left: 10,
					display: "flex",
					alignItems: "center",
					gap: 16,
					zIndex: 10
				}}
			>
				<div
					style={{
						padding: "10px 22px",
						color: "#ffffffff",
						fontSize: 42,
						fontWeight: "700",
						letterSpacing: 1
					}}
				>
					Welcome, Vick
				</div>
			</div>

			<div
				style={{
					marginTop: 24,
					display: "flex",
					left: "45%",
					flexDirection: "column",
					alignItems: "center",
					position: "absolute",
					top: 70,
					zIndex: 5
				}}
			>
				<div
					style={{
						fontSize: 22,
						fontWeight: 700,
						color: "#ffffffff",
						textShadow: "0 0 16px #00eaff, 0 0 32px #00eaff44"
					}}
				>
					Your Bank Relationship Manager
				</div>
				<div
					style={{
						marginTop: 5,
						fontSize: 18,
						color: "#b0eaff",
						textShadow: "none"
					}}
				>
					<span
						role="img"
						aria-label="audio"
						style={{ fontSize: 24, verticalAlign: "middle" }}
					></span>
					<span style={{ marginLeft: 10 }}>
						{listening
							? transcript
								? `Listening...`
								: "Listening..."
							: "Welcome! What can I help you with?"}
					</span>
				</div>
			</div>

			{/* Immediate Action Message for KYC */}
			{selectedBank && (
				<div
					style={{
						position: "absolute",
						top: 10,
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						alignItems: "center",
						gap: 16,
						padding: "10px 22px",
						zIndex: 10
					}}
				>
					<span style={{ color: "#f3f3f3ff", fontWeight: "bold", fontSize: 20 }}>
						{selectedBank.name}
					</span>
				</div>
			)}

			{!cameFromKYC && (
				<div
					style={{
						position: "absolute",
						top: selectedBank ? 43 : 20,
						left: "50%",
						transform: "translateX(-50%)",
						fontSize: 14,
						fontFamily: "Poppins",
						color: "#ff1744",
						fontWeight: "bold",
						letterSpacing: 1,
						display: "flex",
						alignItems: "center",
						textAlign: "center",
						justifyContent: "center",
						zIndex: 5,
						width: "100vw",
						padding: "10px 20px"
					}}
				>
					<WarningAmberIcon style={{ marginRight: 7, color: "#ff1744", fontSize: 29 }} /> Immediate
					action needed: Biometric chip seems to be compromised. Please update your KYC.
				</div>
			)}

			{/* User Options */}
			<div
				style={{
					marginTop: "10px",
					display: "flex",
					gap: 32,
					flexWrap: "wrap",
					justifyContent: "center"
				}}
			>
				<div
					style={{
						position: "fixed",
						top: 130,
						left: 24,
						display: "flex",
						flexDirection: "column",
						gap: 24,
						zIndex: 1001
					}}
				>
					{options.map((opt) => {
						const isKYC = opt.id === "kyc";
						return (
							<button
								key={opt.id}
								onClick={(e) => {
									e.stopPropagation();
									if (onOptionSelect) onOptionSelect(opt.id);
								}}
								style={{
									minWidth: 250,
									minHeight: 120,
									background:
										isKYC && !cameFromKYC
											? "linear-gradient(135deg, #ff174433 60%, #ff525233 100%)"
											: "linear-gradient(135deg, #00eaff33 60%, #37fb0733 100%)",
									border: isKYC && !cameFromKYC ? "3px solid #ff1744" : "1px solid #00eaff",
									borderRadius: 28,
									boxShadow: isKYC && !cameFromKYC ? "0 0 2px #ff1744cc" : "0 0 32px #00eaff44",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									fontSize: 18,
									color: isKYC && !cameFromKYC ? "#ff1744" : "#e7e7e7ff",
									fontWeight: "bold",
									margin: 8,
									transition: "all 0.2s"
								}}
								className={isKYC && !cameFromKYC ? "kyc-glow" : ""}
							>
								<div style={{ marginBottom: 8, color: "inherit" }}>{opt.icon}</div>
								{opt.label}
							</button>
						);
					})}
				</div>
			</div>
			<br />
			<button
				onClick={onExit}
				style={{
					position: "fixed",
					bottom: 20,
					right: 20,
					display: "flex",
					alignItems: "center",
					background: "#034165ff",
					color: "#f8f8f8ff",
					textShadow: "0 0 16px #00eaff44",
					border: "2px solid red",
					borderRadius: 8,
					padding: "8px 20px",
					fontSize: 16,
					fontWeight: "bold",
					cursor: "pointer",
					boxShadow: "0 0 12px #ff174488,0 0 64px #ff174488",
					letterSpacing: 1
				}}
			>
				⏻
			</button>
			<style>
				{`
		  @media (max-width: 700px) {
			.chat-box-right {
			  width: 90vw !important;
			  right: 2vw !important;
			  padding: 10px 6px !important;
			  font-size: 13px !important;
			}
		  }
		`}
			</style>

			{/* Conversation History Box */}
			<div
				ref={scrollBoxRef}
				className="chat-box-right"
				style={{
					position: "absolute",
					bottom: 30,
					width: 600,
					maxWidth: "90vw",
					left: "40%",
					height: 250,
					background: "rgba(175, 220, 255, 0.20)",
					borderRadius: 12,
					border: "1px solid #00eaff ",
					overflowY: "auto",
					padding: "14px 22px",
					fontSize: 15,
					color: "#e3f2fd",
					display: "flex",
					flexDirection: "column",
					gap: 6,
					zIndex: 1000
				}}
			>
				{conversation.map((msg, idx) => (
					<div
						key={idx}
						style={{ color: msg.sender === "manager" ? "#fff" : "#00ff26ff", fontWeight: "bold" }}
					>
						<span style={{ fontWeight: "bold" }}>
							{msg.sender === "manager" ? "Manager" : "You"}:
						</span>{" "}
						{msg.text}
					</div>
				))}
			</div>

			{/* Manager Image */}
			<div
				style={{
					position: "absolute",
					bottom: 20,
					left: "60%",
					transform: "translateX(-50%)",
					opacity: "0.6",
					width: "54vw",
					height: "87vh",
					backgroundImage: `url(${managerImage})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					zIndex: 1,
					filter: "drop-shadow(0 0 32px #00eaff88)",
					userSelect: "none",
					pointerEvents: "none",
					border: "1px solid #00eaff",
					borderRadius: "15px",
					backgroundColor: "rgba(175, 220, 255, 0.20)"
				}}
				aria-label="Relationship Manager"
			></div>

			{/* Listening indicator */}
			<div
				style={{
					position: "fixed",
					bottom: 8,
					left: 8,
					fontSize: 8,
					color: listening ? "#00eaff" : "#aaa",
					background: "rgba(0,0,0,0.4)",
					padding: "3px 10px",
					borderRadius: 8,
					zIndex: 2000,
					fontWeight: "bold"
				}}
			>
				{listening ? "Listening" : "Not Listening"}
			</div>
		</div>
	);
};

export default HolographicBankManagerScreen;
