import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DeleteConfirmDialog } from "@/components/slai/delete-confirm-dialog"
import type { CourseMaterial } from "@/components/slai/lib/course-material"
import { MaterialsTable } from "@/components/slai/materials-table"
import { RenameDialog } from "@/components/slai/rename-dialog"
import { PHYSICS_MATERIALS } from "./_material-fixtures"

const meta: Meta<typeof MaterialsTable> = {
  title: "SLAI/MaterialsTable",
  component: MaterialsTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    klass: "Physics",
    materials: PHYSICS_MATERIALS,
    onUpload: () => {},
    onRename: () => {},
    onTypeChange: () => {},
    onDownload: () => {},
    onRetry: () => {},
    onDelete: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MaterialsTable>

/** Ready, processing and failed rows; Type and Used in hide on narrow screens. */
export const Default: Story = {}

export const Uploading: Story = {
  args: {
    materials: [
      {
        id: "new",
        name: "Unit 4 — Energy.pptx",
        size: 6_200_000,
        status: "uploading",
        progress: 60,
        addedAt: "Today",
      },
      ...PHYSICS_MATERIALS,
    ],
  },
}

/** First visit to a new class: one clear action. */
export const Empty: Story = { args: { materials: [] } }

export const Loading: Story = { args: { loading: true } }

/** Without row handlers there's no menu column — a read-only list. */
export const ReadOnly: Story = {
  args: {
    onUpload: undefined,
    onRename: undefined,
    onTypeChange: undefined,
    onDownload: undefined,
    onRetry: undefined,
    onDelete: undefined,
  },
}

/** Row menus report the material; the app opens the dialogs. */
export const RowActions: Story = {
  render: function RowActionsStory(args) {
    const [materials, setMaterials] = React.useState(PHYSICS_MATERIALS)
    const [rename, setRename] = React.useState<CourseMaterial | null>(null)
    const [remove, setRemove] = React.useState<CourseMaterial | null>(null)
    const patch = (id: string, change: Partial<CourseMaterial>) =>
      setMaterials((list) =>
        list.map((m) => (m.id === id ? { ...m, ...change } : m))
      )
    return (
      <>
        <MaterialsTable
          {...args}
          materials={materials}
          onRename={setRename}
          onDelete={setRemove}
          onTypeChange={(material, type) => patch(material.id, { type })}
          onRetry={(material) =>
            patch(material.id, { status: "processing", error: undefined })
          }
        />
        <RenameDialog
          open={rename !== null}
          onOpenChange={(open) => !open && setRename(null)}
          title="Rename material"
          currentName={rename?.name ?? ""}
          onSubmit={(name) => {
            if (rename) patch(rename.id, { name })
            setRename(null)
          }}
        />
        <DeleteConfirmDialog
          open={remove !== null}
          onOpenChange={(open) => !open && setRemove(null)}
          itemKind="material"
          itemName={remove?.name ?? ""}
          description={`"${remove?.name ?? ""}" will be removed and SLAI will stop answering from it. This cannot be undone.`}
          onConfirm={() => {
            setMaterials((list) => list.filter((m) => m.id !== remove?.id))
            setRemove(null)
          }}
        />
      </>
    )
  },
}
