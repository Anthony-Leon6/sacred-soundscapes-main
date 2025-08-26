import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MusicBrain, AudioFeatures, MusicContext } from "@/lib/musicBrain";
import { ColorBrain, ColorPalette } from "@/lib/colorBrain";

interface AudioVisualizerProps {
  isPlaying: boolean;
  intensity: number;
  mode: "sacred" | "cosmic" | "flow" | "pulse" | "trippy" | "ocean" | "neural" | "galaxy";
  className?: string;
}

export const AudioVisualizer = ({ isPlaying, intensity, mode, className }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const musicBrainRef = useRef(new MusicBrain());
  const colorBrainRef = useRef(new ColorBrain());
  
  const [audioData, setAudioData] = useState<number[]>(new Array(128).fill(0));
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures | null>(null);
  const [musicContext, setMusicContext] = useState<MusicContext | null>(null);

  // Simulate intelligent audio analysis
  useEffect(() => {
    if (!isPlaying) return;

    const simulateIntelligentAudio = () => {
      const time = Date.now() * 0.001;
      
      // Generate more sophisticated audio simulation based on mode
      const newData = audioData.map((_, i) => {
        const baseFreq = (i / 128) * Math.PI * 2;
        let amplitude = 0;
        
        // Mode-specific audio generation
        switch (mode) {
          case 'sacred':
            // Sacred geometry - harmonic frequencies
            amplitude = Math.sin(time * 1.2 + baseFreq) * Math.sin(time * 0.3) * 0.7;
            if (i % 12 === 0) amplitude *= 1.5; // Emphasize harmonic intervals
            break;
            
          case 'cosmic':
            // Cosmic - spacey, ethereal sounds
            amplitude = Math.sin(time * 0.8 + baseFreq * 1.5) * Math.cos(time * 0.2) * 0.6;
            amplitude += Math.random() * 0.1; // Add some cosmic noise
            break;
            
          case 'flow':
            // Flowing waves - smooth transitions
            amplitude = Math.sin(time * 1.0 + baseFreq) * Math.sin(time * 0.4) * 0.5;
            break;
            
          case 'pulse':
            // Rhythmic pulses
            amplitude = Math.sin(time * 2.0 + baseFreq) * Math.sin(time * 0.6) * 0.8;
            if (Math.floor(time * 2) % 2 === 0) amplitude *= 1.3; // Beat emphasis
            break;
            
          case 'trippy':
            // Psychedelic patterns
            amplitude = Math.sin(time * 1.7 + baseFreq * 3) * Math.cos(time * 0.7) * 0.9;
            amplitude += Math.sin(time * 4 + i * 0.1) * 0.2;
            break;
            
          case 'ocean':
            // Ocean-like waves
            amplitude = Math.sin(time * 0.5 + baseFreq * 0.8) * Math.sin(time * 0.1) * 0.4;
            amplitude += Math.sin(time * 0.3 + baseFreq * 2) * 0.2;
            break;
            
          case 'neural':
            // Neural network patterns
            amplitude = Math.sin(time * 1.5 + baseFreq * 2) * 0.6;
            if (Math.random() > 0.9) amplitude *= 2; // Neural spikes
            break;
            
          case 'galaxy':
            // Galactic, vast soundscapes
            amplitude = Math.sin(time * 0.7 + baseFreq * 1.2) * Math.cos(time * 0.15) * 0.7;
            amplitude += Math.sin(time * 3 + baseFreq * 0.5) * 0.3;
            break;
            
          default:
            amplitude = Math.sin(time * 1 + baseFreq) * 0.5;
        }
        
        return Math.max(0, amplitude * intensity);
      });
      
      setAudioData(newData);
      
      // Analyze with Music Brain
      const analysis = musicBrainRef.current.analyzeAudio(newData);
      setAudioFeatures(analysis.features);
      setMusicContext(analysis.context);
      
      // Generate colors with Color Brain
      const palette = colorBrainRef.current.generatePalette(analysis.features, analysis.context);
      setCurrentPalette(palette);
    };

    const interval = setInterval(simulateIntelligentAudio, 50);
    return () => clearInterval(interval);
  }, [isPlaying, intensity, mode, audioData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.clearRect(0, 0, width, height);

      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const time = Date.now() * 0.001;

      // Set global composite operation for blending
      ctx.globalCompositeOperation = 'screen';

      // Use intelligent color palette if available
      const palette = currentPalette;
      const features = audioFeatures;
      const context = musicContext;

      if (mode === 'sacred') {
        drawSacredGeometry(ctx, centerX, centerY, audioData, time, palette, features);
      } else if (mode === 'cosmic') {
        drawCosmicParticles(ctx, centerX, centerY, audioData, time, width, height, palette, features);
      } else if (mode === 'flow') {
        drawFlowingWaves(ctx, centerX, centerY, audioData, time, width, height, palette, features);
      } else if (mode === 'pulse') {
        drawPulsingCircles(ctx, centerX, centerY, audioData, time, palette, features);
      } else if (mode === 'trippy') {
        drawTrippyPatterns(ctx, centerX, centerY, audioData, time, width, height, palette, features);
      } else if (mode === 'ocean') {
        drawOceanWaves(ctx, centerX, centerY, audioData, time, width, height, palette, features);
      } else if (mode === 'neural') {
        drawNeuralNetwork(ctx, centerX, centerY, audioData, time, width, height, palette, features);
      } else if (mode === 'galaxy') {
        drawGalacticView(ctx, centerX, centerY, audioData, time, width, height, palette, features);
      }

      ctx.globalCompositeOperation = 'source-over';
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioData, mode]);

  const drawSacredGeometry = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const segments = features?.harmony ? Math.floor(6 + features.harmony * 6) : 6;
    const rotationSpeed = features?.tempo ? features.tempo / 120 : 0.5;
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const intensity = data[i * Math.floor(128 / segments)] || 0;
      const radius = 50 + intensity * (features?.energy ? 150 * features.energy : 100);
      
      ctx.beginPath();
      
      const color = palette?.particles[i % (palette.particles.length || 1)] || `hsl(${270 + i * 20}, 70%, ${65 + intensity * 30}%)`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 + intensity * (features?.dynamics ? features.dynamics * 5 : 3);
      
      for (let j = 0; j <= segments; j++) {
        const pointAngle = angle + (j / segments) * Math.PI * 2 + time * rotationSpeed;
        const x = centerX + Math.cos(pointAngle) * radius;
        const y = centerY + Math.sin(pointAngle) * radius;
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      if (palette?.glow) {
        ctx.shadowColor = palette.glow;
        ctx.shadowBlur = intensity * (features?.energy ? features.energy * 30 : 20);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      if (features && data[0] > 0.7) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = palette?.accent || color;
        ctx.fill();
      }
    }
  };

  const drawCosmicParticles = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, width: number, height: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const particleColors = palette?.particles || [];
    const speedMultiplier = features?.tempo ? features.tempo / 120 : 1;
    
    data.forEach((intensity, i) => {
      if (intensity < 0.1) return;
      
      const angle = (i / data.length) * Math.PI * 2 + time * (0.2 * speedMultiplier);
      const distance = 100 + intensity * (features?.energy ? 300 * features.energy : 200);
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      const size = 2 + intensity * (features?.dynamics ? features.dynamics * 12 : 8);
      const color = particleColors[i % particleColors.length] || `hsl(${(220 + i * 2) % 360}, 70%, ${55 + intensity * 20}%)`;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      if (palette?.glow) {
        ctx.shadowColor = palette.glow;
        ctx.shadowBlur = size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      ctx.beginPath();
      const trailX = centerX + Math.cos(angle - 0.1) * (distance - 20);
      const trailY = centerY + Math.sin(angle - 0.1) * (distance - 20);
      ctx.arc(trailX, trailY, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = palette?.secondary || `hsl(${(220 + i * 2) % 360}, 70%, ${35 + intensity * 10}%)`;
      ctx.fill();
      
      if (features && intensity > 0.6 && data[Math.floor(i/4)] > 0.5) {
        for (let burst = 0; burst < 3; burst++) {
          const burstAngle = angle + (burst * Math.PI * 2 / 3);
          const burstX = x + Math.cos(burstAngle) * (size * 2);
          const burstY = y + Math.sin(burstAngle) * (size * 2);
          
          ctx.beginPath();
          ctx.arc(burstX, burstY, size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = palette?.accent || color;
          ctx.fill();
        }
      }
    });
  };

  const drawFlowingWaves = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, width: number, height: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const waveCount = features?.harmony ? Math.floor(2 + features.harmony * 4) : 3;
    const colors = palette?.particles || [];
    
    for (let wave = 0; wave < waveCount; wave++) {
      ctx.beginPath();
      const color = colors[wave % colors.length] || `hsl(${180 + wave * 30}, 70%, ${60 + wave * 10}%)`;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 + wave;
      
      for (let x = 0; x < width; x += 2) {
        const dataIndex = Math.floor((x / width) * data.length);
        const intensity = data[dataIndex] || 0;
        const harmonyMultiplier = features?.harmony || 1;
        
        const y = centerY + 
          Math.sin((x * 0.02) + (time * (1 + wave * 0.5))) * (30 + intensity * 50 * harmonyMultiplier) +
          Math.sin((x * 0.01) + (time * 0.3)) * (20 + intensity * 30) * (wave + 1);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    }
  };

  const drawPulsingCircles = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const bassIntensity = data.slice(0, 16).reduce((sum, val) => sum + val, 0) / 16;
    const midIntensity = data.slice(16, 64).reduce((sum, val) => sum + val, 0) / 48;
    const highIntensity = data.slice(64).reduce((sum, val) => sum + val, 0) / 64;
    
    const energyMultiplier = features?.energy || 1;
    
    // Bass circle (outer)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80 + bassIntensity * 120 * energyMultiplier, 0, Math.PI * 2);
    ctx.strokeStyle = palette?.primary || `hsl(270, 70%, ${65 + bassIntensity * 30}%)`;
    ctx.lineWidth = 3 + bassIntensity * 5;
    ctx.stroke();
    
    // Mid circle 
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50 + midIntensity * 80 * energyMultiplier, 0, Math.PI * 2);
    ctx.strokeStyle = palette?.secondary || `hsl(220, 70%, ${55 + midIntensity * 30}%)`;
    ctx.lineWidth = 2 + midIntensity * 4;
    ctx.stroke();
    
    // High circle (inner)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 + highIntensity * 40 * energyMultiplier, 0, Math.PI * 2);
    ctx.strokeStyle = palette?.accent || `hsl(180, 70%, ${60 + highIntensity * 30}%)`;
    ctx.lineWidth = 1 + highIntensity * 3;
    ctx.stroke();
  };

  // New visualization modes
  const drawTrippyPatterns = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, width: number, height: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const colors = palette?.particles || [];
    
    for (let i = 0; i < data.length; i += 4) {
      const intensity = data[i];
      if (intensity < 0.1) continue;
      
      const x = (i / data.length) * width;
      const y = height / 2 + Math.sin(time * 3 + i * 0.1) * intensity * 100;
      
      ctx.beginPath();
      ctx.arc(x, y, intensity * 10, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length] || `hsl(${(time * 100 + i * 10) % 360}, 100%, 50%)`;
      ctx.fill();
      
      // Psychedelic trails
      for (let trail = 1; trail <= 5; trail++) {
        const trailY = y + Math.sin(time * 3 + i * 0.1 - trail * 0.2) * intensity * 20;
        ctx.beginPath();
        ctx.arc(x, trailY, intensity * (6 - trail), 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length] || `hsl(${(time * 100 + i * 10 + trail * 60) % 360}, 80%, ${50 - trail * 5}%)`;
        ctx.globalAlpha = 0.7 - trail * 0.1;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  };

  const drawOceanWaves = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, width: number, height: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const colors = palette?.particles || ['hsl(200, 70%, 50%)', 'hsl(220, 60%, 60%)', 'hsl(180, 80%, 40%)'];
    
    for (let layer = 0; layer < 4; layer++) {
      ctx.beginPath();
      ctx.fillStyle = colors[layer % colors.length];
      ctx.globalAlpha = 0.3 - layer * 0.05;
      
      const waveHeight = height * 0.2 + layer * 20;
      const baseY = height - waveHeight;
      
      for (let x = 0; x <= width; x += 5) {
        const dataIndex = Math.floor((x / width) * data.length);
        const intensity = data[dataIndex] || 0;
        
        const y = baseY + 
          Math.sin((x * 0.005) + (time * (0.5 + layer * 0.2))) * intensity * 50 +
          Math.sin((x * 0.002) + (time * 0.3)) * 30;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  };

  const drawNeuralNetwork = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, width: number, height: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const nodeCount = 20;
    const nodes: { x: number; y: number; intensity: number }[] = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 100 + Math.sin(time + i) * 50;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        intensity: data[i * Math.floor(data.length / nodeCount)] || 0
      });
    }
    
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        
        if (distance < 150 && (nodes[i].intensity > 0.3 || nodes[j].intensity > 0.3)) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = palette?.secondary || `hsl(60, 70%, ${30 + (nodes[i].intensity + nodes[j].intensity) * 25}%)`;
          ctx.lineWidth = (nodes[i].intensity + nodes[j].intensity) * 2;
          ctx.globalAlpha = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    
    // Draw nodes
    nodes.forEach((node, i) => {
      if (node.intensity < 0.1) return;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3 + node.intensity * 8, 0, Math.PI * 2);
      ctx.fillStyle = palette?.accent || `hsl(300, 70%, ${50 + node.intensity * 30}%)`;
      ctx.fill();
      
      if (node.intensity > 0.6) {
        ctx.shadowColor = palette?.glow || '#ff00ff';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  };

  const drawGalacticView = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, data: number[], time: number, width: number, height: number, palette?: ColorPalette | null, features?: AudioFeatures | null) => {
    const starCount = 100;
    const colors = palette?.particles || ['#ffffff', '#ffddaa', '#aaddff', '#ddaaff'];
    
    // Draw cosmic background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) / 2);
    gradient.addColorStop(0, palette?.background || 'hsl(240, 20%, 5%)');
    gradient.addColorStop(1, 'hsl(240, 30%, 2%)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw stars
    for (let i = 0; i < starCount; i++) {
      const intensity = data[i % data.length] || 0;
      if (intensity < 0.2) continue;
      
      const x = (Math.sin(i * 0.1 + time * 0.1) * width / 2) + centerX;
      const y = (Math.cos(i * 0.1 + time * 0.05) * height / 2) + centerY;
      
      ctx.beginPath();
      ctx.arc(x, y, intensity * 3, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      
      // Star twinkle effect
      if (intensity > 0.7) {
        ctx.shadowColor = colors[i % colors.length];
        ctx.shadowBlur = intensity * 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    // Draw galaxy spiral
    for (let angle = 0; angle < Math.PI * 8; angle += 0.1) {
      const radius = angle * 10;
      const x = centerX + Math.cos(angle + time * 0.2) * radius;
      const y = centerY + Math.sin(angle + time * 0.2) * radius;
      
      const dataIndex = Math.floor((angle / (Math.PI * 8)) * data.length);
      const intensity = data[dataIndex] || 0;
      
      if (intensity > 0.1) {
        ctx.beginPath();
        ctx.arc(x, y, intensity * 2, 0, Math.PI * 2);
        ctx.fillStyle = palette?.primary || `hsl(${angle * 20 % 360}, 70%, 60%)`;
        ctx.globalAlpha = intensity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  };

  return (
    <div className={cn("relative w-full h-full bg-background/50 backdrop-blur-sm rounded-lg overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* Overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-sacred rounded-full mx-auto mb-4 animate-pulse-glow" />
            <p className="text-muted-foreground">Click play to start visualization</p>
          </div>
        </div>
      )}
      
      {/* Music Brain Status */}
      {isPlaying && audioFeatures && (
        <div className="absolute top-4 left-4 text-xs text-muted-foreground bg-glass-bg/70 backdrop-blur-sm rounded p-2">
          <div>Energy: {Math.round(audioFeatures.energy * 100)}%</div>
          <div>Mood: {audioFeatures.mood}</div>
          <div>Tempo: {Math.round(audioFeatures.tempo)} BPM</div>
        </div>
      )}
    </div>
  );
};