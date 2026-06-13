import type { Meta, StoryObj } from "@storybook/nextjs"

import { AppShell } from "@/components/slai/app-shell"
import { SessionActions } from "@/components/slai/session-actions"
import { SlaiSidebar, type SidebarSession } from "@/components/slai/slai-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SESSIONS: SidebarSession[] = [
  { name: "Biology", periods: [{ name: "Period 1", count: 2 }] },
  {
    name: "Physics",
    periods: [
      { name: "Period 1", count: 1 },
      { name: "Period 3 — Aug 21", active: true },
    ],
  },
  { name: "Science", periods: [] },
]

const SOURCES = ["Jai Audio 1", "Transcription English Apr 13"]

const USER = { name: "Anurag Maravi", email: "amaravi@wisc.edu", initials: "AM" }

const sidebar = (
  <SlaiSidebar
    sessions={SESSIONS}
    sources={SOURCES}
    user={USER}
    activeNav="manage"
    defaultOpenSession="Physics"
  />
)

function Placeholder() {
  return (
    <div className="grid gap-(--shell-gap) p-(--shell-gap) lg:h-full lg:grid-cols-2">
      <Card className="lg:h-full">
        <CardHeader>
          <CardTitle>Content region (left)</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Page content goes here. Padding and the gap between cards use the
          shared <code>--shell-gap</code> token.
        </CardContent>
      </Card>
      <Card className="lg:h-full">
        <CardHeader>
          <CardTitle>Content region (right)</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          The header and toolbar rows use <code>--shell-px</code> /{" "}
          <code>--shell-py</code> so chrome spacing stays identical across pages.
        </CardContent>
      </Card>
    </div>
  )
}

const meta: Meta<typeof AppShell> = {
  title: "SLAI/Shell/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AppShell>

/** Header + content only (e.g. the new-session page). */
export const TitleOnly: Story = {
  render: () => (
    <AppShell
      sidebar={sidebar}
      title={
        <span className="font-medium text-muted-foreground">Manage Session</span>
      }
    >
      <Placeholder />
    </AppShell>
  ),
}

/** Breadcrumb title + a toolbar row with page actions. */
export const WithToolbar: Story = {
  render: () => (
    <AppShell
      sidebar={sidebar}
      title={
        <>
          <span className="text-muted-foreground">Physics</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Period 3 — Aug 21</span>
        </>
      }
      toolbar={
        <div className="ml-auto">
          <SessionActions
            onAddActivity={() => {}}
            onOpenLanguageSettings={() => {}}
            onInviteStudents={() => {}}
            onEndSession={() => {}}
          />
        </div>
      }
    >
      <Placeholder />
    </AppShell>
  ),
}
