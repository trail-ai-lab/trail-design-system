import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardLink } from "@/components/patterns/card-link"

const meta: Meta<typeof CardLink> = {
  title: "Patterns/CardLink",
  component: CardLink,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof CardLink>

/** The whole card is the link target. Tab to it to see the focus ring. */
export const Default: Story = {
  render: () => (
    <Card className="relative w-80 transition-colors hover:bg-accent">
      <CardLink href="#" label="Reliability Issues in AI Bias Mitigation" />
      <CardHeader>
        <CardDescription className="font-mono text-xs">01</CardDescription>
        <CardTitle>Reliability Issues in AI Bias Mitigation</CardTitle>
      </CardHeader>
    </Card>
  ),
}
