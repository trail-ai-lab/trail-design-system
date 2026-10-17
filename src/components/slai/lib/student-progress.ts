import type { Verdict } from "@/components/slai/lib/verdict"

/**
 * One student's results for one session. Only the session's identity is
 * required: assessments (WIDA, standard, academic language, follow-up) are
 * left out until they exist, and the views hide what's missing.
 */
export interface StudentSessionData {
  sessionId: string
  /** Short topic name, used as the chart's x-axis label */
  sessionLabel: string
  /** 1-based position among all sessions; gaps mean the student was absent */
  sessionIndex: number
  /** When the session was held, shown under its name, e.g. "Oct 9" */
  dateLabel?: string
  /** The group the student was in, e.g. "Team A" */
  groupName?: string
  /** The student wasn't in this session; the card shows "Absent" and charts skip it */
  absent?: boolean
  /** Null for native English speakers; leave out when not assessed */
  widaScore?: number | null
  /** Overrides the verdict computed from `widaScore` */
  widaVerdictOverride?: Verdict
  /** Short annotation on the WIDA badge, e.g. "in Spanish" */
  widaNote?: string
  standardVerdict?: Verdict
  /** Share of group talk time, 0-100 */
  participationPct?: number
  /** How long the student spoke, in seconds */
  talkSeconds?: number
  /** Count of academic terms used */
  academicTermCount?: number
  transcriptQuote?: string
  quoteTranslation?: string
  /** Label above the quote; defaults to "Said" */
  quoteLabel?: string
  /** Language the quote was spoken in, e.g. "Spanish" */
  quoteLanguage?: string
  /** Opens the recording, e.g. the group's session review */
  href?: string
  actionPrompt?: string
  /** Teacher has followed up on the action prompt */
  actionDone?: boolean
  isMilestone?: boolean
  milestoneLabel?: string
}

export interface StudentProgressData {
  id: string
  name: string
  primaryLanguage?: string
  isNativeEnglish?: boolean
  sessions: StudentSessionData[]
}

export type ProgressMetric = "wida" | "standard" | "participation" | "academic"
