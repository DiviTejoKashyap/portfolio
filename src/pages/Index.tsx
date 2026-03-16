import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import MarqueeBreak from "@/components/MarqueeBreak";
import ContactSection from "@/components/ContactSection";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { theme, toggle } = useTheme();

  return (
    <div className="bg-page min-h-screen">
      <NoiseOverlay />
      <CustomCursor />
      <Navigation theme={theme} onToggleTheme={toggle} />
      <Hero />
      <WorkSection />
      <AboutSection />
      <MarqueeBreak />
      <ContactSection />
    </div>
  );
};

export default Index;
