/**
 * Color Brain - Intelligent emotional color mapping
 * Responds with palettes and gradients that feel emotionally connected to audio
 */

import { AudioFeatures, MusicContext } from './musicBrain';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  glow: string;
  particles: string[];
}

export interface ColorMood {
  name: string;
  temperature: 'warm' | 'cool' | 'neutral';
  saturation: number;
  brightness: number;
  contrast: number;
}

export class ColorBrain {
  private colorHistory: ColorPalette[] = [];
  private transitionSpeed = 0.1;

  generatePalette(features: AudioFeatures, context: MusicContext): ColorPalette {
    const mood = this.analyzeMood(features, context);
    const basePalette = this.createBasePalette(features, context, mood);
    const refinedPalette = this.refineForContext(basePalette, context);
    
    // Smooth transitions
    const finalPalette = this.smoothTransition(refinedPalette);
    
    this.updateHistory(finalPalette);
    return finalPalette;
  }

  private analyzeMood(features: AudioFeatures, context: MusicContext): ColorMood {
    const { energy, harmony, mood, bass, treble } = features;
    const { emotionalIntensity, genreHint } = context;

    // Determine temperature based on musical characteristics
    let temperature: ColorMood['temperature'] = 'neutral';
    if (bass > 0.6 || genreHint === 'electronic') temperature = 'cool';
    if (harmony > 0.6 || genreHint === 'acoustic') temperature = 'warm';
    if (mood === 'mysterious' || mood === 'dramatic') temperature = 'cool';

    // Calculate saturation based on energy and dynamics
    const saturation = Math.min(100, 40 + (energy * 60) + (features.dynamics * 30));

    // Calculate brightness based on treble and mood
    const brightness = Math.min(100, 30 + (treble * 40) + (emotionalIntensity * 30));

    // Calculate contrast based on dynamics and genre
    const contrast = Math.min(100, 20 + (features.dynamics * 50) + (energy * 30));

    return {
      name: this.getMoodName(mood, energy, harmony),
      temperature,
      saturation,
      brightness,
      contrast
    };
  }

  private createBasePalette(features: AudioFeatures, context: MusicContext, mood: ColorMood): ColorPalette {
    const { bass, mid, treble, energy, harmony } = features;
    const { genreHint, vocalPresence, emotionalIntensity } = context;

    // Base hue calculation
    let baseHue = 0;
    
    switch (genreHint) {
      case 'electronic':
        baseHue = 240 + (bass * 60); // Blue to purple range
        break;
      case 'acoustic':
        baseHue = 30 + (harmony * 60); // Orange to yellow range
        break;
      case 'classical':
        baseHue = 200 + (harmony * 80); // Blue to purple range
        break;
      case 'rock':
        baseHue = 0 + (energy * 60); // Red to orange range
        break;
      case 'ambient':
        baseHue = 180 + (mid * 120); // Cyan to purple range
        break;
      case 'voice':
        baseHue = vocalPresence ? 45 + (emotionalIntensity * 90) : 200; // Human warmth or cool mystery
        break;
      default:
        baseHue = (bass * 120) + (treble * 240); // Dynamic based on frequency content
    }

    baseHue = baseHue % 360;

    // Generate complementary and analogous colors
    const primaryHue = baseHue;
    const secondaryHue = (baseHue + 120) % 360;
    const accentHue = (baseHue + 240) % 360;
    const backgroundHue = (baseHue + 180) % 360;

    // Adjust saturation and lightness based on mood
    const saturation = mood.saturation;
    const lightness = mood.brightness;

    return {
      primary: `hsl(${primaryHue}, ${saturation}%, ${lightness}%)`,
      secondary: `hsl(${secondaryHue}, ${saturation * 0.8}%, ${lightness * 0.9}%)`,
      accent: `hsl(${accentHue}, ${saturation * 1.2}%, ${lightness * 1.1}%)`,
      background: `hsl(${backgroundHue}, ${saturation * 0.3}%, ${lightness * 0.2}%)`,
      glow: `hsl(${primaryHue}, ${saturation * 1.5}%, ${lightness * 1.3}%)`,
      particles: this.generateParticleColors(baseHue, saturation, lightness, features)
    };
  }

  private generateParticleColors(baseHue: number, saturation: number, lightness: number, features: AudioFeatures): string[] {
    const colors = [];
    const particleCount = Math.floor(3 + (features.energy * 5)); // 3-8 colors

    for (let i = 0; i < particleCount; i++) {
      const hueShift = (360 / particleCount) * i;
      const particleHue = (baseHue + hueShift) % 360;
      
      // Vary saturation and lightness for depth
      const particleSat = saturation + (Math.random() - 0.5) * 30;
      const particleLight = lightness + (Math.random() - 0.5) * 40;
      
      colors.push(`hsl(${particleHue}, ${Math.max(0, Math.min(100, particleSat))}%, ${Math.max(10, Math.min(90, particleLight))}%)`);
    }

    return colors;
  }

