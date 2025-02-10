
import { SidebarProvider } from "@/components/ui/sidebar";
import { ShuriLearningDashboard } from "@/components/dashboards/shuri-learning/ShuriLearningDashboard";

const ShuriLearning = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ShuriLearningDashboard />
      </div>
    </SidebarProvider>
  );
};

export default ShuriLearning;
