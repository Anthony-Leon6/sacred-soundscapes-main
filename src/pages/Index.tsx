import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { ControlPanel } from "@/components/ControlPanel";
import { Button } from "@/components/ui/button";
import { X, Minimize2 } from "lucide-react";

const Index = () => {
  const [isVisualizationActive, setIsVisualizationActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Visualization settings
  const [intensity, setIntensity] = useState(1.0);
  const [sensitivity, setSensitivity] = useState(0.8);
  const [visualMode, setVisualMode] = useState<"sacred" | "cosmic" | "flow" | "pulse" | "trippy" | "ocean" | "neural" | "galaxy">("sacred");

  const handleStartVisualization = () => {
    setIsVisualizationActive(true);
    setIsPlaying(true);
    setShowControls(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleOpenSettings = () => {
    setShowControls(!showControls);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleExitVisualization = () => {
    setIsVisualizationActive(false);
    setIsPlaying(false);
    setShowControls(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // SEO Meta tags would be handled by a proper routing solution in production
  useEffect(() => {
    document.title = "Sacred Visualizer - Audio Visualization Experience";
    
    const metaDescription = document.querySelector('meta[name="Sacred Visualizer"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform your music into stunning visual experiences with Sacred Visualizer. Real-time audio reactive visualizations featuring sacred geometry, cosmic patterns, and immersive particle effects.');
    }
  }, []);

  if (isVisualizationActive) {
    return (
      <div className="fixed inset-0 bg-background">
        {/* Exit controls */}
        <div className="absolute top-6 left-6 z-50 flex gap-2">
          <Button
            variant="glass"
            size="icon"
            onClick={handleExitVisualization}
            className="shadow-glass"
          >
            <X className="h-4 w-4" />
          </Button>
          {isFullscreen && (
            <Button
              variant="glass"
              size="icon"
              onClick={handleToggleFullscreen}
              className="shadow-glass"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Audio Visualizer */}
        <AudioVisualizer
          isPlaying={isPlaying}
          intensity={intensity}
          mode={visualMode}
          className="w-full h-full"
        />

        {/* Control Panel */}
        <ControlPanel
          intensity={intensity}
          onIntensityChange={(value) => setIntensity(value[0])}
          mode={visualMode}
          onModeChange={setVisualMode}
          sensitivity={sensitivity}
          onSensitivityChange={(value) => setSensitivity(value[0])}
          isVisible={showControls}
        />

        {/* Floating action button for controls */}
        {!showControls && (
          <Button
            variant="glass"
            size="icon"
            onClick={() => setShowControls(true)}
            className="absolute bottom-6 right-6 shadow-glass animate-pulse-glow"
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection
        onStartVisualization={handleStartVisualization}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onOpenSettings={handleOpenSettings}
        onToggleFullscreen={handleToggleFullscreen}
      />
      
      {/* Demo Visualizer Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See Your sound Come <span className="bg-gradient-flow bg-clip-text text-transparent">Alive</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the preview of how your audio transforms into mesmerizing visual art
            </p>
          </div>
          
          <div className="aspect-video max-w-4xl mx-auto bg-card rounded-2xl border shadow-glass overflow-hidden">
            <AudioVisualizer
              isPlaying={true}
              intensity={0.8}
              mode="cosmic"
              className="w-full h-full"
            />
          </div>
          
          <div className="text-center mt-8">
            <Button
              variant="sacred"
              size="lg"
              onClick={handleStartVisualization}
              className="animate-pulse-glow"
            >
              Launch Full Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="bg-gradient-sacred bg-clip-text text-transparent">Every Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From meditation to parties, SacredVis adapts to your moment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-sacred rounded-xl mx-auto mb-4 shadow-sacred animate-pulse-glow" />
              <h3 className="text-xl font-semibold mb-3">Meditation Mode</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Gentle, flowing visuals that enhance mindfulness and deep listening experiences
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-cosmic rounded-xl mx-auto mb-4 shadow-cosmic animate-float" />
              <h3 className="text-xl font-semibold mb-3">Party Energy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                High-intensity visuals that explode with color and movement, perfect for celebrations
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-mystic rounded-xl mx-auto mb-4 shadow-glow" />
              <h3 className="text-xl font-semibold mb-3">Creative Flow</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Inspiring patterns that stimulate creativity and enhance focus during work
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-flow rounded-xl mx-auto mb-4 shadow-glass" />
              <h3 className="text-xl font-semibold mb-3">Performance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professional-grade visuals for live performances and streaming
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;