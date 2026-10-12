import type { Meta, StoryObj } from "@storybook/react-vite"
import { PresentationIcon } from "lucide-react"

import {
  FileUploadItem,
  UploadStatusBadge,
} from "@/components/patterns/file-upload-item"

const meta: Meta<typeof FileUploadItem> = {
  title: "Patterns/FileUploadItem",
  component: FileUploadItem,
  tags: ["autodocs"],
  args: {
    name: "Unit 3 — Forces and motion.pdf",
    size: 2_400_000,
    onRemove: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FileUploadItem>

/** No `status`: a picked file waiting for the form's submit (as in AddSourceForm). */
export const Selected: Story = {}

export const Uploading: Story = {
  args: { status: "uploading", progress: 45 },
}

/** Uploaded; the server is preparing it (e.g. indexing for Q&A). */
export const Processing: Story = { args: { status: "processing" } }

export const Ready: Story = { args: { status: "ready" } }

export const Failed: Story = {
  args: {
    status: "failed",
    error: "Couldn't read this file. Try exporting it as PDF.",
    onRetry: () => {},
  },
}

export const CustomIcon: Story = {
  args: {
    name: "Unit 3 slides.pptx",
    icon: PresentationIcon,
    status: "ready",
  },
}

export const LongName: Story = {
  args: {
    name: "Physics — Unit 3 — Forces and motion — teacher notes with worked examples (final version).pdf",
    status: "processing",
  },
}

/** The status pill on its own, for tables. */
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <UploadStatusBadge status="uploading">
        <span className="tabular-nums">45%</span>
      </UploadStatusBadge>
      <UploadStatusBadge status="processing" />
      <UploadStatusBadge status="ready" />
      <UploadStatusBadge status="failed" />
    </div>
  ),
}
