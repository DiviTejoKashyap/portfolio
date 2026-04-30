import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/CustomCursor";
import Index from "./pages/Index.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Wrapped inside BrowserRouter so useLocation() is available
function AnimatedRoutes() {
  const location = useLocation();
  const reduce   = useReducedMotion();

  return (
    // initial={false}: first render has no enter animation — Loader handles the intro
    // mode="wait": exit completes before enter begins
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? {} : { opacity: 0, transition: { duration: 0.12, ease } }}
        transition={{ duration: 0.22, ease }}
        style={{ minHeight: "100vh" }}
      >
        <Routes location={location}>
          <Route path="/"           element={<Index />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
