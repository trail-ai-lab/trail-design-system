import type { Meta, StoryObj } from "@storybook/react-vite"

import { SessionActions } from "@/components/slai/session-actions"

const meta: Meta<typeof SessionActions> = {
  title: "SLAI/Shell/SessionActions",
  tags: ["autodocs"],
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

/** A single group selected: the Session menu offers to remove it, after confirming. */
export const WithGroupSelected: Story = {
  args: {
    onAddActivity: () => {},
    onOpenLanguageSettings: () => {},
    onInviteStudents: () => {},
    onEndSession: () => {},
    groupName: "Group 2",
    onRemoveGroup: () => {},
  },
}
