import type { Meta, StoryObj } from "@storybook/nextjs"
import { ExternalLinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ActivityCard } from "@/components/slai/activity-card"
import { type SessionActivity } from "@/components/slai/activity-picker"
import { AppShell } from "@/components/slai/app-shell"
import { SlaiSidebar, type SidebarSession } from "@/components/slai/slai-sidebar"

const SESSIONS: SidebarSession[] = [
  { name: "Biology", periods: [{ name: "Period 1" }, { name: "Period 6" }] },
  { name: "Physics", periods: [{ name: "Period 1" }, { name: "Period 3 — Aug 21" }] },
  { name: "Science", periods: [] },
]

const SOURCES = [
  "Inclined Plane Lab",
  "Photosynthesis Discussion",
  "Newton's Laws Review",
]

const SIDEBAR_USER = {
  name: "Anurag Maravi",
  email: "amaravi@wisc.edu",
  initials: "AM",
}

const ACTIVITIES: SessionActivity[] = [
  {
    id: "compost",
    name: "Compost",
    description:
      "Interactive composting simulation for environmental science discussions",
    tags: ["environmental-science"],
  },
  {
    id: "inclined-plane",
    name: "Inclined Plane",
    description:
      "Interactive inclined plane simulation exploring forces and motion on ramps",
    tags: ["physics"],
  },
  {
    id: "pulley",
    name: "Pulley",
    description:
      "Interactive pulley simulation exploring mechanical advantage and simple machines",
    tags: ["physics"],
  },
  {
    id: "roller-coaster",
    name: "Roller Coaster",
    description: "Interactive roller coaster simulation for physics discussions",
    tags: ["physics"],
  },
  {
    id: "vidyamap",
    name: "VidyaMap",
    description:
      "Interactive concept-map explorer for knowledge building across Biology, Forces and Motion, and Pulleys",
    tags: ["concept-map", "biology", "physics"],
  },
]

const SLAI_SIDEBAR = (
  <SlaiSidebar
    sessions={SESSIONS}
    sources={SOURCES}
    user={SIDEBAR_USER}
    activeNav="activities"
    defaultOpenSession="Physics"
  />
)

function ActivitiesPage() {
  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={<span className="font-medium text-muted-foreground">Activities</span>}
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-(--shell-gap) p-(--shell-gap)">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-heading text-lg font-semibold text-foreground">
                Interactive Learning &amp; Design Lab
              </h1>
              <p className="text-sm text-muted-foreground">
                Simulations developed by the Interactive Learning &amp; Design
                Lab at UW-Madison
              </p>
            </div>
            <Button variant="outline" asChild>
              <a
                href="https://ilds.wceruw.org/"
                target="_blank"
                rel="noreferrer"
              >
                Visit website
                <ExternalLinkIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <div className="grid gap-(--shell-gap) sm:grid-cols-2 xl:grid-cols-3">
            {ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/Activities",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Default: Story = { render: () => <ActivitiesPage /> }
