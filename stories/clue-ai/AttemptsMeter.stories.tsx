import type { Meta, StoryObj } from "@storybook/react-vite"

import { AttemptsMeter } from "@/components/clue-ai/attempts-meter"

const meta: Meta<typeof AttemptsMeter> = {
  title: "ClueAI/AttemptsMeter",
  component: AttemptsMeter,
  tags: ["autodocs"],
  args: { max: 3 },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AttemptsMeter>

export const NoneUsed: Story = { args: { used: 0 } }
export const OneUsed: Story = { args: { used: 1 } }
export const Exhausted: Story = { args: { used: 3 } }
