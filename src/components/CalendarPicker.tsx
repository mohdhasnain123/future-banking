import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const CalendarPicker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  
  const currentDate = date || new Date();
  const dayNumber = currentDate.getDate();
  const monthName = currentDate.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "group relative cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95",
            "perspective-1000"
          )}
          style={{ perspective: "1000px" }}
        >
          {/* 3D Calendar Card */}
          <div 
            className="relative w-20 h-24 transition-transform duration-300 group-hover:rotate-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Calendar shadow */}
            <div className="absolute inset-0 bg-black/40 blur-xl transform translate-y-2 scale-95" />
            
            {/* Calendar body */}
            <div className="relative glass-card border-2 border-white/30 rounded-2xl overflow-hidden shadow-2xl">
              {/* Top red strip (like physical calendars) */}
              <div className="h-6 bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-white/80 rounded-full" />
                  <div className="w-1 h-3 bg-white/80 rounded-full" />
                </div>
              </div>
              
              {/* Month label */}
              <div className="bg-white/95 px-2 py-1">
                <p className="text-[10px] font-bold text-gray-700 text-center tracking-wider">
                  {monthName}
                </p>
              </div>
              
              {/* Day number */}
              <div className="bg-white px-2 py-3 flex items-center justify-center">
                <p className="text-3xl font-bold text-gray-800 leading-none">
                  {dayNumber}
                </p>
              </div>
            </div>
            
            {/* 3D depth effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"
              style={{ transform: "translateZ(2px)" }}
            />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass-panel" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            setOpen(false);
          }}
          initialFocus
          className="p-3 pointer-events-auto text-white"
        />
      </PopoverContent>
    </Popover>
  );
};
