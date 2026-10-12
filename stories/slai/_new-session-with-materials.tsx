import * as React from "react"

import type { CourseMaterial } from "@/components/slai/lib/course-material"
import { NewSessionForm } from "@/components/slai/new-session-form"
import { UploadMaterialsSheet } from "@/components/slai/upload-materials-sheet"
import { PHYSICS_MATERIALS, useSimulatedUploads } from "./_material-fixtures"

const INITIAL_LIBRARY: Record<string, CourseMaterial[]> = {
  Physics: PHYSICS_MATERIALS,
}

/**
 * `NewSessionForm` wired to `UploadMaterialsSheet` the way an app would:
 * Upload opens the sheet for the picked class, new files join that class's
 * library and are pre-selected for the session being created.
 */
export function NewSessionWithMaterials({
  classes,
  defaultClass,
  className,
}: {
  classes: string[]
  defaultClass?: string
  className?: string
}) {
  // One simulated pipeline for every class; `classOf` remembers where each file went.
  const uploads = useSimulatedUploads()
  const [classOf, setClassOf] = React.useState<Record<string, string>>({})
  const [sheetClass, setSheetClass] = React.useState<string | null>(null)
  const [sheetIds, setSheetIds] = React.useState<string[]>([])
  const [materialIds, setMaterialIds] = React.useState<string[]>([])

  const materials = Object.fromEntries(
    classes.map((name) => [
      name,
      [
        ...uploads.materials.filter((m) => classOf[m.id] === name),
        ...(INITIAL_LIBRARY[name] ?? []),
      ],
    ])
  )

  return (
    <>
      <NewSessionForm
        classes={classes}
        defaultClass={defaultClass}
        allowNewClass
        materials={materials}
        materialIds={materialIds}
        onMaterialIdsChange={setMaterialIds}
        onUploadMaterials={(klass) => {
          setSheetIds([])
          setSheetClass(klass)
        }}
        className={className}
      />
      <UploadMaterialsSheet
        open={sheetClass !== null}
        onOpenChange={(open) => !open && setSheetClass(null)}
        klass={sheetClass ?? ""}
        uploads={uploads.materials.filter((m) => sheetIds.includes(m.id))}
        onFilesSelected={(files) => {
          const added = uploads.add(files).map((m) => m.id)
          setClassOf((map) => ({
            ...map,
            ...Object.fromEntries(added.map((id) => [id, sheetClass ?? ""])),
          }))
          setSheetIds((ids) => [...added, ...ids])
          setMaterialIds((ids) => [...ids, ...added])
        }}
        onRetry={uploads.retry}
        onRemove={(material) => {
          uploads.remove(material)
          setMaterialIds((ids) => ids.filter((id) => id !== material.id))
        }}
      />
    </>
  )
}
