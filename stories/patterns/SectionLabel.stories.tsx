import type { Meta, StoryObj } from "@storybook/react-vite"

import { Card, CardContent } from "@/components/ui/card"
import { SectionLabel } from "@/components/patterns/section-label"

const meta: Meta<typeof SectionLabel> = {
  title: "Patterns/SectionLabel",
  component: SectionLabel,
  tags: ["autodocs"],
  args: { children: "Class overview" },
}

export default meta
type Story = StoryObj<typeof SectionLabel>

export const Default: Story = {}

/** `asChild` puts the style on another element, e.g. a `p` inside a popover. */
export const AsChild: Story = {
  render: () => (
    <SectionLabel asChild>
      <p>Theme</p>
    </SectionLabel>
  ),
}

/** Typical use: titling a card from outside it. */
export const AboveCard: Story = {
  render: () => (
    <section className="flex w-96 flex-col gap-3">
      <SectionLabel>Session goal</SectionLabel>
      <Card>
        <CardContent className="text-sm text-muted-foreground">
          Explain how ramp angle changes a ball&apos;s speed.
        </CardContent>
      </Card>
    </section>
  ),
}
