import type { Meta, StoryObj } from "@storybook/react-vite"

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
        original:
          "Let's test it with three different angles and time each run.",
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

// a11y: scrollable-region-focusable disabled. Upstream: Radix ScrollArea's viewport isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta<typeof TranscriptCard> = {
  title: "SLAI/TranscriptCard",
  component: TranscriptCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: A11Y },
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

/** After the session: the uploaded, speaker-unknown transcript with a static title. */
export const SessionReview: Story = {
  args: {
    title: "Transcript",
    groups: GROUPS,
    scope: "group-1",
    status: "uploaded",
    autoScroll: false,
    translationLanguage: "English",
    className: "h-full",
  },
}

/** `highlightedEntryId` emphasizes the row a chat answer or search result cites. */
export const HighlightedEntry: Story = {
  args: {
    groups: GROUPS,
    scope: "group-1",
    status: "recording",
    translationLanguage: "English",
    highlightedEntryId: GROUPS[0].entries[1]?.id,
    className: "h-full",
  },
}

/** Exact times (`at`) on each line, as an app has them. */
const at = (time: string) => `2026-08-21T${time}`

/**
 * Two groups speaking within the same minute: with `at`, lines interleave in
 * the order they were said (by minute alone they'd come out grouped).
 */
const SAME_MINUTE: TranscriptGroup[] = [
  {
    id: "group-1",
    name: "Group 1",
    memberCount: 3,
    entries: [
      {
        id: "a",
        timestamp: "3:42 PM",
        at: at("15:42:05"),
        language: "American English",
        original: "Okay, ramp one is ready.",
      },
      {
        id: "b",
        timestamp: "3:42 PM",
        at: at("15:42:40"),
        language: "American English",
        original: "Time it from when I let go.",
      },
    ],
  },
  {
    id: "group-2",
    name: "Group 2",
    memberCount: 2,
    noisyAudio: true,
    entries: [
      {
        id: "a",
        timestamp: "3:42 PM",
        at: at("15:42:20"),
        language: "American English",
        original: "Which ramp is steeper?",
      },
      {
        id: "b",
        timestamp: "3:43 PM",
        at: at("15:43:10"),
        language: "American English",
        original: "The blue one, by a lot.",
      },
    ],
  },
]

export const SameMinuteOrdering: Story = {
  args: {
    groups: SAME_MINUTE,
    scope: ALL_GROUPS,
    className: "h-full",
  },
}

/** A divider marks the latest check-in among the lines. */
export const WithCheckIn: Story = {
  args: {
    groups: SAME_MINUTE.map((group) => ({ ...group, noisyAudio: false })),
    scope: ALL_GROUPS,
    checkIn: { at: at("15:42:30"), label: "3:42 PM" },
    className: "h-full",
  },
}

/** A group's audio was flagged: a warning above the lines. */
export const NoisyAudio: Story = {
  args: { groups: SAME_MINUTE, scope: "group-2", className: "h-full" },
}

/** All groups: one warning naming every noisy group. */
export const NoisyAudioAllGroups: Story = {
  args: {
    groups: SAME_MINUTE.map((group) => ({ ...group, noisyAudio: true })),
    scope: ALL_GROUPS,
    className: "h-full",
  },
}

/** Words still being recognized show muted after the last line. */
export const InProgressLine: Story = {
  args: {
    groups: [GROUPS[1]],
    scope: "group-2",
    interimText: "and then we can compare the times for",
    className: "h-full",
  },
}

/** Live transcription is off for the session. */
export const TranscriptionOff: Story = {
  args: {
    groups: GROUPS,
    scope: ALL_GROUPS,
    transcriptionEnabled: false,
    onOpenLanguageSettings: () => {},
    className: "h-full",
  },
}

/** One live stream with no known students (e.g. a teacher's quick recording): no member line. */
export const SingleStream: Story = {
  args: {
    groups: [
      {
        id: "recording",
        name: "This recording",
        memberCount: 0,
        entries: GROUPS[0].entries,
      },
    ],
    scope: "recording",
    translationLanguage: "English",
    interimText: "so the steeper ramp",
    className: "h-full",
  },
}
