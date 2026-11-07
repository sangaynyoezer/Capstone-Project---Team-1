/**
 * Soft, friendly ambient music generator using Web Audio API
 * Generates warm, gentle acoustic chord progressions (Fmaj7 -> Cmaj7 -> Dm7 -> Am7)
 * designed to play soothingly in the background behind instructional voice-overs.
 */

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private currentChordIndex = 0;
  private isEnabled = true;

  // Welcoming warm chords in F Major / C Major (peaceful, comforting tone)
  private chords = [
    [174.61, 220.00, 261.63, 329.63], // F3, A3, C4, E4 (Fmaj7)
    [130.81, 196.00, 246.94, 261.63], // C3, G3, B3, C4 (Cmaj7)
    [146.83, 220.00, 261.63, 349.23], // D3, A3, C4, F4 (Dm7)
    [110.00, 164.81, 220.00, 261.63], // A2, E3, A3, C4 (Am7)
  ];

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.isPlaying) {
      this.stop();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public start(volume: number = 0.08) {
    if (!this.isEnabled) return;
    if (this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      // Smooth fade in
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 1.2);
      this.masterGain.connect(this.ctx.destination);

      this.isPlaying = true;
      this.currentChordIndex = 0;
      this.playChord();

      // Cycle chords every 3.5 seconds
      this.intervalId = window.setInterval(() => {
        if (!this.isPlaying) return;
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.playChord();
      }, 3500);
    } catch (e) {
      console.warn('Ambient music audio context init error:', e);
    }
  }

  private playChord() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const chord = this.chords[this.currentChordIndex];

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm triangle/sine mix for soft acoustic feel
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for warm, relaxing tone (removes sharp highs)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + (i * 90), now);

      // Gentle attack and long release envelope
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.1 / chord.length, now + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.4);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.5);
    });
  }

  public stop() {
    if (!this.isPlaying) return;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        // Smooth fade out
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          this.isPlaying = false;
        }, 550);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }
}

export const ambientMusic = new AmbientMusicEngine();
