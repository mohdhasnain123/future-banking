export const GeometricOverlay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blue geometric shape */}
      <div
        className="absolute -top-20 -left-20 w-[800px] h-[600px] opacity-60 animate-float"
        style={{
          background: "hsl(var(--geo-blue))",
          clipPath: "polygon(0% 30%, 100% 0%, 100% 100%, 0% 70%)",
          animationDelay: "0s",
        }}
      />
      
      {/* Peach geometric shape */}
      <div
        className="absolute top-0 left-1/4 w-[700px] h-[500px] opacity-50 animate-float"
        style={{
          background: "hsl(var(--geo-peach))",
          clipPath: "polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%)",
          animationDelay: "1s",
        }}
      />
      
      {/* Additional blue accent */}
      <div
        className="absolute top-20 right-1/4 w-[600px] h-[400px] opacity-40 animate-float"
        style={{
          background: "hsl(var(--geo-blue))",
          clipPath: "polygon(30% 0%, 100% 30%, 70% 100%, 0% 70%)",
          animationDelay: "2s",
        }}
      />
    </div>
  );
};
