import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { ActivityPickerSheet } from "@/components/slai/activity-picker"
import { AppShell } from "@/components/slai/app-shell"
import { ALL_GROUPS, GroupSwitcher } from "@/components/slai/group-switcher"
import { InviteStudentsSheet } from "@/components/slai/invite-students-sheet"
import { LanguageSettingsSheet } from "@/components/slai/language-settings-sheet"
import { NewSessionForm } from "@/components/slai/new-session-form"
import { SessionActions } from "@/components/slai/session-actions"
import { type ChatMessage } from "@/components/slai/session-chat"
import { CLASSES, PageSidebar } from "./_page-fixtures"
import { SummaryQaPanel } from "@/components/slai/summary-qa-panel"
import {
  GroupsEmptyState,
  TranscriptCard,
  type TranscriptGroup,
} from "@/components/slai/transcript-card"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"

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
        translation:
          "If we increase the angle of the ramp, the ball will go faster.",
      },
      {
        id: "4",
        timestamp: "3:43 PM",
        language: "American English",
        original:
          "Let's test it with three different angles and time each run.",
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
    recordedSeconds: 761,
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

const SLAI_SIDEBAR = <PageSidebar activeNav="live" liveSessionActive />

function ActiveSessionPage() {
  const [sheet, setSheet] = React.useState<
    "activity" | "language" | "invite" | null
  >(null)
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
          <div className="ml-auto flex items-center gap-3">
            <SessionActions
              onAddActivity={() => setSheet("activity")}
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
      <div className="flex min-h-0 flex-1 flex-col gap-(--shell-gap) p-(--shell-gap) lg:grid lg:grid-cols-2">
        <SummaryQaPanel
          className="h-[60svh] lg:h-full"
          summary={{
            scopeLabel,
            summary: SUMMARIES[scope],
            onCheckIn: () => {},
          }}
          chat={{
            scopeLabel,
            messages: CHATS[scope],
            suggestions: [
              "Which group needs help?",
              "Summarize misconceptions",
            ],
          }}
        />
        <TranscriptCard
          className="h-[60svh] lg:h-full"
          groups={groups}
          scope={scope}
          status={activeGroup?.status ?? "recording"}
          translationLanguage="English"
        />
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
        <NewSessionForm
          classes={CLASSES.map((c) => c.name)}
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
export const WaitingForGroups: Story = {
  render: () => <WaitingForGroupsPage />,
}
export const NewSession: Story = { render: () => <NewSessionPage /> }
