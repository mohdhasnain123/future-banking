import React, { useRef, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import backgroundImage from "./images/scene-3/Group2.png";
import consentPromptMp3 from "./audio/scene-3/consent.mp3";
import consentBCIMp3 from "./audio/scene-3/consentBCI.mp3";

const ConsentScreen = ({ onAgree, onDecline }) => {
	const audioRef = useRef(null);
	const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);
	const [isManuallyListening, setIsManuallyListening] = useState(false);

	const {
		transcript,
		finalTranscript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

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
		if (
			transcriptLower.includes("agree") ||
			transcriptLower.includes("proceed") ||
			transcriptLower.includes("ok") ||
			transcriptLower.includes("yes")
		) {
			playAudio(consentBCIMp3, () => {
				setTimeout(() => {
					onAgree();
				}, 250); // Short delay after audio finishes
			});
			SpeechRecognition.stopListening();
			setIsManuallyListening(false);
		}
		resetTranscript();
		// eslint-disable-next-line
	}, [finalTranscript]);

	// Restart listening if not listening and user has manually started
	useEffect(() => {
		if (isManuallyListening && !listening) {
			const timer = setTimeout(() => {
				SpeechRecognition.startListening({ continuous: true, language: "en-US" });
			}, 500);
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line
	}, [listening, isManuallyListening]);

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
				playAudio(consentPromptMp3, () => {
					SpeechRecognition.startListening({ continuous: true, language: "en-US" });
					setIsManuallyListening(true);
				});
				setHasPlayedWelcome(true);
			} else if (!listening) {
				SpeechRecognition.startListening({ continuous: true, language: "en-US" });
				setIsManuallyListening(true);
			}
		} else {
			// Lower half: Stop listening
			SpeechRecognition.stopListening();
			setIsManuallyListening(false);
		}
	};

	const containerStyle: React.CSSProperties = {
		minHeight: "100vh",
		width: "100vw",
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		fontFamily: "Poppins",
		color: "#fff",
		letterSpacing: 1,
		position: "fixed",
		zIndex: 1000,
		padding: 0
	};

	const headerStyle: React.CSSProperties = {
		width: "100%",
		textAlign: "center",
		padding: "40px 10px 0 10px",
		boxSizing: "border-box"
	};

	const headingStyle = {
		fontSize: "27px",
		fontWeight: 700,
		color: "#fff",
		marginBottom: 8
	};

	const subheadingStyle = {
		fontSize: "14px",
		color: "#fff",
		marginBottom: 0
	};

	const centerBoxWrapper = {
		flex: 1,
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	};

	const dialogStyle: React.CSSProperties = {
		background: "rgba(210, 210, 210, 0.15)",
		borderRadius: 18,
		padding: "24px 20px",
		paddingTop: "50px",
		width: "656px",
		height: "352px",
		border: "1px solid #00eaff88",
		color: "#e3f2fd",
		textAlign: "center",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backdropFilter: "blur(2px)",
		overflowY: "auto"
	};

	const listStyle: React.CSSProperties = {
		fontFamily: "Poppins",
		fontSize: "14px",
		fontWeight: "700",
		color: "#fff",
		fontStyle: "normal",
		textAlign: "center",
		lineHeight: "normal",
		listStyleType: "none",
		listStylePosition: "inside",
		width: "456px"
	};

	const buttonRowStyle: React.CSSProperties = {
		display: "flex",
		gap: 16,
		marginTop: 8,
		justifyContent: "center",
		flexWrap: "wrap"
	};

	const buttonStyle = {
		background: "#06c222ff",
		color: "#f5f5f5ff",
		border: "none",
		borderRadius: 6,
		padding: "10px 24px",
		fontSize: "1rem",
		fontWeight: "bold",
		cursor: "pointer",
		marginBottom: 8,
		minWidth: 100
	};

	const declineButtonStyle = {
		...buttonStyle,
		background: "#ef0808ff",
		color: "#fff"
	};

	const privacyStyle = {
		marginTop: 10,
		fontSize: "0.9rem",
		color: "#b0eaff",
		paddingTop: "10px"
	};

	const mediaQuery = `
  @media (max-width: 600px) {
    .dialog-box {
      width: 98vw !important;
      max-width: 98vw !important;
      min-width: unset !important;
      padding: 18px 4vw !important;
      height: auto !important;
      max-height: 95vh !important;
    }
    .button-row {
      flex-direction: column !important;
      gap: 10px !important;
    }
    .header {
      padding-top: 16px !important;
    }
  }
  `;

	if (!browserSupportsSpeechRecognition) {
		return <div>Your browser does not support speech recognition.</div>;
	}

	return (
		<>
			<style>{mediaQuery}</style>
			<div style={containerStyle} onClick={handleScreenClick}>
				<div className="header" style={headerStyle}>
					<div style={headingStyle}>Consent Required</div>
					<div style={subheadingStyle}>
						<b>
							Do you consent to brain-computer mapping to securely authenticate your bank login?
						</b>
					</div>
				</div>
				<div style={centerBoxWrapper}>
					<div className="dialog-box" style={dialogStyle}>
						<ul style={listStyle}>
							<li title="Your brainwave patterns will be used for secure authentication.">
								Your brainwave patterns will be used for secure authentication.
							</li>
							<li>Data is processed securely and never shared with third parties.</li>
							<li>You can withdraw consent at any time.</li>
						</ul>
						<div
							style={{
								fontSize: "1.1rem",
								color: "#b0eaff",
								marginBottom: 12,
								paddingTop: "38px",
								fontWeight: "bold"
							}}
						>
							<span role="img" aria-label="audio"></span> Please confirm your consent
						</div>
						<div className="button-row" style={buttonRowStyle}>
							<button style={buttonStyle} onClick={onAgree}>
								Agree
							</button>
							<button style={declineButtonStyle} onClick={onDecline}>
								Decline
							</button>
						</div>
						<div style={privacyStyle}>
							<a href="." style={{ color: "#00eaff" }}>
								View Privacy Policy
							</a>
						</div>
					</div>
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
			</div>
			<style>
				{`
          @keyframes holo-glow {
            from { filter: drop-shadow(0 0 24px #00eaff) drop-shadow(0 0 8px #00eaff); }
            to { filter: drop-shadow(0 0 38px #00eaff) drop-shadow(0 0 24px #00eaff); }
          }
        `}
			</style>
		</>
	);
};

export default ConsentScreen;
