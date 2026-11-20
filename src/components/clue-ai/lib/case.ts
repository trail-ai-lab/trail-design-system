import {
  CircleCheckIcon,
  GhostIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react"

import type { StatusTone } from "@/components/patterns/status-badge"

/**
 * Clue AI object model, shared by every component in this folder:
 *
 *   Case (the Harpe murder) → Suspect (Flora, Eddie, …) → Summary sentence
 *
 * Players read the AI's summary of a suspect's files one sentence at a time,
 * check each against its source document (evidence) and mark it with one of
 * three classifications. A verdict on the suspect follows; at the end the team
 * makes a final call (murderer + motive).
 */

/** How a player judged one AI summary sentence against its source. */
export type Classification = "accurate" | "misrepresentation" | "hallucination"

export interface ClassificationMeta {
  label: string
  /** One-line definition, shown as the picker's tooltip and in the legend */
  description: string
  /**
   * Meaning tone. Accurate = met (success), misrepresentation = needs attention
   * (warning), hallucination = wrong (destructive). Icons back up the color so
   * the label never depends on hue alone.
   */
  tone: Extract<StatusTone, "success" | "warning" | "destructive">
  icon: LucideIcon
}

export const CLASSIFICATIONS: Record<Classification, ClassificationMeta> = {
  accurate: {
    label: "Accurate",
    description: "The source says this",
    tone: "success",
    icon: CircleCheckIcon,
  },
  misrepresentation: {
    label: "Misrepresentation",
    description: "Twists, overstates or leaves out what the source says",
    tone: "warning",
    icon: TriangleAlertIcon,
  },
  hallucination: {
    label: "Hallucination",
    description: "No source backs this up",
    tone: "destructive",
    icon: GhostIcon,
  },
}

/** Display order for pickers and legends. */
export const CLASSIFICATION_ORDER: Classification[] = [
  "accurate",
  "misrepresentation",
  "hallucination",
]

/** Highlighter tint for a sentence marked with a classification. */
export const classificationHighlightClassName: Record<Classification, string> =
  {
    accurate: "bg-success/15",
    misrepresentation: "bg-warning/15",
    hallucination: "bg-destructive/15",
  }

/**
 * Picker "on" state per classification: meaning-colored border and text on an
 * opaque card fill, so it keeps AA contrast on any row background (hover,
 * active). Keyed on aria-checked: the Tooltip trigger overwrites Radix's
 * data-state.
 */
export const classificationSelectedClassName: Record<Classification, string> = {
  accurate:
    "aria-checked:bg-card aria-checked:text-success aria-checked:border-success aria-checked:shadow-raised",
  misrepresentation:
    "aria-checked:bg-card aria-checked:text-warning aria-checked:border-warning aria-checked:shadow-raised",
  hallucination:
    "aria-checked:bg-card aria-checked:text-destructive aria-checked:border-destructive aria-checked:shadow-raised",
}

/** A player's call on one suspect. */
export type Verdict = "guilty" | "inconclusive"

export const VERDICTS: Record<
  Verdict,
  { label: string; tone: StatusTone; description: string }
> = {
  guilty: {
    label: "Guilty",
    tone: "destructive",
    description: "The evidence holds up and points to them",
  },
  inconclusive: {
    label: "Inconclusive",
    tone: "neutral",
    description: "The evidence doesn't hold up, or points elsewhere",
  },
}

export interface Player {
  id: string
  name: string
  initials: string
  avatarUrl?: string
  /** The person using this screen; rendered as "You" */
  isYou?: boolean
  /** An AI teammate rather than a person; shown with a bot avatar and an "AI" tag */
  isAi?: boolean
}

export interface Suspect {
  id: string
  name: string
  /** Relationship to the victim, e.g. "Step-daughter of Sir Eric Harpe" */
  role: string
  initials: string
  portraitUrl?: string
}

export interface Motive {
  value: string
  label: string
}

/** One sentence of the AI's summary of a suspect. */
export interface SummarySentenceData {
  id: string
  text: string
}

/** "You" for the current player, their name otherwise. */
export function playerLabel(player: Player) {
  return player.isYou ? "You" : player.name
}

/**
 * A primary button that can't be pressed yet reads as grey "not yet", not as
 * a faded brand red. Leave it off while loading so the spinner keeps its color.
 */
export const notYetClassName =
  "disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"

/** How the game is played: alone, with a friend, or with an AI teammate. */
export type PlayMode = "solo" | "partner" | "ai"

/**
 * How an AI teammate argues. Never shown to the player during the game — both
 * look and sound alike — only in the debrief.
 */
export type AiPartnerBehavior = "defensive" | "reasonable"

export const AI_PARTNER_BEHAVIORS: Record<
  AiPartnerBehavior,
  { label: string; description: string }
> = {
  defensive: {
    label: "Defended the AI summary",
    description:
      "Marked every summary sentence accurate and argued for the AI's version of events.",
  },
  reasonable: {
    label: "Weighed the evidence",
    description:
      "Checked each sentence against its source and changed its mind when shown better evidence.",
  },
}

/** A case file a message or rationale cites. */
export interface CitedDocument {
  id: string
  title: string
}

/** Why a player — usually the AI — made a call, and what it relied on. */
export interface Rationale {
  text: string
  documents?: CitedDocument[]
}
