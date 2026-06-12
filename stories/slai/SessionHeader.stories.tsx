import type { Meta, StoryObj } from "@storybook/nextjs"

import { LanguageChip } from "@/components/slai/language-chip"
import { SessionHeader } from "@/components/slai/session-header"

const meta: Meta<typeof SessionHeader> = {
  title: "SLAI/SessionHeader",
  component: SessionHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof SessionHeader>

export const LiveSession: Story = {
  args: {
    klass: "Physics",
    session: "Period 3 — Aug 21",
    status: "recording",
    elapsed: "24:13",
    spokenLanguages: ["Marathi", "English (US)"],
    translationLanguage: "English",
  },
}

export const StoppedSession: Story = {
  args: {
    klass: "Pune",
    session: "Profanity Test",
    status: "uploaded",
    spokenLanguages: ["Marathi", "English (US)"],
    translationLanguage: "English",
  },
}

export const TranscriptionOnly: Story = {
  args: {
    klass: "Biology",
    session: "Period 6",
    status: "recording",
    spokenLanguages: ["English (US)"],
  },
}

export const LanguageChips: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <LanguageChip kind="spoken" languages={["Marathi", "English (US)"]} />
      <LanguageChip kind="translation" languages={["English"]} />
      <LanguageChip kind="spoken" languages={["Auto-detect"]} />
    </div>
  ),
}
