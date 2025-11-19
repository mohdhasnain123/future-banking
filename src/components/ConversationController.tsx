import React, { useState, useRef, useEffect } from "react";
import { RefObject } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import morning1 from "../assets/audio/morning-1.mp3";
import morning2 from "../assets/audio/morning-2.mp3";
import portfolio1 from "../assets/audio/portfolio-1.mp3";
import portfolio2 from "../assets/audio/portfolio-2.mp3";
import portfolio3 from "../assets/audio/portfolio-3.mp3";
import portfolio4 from "../assets/audio/portfolio-4.mp3";
import goals1 from "../assets/audio/goals-1.mp3";
import goals2 from "../assets/audio/goals-2.mp3";
import goals3 from "../assets/audio/goals-3.mp3";
import goals4 from "../assets/audio/goals-4.mp3";
import goals5 from "../assets/audio/goals-5.mp3";
import goals6 from "../assets/audio/goals-6.mp3";
import wealthAdvisor0 from "@/assets/audio/wealthadvisor-0.mp3";
import wealthAdvisor1 from "../assets/audio/wealthadvisor-1.mp3";
import wealthAdvisor2 from "../assets/audio/wealthadvisor-2.mp3";
import wealthAdvisor3 from "../assets/audio/wealthadvisor-3.mp3";
import wealthAdvisor4 from "../assets/audio/wealthadvisor-4.mp3";
import welcomeScreen from "../assets/audio/welcome.mp3";
import browseArts from "../assets/audio/browsearts.mp3";
import sellArts from "../assets/audio/selldigitalart.mp3";
import highestBid from "../assets/audio/highestbid.mp3";
import cbdc1 from "../assets/audio/CBDC-1.mp3";
import cbdc2 from "../assets/audio/CBDC-2.mp3";
import cbdc3 from "../assets/audio/CBDC-3.mp3";
import cbdc4 from "../assets/audio/CBDC-4.mp3";
import destination1 from "../assets/audio/destination-1.mp3";
import destination2 from "../assets/audio/destination-2.mp3";
import destination3 from "../assets/audio/destination-3.mp3";
import destination4 from "../assets/audio/destination-4.mp3";
import destination5 from "../assets/audio/destination-5.mp3";
import taskCalender from "../assets/audio/taskcalendar.mp3";
import omnichannel from "../assets/audio/omnichannel.mp3";

import kycupdate1 from "../assets/audio/kyc-update-1.mp3";
import kycupdate2 from "../assets/audio/kyc-update-2.mp3";

import pettherapy1 from "../assets/audio/therapy-time-1.mp3";
import pettherapy2 from "../assets/audio/therapy-time-2.mp3";
import { LucideAudioLines, Mic } from "lucide-react";
import { buildRouteToStepIndex } from "./utils";

