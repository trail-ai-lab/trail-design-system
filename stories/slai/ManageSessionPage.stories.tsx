import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  AudioLinesIcon,
  ChevronRightIcon,
  FolderIcon,
  MicIcon,
  MountainIcon,
  MoreHorizontalIcon,
  ShapesIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ActivityPickerSheet } from "@/components/slai/activity-picker"
import { ALL_GROUPS, GroupSwitcher } from "@/components/slai/group-switcher"
import { InviteStudentsSheet } from "@/components/slai/invite-students-sheet"
import { LanguageSettingsSheet } from "@/components/slai/language-settings-sheet"
import { NewSessionForm } from "@/components/slai/new-session-form"
import { SessionChatCard, type ChatMessage } from "@/components/slai/session-chat"
import { SessionHeader } from "@/components/slai/session-header"
import { SummaryCard } from "@/components/slai/summary-card"
import {
  GroupsEmptyState,
  TranscriptCard,
  type TranscriptGroup,
} from "@/components/slai/transcript-card"

const JOIN_URL = "https://trail.wcer.wisc.edu/slai/student-view?token=mn1pCSGtJnd0ZWC0"

const SESSIONS: { name: string; periods: { name: string; count: number }[] }[] = [
  { name: "Biology", periods: [{ name: "Period 1", count: 2 }, { name: "Period 6", count: 2 }] },
  { name: "Gravity", periods: [{ name: "Period 1", count: 1 }] },
  { name: "Physics", periods: [{ name: "Period 1", count: 1 }] },
  { name: "Pune", periods: [{ name: "Test 5", count: 1 }] },
  { name: "Science", periods: [] },
]

const SOURCES = ["Jai Audio 1", "Transcription English Apr 13", "RCS 3", "Adam Rogers"]

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

function SlaiSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <MountainIcon className="size-5 text-primary" />
          <span className="font-heading text-sm font-semibold">SLAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <UsersIcon />
                Manage Session
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MicIcon />
                Record Audio
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UploadIcon />
                Add Source
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ShapesIcon />
                Activities
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sessions</SidebarGroupLabel>
          <SidebarMenu>
            {SESSIONS.map((session) => (
              <Collapsible
                key={session.name}
                defaultOpen={session.name === "Physics"}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <ChevronRightIcon className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      <FolderIcon />
                      {session.name}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {session.periods.map((period) => (
                        <SidebarMenuSubItem key={period.name}>
                          <SidebarMenuSubButton>
                            {period.name}
                          </SidebarMenuSubButton>
                          <SidebarMenuBadge>{period.count}</SidebarMenuBadge>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sources</SidebarGroupLabel>
          <SidebarMenu>
            {SOURCES.map((source) => (
              <SidebarMenuItem key={source}>
                <SidebarMenuButton>
                  <AudioLinesIcon />
                  <span className="truncate">{source}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar className="size-7">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Anurag Maravi</p>
            <p className="truncate text-xs text-muted-foreground">
              amaravi@wisc.edu
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Account menu">
            <MoreHorizontalIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background lg:h-svh lg:overflow-hidden">
        <SlaiSidebar />
        <main className="flex min-w-0 flex-1 flex-col lg:h-full">
          <div className="flex shrink-0 items-center gap-2 border-b border-border px-6 py-3">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">
              Manage Session
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

function ActiveSessionPage() {
  const [sheet, setSheet] = React.useState<
    "activity" | "language" | "invite" | null
  >(null)
  const [activity, setActivity] = React.useState("none")
  const [scope, setScope] = React.useState(ALL_GROUPS)

  const activeGroup = GROUPS.find((group) => group.id === scope)
  const scopeLabel = scope === ALL_GROUPS ? "All groups" : activeGroup?.name

  return (
    <PageShell>
      <div className="shrink-0 border-b border-border px-6 py-3">
        <SessionHeader
          klass="Physics"
          session="Period 3 — Aug 21"
          elapsed="24:13"
          spokenLanguages={["Marathi", "English (US)"]}
          translationLanguage="English"
          onAddActivity={() => setSheet("activity")}
          onOpenLanguageSettings={() => setSheet("language")}
          onInviteStudents={() => setSheet("invite")}
          onEndSession={() => {}}
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-6 py-2.5">
        <GroupSwitcher
          groups={GROUPS}
          value={scope}
          onValueChange={setScope}
        />
        <span className="text-xs text-muted-foreground">
          Switches the transcript, summary, and Q&A together
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:grid lg:grid-cols-2">
        <TranscriptCard
          className="h-[60svh] lg:h-full"
          groups={GROUPS}
          scope={scope}
          status={activeGroup?.status ?? "recording"}
          translationLanguage="English"
        />
        <div className="flex min-h-0 flex-col gap-4 lg:grid lg:grid-rows-[auto_minmax(0,1fr)]">
          <SummaryCard
            scopeLabel={scopeLabel}
            summary={SUMMARIES[scope]}
            onCheckIn={() => {}}
          />
          <SessionChatCard
            className="h-[60svh] lg:h-auto lg:min-h-0"
            scopeLabel={scopeLabel}
            messages={CHATS[scope]}
            suggestions={[
              "Which group needs help?",
              "Summarize misconceptions",
            ]}
          />
        </div>
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
    </PageShell>
  )
}

function WaitingForGroupsPage() {
  const [inviteOpen, setInviteOpen] = React.useState(false)

  return (
    <PageShell>
      <div className="shrink-0 border-b border-border px-6 py-3">
        <SessionHeader
          klass="Pune"
          session="Test 5"
          spokenLanguages={["Marathi", "English (US)"]}
          translationLanguage="English"
          onInviteStudents={() => setInviteOpen(true)}
          onEndSession={() => {}}
        />
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-4">
        <GroupsEmptyState onShowInvite={() => setInviteOpen(true)} />
      </div>
      <InviteStudentsSheet
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        joinUrl={JOIN_URL}
      />
    </PageShell>
  )
}

function NewSessionPage() {
  return (
    <PageShell>
      <div className="flex flex-1 items-start justify-center overflow-y-auto p-6 pt-8">
        <NewSessionForm
          classes={SESSIONS.map((s) => s.name)}
          className="w-full max-w-xl"
        />
      </div>
    </PageShell>
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
