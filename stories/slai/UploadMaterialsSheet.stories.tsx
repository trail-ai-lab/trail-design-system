import type { Meta, StoryObj } from "@storybook/react-vite"
import { LibraryIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import { UploadMaterialsSheet } from "@/components/slai/upload-materials-sheet"
import { useSessionMaterials, useSimulatedUploads } from "./_material-fixtures"

const meta: Meta<typeof UploadMaterialsSheet> = {
  title: "SLAI/UploadMaterialsSheet",
  component: UploadMaterialsSheet,
  tags: ["autodocs"],
  args: { klass: "Physics" },
}

export default meta
type Story = StoryObj<typeof UploadMaterialsSheet>

/**
 * Drop files: each uploads, processes, then turns ready (name a file "*fail*"
 * to see a failure). Closing the sheet doesn't stop them.
 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const uploads = useSimulatedUploads()
    return (
      <UploadMaterialsSheet
        {...args}
        uploads={uploads.materials}
        onFilesSelected={(files) => uploads.add(files)}
        onRetry={uploads.retry}
        onRemove={uploads.remove}
      >
        <SheetTrigger asChild>
          <Button variant="outline">
            <LibraryIcon data-icon="inline-start" />
            Course materials
          </Button>
        </SheetTrigger>
      </UploadMaterialsSheet>
    )
  },
}

/** Opened from a Live session: new files can be linked to it. */
export const FromLiveSession: Story = {
  args: { session: "Period 3 — Aug 21", defaultOpen: true },
  render: function FromLiveStory(args) {
    const uploads = useSimulatedUploads()
    return (
      <UploadMaterialsSheet
        {...args}
        uploads={uploads.materials}
        onFilesSelected={(files, { linkToSession }) =>
          uploads.add(files, linkToSession ? [args.session ?? ""] : undefined)
        }
        onRetry={uploads.retry}
        onRemove={uploads.remove}
      />
    )
  },
}

/**
 * From a session (Live or review) with the class library: "Used in {session}"
 * links existing materials, and new uploads link to it too. Unlinking keeps
 * the file in the class library.
 */
export const ManageSessionMaterials: Story = {
  args: { defaultOpen: true },
  render: function ManageStory(args) {
    const sessionMaterials = useSessionMaterials("Period 3 — Aug 21")
    return <UploadMaterialsSheet {...args} {...sessionMaterials.sheetProps} />
  },
}

/** Every upload state at once. */
export const WithUploads: Story = {
  args: {
    defaultOpen: true,
    onRetry: () => {},
    onRemove: () => {},
    uploads: [
      {
        id: "1",
        name: "Unit 4 — Energy.pptx",
        size: 6_200_000,
        status: "uploading",
        progress: 60,
      },
      {
        id: "2",
        name: "Newton's laws reading.pdf",
        size: 2_100_000,
        status: "processing",
      },
      {
        id: "3",
        name: "Physics syllabus 2026.pdf",
        size: 412_000,
        status: "ready",
      },
      {
        id: "4",
        name: "Lab report rubric.pdf",
        size: 180_000,
        status: "failed",
        error: "Couldn't read this file. Try exporting it as PDF.",
      },
    ],
  },
}
