import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/** What a speaker is when it isn't a roster student. */
export type SpeakerRole = "teacher"

/**
 * Badges beside a speaker's name: "Teacher" when the speaker is the teacher
 * rather than a student, "AI" when speaker identification picked who it is
 * (the teacher hasn't confirmed or changed it). Renders nothing when neither
 * applies. Used by ContributionPanel and RecordedTranscriptCard.
 */
function SpeakerTags({
  role,
  aiTagged = false,
  className,
}: {
  role?: SpeakerRole
  aiTagged?: boolean
  className?: string
}) {
  if (!role && !aiTagged) return null
  return (
    <span
      data-slot="speaker-tags"
      className={cn("inline-flex shrink-0 items-center gap-1", className)}
    >
      {role === "teacher" && <Badge variant="secondary">Teacher</Badge>}
      {aiTagged && (
        <Badge variant="outline" title="Identified automatically">
          AI
        </Badge>
      )}
    </span>
  )
}

export { SpeakerTags }
