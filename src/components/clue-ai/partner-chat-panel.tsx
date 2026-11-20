"use client"

import * as React from "react"
import {
  CheckIcon,
  MessageCircleIcon,
  RefreshCwIcon,
  Undo2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChatComposer,
  ChatLog,
  ChatRow,
  ChatTypingRow,
} from "@/components/patterns/chat"
import { StatusBadge } from "@/components/patterns/status-badge"
import { CitedDocuments } from "./cited-documents"
import { ClassificationBadge } from "./classification-badge"
import {
  VERDICTS,
  type CitedDocument,
  type Classification,
  type Player,
  type Verdict,
} from "./lib/case"
import {
  defaultClueAiLabels,
  useClueAiLabels,
  usePlayerLabel,
  type ClueAiLabels,
} from "./lib/labels"
import { AiTag, PlayerAvatar } from "./player-avatar"

/** What a message is about: one sentence, the verdict, or the motive. */
export type ChatTopic =
  | { kind: "sentence"; sentenceId: string; index: number }
  | { kind: "verdict" }
  | { kind: "motive" }

/**
 * A topic's name, e.g. "Sentence 3". Pass `labels` (from
 * `useClueAiLabels().chat.topic`) for localized text; English by default.
 */
export function chatTopicLabel(
  topic: ChatTopic,
  labels: ClueAiLabels["chat"]["topic"] = defaultClueAiLabels.chat.topic
) {
  if (topic.kind === "sentence") return labels.sentence({ index: topic.index })
  return topic.kind === "verdict" ? labels.verdict : labels.motive
}

function topicKey(topic?: ChatTopic | null) {
  if (!topic) return "general"
  return topic.kind === "sentence" ? `sentence:${topic.sentenceId}` : topic.kind
}

/** A team answer the AI suggests; only the person can accept it. */
export type PartnerProposal =
  | { kind: "classification"; classification: Classification }
  | { kind: "verdict"; verdict: Verdict; motiveLabel?: string }

export type ProposalStatus = "pending" | "accepted" | "declined"

export type PartnerChatMessage =
  | {
      id: string
      type: "message"
      /** Player id of the sender */
      from: string
      text: string
      topic?: ChatTopic
      documents?: CitedDocument[]
    }
  | {
      id: string
      type: "proposal"
      from: string
      /** The case for it, shown above the proposal */
      text?: string
      topic?: ChatTopic
      documents?: CitedDocument[]
      proposal: PartnerProposal
      status: ProposalStatus
    }
  | {
      id: string
      /** Something that happened, e.g. the AI changed one of its answers */
      type: "event"
      text: string
      icon?: "changed" | "accepted" | "declined"
    }

export type PartnerChatStatus = "waiting" | "open" | "closed"

const EVENT_ICON = {
  changed: RefreshCwIcon,
  accepted: CheckIcon,
  declined: Undo2Icon,
}

/**
 * Deliberation chat with an AI teammate. Built on the shared Chat pattern, so
 * it reads like SLAI's Q&A, with what a debate needs on top:
 *
 * - every message can be tagged with what it's about (a sentence, the verdict,
 *   the motive), and the composer picks that topic;
 * - the AI cites case files, which open in the source panel;
 * - the AI can propose a team answer — Accept or Keep mine — but never submit
 *   one; the person always has the final say;
 * - events note when the AI changes its mind.
 *
 * The panel looks the same whatever behavior the AI is playing, so players
 * can't tell the study condition from the interface.
 */
