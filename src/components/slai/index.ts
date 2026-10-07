// Page shell / navigation
export { AppShell } from "./app-shell"
export {
  SlaiSidebar,
  type SidebarSession,
  type SidebarSource,
  type SidebarStudent,
  type SidebarItemTarget,
  type SidebarPeriod,
  type SidebarUser,
  type SlaiNavId,
} from "./slai-sidebar"
export { SessionActions } from "./session-actions"

// SLAI-specific components
export { SessionStatusBadge, type SessionStatus } from "./session-status-badge"
export { LanguageChip } from "./language-chip"
export {
  LanguageSettingsForm,
  DEFAULT_LANGUAGES,
  defaultLanguageSettings,
  type LanguageSettingsValue,
} from "./language-settings-form"
export { LanguageSettingsSheet } from "./language-settings-sheet"
export { NewSessionForm } from "./new-session-form"
export { LiveWaveform } from "./live-waveform"
export { RecordingControl } from "./recording-control"
export { RecordingCard } from "./recording-card"
export { GroupSetupForm } from "./group-setup-form"
export { StudentChip } from "./student-chip"
export { MicPermissionError } from "./mic-permission-error"
export { StudentRecordingScreen } from "./student-recording-screen"
export {
  TranscriptCard,
  GroupsEmptyState,
  type TranscriptEntry,
  type TranscriptGroup,
} from "./transcript-card"
export {
  TranscriptUtteranceRow,
  type TranscriptUtterance,
} from "./transcript-utterance-row"
export { GroupSwitcher, ALL_GROUPS, type SwitcherGroup } from "./group-switcher"
export { InvitePanel, InviteStudentsSheet } from "./invite-students-sheet"
export {
  ActivityPicker,
  ActivityPickerSheet,
  type SessionActivity,
} from "./activity-picker"
export { ActivityCard } from "./activity-card"
export { SummaryCard, type SummaryPhase } from "./summary-card"
export { SessionChatCard, type ChatMessage } from "./session-chat"

// Post-session (review) components
export { AudioPlayerCard } from "./audio-player-card"
export {
  ParticipationCard,
  type ParticipationEntry,
} from "./participation-card"
export {
  RecordedTranscriptCard,
  type RecordedSpeaker,
  type RecordedEntry,
} from "./recorded-transcript-card"
export { ActivityLogCard, type ActivityLogEvent } from "./activity-log-card"

// Live-session building blocks
export { RecordingTimer } from "./recording-timer"
export { CheckinDivider } from "./checkin-divider"
export { NoisyAudioBanner } from "./noisy-audio-banner"
export { SummaryText } from "./summary-text"
export { ScopeToggle, type InsightScope } from "./scope-toggle"

// Search, row actions, language pickers
export {
  GlobalSearch,
  useSearchShortcut,
  type SearchResult,
} from "./global-search"
export { RenameDialog } from "./rename-dialog"
export { DeleteConfirmDialog } from "./delete-confirm-dialog"
export {
  SessionGroupList,
  type SessionGroupListItem,
} from "./session-group-list"
export { LanguageCombobox } from "./language-combobox"
export { LanguageMultiSelect } from "./language-multi-select"

// Diarization (speakers), recorded-audio details and upload flow
export { SpeakerForm, type SpeakerCountMode } from "./speaker-form"
export { SpeakerAssignDropdown } from "./speaker-assign-dropdown"
export {
  ContributionPanel,
  SPEAKER_FILLS,
  type ContributionSpeaker,
} from "./contribution-panel"
export { DiarizationPanel, type DiarizationState } from "./diarization-panel"
export { SourceMetaCard } from "./source-meta-card"
export { RetranscribeToolbar } from "./retranscribe-toolbar"
export {
  RecordingReadyPanel,
  RecordingUploadingPanel,
  RecordingDonePanel,
  UploadErrorPanel,
} from "./recording-panels"
export {
  SaveRecordingDialog,
  type SaveRecordingPhase,
} from "./save-recording-dialog"
export { AddSourceForm } from "./add-source-form"

// Activities
export { VidyaMapPlaceholder } from "./vidya-map-placeholder"
export { ActivityViewer } from "./activity-viewer"

// Student progress, goals and verdicts (from the SLAI prototype)
export { VerdictBadge, VerdictIcon, VerdictLegend } from "./verdict-badge"
export {
  VERDICT_LABELS,
  VERDICT_VALUE,
  WIDA_LABELS,
  widaLabel,
  widaVerdict,
  weakestVerdict,
  type Verdict,
} from "./lib/verdict"
export type {
  ProgressMetric,
  StudentProgressData,
  StudentSessionData,
} from "./lib/student-progress"
export { InsightCallout } from "./insight-callout"
export { ClassOverviewGrid, type OverviewStudent } from "./class-overview-grid"
export {
  StudentInsightCard,
  type StudentInsight,
  type AcademicTerm,
} from "./student-insight-card"
export { SessionGoalCard } from "./session-goal-card"
export { GoalsPanel } from "./goals-panel"
export { ProgressChart } from "./progress-chart"
export { SessionEvidenceCard, SessionEvidenceStrip } from "./session-evidence-strip"
export { StudentProgressView } from "./student-progress-view"
export {
  ConversationTimeline,
  type TimelineSegment,
} from "./conversation-timeline"
export { LiveGroupCard } from "./live-group-card"

// Session setup (rosters, groups, files)
export { GroupCard, type RosterStudent, type SessionGroup } from "./group-card"
export { GroupBuilder, type GroupPreset } from "./group-builder"
export { FileList, type UploadedFile } from "./file-list"
export { SessionSetupForm, type SessionSetupValues } from "./session-setup-form"
