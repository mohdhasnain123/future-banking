import { useState, useEffect } from "react";

export const Header = ({ userName = "Vick" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear() + 10;
    const dayName = date.toLocaleString("en-US", { weekday: "short" });
    return `${day} ${month} ${year}, ${dayName}`;
  };

  return (
    <header className="relative z-10 space-y-1 animate-fade-in">
      <div className="flex items-center gap-1">
        <div className="space-y-0.5">
          <h2 className="text-xs font-medium tracking-wide text-white/90">
            {formatDate(currentTime)}
          </h2>
        </div>
      </div>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-glow leading-tight">
        Good Morning {userName}
      </h1>
    </header>
  );
};