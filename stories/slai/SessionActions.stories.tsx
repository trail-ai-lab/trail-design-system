import type { Meta, StoryObj } from "@storybook/nextjs"

import { SessionActions } from "@/components/slai/session-actions"

const meta: Meta<typeof SessionActions> = {
  title: "SLAI/Shell/SessionActions",
  component: SessionActions,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof SessionActions>

/** Full action set for an active session. */
export const ActiveSession: Story = {
  args: {
    onAddActivity: () => {},
    onOpenLanguageSettings: () => {},
    onInviteStudents: () => {},
    onEndSession: () => {},
  },
}

/**
 * Waiting for groups: no activity/language handlers, so the Session menu is
 * hidden and only Invite + End session remain.
 */
export const WaitingForGroups: Story = {
  args: {
    onInviteStudents: () => {},
    onEndSession: () => {},
  },
}
