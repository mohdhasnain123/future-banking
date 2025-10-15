import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle, X, ArrowLeft, ArrowRight } from "lucide-react";
import backgroundImage from "../assets/background.jpg";
import paymentMapImage from "../assets/payment-map.jpg";

const transactions = [
  { label: "Received", time: "Today at 02:15pm", amount: "+200" },
  { label: "Sent", time: "Today at 08:15am", amount: "-234.88" },
  { label: "Sent", time: "Yesterday at 09:15pm", amount: "-80.00" },
  { label: "Sent", time: "Yesterday at 03:15pm", amount: "-673.22" },
];

export default function PaymentProcessing() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"processing" | "received" | "wallet">("processing");

  useEffect(() => {
    if (stage !== "processing") return;
    const timer = setTimeout(() => {
      setStage("received");
    }, 3000);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      <DateTimeDisplay />
      <MapWidget />

      <div className="relative z-10 container mx-auto px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-primary mb-4">
              CBDC Cross-Border Payment
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Instant, secure payment using CBDCs between USA and India
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sender Info */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Sender (India)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">Lisa</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold text-primary">₹16,580 eINR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Currency</p>
                  <p className="font-semibold text-foreground">Indian Digital Rupee</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Wallet ID</p>
                  <p className="text-xs font-mono text-foreground">0x9f2c...8a1b</p>
                </div>
              </div>
            </div>

            {/* Blockchain Processing */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-primary/30">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Blockchain Network
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <p className="text-sm text-foreground">Transaction Initiated</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <p className="text-sm text-foreground">Smart Contract Execution</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <p className="text-sm text-foreground">Currency Conversion</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${stage === "received" ? "bg-success" : "bg-muted"} rounded-full ${stage === "received" ? "animate-pulse" : ""}`}></div>
                  <p className={`text-sm ${stage === "received" ? "text-success" : "text-muted-foreground"}`}>Cross-Border Validation</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${stage === "received" ? "bg-success" : "bg-muted"} rounded-full ${stage === "received" ? "animate-pulse" : ""}`}></div>
                  <p className={`text-sm ${stage === "received" ? "text-success" : "text-muted-foreground"}`}>Transfer Complete</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Block Height</p>
                  <p className="text-sm font-mono text-foreground">#8,429,312</p>
                  <p className="text-xs text-muted-foreground mt-2">Gas Fee</p>
                  <p className="text-sm font-mono text-foreground">0.0001 eUSD</p>
                </div>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Receiver (USA)</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold text-foreground">Vick</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Receiving Amount</p>
                    <p className="text-2xl font-bold text-success">200 eUSD</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Currency</p>
                    <p className="font-semibold text-foreground">US Digital Dollar</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Exchange Rate</p>
                    <p className="text-sm font-semibold text-foreground">1 eUSD = 82.9 eINR</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="bg-success hover:bg-success/90 text-success-foreground w-full"
                  onClick={() => setStage("wallet")}
                >
                  View Wallet
                </Button>
              </div>
            </div>
          </div>

          {/* Visual Payment Flow - Status inside the map */}
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-card/50 backdrop-blur-sm">
            <img
              src={paymentMapImage}
              alt="Payment Processing Map"
              className="w-full h-auto opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2 animate-pulse">
                    <span className="text-2xl">🇮🇳</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">India</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-primary animate-pulse"></div>
                    {stage === "processing" ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-success" />
                    )}
                    <div className="w-8 h-1 bg-primary animate-pulse"></div>
                  </div>
                  <div className="mt-2">
                    {stage === "processing" ? (
                      <span className="text-primary font-semibold text-lg animate-pulse">Receiving...</span>
                    ) : (
                      <span className="text-success font-bold text-lg flex items-center gap-1">
                        <CheckCircle className="w-5 h-5" /> Received!
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-2 animate-pulse">
                    <span className="text-2xl">🇺🇸</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">USA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Processing time: ~2-3 seconds • Blockchain secured • Zero intermediaries</p>
          </div>
        </div>
      </div>

      {/* Wallet Details Overlay */}
      {stage === "wallet" && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm overflow-y-auto">
            <div className="max-w-2xl w-full mx-4 my-8 space-y-6">
              <Card className="p-8 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => setStage("received")}
                >
                  <X className="w-5 h-5" />
                </Button>
                <h3 className="text-2xl font-bold text-foreground mb-6">CBDC Wallet</h3>
                
                <div className="bg-success/20 rounded-xl p-6 mb-6">
                  <p className="text-5xl font-bold text-foreground mb-2">
                    44,767 <span className="text-2xl text-muted-foreground">eUSD</span>
                  </p>
                  <p className="text-muted-foreground">Wallet Balance</p>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{tx.label}</p>
                        <p className="text-sm text-muted-foreground">{tx.time}</p>
                      </div>
                      <p
                        className={`text-xl font-bold ${
                          tx.amount.startsWith("+") ? "text-success" : "text-foreground"
                        }`}
                      >
                        {tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Left Arrow - Always fixed at bottom left */}
      <div className="fixed bottom-8 left-8 z-[100]">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={() => navigate("/payment-method")}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </Button>
      </div>

      {/* Right Arrow - Always fixed at bottom right */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={() => navigate("/destination")}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}