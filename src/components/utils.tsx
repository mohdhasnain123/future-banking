// export type VoiceNavigationHandlers = {
//   setSelectedCategory?: (category: string) => void;
//   handleVoiceConfirmation?: () => void;
//   selectedCategory?: string;
// };

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  // const day = "15";
  // const month = "July";
  const year = date.getFullYear() + 10;
  const dayName = date.toLocaleString("en-US", { weekday: "short" });
  return `${day} ${month} ${year}, ${dayName}`;
};

export const formatTime = (input: Date | string, incTime?: number): string => {
  if (input instanceof Date) {
    // Format as hh:mm AM/PM
    const hours = input.getHours();
    const minutes = input.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    let displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${formattedMinutes} ${period}`;
  }

  // Legacy string input with incTime
  const timeStr = input;
  incTime = incTime ?? 0;
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format for calculation
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  // Add the minutes
  const totalMinutes = hours * 60 + minutes + incTime;

  // Calculate new hours and minutes
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  // Determine new period (AM/PM)
  const newPeriod = newHours >= 12 ? "PM" : "AM";
  let displayHours = newHours % 12;
  if (displayHours === 0) displayHours = 12;

  // Format the result
  const formattedMinutes = newMinutes.toString().padStart(2, "0");
  return `${displayHours}:${formattedMinutes} ${newPeriod}`;
};

export function buildRouteToStepIndex(steps) {
  const routeToStepIndex = {};
  routeToStepIndex["/"] = 0;
  steps.forEach((step, idx) => {
    if (
      step.type === "navigate" &&
      typeof step.to === "string" &&
      !step.to.includes("?") // Exclude routes with query params
    ) {
      // If last step, use idx; else use idx + 1
      const stepIndex = idx === steps.length - 1 ? idx : idx + 1;
      if (!(step.to in routeToStepIndex)) {
        routeToStepIndex[step.to] = stepIndex;
      }
    }
  });
  return routeToStepIndex;
}
