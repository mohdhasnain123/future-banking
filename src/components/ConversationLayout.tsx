// ConversationLayout.jsx
import { Outlet } from "react-router-dom";
import { ConversationController } from "./ConversationController";

export default function ConversationLayout({
  onSetSelectedCategory,
  videoRefs,
  videoEndedIndex,
  setSpeakingState,
  videoRef7,
  clockTargetTime,
  setClockTargetTime,
}) {
  return (
    <>
      <ConversationController
        onSetSelectedCategory={onSetSelectedCategory}
        videoRefs={videoRefs}
        videoEndedIndex={videoEndedIndex}
        setSpeakingState={setSpeakingState}
        videoRef7={videoRef7}
        setClockTargetTime={setClockTargetTime}
      />

      <Outlet />
    </>
  );
}
