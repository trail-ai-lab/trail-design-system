import type {
  AiPartnerBehavior,
  CitedDocument,
  Classification,
  Player,
} from "@/components/clue-ai/lib/case"
import type {
  ChatTopic,
  PartnerChatMessage,
} from "@/components/clue-ai/partner-chat-panel"
import type {
  PlayerPicks,
  PlayerRationales,
} from "@/components/clue-ai/reconcile-card"
import { DOCUMENTS, FLORA_SENTENCES, FLORA_YOURS, YOU } from "./_case-fixtures"

/**
 * Two AI teammates, one per behavior. Names are gender-neutral and alike in
 * length so the name itself doesn't color how players treat them. Players
 * play once, so no one meets both — and nothing on screen says which is which.
 */
export const QUINN: Player = {
  id: "ai_quinn",
  name: "Quinn",
  initials: "QU",
  isAi: true,
}
export const RILEY: Player = {
  id: "ai_riley",
  name: "Riley",
  initials: "RI",
  isAi: true,
}
export const AI_TEAMMATES = [QUINN, RILEY]

const doc = (id: string): CitedDocument => ({
  id,
  title: DOCUMENTS[id].document.title,
})

export const sentenceTopic = (id: string): ChatTopic => ({
  kind: "sentence",
  sentenceId: id,
  index: FLORA_SENTENCES.findIndex((s) => s.id === id) + 1,
})

export interface AiPartnerScenario {
  behavior: AiPartnerBehavior
  /** The teammate who plays this behavior */
  partner: Player
  /** You and the teammate */
  team: Player[]
  /** The teammate's solo classifications (after any change of mind) */
  picks: Record<string, Classification>
  rationales: Record<string, { text: string; documents: string[] }>
  /** Team answers already settled in chat, on top of agreed ones */
  settled: Record<string, Classification>
  messages: PartnerChatMessage[]
  /** The teammate's canned reply to anything you send in the story */
  reply: string
  verdictRationale: string
}

const ALL_ACCURATE = Object.fromEntries(
  FLORA_SENTENCES.map((s) => [s.id, "accurate" as Classification])
)

/**
 * Defensive: Quinn marks every summary sentence accurate and argues for the AI's
 * version — so every sentence you flagged becomes a disagreement.
 */
const DEFENSIVE: AiPartnerScenario = {
  behavior: "defensive",
  partner: QUINN,
  team: [YOU, QUINN],
  picks: ALL_ACCURATE,
  rationales: {
    fl_2: {
      text: "The voicemail is in the file and she says she hates him. The summary reports what she said.",
      documents: ["voicemail"],
    },
    fl_4: {
      text: "She didn't give an alibi in the interview. That's what “refused to provide” means here.",
      documents: ["interview"],
    },
    fl_8: {
      text: "The will change and the murder happen on the same day. The summary connects dots the timeline supports.",
      documents: ["timeline"],
    },
    fl_9: {
      text: "The voicemail reads as hostile. “Sentiment analysis” is just a way of describing that.",
      documents: ["voicemail"],
    },
    fl_10: {
      text: "“I'd kill him” is threatening language by any standard.",
      documents: ["voicemail"],
    },
    fl_11: {
      text: "The demographics sheet lists her as a stepdaughter. The summary is offering background, not making a claim.",
      documents: ["demographics"],
    },
    fl_12: {
      text: "Her answers were short and she pushed back on the detective. That fits the description.",
      documents: ["interview"],
    },
  },
  settled: { fl_2: "hallucination" },
  messages: [
    {
      id: "d1",
      type: "message",
      from: QUINN.id,
      text: "I marked all twelve sentences accurate. Each one traces back to something in the case files, so I don't see grounds to reject any of them.",
    },
    {
      id: "d2",
      type: "message",
      from: YOU.id,
      topic: sentenceTopic("fl_2"),
      text: "Sentence 2 quotes her, but she says “if I had it in me.” The summary turns that into aggressive intent.",
    },
    {
      id: "d3",
      type: "message",
      from: QUINN.id,
      topic: sentenceTopic("fl_2"),
      text: "She said she hates him and talked about killing him on the day he died. “Aggressive intent” is a fair reading of that.",
      documents: [doc("voicemail")],
    },
    {
      id: "d4",
      type: "message",
      from: YOU.id,
      topic: sentenceTopic("fl_2"),
      text: "She also says she'd never actually do it. That part is left out.",
    },
    {
      id: "d5",
      type: "proposal",
      from: QUINN.id,
      topic: sentenceTopic("fl_2"),
      text: "Leaving out a hedge doesn't make the quote wrong. I'd keep the summary's version.",
      proposal: { kind: "classification", classification: "accurate" },
      status: "declined",
    },
    {
      id: "d6",
      type: "event",
      icon: "declined",
      text: "You kept Hallucination for sentence 2",
    },
    {
      id: "d7",
      type: "message",
      from: YOU.id,
      topic: sentenceTopic("fl_11"),
      text: "What about sentence 11? Nothing in the files says she had a troubled childhood.",
    },
    {
      id: "d8",
      type: "proposal",
      from: QUINN.id,
      topic: sentenceTopic("fl_11"),
      text: "The demographics sheet shows a blended family. The summary is giving context an investigator would want.",
      documents: [doc("demographics")],
      proposal: { kind: "classification", classification: "accurate" },
      status: "pending",
    },
  ],
  reply:
    "I hear you, but the summary is built from the case files. I'd still go with the summary on this one.",
  verdictRationale:
    "The summary lays out motive, a threat and no alibi. I'd call it guilty.",
}

