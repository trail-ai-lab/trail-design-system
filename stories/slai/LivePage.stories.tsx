import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { MessagesSquareIcon, ScrollTextIcon } from "lucide-react"

import { ActivityPickerSheet } from "@/components/slai/activity-picker"
import { AppShell } from "@/components/slai/app-shell"
import { ALL_GROUPS, GroupSwitcher } from "@/components/slai/group-switcher"
import { InviteStudentsSheet } from "@/components/slai/invite-students-sheet"
import { LanguageSettingsSheet } from "@/components/slai/language-settings-sheet"
import { SessionActions } from "@/components/slai/session-actions"
import { type ChatMessage } from "@/components/slai/session-chat"
import { CLASSES, PageSidebar } from "./_page-fixtures"
import { SummaryQaPanel } from "@/components/slai/summary-qa-panel"
import {
  type SummaryRange,
  type SummaryVersion,
} from "@/components/slai/summary-card"
import {
  GroupsEmptyState,
  TranscriptCard,
  type TranscriptGroup,
} from "@/components/slai/transcript-card"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"
import { PanelToggle } from "@/components/patterns/panel-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalsPanel } from "@/components/slai/goals-panel"
import type { StudentInsight } from "@/components/slai/student-insight-card"
import { cn } from "@/lib/utils"
import { UploadMaterialsSheet } from "@/components/slai/upload-materials-sheet"
import { useSessionMaterials } from "./_material-fixtures"
import { NewSessionWithMaterials } from "./_new-session-with-materials"

const JOIN_URL =
  "https://trail.wcer.wisc.edu/slai/student-view?token=mn1pCSGtJnd0ZWC0"

const ACTIVITIES = [
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
    id: "vidyamap",
    name: "VidyaMap",
    description: "Interactive concept-map explorer for knowledge building",
    tags: ["concept-map", "biology", "physics"],
  },
]

const GROUPS: TranscriptGroup[] = [
  {
    id: "group-1",
    name: "Group 1",
    memberCount: 5,
    active: true,
    status: "recording",
    startedAt: "3:38 PM",
    recordedSeconds: 1324,
    students: ["Aarav", "Mia", "Jordan"],
    entries: [
      {
        id: "1",
        timestamp: "3:39 PM",
        language: "English",
        original: "Hello, hello. Okay, we're recording now.",
      },
      {
        id: "2",
        timestamp: "3:40 PM",
        language: "English",
        original: "Gravity pulls the ball down the ramp, so it speeds up.",
        speaker: { name: "Aarav" },
      },
      {
        id: "3",
        timestamp: "3:41 PM",
        language: "Marathi",
        original: "उताराचा कोन वाढवला तर चेंडू वेगाने जाईल.",
        speaker: { name: "Mia" },
        translation:
          "If we increase the angle of the ramp, the ball will go faster.",
      },
      {
        id: "4",
        timestamp: "3:43 PM",
        language: "English",
        original:
          "Let's test it with three different angles and time each run.",
        speaker: { name: "Jordan" },
      },
      {
        id: "5",
        timestamp: "3:44 PM",
        language: "Marathi",
        original: "मी कोन मोजतो, तू वेळ नोंदव.",
        speaker: { name: "Mia" },
        translation: "I will measure the angle, you record the time.",
      },
      {
        id: "6",
        timestamp: "3:46 PM",
        language: "English",
        original: "First run at fifteen degrees took about two seconds.",
        speaker: { name: "Jordan" },
      },
    ],
  },
  {
    id: "group-2",
    name: "Group 2",
    memberCount: 2,
    active: true,
    status: "paused",
    startedAt: "3:41 PM",
    recordedSeconds: 761,
    students: ["Sam", "Priya"],
    entries: [
      {
        id: "1",
        timestamp: "3:42 PM",
        language: "English",
        original: "Should we start with the steepest ramp or the flattest?",
        speaker: { name: "Ms. Lee", role: "teacher" },
      },
      {
        id: "2",
        timestamp: "3:45 PM",
        language: "English",
        original: "Flattest first, so we have a baseline to compare against.",
        speaker: { name: "Priya" },
      },
    ],
  },
]

