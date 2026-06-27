export interface ComponentNavItem {
  name: string;
  slug: string;
  href: string;
  status?: "ready" | "planned";
}

export const COMPONENTS: ComponentNavItem[] = [
  { name: "Button", slug: "button", href: "/" },
  { name: "Icon Button", slug: "icon-button", href: "/icon-button" },
  { name: "Link Button", slug: "link-button", href: "/link-button" },
  { name: "Text Field", slug: "text-field", href: "/text-field" },
  { name: "Textarea", slug: "textarea", href: "/textarea" },
  { name: "Select", slug: "select", href: "/select" },
  { name: "Checkbox", slug: "checkbox", href: "/checkbox" },
  { name: "Switch", slug: "switch", href: "/switch" },
  { name: "Radio Group", slug: "radio-group", href: "/radio-group" },
  { name: "Slider", slug: "slider", href: "/slider" },
  { name: "Badge", slug: "badge", href: "/badge" },
  { name: "Avatar", slug: "avatar", href: "/avatar" },
  { name: "Kbd", slug: "kbd", href: "/kbd" },
  { name: "Tooltip", slug: "tooltip", href: "/tooltip" },
  { name: "Popover", slug: "popover", href: "/popover" },
  { name: "Dialog", slug: "dialog", href: "/dialog" },
  { name: "Tabs", slug: "tabs", href: "/tabs" },
  { name: "Spinner", slug: "spinner", href: "/spinner" },
  { name: "Progress", slug: "progress", href: "/progress" },
  { name: "Toast", slug: "toast", href: "/toast" },
];
