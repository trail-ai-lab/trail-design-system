import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "Foundations/Motion",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * Durations and easings (scales.css). Motion explains a change; it never
 * decorates. With the OS "reduce motion" setting on, all motion collapses to
 * near-instant automatically.
 */
const DURATIONS = [
  {
    className: "duration-fast",
    value: "100ms",
    use: "hover, press, small state changes",
  },
  {
    className: "duration-base",
    value: "200ms",
    use: "expand/collapse, tab switches",
  },
  {
    className: "duration-slow",
    value: "300ms",
    use: "overlays and large surfaces entering",
  },
]

export const Durations: Story = {
  render: function DurationsStory() {
    const [on, setOn] = React.useState(false)
    return (
      <div className="flex max-w-xl flex-col gap-6">
        <Button variant="outline" className="w-fit" onClick={() => setOn(!on)}>
          Play
        </Button>
        {DURATIONS.map((d) => (
          <div key={d.className} className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-3">
              <code className="text-caption">{d.className}</code>
              <span className="text-caption text-muted-foreground">
                {d.value} · {d.use}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className={`h-2 rounded-full bg-primary transition-[width] ease-standard ${d.className} ${on ? "w-full" : "w-4"}`}
              />
            </div>
          </div>
        ))}
        <p className="text-caption text-muted-foreground">
          Easing: <code>ease-standard</code> for most transitions,{" "}
          <code>ease-emphasized</code> for entrances that should feel lively.
        </p>
      </div>
    )
  },
}
