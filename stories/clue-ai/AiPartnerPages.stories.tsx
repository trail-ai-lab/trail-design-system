import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, MessageCircleIcon, RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CaseOutcome } from "@/components/clue-ai/case-outcome"
import { CasePanels } from "@/components/clue-ai/case-panels"
import { EvidencePanel } from "@/components/clue-ai/evidence-panel"
import type {
  AiPartnerBehavior,
  Classification,
} from "@/components/clue-ai/lib/case"
import {
  PartnerChatPanel,
  type ChatTopic,
  type PartnerChatMessage,
} from "@/components/clue-ai/partner-chat-panel"
import { PartnerDebriefCard } from "@/components/clue-ai/partner-debrief-card"
import { PhaseTimer } from "@/components/clue-ai/phase-timer"
import { PlayModeForm } from "@/components/clue-ai/play-mode-form"
import { ReconcileCard } from "@/components/clue-ai/reconcile-card"
import { SherlockNote } from "@/components/clue-ai/sherlock-note"
import { TeamStatus } from "@/components/clue-ai/team-status"
import { VerdictForm } from "@/components/clue-ai/verdict-form"
import {
  AI_TEAMMATES,
  QUINN,
  SCENARIOS,
  aiPicks,
  aiRationales,
  aiTopics,
  sentenceTopic,
} from "./_ai-partner-fixtures"
import {
  DOCUMENTS,
  FLORA_SENTENCES,
  FLORA_YOURS,
  MOTIVES,
  OUTCOME_SUSPECTS,
  OUTCOME_TIMELINE,
  SENTENCE_SOURCES,
  SHERLOCK_AVATAR,
  YOU,
  citedBy,
  SOLVED_FRONT_PAGE,
} from "./_case-fixtures"
import { CasePage } from "./_page-shell"

const BOARD = {
  flora: "in-progress",
  eddie: "locked",
  ferris: "locked",
  cecilia: "locked",
} as const

const QUICK_REPLIES = ["Show me where it says that", "Why do you think so?"]

/**
 * Deliberation with an AI teammate. The comparison list stays on the left;
 * the right panel switches between the chat and the open source file.
 * "Discuss" on a sentence sets the chat topic; a cited file opens Source.
 */
function AiDeliberationWorkspace({
  behavior,
  remaining,
  isExpired = false,
  typing: typingProp = false,
}: {
  behavior: AiPartnerBehavior
  remaining: number
  isExpired?: boolean
  typing?: boolean
}) {
  const scenario = SCENARIOS[behavior]
  const partner = scenario.partner
  const name = partner.name
  const picks = React.useMemo(() => aiPicks(scenario), [scenario])
  const [tab, setTab] = React.useState<"chat" | "source">("chat")
  const [panelOpen, setPanelOpen] = React.useState(false)
  const [source, setSource] = React.useState<{
    documentId: string
    sentenceId?: string
  } | null>(null)
  const [topic, setTopic] = React.useState<ChatTopic | null>(null)
  const [messages, setMessages] = React.useState<PartnerChatMessage[]>(
    scenario.messages
  )
  const [typing, setTyping] = React.useState(typingProp)
  const [team, setTeam] = React.useState<Record<string, Classification | null>>(
    () =>
      Object.fromEntries(
        FLORA_SENTENCES.map((s) => {
          const yours = FLORA_YOURS[s.id]
          const agreed = yours === scenario.picks[s.id] ? yours : null
          return [s.id, scenario.settled[s.id] ?? agreed]
        })
      )
  )

  const openSource = (documentId: string, sentenceId?: string) => {
    setSource({ documentId, sentenceId })
    setTab("source")
    setPanelOpen(true)
  }
  const doc = source ? DOCUMENTS[source.documentId] : null
  const discussing = topic?.kind === "sentence" ? topic.sentenceId : undefined
  const pending = messages.filter(
    (m) => m.type === "proposal" && m.status === "pending"
  ).length

  return (
    <CasePage
      breadcrumb={[
        { label: "Suspects", href: "#" },
        { label: "Flora Jasmine", href: "#" },
        { label: `Compare with ${name}` },
      ]}
      activeSuspect="flora"
      board={BOARD}
      team={scenario.team}
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
              { player: YOU, status: isExpired ? "submitted" : "working" },
              { player: partner, status: isExpired ? "submitted" : "working" },
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
            players={scenario.team}
            picks={picks}
            value={team}
            onValueChange={setTeam}
            rationales={aiRationales(scenario)}
            onOpenDocument={(id) => openSource(id)}
            activeSentenceId={tab === "source" ? source?.sentenceId : undefined}
            onCheckSource={(id) => openSource(SENTENCE_SOURCES[id], id)}
            discussingSentenceId={tab === "chat" ? discussing : undefined}
            onDiscuss={(id) => {
              setTopic(sentenceTopic(id))
              setTab("chat")
              setPanelOpen(true)
            }}
            disabled={isExpired}
          />
          <VerdictForm
            suspectName="Flora"
            motives={MOTIVES}
            picks={[
              { player: YOU, verdict: "inconclusive" },
              behavior === "defensive"
                ? {
                    player: partner,
                    verdict: "guilty",
                    motive: "thrown-out-of-will",
                  }
                : { player: partner, verdict: "inconclusive" },
            ]}
            description={`“${scenario.verdictRationale}” — ${name}. ${name} can suggest a verdict, but only you can submit it.`}
            disabled={isExpired}
            onSubmit={() => {}}
          />
        </div>
        <CasePanels
          className="lg:col-span-2 lg:h-full"
          value={tab}
          onValueChange={(next) => setTab(next as "chat" | "source")}
          open={panelOpen}
          onOpenChange={setPanelOpen}
          panels={[
            {
              value: "chat",
              label: isExpired
                ? `Chat with ${name} · closed`
                : `Chat with ${name}`,
              icon: MessageCircleIcon,
              badge: pending,
              badgeLabel: "suggestions waiting",
              content: (
                <PartnerChatPanel
                  className="h-full"
                  partner={partner}
                  players={scenario.team}
                  status={isExpired ? "closed" : "open"}
                  messages={messages}
                  typing={typing}
                  topics={aiTopics(scenario)}
                  topic={topic}
                  onTopicChange={setTopic}
                  suggestions={QUICK_REPLIES}
                  activeDocumentId={
                    tab === "source" ? source?.documentId : undefined
                  }
                  onOpenDocument={(id) => openSource(id)}
                  onRespond={(id, response) => {
                    const message = messages.find((m) => m.id === id)
                    if (message?.type !== "proposal") return
                    const target =
                      message.topic?.kind === "sentence"
                        ? message.topic
                        : undefined
                    if (
                      response === "accepted" &&
                      target &&
                      message.proposal.kind === "classification"
                    ) {
                      setTeam({
                        ...team,
                        [target.sentenceId]: message.proposal.classification,
                      })
                    }
                    setMessages([
                      ...messages.map((m) =>
                        m.id === id ? { ...message, status: response } : m
                      ),
                      {
                        id: `${id}-event`,
                        type: "event",
                        icon: response,
                        text:
                          response === "accepted"
                            ? `You accepted ${name}'s suggestion${target ? ` for sentence ${target.index}` : ""}`
                            : `You kept your answer${target ? ` for sentence ${target.index}` : ""}`,
                      },
                    ])
                  }}
                  onSend={(text, sentTopic) => {
                    const id = `sent-${messages.length}`
                    setMessages((prev) => [
                      ...prev,
                      {
                        id,
                        type: "message",
                        from: YOU.id,
                        text,
                        topic: sentTopic ?? undefined,
                      },
                    ])
                    setTyping(true)
                    window.setTimeout(() => {
                      setTyping(false)
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: `${id}-reply`,
                          type: "message",
                          from: partner.id,
                          text: scenario.reply,
                          topic: sentTopic ?? undefined,
                        },
                      ])
                    }, 1600)
                  }}
                />
              ),
            },
            {
              value: "source",
              label: "Source",
              icon: FileTextIcon,
              content: (
                <EvidencePanel
                  className="h-full"
                  document={doc?.document}
                  citedBy={source ? citedBy(source.documentId) : undefined}
                  onClose={() => {
                    setSource(null)
                    setTab("chat")
                  }}
                >
                  {doc?.body(source?.sentenceId)}
                </EvidencePanel>
              ),
            },
          ]}
        />
      </div>
    </CasePage>
  )
}

