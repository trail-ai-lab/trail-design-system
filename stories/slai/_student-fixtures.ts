import type { StudentInsight } from "@/components/slai/student-insight-card"
import type { StudentProgressData } from "@/components/slai/lib/student-progress"

/** Sample classroom shared by the student-progress and goals stories. */
export const SESSION_LABELS = [
  "Equal groups",
  "Equal sharing",
  "Division 12÷3",
  "Remainders",
  "Mult. & division",
]

export const INSIGHTS: StudentInsight[] = [
  {
    id: "mei",
    name: "Mei",
    primaryLanguage: "Mandarin",
    words: 84,
    standard: {
      verdict: "not-yet",
      reasoning:
        "Mei compared the rows by adding, not by a constant ratio, and didn't connect the table to the graph.",
    },
    evidence: [
      {
        quote: "每次都加三，所以是对的。",
        translation: "You add three every time, so it's right.",
        language: "Mandarin",
        time: "3:12",
      },
    ],
    academicTerms: [{ term: "table" }, { term: "比例", language: "ZH" }],
    actionPrompt:
      "Ask Mei to divide flour by sugar in each row and compare the results.",
  },
  {
    id: "liam",
    name: "Liam",
    primaryLanguage: "English",
    words: 212,
    standard: {
      verdict: "met",
      reasoning:
        "Liam tested the ratio in every row and explained why the graph must pass through the origin.",
    },
    evidence: [
      {
        quote:
          "Six over four is one point five too, but nine over seven isn't.",
        time: "1:48",
      },
      {
        quote: "If you double the flour you have to double the sugar.",
        time: "4:05",
      },
    ],
    academicTerms: [
      { term: "ratio" },
      { term: "proportional" },
      { term: "origin" },
    ],
    actionPrompt: "Have Liam write the equation y = 2/3x and explain the 2/3.",
  },
  {
    id: "rosa",
    name: "Rosa",
    primaryLanguage: "Spanish",
    words: 131,
    wida: { verdict: "met", score: 4.1 },
    standard: {
      verdict: "partial",
      reasoning:
        "Rosa found the constant of proportionality but didn't say what it means for the recipe.",
    },
    evidence: [
      {
        quote: "La constante es dos tercios.",
        translation: "The constant is two thirds.",
        language: "Spanish",
        time: "5:30",
      },
    ],
    academicTerms: [{ term: "constante", language: "ES" }],
  },
  {
    id: "noah",
    name: "Noah",
    primaryLanguage: "English",
    words: 9,
    standard: { verdict: null, noVerdictReason: "Said too little to judge" },
  },
]

/** The session's standard for the goals stories. */
export const GOAL = {
  heading: "Grade 7 · Ratios and Proportional Relationships",
  code: "7.RP.2",
  description:
    "Recognize and represent proportional relationships between quantities.",
}

const sessions = (
  base: Array<
    [string, number | null, "met" | "partial" | "not-yet", number, number]
  >
) =>
  base.map(([label, wida, verdict, participation, terms], i) => ({
    sessionId: `s${i + 1}`,
    sessionLabel: label,
    sessionIndex: i + 1,
    widaScore: wida,
    standardVerdict: verdict,
    participationPct: participation,
    academicTermCount: terms,
    transcriptQuote: "Each group has the same number.",
    quoteTranslation: i === 1 ? "Cada grupo tiene el mismo número." : undefined,
    actionPrompt: "Ask for an example using a different number.",
    actionDone: i < 2,
    isMilestone: i === 2,
    milestoneLabel: i === 2 ? "First full sentence" : undefined,
  }))

export const MEI: StudentProgressData = {
  id: "mei",
  name: "Mei",
  primaryLanguage: "Mandarin",
  sessions: sessions([
    [SESSION_LABELS[0], 2.4, "not-yet", 22, 1],
    [SESSION_LABELS[1], 2.8, "not-yet", 25, 2],
    [SESSION_LABELS[2], 3.1, "partial", 30, 3],
    [SESSION_LABELS[4], 3.4, "partial", 28, 5],
  ]).map((s, i) => ({ ...s, sessionIndex: [1, 2, 3, 5][i] })),
}

export const LIAM: StudentProgressData = {
  id: "liam",
  name: "Liam",
  primaryLanguage: "English",
  isNativeEnglish: true,
  sessions: sessions([
    [SESSION_LABELS[0], null, "met", 48, 4],
    [SESSION_LABELS[1], null, "met", 44, 5],
    [SESSION_LABELS[2], null, "met", 50, 6],
  ]),
}

/**
 * Early progress, before any assessment: per session only the group, talk
 * time and the student's first substantive line, with gaps for absences.
 */
export const MEI_EARLY: StudentProgressData = {
  id: "mei",
  name: "Mei",
  primaryLanguage: "Mandarin",
  sessions: [
    {
      sessionId: "s1",
      sessionLabel: "Period 3 — Sep 18",
      sessionIndex: 1,
      dateLabel: "Sep 18",
      groupName: "Team A",
      participationPct: 22,
      talkSeconds: 74,
      transcriptQuote: "我觉得每组都有一样多的。",
      quoteTranslation: "I think every group has the same amount.",
      quoteLanguage: "Chinese",
      href: "#/session/physics/period-3-sep-18/team-a",
    },
    {
      sessionId: "s2",
      sessionLabel: "Period 3 — Sep 25",
      sessionIndex: 2,
      dateLabel: "Sep 25",
      absent: true,
    },
    {
      sessionId: "s3",
      sessionLabel: "Period 3 — Oct 2",
      sessionIndex: 3,
      dateLabel: "Oct 2",
      groupName: "Team C",
    },
    {
      sessionId: "s4",
      sessionLabel: "Period 3 — Oct 9",
      sessionIndex: 4,
      dateLabel: "Oct 9",
      groupName: "Team A",
      participationPct: 31,
      talkSeconds: 128,
      transcriptQuote:
        "The ramp is steeper so the cart goes faster at the end.",
      quoteLanguage: "English",
      href: "#/session/physics/period-3-oct-9/team-a",
    },
  ],
}

/** Students in the 3.10 shape (talk-time shares, one quote, a WIDA verdict
 * or null for native English), still accepted though deprecated. */
export const LEGACY_INSIGHTS: StudentInsight[] = [
  {
    id: "legacy-1",
    name: "Ana Ruiz",
    primaryLanguage: "Spanish",
    talkTimePct: 42,
    wida: { verdict: "partial", score: 3.5 },
    standard: { verdict: "met", reasoning: "Explains the unit rate." },
    culturalContext: "Compared the recipe to one her family cooks.",
    academicTerms: [{ term: "unit rate" }],
    transcriptQuote:
      "It's two cups for every three, so the rate stays the same.",
    note: "Led the group's first answer.",
  },
  {
    id: "legacy-2",
    name: "Ben Ito",
    primaryLanguage: "English",
    talkTimePct: 18,
    wida: null,
    standard: { verdict: "not-yet" },
  },
]

/** The 3.10 shape of `GoalsPanel`'s `goal`. */
export const LEGACY_GOAL = {
  languageObjective: GOAL.heading,
  standardCode: GOAL.code,
  standardDescription: GOAL.description,
}
