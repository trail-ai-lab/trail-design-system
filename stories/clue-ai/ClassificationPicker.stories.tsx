import type { Meta, StoryObj } from "@storybook/react-vite"

import { ClassificationPicker } from "@/components/clue-ai/classification-picker"

const meta: Meta<typeof ClassificationPicker> = {
  title: "ClueAI/ClassificationPicker",
  component: ClassificationPicker,
  tags: ["autodocs"],
  args: { "aria-label": "Classify sentence 1" },
}

export default meta
type Story = StoryObj<typeof ClassificationPicker>

export const Empty: Story = {}
export const Accurate: Story = { args: { defaultValue: "accurate" } }
export const Misrepresentation: Story = {
  args: { defaultValue: "misrepresentation" },
}
export const Hallucination: Story = { args: { defaultValue: "hallucination" } }
export const Locked: Story = {
  args: { defaultValue: "misrepresentation", disabled: true },
}
export const DefaultSize: Story = {
  args: { defaultValue: "accurate", size: "default" },
}

/** In a narrow container the labels collapse to icons with tooltips. */
export const Compact: Story = {
  render: (args) => (
    <div className="@container w-64">
      <ClassificationPicker {...args} defaultValue="hallucination" />
    </div>
  ),
}
