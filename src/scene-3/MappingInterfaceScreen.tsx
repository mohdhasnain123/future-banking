import React, { useState, useEffect } from "react";
import backgroundImage from "./images/scene-3/Group2.png";
import brainImage from "./images/scene-3/brain5.gif"; // <-- your image here

const MappingInterfaceScreen = ({ onComplete }) => {
	const [progress, setProgress] = useState(0);

	// Progress effect (like before)
	useEffect(() => {
		if (progress < 100) {
			const timer = setTimeout(() => setProgress(progress + 1), 50); // 5s total
			return () => clearTimeout(timer);
		} else if (progress === 100 && onComplete) {
			onComplete();
		}
	}, [progress, onComplete]);

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
				color: "#ffffffff",
				fontFamily: "Poppins",
				letterSpacing: 2
			}}
		>
			<div
				style={{
					fontSize: 36,
					fontWeight: 700,
					marginBottom: 12,
					color: "#ffffffff"
				}}
			>
				Brain-Computer Mapping
			</div>
			<div
				style={{
					color: "#ffffffff",
					fontWeight: "bold",
					marginBottom: 10,
					fontSize: 17
				}}
			>
				Mapping in progress
			</div>
			<div
				style={{
					fontSize: 17,
					color: "#ffffffff",
					marginBottom: 18
				}}
			>
				Focus on the authentication task
			</div>

			{/* --- Your Image in a Box --- */}
			<div
				style={{
					background: "rgba(210, 210, 210, 0.15)",
					borderRadius: 18,
					padding: "24px 20px",
					paddingTop: "50px",
					width: "27vw",
					height: "25vh",
					// ---- ADJUST WIDTH AND HEIGHT BELOW ----
					// width: "40vw", // You can use %, px, or vw (e.g., "90vw" for 90% of viewport width)
					// maxWidth: "95vw", // Prevents overflow on small screens
					// minWidth: "260px", // Optional: minimum width
					// height: "45vh", // Set a fixed height, or use "auto" for content-based height
					// maxHeight: "90vh", // Prevents overflow on small screens
					// ---------------------------------------
					border: "1px solid #00eaff88",

					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: "32px 0"
				}}
			>
				<img
					src={brainImage}
					alt="Brain Authentication"
					style={{
						maxWidth: "80%",
						maxHeight: "80%"
						// borderRadius: 12,
						// boxShadow: "0 0 12px #00eaff88"
					}}
				/>
			</div>

			{/* Progress bar */}
			<div style={{ width: 270, marginTop: 18 }}>
				<div
					style={{
						height: 8,
						borderRadius: 4,
						background: "#0a183d",
						overflow: "hidden",
						boxShadow: "0 0 8px #00eaff44"
					}}
				>
					<div
						style={{
							height: "100%",
							width: `${progress}%`,
							background: "linear-gradient(90deg, #00eaff 0%, #37fb07 100%)",
							transition: "width 0.2s linear"
						}}
					/>
				</div>
				{/* Add this below the progress bar */}
				<div
					style={{
						marginTop: 16,
						fontSize: 18,
						color: "#ffffffff",
						fontWeight: "bold",
						letterSpacing: 1,
						textAlign: "center",
						justifyContent: "center"
					}}
				>
					Authenticating brain patterns
				</div>
			</div>

			<div
				style={{
					marginTop: 24,
					fontSize: 15,
					color: "#ffffffff",
					textShadow: "none"
				}}
			>
				<b>Brain-Computer Interface APIs:</b> Emotiv, OpenBCI, Custom BCI Integration
			</div>
			<div
				style={{
					marginTop: 18,
					fontSize: 13,
					color: "#B0B0B0",
					textAlign: "center",
					textShadow: "none"
				}}
			>
				All data is processed securely and never stored.
			</div>
		</div>
	);
};

export default MappingInterfaceScreen;
