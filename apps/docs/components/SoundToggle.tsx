"use client";

import { useSyncExternalStore } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { Button } from "@gulaab/ui";

const SOUND_EVENT = "gulaab-sound-change";

function getSoundSnapshot() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("gulaab-sounds") !== "false";
}

function subscribeSound(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SOUND_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SOUND_EVENT, callback);
  };
}

function storeSound(enabled: boolean) {
  try {
    localStorage.setItem("gulaab-sounds", enabled ? "true" : "false");
  } finally {
    window.dispatchEvent(new Event(SOUND_EVENT));
  }
}

export function SoundToggle() {
  const enabled = useSyncExternalStore<boolean>(subscribeSound, getSoundSnapshot, () => true);

  return (
    <Button variant="ghost" tone="neutral" size="small" onClick={() => storeSound(!enabled)} aria-pressed={enabled} aria-label={`${enabled ? "Disable" : "Enable"} sounds`}>
      {enabled ? <SpeakerHigh size={15} aria-hidden="true" /> : <SpeakerSlash size={15} aria-hidden="true" />}
      {enabled ? "Sound on" : "Sound off"}
    </Button>
  );
}
