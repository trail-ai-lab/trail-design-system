import type { Meta, StoryObj } from "@storybook/react-vite"

import { Card, CardContent } from "@/components/ui/card"
import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import {
  RecordingDonePanel,
  RecordingReadyPanel,
  RecordingUploadingPanel,
  UploadErrorPanel,
} from "@/components/slai/recording-panels"

const meta: Meta = {
  title: "SLAI/RecordingPanels",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Card className="w-full max-w-md">
        <CardContent>
          <Story />
        </CardContent>
      </Card>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Ready: Story = {
  render: () => (
    <RecordingReadyPanel
      durationSeconds={754}
      sizeBytes={4_400_000}
      defaultFilename="recording-2026-08-21.webm"
      languageOptions={DEFAULT_LANGUAGES}
      onUpload={() => {}}
      onDiscard={() => {}}
    />
  ),
}

export const Uploading: Story = {
  render: () => <RecordingUploadingPanel />,
}

export const UploadingRetry: Story = {
  render: () => <RecordingUploadingPanel attempt={2} totalAttempts={4} />,
}

/** Student screen: no retry progress, even while retrying. */
export const UploadingRetryHidden: Story = {
  render: () => (
    <RecordingUploadingPanel
      attempt={2}
      totalAttempts={4}
      showAttempts={false}
    />
  ),
}

export const Done: Story = {
  render: () => (
    <RecordingDonePanel
      name="recording-2026-08-21.webm"
      durationSeconds={754}
      sizeBytes={4_400_000}
      note="Find it under Sources in the sidebar."
      onAction={() => {}}
    />
  ),
}

/** Student screen: a fallback action as an outline button. */
export const DoneStudent: Story = {
  render: () => (
    <RecordingDonePanel
      name="Team Alpha"
      durationSeconds={754}
      sizeBytes={4_400_000}
      note="You may now close this window. Each group can only submit one recording per session."
      actionLabel="Join as a new group"
      actionVariant="outline"
      onAction={() => {}}
    />
  ),
}

export const UploadFailed: Story = {
  render: () => (
    <UploadErrorPanel
      message="The connection dropped before the upload finished."
      onRetryUpload={() => {}}
      onRetryFlow={() => {}}
    />
  ),
}

/** `onDiscard` confirms before throwing the recording away (used by `SaveRecordingDialog`). */
export const UploadFailedWithDiscard: Story = {
  render: () => (
    <UploadErrorPanel
      message="The connection dropped before the upload finished."
      onRetryUpload={() => {}}
      onDiscard={() => {}}
    />
  ),
}
