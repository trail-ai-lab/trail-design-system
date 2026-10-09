import { InsightCallout } from "@/components/slai/insight-callout"

/**
 * Warning shown when the audio quality check detects heavy background noise,
 * so the transcript may be unreliable. A preset `InsightCallout`.
 */
function NoisyAudioBanner({
  title = "Audio may be too noisy",
  description = "Repetitive output was removed, so this transcript may be incomplete. Move the device closer or reduce background noise.",
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
