// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/file-upload.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { FileUpload } from "@/components/blocks/preview/cards/file-upload"

const meta: Meta<typeof FileUpload> = {
  title: "_Preview/Preview/FileUpload",
  component: FileUpload,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof FileUpload>

export const Default: Story = {}
