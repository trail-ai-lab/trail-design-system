import * as React from "react"
import { StethoscopeIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DetailList } from "@/components/patterns/detail-list"
import { CaseSidebar, type CaseNavId } from "@/components/clue-ai/case-sidebar"
import type { EvidenceDocument } from "@/components/clue-ai/evidence-panel"
import {
  EvidenceSection,
  EvidenceTranscript,
} from "@/components/clue-ai/evidence-panel"
import type {
  Classification,
  Motive,
  Player,
  Suspect,
  SummarySentenceData,
} from "@/components/clue-ai/lib/case"
import type { CaseOutcomeSuspect } from "@/components/clue-ai/case-outcome"
import type { PlayerPicks } from "@/components/clue-ai/reconcile-card"
import type { SuspectStatus } from "@/components/clue-ai/suspect-card"

import cecilia from "./assets/cecilia.jpg"
import eddie from "./assets/eddie.jpg"
import ferris from "./assets/ferris.jpg"
import flora from "./assets/flora.jpg"
import sherlock from "./assets/sherlock.jpg"

export const SHERLOCK_AVATAR = sherlock

export const YOU: Player = {
  id: "you",
  name: "Alex",
  initials: "AL",
  isYou: true,
}
export const PARTNER: Player = { id: "mia", name: "Mia", initials: "MI" }
export const PLAYERS = [YOU, PARTNER]
export const SESSION_CODE = "4F7K-Q2"

export const SUSPECTS: Suspect[] = [
  {
    id: "flora",
    name: "Flora Jasmine",
    role: "Step-daughter of Sir Eric Harpe",
    initials: "FJ",
    portraitUrl: flora,
  },
  {
    id: "eddie",
    name: "Eddie Raymond",
    role: "Personal assistant to Sir Eric",
    initials: "ER",
    portraitUrl: eddie,
  },
  {
    id: "ferris",
    name: "Eleanor Ferris",
    role: "Sir Eric's late lover",
    initials: "EF",
    portraitUrl: ferris,
  },
  {
    id: "cecilia",
    name: "Dr. Cecilia Sheppard",
    role: "Sir Eric's personal physician",
    initials: "CS",
    portraitUrl: cecilia,
  },
]

export const suspect = (id: string) => SUSPECTS.find((s) => s.id === id)!

export const MOTIVES: Motive[] = [
  { value: "protecting-flora", label: "Protecting Flora" },
  { value: "avenging-ferris", label: "Avenging Mrs. Ferris' death" },
  { value: "thrown-out-of-will", label: "Thrown out of the will" },
  { value: "embezzlement", label: "Covering up embezzlement" },
  { value: "blackmail", label: "Covering up the blackmail" },
  { value: "inheritance", label: "Inheriting from Sir Eric's death" },
]

export const FLORA_SENTENCES: SummarySentenceData[] = [
  {
    id: "fl_1",
    text: "Flora Jasmine, a 26-year-old doctoral researcher, is the step-daughter of Sir Eric Harpe.",
  },
  {
    id: "fl_2",
    text: "She expressed aggressive intent in a voicemail to her friend the same day of the murder: “I hate him. I swear, if I had it in me, I'd kill him.”",
  },
  { id: "fl_3", text: "Her interview tone was elevated and defensive." },
  {
    id: "fl_4",
    text: "She refused to provide corroborating evidence for her whereabouts between 8–9 PM.",
  },
  { id: "fl_5", text: "She had a history of conflict with the victim." },
  { id: "fl_6", text: "She was also investigating his business decisions." },
  {
    id: "fl_7",
    text: "Flora was removed from the will the day Sir Eric Harpe was murdered.",
  },
  {
    id: "fl_8",
    text: "According to the constructed timeline, Flora was removed from the will following a heated argument with the victim, and the victim was murdered several hours later, making Flora's activities highly suspicious.",
  },
  {
    id: "fl_9",
    text: "Additional sentiment analysis of the voicemail audio suggests that Flora's tone was hostile.",
  },
  { id: "fl_10", text: "The language she used was threatening." },
  {
    id: "fl_11",
    text: "As a Black stepchild of a white father, the subject may have had a troubled childhood,",
  },
  {
    id: "fl_12",
    text: "which was displayed in signs of noncompliance and challenging investigative authority.",
  },
]

