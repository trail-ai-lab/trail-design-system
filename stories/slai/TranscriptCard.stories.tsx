import type { Meta, StoryObj } from "@storybook/nextjs"

import { ALL_GROUPS } from "@/components/slai/group-switcher"
import {
  TranscriptCard,
  type TranscriptGroup,
} from "@/components/slai/transcript-card"

const GROUPS: TranscriptGroup[] = [
  {
    id: "group-1",
    name: "Group 1",
    memberCount: 5,
    active: true,
    startedAt: "3:38 PM",
    students: ["Aarav", "Mia", "Jordan"],
    entries: [
      {
        id: "1",
        timestamp: "3:39 PM",
        language: "American English",
        original: "Hello, hello. Okay, we're recording now.",
      },
      {
        id: "2",
        timestamp: "3:40 PM",
        language: "American English",
        original: "Gravity pulls the ball down the ramp, so it speeds up.",
      },
      {
        id: "3",
        timestamp: "3:41 PM",
        language: "Marathi",
        original: "उताराचा कोन वाढवला तर चेंडू वेगाने जाईल.",
        translation:
          "If we increase the angle of the ramp, the ball will go faster.",
      },
      {
        id: "4",
        timestamp: "3:43 PM",
        language: "American English",
        original: "Let's test it with three different angles and time each run.",
      },
    ],
  },
  {
    id: "group-2",
    name: "Group 2",
    memberCount: 2,
    active: true,
    startedAt: "3:41 PM",
    students: ["Sam", "Priya"],
    entries: [
      {
        id: "1",
        timestamp: "3:42 PM",
        language: "American English",
        original: "Should we start with the steepest ramp or the flattest?",
      },
      {
        id: "2",
        timestamp: "3:45 PM",
        language: "American English",
        original: "Flattest first, so we have a baseline to compare against.",
      },
    ],
  },
]

const meta: Meta<typeof TranscriptCard> = {
  title: "SLAI/TranscriptCard",
  component: TranscriptCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    // Full-height component: needs a sized parent or h-full collapses.
    (Story) => (
      <div className="h-[480px] w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TranscriptCard>

export const SingleGroup: Story = {
  args: {
    groups: GROUPS,
    scope: "group-1",
    status: "recording",
    translationLanguage: "English",
    className: "h-full",
  },
}

export const AllGroups: Story = {
  args: {
    groups: GROUPS,
    scope: ALL_GROUPS,
    status: "recording",
    translationLanguage: "English",
    className: "h-full",
  },
}

export const NoTranslations: Story = {
  args: {
    groups: [GROUPS[1]],
    scope: "group-2",
    status: "recording",
    className: "h-full",
  },
}

export const EmptyGroup: Story = {
  args: {
    groups: [{ ...GROUPS[0], entries: [] }],
    scope: "group-1",
    status: "recording",
    translationLanguage: "English",
    className: "h-full",
  },
}

export const Paused: Story = {
  args: {
    groups: GROUPS,
    scope: "group-1",
    status: "paused",
    translationLanguage: "English",
    className: "h-full",
  },
}
