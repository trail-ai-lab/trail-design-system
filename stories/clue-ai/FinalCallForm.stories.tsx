import type { Meta, StoryObj } from "@storybook/react-vite"

import { FinalCallForm } from "@/components/clue-ai/final-call-form"
import { MOTIVES, SUSPECTS } from "./_case-fixtures"

const meta: Meta<typeof FinalCallForm> = {
  title: "ClueAI/FinalCallForm",
  component: FinalCallForm,
  tags: ["autodocs"],
  args: {
    suspects: SUSPECTS,
    motives: MOTIVES,
    onSubmit: () => {},
    onBack: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FinalCallForm>

export const Empty: Story = {}
export const Chosen: Story = {
  args: { defaultValue: { suspectId: "cecilia", motive: "inheritance" } },
}
export const Submitting: Story = {
  args: {
    defaultValue: { suspectId: "cecilia", motive: "inheritance" },
    loading: true,
  },
}
