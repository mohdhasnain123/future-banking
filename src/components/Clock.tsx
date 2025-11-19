import React, { useEffect, useRef, useState } from "react";

type TargetTime = { hours: number; minutes: number };

export const Clock: React.FC<{ targetTime?: TargetTime }> = ({ targetTime }) => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 10);
    now.setHours(8, 0, 0, 0);
    return now;
  });

  const animationRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  // Animate to targetTime over 5 seconds
  useEffect(() => {
    if (!targetTime) return;

    animatingRef.current = true;
    const start = new Date(time);
    const end = new Date(time);
    end.setHours(targetTime.hours, targetTime.minutes, 0, 0);

    const duration = 5000; // 5 seconds
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Interpolate time
      const newTime = new Date(start);
      newTime.setHours(
        start.getHours() + (end.getHours() - start.getHours()) * progress,
        start.getMinutes() + (end.getMinutes() - start.getMinutes()) * progress,
        start.getSeconds() + (end.getSeconds() - start.getSeconds()) * progress,
        0
      );
      setTime(newTime);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTime(end);
        animatingRef.current = false;
      }
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animatingRef.current = false;
    };
    // eslint-disable-next-line
  }, [targetTime]);

  // Resume ticking after animation
  useEffect(() => {
    if (animatingRef.current) return;
    const interval = setInterval(() => {
      setTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [time, targetTime]);

  // Calculate rotation degrees
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = hours * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  return (
    <div className="relative w-40 h-40 mx-auto rounded-full border-4 border-primary shadow-lg bg-black/40 backdrop-blur-md flex items-center justify-center">
      {/* Neon glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 blur-xl animate-pulse" />

      {/* Hour hand */}
      <div
        className="absolute w-1 h-12 bg-primary origin-bottom left-1/2 top-1/2 transition-transform duration-200"
        style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
      />
      {/* Minute hand */}
      <div
        className="absolute w-1 h-16 bg-purple-400 origin-bottom left-1/2 top-1/2 transition-transform duration-200"
        style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
      />
      {/* Second hand */}
      <div
        className="absolute w-0.5 h-18 bg-pink-500 origin-bottom left-1/2 top-1/2 transition-transform duration-100"
        style={{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}
      />
      {/* Center dot */}
      <div className="absolute w-4 h-4 bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};