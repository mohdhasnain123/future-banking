import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapWidget } from "../components/MapWidget";
import { DateTimeDisplay } from "../components/DateTimeDisplay";
import { Bitcoin, Wallet, Banknote, ArrowLeft, ArrowRight } from "lucide-react";
import backgroundImage from "@/scene-2/src/assets/background.jpg";

const paymentMethods = [
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Bitcoin,
    description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
  },
  {
    id: "cbdc",
    name: "CBDC",
    icon: Banknote,
    description: "Central Bank Digital Currency payment",
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    icon: Wallet,
    description: "Pay with your digital wallet",
  },
];

export default function PaymentMethod() {
  const navigate = useNavigate();

  const handleSelectPayment = (methodId: string) => {
    if (methodId === "cbdc") {
      navigate("/payment-processing"); // <-- UPDATED ROUTE
    }
    // You can add navigation for other payment methods here if needed
  };

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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-foreground mb-12">
            Select Payment Method
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className="p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary"
                onClick={() => handleSelectPayment(method.id)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {method.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8 z-20">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12"
              onClick={() => navigate("/nft/1")}
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12"
              onClick={() => navigate("/payment-processing")} // <-- UPDATED ROUTE
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
