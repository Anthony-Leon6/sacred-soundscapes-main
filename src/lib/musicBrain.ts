/**
 * Music Brain - Intelligent audio analysis and interpretation
 * Understands rhythm, bass, melody, harmony, and dynamics
 */

export interface AudioFeatures {
  bass: number;
  mid: number;
  treble: number;
  rhythm: number;
  melody: number;
  harmony: number;
  dynamics: number;
  energy: number;
  tempo: number;
  mood: 'calm' | 'energetic' | 'dramatic' | 'mysterious' | 'joyful';
}

export interface MusicContext {
  beatDrop: boolean;
  vocalPresence: boolean;
  instrumentalDensity: number;
  emotionalIntensity: number;
  genreHint: 'electronic' | 'acoustic' | 'classical' | 'rock' | 'ambient' | 'voice' | 'mixed';
}

export class MusicBrain {
  private previousFeatures: AudioFeatures | null = null;
  private beatHistory: number[] = [];
  private energyHistory: number[] = [];
  private time = 0;

  analyzeAudio(audioData: number[]): { features: AudioFeatures; context: MusicContext } {
    this.time += 1;
    
    // Extract frequency bands
    const bass = this.extractBass(audioData);
    const mid = this.extractMid(audioData);
    const treble = this.extractTreble(audioData);
    
    // Analyze musical elements
    const rhythm = this.analyzeRhythm(bass, mid);
    const melody = this.analyzeMelody(mid, treble);
    const harmony = this.analyzeHarmony(audioData);
    const dynamics = this.analyzeDynamics(audioData);
    const energy = this.calculateEnergy(audioData);
    const tempo = this.estimateTempo(rhythm);
    const mood = this.determineMood(energy, harmony, dynamics);

    const features: AudioFeatures = {
      bass,
      mid,
      treble,
      rhythm,
      melody,
      harmony,
      dynamics,
      energy,
      tempo,
      mood
    };

    // Analyze musical context
    const context = this.analyzeContext(features, audioData);
    
    this.previousFeatures = features;
    this.updateHistory(rhythm, energy);
    
    return { features, context };
  }

  private extractBass(audioData: number[]): number {
    const bassRange = audioData.slice(0, 32);
    return bassRange.reduce((sum, val) => sum + val, 0) / bassRange.length;
  }

  private extractMid(audioData: number[]): number {
    const midRange = audioData.slice(32, 96);
    return midRange.reduce((sum, val) => sum + val, 0) / midRange.length;
  }

  private extractTreble(audioData: number[]): number {
    const trebleRange = audioData.slice(96);
    return trebleRange.reduce((sum, val) => sum + val, 0) / trebleRange.length;
  }

  private analyzeRhythm(bass: number, mid: number): number {
    // Detect rhythmic patterns in bass and mid frequencies
    const rhythmicStrength = Math.max(bass * 1.2, mid * 0.8);
    
    // Add temporal analysis
    if (this.beatHistory.length > 4) {
      const recentBeats = this.beatHistory.slice(-4);
      const consistency = this.calculateConsistency(recentBeats);
      return rhythmicStrength * (1 + consistency * 0.5);
    }
    
    return rhythmicStrength;
  }

  private analyzeMelody(mid: number, treble: number): number {
    // Melody detection focuses on mid-to-high frequencies
    const melodicContent = (mid * 0.6 + treble * 0.8);
    
    // Detect melodic movement
    if (this.previousFeatures) {
      const movement = Math.abs(melodicContent - (this.previousFeatures.mid * 0.6 + this.previousFeatures.treble * 0.8));
      return Math.min(1, melodicContent + movement * 0.3);
    }
    
    return melodicContent;
  }

  private analyzeHarmony(audioData: number[]): number {
    // Simplified harmonic analysis based on frequency distribution
    const segments = 8;
    const segmentSize = Math.floor(audioData.length / segments);
    let harmonyScore = 0;
    
    for (let i = 0; i < segments - 1; i++) {
      const segment1 = audioData.slice(i * segmentSize, (i + 1) * segmentSize);
      const segment2 = audioData.slice((i + 1) * segmentSize, (i + 2) * segmentSize);
      
      const correlation = this.calculateCorrelation(segment1, segment2);
      harmonyScore += correlation;
    }
    
    return harmonyScore / (segments - 1);
  }

  private analyzeDynamics(audioData: number[]): number {
    const total = audioData.reduce((sum, val) => sum + val, 0);
    const average = total / audioData.length;
    
    // Calculate variance for dynamics
    const variance = audioData.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / audioData.length;
    return Math.min(1, Math.sqrt(variance) * 2);
  }

