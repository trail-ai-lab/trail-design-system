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
    talkTimePct: 18,
    wida: {
      verdict: "partial",
      score: 3.2,
      reasoning: "Uses short sentences with some prompting.",
    },
    standard: {
      verdict: "not-yet",
      reasoning: "Has not yet shown equal grouping independently.",
    },
    culturalContext: "Compared sharing dumplings to equal groups.",
    academicTerms: [{ term: "equal groups" }, { term: "每组", language: "ZH" }],
    transcriptQuote: "Each group has the same number, four and four.",
    note: "Spoke mostly in Mandarin before switching to English.",
    actionPrompt: "Ask Mei to explain the dumpling example to the whole group.",
  },
  {
    id: "liam",
    name: "Liam",
    primaryLanguage: "English",
    talkTimePct: 46,
    wida: null,
    standard: { verdict: "met" },
    academicTerms: [{ term: "divide" }, { term: "remainder" }],
    transcriptQuote: "Twelve divided by three is four in each group.",
    actionPrompt: "Pair Liam with a peer to explain his strategy.",
  },
  {
    id: "rosa",
    name: "Rosa",
    primaryLanguage: "Spanish",
    talkTimePct: 36,
    wida: { verdict: "met", score: 4.1 },
    standard: { verdict: "partial" },
    academicTerms: [{ term: "grupos iguales", language: "ES" }],
    transcriptQuote: "Cuatro en cada grupo.",
  },
]

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
