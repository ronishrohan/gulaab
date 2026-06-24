"use client";

import { Button, type ButtonProps } from "@sky/ui";
import { playSound } from "@/hooks/useSound";
import type { ButtonVariant } from "@sky/ui";

interface SoundButtonProps extends ButtonProps {
  soundVariant?: ButtonVariant;
}

export function SoundButton({ soundVariant, variant = "solid", onClick, ...props }: SoundButtonProps) {
  const sv = (soundVariant ?? variant) as ButtonVariant;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    playSound(sv as Parameters<typeof playSound>[0]);
    onClick?.(e);
  }

  return <Button variant={variant} {...props} onClick={handleClick} />;
}
