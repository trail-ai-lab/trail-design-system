import type { Meta, StoryObj } from "@storybook/react-vite"

import { StudentRosterTable } from "@/components/slai/student-roster-table"
import { PHYSICS_ROSTER } from "./_roster-fixtures"

const meta: Meta<typeof StudentRosterTable> = {
  title: "SLAI/StudentRosterTable",
  component: StudentRosterTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    klass: "Physics",
    students: PHYSICS_ROSTER,
    onAdd: () => {},
    onEdit: () => {},
    onRemove: () => {},
    onDelete: () => {},
  },
}

export default meta
type Story = StoryObj<typeof StudentRosterTable>

export const Default: Story = {}

/** With `href`, each name links to the student's progress page. */
export const WithProgressLinks: Story = {
  args: {
    students: PHYSICS_ROSTER.map((s) => ({ ...s, href: `#/students/${s.id}` })),
  },
}

/** Without `sessionCount`, the Sessions column is left out. */
export const WithoutSessions: Story = {
  args: {
    students: PHYSICS_ROSTER.map((s) => ({ ...s, sessionCount: undefined })),
  },
}

/** A new class: the empty state's one action opens `AddStudentsDialog`. */
export const Empty: Story = { args: { students: [] } }

export const Loading: Story = { args: { students: [], loading: true } }

/** Without handlers there are no row menus or Add button (read-only). */
export const ReadOnly: Story = {
  args: {
    onAdd: undefined,
    onEdit: undefined,
    onRemove: undefined,
    onDelete: undefined,
  },
}