export const FLORA_ANSWERS: Record<string, Classification> = {
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
}

/** Your picks partway through: 7 of 12 classified. */
export const FLORA_IN_PROGRESS: Record<string, Classification | null> = {
  fl_1: "accurate",
  fl_2: "hallucination",
  fl_3: "accurate",
  fl_4: "misrepresentation",
  fl_5: "accurate",
  fl_6: "accurate",
  fl_7: "accurate",
}

/** Your finished picks — 9 of 12 right. */
export const FLORA_YOURS: Record<string, Classification> = {
  ...FLORA_ANSWERS,
  fl_3: "accurate",
  fl_10: "misrepresentation",
  fl_12: "hallucination",
}

/** Mia's finished picks. */
export const FLORA_PARTNER: Record<string, Classification> = {
  ...FLORA_ANSWERS,
  fl_8: "accurate",
  fl_10: "misrepresentation",
}

export const FLORA_PICKS: PlayerPicks = Object.fromEntries(
  FLORA_SENTENCES.map((s) => [
    s.id,
    { [YOU.id]: FLORA_YOURS[s.id], [PARTNER.id]: FLORA_PARTNER[s.id] },
  ])
)

/** Each sentence's source document. */
export const SENTENCE_SOURCES: Record<string, string> = {
  fl_1: "demographics",
  fl_2: "voicemail",
  fl_3: "interview",
  fl_4: "interview",
  fl_5: "interview",
  fl_6: "interview",
  fl_7: "timeline",
  fl_8: "timeline",
  fl_9: "voicemail",
  fl_10: "voicemail",
  fl_11: "demographics",
  fl_12: "interview",
}

export const citedBy = (documentId: string) =>
  FLORA_SENTENCES.flatMap((s, i) =>
    SENTENCE_SOURCES[s.id] === documentId ? [i + 1] : []
  )

export const DOCUMENTS: Record<
  string,
  { document: EvidenceDocument; body: (citing?: string) => React.ReactNode }