// Live goal results for Group 1 (the session's standard is set)
const LIVE_GOAL = {
  heading: "Grade 7 · Ratios and Proportional Relationships",
  code: "7.RP.2",
  description:
    "Recognize and represent proportional relationships between quantities.",
}
const LIVE_INSIGHTS: StudentInsight[] = [
  {
    id: "aarav",
    name: "Aarav",
    primaryLanguage: "English",
    words: 96,
    standard: {
      verdict: "partial",
      reasoning:
        "Aarav linked a steeper ramp to a faster ball but hasn't compared the times as a ratio yet.",
    },
    evidence: [
      {
        quote: "Gravity pulls the ball down the ramp, so it speeds up.",
        time: "3:40 PM",
      },
    ],
  },
  {
    id: "mia",
    name: "Mia",
    primaryLanguage: "Marathi",
    words: 61,
    standard: {
      verdict: "not-yet",
      reasoning:
        "Mia planned the measurements but hasn't related the quantities.",
    },
    evidence: [
      {
        quote: "मी कोन मोजतो, तू वेळ नोंदव.",
        translation: "I will measure the angle, you record the time.",
        language: "Marathi",
        time: "3:44 PM",
      },
    ],
    actionPrompt: "Ask Mia what happens to the time when the angle doubles.",
  },
  {
    id: "jordan",
    name: "Jordan",
    primaryLanguage: "English",
    words: 12,
    standard: { verdict: null, noVerdictReason: "Said too little to judge" },
  },
]

const SUMMARIES: Record<string, string> = {
  [ALL_GROUPS]:
    "Both groups are investigating how ramp angle affects ball speed. Group 1 is timing runs across three angles; Group 2 is establishing a flat baseline first. Both are converging on the idea that a steeper ramp produces greater acceleration.",
  "group-1":
    "Group 1 is testing how ramp angle affects ball speed. They connected steeper ramps to greater acceleration and are designing a three-angle comparison, splitting up angle measurement and timing.",
  "group-2":
    "Group 2 is setting up their method: they decided to run the flattest ramp first to establish a baseline before comparing steeper angles.",
}

// Earlier summaries per scope, newest first (the current one is SUMMARIES).
const EARLIER_SUMMARIES: Record<string, SummaryVersion[]> = {
  [ALL_GROUPS]: [
    {
      id: "all-2",
      label: "Aug 21, 3:50 PM",
      description: "Whole session",
      summary:
        "Both groups set up their ramps; Group 1 has started timing runs while Group 2 is still choosing a starting angle.",
    },
  ],
  "group-1": [
    {
      id: "g1-2",
      label: "Aug 21, 3:50 PM",
      description: "Since check-in",
      summary:
        "Group 1 linked gravity to the ball speeding up and proposed testing three angles.",
    },
    {
      id: "g1-1",
      label: "Aug 21, 3:42 PM",
      description: "Whole session",
      summary: "Group 1 set up the ramp and started recording.",
    },
  ],
  "group-2": [],
}

const CHATS: Record<string, ChatMessage[]> = {
  [ALL_GROUPS]: [
    {
      id: "1",
      role: "user",
      content: "Which group is closest to identifying acceleration?",
    },
    {
      id: "2",
      role: "assistant",
      content:
        "Group 1 — they linked a steeper ramp angle to the ball speeding up and are now timing runs at three angles, which sets up a comparison of how speed changes over time. Group 2 is still establishing their baseline.",
      grounding: "transcript-curriculum",
      materials: [
        {
          name: "Unit 3 — Forces and motion.pptx",
          location: "slide 14",
          excerpt:
            "Acceleration is how quickly velocity changes. Compare how long the ball takes over equal distances to see whether it is speeding up.",
        },
      ],
    },
  ],
  "group-1": [
    {
      id: "1",
      role: "user",
      content: "Is Group 1 using the right variables?",
    },
    {
      id: "2",
      role: "assistant",
      content:
        "Yes — they're varying ramp angle and measuring time per run while keeping the ball and ramp length fixed, which is a clean controlled comparison. Click to see where they said it.",
      grounding: "transcript",
      highlight: "Let's test it with three different angles and time each run.",
    },
  ],
  "group-2": [],
}

const SLAI_SIDEBAR = <PageSidebar activeNav="live" liveSessionActive />