// Define your conversation steps
const defaultConversationSteps = [
  //scene-1
  // --- Before /portfolio
  {
    type: "dot",
    mp3: morning1,
    text: "Hey Vick! Morning!",
  },
  {
    type: "vick",
    prompt:
      "Oh, hey Dot! Morning. Can we start the day with a quick look at my portfolio?",
    keyword: ["portfolio", "pet therapy", "kyc update"],
  },
  {
    type: "dot",
    mp3: morning2,
    text: "ok, taking you to your portfolio",
  },
  {
    type: "navigate",
    to: "/portfolio",
  },

  // --- Before /goals
  {
    type: "dot",
    mp3: portfolio1,
    text: "Your portfolio has a kind of cool mix of global equities, crypto, and digital real estate.",
  },
  {
    type: "vick",
    prompt: "Cool! Oh! I see one fraud transaction was attempted and failed",
    keyword: "attempted",
  },
  {
    type: "dot",
    mp3: portfolio2,
    text: "Yes, it was detected as this was outside spending pattern",
  },
  {
    type: "navigate",
    to: "/fraud-detected",
  },
  //fraud-detected
  {
    type: "vick",
    prompt: "can you take me back to my portfolio?",
    keyword: "portfolio",
  },
  {
    type: "navigate",
    to: "/portfolio-again",
  },
  //portfolio-again
  // {
  //   type: "vick",
  //   prompt: "Good, my account is safe! What is this agentic mesh?",
  //   keyword: "mesh",
  // },
  // {
  //   type: "navigate",
  //   to: "/agentmesh",
  // },

  // //agentmesh
  // {
  //   type: "dot",
  //   mp3: portfolio3,
  //   text: "The mesh is how I interact with different agents to get the information you need",
  // },
  {
    type: "vick",
    prompt:
      "Ok! Dot, Since some time, I am thinking that  I should buy a house, would like to check on my goals",
    keyword: "goals",
  },
  {
    type: "dot",
    mp3: portfolio4,
    text: "ok, let’s go to your goals",
  },
  {
    type: "navigate",
    to: "/goals",
  },

  // --- Before /wealth-advisor
  {
    type: "vick",
    prompt:
      "Would like to explore house goal, I still need 15000 dollar to achieve this goal, how can it be done faster?",
    keyword: "faster",
  },
  {
    type: "dot",
    mp3: goals1,
    text: "Your wealth advisor can help you here with different options if you are interested in expediting this goal",
  },
  {
    type: "vick",
    prompt: "ok, can you schedule a call with my wealth advisor?",
    keyword: "advisor",
  },
  {
    type: "dot",
    mp3: goals2,
    text: "When do you want to discuss, today or tomorrow?",
  },
  {
    type: "vick",
    prompt: "Preferably today",
    keyword: "today",
  },
  {
    type: "dot",
    mp3: goals3,
    text: "Is after 10am ok?",
  },
  {
    type: "vick",
    prompt: "ok, but should be before 2pm",
    keyword: "2:00 p.m.",
  },
  {
    type: "dot",
    mp3: goals4,
    text: "Let me check with your wealth advisor on his availability, he is available at 11am, is that ok?",
  },
  {
    type: "vick",
    prompt: "will do",
    keyword: "do",
  },
  {
    type: "dot",
    mp3: goals5,
    text: "Scheduling call with your wealth advisor Pat at 11am",
  },
  {
    type: "navigate",
    to: "/goals?showCalendar=true",
  },
  {
    type: "dot",
    mp3: goals6,
    text: "Vick, it's 11 am, connecting you with your Wealth Advisor Pat. Calling Pat",
  },
  {
    type: "vick",
    prompt: "thanks",
    keyword: "thanks",
  },
  {
    type: "navigate",
    to: "/wealth-advisor",
  },

  //wealth-advisor and cab booking
  {
    type: "pat",
    mp4: 0,
    text: "Hi Vick, Pat here,  how are you doing?",
  },
  {
    type: "vick",
    prompt:
      "I am god Pat! I would like to know what can be done with regards to my house goals",
    keyword: "my house goals",
  },
  {
    type: "pat",
    mp4: 1,
    text: "I have run a real-time affordability analysis based on your income, assets, liabilities, and market trends. Here is your complete financial profile.",
  },
  {
    type: "vick",
    prompt: "Ok, so what do you suggest?",
    keyword: "suggest",
  },
  {
    type: "navigate",
    to: "/wealth-advisor?showStrategic=true",
  },
  {
    type: "pat",
    mp4: 2,
    text: "There are different options for you, let me take you through strategic option. In this you will have to take loan and liquidate some of your crypto and NFT assets",
  },
  {
    type: "vick",
    prompt: "What is the other option",
    keyword: "option",
  },
  {
    type: "navigate",
    to: "/wealth-advisor?showAggressive=true",
  },
  {
    type: "pat",
    mp4: 3,
    text: "If you don’t want to take any loan, then you can go with aggressive option, where you will be using your savings and liquidating your assets",
  },
  // {
  //   type: "vick",
  //   prompt: "to get better understanding, can you compare both options for me?",
  //   keyword: "compare",
  // },

  {
    type: "dot",
    mp3: wealthAdvisor0,
    text: "to get better understanding, can you compare both options for me?",
  },
  {
    type: "navigate",
    to: "/wealth-advisor?showComparison=true",
  },
  {
    type: "pat",
    mp4: 4,
    text: "Here is side by side comparision of both the options",
  },
  {
    type: "vick",
    prompt: "Ok, clear now, liquidation looks to be a better option, thank you",
    keyword: "thank you",
  },
  {
    type: "pat",
    mp4: 5,
    text: "Happy to help you, bye",
  },
  {
    type: "vick",
    prompt: "Bye Pat",
    keyword: "Bye",
  },
  {
    type: "dot",
    mp3: wealthAdvisor1,
    text: "Bye Pat! So Vick, you’re going with asset liquidation to hit that house goal. Nice move.",
  },
  {
    type: "navigate",
    to: "/strategy-comparison",
  },
  {
    type: "vick",
    prompt: "Thanks! what can we do next?",
    keyword: "next",
  },
  {
    type: "navigate",
    to: "/cab-booking",
  },
  {
    type: "dot",
    mp3: wealthAdvisor2,
    text: "pet therapy at 3 PM on 13th Street. Then K Y C update at 6 PM—really important, so don’t skip it!",
  },
  {
    type: "vick",
    prompt: "Can you book a cab for pet therapy appointment?",
    keyword: "appointment",
  },
];