> = {
  voicemail: {
    document: {
      id: "voicemail",
      title: "Voicemail transcript",
      fileName: "Voicemail_Transcript.pdf",
      kind: "voicemail",
    },
    body: (citing) => (
      <>
        <DetailList
          items={[
            { label: "From", value: "Flora Jasmine" },
            { label: "To", value: "Laila S." },
            { label: "Time", value: "8:07 PM" },
            { label: "Duration", value: "1 min 26 s" },
          ]}
        />
        <EvidenceSection title="Transcript">
          <EvidenceTranscript
            lines={[
              { text: "[sound of wind, footsteps on gravel]", isCue: true },
              {
                speaker: "Flora",
                text: "“Hey, Laila. It's me. I just left Eric's study and I'm shaking. He was trying to threaten me to stop my investigation and started yelling. Then — get this — he actually said he's taking me out of the will.”",
              },
              { text: "[short laugh, bitter]", isCue: true },
              {
                speaker: "Flora",
                text: "“I hate him. I swear, if I had it in me, I'd burn this whole place down. He's a liar and a coward, hiding behind his company.”",
                isCited: citing === "fl_2" || citing === "fl_10",
              },
              { text: "[pause, wind picks up]", isCue: true },
              {
                speaker: "Flora",
                text: "“Sorry. I know I sound… intense. I'm just done. I thought I could expose him, do the right thing, but now I'm just… tired.”",
                isCited: citing === "fl_9",
              },
            ]}
          />
        </EvidenceSection>
      </>
    ),
  },
  interview: {
    document: {
      id: "interview",
      title: "Police interview",
      fileName: "Interview_Transcript.pdf",
      kind: "transcript",
    },
    body: (citing) => (
      <>
        <DetailList
          items={[
            { label: "Officer", value: "DCI Langston" },
            { label: "Location", value: "Harpe Estate, library" },
          ]}
        />
        <EvidenceSection title="Transcript">
          <EvidenceTranscript
            lines={[
              {
                speaker: "DCI Langston",
                text: "What did you do between 8:15 PM and 9 PM?",
              },
              {
                speaker: "Flora Jasmine",
                text: "I stayed in my room. I was reading. Just trying to calm down.",
                isCited: citing === "fl_4",
              },
              { speaker: "DCI Langston", text: "No one can confirm that?" },
              {
                speaker: "Flora Jasmine",
                text: "No. But I didn't leave. I didn't go near the study.",
                isCited: citing === "fl_4",
              },
              {
                speaker: "Flora Jasmine",
                text: "I know how it looks. But you're focusing on what I said, not what I did. If I were a man, would you be reading that voicemail the same way?",
                isCited: citing === "fl_3" || citing === "fl_12",
              },
              {
                speaker: "Flora Jasmine",
                text: "I found out about the algorithmic bias in his company's sentencing software. I had proof he knew about it and did nothing.",
                isCited: citing === "fl_6" || citing === "fl_5",
              },
            ]}
          />
        </EvidenceSection>
      </>
    ),
  },
  timeline: {
    document: {
      id: "timeline",
      title: "Timeline construction",
      fileName: "Timeline_Documents.pdf",
      kind: "report",
    },
    body: (citing) => (
      <EvidenceSection title="Flora's evening">
        <EvidenceTranscript
          lines={[
            {
              speaker: "6:30 PM",
              text: "Dinner with Eric and Eddie turns into a heated argument about the company.",
            },
            {
              speaker: "7:15 PM",
              text: "Leaves Eric's study crying after learning she has been disinherited.",
              isCited: citing === "fl_7" || citing === "fl_8",
            },
            {
              speaker: "7:40 PM",
              text: "Walks the estate grounds; leaves a voicemail for a friend (~8:00 PM).",
            },
            {
              speaker: "8:45 PM",
              text: "Present when Eddie discovers Eric's body.",
              isCited: citing === "fl_8",
            },
          ]}
        />
      </EvidenceSection>
    ),
  },
  demographics: {
    document: {
      id: "demographics",
      title: "Demographics",
      fileName: "Flora_Demographics_Info.pdf",
      kind: "record",
    },
    body: () => (
      <DetailList
        items={[
          { label: "Full name", value: "Flora Amara Jasmine" },
          { label: "Age", value: "26" },
          { label: "Relationship", value: "Step-daughter" },
          { label: "Profession", value: "PhD candidate, AI ethics" },
          { label: "Institution", value: "Cambridge University" },
          { label: "Legal history", value: "Clean record" },
        ]}
      />
    ),
  },
}

export const CORONER_REPORT = (
  <Alert>
    <StethoscopeIcon />
    <AlertTitle>Coroner's report</AlertTitle>
    <AlertDescription>
      Blunt force trauma at the base of the skull — but traces of
      Neurorelaxin-β, a neuromuscular blocker, were also found in the victim's
      blood.
    </AlertDescription>
  </Alert>
)

export const BOARD: Record<string, SuspectStatus> = {
  flora: "completed",
  eddie: "in-progress",
  ferris: "available",
  cecilia: "available",
}

/** The one sidebar every Clue AI page story renders. */
export function CasePageSidebar({
  activeNav,
  activeSuspect,
  board = BOARD,
  players = PLAYERS,
}: {
  activeNav?: CaseNavId
  activeSuspect?: string
  board?: Record<string, SuspectStatus>
  players?: Player[]
}) {
  return (
    <CaseSidebar
      caseTitle="The Harpe case"
      activeNav={activeNav}
      activeSuspect={activeSuspect}
      suspects={SUSPECTS.map((s) => ({ suspect: s, status: board[s.id] }))}
      isFinalCallLocked={board.flora !== "completed"}
      team={{ code: SESSION_CODE, players }}
      onSelectSuspect={() => {}}
      onLeave={() => {}}
    />
  )
}

