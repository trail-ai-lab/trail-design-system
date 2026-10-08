import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta: Meta = {
  title: "Foundations/Focus",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * Keyboard focus is always visible: a ring in the brand primary at full
 * strength (semantic.css), at least 3:1 against the page in both themes.
 * Press Tab to move through the controls below. Invalid fields keep their
 * destructive ring.
 */
export const Rings: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <Input placeholder="Focusable input" />
      <Input placeholder="Invalid input" aria-invalid="true" />
      <div className="flex items-center gap-2">
        <Checkbox id="focus-demo-checkbox" />
        <Label htmlFor="focus-demo-checkbox">Focusable checkbox</Label>
      </div>
    </div>
  ),
}
