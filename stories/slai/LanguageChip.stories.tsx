import type { Meta, StoryObj } from "@storybook/nextjs"

import { LanguageChip } from "@/components/slai/language-chip"

const meta: Meta<typeof LanguageChip> = {
  title: "SLAI/LanguageChip",
  component: LanguageChip,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof LanguageChip>

export const Spoken: Story = {
  args: { variant: "spoken", languages: ["Marathi", "English (US)"] },
}

export const Translation: Story = {
  args: { variant: "translation", languages: ["English (US)"] },
}