function PartnerChatPanel({
  partner,
  players,
  messages,
  status = "open",
  typing = false,
  topics = [],
  topic: topicProp,
  defaultTopic = null,
  onTopicChange,
  suggestions = [],
  onSend,
  onRespond,
  onOpenDocument,
  activeDocumentId,
  className,
}: {
  /** The AI teammate */
  partner: Player
  /** Everyone in the chat, to name senders */
  players: Player[]
  messages: PartnerChatMessage[]
  /** Waiting until both submit their solo answers; closed when time is up */
  status?: PartnerChatStatus
  /** The AI is writing a reply */
  typing?: boolean
  /** What the composer can tag a message with */
  topics?: ChatTopic[]
  topic?: ChatTopic | null
  defaultTopic?: ChatTopic | null
  onTopicChange?: (topic: ChatTopic | null) => void
  /** Quick replies above the composer */
  suggestions?: string[]
  onSend?: (text: string, topic: ChatTopic | null) => void
  /** Accept or keep your own answer on a proposal */
  onRespond?: (messageId: string, response: "accepted" | "declined") => void
  onOpenDocument?: (documentId: string) => void
  activeDocumentId?: string
  className?: string
}) {
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  const t = labels.chat
  const uid = React.useId()
  const [topic, setTopic] = useControllableState<ChatTopic | null>({
    value: topicProp,
    defaultValue: defaultTopic,
    onChange: onTopicChange,
  })
  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length, typing])

  const name = playerLabel(partner)
  const isOpen = status === "open"
  const byId = (id: string) => players.find((p) => p.id === id)
  const send = (text: string) => onSend?.(text, topic)

  return (
    <Card
      data-slot="partner-chat-panel"
      data-status={status}
      className={cn("min-h-0", className)}
    >
      <CardContent
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={t.region({ name })}
        className="min-h-0 flex-1 overflow-y-auto mask-t-from-90% pt-(--card-spacing)"
      >
        {status === "waiting" && messages.length === 0 ? (
          <Empty className="h-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircleIcon />
              </EmptyMedia>
              <EmptyTitle>{t.waitingTitle}</EmptyTitle>
              <EmptyDescription>
                {t.waitingDescription({ name })}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ChatLog
            loading={typing}
            aria-label={t.conversation}
            className="py-1"
          >
            {messages.map((message) => {
              if (message.type === "event") {
                const Icon = message.icon ? EVENT_ICON[message.icon] : null
                return (
                  <div
                    key={message.id}
                    data-slot="partner-chat-event"
                    className="flex items-center gap-3 text-caption text-muted-foreground"
                  >
                    <span aria-hidden className="h-px flex-1 bg-border" />
                    <span className="flex items-center gap-1.5 text-center">
                      {Icon && <Icon aria-hidden className="size-3.5" />}
                      {message.text}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-border" />
                  </div>
                )
              }
              const sender = byId(message.from)
              const topicBadge = message.topic && (
                <StatusBadge tone="muted">
                  {chatTopicLabel(message.topic, t.topic)}
                </StatusBadge>
              )
              const documents = message.documents?.length ? (
                <CitedDocuments
                  documents={message.documents}
                  onOpen={onOpenDocument}
                  activeDocumentId={activeDocumentId}
                />
              ) : null

              if (sender?.isYou) {
                return (
                  <ChatRow
                    key={message.id}
                    from="self"
                    tone="neutral"
                    header={topicBadge}
                  >
                    {message.text}
                  </ChatRow>
                )
              }

              const header = (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-caption font-medium">
                    {sender ? playerLabel(sender) : labels.common.teammate}
                  </span>
                  {sender?.isAi && <AiTag />}
                  {topicBadge}
                </div>
              )
              const avatar = sender && (
                <PlayerAvatar player={sender} size="sm" />
              )

              if (message.type === "message") {
                return (
                  <ChatRow
                    key={message.id}
                    from="other"
                    avatar={avatar}
                    header={header}
                    footer={documents}
                    bubble
                  >
                    {message.text}
                  </ChatRow>
                )
              }

              return (
                <ChatRow
                  key={message.id}
                  from="other"
                  avatar={avatar}
                  header={header}
                >
                  <div className="flex flex-col gap-2">
                    {message.text && (
                      <p className="self-start rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-pretty wrap-anywhere">
                        {message.text}
                      </p>
                    )}
                    {documents}
                    <ProposalCard
                      id={`${uid}-${message.id}`}
                      proposal={message.proposal}
                      topic={message.topic}
                      status={message.status}
                      disabled={!isOpen}
                      onRespond={
                        onRespond
                          ? (response) => onRespond(message.id, response)
                          : undefined
                      }
                    />
                  </div>
                </ChatRow>
              )
            })}
            {typing && (
              <ChatTypingRow
                avatar={<PlayerAvatar player={partner} size="sm" />}
                label={t.typing({ name })}
              />
            )}
          </ChatLog>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <ChatComposer
          className="w-full"
          disabled={!isOpen}
          placeholder={
            status === "closed"
              ? t.placeholderClosed
              : status === "waiting"
                ? t.placeholderWaiting({ name })
                : t.placeholder({ name })
          }
          sendLabel={t.send({ name })}
          onSend={send}
          leading={
            isOpen && (topics.length > 0 || suggestions.length > 0) ? (
              <div className="flex flex-wrap items-center gap-1.5">
                {topics.length > 0 && (
                  <Select
                    value={topicKey(topic)}
                    onValueChange={(key) =>
                      setTopic(
                        topics.find((item) => topicKey(item) === key) ?? null
                      )
                    }
                  >
                    <SelectTrigger size="sm" aria-label={t.topicLabel}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="general">
                          {t.topic.general}
                        </SelectItem>
                        {topics.map((item) => (
                          <SelectItem
                            key={topicKey(item)}
                            value={topicKey(item)}
                          >
                            {chatTopicLabel(item, t.topic)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="xs"
                    className="font-normal"
                    onClick={() => send(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            ) : undefined
          }
          toolbar={status === "closed" ? t.hintClosed : t.hintOpen({ name })}
        />
      </CardFooter>
    </Card>
  )
}

/** The AI's suggested team answer, with Accept / Keep mine while it's open. */
function ProposalCard({
  id,
  proposal,
  topic,
  status,
  disabled,
  onRespond,
}: {
  id: string
  proposal: PartnerProposal
  topic?: ChatTopic
  status: ProposalStatus
  disabled: boolean
  onRespond?: (response: "accepted" | "declined") => void
}) {
  const labels = useClueAiLabels()
  const t = labels.chat
  return (
    <div
      data-slot="partner-proposal"
      data-status={status}
      className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span id={`${id}-label`} className="text-caption text-muted-foreground">
          {t.suggests({
            kind: proposal.kind,
            topic:
              proposal.kind === "classification" && topic
                ? chatTopicLabel(topic, t.topic)
                : undefined,
          })}
        </span>
        {proposal.kind === "classification" ? (
          <ClassificationBadge classification={proposal.classification} />
        ) : (
          <StatusBadge tone={VERDICTS[proposal.verdict].tone}>
            {labels.verdicts[proposal.verdict].label}
            {proposal.motiveLabel && ` · ${proposal.motiveLabel}`}
          </StatusBadge>
        )}
      </div>
      {status === "pending" ? (
        <div
          role="group"
          aria-labelledby={`${id}-label`}
          className="flex flex-wrap gap-2"
        >
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={() => onRespond?.("accepted")}
          >
            <CheckIcon data-icon="inline-start" />
            {t.accept}
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={() => onRespond?.("declined")}
          >
            {t.keepMine}
          </Button>
        </div>
      ) : (
        <p className="flex items-center gap-1.5 text-caption text-muted-foreground">
          {status === "accepted" ? (
            <CheckIcon aria-hidden className="size-3.5 text-success" />
          ) : (
            <Undo2Icon aria-hidden className="size-3.5" />
          )}
          {status === "accepted" ? t.accepted : t.declined}
        </p>
      )}
    </div>
  )
}

export { PartnerChatPanel }
