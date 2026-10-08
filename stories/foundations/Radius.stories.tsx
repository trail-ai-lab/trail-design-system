import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta = {
  title: "Foundations/Radius",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * Corner radius scale from the preset (globals.css, derived from --radius) plus
 * `rounded-card`, the clamped card radius (semantic.css). Rule of thumb: an inner
 * element's radius is smaller than its container's.
 */
const STEPS = [
  { className: "rounded-sm", use: "checkboxes, small tags" },
  { className: "rounded-md", use: "inputs inside dense controls" },
  { className: "rounded-lg", use: "icon tiles (IconTile), menu items" },
  { className: "rounded-xl", use: "small insets" },
  { className: "rounded-2xl", use: "buttons, badges, list rows (Item), menus" },
  { className: "rounded-3xl", use: "popovers" },
  { className: "rounded-card", use: "cards, dialogs, large image frames" },
  { className: "rounded-full", use: "avatars, status dots, pills" },
]

export const Scale: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
      {STEPS.map((step) => (
        <div key={step.className} className="flex flex-col gap-2">
          <div
            className={`h-20 border border-border bg-muted ${step.className}`}
          />
          <code className="text-caption">{step.className}</code>
          <p className="text-caption text-muted-foreground">{step.use}</p>
        </div>
      ))}
    </div>
  ),
}
