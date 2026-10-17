import type { Meta, StoryObj } from "@storybook/react-vite"

import { EditStudentDialog } from "@/components/slai/edit-student-dialog"
import { PHYSICS_ROSTER } from "./_roster-fixtures"

const meta: Meta<typeof EditStudentDialog> = {
  title: "SLAI/EditStudentDialog",
  component: EditStudentDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: () => {},
    student: PHYSICS_ROSTER.find((s) => s.id === "mei")!,
  },
}

export default meta
type Story = StoryObj<typeof EditStudentDialog>

export const Default: Story = {}

/** A native English speaker with no other spellings. */
export const NativeEnglish: Story = {
  args: { student: PHYSICS_ROSTER.find((s) => s.id === "liam")! },
}

export const Saving: Story = { args: { loading: true } }
