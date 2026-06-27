import * as React from "react";
import { cn } from "../../lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, items, defaultValue, value, onValueChange, ...props }, ref) => {
  const baseId = React.useId();
  const firstValue = items[0]?.value ?? "";
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? firstValue);
  const rawValue = value ?? internalValue;
  const selectedValue = items.some((item) => item.value === rawValue) ? rawValue : firstValue;
  const selectedIndex = Math.max(0, items.findIndex((item) => item.value === selectedValue));
  const selectedItem = items[selectedIndex];

  function select(next: string) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function focusTab(index: number) {
    const next = items[index];
    if (!next) return;
    select(next.value);
    requestAnimationFrame(() => {
      document.getElementById(`${baseId}-tab-${next.value}`)?.focus();
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!items.length) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab((selectedIndex + 1) % items.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab((selectedIndex - 1 + items.length) % items.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(items.length - 1);
    }
  }

  return (
    <div ref={ref} className={cn("gulaab-tabs", className)} {...props}>
      <div className="gulaab-tabs-list" role="tablist" onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const selected = selectedValue === item.value;
          const tabId = `${baseId}-tab-${item.value}`;
          const panelId = `${baseId}-panel-${item.value}`;
          return (
            <button
              key={item.value}
              id={tabId}
              type="button"
              className="gulaab-tabs-trigger"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selectedItem && (
        <div className="gulaab-tabs-panel" role="tabpanel" id={`${baseId}-panel-${selectedItem.value}`} aria-labelledby={`${baseId}-tab-${selectedItem.value}`}>
          {selectedItem.content}
        </div>
      )}
    </div>
  );
});

Tabs.displayName = "Tabs";

export { Tabs };
