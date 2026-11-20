import type { Meta, StoryObj } from "@storybook/react-vite"
import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CaseOutcome } from "@/components/clue-ai/case-outcome"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import {
  COLD_FRONT_PAGE,
  OUTCOME_SUSPECTS,
  OUTCOME_TIMELINE,
  PARTIAL_FRONT_PAGE,
  SHERLOCK_AVATAR,
  SOLVED_FRONT_PAGE,
} from "./_case-fixtures"

const ACTIONS = (
  <Button>
    <RotateCcwIcon data-icon="inline-start" />
    Start a new case
  </Button>
)

const meta: Meta<typeof CaseOutcome> = {
  title: "ClueAI/CaseOutcome",
  component: CaseOutcome,
  tags: ["autodocs"],
  args: {
    suspects: OUTCOME_SUSPECTS,
    timeline: OUTCOME_TIMELINE,
    actions: ACTIONS,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CaseOutcome>

export const Solved: Story = {
  args: {
    result: "solved",
    ...SOLVED_FRONT_PAGE,
    children: (
      <SherlockNote
        avatarUrl={SHERLOCK_AVATAR}
        variant="success"
        title="Sherlock's final words"
      >
        You've done admirably, Watson. The AI saved us time, but it was your
        checking — source by source — that cracked the case.
      </SherlockNote>
    ),
  },
}

export const Partial: Story = {
  args: {
    result: "partial",
    ...PARTIAL_FRONT_PAGE,
  },
}

export const Unsolved: Story = {
  args: {
    result: "unsolved",
    ...COLD_FRONT_PAGE,
    children: (
      <SherlockNote
        avatarUrl={SHERLOCK_AVATAR}
        variant="destructive"
        title="Sherlock's final words"
      >
        Tough break, Watson. Look back at which summary sentences you trusted
        without checking — that's where the case slipped away.
      </SherlockNote>
    ),
  },
}
