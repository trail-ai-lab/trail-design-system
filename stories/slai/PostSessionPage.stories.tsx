import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  AudioLinesIcon,
  DownloadIcon,
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
import { ActivityLogCard } from "@/components/slai/activity-log-card"
import { AppShell } from "@/components/slai/app-shell"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import { ALL_GROUPS, GroupSwitcher } from "@/components/slai/group-switcher"
import { ParticipationCard } from "@/components/slai/participation-card"
import {
  RecordedTranscriptCard,
  type RecordedEntry,
} from "@/components/slai/recorded-transcript-card"
import {
  SessionChatCard,
  type ChatMessage,
} from "@/components/slai/session-chat"
import { SlaiSidebar, type SidebarSession } from "@/components/slai/slai-sidebar"
import { SummaryCard } from "@/components/slai/summary-card"

const SESSIONS: SidebarSession[] = [
  { name: "Biology", periods: [{ name: "Period 1" }, { name: "Period 6" }] },
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

const SIDEBAR_USER = {
  name: "Anurag Maravi",
  email: "amaravi@wisc.edu",
  initials: "AM",
}

const SOURCES = ["Jai Audio 1", "Transcription English Apr 13", "RCS 3"]

const GROUP_1 = {
  id: "group-1",
  name: "Group 1",
  memberCount: 3,
  status: "uploaded" as const,
  durationSeconds: 1453,
  speakers: [
    { id: "g1-s1", name: "Aarav" },
    { id: "g1-s2", name: "Mia" },
    { id: "g1-s3", name: "Jordan" },
  ],
  entries: [
    {
      id: "1",
      speakerId: "g1-s2",
      timestamp: "3:39 PM",
      language: "American English",
      original: "Hello, hello. Okay, we're recording now.",
    },
    {
      id: "2",
      speakerId: "g1-s3",
      timestamp: "3:40 PM",
      language: "American English",
      original: "Gravity pulls the ball down the ramp, so it speeds up.",
    },
    {
      id: "3",
      speakerId: "g1-s1",
      timestamp: "3:41 PM",
      language: "Marathi",
      original: "उताराचा कोन वाढवला तर चेंडू वेगाने जाईल.",
      translation:
        "If we increase the angle of the ramp, the ball will go faster.",
    },
    {
      id: "4",
      speakerId: "g1-s2",
      timestamp: "3:43 PM",
      language: "American English",
      original: "Let's test it with three different angles and time each run.",
    },
    {
      id: "5",
      speakerId: "g1-s1",
      timestamp: "3:44 PM",
      language: "Marathi",
      original: "मी कोन मोजतो, तू वेळ नोंदव.",
      translation: "I will measure the angle, you record the time.",
    },
    {
      id: "6",
      speakerId: "g1-s3",
      timestamp: "3:46 PM",
      language: "American English",
      original: "First run at fifteen degrees took about two seconds.",
    },
    {
      id: "7",
      speakerId: "g1-s2",
      timestamp: "3:48 PM",
      language: "American English",
      original: "At thirty degrees it was way faster, about one second.",
    },
    {
      id: "8",
      speakerId: "g1-s1",
      timestamp: "3:49 PM",
      language: "Marathi",
      original: "मग कोन जितका जास्त, वेग तितका जास्त.",
      translation: "So the steeper the angle, the greater the speed.",
    },
  ] as RecordedEntry[],
  participation: [
    { name: "Aarav", percent: 42, turns: 11 },
    { name: "Mia", percent: 33, turns: 9 },
    { name: "Jordan", percent: 25, turns: 6 },
  ],
  activity: [
    {
      id: "g1-a1",
      icon: ShapesIcon,
      title: "Inclined Plane",
      detail: "Activity started",
      time: "3:40 PM",
    },
    {
      id: "g1-a2",
      icon: SlidersHorizontalIcon,
      title: "Ramp angle",
      detail: "15° → 30°",
      time: "3:43 PM",
      value: "2 runs",
    },
    {
      id: "g1-a3",
      icon: SlidersHorizontalIcon,
      title: "Ball mass",
      detail: "1.0 kg → 2.0 kg",
      time: "3:47 PM",
      value: "1 run",
    },
    {
      id: "g1-a4",
      icon: SlidersHorizontalIcon,
      title: "Ramp angle",
      detail: "30° → 45°",
      time: "3:49 PM",
      value: "1 run",
    },
  ],
  summary:
    "Group 1 investigated how ramp angle affects a ball's speed on the Inclined Plane trail, running 15°, 30°, and 45° and timing each. They concluded a steeper ramp produces greater acceleration. Aarav led the reasoning in Marathi while Mia and Jordan handled timing and measurement.",
  chat: [
    { id: "1", role: "user", content: "Did every student contribute?" },
    {
      id: "2",
      role: "assistant",
      content:
        "All three spoke. Aarav contributed the most (42% of turns) and drove the reasoning; Jordan participated least (25%) but ran the timing. Consider prompting Jordan to explain the 'why' next time.",
    },
  ] as ChatMessage[],
}

const GROUP_2 = {
  id: "group-2",
  name: "Group 2",
  memberCount: 2,
  status: "uploaded" as const,
  durationSeconds: 1207,
  speakers: [
    { id: "g2-s1", name: "Sam" },
    { id: "g2-s2", name: "Priya" },
  ],
  entries: [
    {
      id: "1",
      speakerId: "g2-s1",
      timestamp: "3:42 PM",
      language: "American English",
      original: "Should we start with the steepest ramp or the flattest?",
    },
    {
      id: "2",
      speakerId: "g2-s2",
      timestamp: "3:45 PM",
      language: "American English",
      original: "Flattest first, so we have a baseline to compare against.",
    },
    {
      id: "3",
      speakerId: "g2-s1",
      timestamp: "3:48 PM",
      language: "American English",
      original: "Baseline run took about three seconds.",
    },
  ] as RecordedEntry[],
  participation: [
    { name: "Sam", percent: 55, turns: 8 },
    { name: "Priya", percent: 45, turns: 7 },
  ],
  activity: [
    {
      id: "g2-a1",
      icon: ShapesIcon,
      title: "Inclined Plane",
      detail: "Activity started",
      time: "3:42 PM",
    },
    {
      id: "g2-a2",
      icon: SlidersHorizontalIcon,
      title: "Ramp angle",
      detail: "0° → 15°",
      time: "3:46 PM",
      value: "1 run",
    },
  ],
  summary:
    "Group 2 started by establishing a flat-ramp baseline before increasing the angle, timing a three-second baseline run to compare against steeper ramps.",
  chat: [
    { id: "1", role: "user", content: "Was Group 2 on track?" },
    {
      id: "2",
      role: "assistant",
      content:
        "Yes — they set up a clean baseline before changing variables, which is solid experimental method. Sam led; encourage Priya to propose the next variable to test.",
    },
  ] as ChatMessage[],
}

const GROUPS = [GROUP_1, GROUP_2]

const ALL_SUMMARY =
  "Both groups studied how ramp angle affects ball speed on the Inclined Plane trail. Group 1 ran three angles and concluded steeper ramps accelerate the ball more; Group 2 focused on establishing a flat baseline first. Across the class, students connected ramp angle to acceleration."

const ALL_CHAT: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Which group needs the most follow-up?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Group 2 moved slower and only reached the baseline, so they'd benefit from a nudge to vary the angle next session. Group 1 finished the comparison and is ready for a harder question, like predicting the time at 60°.",
  },
]

