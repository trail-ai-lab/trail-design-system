import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"
import { AppShell } from "@/components/slai/app-shell"
import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import type { CourseMaterial } from "@/components/slai/lib/course-material"
import { MaterialsTable } from "@/components/slai/materials-table"
import { UploadMaterialsSheet } from "@/components/slai/upload-materials-sheet"
import { PageSidebar } from "./_page-fixtures"
import { PHYSICS_MATERIALS, useSimulatedUploads } from "./_material-fixtures"

/**
 * A class's course materials, opened from its "Course materials" row in the
 * sidebar. The main place teachers upload: at the start of a term or unit,
 * many files at once.
 */
function ClassMaterialsPage({
  initial,
  loading = false,
  uploadOpen = false,
}: {
  initial: CourseMaterial[]
  loading?: boolean
  uploadOpen?: boolean
}) {
  const library = useSimulatedUploads(initial)
  const [sheetOpen, setSheetOpen] = React.useState(uploadOpen)
  // Uploads started from this sheet visit, shown in the sheet's list.
  const [addedIds, setAddedIds] = React.useState<string[]>([])
  const [remove, setRemove] = React.useState<CourseMaterial | null>(null)

  return (
    <AppShell
      sidebar={<PageSidebar activeMaterials="Physics" />}
      title={
        <PageBreadcrumb
          items={[{ label: "Physics" }, { label: "Course materials" }]}
        />
      }
    >
      <div className="flex-1 overflow-y-auto p-(--shell-gap)">
        <MaterialsTable
          className="mx-auto w-full max-w-5xl"
          klass="Physics"
          materials={library.materials}
          loading={loading}
          onUpload={() => {
            setAddedIds([])
            setSheetOpen(true)
          }}
          onTypeChange={(material, type) =>
            library.update(material.id, { type })
          }
          onDownload={() => {}}
          onRetry={library.retry}
          onDelete={setRemove}
        />
      </div>
      <UploadMaterialsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        klass="Physics"
        uploads={library.materials.filter((m) => addedIds.includes(m.id))}
        onFilesSelected={(files) => {
          const added = library.add(files)
          setAddedIds((ids) => [...added.map((m) => m.id), ...ids])
        }}
        onRetry={library.retry}
        onRemove={library.remove}
      />
      <DeleteConfirmDialog
        open={remove !== null}
        onOpenChange={(open) => !open && setRemove(null)}
        itemKind="material"
        itemName={remove?.name ?? ""}
        description={`"${remove?.name ?? ""}" will be removed and SLAI will stop answering from it. This cannot be undone.`}
        onConfirm={() => {
          if (remove) library.remove(remove)
          setRemove(null)
        }}
      />
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/ClassMaterials",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

/** An established class: ready, processing and failed materials. */
export const Default: Story = {
  render: () => <ClassMaterialsPage initial={PHYSICS_MATERIALS} />,
}

/** A new class: the empty state's one action opens the upload sheet. */
export const Empty: Story = {
  render: () => <ClassMaterialsPage initial={[]} />,
}

/** The upload sheet open over the page; drop files to watch them process. */
export const Uploading: Story = {
  render: () => <ClassMaterialsPage initial={PHYSICS_MATERIALS} uploadOpen />,
}

export const Loading: Story = {
  render: () => <ClassMaterialsPage initial={[]} loading />,
}
