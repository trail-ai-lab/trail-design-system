import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, waitFor } from "storybook/test"

import { LinkProvider } from "@/components/patterns/link-provider"
import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import { MoveToSessionDialog } from "@/components/slai/move-to-session-dialog"
import { RenameDialog } from "@/components/slai/rename-dialog"
import {
  SlaiSidebar,
  type SidebarItemTarget,
  type SidebarClass,
} from "@/components/slai/slai-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const CLASSES: SidebarClass[] = [
  {
    name: "Biology",
    sessions: [{ name: "Period 1" }, { name: "Period 6" }],
  },
  {
    name: "Physics",
    sessions: [
      { name: "Period 1" },
      { name: "Period 3 — Aug 21", active: true },
    ],
  },
  { name: "Science", sessions: [] },
]

const SOURCES = [
  "Inclined Plane Lab",
  "Photosynthesis Discussion",
  "Newton's Laws Review",
]

const USER = {
  name: "Anurag Maravi",
  email: "amaravi@wisc.edu",
  initials: "AM",
}

const meta: Meta<typeof SlaiSidebar> = {
  title: "SLAI/Shell/SlaiSidebar",
  tags: ["autodocs"],
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
    classes: CLASSES,
    sources: SOURCES,
    user: USER,
    defaultOpenClass: "Physics",
  },
}

export default meta
type Story = StoryObj<typeof SlaiSidebar>

/** Live context: "Live session" highlighted, with the "Running" marker while a session runs. */
export const Live: Story = {
  args: { activeNav: "live", liveSessionActive: true },
}

/** Session review: the session being viewed is highlighted in the tree instead of a nav item. */
export const SessionReview: Story = {}

export const Loading: Story = {
  args: { sessionsLoading: true, sourcesLoading: true },
}

export const Empty: Story = {
  args: { classes: [], sources: [] },
}

/**
 * A class with `materials` shows a "Course materials" row first in its folder
 * (with the ready count), linking to the class's materials page.
 */
export const WithCourseMaterials: Story = {
  args: {
    classes: CLASSES.map((klass) => ({
      ...klass,
      sessions: klass.sessions.map((session) => ({
        ...session,
        active: false,
      })),
      materials: {
        count: klass.name === "Physics" ? 3 : 0,
        active: klass.name === "Physics",
      },
    })),
  },
}

/**
 * A class with `roster` shows a "Students" row (the class roster, with its
 * count) after course materials and before the sessions.
 */
export const WithClassRoster: Story = {
  args: {
    classes: CLASSES.map((klass) => ({
      ...klass,
      sessions: klass.sessions.map((session) => ({
        ...session,
        active: false,
      })),
      materials: { count: klass.name === "Physics" ? 3 : 0 },
      roster: {
        count: klass.name === "Physics" ? 24 : 0,
        active: klass.name === "Physics",
      },
    })),
  },
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

/**
 * The row menus report a target (with its `id` when rows have one); the app
 * opens the dialogs. Source rows get a Download item when `onDownload` is set.
 */
export const RowActions: Story = {
  render: function RowActionsStory(args) {
    const [rename, setRename] = React.useState<SidebarItemTarget | null>(null)
    const [remove, setRemove] = React.useState<SidebarItemTarget | null>(null)
    return (
      <>
        <SlaiSidebar
          {...args}
          onRename={setRename}
          onDelete={setRemove}
          onDownload={() => {}}
        />
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
  // A session row's ⋮ opens its menu (the menu renders in a portal).
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Period 3 — Aug 21 options" })
    )
    await expect(
      await screen.findByRole("menuitem", { name: "Rename" })
    ).toBeInTheDocument()
    // Close it so the a11y check runs on the sidebar, not under the open menu.
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
  },
}

/**
 * `onMove` adds "Move to session…" to source rows; a row with
 * `movable: false` (a recording already in a session) leaves it out.
 */
export const MoveRecording: Story = {
  args: {
    sources: [
      { id: "s1", name: "Inclined Plane Lab" },
      { id: "s2", name: "Group 2 — Period 3", movable: false },
    ],
  },
  render: function MoveRecordingStory(args) {
    const [move, setMove] = React.useState<SidebarItemTarget | null>(null)
    return (
      <>
        <SlaiSidebar
          {...args}
          onRename={() => {}}
          onDelete={() => {}}
          onMove={setMove}
        />
        <MoveToSessionDialog
          open={move !== null}
          onOpenChange={(open) => !open && setMove(null)}
          recordingName={move?.name ?? ""}
          classes={[
            {
              id: "physics",
              name: "Physics",
              sessions: [{ id: "p1", name: "Period 1" }],
            },
          ]}
          onSubmit={() => setMove(null)}
        />
      </>
    )
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Inclined Plane Lab options" })
    )
    await expect(
      await screen.findByRole("menuitem", { name: "Move to session…" })
    ).toBeInTheDocument()
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
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

/**
 * Rows with an `href` (and nav items in `navHrefs`) render as links. They use
 * the component from `LinkProvider` — Next.js `Link` in an app — so
 * navigation stays client-side and respects `basePath`.
 */
export const WithLinks: Story = {
  args: {
    activeNav: "live",
    navHrefs: {
      live: "#live",
      record: "#record",
      source: "#add-source",
      activities: "#activities",
    },
    classes: [
      {
        id: "physics",
        name: "Physics",
        sessions: [
          { id: "p1", name: "Period 1", href: "#session-p1" },
          {
            id: "p3",
            name: "Period 3 — Aug 21",
            href: "#session-p3",
            active: true,
          },
        ],
      },
    ],
    sources: SOURCES.map((name, i) => ({
      id: `source-${i}`,
      name,
      href: `#source-${i}`,
    })),
  },
  render: (args) => (
    <LinkProvider component="a">
      <SlaiSidebar {...args} />
    </LinkProvider>
  ),
}

/** `onLogout` adds the account menu; `avatarUrl` shows the profile photo. */
export const AccountMenu: Story = {
  args: {
    user: { ...USER, avatarUrl: "https://github.com/shadcn.png" },
    onLogout: () => {},
  },
}
