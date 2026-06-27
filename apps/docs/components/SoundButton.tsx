"use client";

import { Button, type ButtonProps } from "@gulaab/ui";
import { playSound, type SoundVariant } from "@/hooks/useSound";

interface SoundButtonProps extends ButtonProps {
  soundVariant?: SoundVariant;
}

export function SoundButton({ soundVariant = "press", onClick, ...props }: SoundButtonProps) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (!event.defaultPrevented && event.detail > 0) {
      playSound(soundVariant);
    }
  }

  return <Button {...props} onClick={handleClick} />;
}
