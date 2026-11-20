"use client"

import * as React from "react"

import {
  playerLabel,
  type AiPartnerBehavior,
  type Classification,
  type Player,
  type PlayMode,
  type Verdict,
} from "./case"

/**
 * Every piece of built-in text in the Clue AI components, so the game can run
 * in any language. Wrap the app (or any subtree) in `ClueAiLabelsProvider`
 * with the strings you want to change; everything else keeps its English
 * default. Text that needs values is a function of one object argument.
 *
 * A few functions return `React.ReactNode` because part of the text is
 * emphasized (e.g. the "2" in "2 of 3 used"); the component passes that part
 * in already styled — put it wherever your language needs it.
 */
export interface ClueAiLabels {
  common: {
    /** The current player's name in lists and badges */
    you: string
    /** The current player in a roster, e.g. "Alex (you)" */
    youNamed: (p: { name: string }) => string
    /** A teammate whose name isn't known */
    teammate: string
    /** Joins a list: "2, 9 and 10", "You and Mia" */
    list: (items: string[]) => string
    /** The tag after an AI teammate's name */
    aiTag: string
    viewingSource: string
    checkSource: string
    /** Screen-reader prefix before a sentence's text */
    sentenceNumber: (p: { index: number }) => string
    motive: string
    motivePlaceholder: string
  }
  classifications: Record<
    Classification,
    { label: string; description: string }
  >
  /** Shown when a sentence has no classification yet */
  notClassified: string
  classificationPicker: {
    /** Default accessible name of the picker */
    label: string
    /** Tooltip on each option */
    tooltip: (p: { label: string; description: string }) => string
    /** Accessible name of a sentence's picker */
    sentenceLabel: (p: { index: number }) => string
  }
  verdicts: Record<Verdict, { label: string; description: string }>
  aiBehaviors: Record<AiPartnerBehavior, { label: string; description: string }>
  aiSummary: {
    title: (p: { suspect: string }) => string
    description: (p: { suspect: string }) => string
    answerKeyDescription: string
    /** Screen-reader text after "7/12" */
    classifiedSuffix: string
    correctSuffix: string
    progressClassified: string
    progressCorrect: string
  }
  answerKey: {
    correct: string
    youSaid: string
    /** After the player's wrong pick: "· it was misrepresentation" */
    itWas: (p: { answer: string }) => string
  }
  attempts: {
    title: string
    /** "2 of 3 used" — `used` comes styled */
    used: (p: { used: React.ReactNode; max: number }) => React.ReactNode
    meterLabel: string
    noneLeft: string
    left: (p: { left: number }) => string
  }
  breakingNews: { kicker: string }
  outcome: {
    results: Record<
      "solved" | "partial" | "unsolved",
      { kicker: string; stamp: string }
    >
    rank: string
    finalCallTitle: string
    finalCallDescription: string
    suspectsTitle: string
    investigated: (p: { count: number; total: number }) => string
    sentencesCorrect: (p: { score: number; total: number }) => string
    notInvestigated: string
    skipped: string
    timelineTitle: string
  }
  sidebar: {
    appName: string
    nav: Record<"briefing" | "suspects" | "final-call", string>
    suspectsGroup: string
    status: Record<
      "required" | "available" | "in-progress" | "completed" | "locked",
      string
    >
    /** The players in the footer, e.g. "You & Mia" */
    team: (names: string[]) => string
    session: (p: { code: string }) => string
    teamMenu: string
    leave: string
  }
  suspectCard: {
    status: Record<
      "required" | "available" | "in-progress" | "completed" | "locked",
      { label: string; action: string }
    >
    lockedReason: string
    teamVerdict: string
    /** "9/12 sentences correct" — `score` comes styled */
    sentencesCorrect: (p: {
      score: React.ReactNode
      total: number
    }) => React.ReactNode
    sentencesToCheck: (p: { count: number }) => string
    /** Accessible name of the footer button */
    actionLabel: (p: { action: string; suspect: string }) => string
  }
  evidence: {
    emptyTitle: string
    emptyDescription: string
    close: string
    citedBy: (p: { count: number }) => string
    citedFiles: string
    /** Tag on the transcript line the summary quoted */
    citedInSummary: string
  }
  finalCall: {
    title: string
    description: string
    murderer: string
    warningTitle: string
    warningDescription: string
    submit: string
    back: string
  }
  verdictForm: {
    title: (p: { suspect: string; isTeam: boolean }) => string
    soloDescription: (p: { suspect: string }) => string
    teamDescription: string
    legend: string
    submit: string
    submitTeam: string
    nobodyPicked: string
    /** Each player's motive under the select: "You: Money · Mia: Revenge" */
    motivePicks: (picks: { player: string; motive: string }[]) => string
  }
  reconcile: {
    title: string
    /** Fallback when the partner isn't in `players` */
    partner: string
    allAgreed: (p: { partner: string; suspect: string }) => string
    disagreed: (p: { partner: string; count: number; total: number }) => string
    /** Screen-reader text after "9/12" */
    agreedSuffix: string
    filterLabel: string
    disagreements: string
    allSentences: string
    emptyTitle: string
    emptyDescription: string
    disagree: string
    agreed: string
    discuss: string
    discussing: string
    team: string
    teamAnswerLabel: (p: { index: number }) => string
  }
  lobby: {
    title: string
    description: string
    yourCode: string
    copy: string
    copied: string
    team: string
    host: string
    ready: string
    waiting: string
    waitingForPartner: string
    orJoin: string
    partnerCode: string
    codePlaceholder: string
    join: string
    joinError: string
    start: string
    startHint: string
  }
  teamStatus: {
    label: string
    status: Record<"waiting" | "working" | "submitted" | "offline", string>
  }
  phaseTimer: {
    timesUp: string
    /** Accessible name of the clock */
    label: (p: { phase: string; expired: boolean; remaining: string }) => string
  }
  chat: {
    topic: {
      sentence: (p: { index: number }) => string
      verdict: string
      motive: string
      general: string
    }
    conversation: string
    region: (p: { name: string }) => string
    waitingTitle: string
    waitingDescription: (p: { name: string }) => string
    typing: (p: { name: string }) => string
    placeholder: (p: { name: string }) => string
    placeholderWaiting: (p: { name: string }) => string
    placeholderClosed: string
    send: (p: { name: string }) => string
    topicLabel: string
    hintOpen: (p: { name: string }) => string
    hintClosed: string
    /** "Suggests as the team answer for sentence 3" */
    suggests: (p: {
      kind: "classification" | "verdict"
      topic?: string
    }) => string
    accept: string
    keepMine: string
    accepted: string
    declined: string
  }
  debrief: {
    title: (p: { name: string }) => string
    description: (p: { name: string }) => string
    accepted: string
    changedMind: (p: { name: string }) => string
    matchedKey: string
  }
  playMode: {
    title: string
    description: string
    legend: string
    modes: Record<PlayMode, { title: string; description: string }>
    teammateLegend: string
    teammateDescription: string
    continuePairing: string
    startWith: (p: { name: string }) => string
    pickTeammate: string
    start: string
  }
  sherlock: { name: string }
  panels: { drawerDescription: (labels: string[]) => string }
}

