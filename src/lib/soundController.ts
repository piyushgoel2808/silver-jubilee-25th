// Luxury Web Audio API Procedural Synthesizer & Royal Ambience Controller

class RoyalSoundController {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing: boolean = false;
  private bgOscillators: OscillatorNode[] = [];
  private masterGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private isAudioAvailable: boolean = true;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();
  private melodyInterval: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioElement = new Audio('/flow/silver-jubilee-theme.mp3');
        this.audioElement.loop = true;
        this.audioElement.onerror = () => {
          // Fallback cleanly to procedural synthesizer if external file is missing
          this.isAudioAvailable = false;
          this.audioElement = null;
        };
      } catch (e) {
        this.isAudioAvailable = false;
      }
    }
  }

  private initAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public subscribe(listener: (isPlaying: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(isPlaying: boolean) {
    this.listeners.forEach((cb) => cb(isPlaying));
  }

  public async startMusic(): Promise<boolean> {
    this.initAudioContext();

    if (this.audioElement && this.isAudioAvailable) {
      try {
        await this.audioElement.play();
        this.notify(true);
        return true;
      } catch (err) {
        this.isAudioAvailable = false;
      }
    }

    // Start Procedural Royal Ambient Indian Tanpura & Sitar Soundscape
    this.startProceduralAmbience();
    this.notify(true);
    return true;
  }

  public pauseMusic(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopProceduralAmbience();
    this.notify(false);
  }

  public toggle(): boolean {
    if (this.isPlaying()) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isPlaying(): boolean {
    if (this.audioElement && !this.audioElement.paused && this.audioElement.currentTime > 0) {
      return true;
    }
    return this.isSynthesizing;
  }

  private startProceduralAmbience(): void {
    const ctx = this.initAudioContext();
    if (!ctx || !this.masterGain || this.isSynthesizing) return;

    this.isSynthesizing = true;

    // Raag Yaman / Bhupali Notes: Sa (D3 = 146.83Hz), Pa (A3 = 220Hz), High Sa (D4 = 293.66Hz)
    const baseFreqs = [146.83, 220.0, 293.66, 440.0];

    // Rich warm Tanpura drone
    baseFreqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle subtle frequency vibrato (shimmer)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.2 + index * 0.05;
      lfoGain.gain.value = 1.2;
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(0.04 / (index + 1), ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      this.bgOscillators.push(osc);
    });

    // Auspicious gentle temple plucked notes every 3.2 seconds
    const scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33]; // D Major Pentatonic / Raag Bhupali
    this.melodyInterval = setInterval(() => {
      if (!this.isSynthesizing || !this.audioCtx) return;
      const noteFreq = scale[Math.floor(Math.random() * scale.length)];
      this.playGentlePluck(noteFreq);
    }, 3200);
  }

  private playGentlePluck(freq: number): void {
    if (!this.audioCtx || !this.masterGain) return;
    const ctx = this.audioCtx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.9);
  }

  private stopProceduralAmbience(): void {
    this.isSynthesizing = false;
    this.bgOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.bgOscillators = [];
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  // Interactive Sound Effects
  public playWaxSealCrack(): void {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  public playTasselBell(): void {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // High crystalline temple chime (Ghanti)
    [1046.5, 2093, 3135.96].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.1 / (i + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    });
  }

  public playCameraShutter(): void {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playScratchFoilSound(): void {
    const ctx = this.initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3500;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }
}

export const soundController = typeof window !== 'undefined' ? new RoyalSoundController() : (null as any);
