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
import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import {
  RecordingControl,
  type RecordingState,
} from "@/components/slai/recording-control"
import {
  SaveRecordingDialog,
  type SaveRecordingPhase,
} from "@/components/slai/save-recording-dialog"
import { useSimulatedAudioStream } from "./_simulated-audio"
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
  // The recorder: a simulated mic for the waveform, a clock, and the save
  // dialog once Stop is tapped.
  const stream = useSimulatedAudioStream()
  const [state, setState] = React.useState<RecordingState>("idle")
  const [seconds, setSeconds] = React.useState(0)
  const [save, setSave] = React.useState<SaveRecordingPhase | null>(null)

  React.useEffect(() => {
    if (state !== "recording") return
    const id = setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => clearInterval(id)
  }, [state])

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
        <RecordingControl
          state={state}
          seconds={seconds}
          audioStream={stream}
          onStart={() => {
            setSeconds(0)
            setState("recording")
          }}
          onPause={() => setState("paused")}
          onResume={() => setState("recording")}
          onStop={() => {
            setState("idle")
            setSave("form")
          }}
        />
      </div>

      <SaveRecordingDialog
        open={save !== null}
        onOpenChange={(open) => !open && setSave(null)}
        phase={save ?? "form"}
        durationSeconds={seconds}
        sizeBytes={seconds * 16_000}
        defaultFilename="recording-2026-08-21.webm"
        languageOptions={DEFAULT_LANGUAGES}
        uploadAttempt={1}
        uploadTotalAttempts={4}
        onUpload={() => {
          setSave("uploading")
          setTimeout(() => setSave("done"), 1800)
        }}
        onDiscard={() => setSave(null)}
        onNewRecording={() => {
          setSave(null)
          setSeconds(0)
        }}
      />
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
