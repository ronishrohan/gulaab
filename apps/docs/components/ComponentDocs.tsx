"use client";

import { useState } from "react";
import { Bell, CloudArrowUp, Gear, Heart, Plus, X } from "@phosphor-icons/react";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  IconButton,
  Kbd,
  LinkButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  Select,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  TextField,
  Toast,
  Tooltip,
} from "@gulaab/ui";
import { Sidebar } from "./Sidebar";
import { SoundButton } from "./SoundButton";
import { COMPONENTS } from "./componentRegistry";

interface DemoSection {
  title: string;
  description?: string;
  content: React.ReactNode;
}

interface PageConfig {
  title: string;
  description: string;
  hero: React.ReactNode;
  sections: DemoSection[];
  soundRelevant?: boolean;
}

function PageFrame({ title, description, hero, sections, soundRelevant }: PageConfig) {
  return (
    <div className="docs-shell">
      <Sidebar />
      <main className="docs-main">
        <article className="docs-page">
          <header className="docs-hero">
            <p className="docs-kicker">Gulaab</p>
            <h1 className="docs-title">{title}</h1>
            <p className="docs-description">{description}</p>
          </header>
          <div className="docs-hero-card">{hero}</div>
          {sections.map((section) => (
            <section className="docs-section" key={section.title}>
              <div className="docs-section-header">
                <h2 className="docs-section-title">{section.title}</h2>
                {section.description && <p className="docs-section-description">{section.description}</p>}
              </div>
              <div className="docs-demo">{section.content}</div>
            </section>
          ))}
          <section className="docs-section">
            <div className="docs-section-header">
              <h2 className="docs-section-title">Accessibility and motion</h2>
              <p className="docs-section-description">Every shipped component page names the interaction contract, not only the visual state.</p>
            </div>
            <div className="docs-grid">
              <div className="docs-card">
                <p className="docs-card-title">Accessibility</p>
                <p className="docs-card-copy">Prefer native semantics, visible labels, focus rings, and ARIA only where the native element needs extra context.</p>
              </div>
              <div className="docs-card">
                <p className="docs-card-title">Motion</p>
                <p className="docs-card-copy">State changes stay under 300ms, use exact transition properties, and collapse to near-instant behavior for reduced motion.</p>
              </div>
              {soundRelevant && (
                <div className="docs-card">
                  <p className="docs-card-title">Sound</p>
                  <p className="docs-card-copy">Sound is pointer-only, user-disableable from the sidebar, and never the only signal for state.</p>
                </div>
              )}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

function FieldGrid() {
  return (
    <div className="docs-grid">
      <TextField label="Project" placeholder="Gulaab interface" helperText="Labels stay above fields." />
      <TextField label="Email" type="email" defaultValue="hello@gulaab.test" />
      <TextField label="Handle" error="Use lowercase letters only." defaultValue="Gulaab" />
    </div>
  );
}

function ToastDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="docs-row">
      <Button variant="soft" onClick={() => setVisible(true)}>Show toast</Button>
      {visible && <Toast title="Upload complete" description="Sound is a secondary cue. The visual state carries the message." onClose={() => setVisible(false)} />}
    </div>
  );
}

