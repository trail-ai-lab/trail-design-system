/** How a student performed against a goal or language-proficiency level. */
export type Verdict = "met" | "partial" | "not-yet"

export const VERDICT_LABELS: Record<Verdict, string> = {
  met: "Met",
  partial: "Partial",
  "not-yet": "Not yet",
}

export const WIDA_LABELS: Record<number, string> = {
  1: "Entering",
  2: "Emerging",
  3: "Developing",
  4: "Expanding",
  5: "Bridging",
  6: "Reaching",
}

/** WIDA proficiency level name for a score, e.g. 3.4 -> "Developing". */
export function widaLabel(score: number) {
  const level = Math.min(Math.max(Math.floor(score), 1), 6)
  return WIDA_LABELS[level]
}

/** WIDA score to verdict: 4+ met, 3+ partial, otherwise not yet. */
export function widaVerdict(score: number): Verdict {
  if (score >= 4) return "met"
  if (score >= 3) return "partial"
  return "not-yet"
}

/** The weakest verdict in a list; any "not-yet" wins, then any "partial". */
export function weakestVerdict(verdicts: Verdict[]): Verdict {
  if (verdicts.includes("not-yet")) return "not-yet"
  if (verdicts.includes("partial")) return "partial"
  return "met"
}

/** Numeric encoding for charting a verdict over time. */
export const VERDICT_VALUE: Record<Verdict, number> = {
  "not-yet": 0,
  partial: 0.5,
  met: 1,
}
