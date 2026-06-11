import type { Meta, StoryObj } from "@storybook/nextjs"
import { Kbd } from "@/components/ui/kbd"

const meta: Meta<typeof Kbd> = {
  title: "UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <span className="text-muted-foreground text-sm">Open command palette</span>
    </div>
  ),
}

export const Shortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { keys: ["⌘", "K"], label: "Command palette" },
        { keys: ["⌘", "S"], label: "Save" },
        { keys: ["⌘", "⇧", "P"], label: "Export PDF" },
        { keys: ["Esc"], label: "Close dialog" },
      ].map(({ keys, label }) => (
        <div key={label} className="flex items-center justify-between w-56">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="flex gap-1">
            {keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
          </div>
        </div>
      ))}
    </div>
  ),
}