const meta: Meta<typeof AiDeliberationWorkspace> = {
  title: "ClueAI/Pages/AIPartner",
  component: AiDeliberationWorkspace,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AiDeliberationWorkspace>

export const ChoosePlayMode: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Case briefing" }]}
      activeNav="briefing"
      board={{
        flora: "required",
        eddie: "locked",
        ferris: "locked",
        cecilia: "locked",
      }}
      team={[YOU]}
    >
      <div className="flex flex-1 items-center-safe justify-center overflow-y-auto p-(--shell-gap)">
        <PlayModeForm
          className="w-full max-w-lg"
          aiTeammates={AI_TEAMMATES}
          defaultValue={{ mode: "ai" }}
          onSubmit={() => {}}
        />
      </div>
    </CasePage>
  ),
}

/** Quinn marked every sentence accurate, so each one you flagged is a disagreement. */
export const DefensiveTeammate: Story = {
  args: { behavior: "defensive", remaining: 362 },
}

/** Riley disagrees only where it has grounds, and concedes on sentence 6. */
export const ReasonableTeammate: Story = {
  args: { behavior: "reasonable", remaining: 288 },
}

export const TeammateTyping: Story = {
  args: { behavior: "reasonable", remaining: 251, typing: true },
}

export const TimeUp: Story = {
  args: { behavior: "defensive", remaining: 0, isExpired: true },
}

/** The case is over; the debrief reveals how Quinn was set up to argue. */
export const CaseClosedDebrief: Story = {
  render: () => (
    <CasePage
      breadcrumb={[{ label: "Case closed" }]}
      board={{
        flora: "completed",
        eddie: "completed",
        ferris: "available",
        cecilia: "completed",
      }}
      team={[YOU, QUINN]}
    >
      <div className="flex flex-1 flex-col items-center gap-(--shell-gap) overflow-y-auto p-(--shell-gap) *:shrink-0 md:py-10">
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
            Your teammate argued hard for the machine's account, Watson, and you
            held your ground where the files didn't back it. That is the whole
            of the craft.
          </SherlockNote>
        </CaseOutcome>
        <PartnerDebriefCard
          className="w-full max-w-3xl"
          partner={QUINN}
          behavior="defensive"
          stats={{
            proposals: 9,
            accepted: 2,
            changedMind: 0,
            teamCorrect: 10,
            totalSentences: 12,
          }}
        />
      </div>
    </CasePage>
  ),
}
