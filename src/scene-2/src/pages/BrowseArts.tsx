import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import { NFTCard } from "../components/NFTCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import backgroundImage from "@/scene-2/src/assets/background.jpg";
import nft1 from "@/scene-2/src/assets/nft1.jpg";
import nft2 from "@/scene-2/src/assets/nft2.jpg";
import nft3 from "@/scene-2/src/assets/nft3.jpg";
import nft4 from "@/scene-2/src/assets/nft4.jpg";
import nft5 from "@/scene-2/src/assets/nft5.jpg";
import nft6 from "@/scene-2/src/assets/nft6.jpg";

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

const BrowseArts = ({
  listening,
  browserSupportsSpeechRecognition,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const navigate = useNavigate();
  const nftWithBids = nfts.find((nft) => nft.id === 1);

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
        <h2 className="text-4xl font-bold text-foreground mb-8">NFTs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              {...nft}
              onClick={() => {
                if (nft.bids > 0) {
                  navigate(`/nft/${nft.id}`);
                }
              }}
            />
          ))}
        </div>

        {nftWithBids && (
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-success hover:bg-success/90 text-success-foreground font-semibold"
              onClick={() => navigate(`/nft/${nftWithBids.id}`)}
            >
              Sell
            </Button>
          </div>
        )}

        <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8 z-20">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => navigate(`/nft/${nftWithBids?.id}`)}
          >
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseArts;
