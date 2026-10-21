import type { Meta, StoryObj } from "@storybook/react-vite"

import { SpeakerTags } from "@/components/slai/speaker-tags"

const meta: Meta<typeof SpeakerTags> = {
  title: "SLAI/SpeakerTags",
  component: SpeakerTags,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof SpeakerTags>

/** A speaker speaker identification matched to a student. */
export const AiTagged: Story = { args: { aiTagged: true } }

/** The teacher, tagged by hand. */
export const Teacher: Story = { args: { role: "teacher" } }

/** The teacher, recognized by voice. */
export const TeacherAiTagged: Story = {
  args: { role: "teacher", aiTagged: true },
}
