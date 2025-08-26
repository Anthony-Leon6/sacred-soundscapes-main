import { Button } from "@/components/ui/button";
import { Play, Pause, Settings, Maximize } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  onStartVisualization: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenSettings: () => void;
  onToggleFullscreen: () => void;
}

export const HeroSection = ({ 
  onStartVisualization, 
  isPlaying, 
  onTogglePlay, 
  onOpenSettings,
  onToggleFullscreen 
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-sacred opacity-20" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-glow rounded-full animate-particle-drift opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo & Title */}
        <div className="mb-8 animate-float">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-flow bg-clip-text text-transparent mb-4">
            Sacred Visualizer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Bringing Music to Life Visually
          </p>
          <div className="w-20 h-1 bg-gradient-sacred mx-auto rounded-full shadow-glow" />
        </div>

        {/* Description */}
        <div className="mb-12 space-y-4">
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Transform your audio into stunning, real-time visual experiences. 
            Watch as rhythm, bass, and melody come alive through particles, patterns, and sacred geometry.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Audio Reactive Visuals
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              Real-time Processing
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              Immersive Experience
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button 
            variant="sacred" 
            size="lg" 
            onClick={onStartVisualization}
            className="animate-pulse-glow"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Visualization
          </Button>
          
          <div className="flex gap-2">
                  
            <Button 
              variant="glass" 
              size="lg" 
              onClick={onToggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-sacred rounded-lg mx-auto mb-4 shadow-sacred" />
            <h3 className="text-lg font-semibold mb-2">Sacred Geometry</h3>
            <p className="text-sm text-muted-foreground">
              Mystical patterns that respond to the spiritual essence of your music
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-cosmic rounded-lg mx-auto mb-4 shadow-cosmic" />
            <h3 className="text-lg font-semibold mb-2">Cosmic Flow</h3>
            <p className="text-sm text-muted-foreground">
              Particle systems that dance with every beat and melody
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-glass-bg border border-glass-border backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-mystic rounded-lg mx-auto mb-4 shadow-glow" />
            <h3 className="text-lg font-semibold mb-2">Personal Journey</h3>
            <p className="text-sm text-muted-foreground">
              Customize colors, intensity, and styles to match your inner vibe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};