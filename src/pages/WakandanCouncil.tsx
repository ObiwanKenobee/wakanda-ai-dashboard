
import { SidebarProvider } from "@/components/ui/sidebar";
import { WakandanCouncilDashboard } from "@/components/dashboards/wakandan-council/WakandanCouncilDashboard";

const WakandanCouncil = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <WakandanCouncilDashboard />
      </div>
    </SidebarProvider>
  );
};

export default WakandanCouncil;
