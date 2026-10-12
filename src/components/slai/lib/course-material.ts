import {
  FileIcon,
  FileImageIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PresentationIcon,
} from "lucide-react"

import type { UploadStatus } from "@/components/patterns/file-upload-item"

/** What a course material is, as the teacher would call it. */
export type MaterialType =
  | "syllabus"
  | "slides"
  | "reading"
  | "worksheet"
  | "rubric"
  | "answer-key"
  | "other"

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  syllabus: "Syllabus",
  slides: "Slides",
  reading: "Reading",
  worksheet: "Worksheet",
  rubric: "Rubric",
  "answer-key": "Answer key",
  other: "Other",
}

/**
 * A document uploaded to a class (syllabus, slides, readings…) that SLAI's
 * Q&A draws on. Materials belong to the class; `sessions` links them to
 * specific sessions, whose answers look at them first.
 */
export interface CourseMaterial {
  id: string
  /** Display name, e.g. "Unit 3 — Forces and motion.pdf" */
  name: string
  /** Picks the label in tables and pickers; unset reads "—" */
  type?: MaterialType
  /** File size in bytes */
  size?: number
  status: UploadStatus
  /** 0–100 while `uploading` */
  progress?: number
  /** Why upload or processing failed */
  error?: string
  /** When it was added, preformatted, e.g. "Aug 18" */
  addedAt?: string
  /** Names of the sessions it's linked to; empty or unset means the whole class */
  sessions?: string[]
}

/** File-type icon from the material's file name extension. */
export function materialIcon(name: string) {
  const extension = name.split(".").pop()?.toLowerCase() ?? ""
  if (["ppt", "pptx", "key", "odp"].includes(extension)) return PresentationIcon
  if (["xls", "xlsx", "csv", "ods"].includes(extension))
    return FileSpreadsheetIcon
  if (["png", "jpg", "jpeg", "gif", "webp", "heic"].includes(extension))
    return FileImageIcon
  if (["pdf", "doc", "docx", "txt", "md", "rtf", "odt"].includes(extension))
    return FileTextIcon
  return FileIcon
}

/** Native `accept` for course materials: documents, slides, sheets, text. */
export const MATERIAL_ACCEPT =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,.md,.rtf"

/** "Whole class", the one session's name, or "3 sessions". */
export function materialScopeLabel(material: CourseMaterial) {
  const sessions = material.sessions ?? []
  if (sessions.length === 0) return "Whole class"
  if (sessions.length === 1) return sessions[0]
  return `${sessions.length} sessions`
}
