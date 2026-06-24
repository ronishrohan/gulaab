"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SoundButton } from "@/components/SoundButton";
import { AnimatingText } from "@/components/AnimatingText";

function HeroCard() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  function handleClick() {
    if (phase !== "idle") return;
    setPhase("loading");
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => setPhase("idle"), 1800);
    }, 2200);
  }

  return (
    <div
      style={{
        borderRadius: 14,
        background: "var(--bg-subtle)",
        padding: "120px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 64,
      }}
    >
      <SoundButton
        variant="solid"
        color="accent"
        size="medium"
        loading={phase === "loading"}
        onClick={handleClick}
        soundVariant="solid"
        className="border-0 ring-1 ring-[oklch(0.76_0.19_12.59)]"
      >
        <AnimatingText>
          {phase === "done" ? (
            <>
              <span style={{ marginRight: 6 }}>✓</span>
              Uploaded
            </>
          ) : (
            "Upload"
          )}
        </AnimatingText>
      </SoundButton>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg)",
      color: "var(--text)",
      maxWidth: 1100,
      margin: "0 auto",
      padding: "0 64px",
      display: "flex",
    }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "120px 0 96px 48px", minWidth: 0 }}>
        <h1 style={{
          fontSize: 22, fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--text)", marginBottom: 6,
        }}>
          Button
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 48 }}>
          buttons that thock. interactions that feel right.
        </p>

        <HeroCard />

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <ShowcaseRow label="variant">
            <SoundButton variant="solid" color="accent" soundVariant="solid">Solid</SoundButton>
            <SoundButton variant="soft" color="accent" soundVariant="soft">Soft</SoundButton>
            <SoundButton variant="ghost" color="accent" soundVariant="ghost">Ghost</SoundButton>
            <SoundButton variant="outline" color="accent" soundVariant="outline">Outline</SoundButton>
          </ShowcaseRow>

          <ShowcaseRow label="color">
            <SoundButton variant="solid" color="accent">Accent</SoundButton>
            <SoundButton variant="solid" color="blue">Blue</SoundButton>
            <SoundButton variant="solid" color="red">Red</SoundButton>
            <SoundButton variant="solid" color="amber">Amber</SoundButton>
            <SoundButton variant="solid" color="black">Black</SoundButton>
          </ShowcaseRow>

          <ShowcaseRow label="size">
            <SoundButton size="micro">Micro</SoundButton>
            <SoundButton size="tiny">Tiny</SoundButton>
            <SoundButton size="small">Small</SoundButton>
            <SoundButton size="medium">Medium</SoundButton>
            <SoundButton size="large">Large</SoundButton>
          </ShowcaseRow>

          <ShowcaseRow label="soft">
            <SoundButton variant="soft" color="accent" soundVariant="soft">Accent</SoundButton>
            <SoundButton variant="soft" color="blue" soundVariant="soft">Blue</SoundButton>
            <SoundButton variant="soft" color="red" soundVariant="soft">Red</SoundButton>
            <SoundButton variant="soft" color="amber" soundVariant="soft">Amber</SoundButton>
            <SoundButton variant="soft" color="black" soundVariant="soft">Black</SoundButton>
          </ShowcaseRow>

          <ShowcaseRow label="outline">
            <SoundButton variant="outline" color="accent" soundVariant="outline">Accent</SoundButton>
            <SoundButton variant="outline" color="blue" soundVariant="outline">Blue</SoundButton>
            <SoundButton variant="outline" color="red" soundVariant="outline">Red</SoundButton>
            <SoundButton variant="outline" color="amber" soundVariant="outline">Amber</SoundButton>
            <SoundButton variant="outline" color="black" soundVariant="outline">Black</SoundButton>
          </ShowcaseRow>

          <ShowcaseRow label="states">
            <SoundButton loading>Loading</SoundButton>
            <SoundButton variant="soft" loading>Loading</SoundButton>
            <SoundButton disabled>Disabled</SoundButton>
            <SoundButton variant="outline" disabled>Disabled</SoundButton>
          </ShowcaseRow>

        </div>
      </main>
    </div>
  );
}

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "0 40px", alignItems: "center" }}>
      <p style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 500 }}>{label}</p>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}
