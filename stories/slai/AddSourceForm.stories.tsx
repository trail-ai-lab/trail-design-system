import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import {
  AddSourceForm,
  type AddSourceFileState,
} from "@/components/slai/add-source-form"
import { DESTINATION_CLASSES } from "./_destination-fixtures"

const meta: Meta<typeof AddSourceForm> = {
  title: "SLAI/AddSourceForm",
  component: AddSourceForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { languageOptions: DEFAULT_LANGUAGES },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AddSourceForm>

/** Drop or pick a file to reveal the rename and languages fields. */
export const Default: Story = {}

/** A file picked (as the play step does), then uploading at 45%. */
export const Uploading: Story = {
  args: { loading: true, progress: 45 },
  play: async ({ canvasElement, userEvent }) => {
    const input =
      canvasElement.querySelector<HTMLInputElement>('input[type="file"]')
    if (!input) return
    const file = new File(["audio"], "inclined-plane-lab.webm", {
      type: "audio/webm",
    })
    await userEvent.upload(input, file)
  },
}

const FILES = [
  new File(["audio"], "group-1.webm", { type: "audio/webm" }),
  new File(["audio"], "group-2.webm", { type: "audio/webm" }),
  new File(["audio"], "group-3.m4a", { type: "audio/mp4" }),
]

async function pickFiles(
  canvasElement: HTMLElement,
  userEvent: {
    upload: (el: HTMLElement, files: File[]) => Promise<void>
  }
) {
  const input =
    canvasElement.querySelector<HTMLInputElement>('input[type="file"]')
  if (input) await userEvent.upload(input, FILES)
}

/** `multiple` with `classes`: several files, saved separately or as a session. */
export const Multiple: Story = {
  args: { multiple: true, classes: DESTINATION_CLASSES },
  play: async ({ canvasElement, userEvent }) =>
    pickFiles(canvasElement, userEvent),
}

/** Without `classes` there's no destination choice: separate recordings only. */
export const MultipleRecordingsOnly: Story = {
  args: { multiple: true },
}

/** Per-file states after Upload: one done, one at 60%, one failed with retry. */
export const MultipleUploading: Story = {
  args: { multiple: true, classes: DESTINATION_CLASSES, onRetry: () => {} },
  render: function MultipleUploadingStory(args) {
    const [fileStates, setFileStates] = React.useState<AddSourceFileState[]>()
    return (
      <AddSourceForm
        {...args}
        loading={fileStates !== undefined}
        fileStates={fileStates}
        onUploadMany={() =>
          setFileStates([
            { status: "ready" },
            { status: "uploading", progress: 60 },
            { status: "failed", error: "Network error" },
          ])
        }
      />
    )
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await pickFiles(canvasElement, userEvent)
    await userEvent.click(
      canvas.getByRole("button", { name: "Upload 3 recordings" })
    )
  },
}
