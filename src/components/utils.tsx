import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export type VoiceNavigationHandlers = {
  setSelectedCategory?: (category: string) => void;
  handleVoiceConfirmation?: () => void;
  selectedCategory?: string;
};

export const useVoiceNavigation = (handlers: VoiceNavigationHandlers = {}) => {
  const navigate = useNavigate();

  const commands = useMemo(
    () => [
      { command: /home/, callback: () => navigate("/") },
      { command: /portfolio/, callback: () => navigate("/portfolio") },
      { command: /goals/, callback: () => navigate("/goals") },
      {
        command: /wealth advisor/,
        callback: () => navigate("/wealth-advisor"),
      },
      { command: /book/, callback: () => navigate("/cab-booking") },
      {
        command: /confirm/,
        callback: () => navigate("/cab-booking?showConfirmation=true"),
      },
      {
        command: /tesla/,
        callback: () => navigate("/cab-booking?vehicleSelection=true"),
      },
      {
        command: /schedule/,
        callback: () => navigate("/goals?showCalendar=true"),
      },
      {
        command: /strategic/,
        callback: () => navigate("/wealth-advisor?showStrategic=true"),
      },
      {
        command: /aggressive/,
        callback: () => navigate("/wealth-advisor?showAggressive=true"),
      },
      {
        command: /comparison/,
        callback: () => navigate("/wealth-advisor?showComparison=true"),
      },
      { command: /browse arts/, callback: () => navigate("/browse-arts") },
      { command: /highest bid/, callback: () => navigate("/nft/:id") },
      { command: /accept/, callback: () => navigate("/payment-method") },
      { command: /CBDC/, callback: () => navigate("/payment-processing") },
      { command: /destination/, callback: () => navigate("/destination") },
      { command: /pet/, callback: () => navigate("/petinfo") },
      { command: /payment/, callback: () => navigate("/paymentscene") },
      {
        command: [
          "cryptocurrency",
          "select cryptocurrency",
          "crypto",
          /crypto/,
          /cryptocurrency/,
        ],
        callback: () => {
          if (handlers.setSelectedCategory) {
            handlers.setSelectedCategory("Cryptocurrency");
          }
        },
      },
      {
        command: /authorise/,
        callback: () => {
          if (handlers.selectedCategory && handlers.handleVoiceConfirmation) {
            handlers.handleVoiceConfirmation();
          }
        },
      },
      { command: /dashboard/, callback: () => navigate("/taskdashboard") },
    ],
    [navigate, handlers]
  );

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands });

  useEffect(() => {
    if (transcript) {
      console.log("Speech captured:", transcript);
    }
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => SpeechRecognition.stopListening();
  }, []);

  return { listening, browserSupportsSpeechRecognition, transcript };
};
