import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AudioLinesIcon,
  DownloadIcon,
  MessagesSquareIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShapesIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toggle } from "@/components/ui/toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalsPanel } from "@/components/slai/goals-panel"
import { INSIGHTS } from "./_student-fixtures"
import { ActivityLogCard } from "@/components/slai/activity-log-card"
import { AppShell } from "@/components/slai/app-shell"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import { ALL_GROUPS, GroupSwitcher } from "@/components/slai/group-switcher"
import { ParticipationCard } from "@/components/slai/participation-card"
import {
  TranscriptCard,
  type TranscriptGroup,
} from "@/components/slai/transcript-card"
import {
  RecordedTranscriptCard,
  type RecordedEntry,
} from "@/components/slai/recorded-transcript-card"
import { type ChatMessage } from "@/components/slai/session-chat"
import { PageSidebar } from "./_page-fixtures"
import { SummaryQaPanel } from "@/components/slai/summary-qa-panel"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"
import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import { RenameDialog } from "@/components/slai/rename-dialog"

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

// The raw transcript: same utterances, but the speaker is unknown.
const TRANSCRIPT_GROUPS: TranscriptGroup[] = GROUPS.map((group) => ({
  ...group,
  students: group.speakers.map((speaker) => speaker.name),
}))

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
  <PageSidebar
    activeSession={{ className: "Physics", session: "Period 3 — Aug 21" }}
  />
)

function SessionReviewPage() {
  const [scope, setScope] = React.useState(ALL_GROUPS)
  const [audioVisible, setAudioVisible] = React.useState(false)
  const [qaVisible, setQaVisible] = React.useState(false)
  const [dialog, setDialog] = React.useState<"rename" | "delete" | null>(null)
  const isAll = scope === ALL_GROUPS
  const activeGroup = GROUPS.find((group) => group.id === scope)
  const scopeLabel = isAll ? "All groups" : (activeGroup?.name ?? "")
  const summary = isAll ? ALL_SUMMARY : (activeGroup?.summary ?? "")
  const chat = isAll ? ALL_CHAT : (activeGroup?.chat ?? [])

  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={
        <PageBreadcrumb
          items={[{ label: "Physics" }, { label: "Period 3 — Aug 21" }]}
        />
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
                pressed={qaVisible}
                onPressedChange={setQaVisible}
                aria-label="Toggle Summary and Q&A"
                // Primary: the AI panel is the most-used toggle on this page.
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/80"
              >
                <MessagesSquareIcon data-icon="inline-start" />
                Summary &amp; Q&amp;A
              </Toggle>
            )}
            {!isAll && (
              <Toggle
                variant="outline"
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
                <Button variant="outline" size="icon" aria-label="More actions">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <DownloadIcon />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setDialog("rename")}>
                  <PencilIcon />
                  Rename session
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setDialog("delete")}
                >
                  <Trash2Icon />
                  Delete session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      }
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        {isAll ? (
          // Combined view: only Summary and Q&A make sense across groups, so the
          // AI panel fills the page.
          <div className="flex p-(--shell-gap) lg:h-full">
            <SummaryQaPanel
              className="h-[60svh] flex-1 lg:h-full"
              summary={{ scopeLabel, summary }}
              chat={{ scopeLabel, messages: chat }}
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

              <div
                className={cn(
                  "grid gap-(--shell-gap) lg:min-h-0 lg:flex-1",
                  qaVisible && "lg:grid-cols-2"
                )}
              >
                <Tabs
                  defaultValue="goals"
                  className="h-[60svh] min-h-0 lg:h-full"
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="speakers">Speakers</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="goals"
                    className="min-h-0 overflow-y-auto"
                  >
                    <GoalsPanel
                      standardLabel="CCSS"
                      students={INSIGHTS}
                      goal={{
                        standardCode: "3.OA.A.2",
                        languageObjective:
                          'Explain equal sharing using "each".',
                        standardDescription:
                          "Interpret whole-number quotients as the number of objects in each share.",
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="transcript" className="min-h-0">
                    <TranscriptCard
                      className="h-full"
                      title="Transcript"
                      groups={TRANSCRIPT_GROUPS}
                      scope={scope}
                      status={activeGroup.status}
                      autoScroll={false}
                    />
                  </TabsContent>
                  <TabsContent
                    value="speakers"
                    className="flex min-h-0 flex-col gap-(--shell-gap)"
                  >
                    <ParticipationCard
                      className="shrink-0"
                      scopeLabel={scopeLabel}
                      students={activeGroup.participation}
                    />
                    <RecordedTranscriptCard
                      key={scope}
                      className="min-h-80 flex-1"
                      speakers={activeGroup.speakers}
                      entries={activeGroup.entries}
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

                {qaVisible && (
                  <SummaryQaPanel
                    className="h-[60svh] lg:h-full"
                    summary={{ scopeLabel, summary }}
                    chat={{ scopeLabel, messages: chat }}
                  />
                )}
              </div>
            </div>
          )
        )}
      </div>
      <RenameDialog
        open={dialog === "rename"}
        onOpenChange={(open) => !open && setDialog(null)}
        title="Rename session"
        currentName={"Period 3 — Aug 21"}
        onSubmit={() => setDialog(null)}
      />
      <DeleteConfirmDialog
        open={dialog === "delete"}
        onOpenChange={(open) => !open && setDialog(null)}
        itemKind="session"
        itemName={"Period 3 — Aug 21"}
        onConfirm={() => setDialog(null)}
      />
    </AppShell>
  )
}

// a11y: scrollable-region-focusable disabled. Upstream: Radix ScrollArea's viewport isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta = {
  title: "SLAI/Pages/Session",
  parameters: { layout: "fullscreen", a11y: A11Y },
}

export default meta
type Story = StoryObj

export const Review: Story = { render: () => <SessionReviewPage /> }
