// Page shell / navigation
export { AppShell } from "./app-shell"
export {
  SlaiSidebar,
  type SidebarSession,
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
export {
  TranscriptCard,
  GroupsEmptyState,
  type TranscriptEntry,
  type TranscriptGroup,
} from "./transcript-card"
export { GroupSwitcher, ALL_GROUPS, type SwitcherGroup } from "./group-switcher"
export { InvitePanel, InviteStudentsSheet } from "./invite-students-sheet"
export {
  ActivityPicker,
  ActivityPickerSheet,
  type SessionActivity,
} from "./activity-picker"
export { ActivityCard } from "./activity-card"
export { SummaryCard } from "./summary-card"
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
