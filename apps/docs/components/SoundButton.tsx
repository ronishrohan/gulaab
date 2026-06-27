"use client";

import { Button, type ButtonProps } from "@gulaab/ui";
import { playSound, type SoundVariant } from "@/hooks/useSound";

interface SoundButtonProps extends ButtonProps {
  soundVariant?: SoundVariant;
}

export function SoundButton({ soundVariant = "press", onClick, ...props }: SoundButtonProps) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        if ("pointerType" in event.nativeEvent && !event.defaultPrevented) playSound(soundVariant);
        onClick?.(event);
      }}
    />
  );
}
