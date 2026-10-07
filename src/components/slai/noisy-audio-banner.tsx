import { TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Amber warning shown when the audio quality check detects heavy background
 * noise, so the transcript may be unreliable.
 */
function NoisyAudioBanner({
  title = "Audio may be too noisy",
  description = "Transcription accuracy may suffer. Move to a quieter spot or closer to the microphone.",
  className,
}: {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Alert
      className={cn(
        "border-status-paused/40 bg-status-paused/10 text-status-paused",
        className
      )}
    >
      <TriangleAlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-status-paused/90">
        {description}
      </AlertDescription>
    </Alert>
  )
}

export { NoisyAudioBanner }
