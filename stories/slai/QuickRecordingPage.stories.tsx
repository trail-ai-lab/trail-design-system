import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
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
import { RecordingControl } from "@/components/slai/recording-control"
import { PageSidebar } from "./_page-fixtures"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"
import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import { RenameDialog } from "@/components/slai/rename-dialog"

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

const SLAI_SIDEBAR = <PageSidebar activeSource={RECORDING.name} />

function QuickRecordingPage() {
  const [sheet, setSheet] = React.useState<"language" | "activity" | null>(null)
  const [activity, setActivity] = React.useState("none")
  const [dialog, setDialog] = React.useState<"rename" | "delete" | null>(null)

  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={
        <PageBreadcrumb
          items={[{ label: "Sources" }, { label: RECORDING.name }]}
        />
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
              <DropdownMenuItem onSelect={() => setDialog("rename")}>
                <PencilIcon />
                Rename recording
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => setDialog("delete")}
              >
                <Trash2Icon />
                Delete recording
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      {/* No card: like the student recording screen, the control stands alone
          in the content area; title and actions live in the shell. */}
      <div className="flex flex-1 items-center justify-center p-(--shell-gap)">
        <RecordingControl />
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
      <RenameDialog
        open={dialog === "rename"}
        onOpenChange={(open) => !open && setDialog(null)}
        title="Rename recording"
        currentName={RECORDING.name}
        onSubmit={() => setDialog(null)}
      />
      <DeleteConfirmDialog
        open={dialog === "delete"}
        onOpenChange={(open) => !open && setDialog(null)}
        itemKind="recording"
        itemName={RECORDING.name}
        onConfirm={() => setDialog(null)}
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
