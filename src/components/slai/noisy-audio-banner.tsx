import { InsightCallout } from "@/components/slai/insight-callout"

/**
 * Warning shown when the audio quality check detects heavy background noise,
 * so the transcript may be unreliable. A preset `InsightCallout`.
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
    <InsightCallout variant="warning" title={title} className={className}>
      {description}
    </InsightCallout>
  )
}

export { NoisyAudioBanner }
