import { Card } from "@/components/ui/card";

interface NFTCardProps {
  title: string;
  description: string;
  image: string;
  bids: number;
  onClick?: () => void;
}

export function NFTCard({ title, description, image, bids, onClick }: NFTCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden bg-secondary">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <p className="text-sm font-semibold text-success">{bids} Bid{bids !== 1 ? 's' : ''}</p>
      </div>
    </Card>
  );
}
