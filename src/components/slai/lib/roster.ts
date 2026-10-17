/** A student on a class roster, as the roster page lists them. */
export interface RosterTableStudent {
  id: string
  /** Display name — a first name or nickname is enough */
  name: string
  /** Other spellings that link to this student, e.g. ["Meimei"] */
  aliases?: string[]
  language?: string
  isNativeEnglish?: boolean
  grade?: string
  /** Sessions this student was in (group member or assigned speaker) */
  sessionCount?: number
  /** Opens the student's progress page; the name is a link when set */
  href?: string
}

/** The editable fields of a roster student. */
export interface RosterStudentFields {
  name: string
  aliases: string[]
  language?: string
  grade?: string
  isNativeEnglish: boolean
}

/** One student read from a pasted list or CSV. */
export interface RosterImportRow {
  name: string
  language?: string
  grade?: string
}

const NAME_HEADERS = [
  "name",
  "displayname",
  "display name",
  "student",
  "student name",
  "first name",
]
const LANGUAGE_HEADERS = [
  "language",
  "primary language",
  "primarylanguage",
  "home language",
]
const GRADE_HEADERS = ["grade", "grade level"]

/** Split one CSV/TSV line, honouring double-quoted cells ("Lin, Mei"). */
function splitRow(line: string, delimiter: string): string[] {
  const cells: string[] = []
  let cell = ""
  let quoted = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"'
        i++
      } else {
        quoted = !quoted
      }
    } else if (ch === delimiter && !quoted) {
      cells.push(cell)
      cell = ""
    } else {
      cell += ch
    }
  }
  cells.push(cell)
  return cells.map((c) => c.trim())
}

function columnOf(header: string[], names: string[]): number {
  return header.findIndex((h) => names.includes(h.toLowerCase()))
}

/**
 * Students from text a teacher pasted or a CSV they picked: one name per
 * line, or a CSV/TSV whose header has a name column (and optionally language
 * and grade columns). Blank names are dropped; duplicates are kept for the
 * app to skip.
 */
export function parseRoster(text: string): RosterImportRow[] {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return []

  const delimiter = lines[0].includes("\t")
    ? "\t"
    : lines[0].includes(",")
      ? ","
      : null
  const header = delimiter ? splitRow(lines[0], delimiter) : []
  const nameCol = delimiter ? columnOf(header, NAME_HEADERS) : -1

  if (delimiter && nameCol >= 0) {
    const languageCol = columnOf(header, LANGUAGE_HEADERS)
    const gradeCol = columnOf(header, GRADE_HEADERS)
    return lines.slice(1).flatMap((line) => {
      const cells = splitRow(line, delimiter)
      const name = cells[nameCol] ?? ""
      if (!name) return []
      const row: RosterImportRow = { name }
      if (languageCol >= 0 && cells[languageCol])
        row.language = cells[languageCol]
      if (gradeCol >= 0 && cells[gradeCol]) row.grade = cells[gradeCol]
      return [row]
    })
  }

  // A one-column CSV keeps its "name" header line; drop it
  const names =
    !delimiter && NAME_HEADERS.includes(lines[0].toLowerCase())
      ? lines.slice(1)
      : lines

  return names
    .map((line) => line.replace(/^"(.*)"$/, "$1").trim())
    .filter(Boolean)
    .map((name) => ({ name }))
}
