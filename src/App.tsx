
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WakandanCouncil from "./pages/WakandanCouncil";
import BastInvestment from "./pages/BastInvestment";
import ShuriLearning from "./pages/ShuriLearning";

const queryClient = new QueryClient();

const NavigationHeader = () => (
  <motion.nav 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-background/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="text-primary font-bold text-xl">Guardian-IO</Link>
        <div className="hidden md:flex space-x-4">
          <Link 
            to="/wakandan-council" 
            className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Wakandan Council
          </Link>
          <Link 
            to="/bast-investment" 
            className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Bast Investment
          </Link>
          <Link 
            to="/shuri-learning" 
            className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Shuri Learning
          </Link>
        </div>
        <button className="md:hidden p-2 rounded-md text-gray-300 hover:text-primary hover:bg-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </button>
      </div>
    </div>
  </motion.nav>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wakandan-council" element={<WakandanCouncil />} />
          <Route path="/bast-investment" element={<BastInvestment />} />
          <Route path="/shuri-learning" element={<ShuriLearning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