const storyTwoSteps = [
  {
    type: "dot",
    mp3: pettherapy1,
    text: "You are approaching the destination, you will reach in 5 minutes…",
  },
  {
    type: "pause",
    duration: 5000, // 5 seconds in milliseconds
  },
  {
    type: "dot",
    mp3: pettherapy2,
    text: "You are approaching the destination, you will reach in 5 minutes…",
  },
  {
    type: "navigate",
    to: "/cab-booking",
  },
  {
    type: "dot",
    mp3: wealthAdvisor2,
    text: "pet therapy at 3 PM on 13th Street. Then K Y C update at 6 PM—really important, so don’t skip it!",
  },
  {
    type: "vick",
    prompt: "Can you book a cab for pet therapy appointment?",
    keyword: "appointment",
  },
  {
    type: "navigate",
    to: "/cab-booking?showConfirmation=true",
  },
  {
    type: "dot",
    mp3: wealthAdvisor3,
    text: "booking  cab… Tesla is booked, will arrive in 5 minutes",
  },
  {
    type: "pause",
    duration: 4000, // 4 seconds in milliseconds
  },
  {
    type: "dot",
    mp3: wealthAdvisor4,
    text: "Vick, cab has arrived, time to go",
  },
  {
    type: "navigate",
    to: "/welcomeScreen",
  },

  {
    type: "vick",
    prompt: "Dot, can I browse my Digital Arts.",
    keyword: "arts",
  },
  {
    type: "dot",
    mp3: welcomeScreen,
    text: "Ok cool… using dashboard screen to display to display N F T's.",
  },
  {
    type: "navigate",
    to: "/browse-arts",
  },

  //browseArts
  {
    type: "vick",
    prompt:
      "there are 4 bids for Artificial Intelligence lady,  can you show me the prices for this bid?",
    keyword: "prices",
  },
  {
    type: "dot",
    mp3: browseArts,
    text: "ok, let me show you the bid prices?",
  },
  {
    type: "navigate",
    to: "/nft/:id",
  },

  //sell-arts
  {
    type: "vick",
    prompt: "Please accept the highest bid.",
    keyword: "highest",
  },
  {
    type: "dot",
    mp3: sellArts,
    text: "processing highest bid",
  },
  {
    type: "navigate",
    to: "/payment-method",
  },
  //payment-method
  {
    type: "dot",
    mp3: highestBid,
    text: "processed, which payment method would you like?",
  },
  {
    type: "vick",
    prompt: "Okay, thank you, please select CBDC Payment",
    keyword: "CBDC Payment",
  },
  {
    type: "navigate",
    to: "/payment-processing",
  },

  //payment-processing
  {
    type: "dot",
    mp3: cbdc4,
    text: "processed, which payment method would you like?",
  },
  {
    type: "pause",
    duration: 10000, // 10 seconds in milliseconds
  },

  {
    type: "dot",
    mp3: cbdc1,
    text: "CBDC payment done",
  },
  {
    type: "vick",
    prompt: "What is the impact on my house goal?",
    keyword: "house goal",
  },
  {
    type: "navigate",
    to: "/house-goal",
  },
  //house-goal
  {
    type: "dot",
    mp3: cbdc2,
    text: "Here are target numbers  for your house goal",
  },
  {
    type: "vick",
    prompt: "Good! How much more time to reach my destination? How far are we?",
    keyword: "far",
  },
  {
    type: "navigate",
    to: "/destination",
  },

  //destination
  {
    type: "dot",
    mp3: cbdc3,
    text: "You are approaching the destination, you will reach in 5 minutes…",
  },
  {
    type: "vick",
    prompt: "Tell me about the pet Julie.",
    keyword: "pet",
  },
  {
    type: "navigate",
    to: "/petinfo",
  },

  //pet-info
  {
    type: "dot",
    mp3: destination1,
    text: "She is a Golden Retriever and her behavioural description. Please be aware.",
  },
  {
    type: "vick",
    prompt: "okay, thanks for the heads up.",
    keyword: "heads",
  },
  {
    type: "dot",
    mp3: destination2,
    text: "Juli is insured, shall I process for payment",
  },
  {
    type: "vick",
    prompt: "okay",
    keyword: "okay",
  },
  {
    type: "navigate",
    to: "/paymentscene",
  },
  //paymentscene
  {
    type: "dot",
    mp3: destination3,
    text: "Processing insurance",
  },

  {
    type: "dot",
    mp3: destination4,
    text: "how would you like to receive the payment?",
  },

  {
    type: "vick",
    prompt: "cryptocurrency",
    keyword: "cryptocurrency",
  },

  {
    type: "pause",
    duration: 5000, // 5 seconds in milliseconds
  },

  {
    type: "dot",
    mp3: destination5,
    text: "Insurance claim settled",
  },

  {
    type: "vick",
    prompt: "what’s my next task?",
    keyword: "task",
  },
  {
    type: "navigate",
    to: "/taskdashboard",
  },
  //taskdashboard
  {
    type: "dot",
    mp3: taskCalender,
    text: "Next you have K-Y-C update at 6 p-m.",
  },
  {
    type: "vick",
    prompt: "Thank you dot, next i will go fro KYC.",
    keyword: "KYC",
  },
];

