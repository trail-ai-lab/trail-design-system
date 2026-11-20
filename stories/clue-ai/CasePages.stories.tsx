import type { Meta, StoryObj } from "@storybook/react-vite"
import { GavelIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AttemptsMeter } from "@/components/clue-ai/attempts-meter"
import { BreakingNewsCard } from "@/components/clue-ai/breaking-news-card"
import { CaseOutcome } from "@/components/clue-ai/case-outcome"
import { FinalCallForm } from "@/components/clue-ai/final-call-form"
import { SessionLobbyCard } from "@/components/clue-ai/session-lobby-card"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import {
  SuspectCard,
  type SuspectStatus,
} from "@/components/clue-ai/suspect-card"
import type { Verdict } from "@/components/clue-ai/lib/case"
import {
  CORONER_REPORT,
  HARPE_STORY,
  MOTIVES,
  OUTCOME_SUSPECTS,
  OUTCOME_TIMELINE,
  SESSION_CODE,
  SHERLOCK_AVATAR,
  SUSPECTS,
  YOU,
  COLD_FRONT_PAGE,
  SOLVED_FRONT_PAGE,
} from "./_case-fixtures"
import { CasePage } from "./_page-shell"
import flora from "./assets/flora.jpg"

const meta: Meta = {
  title: "ClueAI/Pages/Case",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

const START_BOARD: Record<string, SuspectStatus> = {
  flora: "required",
  eddie: "locked",
  ferris: "locked",
  cecilia: "locked",
}

export const Briefing: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Case briefing" }]}
      activeNav="briefing"
      board={START_BOARD}
      team={[YOU]}
    >
      <div className="flex flex-1 justify-center overflow-y-auto p-(--shell-gap) md:py-10">
        <BreakingNewsCard
          className="h-fit w-full max-w-3xl"
          masthead="The London Ledger"
          dateline="Harpe Estate, Surrey · Saturday"
          headline="Flora Jasmine arrested for the murder of billionaire step-father Sir Eric Harpe"
          imageUrl={flora}
          imageAlt="Flora Jasmine"
          imageCaption="Flora Jasmine, PhD candidate at Cambridge."
          body={HARPE_STORY}
          facts={CORONER_REPORT}
        >
          <SherlockNote
            avatarUrl={SHERLOCK_AVATAR}
            actions={<Button>Take the case</Button>}
          >
            Watson! Did you see the news? The Yard let a machine pick their
            suspect. I don't think Flora did it — can you prove them wrong?
          </SherlockNote>
        </BreakingNewsCard>
      </div>
    </CasePage>
  ),
}

export const Lobby: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Investigate with a partner" }]}
      board={START_BOARD}
      team={[YOU]}
    >
      <div className="flex flex-1 items-center-safe justify-center overflow-y-auto p-(--shell-gap)">
        <SessionLobbyCard
          className="w-full max-w-lg"
          code={SESSION_CODE}
          hostId={YOU.id}
          players={[YOU]}
          onCopyCode={() => {}}
          onJoin={() => {}}
        />
      </div>
    </CasePage>
  ),
}

function SuspectBoard({
  board,
  verdicts = {},
  scores = {},
  used,
  narration,
}: {
  board: Record<string, SuspectStatus>
  verdicts?: Record<string, { verdict: Verdict; motive?: string }>
  scores?: Record<string, number>
  used: number
  narration: string
}) {
  const counts: Record<string, number> = {
    flora: 12,
    eddie: 7,
    ferris: 8,
    cecilia: 10,
  }
  const isFinalCallOpen = board.flora === "completed"
  return (
    <CasePage
      breadcrumb={[{ label: "Suspects" }]}
      activeNav="suspects"
      board={board}
    >
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-(--shell-gap) md:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <h1 className="text-h2 md:text-h1">Choose your next lead</h1>
            <SherlockNote avatarUrl={SHERLOCK_AVATAR}>{narration}</SherlockNote>
          </div>
          <Card size="sm" className="w-full shrink-0 lg:w-80">
            <CardContent className="flex flex-col gap-4">
              <AttemptsMeter used={used} max={3} />
              <Button
                variant={used >= 3 ? "default" : "outline"}
                disabled={!isFinalCallOpen}
              >
                <GavelIcon data-icon="inline-start" />
                Make the final call
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-(--shell-gap) sm:grid-cols-2 xl:grid-cols-4">
          {SUSPECTS.map((suspect) => (
            <SuspectCard
              key={suspect.id}
              suspect={suspect}
              status={board[suspect.id]}
              sentenceCount={counts[suspect.id]}
              score={scores[suspect.id]}
              verdict={verdicts[suspect.id]}
              lockedReason="Finish Flora first"
              onSelect={() => {}}
            />
          ))}
        </div>
      </div>
    </CasePage>
  )
}

