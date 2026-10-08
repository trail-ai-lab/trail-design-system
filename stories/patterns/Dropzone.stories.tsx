import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileIcon } from "lucide-react"

import { Dropzone } from "@/components/patterns/dropzone"

const meta: Meta<typeof Dropzone> = {
  title: "Patterns/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  args: {
    onFilesSelected: () => {},
    description: "PDF or audio files",
    accept: "application/pdf,audio/*",
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
type Story = StoryObj<typeof Dropzone>

export const Default: Story = {}

export const Disabled: Story = { args: { disabled: true } }

export const Multiple: Story = { args: { multiple: true } }

/** The dropzone only reports files; the consumer renders the selected state. */
export const WithSelectedFile: Story = {
  render: (args) => {
    const [file, setFile] = React.useState<File | null>(null)
    return file ? (
      <div className="flex items-center gap-2 rounded-2xl border border-border p-4 text-sm">
        <FileIcon className="size-4 text-muted-foreground" />
        <span className="truncate">{file.name}</span>
        <button
          type="button"
          className="ml-auto text-muted-foreground underline"
          onClick={() => setFile(null)}
        >
          Remove
        </button>
      </div>
    ) : (
      <Dropzone {...args} onFilesSelected={([f]) => setFile(f)} />
    )
  },
}
