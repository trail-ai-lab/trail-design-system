import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta = {
  title: "Foundations/Elevation",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * How far a surface sits above the page (scales.css). Higher surfaces cast
 * larger, softer shadows. Cards also carry a 1px `ring-foreground/5` edge.
 */
const LEVELS = [
  { className: "shadow-raised", name: "Raised", use: "Cards" },
  {
    className: "shadow-overlay",
    name: "Overlay",
    use: "Popovers, menus, tooltips",
  },
  { className: "shadow-modal", name: "Modal", use: "Dialogs, sheets" },
]

export const Levels: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-8 bg-muted/40 p-8 sm:grid-cols-3">
      {LEVELS.map((level) => (
        <div
          key={level.className}
          className={`flex h-32 flex-col justify-end gap-1 rounded-card bg-card p-5 ring-1 ring-foreground/5 ${level.className}`}
        >
          <p className="text-title">{level.name}</p>
          <code className="text-caption text-muted-foreground">
            {level.className}
          </code>
          <p className="text-caption text-muted-foreground">{level.use}</p>
        </div>
      ))}
    </div>
  ),
}
