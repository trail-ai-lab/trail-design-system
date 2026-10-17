import type { UnlinkedName } from "@/components/slai/names-to-link-card"
import type { RosterTableStudent } from "@/components/slai/lib/roster"

/** Physics roster, the same six students as the progress stories. */
export const PHYSICS_ROSTER: RosterTableStudent[] = [
  {
    id: "diego",
    name: "Diego",
    language: "Spanish",
    grade: "3",
    sessionCount: 4,
  },
  {
    id: "kevin",
    name: "Kevin",
    language: "English",
    isNativeEnglish: true,
    grade: "3",
    sessionCount: 5,
  },
  {
    id: "liam",
    name: "Liam",
    language: "English",
    isNativeEnglish: true,
    grade: "3",
    sessionCount: 5,
  },
  {
    id: "mei",
    name: "Mei",
    aliases: ["Meimei"],
    language: "Mandarin",
    grade: "3",
    sessionCount: 5,
  },
  {
    id: "rosa",
    name: "Rosa",
    language: "Spanish",
    grade: "3",
    sessionCount: 3,
  },
  {
    id: "sofia",
    name: "Sofia",
    aliases: ["Sofi"],
    language: "Portuguese",
    grade: "3",
    sessionCount: 4,
  },
]

/** Names from groups and speakers that link to no one on the roster. */
export const UNLINKED_NAMES: UnlinkedName[] = [
  { name: "Danny", groupCount: 2, recordingCount: 1 },
  { name: "Kev", recordingCount: 1 },
  { name: "Lucía", groupCount: 1 },
]