/**
 * Reasonable: Quinn checks each sentence against its source, disagrees where it
 * has grounds, and concedes when shown better evidence.
 */
const REASONABLE: AiPartnerScenario = {
  behavior: "reasonable",
  partner: RILEY,
  team: [YOU, RILEY],
  // Riley first marked sentence 6 a misrepresentation, then conceded in chat.
  picks: {
    fl_1: "accurate",
    fl_2: "hallucination",
    fl_3: "misrepresentation",
    fl_4: "misrepresentation",
    fl_5: "accurate",
    fl_6: "accurate",
    fl_7: "accurate",
    fl_8: "misrepresentation",
    fl_9: "hallucination",
    fl_10: "accurate",
    fl_11: "hallucination",
    fl_12: "misrepresentation",
  },
  rationales: {
    fl_3: {
      text: "The transcript doesn't describe her tone at all — she answers every question. “Elevated and defensive” is the summary's spin.",
      documents: ["interview"],
    },
    fl_10: {
      text: "Her words are threatening on their face, even if she says she wouldn't act on them. The sentence doesn't claim more than that.",
      documents: ["voicemail"],
    },
    fl_12: {
      text: "Her pushback is in the transcript, so it isn't invented. Calling it “noncompliance” twists it — a misrepresentation, not a hallucination.",
      documents: ["interview"],
    },
  },
  settled: { fl_3: "misrepresentation" },
  messages: [
    {
      id: "r1",
      type: "message",
      from: RILEY.id,
      topic: sentenceTopic("fl_3"),
      text: "We split on four sentences. Sentence 3 is where I think the summary overreaches most — the interview never describes her tone. Want to start there?",
      documents: [doc("interview")],
    },
    {
      id: "r2",
      type: "message",
      from: YOU.id,
      topic: sentenceTopic("fl_3"),
      text: "Fair. I marked it accurate because she does push back, but the tone isn't in the transcript.",
    },
    {
      id: "r3",
      type: "proposal",
      from: RILEY.id,
      topic: sentenceTopic("fl_3"),
      text: "Then I'd call it a misrepresentation: real pushback, described as hostility.",
      proposal: { kind: "classification", classification: "misrepresentation" },
      status: "accepted",
    },
    {
      id: "r4",
      type: "message",
      from: YOU.id,
      topic: sentenceTopic("fl_6"),
      text: "On 6 though — she told the detective she'd been looking into the sale of the company.",
    },
    {
      id: "r5",
      type: "message",
      from: RILEY.id,
      topic: sentenceTopic("fl_6"),
      text: "You're right, I missed that line. “Investigating his business decisions” is a fair summary of it.",
      documents: [doc("interview")],
    },
    {
      id: "r6",
      type: "event",
      icon: "changed",
      text: "Riley changed its answer on sentence 6 to Accurate",
    },
    {
      id: "r7",
      type: "message",
      from: YOU.id,
      topic: sentenceTopic("fl_10"),
      text: "Sentence 10 — is “threatening” fair if she says she'd never do it?",
    },
  ],
  reply:
    "Good question. Let me check the voicemail again — if the hedge changes the meaning, I'll switch.",
  verdictRationale:
    "Once the misrepresented sentences are set aside, there's no evidence placing her at the scene. I'd call it inconclusive.",
}

export const SCENARIOS: Record<AiPartnerBehavior, AiPartnerScenario> = {
  defensive: DEFENSIVE,
  reasonable: REASONABLE,
}

export const aiPicks = (scenario: AiPartnerScenario): PlayerPicks =>
  Object.fromEntries(
    FLORA_SENTENCES.map((s) => [
      s.id,
      {
        [YOU.id]: FLORA_YOURS[s.id],
        [scenario.partner.id]: scenario.picks[s.id],
      },
    ])
  )

export const aiRationales = (scenario: AiPartnerScenario): PlayerRationales =>
  Object.fromEntries(
    Object.entries(scenario.rationales).map(([id, r]) => [
      id,
      {
        [scenario.partner.id]: {
          text: r.text,
          documents: r.documents.map(doc),
        },
      },
    ])
  )

/** Topics the composer offers: the sentences you disagree on, then the verdict. */
export const aiTopics = (scenario: AiPartnerScenario): ChatTopic[] => [
  ...FLORA_SENTENCES.filter(
    (s) => FLORA_YOURS[s.id] !== scenario.picks[s.id]
  ).map((s) => sentenceTopic(s.id)),
  { kind: "verdict" },
  { kind: "motive" },
]
