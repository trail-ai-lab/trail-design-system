import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon } from "lucide-react"

import { CasePanels } from "@/components/clue-ai/case-panels"
import { EvidencePanel } from "@/components/clue-ai/evidence-panel"
import { PhaseTimer } from "@/components/clue-ai/phase-timer"
import { ReconcileCard } from "@/components/clue-ai/reconcile-card"
import { TeamStatus } from "@/components/clue-ai/team-status"
import { VerdictForm } from "@/components/clue-ai/verdict-form"
import {
  DOCUMENTS,
  FLORA_PICKS,
  FLORA_SENTENCES,
  PARTNER,
  PLAYERS,
  SENTENCE_SOURCES,
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

function ReconcileWorkspace({
  remaining,
  isExpired = false,
}: {
  remaining: number
  isExpired?: boolean
}) {
  const [sentence, setSentence] = React.useState<string | null>("fl_10")
  const [sourceOpen, setSourceOpen] = React.useState(false)
  const documentId = sentence ? SENTENCE_SOURCES[sentence] : null
  const source = documentId ? DOCUMENTS[documentId] : null

  return (
    <CasePage
      breadcrumb={[
        { label: "Suspects", href: "#" },
        { label: "Flora Jasmine", href: "#" },
        { label: "Compare" },
      ]}
      activeSuspect="flora"
      board={BOARD}
      toolbar={
        <>
          <PhaseTimer
            label="Deliberation"
            status={isExpired ? "expired" : "running"}
            remainingSeconds={remaining}
            totalSeconds={480}
          />
          <TeamStatus
            members={[
              { player: YOU, status: "working" },
              { player: PARTNER, status: "working" },
            ]}
          />
        </>
      }
    >
      <div className="grid min-h-0 flex-1 gap-(--shell-gap) p-(--shell-gap) lg:grid-cols-5">
        <div className="-m-1 flex min-h-0 flex-col gap-(--shell-gap) p-1 *:shrink-0 lg:col-span-3 lg:overflow-y-auto">
          <ReconcileCard
            suspectName="Flora"
            sentences={FLORA_SENTENCES}
            players={PLAYERS}
            picks={FLORA_PICKS}
            activeSentenceId={sentence ?? undefined}
            onCheckSource={(id) => {
              setSentence(id === sentence ? null : id)
              setSourceOpen(id !== sentence)
            }}
            disabled={isExpired}
          />
          <VerdictForm
            suspectName="Flora"
            picks={[
              { player: YOU, verdict: "inconclusive" },
              { player: PARTNER, verdict: "inconclusive" },
            ]}
            defaultValue={{ verdict: "inconclusive" }}
            disabled={isExpired}
            onSubmit={() => {}}
          />
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

const meta: Meta<typeof ReconcileWorkspace> = {
  title: "ClueAI/Pages/Reconcile",
  component: ReconcileWorkspace,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ReconcileWorkspace>

export const Deliberating: Story = { args: { remaining: 401 } }
export const TimeUp: Story = { args: { remaining: 0, isExpired: true } }
