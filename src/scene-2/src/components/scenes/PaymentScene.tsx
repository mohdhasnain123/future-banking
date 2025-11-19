import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  Mic,
  Shield,
  FileCheck,
  Copy,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/scene-2/src/assets/dashboard-bg.jpg";

export type PaymentStage =
  | "claim-verification"
  | "smart-contract-init"
  | "payment-category"
  | "blockchain-validation"
  | "transferring"
  | "complete";

const steps = [
  { key: "claim-verification", label: "Insurance Claim Verification" },
  { key: "smart-contract-init", label: "Smart Contract Initialization" },
  { key: "payment-category", label: "Select Payment Method" },
  { key: "blockchain-validation", label: "Blockchain Validation" },
  { key: "transferring", label: "Decentralized Fund Transfer" },
  { key: "complete", label: "Payment Complete" },
];

const paymentOptions = ["Cryptocurrency", "CBDC", "Digital Wallet"];

type PaymentSceneProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  stage: PaymentStage;
  setStage: (stage: PaymentStage) => void;
};

const PaymentScene = ({
  selectedCategory,
  setSelectedCategory,
  stage,
  setStage,
}: PaymentSceneProps) => {
  const [transactionHash] = useState<string>("0x01d2...3be656");
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("smart-contract-init"), 2000);
    const timer2 = setTimeout(() => setStage("payment-category"), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const ref = stepRefs.current[stage];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [stage]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 1500);
  };

  useEffect(() => {
    if (stage === "payment-category" && selectedCategory) {
      setTimeout(() => setStage("blockchain-validation"), 800); // 800ms for UX
    }
  }, [selectedCategory, stage, setStage]);

  useEffect(() => {
    if (stage === "blockchain-validation") {
      const timer = setTimeout(() => setStage("transferring"), 2000); // 2s delay
      return () => clearTimeout(timer);
    }
    if (stage === "transferring") {
      const timer = setTimeout(() => setStage("complete"), 2000); // 2s delay
      return () => clearTimeout(timer);
    }
  }, [stage, setStage]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-black"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="aspect-video w-full max-w-[1600px] flex items-center justify-center relative">
        <div className="absolute top-8 left-8 z-20">
          <div className="text-xl font-light text-foreground">
            15th July 2035, Sun
          </div>
          <div className="text-sm text-muted-foreground">03:52 pm</div>
        </div>
        <div className="flex flex-row gap-8 w-full h-full items-stretch justify-center px-8">
          <div className="flex-1 flex flex-col justify-center">
            <div className="backdrop-blur-md bg-card/50 border border-primary/30 rounded-3xl p-12 shadow-2xl text-center animate-glow h-full flex flex-col">
              <div className="border-b border-border/50 backdrop-blur-xl bg-card/30 px-8 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      DeFi Payment Processing
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Insurance Claim Settlement System
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        Network Status
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-foreground">
                          Ethereum Mainnet
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        Gas Fee
                      </div>
                      <div className="text-sm font-medium text-foreground mt-1">
                        0.002 ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-center overflow-y-auto space-y-4 h-[calc(100vh-250px)]">
                <div className="w-full max-w-3xl space-y-3 mx-auto">
                  <div
                    ref={(el) => (stepRefs.current["claim-verification"] = el)}
                    className={`relative backdrop-blur-md bg-card/50 border rounded-2xl p-6 transition-all duration-500 ${
                      stage === "claim-verification"
                        ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-[1.02]"
                        : "border-border/30"
                    }`}
                  >
                    {stage === "claim-verification" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          stage === "claim-verification"
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        {stage === "claim-verification" && (
                          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                        )}
                        {stage === "claim-verification" ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin relative z-10" />
                        ) : (
                          <FileCheck className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            STEP 1
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            Insurance Claim Verification
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Validating pet therapy claim #PT-2035-7891 with
                          insurance provider smart contract
                        </p>
                        {stage === "claim-verification" && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Verifying eligibility and coverage amount...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    ref={(el) => (stepRefs.current["smart-contract-init"] = el)}
                    className={`relative backdrop-blur-md bg-card/50 border rounded-2xl p-6 transition-all duration-500 ${
                      stage === "smart-contract-init"
                        ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-[1.02]"
                        : "border-border/30"
                    }`}
                  >
                    {stage === "smart-contract-init" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          stage === "smart-contract-init"
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        {stage === "smart-contract-init" && (
                          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                        )}
                        {stage === "smart-contract-init" ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin relative z-10" />
                        ) : (
                          <Shield className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            STEP 2
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            Smart Contract Initialization
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Deploying payment escrow on Ethereum blockchain
                        </p>
                        {stage === "smart-contract-init" && (
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-primary font-mono">
                              Gas fees: 0.002 ETH • Contract: 0x742d...3f9a
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    ref={(el) => (stepRefs.current["payment-category"] = el)}
                    className={`relative backdrop-blur-md bg-card/50 border rounded-2xl p-6 transition-all duration-500 ${
                      stage === "payment-category"
                        ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-[1.02]"
                        : "border-border/30"
                    }`}
                  >
                    {stage === "payment-category" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          stage === "payment-category"
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        {stage === "payment-category" && (
                          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                        )}
                        <Mic
                          className={`w-6 h-6 relative z-10 ${
                            stage === "payment-category"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            STEP 3
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            Select Payment Method
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Choose your payment method to proceed
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {paymentOptions.map((category) => (
                            <button
                              key={category}
                              onClick={() =>
                                setSelectedCategory &&
                                setSelectedCategory(category)
                              }
                              className={`px-4 py-3 rounded-lg border transition-all duration-300 font-mono text-sm ${
                                selectedCategory === category
                                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                                  : "border-border/50 bg-background/40 text-muted-foreground hover:border-primary/50"
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    ref={(el) =>
                      (stepRefs.current["blockchain-validation"] = el)
                    }
                    className={`relative backdrop-blur-md bg-card/50 border rounded-2xl p-6 transition-all duration-500 ${
                      stage === "blockchain-validation"
                        ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-[1.02]"
                        : "border-border/30"
                    }`}
                  >
                    {stage === "blockchain-validation" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          stage === "blockchain-validation"
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        {stage === "blockchain-validation" && (
                          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                        )}
                        {stage === "blockchain-validation" ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin relative z-10" />
                        ) : (
                          <Shield className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            STEP 4
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            Blockchain Validation
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Miners confirming transaction on distributed ledger
                        </p>
                        {stage === "blockchain-validation" && (
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-primary font-mono">
                              Block confirmations: 2/3...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    ref={(el) => (stepRefs.current["transferring"] = el)}
                    className={`relative backdrop-blur-md bg-card/50 border rounded-2xl p-6 transition-all duration-500 ${
                      stage === "transferring"
                        ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-[1.02]"
                        : "border-border/30"
                    }`}
                  >
                    {stage === "transferring" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          stage === "transferring"
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        {stage === "transferring" && (
                          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                        )}
                        {stage === "transferring" ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-primary animate-pulse relative z-10" />
                            <div className="absolute inset-0 border-2 border-primary/30 rounded-xl animate-ping" />
                          </div>
                        ) : (
                          <ArrowRight className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            STEP 5
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            Decentralized Fund Transfer
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          150 ETH transferring from insurance escrow to your
                          wallet
                        </p>
                        {stage === "transferring" && (
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span
                              className="text-primary font-mono cursor-pointer bg-primary/20 px-2 py-1 rounded font-bold border border-primary/40 shadow flex items-center gap-1"
                              onClick={handleCopySummary}
                              title="Copy transaction hash"
                              style={{ userSelect: "all" }}
                            >
                              Transaction Hash: {transactionHash}
                              <Copy className="w-4 h-4 ml-1" />
                              {copiedSummary && (
                                <span className="ml-2 text-xs text-primary bg-primary/30 px-2 py-0.5 rounded">
                                  Copied!
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    ref={(el) => (stepRefs.current["complete"] = el)}
                    className={`relative backdrop-blur-md bg-card/50 border rounded-2xl p-6 transition-all duration-500 ${
                      stage === "complete"
                        ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-[1.02]"
                        : "border-border/30"
                    }`}
                  >
                    {stage === "complete" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
                    )}
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          stage === "complete"
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.4)]"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        {stage === "complete" && (
                          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />
                        )}
                        <CheckCircle2
                          className={`w-6 h-6 relative z-10 ${
                            stage === "complete"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            STEP 6
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            Payment Complete
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Funds successfully received and verified
                        </p>
                        {stage === "complete" && (
                          <div className="mt-3 flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-primary font-mono">
                              New balance: 40,150 ETH
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Metamask Wallet Block */}
          <div className="w-[400px] flex flex-col justify-center">
            <div className="relative backdrop-blur-md bg-card/50 border border-primary/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(var(--primary),0.15)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-primary/50" />
                  <h2 className="text-2xl font-bold text-foreground">
                    Metamask Wallet
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    "smart-contract-init",
                    "payment-category",
                    "blockchain-validation",
                    "transferring",
                    "complete",
                  ].includes(stage) && (
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        From
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        0x4fa0...08fc77
                      </div>
                      <button
                        onClick={() => handleCopy("0x4fa0...08fc77")}
                        className="text-muted-foreground hover:text-primary transition"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {[
                    "payment-category",
                    "blockchain-validation",
                    "transferring",
                    "complete",
                  ].includes(stage) && (
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        To (You)
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        0x9fd...e34d
                      </div>
                      <button
                        onClick={() => handleCopy("0x9fd...e34d")}
                        className="text-muted-foreground hover:text-primary transition"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {[
                    "blockchain-validation",
                    "transferring",
                    "complete",
                  ].includes(stage) && (
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Transaction Hash
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {transactionHash}
                      </div>
                      <button
                        onClick={() => handleCopy(transactionHash)}
                        className="text-muted-foreground hover:text-primary transition"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {[
                    "blockchain-validation",
                    "transferring",
                    "complete",
                  ].includes(stage) && (
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Transaction Fee
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        0.001 ETH
                      </div>
                    </div>
                  )}
                  {["transferring", "complete"].includes(stage) && (
                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Received
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        +0.001 ETH
                      </div>
                    </div>
                  )}
                  {stage === "complete" && (
                    <>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Status
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          Success
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Timestamp
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          15th July 2035, Sun 03:52 pm
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Block Number
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          16633644
                        </div>
                        <button
                          onClick={() => handleCopy("16633644")}
                          className="text-muted-foreground hover:text-primary transition"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Block Hash
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          0x660a...58836c
                        </div>
                        <button
                          onClick={() => handleCopy("0x660a...58836c")}
                          className="text-muted-foreground hover:text-primary transition"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Value
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          0.001 ETH
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Transaction Index
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          22921955497
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Gas Price
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          21000
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScene;