export const SuspectsFirstLead: Story = {
  name: "Suspects — first lead",
  render: () => (
    <SuspectBoard
      board={START_BOARD}
      used={0}
      narration="Scotland Yard's AI pointed straight at Flora. Before we chase anyone else, let's see whether its case against her holds up."
    />
  ),
}

export const SuspectsMidCase: Story = {
  name: "Suspects — mid-case",
  render: () => (
    <SuspectBoard
      board={{
        flora: "completed",
        eddie: "completed",
        ferris: "available",
        cecilia: "available",
      }}
      verdicts={{
        flora: { verdict: "inconclusive" },
        eddie: { verdict: "inconclusive" },
      }}
      scores={{ flora: 9, eddie: 6 }}
      used={2}
      narration="Two leads down, and the real murderer is still out there. One team verdict left before the final call — choose wisely, Watson."
    />
  ),
}

export const SuspectsNoVerdictsLeft: Story = {
  name: "Suspects — no verdicts left",
  render: () => (
    <SuspectBoard
      board={{
        flora: "completed",
        eddie: "completed",
        ferris: "available",
        cecilia: "completed",
      }}
      verdicts={{
        flora: { verdict: "inconclusive" },
        eddie: { verdict: "inconclusive" },
        cecilia: { verdict: "guilty", motive: "Inheriting from Sir Eric" },
      }}
      scores={{ flora: 9, eddie: 6, cecilia: 8 }}
      used={3}
      narration="We've spent every team verdict. Only the final call remains — when you're ready, name the murderer."
    />
  ),
}

export const FinalCall: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Final call" }]}
      activeNav="final-call"
      board={{
        flora: "completed",
        eddie: "completed",
        ferris: "available",
        cecilia: "completed",
      }}
    >
      <div className="flex flex-1 items-center-safe justify-center overflow-y-auto p-(--shell-gap)">
        <FinalCallForm
          className="w-full max-w-2xl"
          suspects={SUSPECTS}
          motives={MOTIVES}
          defaultValue={{ suspectId: "cecilia" }}
          onSubmit={() => {}}
          onBack={() => {}}
        />
      </div>
    </CasePage>
  ),
}

export const CaseClosed: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Case closed" }]}
      board={{
        flora: "completed",
        eddie: "completed",
        ferris: "available",
        cecilia: "completed",
      }}
    >
      <div className="flex flex-1 justify-center overflow-y-auto p-(--shell-gap) md:py-10">
        <CaseOutcome
          className="h-fit w-full max-w-3xl"
          result="solved"
          {...SOLVED_FRONT_PAGE}
          suspects={OUTCOME_SUSPECTS}
          timeline={OUTCOME_TIMELINE}
          actions={
            <Button>
              <RotateCcwIcon data-icon="inline-start" />
              Start a new case
            </Button>
          }
        >
          <SherlockNote
            avatarUrl={SHERLOCK_AVATAR}
            variant="success"
            title="Sherlock's final words"
          >
            You've done admirably, Watson. The AI saved us time, but it was your
            checking — source by source — that cracked the case. Remember:
            verify what a model tells you against more than one source.
          </SherlockNote>
        </CaseOutcome>
      </div>
    </CasePage>
  ),
}

export const CaseWentCold: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Case closed" }]}
      board={{
        flora: "completed",
        eddie: "completed",
        ferris: "available",
        cecilia: "available",
      }}
    >
      <div className="flex flex-1 justify-center overflow-y-auto p-(--shell-gap) md:py-10">
        <CaseOutcome
          className="h-fit w-full max-w-3xl"
          result="unsolved"
          {...COLD_FRONT_PAGE}
          suspects={OUTCOME_SUSPECTS.map((s) =>
            s.suspect.id === "cecilia"
              ? { ...s, verdict: undefined, score: undefined }
              : s
          )}
          actions={
            <Button>
              <RotateCcwIcon data-icon="inline-start" />
              Try the case again
            </Button>
          }
        >
          <SherlockNote
            avatarUrl={SHERLOCK_AVATAR}
            variant="destructive"
            title="Sherlock's final words"
          >
            Tough break, Watson. Look back at the summary sentences you trusted
            without checking — that's where the case slipped away.
          </SherlockNote>
        </CaseOutcome>
      </div>
    </CasePage>
  ),
}
