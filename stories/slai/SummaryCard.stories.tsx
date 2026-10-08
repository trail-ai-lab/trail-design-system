import type { Meta, StoryObj } from "@storybook/react-vite"

import { SummaryCard } from "@/components/slai/summary-card"

const meta: Meta<typeof SummaryCard> = {
  title: "SLAI/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SummaryCard>

export const Empty: Story = {
  args: { scopeLabel: "Group 1" },
}

// `onCheckIn` adds the live-session "Check in" button; omit it (e.g. in
// post-session) and only Regenerate shows.
export const WithSummary: Story = {
  args: {
    scopeLabel: "Group 1",
    summary:
      "Group 1 is testing how ramp angle affects ball speed. They connected steeper ramps to greater acceleration and are designing a three-angle comparison.",
    onCheckIn: () => {},
  },
}

export const AllGroups: Story = {
  args: {
    scopeLabel: "All groups",
    summary:
      "Both groups are investigating how ramp angle affects ball speed. Group 1 is timing runs across three angles; Group 2 is establishing a flat baseline first.",
  },
}

export const Loading: Story = {
  args: { scopeLabel: "Group 1", loading: true },
}

export const CheckingIn: Story = {
  args: {
    scopeLabel: "Group 1",
    summary: "Group 1 is comparing ramp angles.",
    onCheckIn: () => {},
    checkingIn: true,
  },
}

export const SinceCheckin: Story = {
  args: {
    scopeLabel: "Group 1",
    since: "10:42 AM",
    summary:
      "- Compared three ramp angles\n- Connected steeper ramps to faster balls\n- Still deciding how to measure speed",
    onCheckIn: () => {},
  },
}

export const ThinSummary: Story = {
  args: {
    scopeLabel: "Group 2",
    since: "10:55 AM",
    thinSummaryTurns: 3,
    summary: "Group 2 has only just started discussing friction.",
    onCheckIn: () => {},
  },
}

export const WithEarlierPhases: Story = {
  args: {
    scopeLabel: "Group 1",
    since: "10:55 AM",
    summary: "- Moved on to graphing speed against angle",
    onCheckIn: () => {},
    earlierPhases: [
      {
        id: "p2",
        checkinAt: "10:55 AM",
        summary: "- Built the ramps\n- Agreed on three test angles",
      },
      {
        id: "p1",
        checkinAt: "10:42 AM",
        summary: "Group 1 brainstormed what could affect ball speed.",
      },
    ],
  },
}
