import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Wifi,
  Smartphone,
  Droplets,
  Zap,
  Shield,
  CheckCircle2,
  Bitcoin,
  Wallet,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  provider: string;
  icon: any;
  status: "pending" | "paid";
  category: string;
}

const Bills = () => {
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      name: "Credit Card",
      amount: 2850.0,
      dueDate: "Nov 15, 2025",
      provider: "Global Bank",
      icon: CreditCard,
      status: "pending",
      category: "Finance",
    },
    {
      id: "2",
      name: "Internet Bill",
      amount: 89.99,
      dueDate: "Nov 20, 2025",
      provider: "HyperFiber",
      icon: Wifi,
      status: "pending",
      category: "Utilities",
    },
    {
      id: "3",
      name: "Mobile Bill",
      amount: 65.0,
      dueDate: "Nov 18, 2025",
      provider: "NeoTel",
      icon: Smartphone,
      status: "pending",
      category: "Telecom",
    },
    {
      id: "4",
      name: "Water Bill",
      amount: 45.5,
      dueDate: "Nov 25, 2025",
      provider: "AquaPure",
      icon: Droplets,
      status: "pending",
      category: "Utilities",
    },
    {
      id: "5",
      name: "Electricity Bill",
      amount: 156.75,
      dueDate: "Nov 22, 2025",
      provider: "PowerGrid",
      icon: Zap,
      status: "pending",
      category: "Utilities",
    },
    {
      id: "6",
      name: "Insurance Premium",
      amount: 320.0,
      dueDate: "Nov 30, 2025",
      provider: "SecureLife",
      icon: Shield,
      status: "pending",
      category: "Insurance",
    },
  ]);

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(
    null
  );
  const [showPaymentDetailsDialog, setShowPaymentDetailsDialog] =
    useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const paymentMethods = [
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Bitcoin,
      description: "Pay with BTC, ETH, or USDT",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: Wallet,
      description: "Apple Pay, Google Pay, PayPal",
    },
    {
      id: "p2p",
      name: "Peer-to-Peer",
      icon: Users,
      description: "Venmo, Zelle, Cash App",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
    },
  ];

  const savedPaymentDetails: Record<
    string,
    Array<{ id: string; name: string; details: string }>
  > = {
    crypto: [
      { id: "btc1", name: "Bitcoin Wallet", details: "bc1q...x7z9" },
      { id: "eth1", name: "Ethereum Wallet", details: "0x742...d8f4" },
      { id: "usdt1", name: "USDT (TRC20)", details: "TRX...k3m9" },
    ],
    wallet: [
      { id: "apple1", name: "Apple Pay", details: "iPhone 15 Pro" },
      { id: "google1", name: "Google Pay", details: "****1234" },
      { id: "paypal1", name: "PayPal", details: "john@example.com" },
    ],
    p2p: [
      { id: "venmo1", name: "Venmo", details: "@johnsmith" },
      { id: "zelle1", name: "Zelle", details: "john@email.com" },
      { id: "cash1", name: "Cash App", details: "$johnsmith" },
    ],
    card: [
      { id: "visa1", name: "Visa", details: "**** **** **** 4532" },
      { id: "master1", name: "Mastercard", details: "**** **** **** 8721" },
      { id: "amex1", name: "Amex", details: "**** ****** *9876" },
    ],
  };

  const handlePayBill = (bill: Bill) => {
    setSelectedBill(bill);
    setShowPaymentDialog(true);
  };

  const handlePaymentMethod = (method: string) => {
    setSelectedPaymentType(method);
    setShowPaymentDialog(false);
    setShowPaymentDetailsDialog(true);
  };

  const handlePaymentDetailSelection = () => {
    setShowPaymentDetailsDialog(false);
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      if (selectedBill) {
        setBills(
          bills.map((b) =>
            b.id === selectedBill.id ? { ...b, status: "paid" as const } : b
          )
        );

        setIsProcessing(false);

        toast({
          title: "Payment Successful",
          description: `${selectedBill.name} paid successfully`,
        });

        setSelectedBill(null);
        setSelectedPaymentType(null);
      }
    }, 3000); // 3 seconds processing time
  };

  const totalPending = bills
    .filter((b) => b.status === "pending")
    .reduce((sum, b) => sum + b.amount, 0);
  const totalPaid = bills
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-white text-base">Upcoming Bills</CardTitle>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Card className="bg-[hsl(10,80%,60%)]/20 backdrop-blur-sm border-none text-white">
            <CardContent className="p-2 text-center">
              <p className="text-xs opacity-70">Pending</p>
              <p className="text-lg font-bold">${totalPending.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[hsl(142,76%,36%)]/20 backdrop-blur-sm border-none text-white">
            <CardContent className="p-2 text-center">
              <p className="text-xs opacity-70">Paid</p>
              <p className="text-lg font-bold">${totalPaid.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
      </CardHeader>
      <div className="flex-1 overflow-y-auto pr-2">
        <CardContent className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-white/10">
                  <bill.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm">
                      {bill.name}
                    </p>
                    {bill.status === "paid" && (
                      <Badge className="bg-[hsl(142,76%,36%)] text-white border-none text-xs px-1.5 py-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                        Paid
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/60 text-xs">
                    {bill.provider} • Due: {bill.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-white">
                  ${bill.amount.toFixed(2)}
                </p>
                {bill.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handlePayBill(bill)}
                    className="bg-[hsl(142,76%,36%)] hover:bg-[hsl(142,76%,30%)] text-white text-xs h-8"
                  >
                    Pay
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </div>
      {/* Dialogs need to be outside the scrolling content to render correctly */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-background/95 backdrop-blur-sm max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Paying {selectedBill?.name} - ${selectedBill?.amount.toFixed(2)}
            </p>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethod(method.id)}
                className="p-6 rounded-lg border-2 border-border hover:border-[hsl(142,76%,36%)] hover:bg-accent transition-all text-left group"
              >
                <method.icon className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-[hsl(142,76%,36%)] transition-colors" />
                <h3 className="font-semibold mb-1">{method.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showPaymentDetailsDialog}
        onOpenChange={setShowPaymentDetailsDialog}
      >
        <DialogContent className="bg-background/95 backdrop-blur-sm max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Select{" "}
              {paymentMethods.find((m) => m.id === selectedPaymentType)?.name}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Choose from your saved payment methods
            </p>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {selectedPaymentType &&
              savedPaymentDetails[selectedPaymentType]?.map((detail) => (
                <button
                  key={detail.id}
                  onClick={handlePaymentDetailSelection}
                  className="w-full p-4 rounded-lg border-2 border-border hover:border-[hsl(142,76%,36%)] hover:bg-accent transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{detail.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {detail.details}
                      </p>
                    </div>
                    <CreditCard className="w-6 h-6 text-muted-foreground group-hover:text-[hsl(142,76%,36%)] transition-colors" />
                  </div>
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isProcessing} onOpenChange={() => {}}>
        <DialogContent className="bg-background/95 backdrop-blur-sm max-w-md">
          <DialogHeader>
            <DialogTitle>Processing Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-[hsl(142,76%,36%)]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[hsl(142,76%,36%)] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-lg font-semibold mb-2">
              Processing your payment...
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we securely process your transaction.
              <br />
              This may take a few moments.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bills;
