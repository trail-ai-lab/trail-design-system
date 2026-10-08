import type { Verdict } from "@/components/slai/lib/verdict"

/** One student's results for one session. */
export interface StudentSessionData {
  sessionId: string
  /** Short topic name, used as the chart's x-axis label */
  sessionLabel: string
  /** 1-based position among all sessions; gaps mean the student was absent */
  sessionIndex: number
  /** Null for native English speakers */
  widaScore: number | null
  /** Overrides the verdict computed from `widaScore` */
  widaVerdictOverride?: Verdict
  /** Short annotation on the WIDA badge, e.g. "in Spanish" */
  widaNote?: string
  standardVerdict: Verdict
  /** Share of group talk time, 0-100 */
  participationPct: number
  /** Count of academic terms used */
  academicTermCount: number
  transcriptQuote: string
  quoteTranslation?: string
  actionPrompt: string
  /** Teacher has followed up on the action prompt */
  actionDone: boolean
  isMilestone?: boolean
  milestoneLabel?: string
}

export interface StudentProgressData {
  id: string
  name: string
  primaryLanguage: string
  isNativeEnglish?: boolean
  sessions: StudentSessionData[]
}

export type ProgressMetric = "wida" | "standard" | "participation" | "academic"
