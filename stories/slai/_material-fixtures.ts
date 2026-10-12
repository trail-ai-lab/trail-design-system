import * as React from "react"

import type { CourseMaterial } from "@/components/slai/lib/course-material"

/** The Physics class library every materials story shows. */
export const PHYSICS_MATERIALS: CourseMaterial[] = [
  {
    id: "syllabus",
    name: "Physics syllabus 2026.pdf",
    type: "syllabus",
    size: 412_000,
    status: "ready",
    addedAt: "Aug 18",
  },
  {
    id: "unit-3-slides",
    name: "Unit 3 — Forces and motion.pptx",
    type: "slides",
    size: 8_400_000,
    status: "ready",
    addedAt: "Aug 19",
    sessions: ["Period 3 — Aug 21"],
  },
  {
    id: "inclined-plane-lab",
    name: "Inclined plane lab handout.docx",
    type: "worksheet",
    size: 96_000,
    status: "ready",
    addedAt: "Aug 20",
    sessions: ["Period 1", "Period 3 — Aug 21"],
  },
  {
    id: "newton-reading",
    name: "Newton's laws reading.pdf",
    type: "reading",
    size: 2_100_000,
    status: "processing",
    addedAt: "Today",
  },
  {
    id: "lab-rubric",
    name: "Lab report rubric.pdf",
    type: "rubric",
    size: 180_000,
    status: "failed",
    error: "Couldn't read this file. Try exporting it as PDF.",
    addedAt: "Today",
  },
]

/** Ready + processing counts, the shape `SessionChatCard.materials` takes. */
export function materialCounts(materials: CourseMaterial[]) {
  return {
    ready: materials.filter((m) => m.status === "ready").length,
    processing: materials.filter(
      (m) => m.status === "uploading" || m.status === "processing"
    ).length,
  }
}

/**
 * Fakes the upload pipeline for stories: dropped files climb to 100%, sit in
 * "processing" for a moment, then turn ready. Files named "*fail*" fail.
 */
export function useSimulatedUploads(initial: CourseMaterial[] = []) {
  const [materials, setMaterials] = React.useState(initial)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearInterval(timer))
  }, [])

  const update = (id: string, patch: Partial<CourseMaterial>) =>
    setMaterials((list) =>
      list.map((m) => (m.id === id ? { ...m, ...patch } : m))
    )

  const run = (id: string, name: string) => {
    let progress = 0
    const timer = window.setInterval(() => {
      progress += 20
      if (progress < 100) {
        update(id, { status: "uploading", progress })
        return
      }
      window.clearInterval(timer)
      update(id, { status: "processing", progress: undefined })
      window.setTimeout(
        () =>
          update(
            id,
            /fail/i.test(name)
              ? { status: "failed", error: "Couldn't read this file." }
              : { status: "ready" }
          ),
        1500
      )
    }, 300)
    timers.current.push(timer)
  }

  const add = (files: File[], sessions?: string[]) => {
    const added = files.map((file, i) => ({
      id: `${Date.now()}-${i}`,
      name: file.name,
      size: file.size,
      status: "uploading" as const,
      progress: 0,
      addedAt: "Today",
      sessions,
    }))
    setMaterials((list) => [...added, ...list])
    added.forEach((m) => run(m.id, m.name))
    return added
  }

  const retry = (material: CourseMaterial) => {
    update(material.id, { status: "uploading", progress: 0, error: undefined })
    run(material.id, "retry")
  }

  const remove = (material: CourseMaterial) =>
    setMaterials((list) => list.filter((m) => m.id !== material.id))

  return { materials, setMaterials, add, retry, remove, update }
}

/**
 * The class library seen from one session, as `UploadMaterialsSheet` needs it:
 * the library, which materials are linked to `session` (stored on each
 * material's `sessions`, so the class's materials table agrees), uploads
 * started from the sheet, and the handlers. Spread `sheetProps` onto the sheet.
 */
export function useSessionMaterials(session: string) {
  const library = useSimulatedUploads(PHYSICS_MATERIALS)
  const [addedIds, setAddedIds] = React.useState<string[]>([])
  const linkedIds = library.materials
    .filter((m) => m.sessions?.includes(session))
    .map((m) => m.id)

  const setLinkedIds = (ids: string[]) =>
    library.setMaterials((list) =>
      list.map((m) => {
        const others = (m.sessions ?? []).filter((name) => name !== session)
        return {
          ...m,
          sessions: ids.includes(m.id) ? [...others, session] : others,
        }
      })
    )

  return {
    materials: library.materials,
    counts: materialCounts(library.materials),
    sheetProps: {
      session,
      materials: library.materials,
      linkedIds,
      onLinkedIdsChange: setLinkedIds,
      uploads: library.materials.filter((m) => addedIds.includes(m.id)),
      onFilesSelected: (
        files: File[],
        { linkToSession }: { linkToSession: boolean }
      ) => {
        const added = library.add(files, linkToSession ? [session] : undefined)
        setAddedIds((ids) => [...added.map((m) => m.id), ...ids])
      },
      onRetry: library.retry,
      onRemove: library.remove,
    },
  }
}
