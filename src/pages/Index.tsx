import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import DesignProcess from "@/components/DesignProcess";
import AboutSection from "@/components/AboutSection";
import MarqueeBreak from "@/components/MarqueeBreak";
import ContactSection from "@/components/ContactSection";
import NoiseOverlay from "@/components/NoiseOverlay";
import Loader from "@/components/Loader";
import CommandMenu from "@/components/CommandMenu";

// Module-level flag: persists across React remounts within the session.
// Prevents the Loader from re-running on back-navigation from a case study.
let portfolioLoaded = false;

const Index = () => {
  const [loading,  setLoading]  = useState(!portfolioLoaded);
  const [cmdOpen,  setCmdOpen]  = useState(false);
  // revealed: gates Hero animations so they start as the Loader begins exiting,
  // not while hidden behind it.
  const [revealed, setRevealed] = useState(portfolioLoaded);

  // Fires when Loader begins its exit slide — Hero can start animating
  const handleLoaderReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  // Fires when Loader has fully exited — unmount it
  const handleLoaderDone = useCallback(() => {
    portfolioLoaded = true;
    setLoading(false);
  }, []);

  return (
    <div className="bg-page min-h-screen">
      <NoiseOverlay />
      {loading && (
        <Loader onReveal={handleLoaderReveal} onDone={handleLoaderDone} />
      )}
      <Navigation />
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
      <main>
        <Hero revealed={revealed} />
        <WorkSection />
        <MarqueeBreak />
        <DesignProcess />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
