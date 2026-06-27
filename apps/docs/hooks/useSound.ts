"use client";

export type SoundVariant = "press" | "soft" | "confirm" | "toggle" | "error";

type SoundProfile = {
  frequency: number;
  endFrequency: number;
  decay: number;
  gain: number;
  type: OscillatorType;
};

const PROFILES: Record<SoundVariant, SoundProfile> = {
  press: { frequency: 520, endFrequency: 320, decay: 0.055, gain: 0.08, type: "sine" },
  soft: { frequency: 360, endFrequency: 280, decay: 0.075, gain: 0.05, type: "sine" },
  confirm: { frequency: 620, endFrequency: 920, decay: 0.09, gain: 0.07, type: "triangle" },
  toggle: { frequency: 420, endFrequency: 560, decay: 0.07, gain: 0.055, type: "sine" },
  error: { frequency: 180, endFrequency: 120, decay: 0.1, gain: 0.06, type: "triangle" },
};

let sharedContext: AudioContext | null = null;
let resumePromise: Promise<void> | null = null;

export function soundEnabled() {
  if (typeof window === "undefined") return false;
  if ("ontouchstart" in window) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return localStorage.getItem("sky-sounds") !== "false";
}

function getContext() {
  if (typeof AudioContext === "undefined") return null;
  if (!sharedContext || sharedContext.state === "closed") sharedContext = new AudioContext();
  return sharedContext;
}

function schedule(context: AudioContext, variant: SoundVariant) {
  const profile = PROFILES[variant];
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = profile.type;
  osc.frequency.setValueAtTime(profile.frequency, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, profile.endFrequency), now + profile.decay);
  gain.gain.setValueAtTime(profile.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + profile.decay);

  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(now);
  osc.stop(now + profile.decay);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

export function playSound(variant: SoundVariant = "press") {
  if (!soundEnabled()) return;
  const context = getContext();
  if (!context) return;

  if (context.state === "suspended") {
    resumePromise ??= context.resume().finally(() => {
      resumePromise = null;
    });
    resumePromise.then(() => {
      if (soundEnabled()) schedule(context, variant);
    }).catch(() => {});
    return;
  }

  schedule(context, variant);
}

export function useSound(variant: SoundVariant = "press") {
  return () => playSound(variant);
}