function ActiveSessionPage({
  defaultQaVisible = true,
  defaultTranscriptVisible = true,
  defaultTab = "transcript",
}: {
  defaultQaVisible?: boolean
  defaultTranscriptVisible?: boolean
  /** The right panel's open tab: Goals or Transcript */
  defaultTab?: "goals" | "transcript"
}) {
  const [tab, setTab] = React.useState(defaultTab)
  const [checking, setChecking] = React.useState(false)
  // Which panels show; the last one showing can't be hidden.
  const [qaVisible, setQaVisible] = React.useState(defaultQaVisible)
  const [transcriptVisible, setTranscriptVisible] = React.useState(
    defaultTranscriptVisible
  )
  const [sheet, setSheet] = React.useState<
    "activity" | "materials" | "language" | "invite" | null
  >(null)
  // Course materials: the class library and what this session uses.
  const sessionMaterials = useSessionMaterials("Period 3 — Aug 21")
  // Whether new answers also draw on course materials; off by default.
  const [curriculum, setCurriculum] = React.useState(false)
  const [activity, setActivity] = React.useState("none")
  const [groups, setGroups] = React.useState(GROUPS)
  const [scope, setScope] = React.useState(GROUPS[0].id)

  const activeGroup = groups.find((group) => group.id === scope)
  const removeActiveGroup = () => {
    const remaining = groups.filter((group) => group.id !== scope)
    setGroups(remaining)
    setScope(remaining[0]?.id ?? ALL_GROUPS)
  }
  const scopeLabel = scope === ALL_GROUPS ? "All groups" : activeGroup?.name
  // Summarize covers the whole session; the other button covers the time since
  // the latest check-in (3:50 PM here), which the transcript's "Check in" marks.
  const [range, setRange] = React.useState<SummaryRange>("whole-session")
  const [checkingIn, setCheckingIn] = React.useState(false)
  const checkIn = () => {
    setCheckingIn(true)
    setTimeout(() => setCheckingIn(false), 800)
  }
  const versions: SummaryVersion[] = [
    {
      id: `${scope}-latest`,
      label: "Aug 21, 4:02 PM",
      description:
        range === "whole-session" ? "Whole session" : "Since check-in",
      summary: SUMMARIES[scope],
    },
    ...(EARLIER_SUMMARIES[scope] ?? []),
  ]
  // Clicking an answer highlights the line it cites; new lines stop
  // scrolling it away until "Back to latest".
  const [highlight, setHighlight] = React.useState<{
    scope: string
    entryId?: string
  }>()
  const highlightedEntryId =
    highlight?.scope === scope ? highlight.entryId : undefined
  const showSource = (message: ChatMessage) => {
    const entry = groups
      .filter((group) => scope === ALL_GROUPS || group.id === scope)
      .flatMap((group) => group.entries)
      .find((line) => line.original === message.highlight)
    if (entry) setHighlight({ scope, entryId: entry.id })
  }

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
            groups={groups}
            value={scope}
            onValueChange={setScope}
          />
          <div className="ml-auto flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
            <PanelToggle
              variant="primary"
              pressed={qaVisible}
              onPressedChange={setQaVisible}
              disabled={qaVisible && !transcriptVisible}
            >
              <MessagesSquareIcon data-icon="inline-start" />
              Summary &amp; Q&amp;A
            </PanelToggle>
            <PanelToggle
              pressed={transcriptVisible}
              onPressedChange={setTranscriptVisible}
              disabled={transcriptVisible && !qaVisible}
            >
              <ScrollTextIcon data-icon="inline-start" />
              Transcript
            </PanelToggle>
            <SessionActions
              onAddActivity={() => setSheet("activity")}
              onOpenMaterials={() => setSheet("materials")}
              onOpenLanguageSettings={() => setSheet("language")}
              onInviteStudents={() => setSheet("invite")}
              onEndSession={() => {}}
              groupName={activeGroup?.name}
              onRemoveGroup={removeActiveGroup}
            />
          </div>
        </>
      }
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-(--shell-gap) p-(--shell-gap)",
          qaVisible && transcriptVisible && "lg:grid lg:grid-cols-2"
        )}
      >
        {qaVisible && (
          <SummaryQaPanel
            className={cn(
              "h-(--shell-panel-h) lg:h-full",
              !transcriptVisible && "h-auto min-h-0 flex-1"
            )}
            summary={{
              scopeLabel,
              summary: SUMMARIES[scope],
              range,
              since: range === "since-checkin" ? "3:50 PM" : undefined,
              versions,
              onRegenerate: () => setRange("whole-session"),
              onSummarizeSinceCheckIn: () => setRange("since-checkin"),
              lastCheckIn: "3:50 PM",
            }}
            chat={{
              scopeLabel,
              messages: CHATS[scope],
              onMessageClick: showSource,
              materials: sessionMaterials.counts,
              onMaterialsClick: () => setSheet("materials"),
              curriculum,
              onCurriculumChange: setCurriculum,
              suggestions: [
                "Which group needs help?",
                "Summarize misconceptions",
              ],
            }}
          />
        )}
        {transcriptVisible && (
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as typeof tab)}
            className={cn(
              "h-(--shell-panel-h) min-h-0 lg:h-full",
              !qaVisible && "h-auto flex-1"
            )}
          >
            <TabsList className="w-full">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent
              value="goals"
              // Inset (cancelled by the negative margin) so the cards' ring
              // and shadow aren't clipped by the scroll edge.
              className="-mx-1 min-h-0 overflow-y-auto px-1 pb-1"
            >
              <GoalsPanel
                standardLabel="CCSS"
                goal={LIVE_GOAL}
                students={scope === "group-1" ? LIVE_INSIGHTS : []}
                provisional
                checkedAt="3:45 PM"
                newLines={scope === "group-1" ? 3 : undefined}
                loading={checking}
                onCheck={() => {
                  setChecking(true)
                  setTimeout(() => setChecking(false), 1500)
                }}
                missingSamples={scope === "group-2" ? ["Sam"] : undefined}
              />
            </TabsContent>
            <TabsContent value="transcript" className="min-h-0">
              <TranscriptCard
                className="h-full"
                groups={groups}
                scope={scope}
                status={activeGroup?.status ?? "recording"}
                translationLanguage="English"
                highlightedEntryId={highlightedEntryId}
                onHighlightedEntryIdChange={(entryId) =>
                  setHighlight({ scope, entryId })
                }
                onCheckIn={checkIn}
                checkingIn={checkingIn}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <ActivityPickerSheet
        open={sheet === "activity"}
        onOpenChange={(open) => setSheet(open ? "activity" : null)}
        activities={ACTIVITIES}
        value={activity}
        onValueChange={setActivity}
      />
      <UploadMaterialsSheet
        open={sheet === "materials"}
        onOpenChange={(open) => setSheet(open ? "materials" : null)}
        klass="Physics"
        {...sessionMaterials.sheetProps}
      />
      <LanguageSettingsSheet
        open={sheet === "language"}
        onOpenChange={(open) => setSheet(open ? "language" : null)}
      />
      <InviteStudentsSheet
        open={sheet === "invite"}
        onOpenChange={(open) => setSheet(open ? "invite" : null)}
        joinUrl={JOIN_URL}
      />
    </AppShell>
  )
}