const SLAI_SIDEBAR = (
  <SlaiSidebar
    sessions={SESSIONS}
    sources={SOURCES}
    user={SIDEBAR_USER}
    defaultOpenSession="Physics"
  />
)

function PostSessionPage() {
  const [scope, setScope] = React.useState(ALL_GROUPS)
  const [audioVisible, setAudioVisible] = React.useState(false)
  const isAll = scope === ALL_GROUPS
  const activeGroup = GROUPS.find((group) => group.id === scope)
  const scopeLabel = isAll ? "All groups" : (activeGroup?.name ?? "")
  const summary = isAll ? ALL_SUMMARY : (activeGroup?.summary ?? "")
  const chat = isAll ? ALL_CHAT : (activeGroup?.chat ?? [])

  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={
        <>
          <span className="text-muted-foreground">Physics</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Period 3 — Aug 21</span>
        </>
      }
      toolbar={
        <>
          <GroupSwitcher
            groups={GROUPS}
            value={scope}
            onValueChange={setScope}
          />
          <div className="ml-auto flex items-center gap-2">
            {!isAll && (
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
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="More actions"
                >
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <DownloadIcon />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PencilIcon />
                  Rename session
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete recording
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        {isAll ? (
          // Combined view: only Summary and Q&A make sense across groups.
          <div className="grid gap-(--shell-gap) p-(--shell-gap) lg:h-full lg:grid-cols-2">
            <SessionChatCard
              className="h-[480px] lg:h-full"
              scopeLabel={scopeLabel}
              messages={chat}
            />
            <SummaryCard
              className="lg:h-full"
              scopeLabel={scopeLabel}
              summary={summary}
            />
          </div>
        ) : (
          activeGroup && (
            <div className="flex flex-col gap-(--shell-gap) p-(--shell-gap) lg:h-full">
              {audioVisible && (
                <AudioPlayerCard
                  title={`${activeGroup.name} recording`}
                  durationSeconds={activeGroup.durationSeconds}
                />
              )}

              <div className="grid gap-(--shell-gap) lg:min-h-0 lg:flex-1 lg:grid-cols-2">
                    <SessionChatCard
                      className="h-[60svh] lg:h-full"
                      scopeLabel={scopeLabel}
                      messages={chat}
                    />

                    <Tabs
                      defaultValue="transcript"
                      className="h-[60svh] min-h-0 lg:h-full"
                    >
                      <TabsList className="w-full">
                        <TabsTrigger value="transcript">Transcript</TabsTrigger>
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="participation">
                          Participation
                        </TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                      </TabsList>
                      <TabsContent value="transcript" className="min-h-0">
                        <RecordedTranscriptCard
                          key={scope}
                          className="h-full"
                          speakers={activeGroup.speakers}
                          entries={activeGroup.entries}
                        />
                      </TabsContent>
                      <TabsContent value="summary" className="min-h-0">
                        <SummaryCard
                          className="h-full"
                          scopeLabel={scopeLabel}
                          summary={summary}
                        />
                      </TabsContent>
                      <TabsContent value="participation" className="min-h-0">
                        <ParticipationCard
                          className="h-full"
                          scopeLabel={scopeLabel}
                          students={activeGroup.participation}
                        />
                      </TabsContent>
                      <TabsContent value="activity" className="min-h-0">
                        <ActivityLogCard
                          className="h-full"
                          scopeLabel={scopeLabel}
                          events={activeGroup.activity}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )
            )}
      </div>
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/PostSession",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Default: Story = { render: () => <PostSessionPage /> }
