"use client";

type SoundVariant = "solid" | "soft" | "ghost" | "outline" | "toggle";

const PROFILES: Record<SoundVariant, { freq: number; decay: number; gain: number; type: OscillatorType }> = {
  solid:   { freq: 280, decay: 0.09, gain: 0.12, type: "sine" },
  soft:    { freq: 440, decay: 0.12, gain: 0.07, type: "sine" },
  ghost:   { freq: 360, decay: 0.08, gain: 0.09, type: "sine" },
  outline: { freq: 880, decay: 0.06, gain: 0.03, type: "sine" },
  toggle:  { freq: 520, decay: 0.07, gain: 0.06, type: "sine" },
};

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if ("ontouchstart" in window) return false; // disable mobile
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return localStorage.getItem("gulaab-sounds") !== "false";
}

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof AudioContext === "undefined") return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new AudioContext();
  }
  return sharedCtx;
}

function scheduleSound(ctx: AudioContext, variant: SoundVariant) {
  const profile = PROFILES[variant];
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = profile.type;
  osc.frequency.setValueAtTime(profile.freq, now);
  osc.frequency.exponentialRampToValueAtTime(profile.freq * 0.85, now + profile.decay);

  gain.gain.setValueAtTime(profile.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + profile.decay);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + profile.decay);
}

export function playSound(variant: SoundVariant = "solid") {
  if (!isSoundEnabled()) return;

  const ctx = getCtx();
  if (!ctx) return;

  // Must schedule AFTER resume resolves — currentTime is stale while suspended
  if (ctx.state === "suspended") {
    ctx.resume().then(() => scheduleSound(ctx, variant)).catch(() => {});
  } else {
    scheduleSound(ctx, variant);
  }
}

export function useSound(variant: SoundVariant = "solid") {
  return () => playSound(variant);
}