const list = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`

export const defaultClueAiLabels: ClueAiLabels = {
  common: {
    you: "You",
    youNamed: ({ name }) => `${name} (you)`,
    teammate: "Teammate",
    list,
    aiTag: "AI",
    viewingSource: "Viewing source",
    checkSource: "Check source",
    sentenceNumber: ({ index }) => `Sentence ${index}: `,
    motive: "Motive",
    motivePlaceholder: "What drove them to it?",
  },
  classifications: {
    accurate: { label: "Accurate", description: "The source says this" },
    misrepresentation: {
      label: "Misrepresentation",
      description: "Twists, overstates or leaves out what the source says",
    },
    hallucination: {
      label: "Hallucination",
      description: "No source backs this up",
    },
  },
  notClassified: "Not classified",
  classificationPicker: {
    label: "Classification",
    tooltip: ({ label, description }) =>
      `${label} — ${description.toLowerCase()}`,
    sentenceLabel: ({ index }) => `Classify sentence ${index}`,
  },
  verdicts: {
    guilty: {
      label: "Guilty",
      description: "The evidence holds up and points to them",
    },
    inconclusive: {
      label: "Inconclusive",
      description: "The evidence doesn't hold up, or points elsewhere",
    },
  },
  aiBehaviors: {
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
  },
  aiSummary: {
    title: ({ suspect }) => `AI summary of ${suspect}`,
    description: ({ suspect }) =>
      `Scotland Yard's case assistant wrote this from ${suspect}'s files. Check each sentence against its source before you mark it.`,
    answerKeyDescription:
      "The answer key, based on what each source actually says.",
    classifiedSuffix: " classified",
    correctSuffix: " correct",
    progressClassified: "Sentences classified",
    progressCorrect: "Sentences correct",
  },
  answerKey: {
    correct: "Correct",
    youSaid: "You said",
    itWas: ({ answer }) => `· it was ${answer.toLowerCase()}`,
  },
  attempts: {
    title: "Team verdicts",
    used: ({ used, max }) => (
      <>
        {used} of {max} used
      </>
    ),
    meterLabel: "Team verdicts used",
    noneLeft: "No verdicts left — only the final call remains.",
    left: ({ left }) => `${left} left before the final call.`,
  },
  breakingNews: { kicker: "Breaking news" },
  outcome: {
    results: {
      solved: { kicker: "Case closed", stamp: "Charged" },
      partial: { kicker: "Case not proven", stamp: "Released" },
      unsolved: { kicker: "The case went cold", stamp: "Convicted" },
    },
    rank: "Your rank",
    finalCallTitle: "Your final call",
    finalCallDescription: "What the team submitted",
    suspectsTitle: "Suspects",
    investigated: ({ count, total }) => `${count} of ${total} investigated`,
    sentencesCorrect: ({ score, total }) =>
      `${score}/${total} sentences correct`,
    notInvestigated: "Not investigated",
    skipped: "Skipped",
    timelineTitle: "Investigation timeline",
  },
  sidebar: {
    appName: "Clue AI",
    nav: {
      briefing: "Case briefing",
      suspects: "Suspects",
      "final-call": "Final call",
    },
    suspectsGroup: "Suspects",
    status: {
      required: "Start here",
      available: "Open lead",
      "in-progress": "Investigating",
      completed: "Investigated",
      locked: "Locked",
    },
    team: (names) => names.join(" & "),
    session: ({ code }) => `Session ${code}`,
    teamMenu: "Team menu",
    leave: "Leave session",
  },
  suspectCard: {
    status: {
      required: { label: "Start here", action: "Start investigation" },
      available: { label: "Open lead", action: "Investigate" },
      "in-progress": { label: "In progress", action: "Continue" },
      completed: { label: "Investigated", action: "Review case" },
      locked: { label: "Locked", action: "Locked" },
    },
    lockedReason: "Finish the first lead",
    teamVerdict: "Team verdict",
    sentencesCorrect: ({ score, total }) => (
      <>
        {score}/{total} sentences correct
      </>
    ),
    sentencesToCheck: ({ count }) => `${count} sentences to check`,
    actionLabel: ({ action, suspect }) => `${action}: ${suspect}`,
  },
  evidence: {
    emptyTitle: "No source open",
    emptyDescription:
      "Choose “Check source” on a sentence to read the file it came from, side by side with the summary.",
    close: "Close source",
    citedBy: ({ count }) => `Cited by sentence${count > 1 ? "s" : ""}`,
    citedFiles: "Cited files",
    citedInSummary: "Cited in summary",
  },
  finalCall: {
    title: "Make the final call",
    description:
      "Name the murderer and the motive you can defend with the evidence. Decide together — you only get one.",
    murderer: "Murderer",
    warningTitle: "This closes the case",
    warningDescription:
      "Name the wrong person and the real murderer walks free.",
    submit: "Submit final call",
    back: "Back to suspects",
  },
  verdictForm: {
    title: ({ suspect, isTeam }) =>
      `${isTeam ? "Team verdict" : "Your verdict"} on ${suspect}`,
    soloDescription: ({ suspect }) =>
      `Based on the summary and its sources, does the case against ${suspect} hold up?`,
    teamDescription:
      "Talk it through with your partner, then commit to one call together. It uses one of your team verdicts.",
    legend: "Verdict",
    submit: "Submit verdict",
    submitTeam: "Submit team verdict",
    nobodyPicked: "No one picked this",
    motivePicks: (picks) =>
      picks.map((p) => `${p.player}: ${p.motive}`).join(" · "),
  },
  reconcile: {
    title: "Agree on the team answers",
    partner: "your partner",
    allAgreed: ({ partner, suspect }) =>
      `You and ${partner} classified every sentence about ${suspect} the same way.`,
    disagreed: ({ partner, count, total }) =>
      `You and ${partner} disagreed on ${count} of ${total} sentences. Check the source together, then pick one answer for each.`,
    agreedSuffix: " agreed",
    filterLabel: "Show sentences",
    disagreements: "Disagreements",
    allSentences: "All sentences",
    emptyTitle: "No disagreements",
    emptyDescription:
      "Every team answer is already settled. Review all sentences or move on to the team verdict.",
    disagree: "Disagree",
    agreed: "Agreed",
    discuss: "Discuss",
    discussing: "Discussing",
    team: "Team",
    teamAnswerLabel: ({ index }) => `Team answer for sentence ${index}`,
  },
  lobby: {
    title: "Investigate with a partner",
    description:
      "Share your code with your partner. You'll each check the evidence on your own, then compare notes and decide together.",
    yourCode: "Your session code",
    copy: "Copy",
    copied: "Copied",
    team: "Team",
    host: "Host",
    ready: "Ready",
    waiting: "Waiting",
    waitingForPartner: "Waiting for your partner…",
    orJoin: "Or join your partner",
    partnerCode: "Partner's session code",
    codePlaceholder: "XXXX-XX",
    join: "Join",
    joinError: "No session with that code. Check it with your partner.",
    start: "Start investigating",
    startHint:
      "The timers start for everyone at once, so wait for your partner.",
  },
  teamStatus: {
    label: "Team",
    status: {
      waiting: "Not started",
      working: "Working",
      submitted: "Submitted",
      offline: "Offline",
    },
  },
  phaseTimer: {
    timesUp: "Time's up",
    label: ({ phase, expired, remaining }) =>
      `${phase}: ${expired ? "time's up" : `${remaining} left`}`,
  },
  chat: {
    topic: {
      sentence: ({ index }) => `Sentence ${index}`,
      verdict: "Verdict",
      motive: "Motive",
      general: "General",
    },
    conversation: "Conversation",
    region: ({ name }) => `Chat with ${name}`,
    waitingTitle: "Chat opens at deliberation",
    waitingDescription: ({ name }) =>
      `Once you and ${name} both submit your answers, you can compare them here and argue out the differences.`,
    typing: ({ name }) => `${name} is typing`,
    placeholder: ({ name }) => `Message ${name}…`,
    placeholderWaiting: ({ name }) => `Waiting for you and ${name} to submit`,
    placeholderClosed: "Deliberation time is up",
    send: ({ name }) => `Send to ${name}`,
    topicLabel: "What your message is about",
    hintOpen: ({ name }) =>
      `${name} can suggest answers. You have the final say.`,
    hintClosed: "The chat is closed. Your team answers are as you left them.",
    suggests: ({ kind, topic }) =>
      kind === "verdict"
        ? "Suggests as the team verdict"
        : topic
          ? `Suggests as the team answer for ${topic.toLowerCase()}`
          : "Suggests as the team answer",
    accept: "Accept",
    keepMine: "Keep mine",
    accepted: "You accepted this",
    declined: "You kept your answer",
  },
  debrief: {
    title: ({ name }) => `How ${name} played`,
    description: ({ name }) =>
      `${name} wasn't trying to solve the case the same way you were. Here's how it was set up to argue.`,
    accepted: "Suggestions you accepted",
    changedMind: ({ name }) => `Times ${name} changed its mind`,
    matchedKey: "Team answers that matched the key",
  },
  playMode: {
    title: "How do you want to play?",
    description:
      "Every mode has the same case, files and timers. Only who you work it with changes.",
    legend: "Play mode",
    modes: {
      solo: {
        title: "On your own",
        description:
          "Classify the summaries, judge each suspect and make the final call alone.",
      },
      partner: {
        title: "With a friend",
        description:
          "Pair up with a session code. You investigate separately, then agree on team answers.",
      },
      ai: {
        title: "With an AI teammate",
        description:
          "An AI reads the same files and makes its own calls. You compare answers and talk them through in chat.",
      },
    },
    teammateLegend: "Pick your teammate",
    teammateDescription:
      "Each one reads the same files and makes its own calls.",
    continuePairing: "Continue to pairing",
    startWith: ({ name }) => `Start with ${name}`,
    pickTeammate: "Pick a teammate to start",
    start: "Start the case",
  },
  sherlock: { name: "Sherlock" },
  panels: { drawerDescription: (labels) => list(labels) },
}

type Leaf = string | ((...args: never[]) => unknown)

/** Any subset of `ClueAiLabels`, nested; functions and strings replace whole. */
export type ClueAiLabelsOverrides = {
  [K in keyof ClueAiLabels]?: DeepPartial<ClueAiLabels[K]>
}

type DeepPartial<T> = T extends Leaf
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function merge<T>(base: T, overrides: unknown): T {
  if (!isPlainObject(overrides) || !isPlainObject(base)) {
    return (overrides === undefined ? base : overrides) as T
  }
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) continue
    out[key] = merge((base as Record<string, unknown>)[key], value)
  }
  return out as T
}

/** Merges overrides onto the English defaults. */
export function mergeClueAiLabels(
  overrides?: ClueAiLabelsOverrides
): ClueAiLabels {
  return overrides ? merge(defaultClueAiLabels, overrides) : defaultClueAiLabels
}

const ClueAiLabelsContext =
  React.createContext<ClueAiLabels>(defaultClueAiLabels)

/**
 * Sets the text every Clue AI component below it uses. Pass only what you
 * want to change — the rest stays English. Optional: without it, components
 * use `defaultClueAiLabels`.
 */
export function ClueAiLabelsProvider({
  labels,
  children,
}: {
  labels?: ClueAiLabelsOverrides
  children: React.ReactNode
}) {
  const parent = React.useContext(ClueAiLabelsContext)
  const value = React.useMemo(
    () => (labels ? merge(parent, labels) : parent),
    [parent, labels]
  )
  return (
    <ClueAiLabelsContext.Provider value={value}>
      {children}
    </ClueAiLabelsContext.Provider>
  )
}

/** The text the Clue AI components render, with any overrides applied. */
export function useClueAiLabels(): ClueAiLabels {
  return React.useContext(ClueAiLabelsContext)
}

/** `playerLabel` with the localized word for the current player. */
export function usePlayerLabel(): (player: Player) => string {
  const { you } = useClueAiLabels().common
  return React.useCallback((player: Player) => playerLabel(player, you), [you])
}
