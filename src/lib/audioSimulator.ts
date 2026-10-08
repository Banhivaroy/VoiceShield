// Web Audio API helper for realistic telecom and synthetic telemetry audio simulations

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAlertBeep() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.warn("Audio Context not allowed yet:", e);
  }
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
  } catch (e) {
    console.warn("Audio Context error:", e);
  }
}

// Generate realistic simulated phone call speech pattern (robotic / synthetic jitter vs human warmth)
export function startVoiceSimulation(isSynthetic: boolean = true) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const masterGain = ctx.createGain();

    if (isSynthetic) {
      // Artificial glottal pulse, robotic carrier
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);

      // Micro-jitter modulation (unnatural mechanical oscillation)
      mod.type = 'square';
      mod.frequency.setValueAtTime(12, ctx.currentTime);
      modGain.gain.setValueAtTime(30, ctx.currentTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(8, ctx.currentTime);
    } else {
      // Natural human vocal warmth
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(115, ctx.currentTime);

      mod.type = 'sine';
      mod.frequency.setValueAtTime(4, ctx.currentTime);
      modGain.gain.setValueAtTime(6, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
    }

    mod.connect(modGain);
    modGain.connect(osc.frequency);

    osc.connect(filter);
    filter.connect(masterGain);
    masterGain.gain.setValueAtTime(0.1, ctx.currentTime);
    masterGain.connect(ctx.destination);

    osc.start();
    mod.start();

    return () => {
      try {
        masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        setTimeout(() => {
          osc.stop();
          mod.stop();
          osc.disconnect();
          mod.disconnect();
        }, 220);
      } catch (err) {
        // ignore
      }
    };
  } catch (e) {
    console.warn("Audio simulation error:", e);
    return () => {};
  }
}
