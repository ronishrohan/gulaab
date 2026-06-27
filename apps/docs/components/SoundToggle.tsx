"use client";

import { useSyncExternalStore } from "react";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
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
    <Button className="docs-sidebar-action" variant="ghost" tone="neutral" size="small" onClick={() => storeSound(!enabled)} aria-pressed={enabled} aria-label={`${enabled ? "Disable" : "Enable"} sounds`}>
      {enabled ? <IconVolume size={15} stroke={1.8} aria-hidden="true" /> : <IconVolumeOff size={15} stroke={1.8} aria-hidden="true" />}
      {enabled ? "Sound on" : "Sound off"}
    </Button>
  );
}
