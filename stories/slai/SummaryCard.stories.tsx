import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  SummaryCard,
  type SummaryVersion,
} from "@/components/slai/summary-card"

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

// `onCheckIn` adds the live-session "Check in & summarize" button; omit it (e.g. in
// post-session) and only Summarize shows.
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

const VERSIONS: SummaryVersion[] = [
  {
    id: "v3",
    label: "Oct 9, 3:42 PM",
    summary:
      "- Compared three ramp angles\n- Connected steeper ramps to faster balls\n- Planned a trial with heavier balls",
  },
  {
    id: "v2",
    label: "Oct 9, 3:30 PM",
    summary:
      "- Compared three ramp angles\n- Still deciding how to measure speed",
  },
  {
    id: "v1",
    label: "Oct 9, 3:18 PM",
    summary: "Group 1 brainstormed what could affect ball speed.",
  },
]

/** Each generate is saved: the history menu (clock icon) lists them, newest first. */
export const WithHistory: Story = {
  args: {
    scopeLabel: "Group 1",
    summary: VERSIONS[0].summary,
    versions: VERSIONS,
  },
}

/** An earlier version is shown with when it was made and a way back to the latest. */
export const EarlierVersion: Story = {
  args: { ...WithHistory.args, defaultVersionId: "v2" },
}

/** Summarize covered the whole session: the badge says so. */
export const WholeSession: Story = {
  args: {
    scopeLabel: "Group 1",
    range: "whole-session",
    summary:
      "- Built the ramps and agreed on three angles\n- Compared the angles and connected steepness to speed\n- Moved on to graphing speed against angle",
    onCheckIn: () => {},
  },
}

/** Check-in summaries and whole-session summaries share one history. */
export const MixedHistory: Story = {
  args: {
    scopeLabel: "Group 1",
    since: "3:30 PM",
    summary: "- Moved on to graphing speed against angle",
    onCheckIn: () => {},
    versions: [
      {
        ...VERSIONS[0],
        summary: "- Moved on to graphing speed against angle",
        description: "Check-in",
      },
      { ...VERSIONS[1], description: "Whole session" },
      { ...VERSIONS[2], description: "Check-in" },
    ],
  },
}
