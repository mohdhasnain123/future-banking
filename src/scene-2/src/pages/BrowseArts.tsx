import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import { NFTCard } from "../components/NFTCard";
import backgroundImage from "@/scene-2/src/assets/dashboard-bg.jpg";
import nft1 from "@/scene-2/src/assets/nft1.jpg";
import nft2 from "@/scene-2/src/assets/nft2.jpg";
import nft3 from "@/scene-2/src/assets/nft3.jpg";
import nft4 from "@/scene-2/src/assets/nft4.jpg";
import nft5 from "@/scene-2/src/assets/nft5.jpg";
import nft6 from "@/scene-2/src/assets/nft6.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const nfts = [
  {
    id: 1,
    title: "Artificial Intelligence Lady",
    description:
      "A futuristic female figure embodies the elegance and power of artificial intelligence.",
    image: nft1,
    bids: 4,
  },
  {
    id: 2,
    title: "A Man with Super Power",
    description: "A Man who has lot of super power",
    image: nft2,
    bids: 0,
  },
  {
    id: 3,
    title: "The Nature with Colors",
    description: "A Beautiful nature with storm",
    image: nft3,
    bids: 0,
  },
  {
    id: 4,
    title: "Cloud with Bold Colors",
    description: "Man enjoying the clouds of game",
    image: nft4,
    bids: 0,
  },
  {
    id: 5,
    title: "A Lady with Nature",
    description: "Woman is equivalent to nature",
    image: nft5,
    bids: 1,
  },
  {
    id: 6,
    title: "Nature talks everything",
    description: "Nature tells lot of good things",
    image: nft6,
    bids: 0,
  },
];

const BrowseArts = () => {
  const navigate = useNavigate();
  const nftWithBids = nfts.find((nft) => nft.id === 1);
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [glowingIndex, setGlowingIndex] = useState(0);
  const [glowStopped, setGlowStopped] = useState(false);

  // Cycle through NFT cards for glowing effect when no card is selected
  useEffect(() => {
    if (!selectedNFT && !glowStopped) {
      if (glowingIndex < nfts.length - 1) {
        const interval = setInterval(() => {
          setGlowingIndex((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
      } else if (glowingIndex === nfts.length - 1) {
        // After last card, wait, then reset to first and stop cycling
        const timeout = setTimeout(() => {
          setGlowingIndex(0);
          setGlowStopped(true); // Stop further cycling
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [selectedNFT, glowingIndex, nfts.length, glowStopped]);

  useEffect(() => {
    if (selectedNFT) {
      setGlowStopped(false);
    }
  }, [selectedNFT]);

  // Optionally, also reset when goals list changes
  useEffect(() => {
    setGlowingIndex(0);
    setGlowStopped(false);
  }, [nfts.length]);

  return (
    <div
      className="min-h-screen relative pb-32"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      <DateTimeDisplay />
      <MapWidget />
      <div className="relative z-10 container mx-auto px-8 pt-32">
        <h2 className="text-4xl font-bold text-foreground mb-8 drop-shadow-lg">
          NFTs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nfts.map((nft, index) => {
            const isGlowing = selectedNFT
              ? selectedNFT === nft.id
              : index === glowingIndex;
            return (
              <div
                key={nft.id}
                className={`transition-all duration-300 h-full flex${
                  isGlowing
                    ? "animate-glow-border rounded-lg" : "border border-white/10 rounded-lg"
                }`}
                style={isGlowing ? { boxShadow: "0 0 20px 5px #3a338aff, 0 0 50px 20px #426bbdff" } : {}}
              >
                <NFTCard
                  {...nft}
                  onClick={() => {
                    setSelectedNFT(nft.id);
                    if (nft.bids > 0) {
                      navigate(`/nft/${nft.id}`);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseArts;