function WaitingForGroupsPage() {
  const [inviteOpen, setInviteOpen] = React.useState(false)

  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={
        <PageBreadcrumb
          items={[{ label: "Physics" }, { label: "Period 3 — Aug 21" }]}
        />
      }
      toolbar={
        <div className="ml-auto">
          <SessionActions
            onInviteStudents={() => setInviteOpen(true)}
            onEndSession={() => {}}
          />
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 items-center justify-center p-(--shell-gap)">
        <GroupsEmptyState onShowInvite={() => setInviteOpen(true)} />
      </div>
      <InviteStudentsSheet
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        joinUrl={JOIN_URL}
      />
    </AppShell>
  )
}

function NewSessionPage() {
  return (
    <AppShell
      sidebar={<PageSidebar activeNav="live" />}
      title={
        <PageBreadcrumb
          items={[{ label: "Live session" }, { label: "New session" }]}
        />
      }
    >
      <div className="flex flex-1 items-center-safe justify-center overflow-y-auto p-(--shell-gap)">
        <NewSessionWithMaterials
          classes={CLASSES.map((c) => c.name)}
          defaultClass="Physics"
          className="w-full max-w-lg"
        />
      </div>
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
  title: "SLAI/Pages/Live",
  parameters: { layout: "fullscreen", a11y: A11Y },
}

export default meta
type Story = StoryObj

export const ActiveSession: Story = { render: () => <ActiveSessionPage /> }
/** "Summary & Q&A" off: the transcript takes the whole page. Its own toggle
 * is disabled while it's the only panel showing. */
/** The Goals tab: each student's progress on the session's standard so far
 * (provisional until the recording is uploaded). Group 2 shows the
 * not-checked-yet state, with a student who has no voice sample. */
export const Goals: Story = {
  render: () => <ActiveSessionPage defaultTab="goals" />,
}
export const TranscriptOnly: Story = {
  render: () => <ActiveSessionPage defaultQaVisible={false} />,
}
/** "Transcript" off: Summary and Q&A take the whole page. */
export const SummaryQaOnly: Story = {
  render: () => <ActiveSessionPage defaultTranscriptVisible={false} />,
}
export const WaitingForGroups: Story = {
  render: () => <WaitingForGroupsPage />,
}
export const NewSession: Story = { render: () => <NewSessionPage /> }
