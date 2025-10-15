import { MapPin, Navigation } from "lucide-react";

export function MapWidget() {
  return (
    <div className="fixed right-6 bottom-6 z-50 w-64 h-48">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl h-full relative">
        {/* Simplified map visualization */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1 h-16 bg-primary rotate-45"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-12 bg-primary -rotate-12"></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-20 bg-accent"></div>
          </div>
          <MapPin className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 text-destructive drop-shadow-lg" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
          <div className="flex items-center gap-2 text-xs text-foreground">
            <Navigation className="w-4 h-4 text-primary" />
            <div>
              <p className="font-semibold">10 min</p>
              <p className="text-muted-foreground">2 miles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
