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
    elapsed: "24:13",
    spokenLanguages: ["Marathi", "English (US)"],
    translationLanguage: "English",
  },
}

export const WithoutElapsed: Story = {
  args: {
    klass: "Pune",
    session: "Test 5",
    spokenLanguages: ["Marathi", "English (US)"],
    translationLanguage: "English",
  },
}

export const TranscriptionOnly: Story = {
  args: {
    klass: "Biology",
    session: "Period 6",
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
