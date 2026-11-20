import type { Meta, StoryObj } from "@storybook/react-vite"

import { PlayModeForm } from "@/components/clue-ai/play-mode-form"
import { AI_TEAMMATES, RILEY } from "./_ai-partner-fixtures"

const meta: Meta<typeof PlayModeForm> = {
  title: "ClueAI/PlayModeForm",
  component: PlayModeForm,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-lg max-w-full">
        <Story />
      </div>
    ),
  ],
  args: { aiTeammates: AI_TEAMMATES, onSubmit: () => {} },
}

export default meta
type Story = StoryObj<typeof PlayModeForm>

export const Default: Story = {}
/** Choosing an AI teammate asks for one by name; both look the same. */
export const PickTeammate: Story = { args: { defaultValue: { mode: "ai" } } }
export const TeammatePicked: Story = {
  args: { defaultValue: { mode: "ai", teammateId: RILEY.id } },
}
/** With one teammate (e.g. assigned by the study), there's nothing to pick. */
export const SingleTeammate: Story = {
  args: {
    modes: ["solo", "ai"],
    aiTeammates: [RILEY],
    defaultValue: { mode: "ai" },
  },
}
export const Starting: Story = {
  args: { value: { mode: "ai", teammateId: RILEY.id }, loading: true },
}