const pages: Record<string, PageConfig> = {
  button: {
    title: "Button",
    soundRelevant: true,
    description: "A tactile pressable for primary actions, quiet actions, loading states, and optional sound feedback.",
    hero: <SoundButton loading={false}><CloudArrowUp size={17} aria-hidden="true" />Upload</SoundButton>,
    sections: [
      { title: "Variants", description: "One Gulaab accent, four useful treatments.", content: <div className="docs-row"><SoundButton variant="solid">Solid</SoundButton><SoundButton variant="soft">Soft</SoundButton><SoundButton variant="outline">Outline</SoundButton><SoundButton variant="ghost">Ghost</SoundButton></div> },
      { title: "Tones", description: "Neutral and functional tones exist for meaning, not decoration.", content: <div className="docs-row"><Button tone="primary">Primary</Button><Button tone="neutral">Neutral</Button><Button tone="danger">Danger</Button><Button tone="warning">Warning</Button></div> },
      { title: "States", content: <div className="docs-row"><Button loading>Uploading</Button><Button disabled>Disabled</Button><Button variant="soft" tone="neutral">Quiet</Button></div> },
    ],
  },
  "icon-button": {
    title: "Icon Button",
    soundRelevant: true,
    description: "A square pressable for dense controls that still keeps a generous hit area.",
    hero: <IconButton aria-label="Notifications"><Bell size={18} /></IconButton>,
    sections: [
      { title: "Variants", content: <div className="docs-row"><IconButton aria-label="Add"><Plus size={18} /></IconButton><IconButton variant="soft" aria-label="Favorite"><Heart size={18} /></IconButton><IconButton variant="outline" aria-label="Settings"><Gear size={18} /></IconButton><IconButton variant="ghost" aria-label="Close"><X size={18} /></IconButton></div> },
      { title: "Sizes", content: <div className="docs-row"><IconButton size="small" aria-label="Small"><Plus size={15} /></IconButton><IconButton size="medium" aria-label="Medium"><Plus size={17} /></IconButton><IconButton size="large" aria-label="Large"><Plus size={20} /></IconButton></div> },
    ],
  },
  "link-button": {
    title: "Link Button",
    description: "A link-shaped action for navigation that should not pretend to submit forms.",
    hero: <LinkButton href="https://www.raphaelsalaja.com/" target="_blank" rel="noreferrer">Read the reference</LinkButton>,
    sections: [
      { title: "Treatments", content: <div className="docs-row"><LinkButton href="#">Text link</LinkButton><LinkButton href="#" variant="outline">Outline link</LinkButton><LinkButton href="#" variant="soft">Soft link</LinkButton></div> },
    ],
  },
  "text-field": {
    title: "Text Field",
    description: "A labeled native input with helper and error text wired for accessibility.",
    hero: <div style={{ width: "min(100%, 360px)" }}><TextField label="Email" placeholder="you@example.com" helperText="No placeholder-as-label pattern." /></div>,
    sections: [
      { title: "States", content: <FieldGrid /> },
      { title: "Sizes", content: <div className="docs-grid"><TextField size="small" label="Small" placeholder="Compact" /><TextField size="medium" label="Medium" placeholder="Default" /><TextField size="large" label="Large" placeholder="Roomy" /></div> },
    ],
  },
  textarea: {
    title: "Textarea",
    description: "A multi-line field for slower, deliberate input.",
    hero: <div style={{ width: "min(100%, 420px)" }}><Textarea label="Note" placeholder="What should the interface remember?" /></div>,
    sections: [
      { title: "States", content: <div className="docs-grid"><Textarea label="Default" defaultValue="Motion should explain the change." /><Textarea label="Error" error="Keep it under 160 characters." defaultValue="This is intentionally too long for the example." /></div> },
    ],
  },
  select: {
    title: "Select",
    description: "A native select for compact choices where custom popovers would add friction.",
    hero: <div style={{ width: "min(100%, 320px)" }}><Select label="Motion"><option>Subtle</option><option>Expressive</option><option>Reduced</option></Select></div>,
    sections: [
      { title: "States", content: <div className="docs-grid"><Select label="Default"><option>Gulaab</option><option>Neutral</option></Select><Select label="Error" error="Pick an available option."><option>Unavailable</option></Select></div> },
    ],
  },
  checkbox: {
    title: "Checkbox",
    description: "A native checkbox with a custom visual mark and clear supporting copy.",
    hero: <Checkbox label="Enable sound" description="Only for meaningful pointer actions." defaultChecked />,
    sections: [
      { title: "States", content: <div className="docs-grid"><Checkbox label="Default" description="Unchecked state." /><Checkbox label="Checked" defaultChecked /><Checkbox label="Disabled" disabled /><Checkbox label="Error" error="This choice is required." /></div> },
    ],
  },
  switch: {
    title: "Switch",
    description: "A binary setting control for immediate on/off state.",
    hero: <Switch label="Dark mode" description="The thumb moves with a short ease-out." defaultPressed />,
    sections: [
      { title: "States", content: <div className="docs-grid"><Switch label="Sounds" description="Subtle feedback." /><Switch label="Reduced motion" defaultPressed /><Switch label="Disabled" disabled /></div> },
    ],
  },
  "radio-group": {
    title: "Radio Group",
    description: "A single-choice group that keeps the decision visible.",
    hero: <RadioGroup name="hero-density" legend="Density" defaultValue="calm" options={[{ value: "calm", label: "Calm", description: "More space." }, { value: "dense", label: "Dense", description: "More controls." }]} />,
    sections: [
      { title: "Options", content: <RadioGroup name="motion" legend="Motion level" defaultValue="subtle" options={[{ value: "none", label: "None" }, { value: "subtle", label: "Subtle" }, { value: "expressive", label: "Expressive", disabled: true }]} /> },
    ],
  },
  slider: {
    title: "Slider",
    description: "A native range input for continuous values with tabular readouts.",
    hero: <div style={{ width: "min(100%, 360px)" }}><Slider label="Intensity" valueLabel="42" defaultValue={42} /></div>,
    sections: [
      { title: "Ranges", content: <div className="docs-grid"><Slider label="Volume" valueLabel="20" defaultValue={20} /><Slider label="Radius" valueLabel="12px" defaultValue={60} /></div> },
    ],
  },
  badge: {
    title: "Badge",
    description: "Small status text with restrained color and clear meaning.",
    hero: <Badge>Gulaab primary</Badge>,
    sections: [
      { title: "Variants", content: <div className="docs-row"><Badge variant="solid">Solid</Badge><Badge variant="soft">Soft</Badge><Badge variant="outline">Outline</Badge></div> },
      { title: "Tones", content: <div className="docs-row"><Badge tone="primary">Primary</Badge><Badge tone="neutral">Neutral</Badge><Badge tone="danger">Danger</Badge><Badge tone="warning">Warning</Badge></div> },
    ],
  },
  avatar: {
    title: "Avatar",
    description: "A person or entity marker with a quiet fallback.",
    hero: <div className="docs-row"><Avatar fallback="RS" size="large" /><Avatar fallback="SK" size="large" src="https://picsum.photos/seed/gulaab-avatar/160/160" alt="Sample portrait" /></div>,
    sections: [
      { title: "Sizes", content: <div className="docs-row"><Avatar fallback="SM" size="small" /><Avatar fallback="MD" size="medium" /><Avatar fallback="LG" size="large" /></div> },
    ],
  },
  kbd: {
    title: "Kbd",
    description: "Keyboard hints with tabular rhythm and tactile inset shadow.",
    hero: <div className="docs-row"><Kbd>Cmd</Kbd><Kbd>K</Kbd></div>,
    sections: [
      { title: "Sizes", content: <div className="docs-row"><Kbd size="small">Esc</Kbd><Kbd size="medium">Tab</Kbd><Kbd size="large">Enter</Kbd></div> },
    ],
  },
  tooltip: {
    title: "Tooltip",
    description: "A delayed hint for secondary information, with instant-feeling adjacent hovers.",
    hero: <Tooltip content="Subtle details compound."><Button variant="outline">Hover me</Button></Tooltip>,
    sections: [
      { title: "Sides", content: <div className="docs-row"><Tooltip content="Top" side="top"><Button variant="soft">Top</Button></Tooltip><Tooltip content="Right" side="right"><Button variant="soft">Right</Button></Tooltip><Tooltip content="Bottom" side="bottom"><Button variant="soft">Bottom</Button></Tooltip></div> },
    ],
  },
  popover: {
    title: "Popover",
    description: "An anchored surface that scales from its trigger and closes without ceremony.",
    hero: <Popover><PopoverTrigger asChild><Button>Open popover</Button></PopoverTrigger><PopoverContent><p className="docs-note">Origin-aware motion keeps anchored surfaces feeling connected.</p></PopoverContent></Popover>,
    sections: [
      { title: "Content", content: <Popover><PopoverTrigger asChild><Button variant="outline">Settings</Button></PopoverTrigger><PopoverContent><div className="docs-card"><p className="docs-card-title">Sound</p><p className="docs-card-copy">Enabled for pointer confirmations only.</p></div></PopoverContent></Popover> },
    ],
  },
  dialog: {
    title: "Dialog",
    description: "A modal surface with staged backdrop, panel, title, and description.",
    hero: <Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Upload file</DialogTitle><DialogDescription>The visual state carries the message. Sound only reinforces it.</DialogDescription></DialogHeader><div className="docs-row"><DialogClose asChild><Button variant="soft" tone="neutral">Cancel</Button></DialogClose><DialogClose asChild><Button>Done</Button></DialogClose></div><DialogClose /></DialogContent></Dialog>,
    sections: [
      { title: "Staging", content: <p className="docs-note">Backdrop dims first, the panel settles from a visible shape, and focus remains inside until close.</p> },
    ],
  },
  tabs: {
    title: "Tabs",
    description: "A compact way to switch local views without route changes.",
    hero: <Tabs items={[{ value: "craft", label: "Craft", content: <p className="docs-note">Design details should be felt before they are noticed.</p> }, { value: "sound", label: "Sound", content: <p className="docs-note">Use sound as a secondary action.</p> }]} />,
    sections: [
      { title: "States", content: <Tabs items={[{ value: "one", label: "Overview", content: "Overview content" }, { value: "two", label: "Motion", content: "Motion content" }, { value: "three", label: "A11y", content: "Accessibility content" }]} /> },
    ],
  },
  spinner: {
    title: "Spinner",
    description: "A fast loading indicator that stays small and quiet.",
    hero: <Spinner size="large" label="Loading" />,
    sections: [
      { title: "Sizes", content: <div className="docs-row"><Spinner size="small" /><Spinner size="medium" /><Spinner size="large" /></div> },
    ],
  },
  progress: {
    title: "Progress",
    description: "A determinate progress bar with accessible value semantics.",
    hero: <div style={{ width: "min(100%, 420px)" }}><Progress value={68} label="Upload progress" /></div>,
    sections: [
      { title: "Values", content: <div className="docs-grid"><Progress value={25} label="Quarter" /><Progress value={50} label="Half" /><Progress value={88} label="Almost done" /></div> },
    ],
  },
  toast: {
    title: "Toast",
    soundRelevant: true,
    description: "A temporary status surface for confirmations and recoverable messages.",
    hero: <Toast title="Saved" description="The confirmation is visual first." />,
    sections: [
      { title: "Interactive", content: <ToastDemo /> },
    ],
  },
};

export function ComponentDocPage({ slug }: { slug: string }) {
  const config = pages[slug] ?? pages.button;
  const item = COMPONENTS.find((component) => component.slug === slug);
  return <PageFrame {...config} title={item?.name ?? config.title} />;
}
