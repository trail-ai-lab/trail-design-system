import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { ConfirmDialog } from "@/components/patterns/confirm-dialog"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"
import { AddStudentsDialog } from "@/components/slai/add-students-dialog"
import { AppShell } from "@/components/slai/app-shell"
import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import { EditStudentDialog } from "@/components/slai/edit-student-dialog"
import type { RosterTableStudent } from "@/components/slai/lib/roster"
import {
  NamesToLinkCard,
  type UnlinkedName,
} from "@/components/slai/names-to-link-card"
import { StudentRosterTable } from "@/components/slai/student-roster-table"
import { PageSidebar } from "./_page-fixtures"
import { PHYSICS_ROSTER, UNLINKED_NAMES } from "./_roster-fixtures"

const byName = (a: RosterTableStudent, b: RosterTableStudent) =>
  a.name.localeCompare(b.name)

/**
 * A class's roster, opened from its "Students" row in the sidebar. Teachers
 * add the roster once (pasted names or a CSV), link names students typed on
 * their devices or gave to speakers, and edit, remove or delete students.
 * Everything here is simulated in memory.
 */
function ClassStudentsPage({
  initialStudents,
  initialNames = [],
  loading = false,
  addOpen = false,
}: {
  initialStudents: RosterTableStudent[]
  initialNames?: UnlinkedName[]
  loading?: boolean
  addOpen?: boolean
}) {
  const [students, setStudents] = React.useState(initialStudents)
  const [names, setNames] = React.useState(initialNames)
  const [adding, setAdding] = React.useState(addOpen)
  const [editing, setEditing] = React.useState<RosterTableStudent | null>(null)
  const [removing, setRemoving] = React.useState<RosterTableStudent | null>(
    null
  )
  const [deleting, setDeleting] = React.useState<RosterTableStudent | null>(
    null
  )
  const dropName = (name: string) =>
    setNames((list) => list.filter((n) => n.name !== name))

  return (
    <AppShell
      sidebar={<PageSidebar activeRoster="Physics" />}
      title={
        <PageBreadcrumb items={[{ label: "Physics" }, { label: "Students" }]} />
      }
    >
      <div className="flex-1 overflow-y-auto p-(--shell-gap)">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-(--shell-gap)">
          {names.length > 0 && !loading && (
            <NamesToLinkCard
              names={names}
              students={students.map(({ id, name }) => ({ id, name }))}
              onLink={(name, studentId) => {
                setStudents((list) =>
                  list.map((s) =>
                    s.id === studentId
                      ? { ...s, aliases: [...(s.aliases ?? []), name] }
                      : s
                  )
                )
                dropName(name)
              }}
              onCreate={(name) => {
                setStudents((list) =>
                  [...list, { id: `new-${name}`, name, sessionCount: 1 }].sort(
                    byName
                  )
                )
                dropName(name)
              }}
            />
          )}
          <StudentRosterTable
            klass="Physics"
            students={students}
            loading={loading}
            onAdd={() => setAdding(true)}
            onEdit={setEditing}
            onRemove={setRemoving}
            onDelete={setDeleting}
          />
        </div>
      </div>
      <AddStudentsDialog
        open={adding}
        onOpenChange={setAdding}
        klass="Physics"
        onSubmit={(rows) => {
          const taken = new Set(students.map((s) => s.name.toLowerCase()))
          const added = rows
            .filter((row) => !taken.has(row.name.toLowerCase()))
            .map((row) => ({
              id: `new-${row.name}`,
              name: row.name,
              language: row.language,
              grade: row.grade,
            }))
          setStudents((list) => [...list, ...added].sort(byName))
          setAdding(false)
        }}
      />
      <EditStudentDialog
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        student={editing}
        onSubmit={(fields) => {
          setStudents((list) =>
            list
              .map((s) => (s.id === editing?.id ? { ...s, ...fields } : s))
              .sort(byName)
          )
          setEditing(null)
        }}
      />
      <ConfirmDialog
        open={removing !== null}
        onOpenChange={(open) => !open && setRemoving(null)}
        title="Remove from class"
        description={`${removing?.name ?? ""} will be removed from Physics. Their record and other classes are kept.`}
        confirmLabel="Remove"
        onConfirm={() => {
          setStudents((list) => list.filter((s) => s.id !== removing?.id))
          setRemoving(null)
        }}
      />
      <DeleteConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        itemKind="student"
        itemName={deleting?.name ?? ""}
        description={`${deleting?.name ?? ""} will be permanently deleted and removed from every class. Their names in recordings stay, unlinked. This cannot be undone.`}
        onConfirm={() => {
          setStudents((list) => list.filter((s) => s.id !== deleting?.id))
          setDeleting(null)
        }}
      />
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/ClassStudents",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

/** An established class with a few names still to link. */
export const Default: Story = {
  render: () => (
    <ClassStudentsPage
      initialStudents={PHYSICS_ROSTER}
      initialNames={UNLINKED_NAMES}
    />
  ),
}

/** Every name links to a student: only the roster shows. */
export const AllLinked: Story = {
  render: () => <ClassStudentsPage initialStudents={PHYSICS_ROSTER} />,
}

/** A new class: the empty state's one action opens Add students. */
export const Empty: Story = {
  render: () => <ClassStudentsPage initialStudents={[]} />,
}

/** Add students open over the page; paste names or choose a CSV. */
export const AddingStudents: Story = {
  render: () => <ClassStudentsPage initialStudents={[]} addOpen />,
}

/** Names from earlier sessions but no roster yet: add them as students. */
export const NamesBeforeRoster: Story = {
  render: () => (
    <ClassStudentsPage initialStudents={[]} initialNames={UNLINKED_NAMES} />
  ),
}

export const Loading: Story = {
  render: () => <ClassStudentsPage initialStudents={[]} loading />,
}
