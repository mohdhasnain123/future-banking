import { useEffect, useState } from "react";
import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, ArrowRight, Clipboard, Mic } from "lucide-react";
import backgroundImage from "../assets/background.jpg";

const stepLabels = [
  "User Initiates Transfer",
  "RBI Validates",
  "Atomic Swap Execution",
  "Fed Validates",
  "Instant Receipt",
];

const PaymentProcessing = ({
  listening,
  browserSupportsSpeechRecognition = false,
}: {
  listening?: boolean;
  browserSupportsSpeechRecognition?: boolean;
}) => {
  const [step, setStep] = useState(1); // 1-5 steps

  // Animate step progression
  useEffect(() => {
    if (step < 5) {
      const timer = setTimeout(() => setStep(step + 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Wallet ID copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Helper for step highlighting
  const getStepClass = (currentStep: number) =>
    step === currentStep
      ? "border-primary shadow-lg scale-105 bg-primary/10"
      : "border-border opacity-70";

  // Helper for step badge
  const getBadgeClass = (currentStep: number) =>
    step === currentStep
      ? "bg-primary text-primary-foreground scale-110"
      : "bg-success text-success-foreground";

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

      {/* Top right microphone status */}
      {browserSupportsSpeechRecognition && (
        <div className="absolute top-6 right-8 z-20">
          <div className="flex items-center gap-2 text-sm text-white/70 ml-4">
            <Mic
              className={`w-5 h-5 ${
                listening ? "text-green-400 animate-pulse" : ""
              }`}
            />
            <span>{listening ? "Listening..." : "Mic off"}</span>
          </div>
        </div>
      )}

      <DateTimeDisplay />
      <MapWidget />

      <div className="relative z-10 container mx-auto px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-foreground mb-2">
              India 🇮🇳 to USA 🇺🇸 CBDC Cross-Border Transfer
            </h2>
            <p className="text-lg text-muted-foreground">
              Direct Central Bank to Central Bank Settlement via mBridge Protocol
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="flex justify-center mb-6">
            {stepLabels.map((label, idx) => (
              <div key={label} className="flex items-center">
                <div
                  className={`rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg transition-all duration-300
                    ${step === idx + 1 ? "bg-primary text-primary-foreground shadow-lg scale-110" : "bg-muted text-muted-foreground opacity-70"}
                  `}
                >
                  {idx + 1}
                </div>
                {idx < stepLabels.length - 1 && (
                  <div
                    className={`h-2 w-12 mx-2 rounded-full transition-all duration-300
                      ${step > idx + 1 ? "bg-primary" : "bg-muted-foreground/30"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* India (Sender) Column */}
            <div className="space-y-4">
              <div className="text-center bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-primary">
                <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                  🇮🇳 INDIA
                </h3>
                <p className="text-sm text-muted-foreground">Reserve Bank of India</p>
              </div>

              {/* Step 1 */}
              <div className={`bg-card/80 rounded-xl p-4 border transition-all duration-300 ${getStepClass(1)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${getBadgeClass(1)}`}>
                    1
                  </div>
                  <h4 className="text-sm font-bold text-foreground">User Initiates Transfer</h4>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-primary/50">
                <h4 className="text-base font-bold text-foreground mb-3">Sender Wallet</h4>
                <p className="text-xs text-muted-foreground mb-1">Mumbai, India</p>
                <div className="bg-primary/10 rounded-lg p-3 mb-3">
                  <p className="text-xs text-muted-foreground">Sending Amount:</p>
                  <p className="text-2xl font-bold text-primary">₹16,624</p>
                  <p className="text-xs text-muted-foreground">Digital Rupee (e-₹)</p>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Wallet ID</p>
                    <p className="text-xs font-mono text-foreground">0x9f2c...8a1b</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copyToClipboard("0x9f2c...8a1b")}
                  >
                    <Clipboard className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <h4 className="text-sm font-bold text-foreground mb-3">RBI CBDC System</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-secondary/50 rounded p-2">
                    <p className="text-[10px] text-muted-foreground">KYC</p>
                    <p className="text-xs font-semibold text-foreground">Verify</p>
                  </div>
                  <div className="bg-secondary/50 rounded p-2">
                    <p className="text-[10px] text-muted-foreground">Balance</p>
                    <p className="text-xs font-semibold text-foreground">Check</p>
                  </div>
                  <div className="bg-secondary/50 rounded p-2">
                    <p className="text-[10px] text-muted-foreground">AML</p>
                    <p className="text-xs font-semibold text-foreground">Screen</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`bg-card/80 rounded-xl p-4 border transition-all duration-300 ${getStepClass(2)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${getBadgeClass(2)}`}>
                    2
                  </div>
                  <h4 className="text-sm font-bold text-foreground">RBI Validates</h4>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-primary/50">
                <h4 className="text-sm font-bold text-foreground mb-2">Digital Rupee Ledger</h4>
                <p className="text-xs text-success">Transaction: e-₹16,624 → mBridge</p>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-primary/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">FEMA Compliance</h4>
                    <p className="text-[10px] text-muted-foreground">Foreign Exchange Management Act</p>
                  </div>
                </div>
              </div>
            </div>

            {/* mBridge Protocol (Center) Column */}
            <div className="space-y-4">
              <div className="text-center bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm rounded-xl p-4 border border-primary">
                <h3 className="text-xl font-bold text-primary flex items-center justify-center gap-2">
                  {step === 3 ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : step > 3 ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : null}
                  ⚡ mBridge Protocol
                </h3>
                <p className="text-xs text-muted-foreground">Multi-CBDC Interoperability Platform</p>
                <p className="text-[10px] text-muted-foreground">Bank for International Settlements (BIS)</p>
              </div>

              {/* Step 3 */}
              <div className={`bg-card/80 rounded-xl p-4 border transition-all duration-300 ${getStepClass(3)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${getBadgeClass(3)}`}>
                    3
                  </div>
                  <h4 className="text-sm font-bold text-primary">Atomic Swap Execution</h4>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm rounded-xl p-5 border border-primary/50">
                <h4 className="text-base font-bold text-foreground mb-4 text-center">Smart Contract Engine</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-3 border border-primary/30">
                    <p className="text-xs text-muted-foreground mb-1">Input: e-₹</p>
                    <p className="text-xl font-bold text-primary">₹16,624</p>
                  </div>
                  <div className="bg-success/20 backdrop-blur-sm rounded-lg p-3 border border-success/30">
                    <p className="text-xs text-muted-foreground mb-1">Output: USD</p>
                    <p className="text-xl font-bold text-success">$200</p>
                  </div>
                </div>
                <div className="flex justify-center my-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 backdrop-blur-sm rounded-xl p-4 border border-primary/30">
                <h4 className="text-sm font-bold text-center text-foreground mb-2">Real-time Exchange Rate</h4>
                <p className="text-2xl font-bold text-center text-primary">1 USD = ₹83.12</p>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <h4 className="text-sm font-bold text-foreground mb-3">Distributed Ledger Technology</h4>
                <div className="flex items-center justify-between gap-2">
                  {[1, 2, 3, 4].map((node) => (
                    <div key={node} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
                        <p className="text-xs font-bold text-success">N{node}</p>
                      </div>
                      <p className="text-[9px] text-muted-foreground mt-1">Node {node}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <h4 className="text-sm font-bold text-foreground mb-3">Security & Compliance</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-foreground">Quantum-resistant encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-foreground">Multi-signature authorization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-foreground">Atomic transaction guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-foreground">Real-time AML screening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-foreground">FATF compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-success" />
                    <span className="text-foreground">Instant settlement</span>
                  </div>
                </div>
              </div>

              <div className="bg-success/20 backdrop-blur-sm rounded-xl p-4 border border-success text-center">
                <p className="text-xs font-bold text-success mb-1">⚡ Settlement Time: 3-5 seconds</p>
                <p className="text-[10px] text-muted-foreground">(vs 2-5 days traditional banking)</p>
              </div>
            </div>

            {/* USA (Receiver) Column */}
            <div className="space-y-4">
              <div className="text-center bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-success">
                <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                  🇺🇸 USA
                </h3>
                <p className="text-sm text-muted-foreground">Federal Reserve</p>
              </div>

              {/* Step 4 */}
              <div className={`bg-card/80 rounded-xl p-4 border transition-all duration-300 ${getStepClass(4)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${getBadgeClass(4)}`}>
                    4
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Fed Validates</h4>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <h4 className="text-sm font-bold text-foreground mb-3">FedNow CBDC System</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-secondary/50 rounded p-2">
                    <p className="text-[10px] text-muted-foreground">Verify</p>
                    <p className="text-xs font-semibold text-foreground">Identity</p>
                  </div>
                  <div className="bg-secondary/50 rounded p-2">
                    <p className="text-[10px] text-muted-foreground">Credit</p>
                    <p className="text-xs font-semibold text-foreground">Account</p>
                  </div>
                  <div className="bg-secondary/50 rounded p-2">
                    <p className="text-[10px] text-muted-foreground">OFAC</p>
                    <p className="text-xs font-semibold text-foreground">Check</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-success/50">
                <h4 className="text-sm font-bold text-foreground mb-2">Digital Dollar Ledger</h4>
                <p className="text-xs text-success">Transaction: mBridge → $200 USD</p>
              </div>

              {/* Step 5 */}
              <div className={`bg-card/80 rounded-xl p-4 border transition-all duration-300 ${getStepClass(5)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${getBadgeClass(5)}`}>
                    5
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Instant Receipt</h4>
                </div>
              </div>

              {/* Receiver Wallet (inline, not popup) */}
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-success/50">
                <h4 className="text-base font-bold text-foreground mb-3">Receiver Wallet</h4>
                <p className="text-xs text-muted-foreground mb-1">New York, USA</p>
                <div className="bg-success/10 rounded-lg p-3 mb-3">
                  <p className="text-xs text-muted-foreground">Received Amount:</p>
                  <p className="text-2xl font-bold text-success">$200</p>
                  <p className="text-xs text-muted-foreground">Digital USD</p>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Wallet ID</p>
                    <p className="text-xs font-mono text-foreground">0x7a3d...5c2e</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copyToClipboard("0x7a3d...5c2e")}
                  >
                    <Clipboard className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-success/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">FinCEN Compliance</h4>
                    <p className="text-[10px] text-muted-foreground">Financial Crimes Enforcement Network</p>
                  </div>
                </div>
              </div>

              <div className="bg-success/20 backdrop-blur-sm rounded-xl p-4 border border-success text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <p className="text-sm font-bold text-success">Transfer Complete</p>
                </div>
                <p className="text-xs text-muted-foreground">Funds available immediately</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-destructive/20 backdrop-blur-sm rounded-xl p-4 border border-destructive/30">
              <h4 className="text-sm font-bold text-foreground mb-2">Traditional Wire: 2-5 days</h4>
              <p className="text-xs text-muted-foreground">• $25-50 fees • Correspondent banks • Limited hours</p>
            </div>
            <div className="bg-success/20 backdrop-blur-sm rounded-xl p-4 border border-success/30">
              <h4 className="text-sm font-bold text-foreground mb-2">CBDC Transfer: 3-5 seconds</h4>
              <p className="text-xs text-muted-foreground">• Near-zero fees • Direct settlement • 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;