  private calculateEnergy(audioData: number[]): number {
    const rms = Math.sqrt(audioData.reduce((sum, val) => sum + val * val, 0) / audioData.length);
    return Math.min(1, rms * 2);
  }

  private estimateTempo(rhythm: number): number {
    // Simplified tempo estimation based on rhythm strength and history
    if (this.beatHistory.length < 8) return 120; // Default BPM
    
    const recentBeats = this.beatHistory.slice(-8);
    const avgBeatStrength = recentBeats.reduce((sum, beat) => sum + beat, 0) / recentBeats.length;
    
    // Map rhythm strength to estimated BPM (60-180 range)
    return 60 + (avgBeatStrength * 120);
  }

  private determineMood(energy: number, harmony: number, dynamics: number): AudioFeatures['mood'] {
    if (energy < 0.3 && harmony > 0.6) return 'calm';
    if (energy > 0.7 && dynamics > 0.5) return 'energetic';
    if (harmony < 0.4 && dynamics > 0.6) return 'dramatic';
    if (energy < 0.5 && harmony < 0.5) return 'mysterious';
    return 'joyful';
  }

  private analyzeContext(features: AudioFeatures, audioData: number[]): MusicContext {
    const beatDrop = this.detectBeatDrop(features);
    const vocalPresence = this.detectVocalPresence(audioData);
    const instrumentalDensity = this.calculateInstrumentalDensity(audioData);
    const emotionalIntensity = (features.energy + features.dynamics + features.harmony) / 3;
    const genreHint = this.detectGenre(features);

    return {
      beatDrop,
      vocalPresence,
      instrumentalDensity,
      emotionalIntensity,
      genreHint
    };
  }

  private detectBeatDrop(features: AudioFeatures): boolean {
    if (!this.previousFeatures) return false;
    
    const bassIncrease = features.bass - this.previousFeatures.bass;
    const energyIncrease = features.energy - this.previousFeatures.energy;
    
    return bassIncrease > 0.3 && energyIncrease > 0.2;
  }

  private detectVocalPresence(audioData: number[]): boolean {
    // Vocal frequencies typically in 85Hz-255Hz and 2kHz-4kHz
    const vocalLow = audioData.slice(8, 24);
    const vocalHigh = audioData.slice(80, 120);
    
    const vocalScore = (
      vocalLow.reduce((sum, val) => sum + val, 0) / vocalLow.length +
      vocalHigh.reduce((sum, val) => sum + val, 0) / vocalHigh.length
    ) / 2;
    
    return vocalScore > 0.4;
  }

  private calculateInstrumentalDensity(audioData: number[]): number {
    // Calculate how "full" the frequency spectrum is
    const nonZeroFreqs = audioData.filter(val => val > 0.1).length;
    return nonZeroFreqs / audioData.length;
  }

  private detectGenre(features: AudioFeatures): MusicContext['genreHint'] {
    if (features.bass > 0.7 && features.energy > 0.6) return 'electronic';
    if (features.harmony > 0.7 && features.energy < 0.4) return 'classical';
    if (features.rhythm > 0.6 && features.bass > 0.5) return 'rock';
    if (features.energy < 0.3 && features.harmony > 0.5) return 'ambient';
    if (features.mid > 0.6 && features.melody > 0.5) return 'voice';
    return 'acoustic';
  }

  private calculateConsistency(values: number[]): number {
    if (values.length < 2) return 0;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    
    return Math.max(0, 1 - Math.sqrt(variance));
  }

  private calculateCorrelation(arr1: number[], arr2: number[]): number {
    if (arr1.length !== arr2.length) return 0;
    
    const mean1 = arr1.reduce((sum, val) => sum + val, 0) / arr1.length;
    const mean2 = arr2.reduce((sum, val) => sum + val, 0) / arr2.length;
    
    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;
    
    for (let i = 0; i < arr1.length; i++) {
      const diff1 = arr1[i] - mean1;
      const diff2 = arr2[i] - mean2;
      
      numerator += diff1 * diff2;
      denominator1 += diff1 * diff1;
      denominator2 += diff2 * diff2;
    }
    
    const denominator = Math.sqrt(denominator1 * denominator2);
    return denominator === 0 ? 0 : numerator / denominator;
  }

  private updateHistory(rhythm: number, energy: number): void {
    this.beatHistory.push(rhythm);
    this.energyHistory.push(energy);
    
    // Keep only recent history
    if (this.beatHistory.length > 20) this.beatHistory.shift();
    if (this.energyHistory.length > 20) this.energyHistory.shift();
  }
}
