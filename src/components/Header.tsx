import { useState, useEffect } from "react";

export const Header = ({
  userName = "Vick",
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const dayName = date.toLocaleString("en-US", { weekday: "short" });
    return `${day} ${month} ${year}, ${dayName}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <header className="relative z-10 space-y-2 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-medium tracking-wide text-white/90">
            {formatDate(currentTime)}
          </h2>
          <p className="text-lg text-white/70">{formatTime(currentTime)}</p>
        </div>
      </div>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-glow leading-tight">
        Good Morning {userName}
      </h1>
    </header>
  );
};
