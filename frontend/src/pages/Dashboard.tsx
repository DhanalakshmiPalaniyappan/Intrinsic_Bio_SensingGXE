import DashboardHero from "../components/DashboardHero";
import MetricCards from "../components/MetricCards";
import LiveSignalChart from "../components/LiveSignalChart";
import AlertsPanel from "../components/AlertsPanel";
import TreeHealthCard from "../components/TreeHealthCard";
import DeviceStatusPanel from "../components/DeviceStatusPanel";
import FrequencyAnalysis from "../components/FrequencyAnalysis";
import AIInterpretationCard from "../components/AIInterpretationCard";
import DataFlowDiagram from "../components/DataFlowDiagram";

export default function Dashboard() {
  return (
    <div className="text-bio-text">
      <DashboardHero />
      <MetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <LiveSignalChart />
        </div>
        <div className="space-y-4">
          <AlertsPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FrequencyAnalysis />
          <AIInterpretationCard />
        </div>
        <div className="space-y-4">
          <TreeHealthCard />
          <DeviceStatusPanel />
        </div>
      </div>

      <DataFlowDiagram />
    </div>
  );
}