  private refineForContext(palette: ColorPalette, context: MusicContext): ColorPalette {
    const { beatDrop, vocalPresence, instrumentalDensity, emotionalIntensity } = context;

    let refinedPalette = { ...palette };

    // Beat drop effect - intensify colors
    if (beatDrop) {
      refinedPalette = this.intensifyPalette(refinedPalette, 1.5);
    }

    // Vocal presence - add warmth
    if (vocalPresence) {
      refinedPalette = this.addWarmth(refinedPalette, 0.3);
    }

    // High instrumental density - increase complexity
    if (instrumentalDensity > 0.7) {
      refinedPalette.particles = this.addComplexity(refinedPalette.particles);
    }

    // Emotional intensity - adjust saturation
    if (emotionalIntensity > 0.8) {
      refinedPalette = this.adjustSaturation(refinedPalette, emotionalIntensity);
    }

    return refinedPalette;
  }

  private intensifyPalette(palette: ColorPalette, factor: number): ColorPalette {
    const intensify = (color: string) => {
      const hsl = this.parseHSL(color);
      return `hsl(${hsl.h}, ${Math.min(100, hsl.s * factor)}%, ${Math.min(90, hsl.l * factor)}%)`;
    };

    return {
      ...palette,
      primary: intensify(palette.primary),
      accent: intensify(palette.accent),
      glow: intensify(palette.glow),
      particles: palette.particles.map(intensify)
    };
  }

  private addWarmth(palette: ColorPalette, amount: number): ColorPalette {
    const warmify = (color: string) => {
      const hsl = this.parseHSL(color);
      const warmerHue = this.shiftTowardsWarmth(hsl.h, amount);
      return `hsl(${warmerHue}, ${hsl.s}%, ${hsl.l}%)`;
    };

    return {
      ...palette,
      primary: warmify(palette.primary),
      secondary: warmify(palette.secondary),
      glow: warmify(palette.glow)
    };
  }

  private addComplexity(particles: string[]): string[] {
    const complexParticles = [...particles];
    
    // Add gradient variations
    const additionalCount = Math.min(5, Math.floor(particles.length * 0.5));
    for (let i = 0; i < additionalCount; i++) {
      const baseColor = particles[i % particles.length];
      const hsl = this.parseHSL(baseColor);
      const variation = `hsl(${(hsl.h + (Math.random() - 0.5) * 60) % 360}, ${hsl.s}%, ${hsl.l}%)`;
      complexParticles.push(variation);
    }

    return complexParticles;
  }

  private adjustSaturation(palette: ColorPalette, intensity: number): ColorPalette {
    const adjust = (color: string) => {
      const hsl = this.parseHSL(color);
      const newSaturation = Math.min(100, hsl.s * (1 + intensity * 0.5));
      return `hsl(${hsl.h}, ${newSaturation}%, ${hsl.l}%)`;
    };

    return {
      ...palette,
      primary: adjust(palette.primary),
      secondary: adjust(palette.secondary),
      accent: adjust(palette.accent),
      particles: palette.particles.map(adjust)
    };
  }

  private smoothTransition(newPalette: ColorPalette): ColorPalette {
    if (this.colorHistory.length === 0) return newPalette;

    const lastPalette = this.colorHistory[this.colorHistory.length - 1];
    const speed = this.transitionSpeed;

    const blend = (color1: string, color2: string): string => {
      const hsl1 = this.parseHSL(color1);
      const hsl2 = this.parseHSL(color2);

      const h = this.interpolateHue(hsl1.h, hsl2.h, speed);
      const s = hsl1.s + (hsl2.s - hsl1.s) * speed;
      const l = hsl1.l + (hsl2.l - hsl1.l) * speed;

      return `hsl(${h}, ${s}%, ${l}%)`;
    };

    return {
      primary: blend(lastPalette.primary, newPalette.primary),
      secondary: blend(lastPalette.secondary, newPalette.secondary),
      accent: blend(lastPalette.accent, newPalette.accent),
      background: blend(lastPalette.background, newPalette.background),
      glow: blend(lastPalette.glow, newPalette.glow),
      particles: newPalette.particles.map((color, i) => 
        lastPalette.particles[i] ? blend(lastPalette.particles[i], color) : color
      )
    };
  }

  private parseHSL(hslString: string): { h: number; s: number; l: number } {
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return { h: 0, s: 0, l: 0 };

    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3])
    };
  }

  private interpolateHue(h1: number, h2: number, t: number): number {
    const diff = ((h2 - h1 + 180) % 360) - 180;
    return (h1 + diff * t + 360) % 360;
  }

  private shiftTowardsWarmth(hue: number, amount: number): number {
    const warmHues = [0, 30, 60]; // Red, orange, yellow
    const closestWarmHue = warmHues.reduce((closest, warmHue) => {
      const distance1 = Math.abs(hue - closest);
      const distance2 = Math.abs(hue - warmHue);
      return distance2 < distance1 ? warmHue : closest;
    });

    const shift = (closestWarmHue - hue) * amount;
    return (hue + shift + 360) % 360;
  }

  private getMoodName(mood: AudioFeatures['mood'], energy: number, harmony: number): string {
    const intensity = energy > 0.6 ? 'intense' : energy > 0.3 ? 'moderate' : 'gentle';
    const harmonyLevel = harmony > 0.6 ? 'harmonious' : harmony > 0.3 ? 'balanced' : 'chaotic';

    return `${intensity}-${mood}-${harmonyLevel}`;
  }

  private updateHistory(palette: ColorPalette): void {
    this.colorHistory.push(palette);
    if (this.colorHistory.length > 10) this.colorHistory.shift(); // Keep recent history
  }

  setTransitionSpeed(speed: number): void {
    this.transitionSpeed = Math.max(0.01, Math.min(1, speed));
  }
}