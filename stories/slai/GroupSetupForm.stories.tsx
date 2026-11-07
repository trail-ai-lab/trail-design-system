import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

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

/**
 * At `maxStudents` (6 by default) the student input locks and says why.
 * Shown with `maxStudents={2}`; the play function adds both students.
 */
export const GroupFull: Story = {
  args: { maxStudents: 2 },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(/students/i)
    for (const name of ["Mei", "Aarav"]) {
      await userEvent.type(input, `${name}{Enter}`)
    }
  },
}

/**
 * With the class `roster`, students tap their names in rows (filtered as they
 * type) so each member carries a roster id; names not on the roster can still
 * be typed.
 */
export const WithRoster: Story = {
  args: {
    roster: [
      { id: "stu_mei", name: "Mei" },
      { id: "stu_liam", name: "Liam" },
      { id: "stu_rosa", name: "Rosa" },
      { id: "stu_diego", name: "Diego" },
      { id: "stu_sofia", name: "Sofia" },
      { id: "stu_kevin", name: "Kevin" },
    ],
  },
}

/**
 * With `voiceStatuses` and `onRecordVoice`, each student gets a Voice column.
 * Names still join the group; a student who saves their voice joins by itself.
 */
export const WithVoiceColumn: Story = {
  args: {
    roster: [
      { id: "stu_mei", name: "Mei" },
      { id: "stu_liam", name: "Liam" },
      { id: "stu_rosa", name: "Rosa" },
      { id: "stu_diego", name: "Diego" },
    ],
    voiceStatuses: {
      stu_mei: "none",
      stu_liam: "ready",
      stu_rosa: "processing",
      stu_diego: "failed",
    },
    onRecordVoice: async () => true,
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Record Mei's voice" })
    )
    await expect(
      await canvas.findByRole("button", { name: "Mei", pressed: true })
    ).toBeInTheDocument()
  },
}
