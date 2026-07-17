import type { Meta, StoryObj } from "@storybook/nextjs"

import { RecordedTranscriptCard } from "@/components/slai/recorded-transcript-card"

const SPEAKERS = [
  { id: "s1", name: "Aarav" },
  { id: "s2", name: "Mia" },
  { id: "s3", name: "Jordan" },
]

const ENTRIES = [
  {
    id: "1",
    speakerId: "s2",
    timestamp: "3:39 PM",
    language: "American English",
    original: "Hello, hello. Okay, we're recording now.",
  },
  {
    id: "2",
    speakerId: "s3",
    timestamp: "3:40 PM",
    language: "American English",
    original: "Gravity pulls the ball down the ramp, so it speeds up.",
  },
  {
    id: "3",
    speakerId: "s1",
    timestamp: "3:41 PM",
    language: "Marathi",
    original: "उताराचा कोन वाढवला तर चेंडू वेगाने जाईल.",
    translation: "If we increase the angle of the ramp, the ball will go faster.",
  },
  {
    id: "4",
    speakerId: "s2",
    timestamp: "3:43 PM",
    language: "American English",
    original: "Let's test it with three different angles and time each run.",
  },
]

const meta: Meta<typeof RecordedTranscriptCard> = {
  title: "SLAI/RecordedTranscriptCard",
  component: RecordedTranscriptCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-[460px] w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RecordedTranscriptCard>

// Teacher has already assigned names via "Manage speakers".
export const Named: Story = {
  args: {
    speakers: SPEAKERS,
    entries: ENTRIES,
    className: "h-full",
  },
}

// Fresh diarization output — speakers are unnamed ("Speaker 1/2/3") until
// the teacher assigns names in the Manage speakers popover.
export const Unnamed: Story = {
  args: {
    speakers: SPEAKERS.map((speaker) => ({ id: speaker.id })),
    entries: ENTRIES,
    className: "h-full",
  },
}
