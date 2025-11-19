import { useState, useEffect } from "react";
import { formatDate, formatTime } from "@/components/utils";
export function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  return (
    <div className="fixed top-8 left-8 z-40">
      <p className="text-1xl font-bold text-foreground/90">
        {" "}
        {formatDate(currentTime)}
      </p>
      <p className="text-lg text-muted-foreground">
        {" "}
        {formatTime("2:15 PM", 0)}{" "}
      </p>
    </div>
  );
}