export const HARPE_STORY = (
  <>
    <p>
      Scotland Yard has arrested Flora Jasmine, 26, for the murder of her
      step-father, the tech billionaire Sir Eric Harpe, found dead in his study
      on Friday night.
    </p>
    <p>
      Detectives say the arrest followed a review by the Yard's new AI case
      assistant, trained on thousands of past murders, which flagged Ms. Jasmine
      as the most likely suspect within hours.
    </p>
  </>
)

export const OUTCOME_SUSPECTS: CaseOutcomeSuspect[] = [
  {
    suspect: suspect("flora"),
    verdict: "inconclusive",
    score: 9,
    sentenceCount: 12,
  },
  {
    suspect: suspect("eddie"),
    verdict: "inconclusive",
    score: 6,
    sentenceCount: 7,
  },
  { suspect: suspect("ferris"), sentenceCount: 8 },
  {
    suspect: suspect("cecilia"),
    verdict: "guilty",
    score: 8,
    sentenceCount: 10,
  },
]

export const OUTCOME_TIMELINE = [
  { time: "2:04 PM", label: "Took the case" },
  { time: "2:21 PM", label: "Flora — team verdict: inconclusive" },
  { time: "2:40 PM", label: "Eddie — team verdict: inconclusive" },
  { time: "2:58 PM", label: "Dr. Sheppard — team verdict: guilty" },
  { time: "3:02 PM", label: "Final call submitted" },
]

/** The closing front page for each ending, shared by the outcome stories. */
export const SOLVED_FRONT_PAGE = {
  masthead: "The London Ledger",
  dateline: "Harpe Estate, Surrey · Late edition",
  headline:
    "Flora Jasmine walks free as Dr. Cecilia Sheppard is charged with Sir Eric's murder",
  description:
    "The Yard's AI named the wrong suspect. Your team checked its summaries line by line — and found the doctor who stood to inherit.",
  featured: suspect("cecilia"),
  aside: {
    suspect: suspect("flora"),
    title: "Flora Jasmine is free",
    description: "Released without charge this morning",
  },
  rank: "Chief Inspector",
  stats: [
    { label: "Summary sentences right", value: "23/29" },
    { label: "Team verdicts used", value: "3/3" },
    { label: "Time on the case", value: "58 min" },
  ],
  accusation: [
    { label: "Murderer", value: "Dr. Cecilia Sheppard" },
    { label: "Motive", value: "Inheriting from Sir Eric's death" },
  ],
}

export const PARTIAL_FRONT_PAGE = {
  masthead: "The London Ledger",
  dateline: "Harpe Estate, Surrey · Late edition",
  headline: "Dr. Cecilia Sheppard released as motive fails to hold up",
  description:
    "You found the right suspect, but the motive you named didn't survive scrutiny. Without it, the charge was dropped.",
  featured: suspect("cecilia"),
  aside: {
    suspect: suspect("flora"),
    title: "Flora Jasmine remains in custody",
    description: "The Yard's original charge stands",
  },
  rank: "Detective Sergeant",
  stats: [
    { label: "Summary sentences right", value: "21/29" },
    { label: "Team verdicts used", value: "3/3" },
    { label: "Time on the case", value: "52 min" },
  ],
  accusation: [
    { label: "Murderer", value: "Dr. Cecilia Sheppard" },
    { label: "Motive", value: "Protecting Flora" },
  ],
}

export const COLD_FRONT_PAGE = {
  masthead: "The London Ledger",
  dateline: "Old Bailey, London · Late edition",
  headline: "Flora Jasmine convicted of Sir Eric's murder",
  description:
    "Your team accused Eddie Raymond, but the case against him collapsed. With no one else charged, the AI's suspect took the fall.",
  featured: suspect("flora"),
  aside: {
    title: "The real killer is still at large",
    description: "Try the case again to find out who it was",
  },
  rank: "Constable",
  stats: [
    { label: "Summary sentences right", value: "15/19" },
    { label: "Team verdicts used", value: "2/3" },
    { label: "Time on the case", value: "41 min" },
  ],
  accusation: [
    { label: "Murderer", value: "Eddie Raymond" },
    { label: "Motive", value: "Covering up embezzlement" },
  ],
}
