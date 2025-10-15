// useElapsedTimer.js
import { useState, useEffect, useRef } from "react";

// Helper function to format seconds as MM:SS
export function formatTime(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Custom hook for elapsed timer
export default function useElapsedTimer(paused = false) {
	const [elapsed, setElapsed] = useState(0);
	const timerRef = useRef(null);

	useEffect(() => {
		if (!paused) {
			timerRef.current = setInterval(() => {
				setElapsed((prev) => prev + 1);
			}, 1000);
		} else if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [paused]);

	return [elapsed, setElapsed];
}
