import type { Meta, StoryObj } from "@storybook/nextjs"

import { SessionSetupForm } from "@/components/slai/session-setup-form"
import { PRESETS, ROSTER } from "./_student-fixtures"

const meta: Meta<typeof SessionSetupForm> = {
  title: "SLAI/SessionSetupForm",
  component: SessionSetupForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    roster: ROSTER,
    presets: PRESETS,
    initialGroups: [
      { id: "g1", name: "Group 1", studentIds: [] },
      { id: "g2", name: "Group 2", studentIds: [] },
    ],
    onStart: () => {},
    onRecordLive: () => {},
  },
}

export default meta
type Story = StoryObj<typeof SessionSetupForm>

/** Start stays disabled until a class, session name and a populated group exist. */
export const Default: Story = {}
