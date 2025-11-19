import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import backgroundImage from "@/scene-2/src/assets/dashboard-bg.jpg";
import nft1 from "../assets/nft1.jpg";

const bids = [
  {
    id: 1,
    amount: 180,
    currency: "eUSD",
    bidder: "Mary (US)",
    isHighest: false,
  },
  {
    id: 2,
    amount: 200,
    currency: "eUSD",
    bidder: "Lisa (India)",
    isHighest: true,
  },
  {
    id: 3,
    amount: 160,
    currency: "eUSD",
    bidder: "Ayaan (India)",
    isHighest: false,
  },
  {
    id: 4,
    amount: 165,
    currency: "eUSD",
    bidder: "Emma (US)",
    isHighest: false,
  },
];

const NFTDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedBid, setSelectedBid] = useState<number | null>(null);

  const handleAcceptBid = (bidId: number) => {
    setSelectedBid(bidId);
    navigate("/payment-method");
  };

  // Calculate highest bid and average market price
  const highestBid = Math.max(...bids.map((b) => b.amount));
  const avgMarketPrice = Math.round(
    bids.reduce((sum, b) => sum + b.amount, 0) / bids.length
  );

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

      <div className="relative z-10 container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* NFT Display */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={nft1}
                alt="Artificial Intelligence Lady"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Artificial Intelligence Lady
              </h2>
              <p className="text-sm text-muted-foreground">
                A futuristic female figure embodies the elegance and power of
                artificial intelligence. Her face is symmetrical and ethereal, a
                seamless blend of human features and advanced machine elements.
              </p>
              <p className="text-lg font-bold text-success">4 Bids</p>
            </div>
          </Card>

          {/* Bids List */}
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              {/* Binance label - more prominent */}
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-base font-bold rounded-full shadow-sm border border-primary">
                Binance
              </span>
              {/* Bid Distribution (small and compact) */}
              <div className="flex gap-1 items-end h-6">
                <div
                  className="w-2 bg-muted rounded-t"
                  style={{ height: "40%" }}
                ></div>
                <div
                  className="w-2 bg-muted rounded-t"
                  style={{ height: "65%" }}
                ></div>
                <div
                  className="w-2 bg-muted rounded-t"
                  style={{ height: "80%" }}
                ></div>
                <div
                  className="w-2 bg-success rounded-t"
                  style={{ height: "100%" }}
                ></div>
              </div>
            </div>
            {/* Highest and Avg Market Price */}
            <div className="flex gap-4 mb-2">
              <div>
                <p className="text-xs text-muted-foreground">Highest Bid</p>
                <p className="text-lg font-bold text-success">
                  {highestBid} eUSD
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Avg. Market Price
                </p>
                <p className="text-lg font-bold text-foreground">
                  {avgMarketPrice} eUSD
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Price Trend</p>
                <p className="text-lg font-semibold text-success">↑ 8.1%</p>
              </div>
            </div>

            {/* Bids */}
            {bids
              .sort((a, b) => b.amount - a.amount)
              .map((bid) => (
                <Card
                  key={bid.id}
                  className={`p-4 ${
                    bid.isHighest ? "border-2 border-success" : ""
                  } transition-all hover:shadow-xl`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {bid.isHighest && (
                        <span className="inline-block px-2 py-0.5 bg-success text-success-foreground text-xs font-semibold rounded-full mb-1">
                          Highest bid
                        </span>
                      )}
                      <p className="text-xl font-bold text-foreground">
                        {bid.amount}{" "}
                        <span className="text-base text-muted-foreground">
                          {bid.currency}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {bid.bidder}
                      </p>
                    </div>
                    <Button
                      className="bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => handleAcceptBid(bid.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
