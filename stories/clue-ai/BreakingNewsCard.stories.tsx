import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { BreakingNewsCard } from "@/components/clue-ai/breaking-news-card"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import { CORONER_REPORT, HARPE_STORY, SHERLOCK_AVATAR } from "./_case-fixtures"
import flora from "./assets/flora.jpg"

const meta: Meta<typeof BreakingNewsCard> = {
  title: "ClueAI/BreakingNewsCard",
  component: BreakingNewsCard,
  tags: ["autodocs"],
  args: {
    masthead: "The London Ledger",
    dateline: "Harpe Estate, Surrey · Saturday",
    headline:
      "Flora Jasmine arrested for the murder of billionaire step-father Sir Eric Harpe",
    body: HARPE_STORY,
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
type Story = StoryObj<typeof BreakingNewsCard>

export const HeadlineOnly: Story = {}

export const WithPhoto: Story = {
  args: {
    imageUrl: flora,
    imageAlt: "Flora Jasmine",
    imageCaption: "Flora Jasmine, PhD candidate at Cambridge.",
    facts: CORONER_REPORT,
  },
}

export const WithChallenge: Story = {
  args: {
    imageUrl: flora,
    imageAlt: "Flora Jasmine",
    imageCaption: "Flora Jasmine, PhD candidate at Cambridge.",
    facts: CORONER_REPORT,
    children: (
      <SherlockNote
        avatarUrl={SHERLOCK_AVATAR}
        actions={
          <>
            <Button>Take the case</Button>
            <Button variant="outline">Investigate with a partner</Button>
          </>
        }
      >
        Watson! Did you see the news? The Yard let a machine pick their suspect.
        I don't think Flora did it — can you prove them wrong?
      </SherlockNote>
    ),
  },
}
