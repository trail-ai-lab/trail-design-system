import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import { RenameDialog } from "@/components/slai/rename-dialog"
import {
  SlaiSidebar,
  type SidebarItemTarget,
  type SidebarSession,
} from "@/components/slai/slai-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const SESSIONS: SidebarSession[] = [
  {
    name: "Biology",
    periods: [{ name: "Period 1" }, { name: "Period 6" }],
  },
  { name: "Gravity", periods: [{ name: "Period 1" }] },
  {
    name: "Physics",
    periods: [
      { name: "Period 1" },
      { name: "Period 3 — Aug 21", active: true },
    ],
  },
  { name: "Science", periods: [] },
]

const SOURCES = [
  "Inclined Plane Lab",
  "Photosynthesis Discussion",
  "Newton's Laws Review",
]

const USER = { name: "Anurag Maravi", email: "amaravi@wisc.edu", initials: "AM" }

const meta: Meta<typeof SlaiSidebar> = {
  title: "SLAI/Shell/SlaiSidebar",
  component: SlaiSidebar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
        <div className="flex-1 bg-background" />
      </SidebarProvider>
    ),
  ],
  args: {
    sessions: SESSIONS,
    sources: SOURCES,
    user: USER,
    defaultOpenSession: "Physics",
  },
}

export default meta
type Story = StoryObj<typeof SlaiSidebar>

/** Live-session context: "Manage Session" highlighted. */
export const ManageSession: Story = {
  args: { activeNav: "manage" },
}

/** Post-session context: an active period highlighted instead of a nav item. */
export const PostSession: Story = {}

export const Loading: Story = {
  args: { sessionsLoading: true, sourcesLoading: true },
}

export const Empty: Story = {
  args: { sessions: [], sources: [] },
}

/** Sources can be objects to pick a file-type icon (audio by default). */
export const WithFileTypes: Story = {
  args: {
    sources: [
      { name: "Inclined Plane Lab", type: "audio" },
      { name: "Lab Handout", type: "pdf" },
    ],
  },
}

/** The Rename / Delete menu items report a target; the app opens the dialogs. */
export const RowActions: Story = {
  render: function RowActionsStory(args) {
    const [rename, setRename] = React.useState<SidebarItemTarget | null>(null)
    const [remove, setRemove] = React.useState<SidebarItemTarget | null>(null)
    return (
      <>
        <SlaiSidebar {...args} onRename={setRename} onDelete={setRemove} />
        <RenameDialog
          open={rename !== null}
          onOpenChange={(open) => !open && setRename(null)}
          title={`Rename ${rename?.kind ?? ""}`}
          currentName={rename?.name ?? ""}
          onSubmit={() => setRename(null)}
        />
        <DeleteConfirmDialog
          open={remove !== null}
          onOpenChange={(open) => !open && setRemove(null)}
          itemKind={remove?.kind ?? ""}
          itemName={remove?.name ?? ""}
          onConfirm={() => setRemove(null)}
        />
      </>
    )
  },
}

/** An optional Students group links to each student's progress page. */
export const WithStudents: Story = {
  args: {
    activeStudent: "mei",
    students: [
      { id: "mei", name: "Mei", language: "Mandarin" },
      { id: "liam", name: "Liam", language: "English" },
      { id: "rosa", name: "Rosa", language: "Spanish" },
    ],
  },
}
