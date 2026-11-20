import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import { SHERLOCK_AVATAR } from "./_case-fixtures"

const meta: Meta<typeof SherlockNote> = {
  title: "ClueAI/SherlockNote",
  component: SherlockNote,
  tags: ["autodocs"],
  args: { avatarUrl: SHERLOCK_AVATAR },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SherlockNote>

export const Briefing: Story = {
  args: {
    title: "Sherlock's briefing",
    children:
      "Here's the AI summary Scotland Yard used to accuse Flora. Open the source behind every sentence before you mark it — I want to know which parts hold up.",
  },
}

export const WithActions: Story = {
  args: {
    title: "Sherlock",
    children:
      "Scotland Yard's shiny new AI says Flora did it. I don't believe a word. Can you prove them wrong, Watson?",
    actions: (
      <>
        <Button>Take the case</Button>
        <Button variant="outline">Investigate with a partner</Button>
      </>
    ),
  },
}

export const Correct: Story = {
  args: {
    variant: "success",
    title: "Sherlock's verdict",
    children:
      "I told you so! Flora's case doesn't hold up — and your highlights were sharp. Now let's find the real killer.",
  },
}

export const Wrong: Story = {
  args: {
    variant: "destructive",
    title: "Sherlock's verdict",
    children:
      "My dear Watson — you took misrepresentations for facts and missed how much of this is ambiguous. Review the corrected sheet before the next suspect.",
  },
}

export const NoAvatarImage: Story = {
  args: { avatarUrl: undefined, children: "Choose wisely, Watson." },
}
