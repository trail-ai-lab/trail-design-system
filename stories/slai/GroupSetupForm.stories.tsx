import type { Meta, StoryObj } from "@storybook/react-vite"

import { GroupSetupForm } from "@/components/slai/group-setup-form"

const meta: Meta<typeof GroupSetupForm> = {
  title: "SLAI/GroupSetupForm",
  component: GroupSetupForm,
  tags: ["autodocs"],
  args: {
    className: "w-full max-w-sm",
  },
}

export default meta
type Story = StoryObj<typeof GroupSetupForm>

export const Default: Story = {}

/** The group is being created: the button shows "Joining…" and is disabled. */
export const Joining: Story = { args: { loading: true } }

/** Why the student is back here, e.g. the teacher removed their group. */
export const WithNotice: Story = {
  args: {
    notice:
      "Your group was removed by the teacher. Please set up a new group to continue.",
  },
}
