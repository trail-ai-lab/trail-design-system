import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  DownloadIcon,
  FolderInputIcon,
  FolderPlusIcon,
  LanguagesIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShapesIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ActivityPickerSheet,
  type SessionActivity,
} from "@/components/slai/activity-picker"
import { AppShell } from "@/components/slai/app-shell"
import { LanguageSettingsSheet } from "@/components/slai/language-settings-sheet"
import { RecordingCard } from "@/components/slai/recording-card"
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
]

/**
 * A quick recording captured outside any session, so there are no groups and
 * no per-student participation.
 */
const RECORDING = {
  name: "Inclined Plane Lab",
}

const SLAI_SIDEBAR = (
  <SlaiSidebar
    sessions={SESSIONS}
    sources={SOURCES}
    user={SIDEBAR_USER}
    activeSource={RECORDING.name}
    defaultOpenSession="Physics"
  />
)

function QuickRecordingPage() {
  const [sheet, setSheet] = React.useState<"language" | "activity" | null>(
    null
  )
  const [activity, setActivity] = React.useState("none")

  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={
        <>
          <span className="text-muted-foreground">Sources</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{RECORDING.name}</span>
        </>
      }
      toolbar={
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={() => setSheet("activity")}>
            <ShapesIcon data-icon="inline-start" />
            Activity
          </Button>
          <Button variant="outline" onClick={() => setSheet("language")}>
            <LanguagesIcon data-icon="inline-start" />
            Language
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More actions">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Future: organize a standalone recording into a session. */}
              <DropdownMenuItem>
                <FolderInputIcon />
                Move to session
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderPlusIcon />
                Create new session
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DownloadIcon />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilIcon />
                Rename recording
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Delete recording
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      <div className="flex flex-1 items-center justify-center overflow-y-auto p-(--shell-px)">
        <RecordingCard className="w-full max-w-md" />
      </div>

      <LanguageSettingsSheet
        open={sheet === "language"}
        onOpenChange={(open) => setSheet(open ? "language" : null)}
      />
      <ActivityPickerSheet
        open={sheet === "activity"}
        onOpenChange={(open) => setSheet(open ? "activity" : null)}
        activities={ACTIVITIES}
        value={activity}
        onValueChange={setActivity}
      />
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/QuickRecording",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Default: Story = { render: () => <QuickRecordingPage /> }
