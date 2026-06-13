import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ActivityPickerSheet } from "@/components/slai/activity-picker"
import { AppShell } from "@/components/slai/app-shell"
import { ALL_GROUPS, GroupSwitcher } from "@/components/slai/group-switcher"
import { InviteStudentsSheet } from "@/components/slai/invite-students-sheet"
import { LanguageSettingsSheet } from "@/components/slai/language-settings-sheet"
import { NewSessionForm } from "@/components/slai/new-session-form"
import { SessionActions } from "@/components/slai/session-actions"
import { SessionChatCard, type ChatMessage } from "@/components/slai/session-chat"
import { SlaiSidebar, type SidebarSession } from "@/components/slai/slai-sidebar"
import { SummaryCard } from "@/components/slai/summary-card"
import {
  GroupsEmptyState,
  TranscriptCard,
  type TranscriptGroup,
} from "@/components/slai/transcript-card"

const JOIN_URL = "https://trail.wcer.wisc.edu/slai/student-view?token=mn1pCSGtJnd0ZWC0"

const SESSIONS: SidebarSession[] = [
  { name: "Biology", periods: [{ name: "Period 1" }, { name: "Period 6" }] },
  { name: "Gravity", periods: [{ name: "Period 1" }] },
  { name: "Physics", periods: [{ name: "Period 1" }] },
  { name: "Pune", periods: [{ name: "Test 5" }] },
  { name: "Science", periods: [] },
]

const SIDEBAR_USER = {
  name: "Anurag Maravi",
  email: "amaravi@wisc.edu",
  initials: "AM",
}

const SOURCES = [
  "Inclined Plane Lab",
  "Photosynthesis Discussion",
  "Newton's Laws Review",
  "Cell Division Walkthrough",
]

const ACTIVITIES = [
  {
    id: "compost",
    name: "Compost",
    description: "Interactive composting simulation for environmental science discussions",
    tags: ["environmental-science"],
  },
  {
    id: "inclined-plane",
    name: "Inclined Plane",
    description: "Interactive inclined plane simulation exploring forces and motion on ramps",
    tags: ["physics"],
  },
  {
    id: "pulley",
    name: "Pulley",
    description: "Interactive pulley simulation exploring mechanical advantage and simple machines",
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
    students: ["Aarav", "Mia", "Jordan"],
    entries: [
      {
        id: "1",
        timestamp: "3:39 PM",
        language: "American English",
        original: "Hello, hello. Okay, we're recording now.",
      },
      {
        id: "2",
        timestamp: "3:40 PM",
        language: "American English",
        original: "Gravity pulls the ball down the ramp, so it speeds up.",
      },
      {
        id: "3",
        timestamp: "3:41 PM",
        language: "Marathi",
        original: "उताराचा कोन वाढवला तर चेंडू वेगाने जाईल.",
        translation: "If we increase the angle of the ramp, the ball will go faster.",
      },
      {
        id: "4",
        timestamp: "3:43 PM",
        language: "American English",
        original: "Let's test it with three different angles and time each run.",
      },
      {
        id: "5",
        timestamp: "3:44 PM",
        language: "Marathi",
        original: "मी कोन मोजतो, तू वेळ नोंदव.",
        translation: "I will measure the angle, you record the time.",
      },
      {
        id: "6",
        timestamp: "3:46 PM",
        language: "American English",
        original: "First run at fifteen degrees took about two seconds.",
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
    students: ["Sam", "Priya"],
    entries: [
      {
        id: "1",
        timestamp: "3:42 PM",
        language: "American English",
        original: "Should we start with the steepest ramp or the flattest?",
      },
      {
        id: "2",
        timestamp: "3:45 PM",
        language: "American English",
        original: "Flattest first, so we have a baseline to compare against.",
      },
    ],
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
        "Yes — they're varying ramp angle and measuring time per run while keeping the ball and ramp length fixed, which is a clean controlled comparison.",
    },
  ],
  "group-2": [],
}

const SLAI_SIDEBAR = (
  <SlaiSidebar
    sessions={SESSIONS}
    sources={SOURCES}
    user={SIDEBAR_USER}
    activeNav="manage"
    defaultOpenSession="Physics"
  />
)

function ActiveSessionPage() {
  const [sheet, setSheet] = React.useState<
    "activity" | "language" | "invite" | null
  >(null)
  const [activity, setActivity] = React.useState("none")
  const [scope, setScope] = React.useState(ALL_GROUPS)

  const activeGroup = GROUPS.find((group) => group.id === scope)
  const scopeLabel = scope === ALL_GROUPS ? "All groups" : activeGroup?.name

  return (
    <AppShell
      sidebar={SLAI_SIDEBAR}
      title={
        <>
          <span className="text-muted-foreground">Physics</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Period 3 — Aug 21</span>
          <span className="ml-2 text-muted-foreground tabular-nums">24:13</span>
        </>
      }
      toolbar={
        <>
          <GroupSwitcher
            groups={GROUPS}
            value={scope}
            onValueChange={setScope}
          />
          <div className="ml-auto">
            <SessionActions
              onAddActivity={() => setSheet("activity")}
              onOpenLanguageSettings={() => setSheet("language")}
              onInviteStudents={() => setSheet("invite")}
              onEndSession={() => {}}
            />
          </div>
        </>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col gap-(--shell-gap) p-(--shell-gap) lg:grid lg:grid-cols-2">
        <TranscriptCard
          className="h-[60svh] lg:h-full"
          groups={GROUPS}
          scope={scope}
          status={activeGroup?.status ?? "recording"}
          translationLanguage="English"
        />
        <Tabs defaultValue="summary" className="h-[60svh] min-h-0 lg:h-full">
          <TabsList className="w-full">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="min-h-0">
            <SummaryCard
              className="h-full"
              scopeLabel={scopeLabel}
              summary={SUMMARIES[scope]}
              onCheckIn={() => {}}
            />
          </TabsContent>
          <TabsContent value="qa" className="min-h-0">
            <SessionChatCard
              className="h-full"
              scopeLabel={scopeLabel}
              messages={CHATS[scope]}
              suggestions={[
                "Which group needs help?",
                "Summarize misconceptions",
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ActivityPickerSheet
        open={sheet === "activity"}
        onOpenChange={(open) => setSheet(open ? "activity" : null)}
        activities={ACTIVITIES}
        value={activity}
        onValueChange={setActivity}
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
        <>
          <span className="text-muted-foreground">Pune</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Test 5</span>
        </>
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
      sidebar={SLAI_SIDEBAR}
      title={
        <span className="font-medium text-muted-foreground">Manage Session</span>
      }
    >
      <div className="flex flex-1 items-start justify-center overflow-y-auto px-(--shell-px) pt-8 pb-(--shell-px)">
        <NewSessionForm
          classes={SESSIONS.map((s) => s.name)}
          className="w-full max-w-xl"
        />
      </div>
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/ManageSession",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const ActiveSession: Story = { render: () => <ActiveSessionPage /> }
export const WaitingForGroups: Story = { render: () => <WaitingForGroupsPage /> }
export const NewSession: Story = { render: () => <NewSessionPage /> }
