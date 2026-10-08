import type { Meta, StoryObj } from "@storybook/react-vite"
import { GlobeIcon, LightbulbIcon } from "lucide-react"

import { InsightItem, TranscriptQuote } from "@/components/slai/insight-blocks"

const meta: Meta = {
  title: "SLAI/InsightBlocks",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="flex w-96 flex-col gap-3">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj

/** A muted inset with an icon and a small label, e.g. a cultural connection. */
export const ItemWithLabel: Story = {
  render: () => (
    <InsightItem
      icon={<GlobeIcon className="text-muted-foreground" />}
      label="Cultural connection"
    >
      Mei compared sharing dumplings at Lunar New Year to making equal groups.
    </InsightItem>
  ),
}

/** Without a label: a suggested next step. */
export const ActionPrompt: Story = {
  render: () => (
    <InsightItem icon={<LightbulbIcon className="text-info" />}>
      <span className="font-medium">
        Ask Mei to explain her grouping strategy using &ldquo;each&rdquo;.
      </span>
    </InsightItem>
  ),
}

export const Quote: Story = {
  render: () => (
    <TranscriptQuote label="Mei said" quote="Each group has four. 每组四个。" />
  ),
}

export const QuoteWithTranslation: Story = {
  render: () => (
    <TranscriptQuote
      label="Said"
      quote="Cada grupo tiene tres."
      translation="Each group has three."
    />
  ),
}
