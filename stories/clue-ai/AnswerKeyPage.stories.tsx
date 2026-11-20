import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRightIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AiSummaryCard } from "@/components/clue-ai/ai-summary-card"
import { CasePanels } from "@/components/clue-ai/case-panels"
import { EvidencePanel } from "@/components/clue-ai/evidence-panel"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import { StatusBadge } from "@/components/patterns/status-badge"
import {
  DOCUMENTS,
  FLORA_ANSWERS,
  FLORA_SENTENCES,
  FLORA_YOURS,
  SENTENCE_SOURCES,
  SHERLOCK_AVATAR,
  citedBy,
} from "./_case-fixtures"
import { CasePage } from "./_page-shell"

function AnswerKey({ variant }: { variant: "success" | "destructive" }) {
  const [sentence, setSentence] = React.useState<string | null>("fl_11")
  const [sourceOpen, setSourceOpen] = React.useState(false)
  const documentId = sentence ? SENTENCE_SOURCES[sentence] : null
  const source = documentId ? DOCUMENTS[documentId] : null

  return (
    <CasePage
      breadcrumb={[
        { label: "Suspects", href: "#" },
        { label: "Flora Jasmine", href: "#" },
        { label: "Answer key" },
      ]}
      activeSuspect="flora"
      board={{
        flora: "completed",
        eddie: "available",
        ferris: "available",
        cecilia: "available",
      }}
      toolbar={
        <>
          <span className="text-body-sm text-muted-foreground">
            Team verdict
          </span>
          <StatusBadge tone={variant === "success" ? "neutral" : "destructive"}>
            {variant === "success" ? "Inconclusive" : "Guilty"}
          </StatusBadge>
        </>
      }
    >
      <div className="grid min-h-0 flex-1 gap-(--shell-gap) p-(--shell-gap) lg:grid-cols-5">
        <div className="-m-1 flex min-h-0 flex-col gap-(--shell-gap) p-1 *:shrink-0 lg:col-span-3 lg:overflow-y-auto">
          <SherlockNote
            avatarUrl={SHERLOCK_AVATAR}
            variant={variant}
            title="Sherlock's verdict"
            actions={
              <Button>
                Choose the next lead
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            }
          >
            {variant === "success"
              ? "I told you so! The case against Flora doesn't hold up. A few highlights slipped, though — the corrected sheet is below. Now, let's find the real killer."
              : "My dear Watson — you took misrepresentations for facts and missed how much of this is ambiguous. Study the corrected sheet below, then help me find the real killer."}
          </SherlockNote>
          <AiSummaryCard
            suspectName="Flora"
            sentences={FLORA_SENTENCES}
            value={FLORA_YOURS}
            answers={FLORA_ANSWERS}
            activeSentenceId={sentence ?? undefined}
            onCheckSource={(id) => {
              setSentence(id === sentence ? null : id)
              setSourceOpen(id !== sentence)
            }}
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

const meta: Meta<typeof AnswerKey> = {
  title: "ClueAI/Pages/AnswerKey",
  component: AnswerKey,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AnswerKey>

export const RightCall: Story = { args: { variant: "success" } }
export const WrongCall: Story = { args: { variant: "destructive" } }