const storyThreeConversation = [
  {
    type: "dot",
    mp3: kycupdate1,
    text: "You are approaching the destination, you will reach in 5 minutes…",
  },
  {
    type: "pause",
    duration: 5000, // 5 seconds in milliseconds
  },
  {
    type: "dot",
    mp3: kycupdate2,
    text: "You are approaching the destination, you will reach in 5 minutes…",
  },
  {
    type: "navigate",
    to: "/travel-to-bank",
  },

  {
    type: "pat",
    mp4: 6,
    text: "vick video with car and music",
  },

  {
    type: "dot",
    mp3: omnichannel,
    text: "Vick, we have reached the omnichannel banking space",
  },

  {
    type: "vick",
    prompt: "go for KYC",
    keyword: "KYC",
  },
  {
    type: "navigate",
    to: "/bank-select",
  },
];

// Types for steps
type DotStep = { type: "dot"; mp3: string; text: string };
type VickStep = { type: "vick"; prompt: string; keyword: string };
type PatStep = { type: "pat"; mp4: number; text: string };
type NavStep = { type: "navigate"; to: string };
type PauseStep = { type: "pause"; duration: number };
type Step = DotStep | VickStep | PatStep | NavStep | PauseStep;

interface ConversationControllerProps {
  steps?: Step[];
  onSetSelectedCategory?: (category: string) => void;
  onVoiceConfirmation?: () => void;
  videoRefs: React.RefObject<HTMLVideoElement>[];
  videoRef7: RefObject<HTMLVideoElement>;
  videoEndedIndex: number | null;
  setSpeakingState: React.Dispatch<
    React.SetStateAction<{ vick: boolean; dot: boolean }>
  >;
  setClockTargetTime?: (t: { hours: number; minutes: number }) => void;
}

