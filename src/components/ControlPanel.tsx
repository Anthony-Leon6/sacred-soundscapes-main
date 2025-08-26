import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Volume2, Palette, Zap, Settings2 } from "lucide-react";

interface ControlPanelProps {
  intensity: number;
  onIntensityChange: (value: number[]) => void;
  mode: "sacred" | "cosmic" | "flow" | "pulse" | "trippy" | "ocean" | "neural" | "galaxy";
  onModeChange: (mode: "sacred" | "cosmic" | "flow" | "pulse" | "trippy" | "ocean" | "neural" | "galaxy") => void;
  sensitivity: number;
  onSensitivityChange: (value: number[]) => void;
  isVisible: boolean;
}

export const ControlPanel = ({
  intensity,
  onIntensityChange,
  mode,
  onModeChange,
  sensitivity,
  onSensitivityChange,
  isVisible
}: ControlPanelProps) => {
  const modes = [
    {
      id: "sacred" as const,
      name: "Sacred",
      description: "Mystical geometric patterns",
      gradient: "bg-gradient-sacred",
      color: "hsl(270, 70%, 65%)"
    },
    {
      id: "cosmic" as const,
      name: "Cosmic",
      description: "Flowing particle systems",
      gradient: "bg-gradient-cosmic",
      color: "hsl(220, 70%, 55%)"
    },
    {
      id: "flow" as const,
      name: "Flow",
      description: "Smooth wave formations",
      gradient: "bg-gradient-mystic",
      color: "hsl(180, 70%, 60%)"
    },
    {
      id: "pulse" as const,
      name: "Pulse",
      description: "Rhythmic circle pulses",
      gradient: "bg-gradient-flow",
      color: "hsl(270, 70%, 65%)"
    },
    {
      id: "trippy" as const,
      name: "Trippy",
      description: "Psychedelic patterns",
      gradient: "bg-gradient-flow",
      color: "hsl(300, 80%, 60%)"
    },
    {
      id: "ocean" as const,
      name: "Ocean",
      description: "Calm flowing waves",
      gradient: "bg-gradient-cosmic",
      color: "hsl(200, 70%, 50%)"
    },
    {
      id: "neural" as const,
      name: "Neural",
      description: "Network connections",
      gradient: "bg-gradient-mystic",
      color: "hsl(60, 70%, 50%)"
    },
    {
      id: "galaxy" as const,
      name: "Galaxy",
      description: "Vast cosmic spirals",
      gradient: "bg-gradient-sacred",
      color: "hsl(240, 60%, 40%)"
    }
  ];

  if (!isVisible) return null;

  return (
    <Card className="absolute top-6 right-6 p-6 bg-glass-bg border-glass-border backdrop-blur-xl shadow-glass min-w-80">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Settings2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Visual Controls</h3>
        </div>

        {/* Visual Modes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Visual Mode</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((modeOption) => (
              <Button
                key={modeOption.id}
                variant={mode === modeOption.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onModeChange(modeOption.id)}
                className={`relative overflow-hidden text-xs ${
                  mode === modeOption.id ? 'shadow-glow' : ''
                }`}
              >
                <div
                  className={`absolute inset-0 opacity-20 ${modeOption.gradient}`}
                />
                <span className="relative z-10 font-medium">
                  {modeOption.name}
                </span>
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {modes.find(m => m.id === mode)?.description}
          </p>
        </div>

        {/* Intensity Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Intensity</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {Math.round(intensity * 100)}%
            </Badge>
          </div>
          <Slider
            value={[intensity]}
            onValueChange={onIntensityChange}
            max={2}
            min={0.1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Subtle</span>
            <span>Intense</span>
          </div>
        </div>

        {/* Sensitivity Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sensitivity</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {Math.round(sensitivity * 100)}%
            </Badge>
          </div>
          <Slider
            value={[sensitivity]}
            onValueChange={onSensitivityChange}
            max={2}
            min={0.1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="space-y-3">
          <span className="text-sm font-medium">Quick Presets</span>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onIntensityChange([0.5]);
                onSensitivityChange([0.8]);
                onModeChange('sacred');
              }}
              className="text-xs"
            >
              Meditative
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onIntensityChange([1.2]);
                onSensitivityChange([1.0]);
                onModeChange('cosmic');
              }}
              className="text-xs"
            >
              Party
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onIntensityChange([0.8]);
                onSensitivityChange([0.6]);
                onModeChange('trippy');
              }}
              className="text-xs"
            >
              Psychedelic
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};