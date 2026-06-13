import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  AudioLinesIcon,
  DownloadIcon,
  FolderInputIcon,
  FolderPlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShapesIcon,
  SlidersHorizontalIcon,
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
import { Toggle } from "@/components/ui/toggle"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ActivityLogCard,
  type ActivityLogEvent,
} from "@/components/slai/activity-log-card"
import { AppShell } from "@/components/slai/app-shell"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import {
  RecordedTranscriptCard,
  type RecordedEntry,
  type RecordedSpeaker,
} from "@/components/slai/recorded-transcript-card"
import {
  SessionChatCard,
  type ChatMessage,
} from "@/components/slai/session-chat"
import { SlaiSidebar, type SidebarSession } from "@/components/slai/slai-sidebar"
import { SummaryCard } from "@/components/slai/summary-card"

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

/**
 * A quick recording captured outside any session, so there are no groups and
 * no per-student participation — just one diarized track. Speakers are
 * unnamed ("Speaker 1/2") until the teacher labels them.
 */
const RECORDING = {
  name: "Inclined Plane Lab",
  durationSeconds: 1453,
  speakers: [
    { id: "s1", name: "Speaker 1" },
    { id: "s2", name: "Speaker 2" },
  ] satisfies RecordedSpeaker[],
  entries: [
    {
      id: "1",
      speakerId: "s1",
      timestamp: "0:04",
      language: "American English",
      original: "Okay, recording now. Let's walk through the ramp setup.",
    },
    {
      id: "2",
      speakerId: "s2",
      timestamp: "0:11",
      language: "American English",
      original: "Right — steeper ramp, the ball should pick up more speed.",
    },
    {
      id: "3",
      speakerId: "s1",
      timestamp: "0:19",
      language: "Marathi",
      original: "उताराचा कोन वाढवला तर चेंडू वेगाने जाईल.",
      translation: "If we increase the angle of the ramp, the ball will go faster.",
    },
    {
      id: "4",
      speakerId: "s2",
      timestamp: "0:27",
      language: "American English",
      original: "Let's time three runs and compare the angles.",
    },
  ] satisfies RecordedEntry[],
  summary:
    "A two-person walkthrough of an inclined-plane experiment: the speakers reason that a steeper ramp produces greater speed and plan to time three runs at different angles to compare. One speaker reasons in Marathi, the other in English.",
  activity: [
    {
      id: "a1",
      icon: ShapesIcon,
      title: "Inclined Plane",
      detail: "Activity opened",
      time: "0:02",
    },
    {
      id: "a2",
      icon: SlidersHorizontalIcon,
      title: "Ramp angle",
      detail: "15° → 30°",
      time: "0:21",
      value: "2 runs",
    },
  ] satisfies ActivityLogEvent[],
  chat: [
    { id: "1", role: "user", content: "What experiment is this recording about?" },
    {
      id: "2",
      role: "assistant",
      content:
        "It's an inclined-plane experiment. The two speakers discuss how ramp angle affects a ball's speed and plan to time three runs at different angles. There's no group or student data attached — it's a standalone recording.",
    },
  ] satisfies ChatMessage[],
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
  const [audioVisible, setAudioVisible] = React.useState(false)

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
          <Toggle
            variant="outline"
            size="lg"
            pressed={audioVisible}
            onPressedChange={setAudioVisible}
            aria-label="Toggle audio playback"
          >
            <AudioLinesIcon data-icon="inline-start" />
            Audio
          </Toggle>
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
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-(--shell-gap) p-(--shell-gap) lg:h-full">
          {audioVisible && (
            <AudioPlayerCard
              title={RECORDING.name}
              durationSeconds={RECORDING.durationSeconds}
            />
          )}

          <div className="grid gap-(--shell-gap) lg:min-h-0 lg:flex-1 lg:grid-cols-2">
            <SessionChatCard
              className="h-[60svh] lg:h-full"
              messages={RECORDING.chat}
              placeholder="Ask about this recording..."
            />

            <Tabs
              defaultValue="transcript"
              className="h-[60svh] min-h-0 lg:h-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript" className="min-h-0">
                <RecordedTranscriptCard
                  className="h-full"
                  speakers={RECORDING.speakers}
                  entries={RECORDING.entries}
                />
              </TabsContent>
              <TabsContent value="summary" className="min-h-0">
                <SummaryCard className="h-full" summary={RECORDING.summary} />
              </TabsContent>
              <TabsContent value="activity" className="min-h-0">
                <ActivityLogCard
                  className="h-full"
                  events={RECORDING.activity}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
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