export const ConversationController: React.FC<ConversationControllerProps> = ({
  steps = defaultConversationSteps,
  onSetSelectedCategory,
  videoRefs,
  videoEndedIndex,
  setSpeakingState,
  videoRef7,
  setClockTargetTime,
}) => {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Use local state so we can switch story dynamically
  //const [dynamicSteps, setDynamicSteps] = useState(defaultConversationSteps);

  // 1️⃣ Initialize from sessionStorage (or fallback to default)
  // const [dynamicSteps, setDynamicSteps] = useState(() => {
  //   const saved = sessionStorage.getItem("activeStory");
  //   if (saved === "storyTwo") return storyTwoSteps;
  //   if (saved === "storyThree") return storyThreeConversation;
  //   return defaultConversationSteps;
  // });

  console.log("here init");

  //const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  //let currentStep = dynamicSteps[step];

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    finalTranscript,
  } = useSpeechRecognition({});

  // Build once
  const allStories = {
    default: defaultConversationSteps,
    storyTwo: storyTwoSteps,
    storyThree: storyThreeConversation,
  };

  // 🧠 Build global route map first
  const globalRouteMap: Record<
    string,
    { story: keyof typeof allStories; index: number }
  > = Object.entries(allStories).reduce((acc, [storyName, steps]) => {
    const routeMap = buildRouteToStepIndex(steps);
    for (const path in routeMap) {
      acc[path] = {
        story: storyName as keyof typeof allStories,
        index: routeMap[path],
      };
    }
    return acc;
  }, {});

  // 🔍 Determine initial story from route (soft persistence)
  const initialStory = (() => {
    const match = globalRouteMap[window.location.pathname];
    const routeStory = match ? match.story : "default";
    const saved = sessionStorage.getItem("activeStory") as
      | keyof typeof allStories
      | null;
    return saved && saved === routeStory ? saved : routeStory;
  })();

  // 🧭 Initialize state with correct story
  const [currentStory, setCurrentStory] =
    useState<keyof typeof allStories>(initialStory);
  const [dynamicSteps, setDynamicSteps] = useState(allStories[initialStory]);

  const replaceStory = (story: keyof typeof allStories) => {
    if (story === currentStory) return; // prevent redundant reload
    const newSteps = allStories[story];
    setDynamicSteps(newSteps);
    setCurrentStory(story);
    sessionStorage.setItem("activeStory", story);
    setStep(0);
  };

  // Set step based on route
  useEffect(() => {
    console.log("location=", location.pathname);

    if (location.pathname === "/") {
      replaceStory("default");
    } else {
      const match = globalRouteMap[location.pathname];
      console.log("match=", match);
      if (!match) return;
      const { story, index } = match;

      if (story !== currentStory) {
        // Switch story automatically
        replaceStory(story);
      }

      //const idx = routeToStepIndex[location.pathname];
      if (typeof index === "number" && index !== step) {
        setStep(index);
      }
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  // Play Dot's mp3 when step is a dot step and conversation has started and not paused
  useEffect(() => {
    console.log("useeffect 1 =");
    const current = dynamicSteps[step];
    if (!started || !current) return;
    console.log("useeffect 1 =", dynamicSteps[step]?.type);
    SpeechRecognition.stopListening();

    setSpeakingState({ vick: false, dot: false });
    if (
      started &&
      !paused &&
      dynamicSteps[step]?.type === "dot" &&
      audioRef.current
    ) {
      console.log("dot play");
      setSpeakingState({ vick: false, dot: true });
      audioRef.current.play().catch(() => {});
    }

    if (started && !paused && dynamicSteps[step]?.type === "pat") {
      resetTranscript();
      console.log("in pat=", videoEndedIndex);
      console.log("in pat mp4=", dynamicSteps[step].mp4);
      if (current.mp4 === 6) {
        videoRef7.current.play().catch(() => {});
      } else {
        videoRefs[current.mp4].current.play().catch(() => {});
      }
    }
    // Stop listening if not Vick's turn or paused
    if (dynamicSteps[step]?.type !== "vick" || paused) {
      SpeechRecognition.stopListening();
      resetTranscript();
    }

    if (dynamicSteps[step]?.type === "vick") {
      console.log("vick speaking");
      SpeechRecognition.startListening({ continuous: true });
      setSpeakingState({ vick: true, dot: false });
    }

    // eslint-disable-next-line
  }, [step, started]);

  //Pause/resume audio when paused state changes
  useEffect(() => {
    if (audioRef.current) {
      if (paused) {
        audioRef.current.pause();
        console.log("Conversation paused");
      } else if (started && dynamicSteps[step]?.type === "dot") {
        setSpeakingState({ vick: false, dot: true });
        audioRef.current.play().catch(() => {});
        console.log("Conversation resumed (play)");
      }
    }
    // eslint-disable-next-line
  }, [paused]);

  // When Dot's mp3 ends, move to next step
  const handleAudioEnd = () => {
    console.log("handle audio end");
    setStep((s) => Math.min(s + 1, dynamicSteps.length - 1));
  };

  useEffect(() => {
    if (videoEndedIndex !== null) {
      console.log(
        `🎯 ConversationController: video ${videoEndedIndex + 1} ended`
      );
      // Example: auto-navigate, show popup, or update chat here
      console.log("ConversationController noticed: video ended!");
      setStep((s) => Math.min(s + 1, dynamicSteps.length - 1));
    }
  }, [videoEndedIndex]);

  // When Vick speaks, move to next step ONLY if keyword is present
  useEffect(() => {
    console.log("final transcript =", finalTranscript);
    console.log("paused=", paused);
    console.log("currentstep.type = ", dynamicSteps[step]?.type);

    console.log("keyword =", dynamicSteps[step]);

    if (!paused && finalTranscript) {
      console.log("inside final transcript");
      const said = finalTranscript.toLowerCase();

      const isMultiKeyword = 1;

      if (step === 1) {
        console.log("inside step 1=", isMultiKeyword);
        if (isMultiKeyword) {
          const keywords = Array.isArray(dynamicSteps[step].keyword)
            ? dynamicSteps[step].keyword
            : [dynamicSteps[step].keyword];

          const matchedKeyword = keywords.find((kw) =>
            said.includes(kw.toLowerCase())
          );
          console.log("matched keyword=", matchedKeyword);

          if (matchedKeyword) {
            console.log("🎯 Matched keyword:", matchedKeyword);

            if (matchedKeyword === "pet therapy") {
              console.log("→ Switching to storyTwoSteps");
              replaceStory("storyTwo");
              // setDynamicSteps(storyTwoSteps);
              // setStep(0);
            } else if (matchedKeyword === "kyc update") {
              console.log("→ Switching to storyThreeConversation");
              replaceStory("storyThree");
              //setDynamicSteps(storyThreeConversation);

              //setStep(0);
              //setTimeout(() => setStep(0), 0);
            } else if (matchedKeyword === "portfolio") {
              console.log("→ Continuing in defaultConversationSteps");
              setStep((s) => Math.min(s + 1, dynamicSteps.length - 1));
            }

            SpeechRecognition.stopListening();
            resetTranscript();
            return;
          }
        }
      }

      // 🔹 Default single-keyword logic
      else if (
        typeof dynamicSteps[step].keyword === "string" &&
        said.includes(dynamicSteps[step].keyword.toLowerCase())
      ) {
        // 🔹 Special handling for Cryptocurrency keyword
        if (
          dynamicSteps[step].keyword.toLowerCase() === "cryptocurrency" &&
          typeof onSetSelectedCategory === "function"
        ) {
          onSetSelectedCategory("Cryptocurrency");
          console.log("✅ Called onSetSelectedCategory('Cryptocurrency')");
        }
        console.log("🎯 Matched single keyword:", dynamicSteps[step].keyword);
        setStep((s) => Math.min(s + 1, dynamicSteps.length - 1));
        SpeechRecognition.stopListening();
        resetTranscript();
        return;
      }
    }
  }, [finalTranscript, dynamicSteps[step], resetTranscript, paused]);

  // Handles pause step
  useEffect(() => {
    if (started && !paused && dynamicSteps[step]?.type === "pause") {
      const timer = setTimeout(() => {
        setStep((s) => Math.min(s + 1, dynamicSteps.length - 1));
      }, dynamicSteps[step].duration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dynamicSteps[step], started, paused]);

  // Handle navigation step
  useEffect(() => {
    console.log("useffect 6=", dynamicSteps[step]?.type);
    console.log("useffect 6=", location.pathname);
    console.log("useffect 6=", dynamicSteps[step].to);
    if (
      started &&
      dynamicSteps[step]?.type === "navigate" &&
      location.pathname !== dynamicSteps[step].to
    ) {
      console.log("inside useffect 6");
      navigate(dynamicSteps[step].to);
      setStep((s) => Math.min(s + 1, dynamicSteps.length - 1));
      setStarted(true); // Auto-start after navigation
      setPaused(false); // Auto-unpause after navigation
      console.log("Conversation auto-resumed after navigation");
    }
    // eslint-disable-next-line
  }, [dynamicSteps[step], location.pathname, navigate, started]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("useeffect arrow key conversation");

      if (e.key === "ArrowRight") {
        setStep((s) => Math.min(s + 1, 400));
      } else if (e.key === "ArrowLeft") {
        console.log("not allowed");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click on upper half: start or toggle pause
  const handleScreenClick = () => {
    console.log("screen click");
    if (!started) {
      setStarted(true);
      setPaused(false);
      console.log("Conversation started");
    } else {
      setPaused((prev) => {
        const newPaused = !prev;
        if (newPaused) {
          console.log("Conversation paused (by user)");
        } else {
          console.log("Conversation resumed (by user)");
        }
        return newPaused;
      });
    }
  };

  const firstPauseTriggeredStoryTwo = useRef(false);
  const firstPauseTriggeredStoryThree = useRef(false);

  useEffect(() => {
    const currentStep = dynamicSteps[step];
    // For storyThreeConversation
    if (
      dynamicSteps === storyThreeConversation &&
      currentStep?.type === "pause" &&
      !firstPauseTriggeredStoryThree.current
    ) {
      setClockTargetTime?.({ hours: 17, minutes: 30 });
      firstPauseTriggeredStoryThree.current = true;
    }

    // For storyTwoSteps
    if (
      dynamicSteps === storyTwoSteps &&
      currentStep?.type === "pause" &&
      !firstPauseTriggeredStoryTwo.current
    ) {
      setClockTargetTime?.({ hours: 14, minutes: 15 });
      firstPauseTriggeredStoryTwo.current = true;
    }
  }, [dynamicSteps[step], setClockTargetTime]);

  useEffect(() => {
    if (dynamicSteps !== storyThreeConversation) {
      firstPauseTriggeredStoryThree.current = false;
    }
    if (dynamicSteps !== storyTwoSteps) {
      firstPauseTriggeredStoryTwo.current = false;
    }
  }, [dynamicSteps]);

  // Render only the audio, no text, clickable upper half
  return (
    <>
      {/* Status indicator floating over the page */}
      {browserSupportsSpeechRecognition && (
        <div
          style={{
            position: "fixed", // <-- This makes it float over the page
            top: 270,
            right: 20,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.7rem",
            borderRadius: "8px",
            padding: "4px 10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            // background: "rgba(255,255,255,0.8)", // Optional: makes it readable over any background
            zIndex: 2000, // Ensures it appears above most elements
          }}
          onClick={handleScreenClick}
          title={
            !started
              ? "Click to start conversation"
              : paused
              ? "Click to resume"
              : "Click to pause"
          }
        >
          {listening ? (
            <>
              <Mic
                className="w-3 h-3"
                style={{ color: "#22c55e", animation: "pulse 1s infinite" }}
              />
              <span>Listening...</span>
            </>
          ) : (
            <>
              <LucideAudioLines
                className="w-3 h-3"
                style={{ color: "#3b82f6" }}
              />
              <span>Dot</span>
            </>
          )}
        </div>
      )}

      {/* Audio playback (does not affect layout) */}
      {started && dynamicSteps[step]?.type === "dot" && (
        <audio
          ref={audioRef}
          src={dynamicSteps[step].mp3}
          onEnded={handleAudioEnd}
          autoPlay
        />
      )}
    </>
  );
};
