import type { Meta, StoryObj } from "@storybook/react-vite"
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
    <div className="flex flex-wrap items-center gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <span className="text-sm text-muted-foreground">
        Open command palette
      </span>
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
        <div key={label} className="flex w-56 items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="flex gap-1">
            {keys.map((k) => (
              <Kbd key={k}>{k}</Kbd>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
