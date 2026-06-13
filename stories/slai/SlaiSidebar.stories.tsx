import type { Meta, StoryObj } from "@storybook/nextjs"

import { SlaiSidebar, type SidebarSession } from "@/components/slai/slai-sidebar"
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
