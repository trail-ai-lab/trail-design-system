"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  RecordingDonePanel,
  RecordingReadyPanel,
  RecordingUploadingPanel,
  UploadErrorPanel,
} from "@/components/slai/recording-panels"

export type SaveRecordingPhase = "form" | "uploading" | "done" | "error"

/**
 * Dialog that walks a finished recording through save: name it and pick
 * languages (`form`), upload with retry progress (`uploading`), then
 * confirm (`done`) or recover (`error`). The close button is hidden while
 * uploading so the upload can't be abandoned by accident.
 */
function SaveRecordingDialog({
  open,
  onOpenChange,
  phase,
  durationSeconds,
  sizeBytes,
  defaultFilename,
  languageOptions,
  uploadAttempt,
  uploadTotalAttempts,
  errorMessage,
  onUpload,
  onDiscard,
  onNewRecording,
  onRetryUpload,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  phase: SaveRecordingPhase
  durationSeconds: number
  sizeBytes: number
  defaultFilename: string
  languageOptions: string[]
  uploadAttempt?: number
  uploadTotalAttempts?: number
  errorMessage?: string
  onUpload: (filename: string, languages: string[]) => void
  onDiscard?: () => void
  onNewRecording?: () => void
  onRetryUpload?: () => void
}) {
  const titles: Record<SaveRecordingPhase, string> = {
    form: "Save recording",
    uploading: "Uploading recording",
    done: "Recording saved",
    error: "Upload failed",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={phase !== "uploading"}
        className="sm:max-w-md"
        onInteractOutside={(event) => {
          if (phase === "uploading") event.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{titles[phase]}</DialogTitle>
          <DialogDescription className="sr-only">
            Save the recording to your account.
          </DialogDescription>
        </DialogHeader>
        {phase === "form" && (
          <RecordingReadyPanel
            durationSeconds={durationSeconds}
            sizeBytes={sizeBytes}
            defaultFilename={defaultFilename}
            languageOptions={languageOptions}
            onUpload={onUpload}
            onDiscard={onDiscard}
          />
        )}
        {phase === "uploading" && (
          <RecordingUploadingPanel
            attempt={uploadAttempt}
            totalAttempts={uploadTotalAttempts}
          />
        )}
        {phase === "done" && (
          <RecordingDonePanel
            name={defaultFilename}
            durationSeconds={durationSeconds}
            sizeBytes={sizeBytes}
            onAction={onNewRecording}
          />
        )}
        {phase === "error" && (
          <UploadErrorPanel
            message={errorMessage}
            onRetryUpload={onRetryUpload}
            onRetryFlow={onDiscard}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export { SaveRecordingDialog }
