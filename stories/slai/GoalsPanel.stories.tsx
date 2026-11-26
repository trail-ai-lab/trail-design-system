import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { GoalsPanel } from "@/components/slai/goals-panel"
import { StandardPicker } from "@/components/slai/standard-picker"
import { STANDARDS } from "./_standard-fixtures"
import {
  GOAL,
  INSIGHTS,
  LEGACY_GOAL,
  LEGACY_INSIGHTS,
} from "./_student-fixtures"

const meta: Meta<typeof GoalsPanel> = {
  title: "SLAI/GoalsPanel",
  component: GoalsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { standardLabel: "CCSS", students: INSIGHTS, goal: GOAL },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GoalsPanel>

/** Students below the bar are listed first, and the first card starts open. */
export const Default: Story = {}

/** In Session review: the standard can be changed here, and the results can
 * be checked again. */
export const WithStandardPicker: Story = {
  args: {
    standardPicker: (
      <StandardPicker
        aria-label="Session standard"
        standards={STANDARDS}
        value={GOAL.code}
        noneLabel="No standard"
      />
    ),
    checkedAt: "Nov 25, 2:14 PM",
    onCheck: () => {},
  },
}

export const WithGroupCallout: Story = {
  args: {
    callout:
      "The group agreed on the ratio after Liam checked the third row out loud.",
  },
}

/** Before the first check: a button runs it. */
export const NotCheckedYet: Story = {
  args: { students: [], onCheck: () => {} },
}

function CheckingDemo() {
  const [loading, setLoading] = React.useState(true)
  return (
    <GoalsPanel
      standardLabel="CCSS"
      goal={GOAL}
      students={[]}
      loading={loading}
      onCheck={() => setLoading(true)}
    />
  )
}

/** A check is running. */
export const Checking: Story = { render: () => <CheckingDemo /> }

/** Something changed since the results: they stay, with "Check again". */
export const Stale: Story = {
  args: {
    stale: "Speakers were assigned to different students since these results.",
    onCheck: () => {},
  },
}

/** Results can't be produced yet. */
export const Blocked: Story = {
  args: {
    students: [],
    goal: undefined,
    blocked: {
      title: "No standard yet",
      description:
        "Choose the standard this session works on to check each student's talk against it.",
    },
  },
}

/** In Live: provisional results, when they were checked and how much has
 * been said since; "Check again" stands out once there are new lines. */
export const Live: Story = {
  args: {
    provisional: true,
    checkedAt: "10:42 AM",
    newLines: 14,
    onCheck: () => {},
  },
}

/** In Live, before the first check. */
export const LiveNotCheckedYet: Story = {
  args: { provisional: true, students: [], onCheck: () => {} },
}

/** Students without a voice sample can't be named in Live, so they get no
 * verdict. */
export const MissingVoiceSamples: Story = {
  args: {
    provisional: true,
    checkedAt: "10:42 AM",
    onCheck: () => {},
    missingSamples: ["Noah", "Priya"],
  },
}

export const Empty: Story = { args: { students: [] } }

/** 3.10 props still work (deprecated): the old `goal` field names and
 * students with talk-time shares. */
export const LegacyProps: Story = {
  args: { goal: LEGACY_GOAL, students: LEGACY_INSIGHTS },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(GOAL.heading)).toBeVisible()
    await expect(canvas.getByText("Native English")).toBeVisible()
  },
}
