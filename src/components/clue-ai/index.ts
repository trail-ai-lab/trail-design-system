// Clue AI: players — alone, in pairs, or with an AI teammate — critique an AI's case summaries sentence by
// sentence, reconcile their calls, and name the murderer.
export {
  AI_PARTNER_BEHAVIORS,
  CLASSIFICATIONS,
  CLASSIFICATION_ORDER,
  VERDICTS,
  playerLabel,
  type AiPartnerBehavior,
  type CitedDocument,
  type Classification,
  type ClassificationMeta,
  type Motive,
  type Player,
  type PlayMode,
  type Rationale,
  type Suspect,
  type SummarySentenceData,
  type Verdict,
} from "./lib/case"
export { AiSummaryCard, type SummaryClassifications } from "./ai-summary-card"
export { AttemptsMeter } from "./attempts-meter"
export { BreakingNewsCard } from "./breaking-news-card"
export {
  CaseOutcome,
  type CaseOutcomeAside,
  type CaseOutcomeEvent,
  type CaseOutcomeResult,
  type CaseOutcomeSuspect,
} from "./case-outcome"
export {
  CaseSidebar,
  type CaseNavId,
  type CaseSidebarSuspect,
} from "./case-sidebar"
export { CasePanels, type CasePanel } from "./case-panels"
export { CitedDocuments } from "./cited-documents"
export { ClassificationBadge } from "./classification-badge"
export { ClassificationPicker } from "./classification-picker"
export {
  EvidenceFigure,
  EvidencePanel,
  EvidenceSection,
  EvidenceTranscript,
  type EvidenceDocument,
  type EvidenceKind,
  type EvidenceTranscriptLine,
} from "./evidence-panel"
export { FinalCallForm, type FinalCallValue } from "./final-call-form"
export {
  PartnerChatPanel,
  chatTopicLabel,
  type ChatTopic,
  type PartnerChatMessage,
  type PartnerChatStatus,
  type PartnerProposal,
  type ProposalStatus,
} from "./partner-chat-panel"
export {
  PartnerDebriefCard,
  type PartnerDebriefStats,
} from "./partner-debrief-card"
export { PhaseTimer, type PhaseTimerStatus } from "./phase-timer"
export { PlayModeForm, type PlayModeValue } from "./play-mode-form"
export { AiTag, PlayerAvatar } from "./player-avatar"
export {
  ReconcileCard,
  ReconcileSentence,
  type PlayerPicks,
  type PlayerRationales,
  type ReconcileFilter,
} from "./reconcile-card"
export { SessionLobbyCard } from "./session-lobby-card"
export { SherlockNote, type SherlockNoteVariant } from "./sherlock-note"
export { SummarySentence } from "./summary-sentence"
export { SuspectCard, type SuspectStatus } from "./suspect-card"
export {
  TeamStatus,
  type PlayerPhaseStatus,
  type TeamMember,
} from "./team-status"
export {
  VerdictForm,
  type VerdictPick,
  type VerdictValue,
} from "./verdict-form"
