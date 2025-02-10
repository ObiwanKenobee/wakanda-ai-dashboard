
import { SidebarProvider } from "@/components/ui/sidebar";
import { BastInvestmentDashboard } from "@/components/dashboards/bast-investment/BastInvestmentDashboard";

const BastInvestment = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <BastInvestmentDashboard />
      </div>
    </SidebarProvider>
  );
};

export default BastInvestment;
