import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const useVoiceNavigation = () => {
  const navigate = useNavigate();

  const commands = useMemo(
    () => [
      { command: /home/, callback: () => navigate("/") },
      { command: /portfolio/, callback: () => navigate("/portfolio") },
      { command: /goals/, callback: () => navigate("/goals") },
      { command: /bills/, callback: () => navigate("/bills") },
      { command: /browse arts/, callback: () => navigate("/browse-arts") },
      {
        command: /wealth advisor/,
        callback: () => navigate("/wealth-advisor"),
      },

      { command: /book/, callback: () => navigate("/cab-booking") },
      {
        command: /schedule/,
        callback: () => navigate("/goals?showCalendar=true"),
      },
    ],
    [navigate]
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

  return { listening, browserSupportsSpeechRecognition };
};
