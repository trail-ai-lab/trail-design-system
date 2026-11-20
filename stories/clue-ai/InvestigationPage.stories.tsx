import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ArrowLeftRightIcon,
  FileTextIcon,
  HourglassIcon,
  LockIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import {
  AiSummaryCard,
  type SummaryClassifications,
} from "@/components/clue-ai/ai-summary-card"
import { CasePanels } from "@/components/clue-ai/case-panels"
import { EvidencePanel } from "@/components/clue-ai/evidence-panel"
import {
  PhaseTimer,
  type PhaseTimerStatus,
} from "@/components/clue-ai/phase-timer"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import {
  TeamStatus,
  type PlayerPhaseStatus,
} from "@/components/clue-ai/team-status"
import { VerdictForm } from "@/components/clue-ai/verdict-form"
import {
  DOCUMENTS,
  FLORA_IN_PROGRESS,
  FLORA_SENTENCES,
  FLORA_YOURS,
  PARTNER,
  SENTENCE_SOURCES,
  SHERLOCK_AVATAR,
  YOU,
  citedBy,
} from "./_case-fixtures"
import { CasePage } from "./_page-shell"

const BOARD = {
  flora: "in-progress",
  eddie: "locked",
  ferris: "locked",
  cecilia: "locked",
} as const

/** The two-column workspace: summary (+ verdict) left, the open source right. */
function InvestigationWorkspace({
  timer,
  you,
  partner,
  defaultValue = FLORA_IN_PROGRESS,
  defaultSentence = "fl_2",
  isLocked = false,
  submitted = false,
}: {
  timer: { status: PhaseTimerStatus; remaining: number }
  you: PlayerPhaseStatus
  partner: PlayerPhaseStatus
  defaultValue?: SummaryClassifications
  defaultSentence?: string | null
  isLocked?: boolean
  submitted?: boolean
}) {
  const [value, setValue] = React.useState(defaultValue)
  const [sentence, setSentence] = React.useState<string | null>(defaultSentence)
  const [sourceOpen, setSourceOpen] = React.useState(false)
  const documentId = sentence ? SENTENCE_SOURCES[sentence] : null
  const source = documentId ? DOCUMENTS[documentId] : null
  const total = FLORA_SENTENCES.length
  const classified = FLORA_SENTENCES.filter((s) => value[s.id]).length
  const remaining = total - classified

  return (
    <CasePage
      breadcrumb={[
        { label: "Suspects", href: "#" },
        { label: "Flora Jasmine" },
      ]}
      activeSuspect="flora"
      board={BOARD}
      toolbar={
        <>
          <PhaseTimer
            label="Solo analysis"
            status={timer.status}
            remainingSeconds={timer.remaining}
            totalSeconds={480}
          />
          <TeamStatus
            members={[
              { player: YOU, status: you },
              { player: PARTNER, status: partner },
            ]}
          />
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto max-md:hidden"
            disabled
            title="You can switch suspects after your verdict"
          >
            <ArrowLeftRightIcon data-icon="inline-start" />
            Switch suspect
          </Button>
        </>
      }
    >
      <div className="grid min-h-0 flex-1 gap-(--shell-gap) p-(--shell-gap) lg:grid-cols-5">
        <div className="-m-1 flex min-h-0 flex-col gap-(--shell-gap) p-1 *:shrink-0 lg:col-span-3 lg:overflow-y-auto">
          {submitted ? (
            <Card>
              <CardContent className="p-0">
                <Empty className="p-4 md:p-8">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <HourglassIcon />
                    </EmptyMedia>
                    <EmptyTitle>Waiting for Mia</EmptyTitle>
                    <EmptyDescription>
                      Your verdict on Flora is in. Once Mia submits hers, you'll
                      compare classifications and agree on a team answer.
                    </EmptyDescription>
                  </EmptyHeader>
                  <div className="flex w-full max-w-xs flex-col gap-2">
                    <Progress
                      value={50}
                      aria-label="Players submitted"
                      className="*:bg-foreground"
                    />
                    <span className="text-caption text-muted-foreground">
                      1 of 2 players submitted
                    </span>
                  </div>
                </Empty>
              </CardContent>
            </Card>
          ) : (
            <SherlockNote
              title="Sherlock's briefing"
              avatarUrl={SHERLOCK_AVATAR}
            >
              This is the AI summary Scotland Yard used to accuse Flora. Open
              the source behind every sentence before you mark it — I want to
              know exactly which parts hold up.
            </SherlockNote>
          )}
          <AiSummaryCard
            suspectName="Flora"
            sentences={FLORA_SENTENCES}
            value={value}
            onValueChange={setValue}
            activeSentenceId={sentence ?? undefined}
            onCheckSource={(id) => {
              setSentence(id === sentence ? null : id)
              setSourceOpen(id !== sentence)
            }}
            disabled={isLocked || submitted}
            notice={
              isLocked && !submitted ? (
                <Alert>
                  <LockIcon />
                  <AlertTitle>Solo analysis is over</AlertTitle>
                  <AlertDescription>
                    Your classifications are locked. Submit your verdict so you
                    and Mia can compare.
                  </AlertDescription>
                </Alert>
              ) : undefined
            }
          />
          {!submitted && (
            <VerdictForm
              suspectName="Flora"
              disabled={!isLocked && remaining > 0}
              disabledReason={
                remaining > 0
                  ? `Classify the ${remaining} remaining sentence${remaining === 1 ? "" : "s"} first.`
                  : undefined
              }
              onSubmit={() => {}}
            />
          )}
        </div>
        <CasePanels
          className="lg:col-span-2 lg:h-full"
          open={sourceOpen}
          onOpenChange={setSourceOpen}
          panels={[
            {
              value: "source",
              label: "Source",
              icon: FileTextIcon,
              content: (
                <EvidencePanel
                  className="h-full"
                  document={source?.document}
                  citedBy={documentId ? citedBy(documentId) : undefined}
                  onClose={() => {
                    setSentence(null)
                    setSourceOpen(false)
                  }}
                >
                  {source?.body(sentence ?? undefined)}
                </EvidencePanel>
              ),
            },
          ]}
        />
      </div>
    </CasePage>
  )
}

const meta: Meta<typeof InvestigationWorkspace> = {
  title: "ClueAI/Pages/Investigation",
  component: InvestigationWorkspace,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof InvestigationWorkspace>

/** Mid-way through Flora's summary with the voicemail open. Click around. */
export const Classifying: Story = {
  args: {
    timer: { status: "running", remaining: 312 },
    you: "working",
    partner: "working",
  },
}

export const NoSourceOpen: Story = {
  args: {
    timer: { status: "running", remaining: 455 },
    you: "working",
    partner: "working",
    defaultValue: {},
    defaultSentence: null,
  },
}

export const LastMinute: Story = {
  args: {
    timer: { status: "running", remaining: 38 },
    you: "working",
    partner: "submitted",
  },
}

export const TimeUp: Story = {
  args: {
    timer: { status: "expired", remaining: 0 },
    you: "working",
    partner: "submitted",
    isLocked: true,
  },
}

export const WaitingForPartner: Story = {
  args: {
    timer: { status: "running", remaining: 140 },
    you: "submitted",
    partner: "working",
    defaultValue: FLORA_YOURS,
    defaultSentence: null,
    submitted: true,
  },
}
