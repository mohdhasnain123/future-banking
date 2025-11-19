import AgentsDashboard from "../AgentMesh";
import StrategyComparison from "../StrategyComparison";

const StrategyComparisonNexus = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          aspectRatio: "7600 / 1600",
          width: "100%",
          maxHeight: "100%",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div className="flex h-screen w-screen overflow-hidden">
          {/* Left Side - 50% */}
          <div className="w-1/2">
            {/* You can add overlay or content here if needed */}
            <AgentsDashboard />
          </div>

          {/* Right Side - 50% */}
          <div className="w-1/2">
            <StrategyComparison />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyComparisonNexus;
