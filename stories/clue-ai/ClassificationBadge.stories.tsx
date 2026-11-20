import type { Meta, StoryObj } from "@storybook/react-vite"

import { ClassificationBadge } from "@/components/clue-ai/classification-badge"

const meta: Meta<typeof ClassificationBadge> = {
  title: "ClueAI/ClassificationBadge",
  component: ClassificationBadge,
  tags: ["autodocs"],
  argTypes: {
    classification: {
      control: "select",
      options: ["accurate", "misrepresentation", "hallucination", null],
    },
  },
}

export default meta
type Story = StoryObj<typeof ClassificationBadge>

export const Accurate: Story = { args: { classification: "accurate" } }
export const Misrepresentation: Story = {
  args: { classification: "misrepresentation" },
}
export const Hallucination: Story = {
  args: { classification: "hallucination" },
}
export const NotClassified: Story = { args: { classification: null } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <ClassificationBadge classification="accurate" />
      <ClassificationBadge classification="misrepresentation" />
      <ClassificationBadge classification="hallucination" />
      <ClassificationBadge />
      <ClassificationBadge classification="accurate" showIcon={false} />
    </div>
  ),
}
