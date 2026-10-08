import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta = {
  title: "Foundations/Stacking",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * Named z-index layers (scales.css). Use the name, never a raw number, so
 * layers can't silently collide. shadcn overlays already sit at `z-overlay` (50).
 */
const LAYERS = [
  { className: "z-toast", value: 100, use: "Notifications above everything" },
  {
    className: "z-overlay",
    value: 50,
    use: "Dialogs, sheets, popovers, menus",
  },
  { className: "z-sticky", value: 20, use: "Sticky headers and toolbars" },
  { className: "z-raised", value: 10, use: "Elements lifted within a surface" },
]

export const Layers: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      {LAYERS.map((layer) => (
        <div
          key={layer.className}
          className="flex items-center justify-between rounded-2xl border border-border px-4 py-3"
        >
          <div className="flex flex-col">
            <code className="text-body-sm">{layer.className}</code>
            <span className="text-caption text-muted-foreground">
              {layer.use}
            </span>
          </div>
          <span className="text-caption text-muted-foreground tabular-nums">
            {layer.value}
          </span>
        </div>
      ))}
    </div>
  ),
}
