import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { StudentVoiceRecorder } from "@/components/slai/student-voice-recorder"

// a11y: aria-input-field-name disabled. Upstream: shadcn's Slider doesn't pass aria-label to the Radix thumb.
const A11Y = {
  config: {
    rules: [{ id: "aria-input-field-name", enabled: false }],
  },
}

const meta: Meta<typeof StudentVoiceRecorder> = {
  title: "SLAI/StudentVoiceRecorder",
  component: StudentVoiceRecorder,
  tags: ["autodocs"],
  parameters: { a11y: A11Y },
  args: {
    className: "w-full max-w-sm",
    studentName: "Maya",
  },
}

export default meta
type Story = StoryObj<typeof StudentVoiceRecorder>

/** First the student says it's them, and can decline. */
export const Confirm: Story = {}

/** Then what to do, one idea at a time. */
export const GetReady: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Yes, I'm Maya" }))
    await expect(
      await canvas.findByRole("button", { name: "Start talking" })
    ).toBeEnabled()
  },
}

/** The bar only fills with talking time, so a pause holds it still. */
export const Recording: Story = {
  args: { status: "recording", seconds: 14, speechSeconds: 10 },
}

/** Nothing heard for a moment. */
export const Silent: Story = {
  args: { status: "recording", seconds: 14, speechSeconds: 4, isSilent: true },
}

export const LongEnough: Story = {
  args: { status: "recording", seconds: 38, speechSeconds: 28 },
}

/** "New question" moves on, and "Read instead" gives something to read aloud. */
export const ReadInstead: Story = {
  args: { status: "recording", seconds: 14, speechSeconds: 10 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Read instead" }))
    await expect(canvas.getByText("Read this out loud")).toBeInTheDocument()
  },
}

export const Recorded: Story = { args: { status: "recorded", seconds: 47 } }

/** Under `minSeconds`, the sample can only be recorded again. */
export const TooShort: Story = {
  args: { status: "recorded", seconds: 12 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.queryByRole("button", { name: "Save my voice" })
    ).toBeNull()
  },
}

export const Saving: Story = { args: { status: "saving", seconds: 47 } }

export const Saved: Story = { args: { status: "saved", seconds: 47 } }

export const CouldNotSave: Story = {
  args: {
    status: "recorded",
    seconds: 47,
    error: "Your teacher isn't collecting voices right now.",
  },
}
