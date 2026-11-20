import type { Meta, StoryObj } from "@storybook/react-vite"

import { PhaseTimer } from "@/components/clue-ai/phase-timer"

const meta: Meta<typeof PhaseTimer> = {
  title: "ClueAI/PhaseTimer",
  component: PhaseTimer,
  tags: ["autodocs"],
  args: { label: "Solo analysis", totalSeconds: 480 },
  argTypes: {
    status: { control: "select", options: ["idle", "running", "expired"] },
  },
}

export default meta
type Story = StoryObj<typeof PhaseTimer>

export const Idle: Story = { args: { status: "idle", remainingSeconds: 480 } }
export const Running: Story = { args: { remainingSeconds: 312 } }
export const LastMinute: Story = { args: { remainingSeconds: 42 } }
export const Expired: Story = {
  args: { status: "expired", remainingSeconds: 0 },
}
export const Deliberation: Story = {
  args: { label: "Deliberation", remainingSeconds: 401 },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <PhaseTimer
        label="Solo analysis"
        status="idle"
        remainingSeconds={480}
        totalSeconds={480}
      />
      <PhaseTimer
        label="Solo analysis"
        remainingSeconds={312}
        totalSeconds={480}
      />
      <PhaseTimer
        label="Solo analysis"
        remainingSeconds={42}
        totalSeconds={480}
      />
      <PhaseTimer
        label="Deliberation"
        status="expired"
        remainingSeconds={0}
        totalSeconds={480}
      />
    </div>
  ),
}
