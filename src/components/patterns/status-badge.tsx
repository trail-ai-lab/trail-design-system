import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

/**
 * Meaning tones (success/warning/info/destructive), recording-state tones
 * (recording/paused/uploaded — only for recording state, per the token rules),
 * plus primary and two neutrals.
 */
export type StatusTone =
  | "neutral"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "info"
  | "destructive"
  | "recording"
  | "paused"
  | "uploaded"

const toneClassName: Record<StatusTone, string> = {
  neutral: "bg-muted text-foreground",
  muted: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
  destructive: "bg-destructive/10 text-destructive",
  recording: "bg-status-recording/10 text-status-recording",
  paused: "bg-status-paused/10 text-status-paused",
  uploaded: "bg-status-uploaded/10 text-status-uploaded",
}

const dotClassName: Record<StatusTone, string> = {
  neutral: "bg-muted-foreground",
  muted: "bg-muted-foreground/40",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  destructive: "bg-destructive",
  recording: "bg-status-recording",
  paused: "bg-status-paused",
  uploaded: "bg-status-uploaded",
}

/** Dot color for a tone, for status dots outside a badge (e.g. tabs, lists). */
export function statusToneDotClassName(tone: StatusTone) {
  return dotClassName[tone]
}

/**
 * A short status label as a tinted pill: tone + optional leading icon or dot.
 * The shared base for session status, event status and goal verdicts.
 */
function StatusBadge({
  tone = "neutral",
  icon: Icon,
  dot = false,
  pulse = false,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: StatusTone
  /** Leading icon component, e.g. `MicIcon` (Badge sizes it) */
  icon?: React.ComponentType<React.ComponentProps<"svg">>
  /** Leading color dot instead of an icon */
  dot?: boolean
  /** Pulse the dot, e.g. while live */
  pulse?: boolean
}) {
  return (
    <Badge
      variant="secondary"
      data-slot="status-badge"
      data-tone={tone}
      className={cn(toneClassName[tone], className)}
      {...props}
    >
      {Icon ? (
        <Icon data-icon="inline-start" aria-hidden />
      ) : dot ? (
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            dotClassName[tone],
            pulse && "motion-safe:animate-pulse"
          )}
        />
      ) : null}
      {children}
    </Badge>
  )
}

export { StatusBadge }
