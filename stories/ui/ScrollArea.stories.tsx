import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea } from "@/components/ui/scroll-area"

// a11y: scrollable-region-focusable disabled. Upstream: Radix ScrollArea's viewport isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  parameters: { a11y: A11Y },
  component: ScrollArea,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof ScrollArea>

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-2xl border border-border">
      <div className="flex flex-col gap-3 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm text-foreground">
            Line {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
}

// ScrollArea only ever renders a vertical ScrollBar internally, so
// horizontal content scrolls (native overflow-x) but has no visible custom
// thumb — only ScrollBar's `orientation="vertical"` default is wired up.
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-2xl border border-border">
      <div className="flex gap-3 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
