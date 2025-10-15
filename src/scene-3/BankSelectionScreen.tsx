import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import backgroundImage from "./images/scene-3/kioskBg.png";
import bank1Logo from "./images/scene-3/banks/bankLogo1.png";
import bank2Logo from "./images/scene-3/banks/bankLogo2.png";
import bank3Logo from "./images/scene-3/banks/bankLogo3.png";
import bank4Logo from "./images/scene-3/banks/bankLogo4.png";
import bank5Logo from "./images/scene-3/banks/bankLogo5.png";

import welcomeMp3 from "./audio/scene-3/bankselect-welcome.mp3";
import notRecognizedMp3 from "./audio/scene-3/bankNotRecog.mp3";

const banks = [
	{ id: 1, name: "First National Bank", img: bank1Logo },
	{ id: 2, name: "City Savings", img: bank5Logo },
	{ id: 3, name: "Metro Credit Union", img: bank3Logo },
	{ id: 4, name: "Interstate Finance Bank", img: bank4Logo },
	{ id: 5, name: "Future Bank", img: bank2Logo }
];
SpeechRecognition.stopListening();
SpeechRecognition.abortListening();
const BankSelectionScreen = ({ onBankSelected, onExit }) => {
	const [selected, setSelected] = useState(null);
	const [confirming, setConfirming] = useState(false);
	const [hasStartedListening, setHasStartedListening] = useState(false);
	const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
	const [isManuallyListening, setIsManuallyListening] = useState(false);
	const audioRef = useRef(null);

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
		const found = banks.find(
			(b) =>
				transcriptLower.includes(b.name.toLowerCase()) ||
				b.name.toLowerCase().includes(transcriptLower)
		);
		if (found) {
			setSelected(found.id);
			setConfirming(true);
			setTimeout(() => {
				setConfirming(false);
				if (onBankSelected) onBankSelected(found);
			}, 1200);
			SpeechRecognition.stopListening();
			setIsManuallyListening(false);
		} else {
			playAudio(notRecognizedMp3, () => {
				if (!confirming && !selected && isManuallyListening) {
					SpeechRecognition.startListening({ continuous: false, language: "en-US" });
				}
			});
		}
		resetTranscript();
		// eslint-disable-next-line
	}, [finalTranscript]);

	// Restart listening if not confirming/selected and user has manually started
	useEffect(() => {
		if (hasStartedListening && isManuallyListening && !listening && !confirming && !selected) {
			const timer = setTimeout(() => {
				SpeechRecognition.startListening({ continuous: true, language: "en-US" });
			}, 500);
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line
	}, [listening, confirming, selected, hasStartedListening, isManuallyListening]);

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
			if (!hasPlayedWelcome) {
				playAudio(welcomeMp3, () => {
					SpeechRecognition.startListening({ continuous: false, language: "en-US" });
					setHasStartedListening(true);
					setIsManuallyListening(true);
				});
				setHasPlayedWelcome(true);
			} else {
				// if (!listening) {
				SpeechRecognition.startListening({ continuous: false, language: "en-US" });
				// }
				setIsManuallyListening(true);
			}
		} else {
			// Lower half: Stop listening
			SpeechRecognition.stopListening();
			setIsManuallyListening(false);
		}
	};

	const handleTileClick = (bank) => {
		setSelected(bank.id);
		setConfirming(true);
		setTimeout(() => {
			setConfirming(false);
			if (onBankSelected) onBankSelected(bank);
		}, 1200);
		SpeechRecognition.abortListening();
		setIsManuallyListening(false);
	};

	if (!browserSupportsSpeechRecognition) {
		return <div>Your browser does not support speech recognition.</div>;
	}

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
				fontFamily: "Orbitron, Arial, sans-serif",
				letterSpacing: 2,
				position: "relative"
			}}
			onClick={handleScreenClick}
		>
			<div
				style={{
					fontFamily: "Poppins",
					fontSize: 45,
					fontWeight: 600,
					color: "#ffffffff"
				}}
			>
				WELCOME
			</div>
			<div
				style={{
					fontFamily: "Poppins",
					fontSize: 32,
					fontWeight: 700,
					marginBottom: 42,
					color: "#ffffffff"
				}}
			>
				Please Select Your Bank
			</div>

			<div
				style={{
					display: "flex",
					gap: 32,
					marginBottom: 32,
					flexWrap: "wrap",
					justifyContent: "center",
					maxWidth: 900,
					width: "100%",
					margin: "0 auto"
				}}
			>
				{banks.map((bank) => (
					<div
						key={bank.id}
						tabIndex={0}
						aria-selected={selected === bank.id}
						onClick={(e) => {
							e.stopPropagation();
							if (!confirming) handleTileClick(bank);
						}}
						onKeyDown={(e) => {
							if ((e.key === "Enter" || e.key === " ") && !confirming) {
								handleTileClick(bank);
							}
						}}
						style={{
							width: 220,
							height: 220,
							background:
								selected === bank.id
									? "linear-gradient(135deg, #00eaff66 60%, #37fb0766 100%)"
									: "rgba(210, 210, 210, 0.25)",
							border: selected === bank.id ? "3px solid #00eaff" : "1px solid #00eaff",
							borderRadius: 18,
							boxShadow:
								selected === bank.id
									? "0 0 32px #00eaff88, 0 0 64px #00eaff44"
									: "0 0 16px #00eaff22",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							cursor: confirming ? "not-allowed" : "pointer",
							transition: "all 0.2s",
							textAlign: "center",
							margin: 8,
							outline: selected === bank.id ? "2px solid #00eaff" : "none"
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: "100%",
								width: "100%"
							}}
						>
							<div
								style={{
									width: 64,
									height: 64,
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									margin: "0 auto",
									textAlign: "center",
									overflow: "hidden"
								}}
							>
								<img
									src={bank.img}
									alt={bank.name + " logo"}
									style={{
										width: "80%",
										height: "80%",
										objectFit: "contain",
										display: "block"
									}}
								/>
							</div>
							<div
								style={{
									fontFamily: "Poppins",
									fontWeight: 700,
									fontSize: 17,
									color: "#ffffffff",
									marginTop: 12,
									width: "100%",
									textAlign: "center",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									minHeight: 38,
									maxHeight: 38,
									overflow: "hidden",
									letterSpacing: "1px"
								}}
							>
								<span
									style={{
										display: "inline-block",
										lineHeight: "18px",
										wordBreak: "break-word",
										whiteSpace: "normal"
									}}
								>
									{bank.name}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
			{selected && confirming && (
				<div
					aria-live="polite"
					style={{
						fontSize: 22,
						color: "#37fb07",
						marginTop: 18,
						textShadow: "0 0 8px #37fb07"
					}}
				>
					Confirming selection...
				</div>
			)}
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
          @keyframes holo-tile {
            0% { box-shadow: 0 0 16px #00eaff22, 0 0 32px #00eaff22; }
            100% { box-shadow: 0 0 32px #00eaff88, 0 0 64px #00eaff44; }
          }
          div[tabindex="0"]:focus {
            outline: 2px solid #00eaff !important;
          }
        `}
			</style>
		</div>
	);
};

export default BankSelectionScreen;
